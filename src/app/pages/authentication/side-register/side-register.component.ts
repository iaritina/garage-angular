import { Component, inject, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Title } from '@angular/platform-browser';
import { AppName } from 'src/app/app.config';
import { UserService } from 'src/app/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/components/snackbar/snack-bar/snack-bar.component';

@Component({
  selector: 'app-side-register',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
  styleUrls: ['./side-register.component.css'],
})
export class AppSideRegisterComponent implements OnInit {
  options = this.settings.getOptions();
  private userService = inject(UserService);
  private snackBar = inject(MatSnackBar);

  constructor(
    private settings: CoreService,
    private router: Router,
    private titleComponent: Title
  ) {}
  ngOnInit(): void {
    this.titleComponent.setTitle('Inscription - ' + AppName.title);
  }

  // validation des données
  form = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    phone: new FormControl('', [Validators.required]),
    optionalPhone: new FormControl(''),
  });

  // verifie si le champ est valide
  isFieldValid(field: string) {
    const formControl = this.form.get(field);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }

  // recupere les messages d'erreurs
  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) {
      return 'Ce champ est requis';
    }

    if (control.hasError('email')) {
      return 'Veuillez entrer une adresse email valide';
    }

    if (control.hasError('minlength')) {
      return 'Le mot de passe doit contenir au moins 6 caractères';
    }

    return '';
  }

  get f() {
    return this.form.controls;
  }

  submit(event: Event) {
    event.preventDefault();
    if (this.form.invalid) {
      return;
    }
    this.userService.registerUser(this.form.value).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/']);
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: { message: 'Inscription réussie ✅', type: 'success' },
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-bg'],
      });
    });
  }
}
