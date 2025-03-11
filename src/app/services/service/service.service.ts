import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getAllService(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/services`);
  }

  createNewService(data: any):Observable<any> {
    return this.http.post(`${environment.apiUrl}/services`,data);
  }

  updateService(id: string, data: any):Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/services/${id}`,data);
  }

  deleteService(id: string) {
    return this.http.put<any>(`${environment.apiUrl}/services/delete/${id}`,{});
  }
}
