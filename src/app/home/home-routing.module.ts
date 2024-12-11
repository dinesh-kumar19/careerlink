import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { JobListComponent } from './joblist/joblist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FiltersubcategoryComponent } from './filtersubcategory/filtersubcategory.component';
import { JobpostingComponent } from './jobposting/jobposting.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'job-list', component: JobListComponent },
  { path: 'filtersubcategory/:categoryId', component: FiltersubcategoryComponent},
  { path: 'jobposting/:postingId', component: JobpostingComponent},
  { path: 'dashboard', component : DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
