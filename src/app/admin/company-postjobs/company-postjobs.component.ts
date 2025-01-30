import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/home/jobs.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-company-postjobs',
  templateUrl: './company-postjobs.component.html',
  styleUrls: ['./company-postjobs.component.scss']
})
export class CompanyPostjobsComponent implements OnInit {
  companyJobApplications: any[] = [];
  errorMessage: string = '';

  constructor(private jobsService: JobsService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.showCompanyPostJobs();
  }
  showCompanyPostJobs(){
    this.jobsService.getJobPosting().subscribe(
      (response:any)=>{
        if(response.success){
          this.companyJobApplications = response.data;
          // console.log(this.companyJobApplications);
          this.companyJobApplications.forEach(job=>{
            job.expiredate = this.datePipe.transform(job.expiredate, 'yyyy-MM-dd');
          });
          // console.log(this.companyJobApplications);
        }else{
          console.error("Failed to fetch company post jobs");
          this.errorMessage = "Failed to load company post jobs";
        }
      },
      (error)=>{
        console.error("Error fetching company post jobs: ",error);
      }
    )
  }
}
