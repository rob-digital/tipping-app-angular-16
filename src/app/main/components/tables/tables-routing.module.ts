import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TablesComponent } from './tables.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: TablesComponent}
    ])],
    exports: [RouterModule]
})
export class TablesRoutingModule { }
