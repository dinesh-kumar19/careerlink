import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/home/jobs.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  currentUser: any = {};
  user_id! : number;
  userJobs: any[]= [];
  errorMessage: string = '';

  constructor(private jobsService: JobsService, private router: Router) { }

  ngOnInit(): void {
    this.jobsService.getCurrentuser().subscribe(
      (response: any) => {
        this.currentUser = response.user;
        this.user_id = this.currentUser.id;
        // console.log(this.currentUser.id);
        // console.log(this.user_id);
        if(this.user_id){
          this.getJobsByUser();
        }else{
          console.error("User ID no found");
        }
      },
      (error) => {
        console.log('Failed to fetch user data', error);
      },
    );
  }
  getJobsByUser(){
    this.jobsService.getApplicationsByUser(this.user_id).subscribe(
      (response: any) => {
        if(response.success){
          this.userJobs = response.data;
          // console.log(this.userJobs);
        }else{
          console.error("Failed to fetch individual user applications");
          this.errorMessage = "Failed to load user applied jobs";
        }
      },
      (error)=>{
        console.error("Error fetching individual user applications", error);
      }
    )

  }

}
