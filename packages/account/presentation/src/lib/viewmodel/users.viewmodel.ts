export class UserStateVM {
  filter: string | 'all' = 'all';
  users: UserVM[] = [];
}

export interface UserVM {
  id: string;
  name: string;

  /**
   * different as in
   * user domain entity
   */
  editing?: boolean;
}
