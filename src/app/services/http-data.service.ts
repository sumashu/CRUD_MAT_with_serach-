import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {

  constructor(private _http:HttpClient) { }
  postProDuct(formdata:Product):Observable<Product>
  { 
   return this._http.post<Product>(BaseUrl,formdata)
  }
  getProduct():Observable<any>
  { 
    return this._http.get<any>(BaseUrl);
  }
}
