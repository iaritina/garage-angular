import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class BrandsStatService {
  private http = inject(HttpClient);

  getBrandsStat(year: number | null = null): any {
    const params: { [key: string]: string } = year
      ? { year: year.toString() }
      : {};
    return this.http.get(
      `${environment.apiUrl}/appointments/stats/appointments-by-brand`,
      {
        params,
      }
    );
  }
}
