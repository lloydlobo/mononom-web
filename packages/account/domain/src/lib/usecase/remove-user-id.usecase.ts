import { UserRepository } from '../repository/user.repository';
import { UserEntity } from '../entity/user.entity';
import { UseCase } from '@nx-clean/core';
import { Observable } from 'rxjs';

export interface RemoveUserUseCaseDto {
  id: string;
}

export class RemoveUserUseCase
  implements UseCase<RemoveUserUseCaseDto, UserEntity>
{
  constructor(private userRepository: UserRepository) {}

  execute(request: RemoveUserUseCaseDto): Observable<UserEntity> {
    return this.userRepository.removeUser(request.id);
  }
}
