import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '../guards/admin-auth.guard';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { JobApplicationsComponent } from './job-applications/job-applications.component';
import { CompanyPostjobsComponent } from './company-postjobs/company-postjobs.component';

const routes: Routes = [
  { path: 'CLadmin', component: AdminLoginComponent },
  { path: 'admin-details', component: AdminDetailsComponent, canActivate: [AdminAuthGuard],
    children: [
          { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' },
          {path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminAuthGuard] },
          { path: 'job-applications', component: JobApplicationsComponent , canActivate: [AdminAuthGuard] },
          { path: 'company-postjobs', component: CompanyPostjobsComponent , canActivate: [AdminAuthGuard] }
        ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
