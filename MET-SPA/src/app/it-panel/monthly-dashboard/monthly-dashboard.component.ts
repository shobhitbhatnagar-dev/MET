import { Component, OnInit } from '@angular/core';
import { Requestcount } from 'src/app/_model/requestcount';
import { AnalyticsService } from 'src/app/_services/analytics.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Modulewiserequest } from 'src/app/_model/modulewiserequest';
import { Departmentwiserequestcount } from 'src/app/_model/departmentwiserequestcount';

@Component({
  selector: 'app-monthly-dashboard',
  templateUrl: './monthly-dashboard.component.html',
  styleUrls: ['./monthly-dashboard.component.css'],
})
export class MonthlyDashboardComponent implements OnInit {
  maxDate: Date;
  minstartDate: Date;
  requestCount: Requestcount;
  moduleCount: Modulewiserequest[];
  departmentCount: Departmentwiserequestcount[];
  sumModuleEffort: number;
  startDate: any;
  endDate: any;

  constructor(
    private analytics: AnalyticsService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate());
    this.minstartDate = new Date();
    this.minstartDate.setDate(this.maxDate.getDate() - 30);

    this.analytics.getRequestCountsByDate().subscribe(
      (res: Requestcount) => {
        this.requestCount = res;
      },
      (error) => {
        this.alertify.error(error);
      }
    );

    this.analytics.getModuleWiseCountsByDate().subscribe(
      (res: Modulewiserequest[]) => {
        this.moduleCount = res;
      },
      (error) => {
        this.alertify.error(error);
      }
    );

    this.analytics
      .getDepartmentWiseCountsByDate(this.startDate, this.endDate)
      .subscribe(
        (res: Departmentwiserequestcount[]) => {
          this.departmentCount = res;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  dashboardUpdate() {
    this.startDate = this.minstartDate.toISOString().slice(0, 16);
    this.endDate = this.maxDate.toISOString().slice(0, 16);

    this.analytics
      .getRequestCountsByDate(this.startDate, this.endDate)
      .subscribe(
        (res: Requestcount) => {
          this.requestCount = res;
        },
        (error) => {
          this.alertify.error(error);
        }
      );

    this.analytics
      .getModuleWiseCountsByDate(this.startDate, this.endDate)
      .subscribe(
        (res: Modulewiserequest[]) => {
          this.moduleCount = res;
        },
        (error) => {
          this.alertify.error(error);
        }
      );

    this.analytics
      .getDepartmentWiseCountsByDate(this.startDate, this.endDate)
      .subscribe(
        (res: Departmentwiserequestcount[]) => {
          this.departmentCount = res;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
}
