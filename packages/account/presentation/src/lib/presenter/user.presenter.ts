import { UserVM } from '../viewmodel/users.viewmodel';
import { Observable } from 'rxjs';

export abstract class UserPresenter {
  abstract users$: Observable<UserVM[]>;
  abstract filter$: Observable<string>;

  abstract getAllUsers(): Observable<UserVM[]>;
  abstract addUser(user: Pick<UserVM, 'name'>): Observable<UserVM>;
  abstract removeUser(id: string): void;
}
