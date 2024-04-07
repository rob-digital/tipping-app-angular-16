import { Role } from "./role"

export class User {

    id: number = 0
    // name: string = ""
    // accessToken: string = ""
    // refreshToken: string = ""
    token: string
    password: string = ""
    createTime: string = ""
    role: Role = Role.USER
    username: string = ""
    points: number = 0
    boosters: number = 3
    guestNumberOfGoals = null

  }

  export interface AppUser {

    id: number;
    createTime: string;
    role: Role;
    token: string;
    username: string;
    points: number;
    boosters: number;
    guestNumberOfGoals: number | null;

}


