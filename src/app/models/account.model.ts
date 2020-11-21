export interface Account {
  id?: number;
  name: string;
  surname: string;
  email: string;
  password?: string;
  token?: string;
  departureTime?: string;
}
