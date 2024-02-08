import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Team } from '../../api/team';
import { RequestBaseService } from '../../service/request-base.service';
import { AuthService } from '../auth/auth.service';

const API_URL: string = environment.BASE_URL + '/api/v1/tables';

@Injectable({
  providedIn: 'root'
})
export class TablesService extends RequestBaseService {


  constructor( http: HttpClient, auth: AuthService) {
    super(auth, http)
  }

  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(API_URL, { headers: this.getHeaders });
  }
}
