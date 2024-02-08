import { AppUser, User } from "../api/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { AuthService } from "../components/auth/auth.service";


export abstract class RequestBaseService {

  protected currentUser: AppUser;

  protected constructor(protected auth: AuthService, protected http: HttpClient) {
    this.auth.currentUser$.subscribe(data => {
      this.currentUser = data;
    });
  }

  get getHeaders(): HttpHeaders {

    return new HttpHeaders(
      {
        authorization: 'Bearer ' + this.currentUser?.token,
        "Content-Type": "application/json; charset=UTF-8"
      }
    );
  }
}
