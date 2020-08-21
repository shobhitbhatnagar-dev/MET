import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/_services/analytics.service';
import { Requestcount } from 'src/app/_model/requestcount';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Modulewiserequest } from 'src/app/_model/modulewiserequest';
import { Projectwiserequestcount } from 'src/app/_model/projectwiserequestcount';
import { Departmentwiserequestcount } from 'src/app/_model/departmentwiserequestcount';
import { UserWiserequestcount } from 'src/app/_model/userWiserequestcount';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-it-dashboardd',
  templateUrl: './it-dashboardd.component.html',
  styleUrls: ['./it-dashboardd.component.css'],
})
export class ItDashboarddComponent implements OnInit {
  requestCount: Requestcount;
  requestCountbyDate: Requestcount;
  moduleWiseRequestCount: Modulewiserequest[];
  projectWiseRequestCount: Projectwiserequestcount[];
  departmentWiseRequestCount: Departmentwiserequestcount[];
  userWiseRequestCount: UserWiserequestcount[];

  constructor(
    private analytics: AnalyticsService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();

    this.analytics.getRequestCounts().subscribe(
      (res: Requestcount) => {
        this.requestCount = res;
      },
      (error) => {
        this.alertify.error(error);
      }
    );

    this.analytics.getModuleWiseRequestCount().subscribe(
      (res: Modulewiserequest[]) => {
        this.moduleWiseRequestCount = res;
      },
      (error) => {
        this.alertify.error(error);
      }
    );

    this.analytics.getProjectWiseRequestCount().subscribe(
      (res: Projectwiserequestcount[]) => {
        this.projectWiseRequestCount = res;
      },
      (error) => {
        this.alertify.error(error);
      }
    );

    this.analytics.getDepartmentWiseRequestCount().subscribe(
      (res: Departmentwiserequestcount[]) => {
        this.departmentWiseRequestCount = res;
      },
      (error) => {
        this.alertify.error(error);
      }
    );

    this.analytics.getUserWiseRequestCount().subscribe(
      (res: UserWiserequestcount[]) => {
        this.userWiseRequestCount = res;
      },
      (error) => {
        this.alertify.error(error);
      }
    );

    setTimeout(() => {
      /** spinner ends after 1 seconds */
      this.spinner.hide();
    }, 1000);
  }
}
