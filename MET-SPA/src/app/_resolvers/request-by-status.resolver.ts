import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Request} from '../_model/request';
import { RequestService } from '../_services/request.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()

export class RequestByStatusResolver implements Resolve<Request[]> {
constructor( private requestService: RequestService, private router: Router, private alertify: AlertifyService) {}


 resolve(route: ActivatedRouteSnapshot): Observable<Request[]> {
     // tslint:disable-next-line: no-string-literal
     return this.requestService.getRequestsbyStatus(route.params['status']).pipe(
         catchError(error => {
             this.alertify.error('Problem retriving data');
             this.router.navigate(['/home']);
             return of(null);
         })
     );
 }
}
