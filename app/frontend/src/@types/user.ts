export interface UserType {
  username: string;
  password: string;
  name: string;
}

export interface User extends Omit<UserType, 'password'> {}
export interface UserLogin extends Omit<UserType, 'name'> {}
