import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/home/jobs.service';

@Component({
  selector: 'app-all-applications',
  templateUrl: './all-applications.component.html',
  styleUrls: ['./all-applications.component.scss']
})
export class AllApplicationsComponent implements OnInit {
  userAppliedJobs : any[] = [];
  company_id! : number;
  errorMessage: string = '';

  constructor(private jobsService: JobsService) { }

  ngOnInit(): void {
    this.loadCurrentCompany();
  }
  loadCurrentCompany(){
    this.jobsService.getCurrentCompany().subscribe(
      (response: any)=>{
        this.company_id = response.company.company_id;
        // console.log(this.company_id);
        if(this.company_id){
            this.getUserAppliedJobs();
          }else{
            console.error("Company ID not found");
          }
      },
      (error)=>{
        console.error("Error fetching current company:",error);
      }
    )
  }
  getUserAppliedJobs(){
    this.jobsService.getApplicationsByCompany(this.company_id).subscribe(
      (res: any) => {
        if (res.success){
          this.userAppliedJobs = res.data;
          // console.log("user applied jobs: ", this.userAppliedJobs);
        }else if (this.userAppliedJobs.length < 0){
          console.log("empty");
        }
        else{
          console.error("Failed to fetch user applied jobs");
          this.errorMessage = "Failed to load user applied jobs";
        }
      },
      (error)=>{
        console.error("Error fetching user applied jobs:",error);
      }
    );
  }
}
