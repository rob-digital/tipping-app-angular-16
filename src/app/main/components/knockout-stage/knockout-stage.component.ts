import { PredictionService } from './../prediction/prediction.service';
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Team } from '../../api/team';
import { Game, YesOrNo } from '../../api/game';
import { KnockoutStageGame } from '../../api/knockoutStageGame';

// interface KnockoutTeam {
//     name: string;
//     goals: number | null;
//     isWinner: boolean;
//     isConfirmed: boolean;
// }
@Component({
  selector: 'app-knockout-stage',
  templateUrl: './knockout-stage.component.html',
  styleUrls: ['./knockout-stage.component.scss']
})
export class KnockoutStageComponent implements OnInit{

    constructor(private predictionService: PredictionService) {}

    teams: Team[] | null;
    knockoutGames: Game[] | null = null;


    dataSet: TreeNode[] = [
        {
            label: "",
            expanded: true,
            type: 'koStage',
            data: {
            textSize: 'text-3xl',

                    homeTeam: { name: 'Winner Match 49', goals: null, isWinner: false, isConfirmed: false},
                    awayTeam: { name: 'Winner Match 50', goals: null, isWinner: false, isConfirmed: false}
            },
            children: [
                {
                    label: 'Winner Match 45 vs Winner Match 46',
                    expanded: true,
                    type: 'koStage',
                    data: {
                    textSize: 'text-2xl',

                        homeTeam: { name: 'Winner Match 45', goals: null, isWinner: false, isConfirmed: false },
                        awayTeam: { name: 'Winner Match 46', goals: null, isWinner: false, isConfirmed: false }
                    },
                    children: [
                        {
                            label: 'Winner Match 39	vs Winner Match 37',
                            expanded: true,
                            type: 'koStage',
                            data: {
                            textSize: 'text-lg',

                                homeTeam: { name: 'Winner Match 39', goals: null, isWinner: false, isConfirmed: false },
                                awayTeam: { name: 'Winner Match 37', goals: null, isWinner: false, isConfirmed: false }
                            },
                            children: [
                                    {
                                        label: 'Winner Group B vs 3rd Group A/D/E/F',
                                        type: 'koStage',
                                            data: {
                                            textSize: 'text-md',
                                            // R16-game1
                                            homeTeam: { name: 'Winner Group B', goals: null, isWinner: false, isConfirmed: false },
                                            awayTeam: { name: '3rd Group A/D/E/F', goals: null, isWinner: false, isConfirmed: false }
                                        },
                                    },
                                {
                                    label: 'Winner Group A vs Runner-up Group C',
                                    type: 'koStage',
                                    data: {
                                        textSize: 'text-md',
                                        homeTeam: { name: 'Winner Group A', goals: null, isWinner: false, isConfirmed: false },
                                        awayTeam: { name: 'Runner-up Group C', goals: null, isWinner: false, isConfirmed: false }
                                    },
                                }
                            ]
                        },
                        {
                            label: 'Winner Match 41	vs Winner Match 42',
                            expanded: true,
                            type: 'koStage',
                            data: {
                                textSize: 'text-lg',
                                homeTeam: { name: 'Winner Match 41', goals: null, isWinner: false, isConfirmed: false },
                                awayTeam: { name: 'Winner Match 42', goals: null, isWinner: false, isConfirmed: false }
                            },
                            children: [
                                {
                                    label: 'Winner Group F vs 3rd Group A/B/C',
                                    type: 'koStage',
                                    data: {
                                        textSize: 'text-md',
                                        homeTeam: { name: 'Winner Group F', goals: null, isWinner: false, isConfirmed: false },
                                        awayTeam: { name: '3rd Group A/B/C', goals: null, isWinner: false, isConfirmed: false }
                                    },
                                },
                                {
                                    label: 'Runner-up Group D vs Runner-up Group E',
                                    type: 'koStage',
                                    data: {
                                        textSize: 'text-md',
                                        homeTeam: { name: 'Runner-up Group D', goals: null, isWinner: false, isConfirmed: false },
                                        awayTeam: { name: 'Runner-up Group E', goals: null, isWinner: false, isConfirmed: false }
                                    },
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'Winner Match 46 vs Winner Match 47',
                    expanded: true,
                    type: 'koStage',
                     data: {
                        textSize: 'text-2xl',
                            homeTeam: { name: 'Winner Match 47', goals: null, isWinner: false, isConfirmed: false},
                            awayTeam: { name: 'Winner Match 48', goals: null, isWinner: false, isConfirmed: false}
                    },
                    children: [
                        {
                            label: 'Winner Match 43 vs Winner Match 44',
                            expanded: true,
                            type: 'koStage',
                            data: {
                                textSize: 'text-lg',
                                homeTeam: { name: 'Winner Match 43', goals: null, isWinner: false, isConfirmed: false },
                                awayTeam: { name: 'Winner Match 44', goals: null, isWinner: false, isConfirmed: false }
                            },
                            children: [
                                {
                                    label: 'Winner Group E	vs 3rd Group A/B/C/D',
                                    type: 'koStage',
                                    data: {
                                        textSize: 'text-md',
                                        homeTeam: { name: 'Winner Group E', goals: null, isWinner: false, isConfirmed: false },
                                        awayTeam: { name: '3rd Group A/B/C/D', goals: null, isWinner: false, isConfirmed: false }
                                    },
                                },
                                {
                                    label: 'Winner Group D vs Runner-up Group F',
                                    type: 'koStage',
                                    data: {
                                        textSize: 'text-md',
                                        homeTeam: { name: 'Winner Group D', goals: null, isWinner: false, isConfirmed: false },
                                        awayTeam: { name: 'Runner-up Group F', goals: null, isWinner: false, isConfirmed: false }
                                    },
                                }
                            ]
                        },
                        {
                            label: 'Winner Match 40	vs Winner Match 38',
                            expanded: true,
                            type: 'koStage',
                            data: {
                                textSize: 'text-lg',
                                homeTeam: { name: 'Winner Match 40', goals: null, isWinner: false, isConfirmed: false },
                                awayTeam: { name: 'Winner Match 38', goals: null, isWinner: false, isConfirmed: false }
                            },
                            children: [
                                {
                                    label: 'Winner Group C	vs 3rd Group D/E/F',
                                    type: 'koStage',
                                    data: {
                                        textSize: 'text-md',
                                        homeTeam: { name: 'Winner Group C', goals: null, isWinner: false, isConfirmed: false },
                                        awayTeam: { name: '3rd Group D/E/F', goals: null, isWinner: false, isConfirmed: false }
                                    },
                                },
                                {
                                    label: 'Runner-up Group A vs Runner-up Group B',
                                    type: 'koStage',
                                    data: {
                                        textSize: 'text-md',
                                        homeTeam: { name: 'Runner-up Group A', goals: null, isWinner: false, isConfirmed: false },
                                        awayTeam: { name: 'Runner-up Group B', goals: null, isWinner: false, isConfirmed: false }
                                    },
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];

    ngOnInit(): void {
        this.predictionService.getKnockoutGames().subscribe({
            next: response => {
                this.knockoutGames = response;

                if (this.knockoutGames != null) {

                    // assign Round of 16
                    this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME1).length == 1
                        ?   (this.dataSet[0].children[0].children[0].children[0].data.homeTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME1)[0].homeTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME1)[0].goalsHomeTeam,
                                    isWinner: false,
                                    isConfirmed: true,
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME1)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                },
                                this.dataSet[0].children[0].children[0].children[0].data.awayTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME1)[0].awayTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME1)[0].goalsAwayTeam,
                                    isWinner: false,
                                    isConfirmed: true,
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME1)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                }
                            )
                        : null;

                    this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME2).length == 1
                        ?   (this.dataSet[0].children[0].children[0].children[1].data.homeTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME2)[0].homeTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME2)[0].goalsHomeTeam,
                                    isWinner: false,
                                    isConfirmed: true,
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME2)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                },
                                this.dataSet[0].children[0].children[0].children[1].data.awayTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME2)[0].awayTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME2)[0].goalsAwayTeam,
                                    isWinner: false,
                                    isConfirmed: true,
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME2)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                }
                            )
                        : null;

                        this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME3).length == 1
                        ?   (this.dataSet[0].children[0].children[1].children[0].data.homeTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME3)[0].homeTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME3)[0].goalsHomeTeam,
                                    isWinner: false,
                                    isConfirmed: true,
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME3)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                },
                                this.dataSet[0].children[0].children[1].children[0].data.awayTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME3)[0].awayTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME3)[0].goalsAwayTeam,

                                    isWinner: false,
                                    isConfirmed: true,
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME3)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                }
                            )
                        : null;

                        this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME4).length == 1
                        ?   (this.dataSet[0].children[0].children[1].children[1].data.homeTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME4)[0].homeTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME4)[0].goalsHomeTeam,
                                    isWinner: false,
                                    isConfirmed: true,
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME4)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                },
                                this.dataSet[0].children[0].children[1].children[1].data.awayTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME4)[0].awayTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME4)[0].goalsAwayTeam,

                                    isWinner: false,
                                    isConfirmed: true,
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME4)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                }
                            )
                        : null;

                        this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME5).length == 1
                        ?   (this.dataSet[0].children[1].children[0].children[0].data.homeTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME5)[0].homeTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME5)[0].goalsHomeTeam,
                                    isWinner: false,
                                    isConfirmed: true,
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME5)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                },
                                this.dataSet[0].children[1].children[0].children[0].data.awayTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME5)[0].awayTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME5)[0].goalsAwayTeam,

                                    isWinner: false,
                                    isConfirmed: true,
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME5)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                }
                            )
                        : null;

                        this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME6).length == 1
                        ?   (this.dataSet[0].children[1].children[0].children[1].data.homeTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME6)[0].homeTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME6)[0].goalsHomeTeam,
                                    isWinner: false,
                                    isConfirmed: true,
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME6)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                },
                                this.dataSet[0].children[1].children[0].children[1].data.awayTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME6)[0].awayTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME6)[0].goalsAwayTeam,

                                    isWinner: false,
                                    isConfirmed: true,
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME6)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                }
                            )
                        : null;

                        this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME7).length == 1
                        ?   (this.dataSet[0].children[1].children[1].children[0].data.homeTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME7)[0].homeTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME7)[0].goalsHomeTeam,
                                    isWinner: false,
                                    isConfirmed: true,
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME7)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                },
                                this.dataSet[0].children[1].children[1].children[0].data.awayTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME7)[0].awayTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME7)[0].goalsAwayTeam,

                                    isWinner: false,
                                    isConfirmed: true,
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME7)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                }
                            )
                        : null;

                        this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME8).length == 1
                        ?   (this.dataSet[0].children[1].children[1].children[1].data.homeTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME8)[0].homeTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME8)[0].goalsHomeTeam,
                                    isWinner: false,
                                    isConfirmed: true,
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME8)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                },
                                this.dataSet[0].children[1].children[1].children[1].data.awayTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME8)[0].awayTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME8)[0].goalsAwayTeam,

                                    isWinner: false,
                                    isConfirmed: true,
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.ROUND_16_GAME8)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                }
                            )
                        : null;

                        // assign Quarterfinals
                        this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME1).length == 1
                        ?   (this.dataSet[0].children[0].children[0].data.homeTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME1)[0].homeTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME1)[0].goalsHomeTeam,
                                    isWinner: false,
                                    isConfirmed: true,
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME1)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                },
                                this.dataSet[0].children[0].children[0].data.awayTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME1)[0].awayTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME1)[0].goalsAwayTeam,

                                    isWinner: false,
                                    isConfirmed: true,
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME1)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                }
                            )
                        : null;

                        this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME2).length == 1
                        ?   (this.dataSet[0].children[0].children[1].data.homeTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME2)[0].homeTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME2)[0].goalsHomeTeam,
                                    isWinner: false,
                                    isConfirmed: true,
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME2)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                },
                                this.dataSet[0].children[0].children[1].data.awayTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME2)[0].awayTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME2)[0].goalsAwayTeam,
                                    isWinner: false,
                                    isConfirmed: true,
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME2)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                }
                            )
                        : null;

                        this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME3).length == 1
                        ?   (this.dataSet[0].children[1].children[0].data.homeTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME3)[0].homeTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME3)[0].goalsHomeTeam,

                                    isWinner: false,
                                    isConfirmed: true,
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME3)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                },
                                this.dataSet[0].children[1].children[0].data.awayTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME3)[0].awayTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME3)[0].goalsAwayTeam,

                                    isWinner: false,
                                    isConfirmed: true,
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME3)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                }
                            )
                        : null;

                        this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME4).length == 1
                        ?   (this.dataSet[0].children[1].children[1].data.homeTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME4)[0].homeTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME4)[0].goalsHomeTeam,

                                    isWinner: false,
                                    isConfirmed: true,
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME4)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                },
                                this.dataSet[0].children[1].children[1].data.awayTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME4)[0].awayTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME4)[0].goalsAwayTeam,
                                    isWinner: false,
                                    isConfirmed: true,
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.QUARTERFINAL_GAME4)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                }
                            )
                        : null;

                        // assign Semi Finals
                        this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.SEMIFINAL_GAME1).length == 1
                        ?   (this.dataSet[0].children[0].data.homeTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.SEMIFINAL_GAME1)[0].homeTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.SEMIFINAL_GAME1)[0].goalsHomeTeam,

                                    isWinner: false,
                                    isConfirmed: true,
                                    flagSize: 'medium',
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.SEMIFINAL_GAME1)[0].winsAfterPenalties == YesOrNo.YES ? true : false,

                                },
                                this.dataSet[0].children[0].data.awayTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.SEMIFINAL_GAME1)[0].awayTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.SEMIFINAL_GAME1)[0].goalsAwayTeam,
                                    isWinner: false,
                                    isConfirmed: true,
                                    flagSize: 'medium',
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.SEMIFINAL_GAME1)[0].winsAfterPenalties == YesOrNo.YES ? true : false,

                                }
                            )
                        : null;

                        this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.SEMIFINAL_GAME2).length == 1
                        ?   (this.dataSet[0].children[1].data.homeTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.SEMIFINAL_GAME2)[0].homeTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.SEMIFINAL_GAME2)[0].goalsHomeTeam,

                                    isWinner: false,
                                    isConfirmed: true,
                                    flagSize: 'medium',
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.SEMIFINAL_GAME2)[0].winsAfterPenalties == YesOrNo.YES ? true : false,

                                },
                                this.dataSet[0].children[1].data.awayTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.SEMIFINAL_GAME2)[0].awayTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.SEMIFINAL_GAME2)[0].goalsAwayTeam,
                                    isWinner: false,
                                    isConfirmed: true,
                                    flagSize: 'medium',
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.SEMIFINAL_GAME2)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                }
                            )
                        : null;

                        // assign Final
                        this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.FINAL).length == 1
                        ?   (this.dataSet[0].data.homeTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.FINAL)[0].homeTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.FINAL)[0].goalsHomeTeam,
                                    isWinner: false,
                                    isConfirmed: true,
                                    flagSize: 'large',
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.FINAL)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                },
                                this.dataSet[0].data.awayTeam =
                                {
                                    name: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.FINAL)[0].awayTeam.name,
                                    goals: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.FINAL)[0].goalsAwayTeam,
                                    isWinner: false,
                                    isConfirmed: true,
                                    flagSize: 'large',
                                    winsAfterPenalties: this.knockoutGames.filter(z => z.knockoutStageGame == KnockoutStageGame.FINAL)[0].winsAfterPenalties == YesOrNo.YES ? true : false,
                                }
                            )
                        : null;


                }

            },
            error: error => {
                console.log(error);
            }
        })

    }
    assignRoundOf16() {

    }
}
