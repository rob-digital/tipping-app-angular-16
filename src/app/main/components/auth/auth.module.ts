import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './state/user.reducer';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,

        StoreModule.forFeature('appUser', userReducer)

    ],
    exports: [

    ]
})
export class AuthModule { }
