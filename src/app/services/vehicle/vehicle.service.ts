import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private http: HttpClient) {}

  getVehicleByUser(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/vehicles/user/${id}`).pipe(
      map((data: any[]) => data[0]) // Récupérer directement le premier élément du tableau
    );
  }

  saveClientVehicle(value: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/vehicles/`, value);
  }

  deleteVehicle(id: string) {
    return this.http.put<any>(
      `${environment.apiUrl}/vehicles/delete/${id}`,
      {}
    );
  }

  updateVehicle(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/vehicles/${id}`, data);
  }
}
