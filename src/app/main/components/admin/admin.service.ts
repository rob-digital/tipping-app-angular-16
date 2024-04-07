import { Injectable } from '@angular/core';
import { RequestBaseService } from '../../service/request-base.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Game, GameId, ScorePayload } from '../../api/game';
import { environment } from 'src/environments/environment';

const ADMIN_GAMES_API_URL: string = environment.BASE_URL + '/api/v1/admin';


@Injectable({providedIn: 'root'})
export class AdminService extends RequestBaseService {
    constructor(
        http : HttpClient,
        auth: AuthService,
        ) {super(auth, http)}

    getGamesToCalculate(): Observable<Game[]> {
        return this.http.get<Game[]>(ADMIN_GAMES_API_URL + "/noscore", { headers: this.getHeaders })
    }

    submitGameScore(id: number, payload: ScorePayload): Observable<ScorePayload> {
        return this.http.put<ScorePayload>(ADMIN_GAMES_API_URL + "/insert/" + id, payload, {headers: this.getHeaders});
    }

    calculatePointsForGame(gameId: number, payload: {gameId: number}): Observable<GameId>{
        return this.http.put<GameId>(ADMIN_GAMES_API_URL + "/calculate/game/" + gameId, payload,  {headers: this.getHeaders});
    }
}
