import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { VehiclesBrandsService } from 'src/app/services/brands/vehicles-brands.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/components/snackbar/snack-bar/snack-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { BrandFormComponent } from './form/brand-form/brand-form.component';

export interface IVehicleBrand {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-vehicle-brand',
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    BrandFormComponent,
  ],
  templateUrl: './vehicle-brand.component.html',
  styleUrls: ['./vehicle-brand.component.scss'],
})
export class VehicleBrandComponent implements OnInit {
  title: string = 'Gestion des marques et des modeles de véhicules';
  brands: IVehicleBrand[] = [];
  private titleComponent: Title = inject(Title);
  private brandsService = inject(VehiclesBrandsService);
  private snackBar = inject(MatSnackBar);

  displayedColumns = ['name', 'actions'];
  selectedBrand: IVehicleBrand | null = null;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.titleComponent.setTitle(this.title);
    this.loadBrands();
  }

  isFieldValid(field: string) {
    const formControl = this.form.get(field);
    return formControl?.invalid;
  }

  editBrand(brand: IVehicleBrand) {
    this.selectedBrand = brand;
  }
  loadBrands(): void {
    this.brandsService.getAllBrands().subscribe((data) => {
      this.brands = data;
    });
  }

  saveBrand(brand: { name: string }) {
    if (this.selectedBrand) {
      this.brandsService
        .updateBrand(this.selectedBrand._id, brand)
        .subscribe(() => {
          this.loadBrands();
          this.snackBar.openFromComponent(SnackBarComponent, {
            data: { message: 'Marque mise à jour ✅', type: 'success' },
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-bg'],
          });
          this.selectedBrand = null;
        });
    } else {
      this.brandsService.saveBrand(brand).subscribe(() => {
        this.loadBrands();
        this.snackBar.openFromComponent(SnackBarComponent, {
          data: { message: 'Marque enregistrée ✅', type: 'success' },
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-bg'],
        });
      });
    }
  }

  deleteBrand(id: string) {
    this.brandsService.deleteBrand(id).subscribe(() => {
      this.loadBrands();
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: { message: 'Marque supprimée ✅', type: 'success' },
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-bg'],
      });
    });
  }
}
