import { setBoosters } from './../main/components/auth/state/user.actions';
import { PredictionService } from './../main/components/prediction/prediction.service';
import { Store } from '@ngrx/store';
import { Component, ElementRef, ViewChild, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../main/components/auth/auth.service';
import { Router } from '@angular/router';
import { PredictionPayload } from '../main/api/predictionPayload';
import { getFullSlipState } from '../main/components/prediction/state/slip-state.reducer';
import { AppUser } from '../main/api/user';
import { getBoosters, getUserId, getUsername } from '../main/components/auth/state/user.reducer';
import { AppConfig2, getShowDarkMode } from './config/state/config.reducer';
import * as SlipStateActions from '../main/components/prediction/state/slip-state.actions';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styles: [
        `:host ::ng-deep  .boosterLight {
            background: var(--green-500) !important;
            color: white !important;
            margin-bottom: -5px;
            margin-top: -5px;
        }
        :host ::ng-deep  .boosterDark {
            background: var(--green-400) !important;
            color: black !important;
            margin-bottom: -5px;
            margin-top: -5px;
        }`
    ],
    providers: [MessageService]
})
export class AppTopBarComponent implements OnInit, OnDestroy {

    items!: MenuItem[];
    slipItems: PredictionPayload[];
    slipDialog: boolean = false;
    submitted: boolean = false;
    slipWaitingToBeSubmitted: boolean;
    // created for the inputSwitch [(ngModel)]="slipItems_Copy[rowIndex].double"
    slipItems_Copy: PredictionPayload[];
    msgs: Message[] = [];
    subscription!: Subscription;


    inTransit: boolean = false;
    darkMode: boolean;
    username: string;
    presentableUsername: string;
    userId: number;
    boosters: number;
    allBoostersUsed: boolean;
    shouldShowBoostersColumn: boolean = true;


    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        public auth: AuthService,
        public router: Router,
        private messageService: MessageService,
        private predictionService: PredictionService,
        private configStore: Store<AppConfig2>,
        private userStore: Store<AppUser>,
        public renderer: Renderer2,
        private slipStateStore: Store<PredictionPayload>) {
            this.slipStateStore.select(getFullSlipState).subscribe(z => this.slipItems = z);
            this.userStore.select(getBoosters).subscribe(z => this.boosters = z);
            this.userStore.select(getUserId).subscribe(z => this.userId = z);


        }


    ngOnInit(): void {

        this.userStore.select(getUsername).subscribe(user => this.username = user);
        this.configStore.select(getShowDarkMode).subscribe(darkMode => this.darkMode = darkMode);
        let titles = ['mr', 'sir', 'master', 'lord', 'mrs', 'ms', 'miss', 'lady', 'super', 'dr'];

        let extractedUserName = this.username.match(/\b(\w+)\b/g);

        if (extractedUserName.length > 1) {
            if (titles.filter(z => z == extractedUserName[0].toLowerCase()).length == 1) {
                this.presentableUsername = extractedUserName.splice(0, 2).join(" ");
                return;
            } else {
                this.presentableUsername = extractedUserName.splice(0, 1).join(" ");
                return;
            }
        }

        this.presentableUsername = this.username;

    }


    openSlipDialog() {
        if (this.slipItems.length == 0) return;
        this.userStore.select(getBoosters).subscribe(z => this.boosters = z);
        if (this.boosters == 0) this.slipWaitingToBeSubmitted = false;
        if (this.boosters == 0) this.shouldShowBoostersColumn = false;

        this.slipItems_Copy = JSON.parse(JSON.stringify(this.slipItems));
        this.submitted = false;
        this.slipDialog = true;
    }

    deleteGame(gameId: number) {
        this.predictionService.setGameIdRemoved(gameId);

        let foundGame = this.slipItems.find(el => el.gameId == gameId);
        // this.slipItems.filter(el => el.gameId != gameId);
        if (foundGame.double) {
            this.boosters++;
            if (this.boosters > 0) this.allBoostersUsed = false;
        }
        this.slipStateStore.dispatch(SlipStateActions.updateBoosterForSelectedPayload({gameId: gameId, boostScoreXTimes: 1}));
        this.predictionService.removePayloadFromSlip(gameId);
        this.slipItems_Copy = JSON.parse(JSON.stringify(this.slipItems));
        if (this.slipItems.length == 0) this.slipDialog = false;

    }

    boosterTriggered(gameId, rowIndex) {

        if (this.boosters >= 0 && this.boosters < 4) {
            let foundGame = this.slipItems_Copy.find(game => game.gameId == gameId);
            if (foundGame.double) {
                this.slipStateStore.dispatch(SlipStateActions.updateBoosterForSelectedPayload({gameId: foundGame.gameId, boostScoreXTimes: 2}));
                this.boosters = this.boosters - 1;
                if (this.boosters == 0) this.allBoostersUsed = true;

            } else if (!foundGame.double) {
                this.slipStateStore.dispatch(SlipStateActions.updateBoosterForSelectedPayload({gameId: foundGame.gameId, boostScoreXTimes: 1}));
                this.boosters = this.boosters + 1;
                if (this.boosters > 0) this.allBoostersUsed = false;
            }
        }
    }

    closeDialog() {
        this.slipDialog = false;
        this.inTransit = false;
        this.slipWaitingToBeSubmitted = true;
    }

    onSubmit() {

        this.inTransit = true;
      this.subscription =   this.predictionService.submitPredictions(this.slipItems, this.userId).subscribe({
            next: (response) => {
                if (response == 202) {

                    this.slipWaitingToBeSubmitted = false;

                    let submittedIDs = this.slipItems.map(z => z.gameId);
                    this.userStore.dispatch(setBoosters({boosters: this.boosters}));
                    let newSessionData = JSON.parse(localStorage.getItem('currentUser'));
                    newSessionData.boosters = this.boosters;
                    localStorage.setItem('currentUser', JSON.stringify(newSessionData));

                    this.predictionService.setGameIdsSubmitted(submittedIDs);
                    submittedIDs.forEach(z =>  this.predictionService.removePayloadFromSlip(z));
                    this.closeDialog();
                    this.showSuccessToast();
                    this.predictionService.setGameIdsSubmitted([]);

                }

                if (response == 400) {
                    this.showErrorViaMessages()
                }
            },
            error: error => console.log("ERROR, can't submit: ", error)
        })
    }


    logout() {
        this.auth.logout();
        this.router.navigate(['/auth'])
    }

    // ----------------- message toast
    showSuccessToast() {
        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Your predictions have been submitted successfully. Good luck!' });
    }
    showErrorViaMessages() {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error!!!', detail: 'One or more of the matches in your bet slip have already started. Please reload the page and start again.' });
    }


    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
