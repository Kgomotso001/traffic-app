import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private baseUrl = environment.baseUrl;
  private authToken = environment.authToken;
  headers = new HttpHeaders({ 'Authorization': this.authToken });
  constructor(private http : HttpClient) { }

  createReport(report){
    return this.http.post<any>(`${this.baseUrl}reports`, report, {
      headers: this.headers,
    }).toPromise();
  }
}
