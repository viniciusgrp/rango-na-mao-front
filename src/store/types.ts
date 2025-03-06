export interface RootState {
    counter: ICounter;
}

interface IUser {
  id: number;
  name: string;
  email: string;
}

interface ICounter {
  user: IUser;
  token: string;
}
