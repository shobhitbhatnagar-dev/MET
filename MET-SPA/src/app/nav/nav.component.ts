import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};
userId: any;
requestUrl: any;

  constructor(public authservices: AuthService, private alertify: AlertifyService, private route: Router) { }

  ngOnInit() {
  }

  login() {
    this.authservices.login(this.model).subscribe(next => {
      this.alertify.success('Logged in sucessfully');
    }, error => {
      this.alertify.error(error);
    });
  }

  loggedIn() {
    return this.authservices.loggedIn();
  }

  loggedOut() {
    localStorage.removeItem('token');
    this.route.navigate(['/home']);
    this.alertify.success('logged out');
  }

  checkRole(role: string) {
    return this.authservices.checkRole(role);
  }

  requestbyUser() {
    this.userId = this.authservices.getUserId();
    this.requestUrl  = 'requests/user/' + this.userId ;
    console.log(this.requestUrl);
    this.route.navigate([this.requestUrl]);
  }

}
