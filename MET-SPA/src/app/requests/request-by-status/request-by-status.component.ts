import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/_model/request';
import { RequestService } from 'src/app/_services/request.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-by-status',
  templateUrl: './request-by-status.component.html',
  styleUrls: ['./request-by-status.component.css']
})
export class RequestByStatusComponent implements OnInit {
  requests: Request[];

  constructor(private requestService: RequestService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.requests = data['requests'];
    });
  }

}
