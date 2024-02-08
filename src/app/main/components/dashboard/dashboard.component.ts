import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
// import { Product } from '../../api/product';
// import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../auth/auth.service';
import { Role } from '../../api/role';
import { PredictionService } from '../prediction/prediction.service';
import { UIChart } from 'primeng/chart';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];
    @ViewChild('chart') chart: UIChart;
    // products!: Product[];

    chartData: any;
    chartOptions: any;
    subscription!: Subscription;
    points: number;
    boosters: number;
    dataInTransit: boolean = false;
    userData: {
        id: number;
        createTime: string;
        role: Role;
        token: string;
        username: string;
        points: number;
        boosters: number;
    }

    constructor(
        public layoutService: LayoutService,
        private predictionService: PredictionService,
        public auth: AuthService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.points = this.auth.points;
        this.boosters = this.auth.boosters;
        this.userData = this.auth.readUserState();

        this.predictionService.getUserPredictions(this.userData.id).subscribe({
            next: response => {
                this.dataInTransit = true;
                console.log('response:', response)
                // this.chartData = response;
                this.initChart();
                this.chartData.datasets[0].data = response.map(z => z.points);
                this.dataInTransit = false;

            },
            error: error => {
                console.log("Can't load user predictions", error);
            }
        })

        setTimeout(() => {
        },1000)

        // this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];


    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');



        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };



        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,

                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                        precision: 0,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            },
            // options: {
            //     scale: {
            //       ticks: {
            //         precision: 0
            //       }
            //     }
            //   }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
