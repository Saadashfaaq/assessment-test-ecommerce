import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/';

  constructor(private http: HttpClient) {}

  /**
   * Retrieves the list of products from the API.
   *
   * @returns {Observable<any>} An observable containing an array of products.
   */
  getProductList(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl + 'products');
  }

  /**
   * Retrieves all product categories from the API.
   *
   * @returns {Observable<any>} An observable containing an array of categories.
   */
  getAllCategories(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl + 'products/categories');
  }
}
