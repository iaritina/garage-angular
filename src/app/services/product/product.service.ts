import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/products`);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/products/${id}`);
  }

  saveNewProduct(product: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/products`,product);
  }

  deleteProduct(id: string) {
    return this.http.put<any>(`${environment.apiUrl}/products/delete/${id}`,{});
  }

  updateProduct(id: string, data: any) {
    return this.http.patch<any>(`${environment.apiUrl}/products/${id}`,data);
  }

}
