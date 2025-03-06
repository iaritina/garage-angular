import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    console.log("data", this.email, this.password);
    this.userService.login(this.email,this.password).subscribe({
      next: (response) => {
        localStorage.setItem("token",response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = 'Identifiants incorrects';
      }
    })
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    // console.log(this.form.value);
    this.router.navigate(['/']);
  }
}
