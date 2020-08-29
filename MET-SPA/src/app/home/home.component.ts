import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerMode = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    public authservices: AuthService
  ) {}

  ngOnInit() {}

  registerToggle() {
    this.registerMode = true;
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

  goAddRequest() {
    this.router.navigate(['newrequest']);
  }

  goToAbout() {
    this.router.navigate(['about']);
  }

  loggedIn() {
    return this.authservices.loggedIn();
  }
}
