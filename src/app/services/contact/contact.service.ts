import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseUrl = environment.baseUrl;
  private authToken = environment.authToken;
  headers = new HttpHeaders({ 'Authorization': this.authToken });
  constructor(private http: HttpClient) { }

  sendEmail(quote): Promise<any> {
    return this.http.post<any>(`${this.baseUrl}data/contactUsEmail`, quote, { headers: this.headers }).toPromise();
  }
}
