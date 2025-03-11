import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private http: HttpClient) {}

  getVehicleByUser(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/vehicles/user/${id}`);
  }

  saveClientVehicle(value: any): Observable<any> {
    console.log(value);
    return this.http.post<any>(`${environment.apiUrl}/vehicles/`, value);
  }
}
