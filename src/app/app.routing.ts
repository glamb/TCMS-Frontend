import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'projects/:projId', component: ProjectComponent },
];

export const routing = RouterModule.forRoot(routes);
