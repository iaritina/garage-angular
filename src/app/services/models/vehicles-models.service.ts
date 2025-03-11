import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVehicleModel } from 'src/app/pages/brands-models/vehicle-model/vehicle-model.component';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class VehiclesModelsService {
  private http = inject(HttpClient);

  createModel(model: IVehicleModel): Observable<IVehicleModel> {
    return this.http.post<IVehicleModel>(
      `${environment.apiUrl}/models/`,
      model
    );
  }

  getModels(): Observable<IVehicleModel[]> {
    return this.http.get<IVehicleModel[]>(`${environment.apiUrl}/models/`);
  }

  updateModel(id: string, model: IVehicleModel) {
    return this.http.put<IVehicleModel>(
      `${environment.apiUrl}/models/${id}`,
      model
    );
  }

  deleteModel(id: string): Observable<IVehicleModel> {
    return this.http.delete<IVehicleModel>(
      `${environment.apiUrl}/models/${id}`
    );
  }

  getModelsOfOneBrand(id: string): Observable<IVehicleModel[]> {
    return this.http.get<IVehicleModel[]>(
      `${environment.apiUrl}/models/brand/${id}`
    );
  }
}
