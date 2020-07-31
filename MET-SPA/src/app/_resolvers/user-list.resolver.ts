import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Request } from '../_model/request';
import { RequestService } from '../_services/request.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../_model/user';
import { MasterService } from '../_services/master.service';

@Injectable()
export class UserListResolver implements Resolve<User[]> {
  constructor(
    private master: MasterService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    // tslint:disable-next-line: no-string-literal
    return this.master.getUsers().pipe(
      catchError((error) => {
        this.alertify.error('Problem retriving data');
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
