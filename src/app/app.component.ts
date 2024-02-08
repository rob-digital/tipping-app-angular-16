import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './main/components/auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig, public auth: AuthService, public router: Router) { }

    ngOnInit() {

        this.primengConfig.ripple = true;

        // if (localStorage.getItem("currentUser") != null) {
        //     this.auth.currentUsername  = JSON.parse(localStorage.getItem("currentUser")).username;
        //   } else {
        //     this.auth.logout();
        //     this.router.navigate(['/auth']);
        //   }
    }
}
