import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HomeModule } from '../home/home.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { JobApplicationsComponent } from './job-applications/job-applications.component';
import { CompanyPostjobsComponent } from './company-postjobs/company-postjobs.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    AdminHeaderComponent,
    AdminLoginComponent,
    AdminDetailsComponent,
    JobApplicationsComponent,
    CompanyPostjobsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    AdminLoginComponent  
  ]
})
export class AdminModule { }
