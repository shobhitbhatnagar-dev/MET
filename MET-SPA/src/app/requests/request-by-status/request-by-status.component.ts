import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/_model/request';
import { RequestService } from 'src/app/_services/request.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination, PaginatedResult } from 'src/app/_model/pagination';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-request-by-status',
  templateUrl: './request-by-status.component.html',
  styleUrls: ['./request-by-status.component.css']
})
export class RequestByStatusComponent implements OnInit {
  requests: Request[];
  status: any;
  pagination: Pagination;
  projectId: any = 0;

  constructor(
    private requestService: RequestService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private auth: AuthService
    ) { }

  ngOnInit() {
    this.spinner.show();
    this.route.data.subscribe(data => {
    // tslint:disable-next-line: no-string-literal
      this.requests = data['requests'].result;
      // tslint:disable-next-line: no-string-literal
      this.pagination = data['requests'].pagination;
    });
    // tslint:disable-next-line: no-string-literal
    this.status = this.route.snapshot.params['status'];
    this.projectId = this.auth.getProjectAccess();
    setTimeout(() => {
      /** spinner ends after 1 seconds */
      this.spinner.hide();
    }, 1000);
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadRequests();
  }

  loadRequests() {
    // tslint:disable-next-line: no-string-literal
    this.requestService.getRequestsbyStatus(this.status, this.projectId, this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<Request[]>) => {
        this.requests = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }
}
