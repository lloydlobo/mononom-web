import { UserRepository } from '../repository/user.repository';
import { UserEntity } from '../entity/user.entity';
import { UseCase } from '@nx-clean/core';
import { Observable } from 'rxjs';

/**
 * Add your own transfer object definitions
 */
export interface UpdateUserUseCaseDTO extends UserEntity {
  id: string;
  name: string;
}

export class UpdateUserUseCase
  implements UseCase<UpdateUserUseCaseDTO, UserEntity>
{
  constructor(private userRepository: UserRepository) {}

  execute(request: UpdateUserUseCaseDTO): Observable<UserEntity> {
    return this.userRepository.updateUser(request.id, request);
  }
}
