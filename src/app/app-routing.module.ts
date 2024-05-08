import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './main/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { RulesComponent } from './main/components/rules/rules.component';
import { CalculateComponent } from './main/components/admin/calculate/calculate.component';
import { UserhubComponent } from './main/components/userhub/userhub.component';
import { LeaderboardComponent } from './main/components/leaderboard/leaderboard.component';
import { KnockoutStageComponent } from './main/components/knockout-stage/knockout-stage.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: "", redirectTo: "auth", pathMatch: "full"},
            { path: "admin/calculate", component: CalculateComponent},
            { path: 'auth', loadChildren: () => import('./main/components/auth/auth.module').then(m => m.AuthModule) },

            {
                path: 'dashboard', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./main/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'predict', loadChildren: () => import('./main/components/prediction/prediction.module').then(m => m.PredictionModule) },
                    { path: 'tables', loadChildren: () => import('./main/components/tables/tables.module').then(m => m.TablesModule) },
                    { path: 'hub', component: UserhubComponent },
                    { path: 'leaderboard', component: LeaderboardComponent },
                    { path: "rules", component: RulesComponent},
                    { path: "knockout", component: KnockoutStageComponent},
                ]
            },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
