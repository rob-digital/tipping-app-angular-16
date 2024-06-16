import { NotificationService } from './../../service/notification.service';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Observable, Subscription, map, switchMap } from 'rxjs';
import { AppConfig, LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../auth/auth.service';
import { Role } from '../../api/role';
import { PredictionService } from '../prediction/prediction.service';
import { UIChart } from 'primeng/chart';
import { getShowDarkMode } from 'src/app/layout/config/state/config.reducer';
import { getChartType } from './state/dasboard.reducer';
import * as DashboardActions from './state/dashboard.actions';
import { UserService } from '../../service/user.service';
import * as UserActions from '../auth/state/user.actions';
import { AppUser } from '../../api/user';
import { getBoosters, getPoints } from '../auth/state/user.reducer';
import { LeaderboardService } from '../leaderboard/leaderboard.service';
import { MegaMenuItem } from 'primeng/api';
import { Game } from '../../api/game';
import { Team } from '../../api/team';
import { TeamForm } from '../../api/TeamForm';
import  * as quotes from '../../../../assets/main/data/quotes.json';
import { MODFeedbackService } from '../../service/mod-feedback.service';
import * as moment from 'moment';
import { modFeedbackToSubmit } from '../../api/mod-feedback';

interface user {
    username: string;
    points: number;
}

interface Notification {
    subject: string;
    text: string;
    icon: string;
    colour: string;
}

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

@Component({
    templateUrl: './dashboard.component.html',
    providers: [MessageService]
})

export class DashboardComponent implements OnInit, OnDestroy {
    // @ViewChild('charts') public chartEl: ElementRef;


    items!: MenuItem[];
    @ViewChild('chart') chart: UIChart;
    // products!: Product[];

    chartData: any;
    chartOptions: any;
    chartType: string;
    labels: any[];
    showPadlock: boolean = false;

    pieData: any;
    pieOptions: any;
    pieLabels: any[];
    feedbackPresentInDB = false;

    subscription1!: Subscription;
    subscription2!: Subscription;
    subscription3!: Subscription;
    subscription4!: Subscription;
    subscription5!: Subscription;
    subscription6!: Subscription;

    myPoints: number[] = [];
    points: number;
    lossToLeader: number | null;
    aheadOfPoints: number;
    secondPlayerPoints: number;
    currentLeaders: user[] = [];

    megaMenuItems: MegaMenuItem[] = [];
    inTransit_leaders: boolean = false;
    inTransit_points: boolean = false;
    inTransit_booster: boolean = false;
    inTransit_precision: boolean = false;
    inTransit_graph: boolean = false;
    inTransit_MoD: boolean = false;
    inTransit_MoD_Polls: boolean = false;

    darkMode: boolean = false;
    boosters: number;
    selectedGraph: any;
    serverData: any;
    quickFeedbackData: any;
    matchOfTheDay: Game | null = null;
    todaysDate: Date;
    todaysGames: Game[] | null = null;
    notifications: Notification[] | null = null;
    graphs: string[] = ["line", "bar"];

    allQuotes: any;
    inspirationalQuotesForLeaders: any[] | null = null;
    inspirationalQuotesForPlayers: any[] | null = null;
    randomQuoteForPlayer: string;
    selectedResponse: any;

    userData: {
        id: number;
        createTime: string;
        role: Role;
        token: string;
        username: string;
        points: number;
        boosters: number;
    }

    MoDFeedbackSubmitted: boolean = false;
    removeFeedbackForm: boolean = false;
    MoDAwaitingFeedback: boolean;
    quickFeedback: any[] = [
        { value: "Clash of the titans", key: 'A' },
        { value: 'I hope for a good spectacle', key: 'B' },
        { value: 'I sense a surprise', key: 'C' },
        { value: 'Waste of time', key: 'D' }
    ];


    first: number = 1;
    rows: number = 10;

    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
    }

    // knob data
    correctScore = { width: '44%' };
    correctGoalsHome: number | null;
    correctGoalsAway: number | null;
    correctScoreHome: number | null;
    correctScoreDraw: number | null;
    correctScoreAway: number | null;
    correctScores_All: number | null;
    scoreZero: number = 0;
    constructor(
        public layoutService: LayoutService,
        private predictionService: PredictionService,
        public auth: AuthService,
        private store: Store<AppConfig>,
        private userStore: Store<AppUser>,
        private userService: UserService,
        private modFeedbackService: MODFeedbackService,
        private messageService: MessageService,
        private leaderboardService: LeaderboardService,
        private notificationService: NotificationService,
        private dashboardStore: Store<any>) {
        this.userData = this.auth.readUserState();

        // this.subscription = this.layoutService.configUpdate$.subscribe(() => {
        //     this.initChart();
        // });


        this.subscription2 = this.store.select(getShowDarkMode).subscribe(darkMode => {
            this.darkMode = darkMode
            this.initChart();

            if (this.darkMode) {
                this.initChart();
                this.myPoints != null ? this.chartData.datasets[0].data = this.myPoints : null;
                this.labels != null ? this.chartData.labels = this.labels : null;
            }

            if (!this.darkMode) {
                this.loadData();
            }
        });

        this.dashboardStore.select(getChartType).subscribe(type => {
            this.chartType = type
            this.loadData();
        });
    }

    chartValueChanged() {
        this.dashboardStore.dispatch(DashboardActions.setChartType({ chartType: this.selectedGraph }))
    }

    loadData() {
        this.subscription1 = this.predictionService.getCalculatedPredictions(this.userData.id).subscribe({
            next: response => {
                this.inTransit_precision = false;
                this.inTransit_graph = false;

                if (response != null) {

                    // knob data
                    this.serverData        = response;
                    this.correctGoalsAway  = Math.round(this.serverData.correctGoalsAway / this.serverData.games.length * 100);
                    this.correctGoalsHome  = Math.round(this.serverData.correctGoalsHome / this.serverData.games.length * 100);
                    this.correctScoreHome  = Math.round(this.serverData.correctScoreHome / this.serverData.totalWinsHome * 100);
                    this.correctScoreDraw  = Math.round(this.serverData.correctScoreDraw / this.serverData.totalDraws * 100);
                    this.correctScoreAway  = Math.round(this.serverData.correctScoreAway / this.serverData.totalWinsAway * 100);
                    this.correctScores_All = Math.round((this.serverData.correctScoreHome + this.serverData.correctScoreDraw + this.serverData.correctScoreAway) / this.serverData.games.length * 100);

                    isNaN(this.correctScoreAway) ? this.correctScoreAway = this.scoreZero : this.correctScoreAway;
                    isNaN(this.correctScoreDraw) ? this.correctScoreDraw = this.scoreZero : this.correctScoreDraw;
                    isNaN(this.correctScoreHome) ? this.correctScoreHome = this.scoreZero : this.correctScoreDraw;

                    //chart data
                    // this.inTransit_graph = false;
                    this.initChart();

                    this.myPoints = this.serverData.myPoints;
                    this.myPoints != null ? this.chartData.datasets[0].data = this.myPoints : null;
                    if (this.myPoints.length > 0) this.showPadlock = false;
                    this.labels = this.serverData.games.map(z => z.homeTeam.name + " - " + z.awayTeam.name);
                    this.labels != null ? this.chartData.labels = this.labels : null;

                    // let allPredictions = this.serverData.games.length;
                }

            },
            error: error => {
                console.log("Can't load user predictions", error);
            }
        })
    }

    submitMoDFeedback() {
        if (this.MoDAwaitingFeedback) {
            let submitMe: modFeedbackToSubmit =
                          {
                             userId: this.userData.id,
                             gameId: this.matchOfTheDay.id,
                             feedbackCode: this.selectedResponse.key,
                             feedbackText: this.selectedResponse.value
                           }

            this.modFeedbackService.insertModFeedback(submitMe).subscribe({
                next: response => {
                    this.showSuccessToast();

                    this.MoDFeedbackSubmitted = true;
                    setTimeout(() => {
                        this.feedbackPresentInDB = true;
                        this.MoDAwaitingFeedback = false;
                        if (this.MoDAwaitingFeedback === false && this.feedbackPresentInDB === true) {
                            this.displayPieChart();
                        }
                    }, 1000)


                },
                error: error => {
                    console.log('error:', error)
                }
            })

        }
        return;
    }
     ngOnInit() {
        this.inTransit_leaders   = true;
        this.inTransit_points    = true;
        this.inTransit_booster   = true;
        this.inTransit_precision = true;
        this.inTransit_graph     = true;
        this.inTransit_MoD       = true;
        this.inTransit_MoD_Polls = true;
        if (this.myPoints.length == 0) this.showPadlock = true;
        this.allQuotes = quotes;
        this.inspirationalQuotesForLeaders = this.allQuotes.data[0].leader;
        this.inspirationalQuotesForPlayers = this.allQuotes.data[0].player;
        this.randomQuoteForPlayer = this.inspirationalQuotesForPlayers[Math.floor(Math.random()*this.inspirationalQuotesForPlayers.length)].body;

        let storageUser;
        const storageUserAsObj = localStorage.getItem('currentUser');
        if (storageUserAsObj) {
            storageUser = JSON.parse(storageUserAsObj);
          this.subscription6 = this.userService.getUserData(storageUser.id).subscribe({
                next: response => {
                        if (response) {
                            this.store.dispatch(UserActions.setPoints({ points: response.points }));
                            this.store.dispatch(UserActions.setBoosters({ boosters: response.boosters }));

                            let newSessionData = JSON.parse(localStorage.getItem('currentUser'));
                            newSessionData.boosters = this.boosters;
                            newSessionData.points = this.points;
                            localStorage.setItem('currentUser', JSON.stringify(newSessionData));
                            this.inTransit_points = false;
                            this.inTransit_booster = false;

                        }
                    },
                error: error => {
                    console.log(error);

                }
            })
        }

        // this.refreshUserData(storageUser)
        this.userStore.select(getPoints).subscribe(points => this.points = points);
        this.userStore.select(getBoosters).subscribe(boosters => this.boosters = boosters);

        //! keep it in case the new solution doesn't work
        // choose match of the day
        // this.predictionService.getTodaysGames().subscribe({
        //     next: response => {
        //         this.inTransit_MoD = false;
        //         this.todaysGames = response;

        //         if (this.todaysGames != null) {

        //             if (this.todaysGames.length == 1) {
        //                 this.matchOfTheDay = this.todaysGames[0];
        //             } else if (this.todaysGames.length > 1) {

        //                 let todaysPerformance: any[] = [];
        //                 for (let match of this.todaysGames) {
        //                     let game = { id: 0, performance: 0};
        //                     let performance =  this.teamPerformance(match.homeTeam) + this.teamPerformance(match.awayTeam);
        //                     game.id = match.id;
        //                     game.performance = performance;

        //                     todaysPerformance.push(game);
        //                 }
        //                 let todaysBestPerformance = todaysPerformance.reduce(
        //                     (prev, current) => {
        //                       return prev.performance > current.performance ? prev : current;
        //                     }
        //                 );
        //                 this.matchOfTheDay = this.todaysGames.filter(z => z.id == todaysBestPerformance.id)[0];
        //             }
        //         }
        //     },
        //     error: error => {
        //         console.log(error);
        //     }
        // })

       this.predictionService.getTodaysGames()
                    .pipe(
                            map(response => {

                                if (response != null) {
                                    this.inTransit_MoD = false;
                                    if (response.length == 1) {
                                        this.matchOfTheDay = response[0];
                                    } else if (response.length > 1) {

                                        let todaysPerformance: any[] = [];
                                        for (let match of response) {
                                            let game = { id: 0, performance: 0};
                                            let performance =  this.teamPerformance(match.homeTeam) + this.teamPerformance(match.awayTeam);
                                            game.id = match.id;
                                            game.performance = performance;

                                            todaysPerformance.push(game);
                                        }
                                        let todaysBestPerformance = todaysPerformance.reduce(
                                            (prev, current) => {
                                                return prev.performance > current.performance ? prev : current;
                                            }
                                        );
                                        this.matchOfTheDay = response.filter(z => z.id == todaysBestPerformance.id)[0];
                                    }
                                }
                            }),
                            switchMap((response) => this.modFeedbackService.getMoDFeedbackForUser(this.userData.id)
                            .pipe(
                                map(response => {
                                    if (this.matchOfTheDay != null) {

                                        if (response != null && response.length == 0) {
                                            this.MoDAwaitingFeedback = true;
                                            this.inTransit_MoD_Polls = false;
                                            this.feedbackPresentInDB = false;
                                        }
                                        else if (response != null && response.length >= 1) {
                                            this.feedbackPresentInDB = true;
                                            this.inTransit_MoD_Polls = false;
                                            let feedbackExists = response.map(z => z.game.id).includes(this.matchOfTheDay.id)
                                            feedbackExists === true ? this.MoDAwaitingFeedback = false : this.MoDAwaitingFeedback = true;
                                        }
                                        if (this.MoDAwaitingFeedback === false && this.feedbackPresentInDB === true)  {
                                            this.displayPieChart();
                                        }
                                        this.inTransit_MoD_Polls = false;
                                    }
                                })
                            )),
                            switchMap(() => this.modFeedbackService.getMoDFeedbackForGame(this.matchOfTheDay.id)
                                .pipe(
                                    map(response => {
                                        let currentTime = moment();
                                        let matchTimeToUTC = moment.utc(this.matchOfTheDay.matchDatetime ).subtract(2, 'hours');
                                        let localMatchTime = moment(matchTimeToUTC).local();
                                        if (currentTime.isAfter(localMatchTime)) {
                                            if (response != null && response.length >= 1) {
                                                this.inTransit_MoD_Polls = false;
                                                this.MoDAwaitingFeedback = false;
                                                this.feedbackPresentInDB = true;
                                                if (this.MoDAwaitingFeedback === false && this.feedbackPresentInDB === true) {
                                                    this.displayPieChart();
                                                    return;
                                                }
                                            } else {
                                                this.inTransit_MoD_Polls = false;
                                                this.MoDAwaitingFeedback = false;
                                                this.feedbackPresentInDB = false;
                                            }

                                        }
                                    })
                                )
                            )).subscribe();

        //! keep it in case the new solution doesn't work

        // check whether user submitted the Match of the day feedback
        // this.subscription3 = this.modFeedbackService.getMoDFeedbackForUser(this.userData.id).subscribe({
        //     next: response => {
        //         if (this.matchOfTheDay != null) {
        //             let currentTime = moment();
        //             let matchTimeToUTC = moment.utc(this.matchOfTheDay.matchDatetime ).subtract(2, 'hours');
        //             let localMatchTime = moment(matchTimeToUTC).local();
        //             if (currentTime.isAfter(localMatchTime)) {
        //                 this.subscription5 = this.modFeedbackService.getMoDFeedbackForGame(this.matchOfTheDay.id).subscribe({
        //                     next: res => {
        //                         if (res != null && res.length >= 1) {
        //                             this.inTransit_MoD_Polls = false;
        //                             this.MoDAwaitingFeedback = false;
        //                             this.feedbackPresentInDB = true;
        //                             if (this.MoDAwaitingFeedback === false && this.feedbackPresentInDB === true) {
        //                                 this.displayPieChart();
        //                                 return;
        //                             }
        //                         }
        //                     }
        //                 });
        //             }

        //             console.log('this.MoDAwaitingFeedback:', this.MoDAwaitingFeedback)
        //             console.log('response:', response)
        //             if (response != null && response.length == 0) {
        //                 this.MoDAwaitingFeedback = true;
        //                 this.inTransit_MoD_Polls = false;
        //                 this.feedbackPresentInDB = false;
        //             }
        //             else if (response != null && response.length >= 1) {
        //                 this.feedbackPresentInDB = true;
        //                 this.inTransit_MoD_Polls = false;
        //                 let feedbackExists = response.map(z => z.game.id).includes(this.matchOfTheDay.id)
        //                 feedbackExists === true ? this.MoDAwaitingFeedback = false : this.MoDAwaitingFeedback = true;
        //             }
        //             if (this.MoDAwaitingFeedback === false && this.feedbackPresentInDB === true)  {
        //                 this.displayPieChart();
        //             }
        //             this.inTransit_MoD_Polls = false;
        //         }


        //     },
        //     error: error => console.log(error)
        // })
        // get notifications
        this.notificationService.getNotifications().subscribe({
            next: response => {
                this.notifications = response;
            },
            error: error => {
                console.log(error);

            }
        })

        this.leaderboardService.getUsers().subscribe({
            next: response => {
                if (response != null && response[0].points > 0 && response.length > 1) {
                    let leaderPoints = response[0].points;
                    // this.currentLeader = response
                    this.lossToLeader = leaderPoints - this.points;
                    if (response.length > 1) this.secondPlayer(response.slice(0, 20), leaderPoints);
                    this.aheadOfPoints = leaderPoints - this.secondPlayerPoints;

                    this.currentLeaders = response.filter(z => z.points == leaderPoints)
                    for (let i = 0; i < this.currentLeaders.length; i++) {
                        this.megaMenuItems[0].items[0][0].items.push({label: this.currentLeaders[i].username})
                    }
                }
                this.inTransit_leaders = false;

            },
            error: error => {
                console.log(error);

            }
        })
        this.megaMenuItems = [
            {
                label: 'Current leaders',
                items: [
                    [
                        {
                            items: []
                        },
                    ],
                ]
            },

        ];
        // this.userData = this.auth.readUserState();

        this.loadData();

    }

    secondPlayer(val, leaderPoints) {
        this.secondPlayerPoints = val.find(z => z.points < leaderPoints).points
     }

     teamPerformance(team: Team): number {
        let measureTeamClass = team.teamClass == "A"
                                                ? 10
                                                : team.teamClass == "B"
                                                    ? 8
                                                    : team.teamClass == "C"
                                                        ? 6
                                                        : 4;

        let measureTeamForm = team.teamForm == TeamForm.UP
                                                ? 8
                                                : team.teamForm == TeamForm.STABLE
                                                    ? 4
                                                    : 0;

        return measureTeamClass + measureTeamForm;
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
                    label: "points",
                    data: [],
                    fill: true,
                    backgroundColor: this.selectedGraph == 'line' ? 'rgba(82,220,238,0.2)': documentStyle.getPropertyValue('--cyan-500'),
                    borderColor: documentStyle.getPropertyValue('--cyan-500'),
                    tension: .4
                },
                {
                    label: '',
                    data: [],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
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

    displayPieChart() {
        this.subscription4 = this.modFeedbackService.getMoDFeedbackForGame(this.matchOfTheDay.id).subscribe({
            next: res => {
                if (res != null && res.length > 0) {
                    this.initPieChart();

                    // this.pieLabels = response.map(z => z.homeTeam.name + " - " + z.awayTeam.name);
                    this.pieData.labels[0] = this.quickFeedback[0].value;
                    this.pieData.labels[1] = this.quickFeedback[1].value;
                    this.pieData.labels[2] = this.quickFeedback[2].value;
                    this.pieData.labels[3] = this.quickFeedback[3].value;
                    let total_A = res.filter(z => z.feedbackCode == "A").length / res.length * 100;
                    let total_B = res.filter(z => z.feedbackCode == "B").length / res.length * 100;
                    let total_C = res.filter(z => z.feedbackCode == "C").length / res.length * 100;
                    let total_D = res.filter(z => z.feedbackCode == "D").length / res.length * 100;
                    this.pieData.datasets[0].data[0] = total_A;
                    this.pieData.datasets[0].data[1] = total_B;
                    this.pieData.datasets[0].data[2] = total_C;
                    this.pieData.datasets[0].data[3] = total_D;
                } else {
                    return;
                }
            },
            error: error => console.log("Quick feedback for game - error", error)
        });
     }

    initPieChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('#fff');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.pieData = {
            labels: [],
            datasets: [
                {
                    label: '%',
                    data: [],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--green-500'),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--red-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                        documentStyle.getPropertyValue('--green-400'),
                    ]
                }]
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: "#fff"
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription1) {
            this.subscription1.unsubscribe();
        }
        if (this.subscription2) {
            this.subscription2.unsubscribe();
        }
        if (this.subscription3) {
            this.subscription3.unsubscribe();
        }
        if (this.subscription4) {
            this.subscription4.unsubscribe();
        }
        if (this.subscription5) {
            this.subscription5.unsubscribe();
        }
        if (this.subscription6) {
            this.subscription6.unsubscribe();
        }
    }

    // ----------------- message toast
    showSuccessToast() {
     this.messageService.add({ key: 'dashSuccess', severity: 'success', summary: 'Success', detail: 'Your feedback has been registered. Thank you!' });
    }
}


