import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
   private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  uploadProducts(products: any[]): Observable<any> {
    return this.http.post('http://localhost:3000/upload', products);
  }
}
