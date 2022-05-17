import { UserVM } from '../viewmodel/users.viewmodel';
import { UserEntity } from '@mononom-ssg/account/domain';
import { Mapper } from '@nx-clean/core';

export class UserViewModelMapper implements Mapper<UserEntity, UserVM> {
  mapFrom(input: UserEntity): UserVM {
    return { id: input.id, name: input.name };
  }

  mapTo(input: UserVM): UserEntity {
    return { id: input.id, name: input.name };
  }
}
