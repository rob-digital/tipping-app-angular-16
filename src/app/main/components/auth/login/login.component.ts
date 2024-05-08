import { Component, OnInit, Renderer2 } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {  User } from 'src/app/main/api/user';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppConfig2, getShowDarkMode } from 'src/app/layout/config/state/config.reducer';

enum SubmitButton {
    SIGNIN = 'SIGNIN',
    REGISTER = 'REGISTER'
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})


export class LoginComponent implements OnInit {

    valCheck: string[] = ['remember'];
    registration: boolean | null;
    isBackwards: boolean;
    inTransit: boolean = false;
    rememberMeLogin: boolean = false;
    rememberMeReg: boolean = false;

    // sign-in variables -----
    userSignIn: User = new User;
    canSubmitUsernameSignIn: boolean | null;
    canSubmitPasswordSignIn: boolean | null;
    errorMessagePasswordSignIn: string | null;
    errorMessageUsernameSignIn: string | null;
    guestNumberOfGoals: number | null = null;
    // register variables -----
    userRegister: User = new User;
    canSubmitUsernameRegister: boolean | null;
    canSubmitPasswordRegister: boolean | null;
    errorMessagePasswordRegister: string | null;
    errorMessageUsernameRegister: string | null;
    darkMode: boolean;

    constructor(public layoutService: LayoutService,
                private renderer:Renderer2,
                private auth: AuthService,
                private store: Store<AppConfig2>,

                ) {}

    ngOnInit(): void {
        this.isBackwards = true;
        this.registration = null;
        this.store.select(getShowDarkMode).subscribe(darkMode => this.darkMode = darkMode);

        // this.auth.loadSessionUser2()
    }

    displayRegistrationForm(e) {
        this.registration = true;
        let box1 = document.getElementById('box1');
        let box2 = document.getElementById('box2');
        this.isBackwards = false

            // this.registration ? (this.renderer.addClass(box1, "hiddenElement"), this.renderer.removeClass(box1, "blockElement")) : null
            this.registration ? (this.renderer.addClass(box2, "blockElement"), this.renderer.removeClass(box2, "hiddenElement")) : null

            setTimeout(() => {
                this.registration ? (this.renderer.addClass(box1, "hiddenElement"), this.renderer.removeClass(box1, "blockElement")) : null

            }, 100)
    }

    displayLoginForm(e) {
        this.registration = false;
        let box1 = document.getElementById('box1');
        let box2 = document.getElementById('box2');

            !this.registration ? (this.renderer.addClass(box1, "blockElement"), this.renderer.removeClass(box1, "hiddenElement")) : null
            !this.registration ? (this.renderer.addClass(box2, "hiddenElement"), this.renderer.removeClass(box2, "blockElement")) : null
    }

    Register(e) {

        if (e.currentTarget.id.toUpperCase() == SubmitButton.REGISTER) {
            let action = e.currentTarget.id.toString().toUpperCase().toLowerCase().charAt(0).toUpperCase() + e.currentTarget.id.toString().toUpperCase().slice(1);

            if (this.userRegister.password == null || this.userRegister.password == "") {
                this.canSubmitPasswordRegister = false;
                this.canSubmitPasswordRegister == false ? this.errorMessagePasswordRegister = "Password cannot be empty": null;
                return;
            }

            if (this.userRegister.username == null || this.userRegister.username == "") {
                this.canSubmitUsernameRegister = false;
                this.canSubmitUsernameRegister == false ? this.errorMessageUsernameRegister = "Username cannot be empty" : null;
                return;
            }

            this.canSubmitUsernameRegister = true;
            this.canSubmitPasswordRegister = true;

            if (this.canSubmitUsernameRegister && this.canSubmitPasswordRegister) {
                this.inTransit = true;

                this.auth.register(this.userRegister, this.rememberMeLogin).subscribe(res => {

                        this.userRegister.username = '';
                        this.userRegister.password = '';
                        this.inTransit = false;
                });
            }
        }
    }

    SignIn(e) {
        if (e.currentTarget.id.toUpperCase() == SubmitButton.SIGNIN) {

            let action = e.currentTarget.id.toString().toUpperCase().toLowerCase().charAt(0).toUpperCase() + e.currentTarget.id.toString().toUpperCase().slice(1);

            if (this.userSignIn.password == null || this.userSignIn.password == "") {
                this.canSubmitPasswordSignIn = false;
                this.canSubmitPasswordSignIn == false ? this.errorMessagePasswordSignIn = "Password cannot be empty": null;
                return;
            }

            if (this.userSignIn.username == null || this.userSignIn.username == "") {
                this.canSubmitUsernameSignIn = false;
                this.canSubmitUsernameSignIn == false ? this.errorMessageUsernameSignIn = "Username cannot be empty" : null;
                return;
            }

            this.canSubmitUsernameSignIn = true;
            this.canSubmitPasswordSignIn = true;

            if (this.canSubmitUsernameSignIn && this.canSubmitPasswordSignIn) {
                this.inTransit = true;

                this.auth.login(this.userSignIn, this.rememberMeLogin).subscribe(res => {
                    if (res != null) {
                        this.userSignIn.username = '';
                        this.userSignIn.password = '';
                        this.inTransit = false;
                    }
                })
            }
        }
    }

    checkInputUsernameReg() {
        this.userRegister.username == null || this.userRegister.username == '' ? this.canSubmitUsernameRegister = false : this.canSubmitUsernameRegister = true;
        this.canSubmitUsernameRegister == false ? this.errorMessageUsernameRegister = "Username cannot be empty" : this.errorMessageUsernameRegister = null;
    }

    checkInputPasswordReg() {
        this.userRegister.password == null || this.userRegister.password == '' ? this.canSubmitPasswordRegister = false : this.canSubmitPasswordRegister = true;
        this.canSubmitPasswordRegister == false ? this.errorMessagePasswordRegister = "Password cannot be empty" : this.errorMessagePasswordRegister = null;
    }

    checkInputUsernameSignIn() {
        this.userSignIn.username == null || this.userSignIn.username == '' ? this.canSubmitUsernameSignIn = false : this.canSubmitUsernameSignIn = true;
        this.canSubmitUsernameSignIn == false ? this.errorMessageUsernameSignIn = "Username cannot be empty" : this.errorMessageUsernameSignIn = null;
    }

    checkInputPasswordSignIn() {
        this.userSignIn.password == null || this.userSignIn.password == '' ? this.canSubmitPasswordSignIn = false : this.canSubmitPasswordSignIn = true;
        this.canSubmitPasswordSignIn == false ? this.errorMessagePasswordSignIn = "Password cannot be empty" : this.errorMessagePasswordSignIn = null;
    }
}
