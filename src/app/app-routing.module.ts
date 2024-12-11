import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) 
  }, 
  { 
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { 
    path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) 
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },// Redirect to Home by default
  { path: '**', redirectTo: 'home' }// Handle undefined routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
