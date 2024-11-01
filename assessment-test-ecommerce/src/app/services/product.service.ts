import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private apiUrl = 'https://fakestoreapi.com/';

  constructor(private http: HttpClient) { }

  /**
   * Mendapatkan daftar produk dari API.
   * @returns Observable array produk.
   */
  getProductList(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl + 'products');
  }

  getAllCategories(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl + 'products/categories');
  }
}
