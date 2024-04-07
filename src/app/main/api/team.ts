import { TeamForm } from "./TeamForm";

export interface Team {
        id: number;
        name: string;
        win: number;
        draw: number;
        loss: number;
        goalsScored: number;
        goalsLost: number;
        groupName: string;
        teamClass: string; // A - the highest
        points: number;
        belongsToGroup: string;
        countryCode: string;
        positionInTable: number;
        teamForm: TeamForm;

}
