import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandsCountStatService {
  private http = inject(HttpClient);

  getBrandsCountStat() {
    return this.http.get(`${environment.apiUrl}/vehicles/brand/count`);
  }
}
