import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAppointment } from 'src/app/pages/clients-appointment/clients-appointment.component';
import { Token } from 'src/app/utils/token';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private http = inject(HttpClient);

    private _TOKEN = localStorage.getItem('token');
    private tokenUtils = inject(Token);

  findAll () {
    return this.http.get<any[]>(`${environment.apiUrl}/appointments`);
  }

  createApt(appointment: any, intervention: any): Observable<any> {
    const body = { appointment, intervention };
    console.log('body', body);
    return this.http.post(`${environment.apiUrl}/appointments/`, body);
  }

  getAvailableMecanics(value: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/appointments/available-mechanics`,
      value
    );
  }

  getAppointmentMechanic(mechanic: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/appointments/mechanic-task/${mechanic}`
    );
  }

  completeTask(task: string) {
    return this.http.put<any>(
      `${environment.apiUrl}/appointments/complete-task/${task}`,
      {}
    );
  }

  getAllClientAppointments(
    clientId: string,
    filters: any = {}
  ): Observable<IAppointment[]> {
    return this.http.get<IAppointment[]>(
      `${environment.apiUrl}/appointments/client/${clientId}`,
      { params: filters }
    );
  }

  getClientAppointment() {
    const id = this.tokenUtils.getUserFromToken(this._TOKEN);
    return this.http.get<any[]>(`${environment.apiUrl}/appointments/appointment-client/${id}`);
  }
}
