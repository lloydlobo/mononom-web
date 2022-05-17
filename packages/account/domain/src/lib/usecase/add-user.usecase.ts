import { UserRepository } from '../repository/user.repository';
import { UserEntity } from '../entity/user.entity';
import { UseCase } from '@nx-clean/core';
import { Observable } from 'rxjs';

/**
 * Add your own transfer object definitions
 */
export interface AddUserUseCaseDTO extends UserEntity {
  name: string;
}

export class AddUserUseCase implements UseCase<AddUserUseCaseDTO, UserEntity> {
  constructor(private userRepository: UserRepository) {}

  execute(request: AddUserUseCaseDTO): Observable<UserEntity> {
    return this.userRepository.addUser(request);
  }
}
