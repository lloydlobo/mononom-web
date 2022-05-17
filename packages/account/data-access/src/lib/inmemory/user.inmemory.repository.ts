import { UserRepository, UserEntity } from '@mononom-ssg/account/domain';
import { UserMockMapper } from './mapper/user-mock.mapper';
import { UserMockDto } from './dto/user-mock.dto';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@nx-clean/core';

@Injectable()
export class UserInMemoryRepository implements UserRepository {
  constructor(private data: UserMockDto[] = []) {}

  private mapper = new UserMockMapper();

  public getAllUsers(): Observable<UserEntity[]> {
    return of(this.data).pipe(map((mocks) => mocks.map(this.mapper.mapTo)));
  }

  public addUser({ name }: Pick<UserEntity, 'name'>): Observable<UserEntity> {
    const id = 'item-' + new Date().getTime();
    const user: UserEntity = UserEntity.create({ id, name });

    this.data.push(this.mapper.mapFrom(user));
    return of(user);
  }

  public getUserById(id: string): Observable<UserEntity> {
    return of<UserMockDto>(
      this.data.find((user) => user.id === id) as UserMockDto
    ).pipe(map(this.mapper.mapTo));
  }

  public updateUser(id: string, user: UserEntity): Observable<UserEntity> {
    const record = this.data.findIndex((user) => user.id === id);
    this.data[record] = this.mapper.mapFrom(user);
    return of(this.mapper.mapTo(this.data[record]));
  }

  public removeUser(id: string): Observable<UserEntity> {
    const idx = this.data.findIndex((t) => t.id === id);
    const user = this.data.find((t) => t.id === id);

    this.data.splice(idx, 1);

    return of<UserMockDto>(user as UserMockDto).pipe(map(this.mapper.mapTo));
  }
}
