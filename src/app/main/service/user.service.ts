import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { RequestBaseService } from './request-base.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../components/auth/auth.service';
import { Observable, map } from 'rxjs';
import { UserData } from '../api/userData';
import { environment } from 'src/environments/environment';
import { AppUser } from '../api/user';

const USER_URL: string = environment.BASE_URL + '/api/v1/user';

@Injectable({providedIn: 'root'})
export class UserService extends RequestBaseService {
    constructor(http : HttpClient, auth: AuthService, private store: Store<AppUser>) {
        super(auth, http)
       }

       getUserData(userId: number): Observable<any> {

        return this.http.get<UserData>(USER_URL + "/data/" + userId, { headers: this.getHeaders });

    }
}
