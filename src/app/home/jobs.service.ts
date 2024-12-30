import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  category:any;
  // private storageKey = 'jobApplications';
  private loggedIn: boolean = false;
  private adminLoggedIn: boolean = false;
  private companyLoggedIn: boolean = false;

  constructor(private http:HttpClient, private router: Router) {
   }
  getJobcategory(limit: number, offset: number): Observable<any> {
    return this.http.get(`http://localhost:3000/api/jobpostings/getcategory?limit=${limit}&offset=${offset}`);
  }
  getSubcategory(limit: number, offset: number): Observable<any>{
    return this.http.get(`http://localhost:3000/api/jobpostings/getSubcategory?limit=${limit}&offset=${offset}`);
  }
  getSubcategoryByCategory(categoryId: number, limit: number, offset: number): Observable<any>{
    return this.http.get(`http://localhost:3000/api/jobpostings/getSubcategoryByCategory/${categoryId}?limit=${limit}&offset=${offset}`);
  }
  getJobpostingBySubcategories(postingId: number, limit: number, offset: number): Observable<any>{
    return this.http.get(`http://localhost:3000/api/jobpostings/getJobPostingBySubcategories/${postingId}?limit=${limit}&offset=${offset}`)
  }
  // login details
  getCurrentuser() : Observable<any>{
    return this.http.get('http://localhost:3000/api/jobpostings/getCurrentUser', { withCredentials: true });
  }
  isLoggedIn(): boolean {
    // return this.loggedIn || document.cookie.includes('auth_token'); 
    const userLoggedInStatus = localStorage.getItem('userLoggedIn') === 'true';
    const isUserLogggedInFromCookie = document.cookie.includes('auth_token');
    return userLoggedInStatus || isUserLogggedInFromCookie;
  }
  // Set the login status
  setLoggedIn(status: boolean): void {
    this.loggedIn = status;
    localStorage.setItem('userLoggedIn', status.toString());
  }
  // Handle logout by calling backend API to remove session and clearing the cookies
  logoutUser(): Observable<any> {
    return this.http.get('http://localhost:3000/api/jobpostings/logoutUser', { withCredentials: true });
  }
  clearUserLoginState(): void {
    localStorage.removeItem('userLoggedIn');
  }
  // company login
  isCompanyLoggedIn(): boolean {
    // return this.companyLoggedIn || document.cookie.includes('provider_authToken');
    const companyLoggedInStatus = localStorage.getItem('companyLoggedIn') === 'true';
    const isCompanyLoggedInFromCookie = document.cookie.includes('provider_authToken');
    return companyLoggedInStatus || isCompanyLoggedInFromCookie;
  }
  setCompanyLoggedIn(status: boolean): void {
    this.companyLoggedIn = status;
    localStorage.setItem('companyLoggedIn', status.toString());
  }
  getCurrentCmpany() : Observable<any>{
    return this.http.get('http://localhost:3000/api/jobpostings/getCurrentCompany', { withCredentials: true });
  }
  logoutCompany():Observable<any>{
    return this.http.get('http://localhost:3000/api/jobpostings/logoutCompany', {withCredentials: true});
  }
  clearCompanyLoginState(): void {
    localStorage.removeItem('companyLoggedIn');
  }
  // admin login 
  getCurrentAdmin(): Observable<any>{
    return this.http.get('http://localhost:3000/api/jobpostings/getCurrentAdmin', {withCredentials: true});
  }
  isAdminLoggedIn(): boolean{
    // return this.adminLoggedIn || document.cookie.includes('admin_authToken');
    const loggedInStatus = localStorage.getItem('adminLoggedIn') === 'true';
    const isLoggedInFromCookie = document.cookie.includes('admin_authToken');
    return loggedInStatus || isLoggedInFromCookie;
  }
  setAdminLoggedIn(status: boolean): void{
    this.adminLoggedIn = status;
    localStorage.setItem('adminLoggedIn', status.toString());
  }
  logoutAdmin():Observable<any>{
    return this.http.get('http://localhost:3000/api/jobpostings/logoutAdmin', {withCredentials: true});
  }
  clearAdminLoginState(): void {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('admin_authToken');
  }
}