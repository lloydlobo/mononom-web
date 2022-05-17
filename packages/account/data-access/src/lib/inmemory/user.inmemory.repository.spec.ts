import { UserInMemoryRepository } from './user.inmemory.repository';
import { UserRepository } from '@mononom-ssg/account/domain';
import { forkJoin } from 'rxjs';

describe('User In Memory Repository', () => {
  let repo: UserRepository;

  beforeEach(() => {
    repo = new UserInMemoryRepository([
      {
        id: '1',
        title: 'one',
      },
      {
        id: '2',
        title: 'two',
      },
      {
        id: '3',
        title: 'three',
      },
    ]);
  });

  it('get all', (done) => {
    repo.getAllUsers().subscribe((users) => {
      expect(users.length).toEqual(3);
      done();
    });
  });

  it('add user', (done) => {
    const name = 'bar';
    const add$ = repo.addUser({ name });
    const all$ = repo.getAllUsers();

    forkJoin([add$, all$]).subscribe(([user, users]) => {
      expect(user.name).toEqual('bar');
      expect(users.length).toEqual(4);
      done();
    });
  });
});
