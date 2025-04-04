import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MileageService {

  constructor(private http: HttpClient) { }

  create(appointment: any, vehicle: any,service: any,kilometer: any) {
    return this.http.post(`${environment.apiUrl}/mileages`,{appointment, vehicle,service,kilometer})
  }

  getMileageByAppointment(id: any) {
    return this.http.get<any[]>(`${environment.apiUrl}/mileages/${id}`)
  }

}
