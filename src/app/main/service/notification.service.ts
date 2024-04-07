import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestBaseService } from './request-base.service';
import { AuthService } from '../components/auth/auth.service';
import { Observable } from 'rxjs';
import { Notification } from '../api/Notification';

const API_URL: string = environment.BASE_URL + '/api/v1/notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends RequestBaseService {

  constructor(http: HttpClient, auth: AuthService) { super(auth, http) }

  getNotifications(): Observable<Notification[]> {
   return this.http.get<Notification[]>(API_URL, { headers: this.getHeaders });
  }
}
