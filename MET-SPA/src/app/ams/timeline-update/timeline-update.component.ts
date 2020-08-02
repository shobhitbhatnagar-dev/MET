import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/_services/request.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from 'src/app/_model/request';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-timeline-update',
  templateUrl: './timeline-update.component.html',
  styleUrls: ['./timeline-update.component.css'],
})
export class TimelineUpdateComponent implements OnInit {
  requestbyid: Request;
  model: any = {};
  minDate: Date;
  requestInProgress: boolean;

  constructor(
    private requestService: RequestService,
    private alertify: AlertifyService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private spinner: NgxSpinnerService
  ) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
  }

  ngOnInit() {
    this.spinner.show();
    this.activeRoute.data.subscribe((data) => {
      // tslint:disable-next-line: no-string-literal
      this.requestbyid = data['request'];
    });
    setTimeout(() => {
      /** spinner ends after 0.2 seconds */
      this.spinner.hide();
    }, 200);
  }

  updateTimelines() {
    this.spinner.show();
    this.requestInProgress = false;
    console.log(this.model);
    this.requestService
      .UpdateTimeline(this.requestbyid.id, this.model)
      .subscribe(
        (next) => {
          this.alertify.success('Timeline has been updated sucessfully');
          this.route.navigate(['requests/status/approval']);
        },
        (error) => {
          this.spinner.hide();
          this.requestInProgress = true;
          this.alertify.error(error);
        }
      );
    this.requestInProgress = true;
    setTimeout(() => {
      /** spinner ends after 4 seconds */
      this.spinner.hide();
    }, 3000);
  }
}
