import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/home/jobs.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.scss']
})
export class JobApplicationsComponent implements OnInit {
 appliedJobs : any[] = [];
 errorMessage: string = '';

  constructor(private jobsService: JobsService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.showAppliedJobs();
  }
  showAppliedJobs(){
    this.jobsService.getAppliedJobs().subscribe((res:any)=>{
      if(res.success){
        this.appliedJobs = res.data;
        this.appliedJobs.forEach(applyJobs=>{
          applyJobs.application_date = this.datePipe.transform(applyJobs.application_date, 'yyyy-MM-dd');
        })
        this.errorMessage ='';
      }else{
        this.errorMessage = "Failed to load applied jobs";
      }
    },
    (error) =>{
      console.error('Error fetching applied jobs:', error);
      this.errorMessage = 'Error occurred while fetching job applications.';
    });
  }

}
