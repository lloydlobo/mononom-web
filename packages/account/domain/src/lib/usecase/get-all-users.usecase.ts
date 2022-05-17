import { UserRepository } from '../repository/user.repository';
import { UserEntity } from '../entity/user.entity';
import { UseCase } from '@nx-clean/core';
import { Observable } from 'rxjs';

export class GetAllUsersUseCase implements UseCase<void, UserEntity[]> {
  constructor(private userRepository: UserRepository) {}

  execute(): Observable<UserEntity[]> {
    return this.userRepository.getAllUsers();
  }
}
