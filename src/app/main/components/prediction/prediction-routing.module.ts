import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PredictionComponent } from './prediction.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PredictionComponent}
    ])],
    exports: [RouterModule]
})
export class PredictionRoutingModule { }
