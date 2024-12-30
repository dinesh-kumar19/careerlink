import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { CompanyAuthGuard } from '../guards/company-auth.guard';

const routes: Routes = [
  { path: '', component: CompanyComponent },
  { path: 'companyDashboard', component: CompanyDashboardComponent, canActivate: [CompanyAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
