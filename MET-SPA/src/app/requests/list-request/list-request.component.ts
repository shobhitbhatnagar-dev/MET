import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/_model/request';
import { RequestService } from 'src/app/_services/request.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.css']
})

export class ListRequestComponent implements OnInit {
requests: Request[];
requestbyid: any;
viewRequest: boolean;

  constructor(private requestService: RequestService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadRequest();
    this.viewRequest = false;
  }

  loadRequest() {
    this.requestService.getRequests().subscribe((requests: Request[]) => {
      this.requests = requests;
    }, error => {
      this.alertify.error(error);
    });
  }

  getRequest(id: number) {
    this.requestService.getRequest(id).subscribe((request: Request) => {
      console.log(request);
      this.requestbyid = request;
    }, error => {
      this.alertify.error(error);
    }, () => {
      if(this.requestbyid) {
        this.viewRequest =true;
      }
    });
  }

  backToRequests() {
    this.viewRequest = false;
  }
}
