import { Store } from '@ngrx/store';
import { getUserId } from '../auth/state/user.reducer';
import { PredictionService } from './../prediction/prediction.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../../api/user';

@Component({
  selector: 'app-userhub',
  templateUrl: './userhub.component.html',
  styleUrls: ['./userhub.component.scss']
})
export class UserhubComponent implements OnInit {

    inTransit: boolean = true;
    allPredictions: any[] | null = null;
    totalPoints: number = 0;
    userId: number;

    constructor(private userStore: Store<AppUser>, private predictionService: PredictionService) {}

    ngOnInit(): void {
        this.inTransit = true;
        this.userStore.select(getUserId).subscribe(z => this.userId = z);

        this.predictionService.getUserPredictions(this.userId).subscribe({
            next: res => {
                this.allPredictions = res;
                console.log('this.allPredictions:', this.allPredictions)
                let pointsArray = this.allPredictions.map(z => z.points);
                this.totalPoints = pointsArray.reduce((prev, curr) => prev + curr, 0)
                console.log('this.totalPoints:', this.totalPoints)
                this.inTransit = false;

            }
        })
    }

}
