import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/_services/request.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { MasterService } from 'src/app/_services/master.service';
import { Value } from 'src/app/_model/value';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  model: any = {};
  dept: Value[];
  role: Value[];

  constructor(
    private requestService: RequestService,
    private alertify: AlertifyService,
    private router: Router,
    private auth: AuthService,
    private master: MasterService
  ) {}

  ngOnInit() {
    this.master.getValueByType('dept').subscribe(
      (dept: Value[]) => {
        this.dept = dept;
      },
      (error) => {
        this.alertify.error(error);
      }
    );

    this.master.getValueByType('role').subscribe(
      (role: Value[]) => {
        this.role = role;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  addUser() {
    console.log(this.model);
    this.auth.register(this.model).subscribe(
      () => {
        this.alertify.success('Registered Sucessfully');
      },
      (error) => {
        this.alertify.error(error);
      },
      () => {
        this.router.navigate(['/adduser']);
      }
    );
  }
}
