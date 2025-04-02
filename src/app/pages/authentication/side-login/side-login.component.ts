import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { Token } from 'src/app/utils/token';
export interface IUser {
  _id: string;
  firstname: string;
  email: string;
  role: string;
}
@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  errorMessage: string = '';

  private vehicleService = inject(VehicleService);
  private tokenService = inject(Token);

  constructor(private router: Router, private userService: UserService) {}

  form = new FormGroup({
    email: new FormControl<string>('donald@gmail.com', [
      Validators.required,
      Validators.required,
    ]),
    password: new FormControl('donald', [Validators.required]),
  });

  private _ROLE = {
    client: 'client',
    admin: 'manager',
    mechanic: 'mecanicien',
  };

  private user: IUser = {
    _id: '',
    firstname: '',
    email: '',
    role: '',
  };

  loadUser(token: string | null) {
    const userId = this.tokenService.getUserFromToken(token);
    this.userService.getUserById(userId).subscribe({
      next: (response) => {
        this.user = response;
        if (this.user.role === this._ROLE.client) {
          this.verifyClientVehicle(this.user.email);
        } else if (this.user.role === this._ROLE.admin) {
          this.router.navigate(['/stat']);
        } else {
          this.router.navigate(['/task']);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  login() {
    const emailVal = this.form.value.email;
    const pwdVal = this.form.value.password;

    if (this.form.valid && emailVal && pwdVal) {
      this.userService.login(emailVal, pwdVal).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          const token = localStorage.getItem('token');
          this.loadUser(token);
        },
        error: (error) => {
          console.log(error);
          this.errorMessage = 'Échec de connexion : Identifiants incorrects.';
        },
      });
    }
  }

  verifyClientVehicle(email: string) {
    this.userService.getUserByEmail(email).subscribe({
      next: (data) => {
        const userId = data._id;
        this.vehicleService.getVehicleByUser(userId).subscribe({
          next: (vehicles) => {
            if (vehicles.length > 0) {
              return this.router.navigate(['/my-appointments']);
            }
            return this.router.navigate([
              '/authentication/register-your-vehicle',
            ]);
          },
        });
      },
    });
  }
  get f() {
    return this.form.controls;
  }

  submit() {
    // console.log(this.form.value);
    this.router.navigate(['/']);
  }
}
