import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { CompanyHeaderComponent } from './company-header/company-header.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { PostJobComponent } from './post-job/post-job.component';
import { AllApplicationsComponent } from './all-applications/all-applications.component';


@NgModule({
  declarations: [
    CompanyComponent,
    CompanyDashboardComponent,
    CompanyHeaderComponent,
    CompanyProfileComponent,
    PostJobComponent,
    AllApplicationsComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }
