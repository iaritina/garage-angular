import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from 'src/app/utils/token';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private _tokenService = inject(Token);

  constructor(private http: HttpClient) {}

  getAmountCommission(): Observable<any> {
    const token = localStorage.getItem('token');
    const mechanic = this._tokenService.getUserFromToken(token);
    const date = new Date();
    return this.http.get(`${environment.apiUrl}/mechanics/${mechanic}/${date}`);
  }

  countRepairedVehicle(): Observable<any> {
    const token = localStorage.getItem('token');
    const mechanic = this._tokenService.getUserFromToken(token);
    const date = new Date();
    return this.http.get(
      `${environment.apiUrl}/mechanics/vehicle-count/${mechanic}/${date}`
    );
  }

  countSerivceByMechanic(): Observable<any> {
    const token = localStorage.getItem('token');
    const mechanic = this._tokenService.getUserFromToken(token);
    return this.http.get(`${environment.apiUrl}/mechanics/${mechanic}`);
  }
}
