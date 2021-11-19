import { User } from "../models/user.model";

export interface GetUsers {

  ok?: boolean;
  total: number;
  users: User[];

}