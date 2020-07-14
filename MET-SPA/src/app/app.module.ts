import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ListRequestComponent } from './requests/list-request/list-request.component';
import { NewRequestComponent } from './requests/new-request/new-request.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { EffortsUpdateComponent } from './ams/efforts-update/efforts-update.component';
import { ReleaseUpdateComponent } from './ams/release-update/release-update.component';
import { TimelineUpdateComponent } from './ams/timeline-update/timeline-update.component';
import { ItDashboarddComponent } from './it-panel/it-dashboardd/it-dashboardd.component';
import { EffortApprovalComponent} from './it-panel/effort-approval/effort-approval.component';
import { AboutComponent } from './about/about.component';
import { appRoutes } from './routes';
import { RequestDetailsComponent } from './requests/request-details/request-details.component';
import { AlertifyService } from './_services/alertify.service';
import { AuthGuard } from './_guards/auth.guard';
import { RequestService } from './_services/request.service';
import { RequestDetailsResolver } from './_resolvers/request-details.resolver';
import { RequestListResolver } from './_resolvers/request-list.resolver';
import { MasterService } from './_services/master.service';
import { RequestByUserResolver } from './_resolvers/request-by-user.resolver';
import { RequestByStatusResolver } from './_resolvers/request-by-status.resolver';
import { RequestByStatusComponent } from './requests/request-by-status/request-by-status.component';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      ListRequestComponent,
      NewRequestComponent,
      AddUserComponent,
      ListUserComponent,
      EffortsUpdateComponent,
      ReleaseUpdateComponent,
      TimelineUpdateComponent,
      ItDashboarddComponent,
      EffortApprovalComponent,
      RequestDetailsComponent,
      NewRequestComponent,
      AboutComponent,
      RequestByStatusComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            // tslint:disable-next-line: object-literal-shorthand
            tokenGetter: tokenGetter,
            whitelistedDomains:['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      RequestService,
      RequestDetailsResolver,
      RequestListResolver,
      RequestService,
      RequestByUserResolver,
      RequestByStatusResolver,
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
