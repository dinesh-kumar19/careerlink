import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JobsService } from '../jobs.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  jobProviderForm!: FormGroup;
  jobSeekerForm!: FormGroup;
  loginForm!: FormGroup;
  selectedStatus: string = '';
  formValue:any;
  loginError:string = '';
  userDetails:any = null;
  selectedFile: File | null = null;
  selectedForm: string = 'seeker';
  allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  maxSize = 2 * 1024 * 1024;
  @ViewChild('resumeInput') resumeInput: any;

  constructor(private router: Router,private http:HttpClient, private JobsService : JobsService, private toastr : ToastrService) { }
  
  ngOnInit(): void {
    this.jobSeekerForm=new FormGroup(
      {
        jobseekerName: new FormControl('', [Validators.required]),
        jobseekerEmail_id: new FormControl('', [Validators.required, Validators.email]),
        jobseekerPhone_no: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
        jobseekerPassword: new FormControl('', [Validators.required, Validators.minLength(6),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{6,})')]),
        jobseekerConfirm_password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        jobseekerLocation: new FormControl('', Validators.required),
      }
    );
    this.loginForm=new FormGroup({
      loginType: new FormControl('user', [Validators.required]), 
      loginEmail_id: new FormControl('', [Validators.required, Validators.email]),
      login_Password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
    if(this.JobsService.isLoggedIn()){
      this.router.navigate(['/dashboard'])
    }
    if(this.JobsService.isAdminLoggedIn()){
      this.router.navigate(['/admin/adminDashboard']);
    }
      // Check if the admin is already authenticated
      // if (this.JobsService.isAdminAuthenticate()) {
      //   this.router.navigate(['/admin/dashboard']);
      // }
  }
  fileSelect(event: any): void{
    const file = event.target.files[0];
    if (!this.allowedTypes.includes(file.type)) {
      alert('Only .pdf, .doc, and .docx files are allowed.');
      return;
    }
    if (file.size > this.maxSize) {
      alert('File size must be less than 2MB.');
      return;
    }
    this.selectedFile = file;
  }
  jobProviderRegister(){
    
  }
  jobSeekerRegister(){
    this.formValue = this.jobSeekerForm.value;
    if (this.formValue.jobseekerPassword !== this.formValue.jobseekerConfirm_password) {
      this.toastr.error("Passwords do not match", "Error")
      alert('Passwords do not match');
      return;
    }
    if (!this.formValue.jobseekerName || !this.formValue.jobseekerEmail_id || !this.formValue.jobseekerPhone_no || !this.formValue.jobseekerLocation) {
      alert("Please fill all required fields");
      return;
    }
  
    if (!this.selectedFile) {
      alert('Please upload a resume');
      return;
    }
    const formData = new FormData();
    formData.append('jobseekerName', this.formValue.jobseekerName);
    formData.append('jobseekerEmail_id', this.formValue.jobseekerEmail_id);
    formData.append('jobseekerPassword', this.formValue.jobseekerPassword);
    formData.append('jobseekerPhone_no', this.formValue.jobseekerPhone_no);
    formData.append('jobseekerLocation', this.formValue.jobseekerLocation);
    formData.append('resume_path', this.selectedFile);

    this.http.post('http://localhost:3000/api/jobpostings/userRegister', formData).subscribe((response: any) => {
      alert('Register Successful');
      this.jobSeekerForm.reset();
      this.selectedFile = null; 
      this.resetFileInput();
    },
    (error) =>{
      if (error.status === 400 && error.error.message === 'Email id already taken') {
        alert('Email already exists. Please use a different email.');
      } else {
        alert('Required to fill all requirements');
      }
    }); 
  }
  resetFileInput() {
    if (this.resumeInput) {
      this.resumeInput.nativeElement.value = '';
    }
  }
  logIn(): void {
    const loginData = this.loginForm.value;
    if (!loginData.loginEmail_id || !loginData.login_Password) {
      alert('Both email and password are required.');
      return;
    }
    // check login type
    if(loginData.loginType === 'user'){
      this.loginAsUser(loginData);
    }
    else if (loginData.loginType === 'admin'){
      this.loginAsAdmin(loginData);
    }
    else{
      alert('Invalid login type selected');
    }
  }
    loginAsUser(loginData: any): void{
      this.http.post('http://localhost:3000/api/jobpostings/userLogin', {
        loginEmail_id: loginData.loginEmail_id,
        login_Password: loginData.login_Password
      },{ withCredentials: true })
      .subscribe(
        (response: any) => {
          if (response.success) {
          // this.toastr.success("Login done","success");
          alert("Login Successful");
          this.JobsService.setLoggedIn(true);
          this.router.navigate(['/home/dashboard']);
          this.loginForm.reset();
        }
        else {
          alert("Invalid email or password.");
        }
      },
      (error) => {
        alert("An unexpected error occurred. Please try again.");
      });
    }
    loginAsAdmin(loginData: any): void {
      this.http.post('http://localhost:3000/api/jobpostings/loginAdmin',
      {
        admin_email: loginData.loginEmail_id,
        admin_password: loginData.login_Password,
      },{ withCredentials: true }
    )
    .subscribe(
      (response: any) => {
        if (response.success) {
          alert('Admin Login Successful');
          this.JobsService.setAdminLoggedIn(true);
          this.router.navigate(['/admin/adminDashboard']);
          this.loginForm.reset();
        } else {
          alert('Invalid email or password.');
        }
      },
      (error) => {
        alert('An unexpected error occurred. Please try again.');
      }
    );
    }
   
  }
  