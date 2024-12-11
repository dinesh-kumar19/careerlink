import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private jobsService: JobsService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.jobsService.isLoggedIn();
  }

  logout(): void {
    this.jobsService.logoutUser().subscribe(
      (response) => {
        this.jobsService.setLoggedIn(false);
        this.isLoggedIn = false;
        this.router.navigate(['/home/login']);
      },
      (error) => {
        console.error('Logout failed', error);
      }
    );
  }
}
