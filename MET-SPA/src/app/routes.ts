import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { EffortsUpdateComponent } from './ams/efforts-update/efforts-update.component';
import { ReleaseUpdateComponent } from './ams/release-update/release-update.component';
import { TimelineUpdateComponent } from './ams/timeline-update/timeline-update.component';
import { EffortApprovalComponent } from './it-panel/effort-approval/effort-approval.component';
import { ItDashboarddComponent } from './it-panel/it-dashboardd/it-dashboardd.component';
import { NewRequestComponent } from './requests/new-request/new-request.component';
import { ListRequestComponent } from './requests/list-request/list-request.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './_guards/auth.guard';
import { AdminGuard } from './_guards/admin.guard';
import { DevGuard } from './_guards/dev.guard';
import { ItGuard } from './_guards/it.guard';
import { RequestDetailsComponent } from './requests/request-details/request-details.component';
import { RequestDetailsResolver } from './_resolvers/request-details.resolver';
import { RequestListResolver } from './_resolvers/request-list.resolver';
import { RequestByUserResolver } from './_resolvers/request-by-user.resolver';
import { RequestByStatusComponent } from './requests/request-by-status/request-by-status.component';
import { RequestByStatusResolver } from './_resolvers/request-by-status.resolver';
import { AddProjectComponent } from './admin/add-project/add-project.component';
import { ListProjectComponent } from './admin/list-project/list-project.component';
import { AddModuleComponent } from './admin/add-module/add-module.component';
import { UserListResolver } from './_resolvers/user-list.resolver';
import { UatGuard } from './_guards/uat.guard';
import { UatUpdateComponent } from './uat-update/uat-update.component';
import { ListRequestByuserComponent } from './requests/list-request-byuser/list-request-byuser.component';
import { MonthlyDashboardComponent } from './it-panel/monthly-dashboard/monthly-dashboard.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';


export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'newrequest', component: NewRequestComponent},
            {path: 'changepass', component: ChangepasswordComponent},
            {path: 'requests/:id', component: RequestDetailsComponent, resolve: {request: RequestDetailsResolver}},
            {path: 'requests', component: ListRequestComponent , resolve: {requests: RequestListResolver}},
            {path: 'requests/status/:status', component: RequestByStatusComponent, resolve: {requests: RequestByStatusResolver}},
            {path: 'requests/user/:id', component: ListRequestByuserComponent, resolve: {requests: RequestByUserResolver}},
        ]
    },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard, AdminGuard],
        children: [
            {path: 'adduser', component: AddUserComponent},
            {path: 'users', component: ListUserComponent, resolve: {users: UserListResolver}},
            {path: 'project', component: ListProjectComponent},
            {path: 'project/add', component: AddProjectComponent},
            {path: 'module/add', component: AddModuleComponent}
        ]
    },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard, DevGuard],
        children: [
            {path: 'efforts/:id', component: EffortsUpdateComponent, resolve: {request: RequestDetailsResolver}},
            {path: 'release/:id', component: ReleaseUpdateComponent, resolve: {request: RequestDetailsResolver}},
            {path: 'timelines/:id', component: TimelineUpdateComponent, resolve: {request: RequestDetailsResolver}},
        ]
    },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard, ItGuard],
        children: [
            {path: 'approvals/:id', component: EffortApprovalComponent, resolve: {request: RequestDetailsResolver}},
            {path: 'itdashboard', component: ItDashboarddComponent},
            {path: 'monthlydashboard', component: MonthlyDashboardComponent},
        ]
    },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard, UatGuard],
        children: [
            {path: 'uat/:id', component: UatUpdateComponent, resolve: {request: RequestDetailsResolver}},
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
