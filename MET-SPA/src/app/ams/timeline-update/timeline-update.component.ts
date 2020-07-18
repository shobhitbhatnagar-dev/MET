import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/_services/request.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { Request } from 'src/app/_model/request';

@Component({
  selector: 'app-timeline-update',
  templateUrl: './timeline-update.component.html',
  styleUrls: ['./timeline-update.component.css']
})
export class TimelineUpdateComponent implements OnInit {
  requestbyid: Request;
  model: any = {};
  minDate: Date;

  constructor(
    private requestService: RequestService,
    private alertify: AlertifyService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private auth: AuthService
  ) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
   }

  ngOnInit() {
    this.activeRoute.data.subscribe((data) => {
      // tslint:disable-next-line: no-string-literal
      this.requestbyid = data['request'];
    });
  }

  updateTimelines() {
    console.log(this.model );
    this.requestService.UpdateTimeline(this.requestbyid.id, this.model).subscribe(next => {
      this.alertify.success('Timeline has been updated sucessfully');
      this.route.navigate(['requests/status/approval']);
    });
  }

}
