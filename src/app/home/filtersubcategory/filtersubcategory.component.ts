import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-filtersubcategory',
  templateUrl: './filtersubcategory.component.html',
  styleUrls: ['./filtersubcategory.component.scss']
})
export class FiltersubcategoryComponent implements OnInit {
  subcategories: any[] = [];
  categoryId!: number;

  constructor(private jobsService: JobsService, private router: Router, private route: ActivatedRoute, private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.categoryId = +this.route.snapshot.paramMap.get('categoryId')!;
    this.fetchSubcategories();
  }
  fetchSubcategories(): void {
    this.jobsService.getSubcategoryByCategory(this.categoryId, 10, 0).subscribe((response) => {
      if (response.success) {
        this.subcategories = response.data;
        this.subcategories.forEach(subcategoriesDate=>{
          subcategoriesDate.date = this.datePipe.transform(subcategoriesDate.date, 'yyyy-MM-dd');
        });
      }
    });
  }
  viewJobpostings(postingId: number): void {
    this.router.navigate(['/home/jobposting', postingId]);
  }
}
