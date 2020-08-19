import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Request} from '../_model/request';
import { RequestService } from '../_services/request.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()

export class RequestByUserResolver implements Resolve<Request[]> {
constructor( private requestService: RequestService, private router: Router, private alertify: AlertifyService) {}
pageNumber = 1;
pageSize = 2;

 resolve(route: ActivatedRouteSnapshot): Observable<Request[]> {
     // tslint:disable-next-line: no-string-literal
     return this.requestService.getRequestsbyUser(route.params['id'], this.pageNumber, this.pageSize).pipe(
         catchError(error => {
             this.alertify.error('Problem retriving data');
             this.router.navigate(['/home']);
             return of(null);
         })
     );
 }
}
