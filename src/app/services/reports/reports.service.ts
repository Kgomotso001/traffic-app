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
  getReports(){
    return this.http.get<any>(`${this.baseUrl}reports`,{ headers: this.headers }).toPromise();
  }
  getAddress(lat,lng){
    return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=AIzaSyCKMeXCwfKVZhQkduS-RCM5_nA3Gwb7PCQ`).toPromise();
  }
}
