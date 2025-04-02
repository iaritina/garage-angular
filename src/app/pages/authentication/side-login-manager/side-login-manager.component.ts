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
  selector: 'app-side-login-manager',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-login-manager.component.html',
  styleUrl: './side-login-manager.component.scss',
})
export class SideLoginManagerComponent {
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
              if (user.role === 'manager') {
                this.router.navigate(['/stat']);
              } else {
                this.errorMessage = 'Accès réservé aux administrateurs.';
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
