export class UserEntity {
  id: string;
  name: string;

  private constructor(params: UserEntity) {
    this.id = params?.id;
    this.name = params?.name;
  }

  static create(params: UserEntity) {
    return new this(params);
  }
}
