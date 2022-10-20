import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VouchersService {

  private baseUrl = environment.baseUrl;
  private authToken = environment.authToken;
  headers = new HttpHeaders({ 'Authorization': this.authToken });
 constructor(private http : HttpClient) { }

  getAllVouchers(): Promise<any> {
    return this.http.get<any>(`${this.baseUrl}vouchers`, {
      headers: this.headers,
    }).toPromise();
  }
}
