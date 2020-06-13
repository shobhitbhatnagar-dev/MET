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


export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'newrequest', component: NewRequestComponent},
            {path: 'requests', component: ListRequestComponent},
            {path: 'adduser', component: AddUserComponent},
            {path: 'users', component: ListUserComponent},
            {path: 'effots', component: EffortsUpdateComponent},
            {path: 'release', component: ReleaseUpdateComponent},
            {path: 'timelines', component: TimelineUpdateComponent},
            {path: 'approvals', component: EffortApprovalComponent},
            {path: 'itdashboard', component: ItDashboarddComponent},
            {path: 'about', component: AboutComponent},
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
