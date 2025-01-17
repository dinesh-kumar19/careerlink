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

  constructor(private jobsService: JobsService, private router: Router) { }

  ngOnInit(): void {
    this.jobsService.getCurrentuser().subscribe(
      (response: any) => {
        this.currentUser = response.user;
        console.log(this.currentUser.id);
      },
      (error) => {
        console.log('Failed to fetch user data', error);
      }
    );
  }

}
