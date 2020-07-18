import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/_services/request.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from 'src/app/_model/request';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-efforts-update',
  templateUrl: './efforts-update.component.html',
  styleUrls: ['./efforts-update.component.css'],
})
export class EffortsUpdateComponent implements OnInit {
  requestbyid: Request;
  model: any = {};

  constructor(
    private requestService: RequestService,
    private alertify: AlertifyService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.activeRoute.data.subscribe((data) => {
      // tslint:disable-next-line: no-string-literal
      this.requestbyid = data['request'];
    });
  }

  updateEfforts() {
    console.log(this.model );
    this.requestService.UpdateEfforts(this.requestbyid.id, this.model).subscribe(next => {
      this.alertify.success('Efforts has been updated sucessfully');
      this.route.navigate(['requests/status/new']);
    });
  }
}
