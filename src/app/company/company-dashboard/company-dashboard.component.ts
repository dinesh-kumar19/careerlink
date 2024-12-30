import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/home/jobs.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {
  currentCompany: any = {};

  constructor(private http : HttpClient, private jobsService: JobsService, private router: Router) { }

  ngOnInit(): void {
    this.jobsService.getCurrentCmpany().subscribe(
      (response: any) => {
        this.currentCompany = response.company;
      },
      (error) => {
        console.log('Failed to fetch company data', error);
      }
    );
  }

}