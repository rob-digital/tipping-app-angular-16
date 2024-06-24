import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PredictionService } from '../prediction/prediction.service';
import { Subscription } from 'rxjs';
import { Game } from '../../api/game';

@Component({
  selector: 'app-top-performance',
  templateUrl: './top-performance.component.html',
  styleUrls: ['./top-performance.component.scss']
})
export class TopPerformanceComponent implements OnInit, OnDestroy {

    subscription!: Subscription;
    inTransit: boolean = false;

    chartData: any;
    chartOptions: any;
    chartType: string;
    labels: any[];
    showPadlock: boolean = false;


    allGames: Game[];
    serverData: any;
    performance: any[];
    lastCalculatedPredictionId: number;

    constructor(private predictionService: PredictionService, private layoutService: LayoutService) {}

    ngOnInit(): void {
       this.inTransit = true;
       this.subscription = this.predictionService.getTopPerformance().subscribe({
            next: res => {
                this.inTransit = false;
                if (res.calculatedGames.length == 0) this.showPadlock = true;

                if (res != null && res.calculatedGames != null && res.calculatedGames.length > 0) {
                    this.showPadlock = false;

                      this.allGames = res.calculatedGames;
                      let userData: any = [];
                      let sum = [0,0,0,0,0];
                      if (res.performanceData != null && res.performanceData[0].predictions != null && res.performanceData[0].predictions.length > 0) {
                        this.performance = res.performanceData;

                        let gamesToDisplayID = []
                        for (let i = 0; i < this.allGames.length; i++) {
                            gamesToDisplayID.push(this.allGames[i].id);
                        }
                        let user1_predictions = this.performance[0] != null && this.performance[0].predictions != null ?  this.performance[0].predictions : null;
                        let user2_predictions = this.performance[1] != null && this.performance[1].predictions != null ?  this.performance[1].predictions : null;
                        let user3_predictions = this.performance[2] != null && this.performance[2].predictions != null ?  this.performance[2].predictions : null;
                        let user4_predictions = this.performance[3] != null && this.performance[3].predictions != null ?  this.performance[3].predictions : null;
                        let user5_predictions = this.performance[4] != null && this.performance[4].predictions != null ?  this.performance[4].predictions : null;
                        let user3GameIds = []

                        let missingIds_User1 = user1_predictions != null ? gamesToDisplayID.filter((id) => user1_predictions.indexOf(id) === -1) : null;
                        let missingIds_User2 = user2_predictions != null ? gamesToDisplayID.filter((id) => user2_predictions.indexOf(id) === -1) : null;
                        let missingIds_User3 = user3_predictions != null ? gamesToDisplayID.filter((id) => user3_predictions.indexOf(id) === -1) : null;
                        let missingIds_User4 = user4_predictions != null ? gamesToDisplayID.filter((id) => user4_predictions.indexOf(id) === -1) : null;
                        let missingIds_User5 = user5_predictions != null ? gamesToDisplayID.filter((id) => user5_predictions.indexOf(id) === -1) : null;

                        for (const gameId of gamesToDisplayID) {
                            if (user1_predictions != null) {
                                if (!user1_predictions.some((pred) => pred.game.id === gameId)) {
                                    user1_predictions.push({ id: missingIds_User1.splice(0,1)[0], game: { id: gameId }, points: 0 });
                                }
                            }

                            if (user2_predictions != null) {
                                if (!user2_predictions.some((pred) => pred.game.id === gameId)) {
                                    user2_predictions.push({ id: missingIds_User2.splice(0,1)[0], game: { id: gameId }, points: 0 });
                                }
                            }

                            if (user3_predictions != null) {
                                if (!user3_predictions.some((pred) => pred.game.id === gameId)) {
                                    user3_predictions.push({ id: missingIds_User3.splice(0,1)[0], game: { id: gameId }, points: 0 });
                                }
                            }

                            if (user4_predictions != null) {
                                if (!user4_predictions.some((pred) => pred.game.id === gameId)) {
                                    user4_predictions.push({ id: missingIds_User4.splice(0,1)[0], game: { id: gameId }, points: 0 });
                                }
                            }

                            if (user5_predictions != null) {
                                if (!user5_predictions.some((pred) => pred.game.id === gameId)) {
                                    user5_predictions.push({ id: missingIds_User5.splice(0,1)[0], game: { id: gameId }, points: 0 });
                                }
                            }

                        }

                        if (user1_predictions != null)
                            user1_predictions.sort((a, b) => a.game.id - b.game.id);
                        if (user2_predictions != null)
                            user2_predictions.sort((a, b) => a.game.id - b.game.id);
                        if (user3_predictions != null)
                            user3_predictions.sort((a, b) => a.game.id - b.game.id);
                        if (user4_predictions != null)
                            user4_predictions.sort((a, b) => a.game.id - b.game.id);
                        if (user5_predictions != null)
                            user5_predictions.sort((a, b) => a.game.id - b.game.id);


                          for (let i = 0; i < this.performance.length; i++) {
                              let arr = [];
                              for (let j = 0; j < this.performance[i].predictions.length; j++) {
                                    arr.push(sum[i]+=this.performance[i].predictions[j].points)
                                }
                              userData.push(arr);
                            }

                          this.initChart();

                          userData[0] != null ? this.chartData.datasets[0].data = userData[0] : null;
                          userData[1] != null ? this.chartData.datasets[1].data = userData[1] : null;
                          userData[2] != null ? this.chartData.datasets[2].data = userData[2] : null;
                          userData[3] != null ? this.chartData.datasets[3].data = userData[3] : null;
                          userData[4] != null ? this.chartData.datasets[4].data = userData[4] : null;

                          this.performance[0] != null && this.performance[0].userName != null ? this.chartData.datasets[0].label = this.performance[0].userName : null;
                          this.performance[1] != null && this.performance[1].userName != null ? this.chartData.datasets[1].label = this.performance[1].userName : null;
                          this.performance[2] != null && this.performance[2].userName != null ? this.chartData.datasets[2].label = this.performance[2].userName : null;
                          this.performance[3] != null && this.performance[3].userName != null ? this.chartData.datasets[3].label = this.performance[3].userName : null;
                          this.performance[4] != null && this.performance[4].userName != null ? this.chartData.datasets[4].label = this.performance[4].userName : null;
                      }

                    this.labels = this.allGames.map(z => z.homeTeam.name + " - " + z.awayTeam.name);
                    this.labels != null ? this.chartData.labels = this.labels : null;
                }
            }
        })
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: [],
            datasets: [
                {
                    label: "",
                    data: [],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--red-500'),
                    borderColor: documentStyle.getPropertyValue('--red-500'),
                    tension: .4
                },
                {
                    label: '',
                    data: [],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                    borderColor: documentStyle.getPropertyValue('--yellow-500'),
                    tension: .4
                },
                {
                    label: '',
                    data: [],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--cyan-500'),
                    borderColor: documentStyle.getPropertyValue('--cyan-500'),
                    tension: .4
                },
                {
                    label: '',
                    data: [],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--purple-500'),
                    borderColor: documentStyle.getPropertyValue('--purple-500'),
                    tension: .4
                },
                {
                    label: '',
                    data: [],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    tension: .4
                },
            ]
        };

        let max = this.chartData.datasets[0].data.reduce((a,b) => Math.max(a,b), 0)

        this.chartOptions = {
            plugins: {
                legend: {display: false},
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary,
                        precision: 0
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    },
                    title: {
                        display: true,
                        text: 'Points'
                    },
                },
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
