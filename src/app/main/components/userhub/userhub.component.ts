import { getBoostScoreXTimes } from './../prediction/state/prediction.reducer';
import { Store } from '@ngrx/store';
import { getBoosters, getUserId } from '../auth/state/user.reducer';
import { PredictionService } from './../prediction/prediction.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppUser } from '../../api/user';
import { AppConfig2, getShowDarkMode } from 'src/app/layout/config/state/config.reducer';
import { Subscription } from 'rxjs';
import { PredictionToUpdate } from '../../api/predictionToUpdate';
import { MessageService } from 'primeng/api';
import * as UserActions from '../auth/state/user.actions';


@Component({
  selector: 'app-userhub',
  templateUrl: './userhub.component.html',
  styleUrls: ['./userhub.component.scss'],
  providers: [MessageService]
})
export class UserhubComponent implements OnInit, OnDestroy {

    inTransit: boolean = true;
    allPredictions: any[] | null = null;
    totalPoints: number = 0;
    userId: number;
    prediction: any;
    submitted: boolean = false;
    predictionDialog: boolean = false;
    darkMode: boolean;
    checked: boolean;
    boosters: number;
    originalBoosterValue: number;
    subscription!: Subscription;
    subscription2!: Subscription;
    displayBoostersColumn: boolean = true;
    showPadlock: boolean = false;



        constructor(private userStore: Store<AppUser>,
            private predictionService: PredictionService,
            private store2: Store<AppConfig2>,
            private messageService: MessageService,
        ) {}

    ngOnInit(): void {
        this.store2.select(getShowDarkMode).subscribe(darkMode => this.darkMode = darkMode);

        this.inTransit = true;
        this.userStore.select(getUserId).subscribe(z => this.userId = z);
        this.loadPredictions();
    }

    loadPredictions() {
        this.subscription = this.predictionService.getUserPredictions(this.userId).subscribe({
            next: res => {
                if (res.length == 0) this.showPadlock = true;
                this.allPredictions = res;
                let pointsArray = this.allPredictions.map(z => z.points);
                this.totalPoints = pointsArray.reduce((prev, curr) => prev + curr, 0)
                this.inTransit = false;
            }
        });
    }
    editPrediction(prediction) {
        this.prediction = { ...prediction };
        this.userStore.select(getBoosters).subscribe(boosters => this.boosters = boosters);
        this.predictionDialog = true;
        this.prediction.boostScoreXTimes === 2 ? this.checked = true : this.checked = false;
        if (this.boosters == 0 && !this.checked) this.displayBoostersColumn = false;
        if (this.boosters == 0 && this.checked) this.displayBoostersColumn = true;
        this.originalBoosterValue = this.prediction.boostScoreXTimes;
    }

    hideDialog() {
        // this.prediction = {};
        this.predictionDialog = false;
        this.submitted = false;
    }

    triggerUpdate() {
            let submit = document.getElementById('update');
            submit.click();
    }

    savePrediction(prediction) {
        this.inTransit = true;

        let updatedPrediction: PredictionToUpdate = {
            id: 0,
            userId: 1,
            boostScoreXTimes: 1,
            predictionHome : 0,
            predictionAway: 0,
            canEdit: false,
            boosterUpdated: false,
            boosterTriggered:false,
            boosterRemoved: false
        };
        updatedPrediction.id = prediction.id;
        updatedPrediction.userId = prediction.user.id;
        updatedPrediction.canEdit = prediction.canEdit;
        updatedPrediction.predictionHome = prediction.predictionHome;
        updatedPrediction.predictionAway = prediction.predictionAway;

            if (this.checked === true) {
                updatedPrediction.boostScoreXTimes = 2;
                if (this.originalBoosterValue != updatedPrediction.boostScoreXTimes) {
                    updatedPrediction.boosterUpdated = true;
                    updatedPrediction.boosterTriggered = true;
                    this.userStore.select(getBoosters).subscribe(boosters => this.boosters = boosters);
                    this.boosters -= 1;
                    this.userStore.dispatch(UserActions.setBoosters({ boosters: this.boosters }));

                }
            }
            if (this.checked === false) {
                updatedPrediction.boostScoreXTimes = 1;
                if (this.originalBoosterValue != updatedPrediction.boostScoreXTimes) {
                    updatedPrediction.boosterUpdated = true;
                    updatedPrediction.boosterRemoved = true;
                    this.userStore.select(getBoosters).subscribe(boosters => this.boosters = boosters);
                    this.boosters += 1;
                    this.userStore.dispatch(UserActions.setBoosters({ boosters: this.boosters }));
                }
            }

        this.subscription2 = this.predictionService.updatePrediction(updatedPrediction).subscribe({
            next: res => {
                    if (res == 202) {
                        this.inTransit = false;
                        this.userStore.select(getBoosters).subscribe(boosters => this.boosters = boosters);
                        this.userStore.dispatch(UserActions.setBoosters({ boosters: this.boosters }));

                        this.loadPredictions();
                        this.hideDialog();
                        this.showSuccessToast();

                    } else if (res == 400 || res == 402) {
                        this.showErrorToast();
                    }


            },
            error: error => console.log(error)
        });
    }

    // ----------------- message toast
    showSuccessToast() {
        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Your prediction has been updated successfully. Good luck!' });
    }
    showErrorToast() {
        this.messageService.add({ key: 'bc', severity: 'error', summary: 'Error', life: 999999999, detail: 'You cannot edit this fixture any more. Please refresh this page to continue.' });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.subscription2) {
            this.subscription2.unsubscribe();
        }
    }
}
