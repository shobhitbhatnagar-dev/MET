import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule} from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
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
import { RequestByUserResolver } from './_resolvers/request-by-user.resolver';
import { RequestByStatusResolver } from './_resolvers/request-by-status.resolver';
import { RequestByStatusComponent } from './requests/request-by-status/request-by-status.component';
import { ListProjectComponent } from './admin/list-project/list-project.component';
import { AddProjectComponent } from './admin/add-project/add-project.component';
import { AddModuleComponent } from './admin/add-module/add-module.component';
import { UserListResolver } from './_resolvers/user-list.resolver';
import { UatUpdateComponent } from './uat-update/uat-update.component';
import { AdminGuard } from './_guards/admin.guard';
import { DevGuard } from './_guards/dev.guard';
import { UatGuard } from './_guards/uat.guard';
import { ItGuard } from './_guards/it.guard';
import { ListRequestByuserComponent } from './requests/list-request-byuser/list-request-byuser.component';
import { AnalyticsService } from './_services/analytics.service';
import { MonthlyDashboardComponent } from './it-panel/monthly-dashboard/monthly-dashboard.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ResetpasswordComponent } from './admin/resetpassword/resetpassword.component';
import { SearchRequestComponent } from './it-panel/search-request/search-request.component';

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
      ListRequestByuserComponent,
      ListProjectComponent,
      AddProjectComponent,
      AddModuleComponent,
      UatUpdateComponent,
      MonthlyDashboardComponent,
      ChangepasswordComponent,
      ResetpasswordComponent,
      SearchRequestComponent
   ],

   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      AccordionModule.forRoot(),
      PaginationModule.forRoot(),
      NgxSpinnerModule,
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            // tslint:disable-next-line: object-literal-shorthand
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      AdminGuard,
      DevGuard,
      ItGuard,
      UatGuard,
      RequestService,
      RequestDetailsResolver,
      RequestListResolver,
      RequestService,
      RequestByUserResolver,
      RequestByStatusResolver,
      UserListResolver,
      AnalyticsService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
