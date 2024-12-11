import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-jobposting',
  templateUrl: './jobposting.component.html',
  styleUrls: ['./jobposting.component.scss']
})
export class JobpostingComponent implements OnInit {
  jobPosting: any[] = [];
  postingId!: number;

  constructor(private jobsService: JobsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.postingId = +this.route.snapshot.paramMap.get('postingId')!;
    this.fetchJobposting();
  }
  fetchJobposting(): void {
    this.jobsService.getJobpostingBySubcategories(this.postingId, 10, 0).subscribe((response) => {
      if(response.success){
        this.jobPosting = response.data;
      }
    });
  }
  applyForJob(){
    alert("Job applied");
  }
}
