import { PredictionService } from './prediction.service';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CountryService } from '../../service/country.service';
import { Router } from '@angular/router';
import { PredictionPayload } from '../../api/predictionPayload';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import * as PredictionActions from  './state/prediction.actions';
import { AppConfig2, getShowDarkMode } from 'src/app/layout/config/state/config.reducer';
import * as AllGamesActions from './state/games.actions';
import { GamesEffect } from './state/games.effect';
import { Game } from '../../api/game';
import { Observable, Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { getFullSlipState } from './state/slip-state.reducer';
import  * as stadiums from '../../../../assets/main/data/stadiums.json';
import { GameStage } from '../../api/gameStage';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss'],
  providers: [MessageService]
})
export class PredictionComponent implements OnInit, OnDestroy{
    // countries: any[] = [];

    dropdownItems: any[] = [0,1,2,3,4,5,6,7,8,9];
    selectedGoalsTeam1: any[] = []
    selectedGoalsTeam2: any[] = []
    sortedGamesByDate: any[] | null = null;
    allGames: any[] | null = null;
    byDay: any;
    // userId: number;
    // boosters: number;
    inTransit: boolean = false;
    showOdds: boolean;
    darkMode: boolean;
    slipGames: PredictionPayload[];
    subscription!: Subscription;

    numberOfElementsInEachArray: number[];
    allDatesWithDays: any[] = [];
    timeZones: any[] = [];
    allDates: any[] = [];

    gamesOnSlip: any[];
    stadiums: any;

    allGames$: Observable<any>;

    constructor(
        private predictionService: PredictionService,
        public router: Router,
        private auth: AuthService,
        private store: Store<AppConfig2>,
        private messageService: MessageService,
        private renderer: Renderer2,
        private slipStore: Store<PredictionPayload>,

        ) {
            this.slipStore.select(getFullSlipState).subscribe(z => this.slipGames = z);

            this.predictionService.getGameIdRemovedFromSlip.subscribe(gameId => {
                this.onDropdownClear_Home(gameId);
                this.onDropdownClear_Away(gameId);
            });

            this.subscription = this.predictionService.getGameIdsSubmitted.subscribe(arr => {
                if (this.router.url == "/dashboard/predict") {
                    arr.forEach((z, i) => renderer.removeChild(document.getElementById('allgames'), document.getElementById(`game-${z}`)));
                }
            })
        }

    addToSlip(e, gameId: number) {
        // e.preventDefault();

        if (this.selectedGoalsTeam1[gameId -1] == null || this.selectedGoalsTeam2[gameId -1] == null) {
            this.showWarningToast('Alright pal?', 'You cannot add an empty value to the slip');
            return;
        }

        // let currentSlipState$ = this.predictionService.getSlipState().subscribe({
        //     next: response => {
        //         console.log(response);
        //     }
        // })
        let currentSlipState = this.predictionService.getSlipState();
        if (currentSlipState != null && currentSlipState.length > 0) {
            let isGameAlreadyInSlip = currentSlipState.some(el => el.gameId == gameId);
            if (isGameAlreadyInSlip) {
                this.showWarningToast('Warning', 'This match is already in your slip');
                return;
            }
        }

        let obj: PredictionPayload = {
            gameId,
            homeTeam: {
                name: this.allGames.find(game => game.id  == gameId).homeTeam.name,
                goals: this.selectedGoalsTeam1[gameId - 1]
            },
            awayTeam: {
                name: this.allGames.find(game => game.id  == gameId).awayTeam.name,
                goals: this.selectedGoalsTeam2[gameId - 1]
            },
            boostScoreXTimes: 1,
            double: false
        }

        this.predictionService.setPredictionState(obj);

        let predictionCurrentValue = this.predictionService.getPredictionState();
        let predictionCurrentValue_copy = JSON.parse(JSON.stringify(predictionCurrentValue));
        this.predictionService.addPayloadToSlip(predictionCurrentValue_copy);

    }
    // prettyPrintJson(json) {
    //     return JSON ? JSON.stringify(json, null, '  ') : 'your browser doesnt support JSON so cant pretty print';
    //   }

    // checkInput(e) {
    // console.log('e:', e)

