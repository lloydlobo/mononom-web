export class UserMockDto {
  id: string;
  title: string;

  constructor(params: UserMockDto) {
    this.id = params.id;
    this.title = params.title;
  }
}
