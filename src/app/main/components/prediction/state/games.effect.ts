import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PredictionService } from '../prediction.service';
import * as GamesActions from './games.actions';
import { RequestBaseService } from 'src/app/main/service/request-base.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { map, mergeMap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GamesEffect extends RequestBaseService {

    constructor(
        http : HttpClient,
        auth: AuthService,
        private actions$: Actions,
        private predictionService: PredictionService)
        { super(auth, http) }

    loadAllGames$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(GamesActions.loadAllGames),       // action you want perform
            mergeMap(() => this.predictionService.getAllGamesForUser(this.auth.readUserState().id).pipe(        // mergeMap to map over emmited action and return a result of calling getAllGamesForUser() - http
                map(allGames => GamesActions.loadAllGames_Success({allGames}))
            ))
        )
    })

}
