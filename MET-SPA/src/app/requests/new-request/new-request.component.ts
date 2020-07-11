import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { RequestService } from 'src/app/_services/request.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css'],
})
export class NewRequestComponent implements OnInit {
  model: any = {};
  id: any;
  constructor(
    private requestService: RequestService,
    private alertify: AlertifyService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {}

  addRequest() {
    this.model.userId = this.auth.getUserId();
    console.log(this.model);
    this.id = this.requestService.addRequest(this.model).subscribe(
      () => {
        this.alertify.success('Request Added Sucessfully');
      },
      (error) => {
        this.alertify.error(error);
        this.router.navigate(['/requests']);
      }
    );
    this.router.navigate(['/requests/']);
  }

 onChangeProject(event): void {
  console.log(event.target.value);

 }

}
