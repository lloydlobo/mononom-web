import { UserMockDto } from '../dto/user-mock.dto';
import { UserEntity } from '@mononom-ssg/account/domain';
import { Mapper } from '@nx-clean/core';

export class UserMockMapper implements Mapper<UserEntity, UserMockDto> {
  mapFrom(input: UserEntity): UserMockDto {
    return {
      id: input?.id,
      title: input?.name,
    };
  }

  mapTo(input: UserMockDto): UserEntity {
    const user = UserEntity.create({
      id: input?.id,
      name: input?.title,
    });

    return user;
  }
}
