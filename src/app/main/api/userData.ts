import { Reward } from "./reward";

export interface UserData {
    // token: string;
    // username: string;
    // role: Role;

    points: number;
    boosters: number;

}
export interface UserData2 {
    username:string;
    points: number;
    reward: Reward;
}
