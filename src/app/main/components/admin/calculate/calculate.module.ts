import { NgModule } from '@angular/core';
import { CalculateComponent } from './calculate.component';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from "primeng/inputnumber";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AdminRoutingModule } from '../admin-routing.module'; 


@NgModule({
    imports: [
        ToastModule,
        MessageModule,
        TableModule,
        CardModule,
        CommonModule,
        ButtonModule,
        InputNumberModule,
        DropdownModule,
        FormsModule,
        ProgressSpinnerModule,
        AdminRoutingModule,
    ],
    declarations: [CalculateComponent],
})
export class CalculateModule { }
