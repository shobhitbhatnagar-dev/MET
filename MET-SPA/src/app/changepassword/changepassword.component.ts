import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  model: any = {};
  userId: number;
  confirmPass: any;

  constructor(private auth: AuthService, private alertify: AlertifyService, private route: Router) { }

  ngOnInit() {
  }

  changepassword() {
    this.userId = this.auth.getUserId();
    this.auth.changePass(this.userId, this.model).subscribe(
      () => {
        this.alertify.success('Password Changed Sucessfully, Login Again');
      },
      (error) => {
        this.alertify.error(error);
      },
      () => {
        localStorage.removeItem('token');
        this.route.navigate(['/home']);
      }
    );
  }

}
