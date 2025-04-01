import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { IVehicleBrand } from '../../brands-models/vehicle-brand/vehicle-brand.component';
import { VehiclesBrandsService } from 'src/app/services/brands/vehicles-brands.service';
import { IVehicleModel } from '../../brands-models/vehicle-model/vehicle-model.component';
import { VehiclesModelsService } from 'src/app/services/models/vehicles-models.service';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/components/snackbar/snack-bar/snack-bar.component';
import { UserService } from 'src/app/services/user/user.service';
import { Token } from 'src/app/utils/token';

@Component({
  selector: 'app-register-client-vehicle',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register-client-vehicle.component.html',
  styleUrl: './register-client-vehicle.component.scss',
})
export class RegisterClientVehicleComponent implements OnInit {
  ngOnInit(): void {
    this.loadBrand();
    this.getUserId();
    this.form.get('brand')?.valueChanges.subscribe((value) => {
      if (value) {
        this.form.get('model')?.enable();
        this.loadModelsOfOneBrand(value);
      } else {
        this.form.get('model')?.disable();
      }
    });
  }

  brands: IVehicleBrand[] = [];
  private brandService = inject(VehiclesBrandsService);

  models: IVehicleModel[] = [];
  private modelService = inject(VehiclesModelsService);

  private vehicleService = inject(VehicleService);
  private snackBar = inject(MatSnackBar);

  private userService = inject(UserService);

  isModelDisabled: boolean = true;

  private router = inject(Router);

  private userId: string | null = null;

  form = new FormGroup({
    brand: new FormControl('', [Validators.required]),
    model: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    immatriculation: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required, Validators.maxLength(4)]),
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

    if (control.hasError('maxlength')) {
      return 'Le mot de passe doit contenir maximum 4 caractères';
    }

    return '';
  }

  loadBrand(): void {
    this.brandService.getAllBrands().subscribe((data) => (this.brands = data));
  }

  loadModelsOfOneBrand(brand_id: string) {
    this.modelService.getModelsOfOneBrand(brand_id).subscribe((data) => {
      this.models = data;
    });
  }

  saveClientVehicle(event: Event) {
    event.preventDefault();
    const id = this.userId;
    this.vehicleService
      .saveClientVehicle({ ...this.form.value, user: id })
      .subscribe(() => {
        this.router.navigate(['/my-appointments']);
        this.snackBar.openFromComponent(SnackBarComponent, {
          data: { message: 'Bienvenue à bord ✅', type: 'success' },
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-bg'],
        });
      });
  }

  onBrandChange(brand_id: string): void {
    this.loadModelsOfOneBrand(brand_id);
    this.isModelDisabled = !brand_id;
  }

  private _TOKEN = localStorage.getItem('token');
  private tokenUtils = inject(Token);

  getUserId() {
    const userId = this.tokenUtils.getUserFromToken(this._TOKEN);
    this.userService.getUserById(userId).subscribe((user) => {
      this.userId = user._id;
    });
  }

  skipVehicleRegistration() {
    this.router.navigate(['/my-appointments']);
  }
}
