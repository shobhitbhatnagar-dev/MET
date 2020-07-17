import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/_services/request.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { Request } from 'src/app/_model/request';

@Component({
  selector: 'app-effort-approval',
  templateUrl: './effort-approval.component.html',
  styleUrls: ['./effort-approval.component.css']
})

export class EffortApprovalComponent implements OnInit {
  requestbyid: Request;
  model: any = {};

  constructor(
    private requestService: RequestService,
    private alertify: AlertifyService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.activeRoute.data.subscribe((data) => {
      // tslint:disable-next-line: no-string-literal
      this.requestbyid = data['request'];
    });
  }

  updateApproval() {
    this.model.approverId = this.auth.getUserId();
    this.model.approver = this.auth.getUsername();
    console.log(this.model );
    this.requestService.UpdateApproval(this.requestbyid.id, this.model).subscribe(next => {
      this.alertify.success('Approval has been updated sucessfully');
      this.route.navigate(['requests/status/effort']);
    });
  }

}
