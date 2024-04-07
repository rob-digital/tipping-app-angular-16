import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Team } from '../../api/team';
import { TablesService } from '../tables/tables.service';
import { sortIntoTables } from '../tables/tables.component';

interface KnockoutTeam {
    name: string;
    goals: number | null;
    isWinner: boolean;
    isConfirmed: boolean;
}
@Component({
  selector: 'app-knockout-stage',
  templateUrl: './knockout-stage.component.html',
  styleUrls: ['./knockout-stage.component.scss']
})
export class KnockoutStageComponent implements OnInit{

    constructor(private tableService: TablesService) {}

    teams: Team[] | null;
    groups: any[] = null;

    // roundOf16_game1_homeTeam: KnockoutTeam | null = null;
    // roundOf16_game1_awayTeam: KnockoutTeam | null = null;

    // roundOf16_game2_homeTeam: KnockoutTeam | null = null;
    // roundOf16_game2_awayTeam: KnockoutTeam | null = null;

    // roundOf16_game3_homeTeam: KnockoutTeam | null = null;
    // roundOf16_game3_awayTeam: KnockoutTeam | null = null;

    // roundOf16_game4_homeTeam: KnockoutTeam | null = null;
    // roundOf16_game4_awayTeam: KnockoutTeam | null = null;

    // roundOf16_game5_homeTeam: KnockoutTeam | null = null;
    // roundOf16_game5_awayTeam: KnockoutTeam | null = null;

    // roundOf16_game6_homeTeam: KnockoutTeam | null = null;
    // roundOf16_game6_awayTeam: KnockoutTeam | null = null;

    // roundOf16_game7_homeTeam: KnockoutTeam | null = null;
    // roundOf16_game7_awayTeam: KnockoutTeam | null = null;

    // roundOf16_game8_homeTeam: KnockoutTeam | null = null;
    // roundOf16_game8_awayTeam: KnockoutTeam | null = null;

    // quarterFinal_game1_homeTeam: KnockoutTeam | null = null;
    // quarterFinal_game1_awayTeam: KnockoutTeam | null = null;

    // quarterFinal_game2_homeTeam: KnockoutTeam | null = null;
    // quarterFinal_game2_awayTeam: KnockoutTeam | null = null;

    // quarterFinal_game3_homeTeam: KnockoutTeam | null = null;
    // quarterFinal_game3_awayTeam: KnockoutTeam | null = null;

    // quarterFinal_game4_homeTeam: KnockoutTeam | null = null;
    // quarterFinal_game4_awayTeam: KnockoutTeam | null = null;

    // semiFinal_game1_homeTeam: KnockoutTeam | null = null;
    // semiFinal_game1_awayTeam: KnockoutTeam | null = null;

    // semiFinal_game2_homeTeam: KnockoutTeam | null = null;
    // semiFinal_game2_awayTeam: KnockoutTeam | null = null;

    homeTeam: KnockoutTeam | null = null;
    awayTeam: KnockoutTeam | null = null;

    dataSet: TreeNode[] = [
        {
            label: "",
            expanded: true,
            type: 'koStage',
            data: {
            textSize: 'text-xl',

                    homeTeam: { name: 'Winner Match 49', goals: null, isWinner: false, isConfirmed: false},
                    awayTeam: { name: 'Winner Match 50', goals: null, isWinner: false, isConfirmed: false}
            },
            children: [
                {
                    label: 'Winner Match 45 vs Winner Match 46',
                    expanded: true,
                    type: 'koStage',
                    data: {
                    textSize: 'text-lg',

                        homeTeam: { name: 'Winner Match 45', goals: null, isWinner: false, isConfirmed: false },
                        awayTeam: { name: 'Winner Match 46', goals: null, isWinner: false, isConfirmed: false }
                    },
                    children: [
                        {
                            label: 'Winner Match 39	vs Winner Match 37',
                            expanded: true,
                            type: 'koStage',
                            data: {
                            textSize: 'text-md',

                                homeTeam: { name: 'Winner Match 39', goals: null, isWinner: false, isConfirmed: false },
                                awayTeam: { name: 'Winner Match 37', goals: null, isWinner: false, isConfirmed: false }
                            },
                            children: [
                                {

                                    label: 'Winner Group B vs 3rd Group A/D/E/F',
                                    type: 'koStage',
                                        data: {
                                        textSize: 'text-md',

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
                                textSize: 'text-md',
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
                        textSize: 'text-lg',
                            homeTeam: { name: 'Winner Match 47', goals: null, isWinner: false, isConfirmed: false},
                            awayTeam: { name: 'Winner Match 48', goals: null, isWinner: false, isConfirmed: false}
                    },
                    children: [
                        {
                            label: 'Winner Match 43 vs Winner Match 44',
                            expanded: true,
                            type: 'koStage',
                            data: {
                                textSize: 'text-md',
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
                                textSize: 'text-md',
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
        this.tableService.getAllTeams().subscribe({
            next: response => {
                this.groups = sortIntoTables(response);
                console.log('this.groups:', this.groups)
            },
            error: error => {
                console.log(error);
            }
        })

    }
    assignRoundOf16() {

    }
}
