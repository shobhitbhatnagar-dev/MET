import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/_model/request';
import { RequestService } from '../_services/request.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-uat-update',
  templateUrl: './uat-update.component.html',
  styleUrls: ['./uat-update.component.css'],
})
export class UatUpdateComponent implements OnInit {
  requestbyid: Request;
  model: any = {};
  fileSelected: any = null;
  requestInProgress: boolean;
  minDate: Date;

  constructor(
    private requestService: RequestService,
    private alertify: AlertifyService,
    private Activeroute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
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

  updateUAT() {
    console.log(this.model);
  }
}
