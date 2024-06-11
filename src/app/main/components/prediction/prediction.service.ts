import { PredictionPayload } from 'src/app/main/api/predictionPayload';
import { Injectable } from '@angular/core';
import { RequestBaseService } from '../../service/request-base.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game } from '../../api/game';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import * as PredictionActions from  './state/prediction.actions';
import * as SlipActions from  './state/slip-state.actions';
import { getAwayTeamPrediction, getBoostScoreXTimes, getGameId, getHomeTeamPrediction } from './state/prediction.reducer';
import { getFullSlipState } from './state/slip-state.reducer';
import { PredictionToUpdate } from '../../api/predictionToUpdate';

const GAMES_API_URL: string = environment.BASE_URL + '/api/v1/games';
const PREDICTIONS_API_URL: string = environment.BASE_URL + '/api/v1/predictions';


@Injectable({
  providedIn: 'root'
})
export class PredictionService extends RequestBaseService {

    gamesOnSlip: any[];

   private gameIdRemovedFromSlip = new BehaviorSubject(0);
   getGameIdRemovedFromSlip = this.gameIdRemovedFromSlip.asObservable();

   private gameIdsSubmitted = new BehaviorSubject([]);
   getGameIdsSubmitted = this.gameIdsSubmitted.asObservable();

   setGameIdRemoved(gameId: number) {
    this.gameIdRemovedFromSlip.next(gameId);
   }

   setGameIdsSubmitted(arr: number[]) {
        this.gameIdsSubmitted.next(arr);
   }



  constructor(
    http : HttpClient,
    auth: AuthService,
    private predictionStore: Store<PredictionPayload>,
    private slipStateStore: Store<PredictionPayload>,
    ) {
    super(auth, http)
   }


   setPredictionState(obj) {
    this.predictionStore.dispatch(PredictionActions.setGameId({ gameId: obj.gameId }));
    this.predictionStore.dispatch(PredictionActions.setHomeTeam({ homeTeam:  obj.homeTeam }));
    this.predictionStore.dispatch(PredictionActions.setAwayTeam({ awayTeam:  obj.awayTeam }));
    this.predictionStore.dispatch(PredictionActions.setBoostScoreXTimes({ boost: obj.boost == null ? 1 : obj.boost }));
   }
   getPredictionState() {

    let myPrediction: PredictionPayload = {
        gameId: 0,
        homeTeam: {
            name: '',
            goals : 0,
        },
        awayTeam: {
            name: '',
            goals : 0,
        },
        boostScoreXTimes: 1,
        double: false
    }

        this.predictionStore.select(getGameId).subscribe(gameId => myPrediction.gameId = gameId);
        this.predictionStore.select(getHomeTeamPrediction).subscribe(home => myPrediction.homeTeam = home);
        this.predictionStore.select(getAwayTeamPrediction).subscribe(away => myPrediction.awayTeam = away);
        this.predictionStore.select(getBoostScoreXTimes).subscribe(x => myPrediction.boostScoreXTimes = x);

        return myPrediction;
   }

   addPayloadToSlip(payload: PredictionPayload) {
    this.slipStateStore.dispatch(SlipActions.addPayloadToSlip({ payload }))
   }

   removePayloadFromSlip(gameId: number) {
    this.slipStateStore.dispatch(SlipActions.deletePayloadFromSlip({ gameId }));
   }


   getSlipState() {
        //    return this.slipStateStore.select(getFullSlipState);
        let arr = [];
        this.slipStateStore.select(getFullSlipState).subscribe(res => res != null ? arr = res : null);
        return arr;
    }

    // --- api calls -------------
    getAllGamesForUser(userId: number): Observable<Game[]> {
        return this.http.get<Game[]>(GAMES_API_URL + `/forUser/${userId}`, { headers: this.getHeaders })
    }

    getTodaysGames(): Observable<Game[]> {
        return this.http.get<Game[]>(GAMES_API_URL + "/today", { headers: this.getHeaders });
    }

    getKnockoutGames(): Observable<Game[]> {
        return this.http.get<Game[]>(GAMES_API_URL + "/knockout", { headers: this.getHeaders });
    }

    getUserPredictions(userId: number): Observable<any[]> {
        return this.http.get<PredictionPayload[]>(PREDICTIONS_API_URL + "/user/" + userId, { headers: this.getHeaders });
    }

    getCalculatedPredictions(userId: number): Observable<any[]> {
        return this.http.get<PredictionPayload[]>(PREDICTIONS_API_URL + "/calculated/user/" + userId, { headers: this.getHeaders });
    }

    getTopPerformance(): Observable<any> {
        return this.http.get<any>(PREDICTIONS_API_URL + "/topPerformance", { headers: this.getHeaders });
    }

    updatePrediction(payload: PredictionToUpdate): Observable<any> {
        return this.http.put<202 | 400>(PREDICTIONS_API_URL + `/update/${payload.id}`, payload, { headers: this.getHeaders });
    }

    submitPredictions(payload: any[], userId: number): Observable<202 | 400> {

        interface ExtractedPayload {
            gameId: number,
            predictionHome: number,
            predictionAway: number,
            boostScoreXTimes: number,
        }

        let predictions: ExtractedPayload[] = [];

        let payloadToSubmit = {
            userId : userId,
            predictions
        }

        for (let i = 0; i < payload.length; i++) {
            let singlePayload: ExtractedPayload = {
                gameId: 0,
                predictionHome: 0,
                predictionAway: 0,
                boostScoreXTimes: 0,
            }
            singlePayload.gameId           = payload[i].gameId;
            singlePayload.predictionHome   = payload[i].homeTeam.goals;
            singlePayload.predictionAway   = payload[i].awayTeam.goals;
            singlePayload.boostScoreXTimes = payload[i].boostScoreXTimes;

            predictions.push(singlePayload);
        }

        return this.http.post<202 | 400>(PREDICTIONS_API_URL + "/insert", payloadToSubmit, { headers: this.getHeaders });
    }

}
