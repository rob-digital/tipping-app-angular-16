import { Store } from '@ngrx/store';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AppUser, User } from '../main/api/user';
import { Role } from '../main/api/role';
import { AppConfig2, getShowDarkMode } from './config/state/config.reducer';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    currentUser: User;
    darkMode: boolean;


    constructor(public layoutService: LayoutService, private store: Store<AppUser>, private store2: Store<AppConfig2>) { }

    ngOnInit() {
        this.store.select(getShowDarkMode).subscribe(darkMode => this.darkMode = darkMode);

        const storageUserAsObj = localStorage.getItem('currentUser');
        if (storageUserAsObj) {
            this.currentUser = JSON.parse(storageUserAsObj);
        }

        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'Action',
                items: [
                    {
                        label: 'Predict',
                        icon: 'pi pi-fw pi-check-square',
                        routerLink: ['/dashboard/predict'],
                        // items: [
                        //     {
                        //         label: 'Show all games',
                        //         icon: 'pi pi-fw pi-th-large',
                        //         routerLink: ['/dashboard/predict'],
                        //         // routerLinkActiveOptions: this.isLinkActive(true)
                        //     },
                        //     {
                        //         label: 'By date',
                        //         items: [
                        //             { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                        //             { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                        //             { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                        //         ],
                        //         icon: 'pi pi-fw pi-calendar-minus',
                        //         routerLink: ['/auth/error']
                        //     },
                        //     {
                        //         label: 'Access Denied',
                        //         icon: 'pi pi-fw pi-lock',
                        //         routerLink: ['/auth/access']
                        //     }
                        // ]
                     },
                ]
            },
            {
                label: 'Data',
                items: [
                    { label: 'Leaderboard', icon: 'pi pi-fw pi-users', routerLink: ['/dashboard/leaderboard'], badge: 'NEW' },
                    { label: 'Tables', icon: 'pi pi-fw pi-table', routerLink: ['/dashboard/tables'] },
                    { label: 'Knockout stage', icon: 'pi pi-fw pi-align-center', routerLink: ['/dashboard/knockout'] },
                    { label: 'My Hub', icon: 'pi pi-fw pi-user', routerLink: ['/dashboard/hub'] },
                    { label: 'Top performance', icon: 'pi pi-fw pi-flag', routerLink: ['/dashboard/topPerformance'] },
                ]
            },
            this.currentUser.role == Role.ADMIN
            ? {
                    label: 'Admin',
                    items: [
                        { label: 'Calculate', icon: 'pi pi-fw pi-plus-circle', routerLink: ['/admin/calculate'] },
                        { label: 'Rules', icon: 'pi pi-fw pi-briefcase', routerLink: ['/dashboard/rules'] },
                    ]
                }
            :   {
                    label: 'Admin',
                    items: [
                        { label: 'Rules', icon: 'pi pi-fw pi-briefcase', routerLink: ['/dashboard/rules'] },
                    ]
                }

        ];
    }
}
