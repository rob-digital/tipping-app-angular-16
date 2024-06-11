import {  Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { LeaderboardService } from './leaderboard.service';
import { UserData2 } from '../../api/userData';
import { Subscription } from 'rxjs';
import { PredictionService } from '../prediction/prediction.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit, OnDestroy {

    allUsers: UserData2[] = [];
    inTransit: boolean = false;
    pointsArray: any[] = [];
    positions: any[] = [];
    subscription!: Subscription;

    chartData: any;
    chartOptions: any;
    chartType: string;
    labels: any[];

        constructor(private leaderboardService: LeaderboardService, private predictionService: PredictionService, private renderer: Renderer2) {}

    ngOnInit(): void {
        this.inTransit = true;

       this.subscription = this.leaderboardService.getUsers().subscribe({
            next: response => {
                this.inTransit = false;
                this.allUsers = response;
                for (let i = 0; i < this.allUsers.length; i++) {
                    this.pointsArray.push(this.allUsers[i].points)
                }

                  this.positions = this.pointsArray.reduce((acc, point, index) => {
                    if (point !== this.pointsArray[index - 1]) {
                      acc.push(acc[index - 1] + 1 || 1);
                    } else {
                      acc.push(acc[index - 1]);
                    }
                    return acc;
                  }, []);

            },
            error: error => {
                console.log(error);
            }
        });
    }


    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
