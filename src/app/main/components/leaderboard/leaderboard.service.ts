import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestBaseService } from '../../service/request-base.service';
import { AuthService } from '../auth/auth.service';
import { UserData2 } from '../../api/userData';


const API_URL: string = environment.BASE_URL + '/api/v1/leaderboard';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService extends RequestBaseService {

    constructor(http : HttpClient, auth: AuthService) {
        super(auth, http)
       }

  getUsers(): Observable<UserData2[]> {
    return this.http.get<UserData2[]>(API_URL, { headers: this.getHeaders });

  }
}
