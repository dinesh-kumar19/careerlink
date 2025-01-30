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
  currentUser: any = {};


  constructor(private jobsService: JobsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.postingId = +this.route.snapshot.paramMap.get('postingId')!;
    this.fetchJobposting();
    this.fetchCurrentUser();
  }
  fetchJobposting(): void {
    this.jobsService.getJobpostingBySubcategories(this.postingId, 10, 0).subscribe((response) => {
      if(response.success){
        // this.jobPosting = response.data;
        this.jobPosting = response.data.map((job: any) => ({
          ...job,
          isApplied: false
        }));
        this.checkAppliedJobs();
      }
    });
  }
  fetchCurrentUser(): void {
    this.jobsService.getCurrentuser().subscribe(
      (response: any) => {
        this.currentUser = response.user;
        // console.log("user registerID : ",this.currentUser.id);
      },
      (response)=>{
        if(response.success){
          this.currentUser.id = response.data.id;
          // console.log("user register : ",this.currentUser.id);
        }else{
          console.error("Failed to fetch current user");
        }
      },
    );  
  }
  checkAppliedJobs():void {
    if(!this.currentUser?.id) return;

    this.jobPosting.forEach(job =>{
      this.jobsService.checkApplicationStatus(this.currentUser.id, job.jobposting_id)
        .subscribe(response => {
          if (response.success && response.applied) {
            job.isApplied = true;
          }
        });
    });
  }
  applyForJob(jobId: number): void{
    if (!this.currentUser.id){
      alert("Please log in to apply for the job.");
      this.router.navigate(['/home/login']);
      return;
    }
    this.jobsService.applyForJob(this.currentUser.id, jobId).subscribe(
      (response) => {
        if(response.success) {
          alert('Job application submitted successfully!');
          const appliedJob = this.jobPosting.find(job => job.jobposting_id === jobId);
          if (appliedJob){
            appliedJob.isApplied = true;
          }
        } else {
          alert('Failed to apply for job: ' + response.message);
        }
      },
      (error) => {
        alert('Error occurred: ' + error.error.message);
      }
    )
  }
}