import { jwtDecode } from "jwt-decode";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Token {

  getUserFromToken(token: string | null) {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id;
    } catch (e) {
      console.error('Invalid token format', e);
      return null;
    }
  }
}
