import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredictionRoutingModule } from './prediction-routing.module';
import { PredictionComponent } from './prediction.component';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StoreModule } from '@ngrx/store';
import { predictionReducer } from './state/prediction.reducer';
import { slipStateReducer } from './state/slip-state.reducer';
import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { allGamesReducer, gamesByDateReducer } from './state/games.reducer';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';
import { OverlayPanelModule } from 'primeng/overlaypanel';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        PredictionRoutingModule,
        DividerModule,
        DropdownModule,
        PanelModule,
        ProgressSpinnerModule,
        BadgeModule,
        ChipModule,
        ToastModule,
        MessageModule,
        MessagesModule,
        TagModule,
        OverlayPanelModule,
        StoreModule.forFeature('predictionPayload', predictionReducer),     // this ois lazy load, all bellow
        StoreModule.forFeature('slipState', slipStateReducer),
        StoreModule.forFeature('gamesByDate', gamesByDateReducer),
        StoreModule.forFeature('allGames', allGamesReducer),
        // EffectsModule.forFeature([])                     // also lazy load

    ],
    declarations: [PredictionComponent]
})
export class PredictionModule { }
