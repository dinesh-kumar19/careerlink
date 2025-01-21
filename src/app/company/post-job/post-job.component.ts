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
  selectedFile: File | null = null;
  jobLogoFile: File | null = null;

  constructor(private http:HttpClient, private JobsService : JobsService) { }

  ngOnInit(): void {
    this.jobForm = new FormGroup(
      {
        categoryname: new FormControl('', [Validators.required]),
        companyname:new FormControl('', [Validators.required]),
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
  onFileSelected(event : Event): void {
    const fileInput = event.target as HTMLInputElement;
    if(fileInput.files && fileInput.files[0]){
      this.selectedFile = fileInput.files[0];
      // console.log('Selected file:', this.selectedFile);
    }
  }
  onJobLogoSelected(event: any): void {
    const file = event.target.files[0];
    if(file){
      this.jobLogoFile = file;
    }
  }
  postJob(): void{
    if(this.jobForm.valid){
      const formData = new FormData();
      const jobData = this.jobForm.value;
      
      formData.append('categoryname', jobData.categoryname);
      formData.append('companyname', jobData.companyname);
      formData.append('companyDescription', jobData.companyDescription);
      formData.append('websiteUrl', jobData.websiteUrl);
      formData.append('jobtitle', jobData.jobtitle);
      formData.append('employeetype', jobData.employeetype);
      formData.append('salary', jobData.salary);
      formData.append('location', jobData.location);
      formData.append('experience', jobData.experience);
      formData.append('qualifications', jobData.qualifications);
      formData.append('skillsrequired', jobData.skillsrequired);
      formData.append('jobdescription', jobData.jobdescription);
      formData.append('keyresponse_1', jobData.keyresponse_1);
      formData.append('applicationDeadline', jobData.applicationDeadline);
      if(this.selectedFile){
        formData.append('category_imageUrl', this.selectedFile);
      }
      if(this.jobLogoFile){
        formData.append('job_Logo',this.jobLogoFile);
      }
      // console.log('FormData being sent:', formData);
      this.JobsService.postJobData(formData)
      .subscribe(
        (response) => {
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
     } else{
      console.log("Form is invalid",this.jobForm.errors);
    }
  }
    }
    