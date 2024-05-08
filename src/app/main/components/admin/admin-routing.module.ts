import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [RouterModule.forChild([
        { path: 'calculate', loadChildren: () => import('./calculate/calculate.module').then(m => m.CalculateModule) },
    ])],
    exports: [RouterModule],
})
export class AdminRoutingModule { }
