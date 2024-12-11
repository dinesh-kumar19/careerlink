import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { JobsService } from './jobs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: any[] = [];
  limit: number = 8;
  offset: number = 0; 
  loading: boolean = false;
  experienceOptions: string[] = [];

constructor(private jobsService: JobsService, private router: Router) {}

ngOnInit(): void {
  AOS.init();
  this.loadCategories();
  for (let i = 1; i<=30; i++){
    this.experienceOptions.push(i===1 ? `${i} year` : `${i} years`)
  }
 }
  loadCategories(){
    if (this.loading) return;
    this.loading = true;
    this.jobsService.getJobcategory(this.limit, this.offset).subscribe((res:any)=>{
      if (res.success)  {
        this.categories = [...this.categories, ...res.data];
        this.offset += this.limit;
      }
      this.loading = false;
    });
  }
  viewSubcategories(categoryId: number): void {
    this.router.navigate(['/home/filtersubcategory', categoryId]);
  }
  navigateToJobList(){
    this.router.navigate(['/home/job-list']);
  }
  searchJob(){
    this.router.navigate(['/home/job-list']);
  }
}
