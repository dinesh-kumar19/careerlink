import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { HomeModule } from '../home/home.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    UserComponent,
    UserDashboardComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HomeModule
  ],
  providers: [DatePipe],
})
export class UserModule { }
