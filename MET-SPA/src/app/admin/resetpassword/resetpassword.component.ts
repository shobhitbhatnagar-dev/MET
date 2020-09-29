import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router,  ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { User } from 'src/app/_model/user';
import { MasterService } from 'src/app/_services/master.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
})
export class ResetpasswordComponent implements OnInit {
  model: any = {};
  userId: number;
  confirmPass: any;
  user: User;

  constructor(
    private auth: AuthService,
    private alertify: AlertifyService,
    private route: Router,
    private aroute: ActivatedRoute,
    private master: MasterService
  ) {}

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    this.userId = this.aroute.snapshot.params['id'];
    this.master
    .getUser(this.userId)
    .subscribe(
      (res: User) => {
        this.user = res;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  changepassword(id: number) {
    this.auth.changePass(id, this.model).subscribe(
      () => {
        this.alertify.success('Password Reseted Successfully: UserId-' + id);
      },
      (error) => {
        this.alertify.error(error);
      },
      () => {
        this.route.navigate(['/users']);
      }
    );
  }
}
