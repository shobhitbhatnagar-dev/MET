import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/_model/request';
import { RequestService } from 'src/app/_services/request.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination, PaginatedResult } from 'src/app/_model/pagination';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-list-request-byuser',
  templateUrl: './list-request-byuser.component.html',
  styleUrls: ['./list-request-byuser.component.scss'],
})
export class ListRequestByuserComponent implements OnInit {
  requests: Request[];
  requestbyid: any;
  viewRequest: boolean;
  pagination: Pagination;
  userId: number;

  constructor(
    private requestService: RequestService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.route.data.subscribe((data) => {
      // tslint:disable-next-line: no-string-literal
      this.requests = data['requests'].result;
      // tslint:disable-next-line: no-string-literal
      this.pagination = data['requests'].pagination;
    });
    setTimeout(() => {
      /** spinner ends after 0.5 seconds */
      this.spinner.hide();
    }, 500);
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadRequests();
  }

  loadRequests() {
    this.userId = this.auth.getUserId();
    // tslint:disable-next-line: no-string-literal
    this.requestService.getRequestsbyUser(this.userId, this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<Request[]>) => {
        this.requests = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }
}
