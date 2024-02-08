import { darkModeActive } from './../../../layout/config/state/config.actions';
import { configReducer } from './../../../layout/config/state/config.reducer';
import {  Component, OnInit, Renderer2 } from '@angular/core';
import { TablesService } from './tables.service';
import { Team } from '../../api/team';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AppConfigComponent } from 'src/app/layout/config/app.config.component';
import { Store } from '@ngrx/store';
import { AppConfig, getShowDarkMode } from 'src/app/layout/config/state/config.reducer';
import { render } from '@fullcalendar/core/preact';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

    constructor(
        private tableService: TablesService,
        private layoutService: LayoutService,
        private store: Store<AppConfig>,
        private renderer: Renderer2
        ) {}

    teams: Team[] | null;
    groupNames: string[] = [];
    allGroupsArray: any[] = null;
    inTransit: boolean = false;
    darkMode: boolean;
    colors: string[] = ['blue', 'green', 'red', 'yellow', 'pink', 'orange', 'purple'];
    ngOnInit() {

        this.store.select(getShowDarkMode).subscribe(darkMode => this.darkMode = darkMode);

        this.inTransit = true;
        this.tableService.getAllTeams().subscribe(
            // this.registration ? (this.renderer.addClass(box2, "blockElement"), this.renderer.removeClass(box2, "hiddenElement")) : null

            (response: Team[]) => {
                this.teams = response;
                console.log('this.teams:', this.teams)
                this.teams.forEach(z => {
                  Array.from(z.name).join(" ").replace(/ /g, '')
                });
                console.log('this.teams:', this.teams)

                const groups = new Set(this.teams.map(z => z.groupName))
                this.groupNames = [...groups]

                this.allGroupsArray = [
                  this.teams.filter( (el, i) => el.groupName ==  "Group A").sort((a, b) => a.positionInTable - b.positionInTable),
                  this.teams.filter( (el, i) => el.groupName ==  "Group B").sort((a, b) => a.positionInTable - b.positionInTable),
                  this.teams.filter( (el, i) => el.groupName ==  "Group C").sort((a, b) => a.positionInTable - b.positionInTable),
                  this.teams.filter( (el, i) => el.groupName ==  "Group D").sort((a, b) => a.positionInTable - b.positionInTable),
                  this.teams.filter( (el, i) => el.groupName ==  "Group E").sort((a, b) => a.positionInTable - b.positionInTable),
                  this.teams.filter( (el, i) => el.groupName ==  "Group F").sort((a, b) => a.positionInTable - b.positionInTable),
                //   this.teams.filter( (el, i) => el.groupName ==  "Group G").sort((a, b) => a.positionInTable - b.positionInTable),
                //   this.teams.filter( (el, i) => el.groupName ==  "Group H").sort((a, b) => a.positionInTable - b.positionInTable),
                ]
                console.log('this.allGroupsArray :', this.allGroupsArray)
                this.inTransit = false;


              },
        ),
        (error) => {
            console.log("Tables component error: ", error);

        };
    }

    darkModeORLightMode() {
        this.store.select(getShowDarkMode).subscribe(darkMode => this.darkMode = darkMode)
        console.log('this.darkMode:', this.darkMode)
    }
    // getSeverity(status: string) {
    //     switch (status) {
    //         case 'INSTOCK':
    //             return 'success';
    //         case 'LOWSTOCK':
    //             return 'warning';
    //         case 'OUTOFSTOCK':
    //             return 'danger';
    //     }
    // }

    applyTableBorder(i) {
        return `tableColor-${i}`
    }
}


