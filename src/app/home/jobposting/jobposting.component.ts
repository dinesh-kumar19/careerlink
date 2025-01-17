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
        this.jobPosting = response.data;
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
          console.error("FAiled to fetch current user");
        }
      },
      // (error) => {
      //   console.error("Error fetching current user:", error);
      // }
    );
    
  }
  applyForJob(jobId: number): void{
    if (!this.currentUser.id){
      alert("user not logged in");
      // this.router.navigate(['/home/login']);
      return;
    }
    this.jobsService.applyForJob(this.currentUser.id, jobId).subscribe(
      (response) => {
        if(response.success) {
          alert('Job application submitted successfully!');
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
