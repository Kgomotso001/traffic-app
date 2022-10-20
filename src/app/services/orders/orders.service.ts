import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  
  private baseUrl = environment.baseUrl;
  private authToken = environment.authToken;
  headers = new HttpHeaders({ 'Authorization': this.authToken });
  constructor(private http : HttpClient) { }

  createOrder(order): Promise<any> {
    return this.http.post<any>(`${this.baseUrl}orders`, order, { headers: this.headers }).toPromise();
  }

  updateOrder(id,order): Promise<any> {
    return this.http.put<any>(`${this.baseUrl}orders/${id}`, order, { headers: this.headers }).toPromise();
  }

  getOrderByUserId(userId): Promise<any> {
    return this.http.get<any>(`${this.baseUrl}orders`, {
      headers: this.headers,
      params: new HttpParams().set('userId', userId).set('status','AWAITING_PAYMENT')
    }).toPromise();
  }

  getAllOrder(): Promise<any> {
    return this.http.get<any>(`${this.baseUrl}orders`, {
      headers: this.headers,
      params: new HttpParams()
    }).toPromise();
  }
}
