import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from '../jobs.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isCompanyLoggedIn : boolean = false;
  showMenu : boolean = false;
  isLargeScreen: boolean = true;
  showSidebar: boolean = false;
  showProfileMenu: boolean = false;


  constructor(private router: Router, private jobsService: JobsService) {
    this.checkScreenSize();
   }

  ngOnInit(): void {
    this.isLoggedIn = this.jobsService.isLoggedIn();
    this.isCompanyLoggedIn = this.jobsService.isCompanyLoggedIn();
  }

  // logout(): void {
  //   this.jobsService.logoutUser().subscribe(
  //     (response) => {
  //       this.jobsService.setLoggedIn(false);
  //       this.jobsService.clearUserLoginState();
  //       this.isLoggedIn = false;
  //       this.router.navigate(['/home/login']);
  //     },
  //     (error) => {
  //       console.error('Logout failed', error);
  //     }
  //   );
  // }
  logout(): void{
    if (this.isLoggedIn){
      this.jobsService.logoutUser().subscribe(
            (response) => {
              this.jobsService.setLoggedIn(false);
              this.jobsService.clearUserLoginState();
              this.isLoggedIn = false;
              this.router.navigate(['/home/login']);
            },
            (error) => {
              console.error('Logout failed', error);
            }   
    );
  }
    else if (this.isCompanyLoggedIn){
      this.jobsService.logoutCompany().subscribe(
      (response) =>{
        this.jobsService.setCompanyLoggedIn(false);
        this.jobsService.clearCompanyLoginState();
        this.isCompanyLoggedIn = false;
        this.router.navigate(['home/login']);
      },
      (error) => {
              console.error('Logout failed', error);
            }
      );
    }
  }
  // (error) => {
  //         console.error('Logout failed', error);
  //       }
  //     );
  toggleProfile(){
    this.showProfileMenu = !this.showProfileMenu;
  }
  // @HostListener('document:click', ['$event'])
  // onClickOutside(event: MouseEvent) {
  //   const target = event.target as HTMLElement;
  //   if (!target.closest('.user-pic') && !target.closest('.sub-menu')) {
  //     this.showMenu = false;
  //   }
  // }
  @HostListener('window:resize', ['$event'])
  checkScreenSize() {
    this.isLargeScreen = window.innerWidth > 768;
    if (this.isLargeScreen) {
      this.showSidebar = false;
    }
  }
  toggleSidebar(){
    this.showSidebar = !this.showSidebar;
  }
  }

