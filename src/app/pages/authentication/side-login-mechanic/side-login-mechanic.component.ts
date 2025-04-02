import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-side-login-mechanic',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-login-mechanic.component.html',
  styleUrl: './side-login-mechanic.component.scss',
})
export class SideLoginMechanicComponent {
  errorMessage: string = '';

  form = new FormGroup({
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const emailVal = this.form.value.email;
    const pwdVal = this.form.value.password;

    if (this.form.valid && emailVal && pwdVal) {
      this.authService.login(emailVal, pwdVal).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          const token = localStorage.getItem('token');
          this.authService.loadUser(token).subscribe({
            next: (user) => {
              if (user.role === 'mecanicien') {
                this.router.navigate(['/task']);
              } else {
                this.errorMessage = 'Accès réservé aux mécaniciens.';
              }
            },
          });
        },
        error: (error) => {
          console.log(error);
          this.errorMessage = 'Échec de connexion : Identifiants incorrects.';
        },
      });
    }
  }
}
