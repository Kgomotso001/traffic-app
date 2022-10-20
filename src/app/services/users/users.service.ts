import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private user: BehaviorSubject<any>;

  private baseUrl = environment.baseUrl;
  private authToken = environment.authToken;
  headers = new HttpHeaders({ 'Authorization': this.authToken });
  constructor(private http : HttpClient) {
    this.user = new BehaviorSubject(null);
  }

  getActiveUser(){
    return this.user.asObservable();
  }

  setActiveUser(user){
    this.user.next(user)
  }

  createUser(user): Promise<any> {
    return this.http.post<any>(`${this.baseUrl}users`, user, { headers: this.headers }).toPromise();
  }

  updateUser(id,user): Promise<any> {
    return this.http.put<any>(`${this.baseUrl}users/${id}`, user, { headers: this.headers }).toPromise();
  }

  getUserByEmail(emailAddress): Promise<any> {
    return this.http.get<any>(`${this.baseUrl}users`, {
      headers: this.headers,
      params: new HttpParams().set('emailAddress', emailAddress)
    }).toPromise();
  }

  getUsers(){
    return this.http.get<any>(`${this.baseUrl}users`,{ headers: this.headers }).toPromise();
  }

  deleteUser(userId){
    return this.http.delete<any>(`${this.baseUrl}users/${userId}`,{headers : this.headers} ).toPromise();
  }
}
