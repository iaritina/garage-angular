import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVehicleBrand } from 'src/app/pages/brands-models/vehicle-brand/vehicle-brand.component';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class VehiclesBrandsService {
  private http = inject(HttpClient);

  saveBrand(value: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/brands`, value);
  }

  getAllBrands(): Observable<IVehicleBrand[]> {
    return this.http.get<IVehicleBrand[]>(`${environment.apiUrl}/brands`);
  }

  deleteBrand(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/brands/${id}`);
  }

  updateBrand(id: string, value: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/brands/${id}`, value);
  }
}
