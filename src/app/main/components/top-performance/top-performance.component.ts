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
                if (res.calculatedGames[0].length == 0) this.showPadlock = true;

                if (res != null && res.calculatedGames != null && res.calculatedGames.length > 0) {
                    this.showPadlock = false;

                      this.allGames = res.calculatedGames;
                      let userData: any = [];
                      let sum = [0,0,0,0,0];
                      if (res.performanceData != null && res.performanceData[0].predictions != null && res.performanceData[0].predictions.length > 0) {
                        this.performance = res.performanceData;

                        let gamesToDisplayID = []
                        for (let i = 0; i < this.allGames.length; i++) {
                            gamesToDisplayID.push(this.allGames[i].id)
                        }

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
