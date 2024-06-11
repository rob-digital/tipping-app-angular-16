import { Component, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { GameStatus } from 'src/app/main/api/gameStatus';
import { ScorePayload } from 'src/app/main/api/game';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.scss'],
  providers: [MessageService]
})
export class CalculateComponent {
    games: any[] = [];
    dropdownItems: number[] = [0,1,2,3,4,5,6,7,8,9];
    successMessage: string = "";
    goalsHome: number[] = [];
    goalsAway: number[] = [];
    inTransit: boolean = false;
    scoreInDB: boolean = false;

    constructor(private adminService: AdminService, private router: Router, private messageService: MessageService) { }

    ngOnInit(): void {
        this.initiatePage();
    }

initiatePage() {
    this.adminService.getGamesToCalculate().subscribe({
        next: (response) => {
            this.games = response;
        },
        error: (error) => {
         console.log("admin-all-games error", error);
        }
    });
}

    insertScoreToDB(game) {

        if (this.goalsHome[game.id - 1] == null || this.goalsAway[game.id - 1] == null) {
            this.messageService.add({ severity: 'error', summary: 'Wait!', detail: 'You cannot submit an empty value!' });
            return;
        }

        let payload: ScorePayload = {
            goalsHome: this.goalsHome[game.id - 1],
            goalsAway: this.goalsAway[game.id - 1],
            status: GameStatus.NOT_CALCULATED
        }
        this.adminService.submitGameScore(game.id, payload).subscribe({
            next:  (res) => {
                this.inTransit = true;
                fetch(location.href).then(response => {

                  if (response.status == 200) {
                      this.scoreInDB = true;
                      this.initiatePage();
                      this.goalsHome = []
                      this.goalsAway = []
                      this.inTransit = false;
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The score has been added to the database' });
                  }
                })
              },

          error: (error) => {
            console.log("Error while submitting a score to a game ", error);
          }
        });
    }

    calculate(game) {
        this.adminService.calculatePointsForGame(game.id, {gameId: game.id}).subscribe({
            next: res => {
                this.inTransit = true;
                fetch(location.href).then(response => {

                    if (response.status == 200) {
                        this.initiatePage();
                        this.inTransit = false;
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Points for game ${game.id} have been calculated.` });
                    }
                });
            },
            error: error => {console.log("Can't calculate for game ID-"+ game.id, error)}
        });

    }
}
