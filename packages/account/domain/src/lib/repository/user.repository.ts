import { UserEntity } from '../entity/user.entity';
import { Observable } from 'rxjs';

import { Injectable } from '@nx-clean/core';

@Injectable()
export abstract class UserRepository {
  public abstract getAllUsers(): Observable<UserEntity[]>;
  public abstract addUser(
    user: Pick<UserEntity, 'name'>
  ): Observable<UserEntity>;
  public abstract updateUser(
    id: string,
    user: UserEntity
  ): Observable<UserEntity>;
  public abstract removeUser(id: string): Observable<UserEntity>;
  public abstract getUserById(id: string): Observable<UserEntity>;
}
