import { Component, inject, OnInit, ViewChild } from '@angular/core';

import { VehiclesModelsService } from 'src/app/services/models/vehicles-models.service';
import { IVehicleBrand } from '../vehicle-brand/vehicle-brand.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/components/snackbar/snack-bar/snack-bar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModelFormComponent } from './form/model-form.component';

export interface IVehicleModel {
  _id: string;
  name: string;
  brand: IVehicleBrand;
}

@Component({
  selector: 'app-vehicle-model',
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatPaginator,
    CommonModule,
  ],
  templateUrl: './vehicle-model.component.html',
  styleUrl: './vehicle-model.component.scss',
})
export class VehicleModelComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  models: IVehicleModel[] = [];
  private modelsService = inject(VehiclesModelsService);
  displayedColumns: string[] = ['brand', 'model', 'actions'];
  paginatedProduct = new MatTableDataSource();
  showForm: boolean = false;

  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.getAllModels();
  }

  private dialog = inject(MatDialog);
  openDialog(model: any = null): void {
    const dialogRef = this.dialog.open(ModelFormComponent, {
      width: '400px',
      data: { modelData: model },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        if (model) {
          this.updateModels(model._id, result);
        } else {
          this.addModel(result);
        }
      }
    });
  }

  getAllModels() {
    this.modelsService.getModels().subscribe({
      next: (model) => {
        this.models = model;
        this.paginatedProduct.data = this.models;
        this.paginatedProduct.paginator = this.paginator;
      },
      error: (err) =>
        console.error('Erreur lors de la recuperation des donnees', err),
    });
  }

  deleteProduct(product: any) {
    this.modelsService.deleteModel(product._id).subscribe(() => {
      this.getAllModels();
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: { message: 'Modèle supprimé avec succès ✅', type: 'success' },
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-bg'],
      });
    });
  }

  addModel(model: any) {
    console.log(model);
    this.modelsService.createModel(model).subscribe(() => {
      this.getAllModels();
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: { message: 'Modèle créé avec succès ✅', type: 'success' },
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-bg'],
      });
    });
  }

  updateModels(id: string, productsData: any) {
    this.modelsService.updateModel(id, productsData).subscribe(() => {
      this.getAllModels();
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: { message: 'Modèle mis à jour avec succès ✅', type: 'success' },
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-bg'],
      });
    });
  }
}
