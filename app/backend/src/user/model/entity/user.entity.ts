export enum UserRole {
  OWNER = 'owner',
  BUYER = 'buyer',
}
export class UserEntity {
  id: number;
  username: string;
  password: string;
  name: string;
  role: UserRole;
}
