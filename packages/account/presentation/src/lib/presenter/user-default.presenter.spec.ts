import {
  UserInMemoryRepository,
  UserMockDto,
} from '@mononom-ssg/account/data-access';
import { UserDefaultPresenter } from './user-default.presenter';
import { UserPresenter } from './user.presenter';
import { skip } from 'rxjs/operators';

describe('User Presenter', () => {
  let userPresenter: UserPresenter;

  const item1 = { id: '1', title: 'user 1' };
  const item2 = { id: '2', title: 'user 2' };
  const db: UserMockDto[] = [item1, item2];

  beforeEach(() => {
    userPresenter = new UserDefaultPresenter(new UserInMemoryRepository(db));
  });

  describe('Initial State', () => {
    describe('Users', () => {
      it('should return empty array of users', (done) => {
        userPresenter.users$.subscribe((users) => {
          expect(users).toEqual([]);
          done();
        });
      });
    });

    describe('Filter', () => {
      it('should return "all"', (done) => {
        userPresenter.filter$.subscribe((filter) => {
          expect(filter).toEqual('all');
          done();
        });
      });
    });
  });

  describe('Get All Users', () => {
    describe('Users', () => {
      it('should return proper users from repository', (done) => {
        userPresenter.users$.pipe(skip(1)).subscribe((users) => {
          expect(users).toHaveLength(2);

          expect(users[0].id).toEqual(item1.id);
          expect(users[0].name).toEqual(item1.title);
          expect(users[0].editing).toBeFalsy();

          expect(users[1].id).toEqual(item2.id);
          expect(users[1].name).toEqual(item2.title);
          expect(users[1].editing).toBeFalsy();

          done();
        });

        userPresenter.getAllUsers();
      });
    });

    describe('Filter', () => {
      it('should return "all"', (done) => {
        userPresenter.filter$.pipe(skip(1)).subscribe((filter) => {
          expect(filter).toEqual('all');
          done();
        });

        userPresenter.getAllUsers();
      });
    });
  });
});
