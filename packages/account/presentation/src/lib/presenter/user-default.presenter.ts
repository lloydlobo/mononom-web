import { UserStateVM, UserVM } from '../viewmodel/users.viewmodel';
import { UserViewModelMapper } from '../mapper/user.mapper';
import { UserPresenter } from './user.presenter';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  UserRepository,
  AddUserUseCase,
  GetAllUsersUseCase,
  RemoveUserUseCase,
} from '@mononom-ssg/account/domain';

export class UserDefaultPresenter implements UserPresenter {
  users$: Observable<UserVM[]>;
  filter$: Observable<string>;

  // internal state
  private state = new UserStateVM();
  private dispatch = new BehaviorSubject<UserStateVM>(this.state);
  private mapper = new UserViewModelMapper();

  // use cases
  private getAllUsersUC: GetAllUsersUseCase;

  private addUserUC: AddUserUseCase;

  private removeUserUC: RemoveUserUseCase;

  constructor(private repository: UserRepository) {
    this.getAllUsersUC = new GetAllUsersUseCase(this.repository);

    this.addUserUC = new AddUserUseCase(this.repository);

    this.removeUserUC = new RemoveUserUseCase(this.repository);

    // state selectors
    this.users$ = this.dispatch
      .asObservable()
      .pipe(map((state) => state.users));

    this.filter$ = this.dispatch
      .asObservable()
      .pipe(map((state) => state.filter));
  }

  getAllUsers(): Observable<UserVM[]> {
    const users$ = this.getAllUsersUC
      .execute()
      .pipe(map((users) => users.map(this.mapper.mapFrom)));

    users$.subscribe((users) => {
      this.dispatch.next(
        (this.state = {
          ...this.state,
          users,
          filter: 'all',
        })
      );
    });

    return users$;
  }

  addUser({ name }: Pick<UserVM, 'name'>): Observable<UserVM> {
    const add$ = this.addUserUC
      .execute({ name, id: '' })
      .pipe(map(this.mapper.mapFrom));

    const users$ = this.getAllUsersUC
      .execute()
      .pipe(map((users) => users.map(this.mapper.mapFrom)));

    add$.pipe(switchMap(() => users$)).subscribe((users) => {
      this.dispatch.next(
        (this.state = {
          ...this.state,
          users,
        })
      );
    });

    return add$;
  }

  removeUser(id: string) {
    const remove$ = this.removeUserUC.execute({ id });
    const users$ = this.getAllUsersUC
      .execute()
      .pipe(map((users) => users.map(this.mapper.mapFrom)));

    forkJoin([remove$, users$]).subscribe(([, users]) => {
      this.dispatch.next(
        (this.state = {
          ...this.state,
          users: users.map(this.mapper.mapFrom),
        })
      );
    });
  }

  private updateUsers(users: UserVM[]) {
    this.dispatch.next(
      (this.state = {
        ...this.state,
        users,
      })
    );
  }
}
