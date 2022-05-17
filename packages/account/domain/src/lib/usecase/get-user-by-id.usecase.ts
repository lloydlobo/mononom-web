import { UserRepository } from '../repository/user.repository';
import { UserEntity } from '../entity/user.entity';
import { UseCase } from '@nx-clean/core';
import { Observable } from 'rxjs';

export interface GetUserByIdUseCaseDto {
  id: string;
}

export class GetUserByIdUseCase
  implements UseCase<GetUserByIdUseCaseDto, UserEntity>
{
  constructor(private userRepository: UserRepository) {}

  execute(request: GetUserByIdUseCaseDto): Observable<UserEntity> {
    return this.userRepository.getUserById(request.id);
  }
}
