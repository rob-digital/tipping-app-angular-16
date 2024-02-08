import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AppUser, User } from '../../api/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { getBoosters, getCreateTime, getUserId, getPoints, getRole, getToken, getUsername } from './state/user.reducer';
import { Store } from '@ngrx/store';
import * as UserActions from './state/user.actions';
import { Role } from '../../api/role';

const API_URL: string = environment.BASE_URL + '/api/v1/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

    public currentUser$: Observable<AppUser>;
    private currentUserSubject: BehaviorSubject<AppUser>;
    currentUsername: any;

    loginInTransit: boolean = false;

    // -user data NgRx ----------
    username: string;
    userRole: Role
    boosters: number;
    points: number;
    token: string;
    id: number;


    constructor(private http: HttpClient, public router: Router, private store: Store<AppUser>) {
        let storageUser;
        const storageUserAsObj = localStorage.getItem('currentUser');
        if (storageUserAsObj) {
            storageUser = JSON.parse(storageUserAsObj);
            console.log('storageUser:', storageUser)
        }

        this.currentUserSubject = new BehaviorSubject<AppUser>(storageUser);
        if (this.currentUserSubject.value != null) {
            this.boosters = this.currentUserSubject.value.boosters;
            this.points = this.currentUserSubject.value.points;
            this.setUserState(this.currentUserSubject.value);
        }
        this.currentUser$ = this.currentUserSubject.asObservable();
    }

    // public get currentUserValue(): AppUser {
    //     return this.currentUserSubject.value;
    // }

    setUserState(user: AppUser) {
        this.store.dispatch(UserActions.setId({id: user.id}));
        this.store.dispatch(UserActions.setUsername({username: user.username}));
        this.store.dispatch(UserActions.setRole({role: user.role}));
        this.store.dispatch(UserActions.setPoints({points: user.points}));
        this.store.dispatch(UserActions.setBoosters({boosters: user.boosters}));
        this.store.dispatch(UserActions.setCreateTime({createTime: user.createTime}));
        this.store.dispatch(UserActions.setToken({token: user.token}));
    }

    readUserState(): AppUser {

        let myAppUser: AppUser = {
            id: 0,
            token: "",
            createTime: "",
            role: Role.USER,
            username: "",
            points: 0,
            boosters: 0
        }

        this.store.select(getUserId).subscribe(id => myAppUser.id = id);
        this.store.select(getUsername).subscribe(username => myAppUser.username = username);
        this.store.select(getRole).subscribe(role => myAppUser.role = role);
        this.store.select(getPoints).subscribe(points => myAppUser.points = points);
        this.store.select(getBoosters).subscribe(boosters => myAppUser.boosters = boosters);
        this.store.select(getToken).subscribe(token => myAppUser.token = token);
        this.store.select(getCreateTime).subscribe(time => myAppUser.createTime = time);

        return myAppUser;
    }


    register(user: User, rememberMe: boolean): Observable<any> {
        return this.http.post<User>(API_URL + "/register", user).pipe(
            map(response => {
                if (response) {
                    this.router.navigate(['/dashboard']);

                    this.setUserState(response);
                    this.setSessionUser(this.readUserState());
                }
            })
        )
    }

    login(user: User, rememberMe: boolean): Observable<any> {
        return this.http.post<User>(API_URL + "/authenticate", user).pipe(
            map(response => {
                if (response) {
                    this.router.navigate(['/dashboard']);
                    // rememberMe ? this.setSessionUser(response) : null;

                    this.setUserState(response);
                    this.setSessionUser(this.readUserState());
                }
            })
        )
    }
    // setSessionUser2(user: AppUser) {
    //     localStorage.setItem('currentUser', JSON.stringify(user));
    //     this.currentUsername = user.username;
    // }

    // loadSessionUser2() {
    //     let user  = JSON.parse(localStorage.getItem("currentUser"));
    //     this.id       = user.id;
    //     this.username = user.username;
    //     this.points   = user.points;
    //     this.boosters = user.boosters;
    //     this.userRole = user.role;
    //     this.token    = user.token;
    // }

    setSessionUser(user: AppUser) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.currentUsername = user.username;
        this.boosters = user.boosters;
        this.points = user.points;
        // this.userRole = user.role;
    }

    logout() {
        this.removeUserFromSession();
      }

    removeUserFromSession() {
        this.currentUsername = null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(new User);
    }

    // fetchUserData(): Observable<any> {
    //     return this.http.get<any>(environment.BASE_URL + '/api/v1/user');
    // }
}
