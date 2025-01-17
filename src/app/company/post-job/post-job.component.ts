import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JobsService } from 'src/app/home/jobs.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent implements OnInit {
  jobForm! : FormGroup;

  constructor(private http:HttpClient, private JobsService : JobsService) { }

  ngOnInit(): void {
    this.jobForm = new FormGroup(
      {
        categoryname: new FormControl('', [Validators.required]),
        companyname:new FormControl('', [Validators.required]),
        // companyLogo: new FormControl('', [Validators.required]),
        companyDescription: new FormControl('', [Validators.required]),
        websiteUrl: new FormControl('', [Validators.required]),
        jobtitle: new FormControl('', [Validators.required]),
        employeetype:new FormControl('', [Validators.required]),
        salary:new FormControl('', [Validators.required]),
        location:new FormControl('', [Validators.required]),
        experience:new FormControl('', [Validators.required]),
        qualifications:new FormControl('', [Validators.required]),
        skillsrequired:new FormControl('', [Validators.required]),
        jobdescription:new FormControl('', [Validators.required]),
        keyresponse_1:new FormControl('', [Validators.required]),
        applicationDeadline:new FormControl('', [Validators.required]),

      }
    );
  }
  postJob(){
    if(this.jobForm.valid) {
      const jobData = this.jobForm.value;
      this.JobsService.postJobData(jobData)
      .subscribe(
        response => {
          // console.log("Job Posted Successfully", response);
          alert("Job posted successfully");
        },
        error => {
          console.error("Error posting job:",error);
          if (error.status === 404 && error.error && error.error.error && error.error.error.message  === 'Company not found!') {
            alert("Company name not found! Please check the company name and try again.");
          } else {
            alert("An error occurred while posting the job. Please try again later.");
          }
        }

      );
    }else{
      console.log("Form is invalid");
    }
  }
}
