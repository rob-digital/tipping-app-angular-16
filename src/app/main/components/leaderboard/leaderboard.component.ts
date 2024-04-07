import {  Component, OnInit, Renderer2 } from '@angular/core';
import { LeaderboardService } from './leaderboard.service';
import { UserData2 } from '../../api/userData';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

    allUsers: UserData2[] = [];
    inTransit: boolean = false;
    pointsArray: any[] = [];
    positions: any[] = [];

    constructor(private leaderboardService: LeaderboardService, private renderer: Renderer2) {}

    ngOnInit(): void {
        this.inTransit = true;

        this.leaderboardService.getUsers().subscribe({
            next: response => {
                this.inTransit = false;
                this.allUsers = response;
                console.log('this.allUsers:', this.allUsers)
                for (let i = 0; i < this.allUsers.length; i++) {
                    this.pointsArray.push(this.allUsers[i].points)
                }
                console.log('this.pointsArray:', this.pointsArray)

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
        })
    }
}
