import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';

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
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  private vehicleService = inject(VehicleService);

  constructor(private router: Router, private userService: UserService) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    this.userService.login(this.email, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('email', response.email);
        if (response.role === 'client') {
          this.verifyClientVehicle(this.email);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        this.errorMessage = 'Identifiants incorrects';
      },
    });
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
