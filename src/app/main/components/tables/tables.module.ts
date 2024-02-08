import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesComponent } from './tables.component';
import { TablesRoutingModule } from './tables-routing.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import {StyleClassModule} from 'primeng/styleclass';
import { CardModule } from 'primeng/card';

@NgModule({
  imports: [
    CommonModule,
    TablesRoutingModule,
    ProgressSpinnerModule,
    TableModule,
    TagModule,
    BadgeModule,
    StyleClassModule,
    CardModule
  ],
  declarations: [TablesComponent]
})
export class TablesModule { }
