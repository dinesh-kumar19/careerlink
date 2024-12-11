import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './joblist.component.html', 
  styleUrls: ['./joblist.component.scss']
})
export class JobListComponent implements OnInit {
  subcategories: any[] = [];
  jobcategory_id: number | null = null;
  limit: number = 10;
  offset: number = 0;
  loading: boolean = false;
  currentPage: number = 1;
  totalPages: number = 1;  
  
  constructor(private route: ActivatedRoute, private jobsService: JobsService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.jobcategory_id = +params['id'];
      this.getSubcategories();
    })    
  }
  getSubcategories() {
    this.loading = true;
    this.jobsService.getSubcategory(this.limit, this.offset).subscribe((res: any) => {
      if (res.success) {
        this.subcategories = res.data;
        if (res.totalCount !== undefined && res.totalCount !== null) {
          this.totalPages = Math.ceil(res.totalCount / this.limit);
        } else {
          console.error("totalCount is missing or invalid in the API response");
        }
          // console.log("Total Pages Updated:", this.totalPages);
      }
        this.loading = false;
    });
    // if (this.jobcategory_id !== null){
    //   this.jobsService.getSubcategoryByCategory(this.jobcategory_id).subscribe((res: any)=> {
    //     if (res.success){
    //       this.subcategories = res.data;
    //     }
    //   });
    // }
  }
  viewJobposting(postingId: number): void {
    this.router.navigate(['/home/jobposting', postingId]);
  }
  loadNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.offset = (this.currentPage - 1) * this.limit;
      // console.log("Next button clicked, moving to page", this.currentPage);
      this.getSubcategories();
    } else {
      // console.log("Next button disabled: No more pages.");
    }
  }
  loadPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.offset = (this.currentPage - 1) * this.limit;
      // console.log("Previous button clicked, moving to page", this.currentPage);
      this.getSubcategories();
    } else {
      // console.log("Previous button disabled: Already on the first page.");
    }
  }
}