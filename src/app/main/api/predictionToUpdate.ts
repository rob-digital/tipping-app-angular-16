export interface PredictionToUpdate {
    id: number;
    userId: number;
    boostScoreXTimes: number;
    predictionHome: number;
    predictionAway: number;
    canEdit: boolean;
    boosterUpdated: boolean;
    boosterTriggered: boolean;
    boosterRemoved: boolean;
}
