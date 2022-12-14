import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = environment.baseUrl;
  private authToken = environment.authToken;
  headers = new HttpHeaders({ 'Authorization': this.authToken });
  constructor(private http : HttpClient) { }

  getProducts(): Promise<any> {
    return this.http.get<any>(`${this.baseUrl}products`, {
      headers: this.headers,
    }).toPromise();
  }
  getUpdateProduct(id, product): Promise<any> {
    return this.http.put<any>(`${this.baseUrl}products/${id}`, product, {
      headers: this.headers,
    }).toPromise();
  }
  createProduct( product): Promise<any> {
    return this.http.post<any>(`${this.baseUrl}products`, product, {
      headers: this.headers,
    }).toPromise();
  }
  getDeleteProduct(id): Promise<any> {
    return this.http.delete<any>(`${this.baseUrl}products/${id}`, {
      headers: this.headers,
    }).toPromise();
  }
}