    // }
    ngOnInit() {
        this.store.select(getShowDarkMode).subscribe(darkMode => this.darkMode = darkMode);
        this.inTransit = true
        // fetch('assets/main/data/stadiums.json').then(res => res.json()).then(data => this.stadiums = data.data)

        this.stadiums = stadiums

        this.predictionService.getAllGamesForUser(this.auth.readUserState().id).subscribe({
            // this.gamesEffect.loadAllGames$.subscribe({
            next: response => {
                    this.allGames = response;
                    this.allGames.forEach(z => z.stage == GameStage.GROUP
                                                    ? z.stage = 'Group stage'
                                                    : z.stage == GameStage.ROUND_16
                                                        ? z.stage = 'Round of 16'
                                                        : z.stage == GameStage.QUARTERFINAL
                                                            ? z.stage = 'Quarterfinal'
                                                            : z.stage == GameStage.SEMIFINAL
                                                                ? z.stage = 'Semi final'
                                                                : z.stage = 'Final');
                    console.log('this.allGames:', this.allGames);
                    this.inTransit = false;
                    const uniqueDates = new Set(this.allGames.map(el => el.matchDatetime.slice(0, -9)));
                    let allUniqueDates = [...uniqueDates];

                    this.allDates = allUniqueDates;

                    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    this.allDatesWithDays = [];

                    let sortedGamesByDate = [];
                    for(let i=0;i<allUniqueDates.length;i++){
                    sortedGamesByDate.push(this.allGames.filter((el, j) =>el.matchDatetime.slice(0, -9) == allUniqueDates[i]));
                    let day = days[new Date(allUniqueDates[i].split('-')).getDay()];
                    let date = allUniqueDates[i].split('-').reverse().join('.');
                    let obj = {};

                    Object.assign(obj, { day: day, date: date});

                    this.allDatesWithDays.push(obj);
                }

                for(let i = 0; i < sortedGamesByDate.length; i++) {
                    // let copyArray = JSON.parse(JSON.stringify(sortedGamesByDate[i]))
                    // this.gamesStore.dispatch(AllGamesActions.setGamesByDate({dailyGames: copyArray}));
                    for(let j = 0; j < sortedGamesByDate[i].length; j++) {
                      let obj = {};
                      let buildPuneTimeHours = Number(sortedGamesByDate[i][j].matchDatetime.slice(11, -6)) + 5 == 24 ? "00": Number(sortedGamesByDate[i][j].matchDatetime.slice(11, -6)) + 5
                      let buildZurichTimeHours = Number(sortedGamesByDate[i][j].matchDatetime.slice(11, -6)) + 1
                      let buildPuneTimeMinutes = Number(sortedGamesByDate[i][j].matchDatetime.slice(14, -3)) + 30
                      let buildPuneWholeTime = (sortedGamesByDate[i][j].matchDatetime).replace(sortedGamesByDate[i][j].matchDatetime.slice(11, -6), buildPuneTimeHours)
                      let buildZurichWholeTime = (sortedGamesByDate[i][j].matchDatetime).replace(sortedGamesByDate[i][j].matchDatetime.slice(11, -6), buildZurichTimeHours)

                      Object.assign(obj, {
                        gameId: sortedGamesByDate[i][j].id,
                        gameTimeGMT: sortedGamesByDate[i][j].matchDatetime,
                        gameTimeIST: buildPuneWholeTime,
                        gameTimeCET: buildZurichWholeTime,
                      })
                      this.timeZones[sortedGamesByDate[i][j].id] = obj
                    }

                  }

                  this.sortedGamesByDate = sortedGamesByDate;
                  this.sortedGamesByDate.forEach(el => el.sort((a, b) => a.id - b.id));

            },
            error: error => console.log("Can't load games", error)
        });
    }


    // ------- Toasts ------------------------
    showSuccess() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    }

    showInfo() {
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
    }

    showWarningToast(header: string, text: string) {
        this.messageService.add(
        {
            severity: 'warn',
            summary: header,
            detail: text
        });
    }

    showError() {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
    }
    // -------------------------------------------------

    onDropdownClear_Home(gameId) {
        this.selectedGoalsTeam1[gameId -1] = null;

    }
    onDropdownClear_Away(gameId) {
        this.selectedGoalsTeam2[gameId -1] = null;
    }

    ngOnDestroy(): void {
        this.predictionService.setGameIdsSubmitted([]);
    }
}
