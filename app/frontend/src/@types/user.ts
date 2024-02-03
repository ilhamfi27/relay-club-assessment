export enum UserRole {
  OWNER = 'owner',
  BUYER = 'buyer',
}
export interface UserType {
  username: string;
  password: string;
  name: string;
  role: UserRole;
}

export interface User extends Omit<UserType, 'password'> {}
export interface UserLogin extends Omit<UserType, 'name' | 'role'> {}
