import { Game } from "./game";

export interface modFeedback {
    game: Game;
    userId: number;
    feedbackText: string;
    feedbackCode: FeedbackCode
}
export interface modFeedbackToSubmit {
    gameId: number;
    userId: number;
    feedbackText: string;
    feedbackCode: FeedbackCode
}

export enum FeedbackCode {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
}
