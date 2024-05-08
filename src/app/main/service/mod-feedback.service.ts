import { modFeedback, modFeedbackToSubmit } from './../api/mod-feedback';
import { Injectable } from '@angular/core';
import { RequestBaseService } from './request-base.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../components/auth/auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL: string = environment.BASE_URL + '/api/v1/mod';
interface userData {
    userId: number;
    gameId: number;
}

@Injectable({
  providedIn: 'root'
})
export class MODFeedbackService extends RequestBaseService {

    constructor(http: HttpClient, auth: AuthService) { super(auth, http) }

    getMoDFeedback(userId: number): Observable<modFeedback[]> {
        return this.http.get<modFeedback[]>(API_URL + `/${userId}`, { headers: this.getHeaders });
    }

    insertModFeedback(payload: modFeedbackToSubmit) {
        return this.http.post<modFeedbackToSubmit>(API_URL + '/insertFeedback', payload, { headers: this.getHeaders });
    }
}
