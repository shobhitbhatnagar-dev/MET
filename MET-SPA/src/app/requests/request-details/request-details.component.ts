import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/_model/request';
import { RequestService } from 'src/app/_services/request.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css'],
})
export class RequestDetailsComponent implements OnInit {
  requestbyid: Request;
  projectId: any;
  requestProjectId: any = 0;

  constructor(
    private requestService: RequestService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.route.data.subscribe((data) => {
      // tslint:disable-next-line: no-string-literal
      this.requestbyid = data['request'];
    });
    if (this.requestbyid == null) {
      this.alertify.error('Request Does Not Exsist');
      this.router.navigate(['/requests']);
    } else {
      this.requestProjectId = + this.requestbyid.project.id;
      this.projectId = + this.auth.getProjectAccess();
      if (this.projectId !== this.requestProjectId && this.projectId !== 0 ) {
        this.alertify.error('You do not have access to request of this project');
        this.router.navigate(['/requests']);
      }
    }
    setTimeout(() => {
      /** spinner ends after 0.5 seconds */
      this.spinner.hide();
    }, 500);
  }
}
