import { Component, inject, OnInit } from '@angular/core';

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
import { MatTableModule } from '@angular/material/table';
import { ModelFormComponent } from './form/model-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/components/snackbar/snack-bar/snack-bar.component';

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
    MatListModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    ModelFormComponent,
  ],
  templateUrl: './vehicle-model.component.html',
  styleUrl: './vehicle-model.component.scss',
})
export class VehicleModelComponent implements OnInit {
  models: IVehicleModel[] = [];
  private modelsService = inject(VehiclesModelsService);
  displayedColumns: string[] = ['brand', 'model', 'actions'];

  selectedModel: IVehicleModel | null = null;
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.loadModels();
  }

  loadModels(): void {
    this.modelsService.getModels().subscribe((data) => {
      this.models = data;
    });
  }

  deleteModel(id: string): void {
    this.modelsService.deleteModel(id).subscribe(() => {
      this.loadModels();
    });
  }

  saveModel(model: IVehicleModel): void {
    if (this.selectedModel) {
      this.modelsService
        .updateModel(this.selectedModel._id, model)
        .subscribe(() => {
          this.snackBar.openFromComponent(SnackBarComponent, {
            data: { message: 'Modele mis à jour ✅', type: 'success' },
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-bg'],
          });
          this.selectedModel = null;
          this.loadModels();
        });
    } else {
      this.modelsService.createModel(model).subscribe(() => {
        this.snackBar.openFromComponent(SnackBarComponent, {
          data: { message: 'Modele enregistré ✅', type: 'success' },
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-bg'],
        });
        this.loadModels();
      });
    }
  }

  editModel(model: IVehicleModel): void {
    this.selectedModel = model;
  }
}
