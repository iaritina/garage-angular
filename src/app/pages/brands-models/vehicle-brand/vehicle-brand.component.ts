import { Component, inject, OnInit, ViewChild } from '@angular/core';
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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BrandFormComponent } from './form/brand-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

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
    CommonModule,
    MatMenuModule,
    MatPaginator,
  ],
  templateUrl: './vehicle-brand.component.html',
  styleUrls: ['./vehicle-brand.component.scss'],
})
export class VehicleBrandComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  brands: IVehicleBrand[] = [];
  private brandsService = inject(VehiclesBrandsService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  paginatedProduct = new MatTableDataSource();

  displayedColumns = ['name', 'actions'];

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.loadBrands();
  }

  isFieldValid(field: string) {
    const formControl = this.form.get(field);
    return formControl?.invalid;
  }

  loadBrands(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (brand) => {
        this.brands = brand;
        this.paginatedProduct.data = this.brands;
        this.paginatedProduct.paginator = this.paginator;
      },
      error: (err) =>
        console.error('Erreur lors de la recuperation des donnees', err),
    });
  }

  openDialog(brand: any = null): void {
    const dialogRef = this.dialog.open(BrandFormComponent, {
      width: '400px',
      data: { brand: brand },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (brand) {
          this.updateModels(brand._id, result);
        } else {
          this.addModel(result);
        }
      }
    });
  }

  deleteProduct(product: any) {
    this.brandsService.deleteBrand(product._id).subscribe(() => {
      this.loadBrands();
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: { message: 'Marque supprimée avec succès ✅', type: 'success' },
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-bg'],
      });
    });
  }

  addModel(model: any) {
    this.brandsService.saveBrand(model).subscribe(() => {
      this.loadBrands();
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: { message: 'Marque créée avec succès ✅', type: 'success' },
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-bg'],
      });
    });
  }

  updateModels(id: string, productsData: any) {
    this.brandsService.updateBrand(id, productsData).subscribe(() => {
      this.loadBrands();
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: { message: 'Marque mise à jour avec succès ✅', type: 'success' },
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-bg'],
      });
    });
  }
}
