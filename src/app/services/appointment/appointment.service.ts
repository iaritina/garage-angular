import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private http = inject(HttpClient);

  createApt(value: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/appointments/`, value);
  }

  getAvailableMecanics(value: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/appointments/available-mechanics`,
      value
    );
  }
}
