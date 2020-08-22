import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/_services/analytics.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Requestcount } from 'src/app/_model/requestcount';
import { RequestService } from 'src/app/_services/request.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Request } from 'src/app/_model/request';

@Component({
  selector: 'app-search-request',
  templateUrl: './search-request.component.html',
  styleUrls: ['./search-request.component.scss'],
})
export class SearchRequestComponent implements OnInit {
  status: any;
  requestid = 0;
  searchType: any;
  maxDate: Date;
  minstartDate: Date;
  startDate: any;
  endDate: any;
  requests: Request[];
  request: Request;
  projectId: any = 0;
  showRequest = false;
  showRequests = false;

  constructor(
    private analytics: AnalyticsService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private requestService: RequestService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate());
    this.minstartDate = new Date();
    this.minstartDate.setDate(this.maxDate.getDate() - 30);
    this.projectId = this.auth.getProjectAccess();
  }

  datefilter() {
    this.startDate = this.minstartDate.toISOString().slice(0, 16);
    this.endDate = this.maxDate.toISOString().slice(0, 16);

    this.analytics
      .getRequestCountsByDate(this.startDate, this.endDate)
      .subscribe(
        (res: Requestcount) => {
          // this.requestCount = res;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  searchById() {
    this.requestService.getRequest(this.requestid).subscribe((requests: Request) => {
      this.request = requests;
      this.showRequest = true;
    }, error => {
      this.alertify.error(error);
      this.showRequest = false;
    });
  }

  statusfilter() {;
    this.requestService.searchRequestsByStatus(this.status).subscribe((requests: Request[]) => {
      this.requests = requests;
      this.showRequests = true;
    }, error => {
      this.showRequests = false;
      this.alertify.error(error);
    });
  }

  onChangestatus(event): void {
    this.status = event.target.value;
  }

  onChangestatusby(): void {
    this.showRequests = false;
    this.showRequest = false;
  }
}
