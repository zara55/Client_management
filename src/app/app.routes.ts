import { Routes } from '@angular/router';
import { ManagementInfoComponent } from './management-info/management-info.component';
import { ClientInfoComponent } from './client-info/client-info.component';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { ClientInfoDetailComponent } from './client-info-detail/client-info-detail.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

export const routes: Routes = [
    {path: 'manageInfo', component: ManagementInfoComponent},
    { path: 'projectInfo', component: ProjectInfoComponent },
    { path: 'projectDetails', component: ProjectDetailsComponent },
    { path: 'projectInfo/:id', component: ProjectInfoComponent },
    { path: 'clientInfo', component: ClientInfoComponent },
    { path: 'clientDetail/:id', component: ClientInfoDetailComponent },
    { path: 'clientDetail', component: ClientInfoDetailComponent },
    { path: '', redirectTo:'manageInfo',pathMatch:'full' }
];
