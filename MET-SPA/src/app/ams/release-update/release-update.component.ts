import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/_model/request';
import { RequestService } from 'src/app/_services/request.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-release-update',
  templateUrl: './release-update.component.html',
  styleUrls: ['./release-update.component.css'],
})
export class ReleaseUpdateComponent implements OnInit {
  requestbyid: Request;
  model: any = {};
  minDate: Date;

  constructor(
    private requestService: RequestService,
    private alertify: AlertifyService,
    private Activeroute: ActivatedRoute,
    private router: Router
  ) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
  }

  ngOnInit() {
    this.Activeroute.data.subscribe((data) => {
      // tslint:disable-next-line: no-string-literal
      this.requestbyid = data['request'];
    });
  }

  updateRelease() {
    console.log(this.model);
    this.requestService
      .UpdateRelease(this.requestbyid.id, this.model)
      .subscribe((next) => {
        this.alertify.success('Release has been updated sucessfully');
        this.router.navigate(['/requests/status/timelines']);
      });
  }
}
