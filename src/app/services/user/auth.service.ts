import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { Token } from 'src/app/utils/token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _ROLE = {
    client: 'client',
    admin: 'manager',
    mechanic: 'mecanicien',
  };

  constructor(
    private router: Router,
    private userService: UserService,
    private vehicleService: VehicleService,
    private tokenService: Token
  ) {}

  login(email: string, password: string) {
    return this.userService.login(email, password);
  }

  loadUser(token: string | null) {
    const userId = this.tokenService.getUserFromToken(token);
    return this.userService.getUserById(userId);
  }

  verifyClientVehicle(email: string) {
    return this.userService.getUserByEmail(email);
  }
}
