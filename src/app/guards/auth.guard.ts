import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '../services/user/user.service';
import { Token } from '../utils/token';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private _tokenService: Token,
    private router: Router
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // Vérifie si l'utilisateur est authentifié
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['/authentication/login']);
      return false;
    }

    // Récupère les rôles requis pour la route
    const requiredRoles = route.data['roles'] as string[];

    // Si aucun rôle n'est requis, autorise l'accès
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Récupère le rôle de l'utilisateur
    const userRole = await this.getUserRole();

    // Vérifie si l'utilisateur a un rôle autorisé
    if (requiredRoles.includes(userRole)) {
      return true;
    }

    // Redirige si l'utilisateur n'a pas le rôle requis
    this.router.navigate(['/authentication/unauthorized']);
    return false;
  }

  private async getUserRole(): Promise<string> {
    const token = this.userService.getToken();
    const userId = this._tokenService.getUserFromToken(token);
    const user = await firstValueFrom(this.userService.getUserById(userId)); // Utilisation de firstValueFrom
    return user?.role || 'guest'; // Retourne le rôle ou 'guest' par défaut
  }
}
