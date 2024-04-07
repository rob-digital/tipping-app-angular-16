import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [RouterModule.forChild([
        { path: 'calculate', loadChildren: () => import('./calculate/calculate.module').then(m => m.CalculateModule) },
        // { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
        // { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        // { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule],
})
export class AdminRoutingModule { }
