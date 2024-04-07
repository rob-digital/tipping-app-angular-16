import { NgModule, isDevMode } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { AuthModule } from './main/components/auth/auth.module';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './main/components/notfound/notfound.component';
import { StoreModule } from '@ngrx/store';
// import { PredictionComponent } from './main/components/prediction/prediction.component';
import { PredictionModule } from './main/components/prediction/prediction.module';
import { ButtonModule } from 'primeng/button';
// import { ProductService } from './demo/service/product.service';
import { CountryService } from './main/service/country.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RulesComponent } from './main/components/rules/rules.component';
import { CardModule } from 'primeng/card';
import { EffectsModule } from '@ngrx/effects';
import { GamesEffect } from './main/components/prediction/state/games.effect';
import { TableModule } from 'primeng/table';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { AdminModule } from './main/components/admin/admin.module';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UserhubComponent } from './main/components/userhub/userhub.component';
import { InputTextModule } from 'primeng/inputtext';
import { LeaderboardComponent } from './main/components/leaderboard/leaderboard.component';
import { KnockoutStageComponent } from './main/components/knockout-stage/knockout-stage.component';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
// import { TablesComponent } from './main/components/tables/tables.component';
// import { CustomerService } from './demo/service/customer.service';
// import { EventService } from './demo/service/event.service';
// import { IconService } from './demo/service/icon.service';
// import { NodeService } from './demo/service/node.service';
// import { PhotoService } from './demo/service/photo.service';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools'
@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,
        RulesComponent,
        UserhubComponent,
        LeaderboardComponent,
        KnockoutStageComponent,

        // TablesComponent,
        // PredictionComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        PredictionModule,
        AuthModule,
        AdminModule,
        ButtonModule,
        CardModule,
        TableModule,
        FormsModule,
        CommonModule,
        ProgressSpinnerModule,
        InputTextModule,
        OrganizationChartModule,
        DividerModule,
        TagModule,
        StoreModule.forRoot({}),   // everything loaded outside this module is LAZY LOADING
        EffectsModule.forRoot([GamesEffect]),  // everything loaded outside this module is LAZY LOADING
        StoreDevtoolsModule.instrument({ name: "Tipping APP !!!", maxAge: 25, logOnly: !isDevMode() }),  // must be last one on this list

    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService,
        // CustomerService, EventService, IconService, NodeService,
        // PhotoService, ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
