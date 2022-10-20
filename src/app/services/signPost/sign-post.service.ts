import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignPostService {

  private baseUrl = environment.baseUrl;
  private authToken = environment.authToken;
  headers = new HttpHeaders({ 'Authorization': this.authToken });

  multipartHeader = new HttpHeaders({ 'enctype': 'multipart/form-data' });

  constructor(private http: HttpClient) { }

  getpresignedurls(ext: string): Promise<any> {
    return this.http.post(`${this.baseUrl}vouchers/signed-post`, { fileExtension: ext, folder: "vouchers" }, { headers: this.headers,}).toPromise();
  }

  uploadFile(url: string, formdata: any): Promise<any> {
    return this.http.post(url, formdata, { headers: this.multipartHeader }).toPromise();
  }


}
