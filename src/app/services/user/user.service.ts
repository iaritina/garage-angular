import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/pages/authentication/side-login/side-login.component';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  registerUser(value: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/`, value);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/login`, {
      email,
      password,
    });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  getAllUser(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/users`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/mechanicRegistration`,user);
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/users/${id}`,user);
  }

  deleteUser(id: string) {
    return this.http.put(`${environment.apiUrl}/users/delete/${id}`, {});
  }

  getUserByEmail(email: string): Observable<IUser> {
    return this.http.get<IUser>(`${environment.apiUrl}/users/client/${email}`);
  }
}
