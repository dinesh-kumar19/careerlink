import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { CompanyAuthGuard } from '../guards/company-auth.guard';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { PostJobComponent } from './post-job/post-job.component';
import { AllApplicationsComponent } from './all-applications/all-applications.component';

const routes: Routes = [
  // { path: '', component: CompanyComponent },
  { path: 'companyDashboard', component: CompanyDashboardComponent, canActivate: [CompanyAuthGuard]},
  {path: 'company-profile', component: CompanyProfileComponent, canActivate: [CompanyAuthGuard]},
  { path: 'post-job', component: PostJobComponent, canActivate: [CompanyAuthGuard]},
  { path: 'applications', component: AllApplicationsComponent, canActivate: [CompanyAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
