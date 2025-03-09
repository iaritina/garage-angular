import { Component } from '@angular/core';
import { VehicleBrandComponent } from './vehicle-brand/vehicle-brand.component';
import { VehicleModelComponent } from './vehicle-model/vehicle-model.component';

@Component({
  selector: 'app-brands-models',
  imports: [VehicleBrandComponent, VehicleModelComponent],
  templateUrl: './brands-models.component.html',
  styleUrl: './brands-models.component.scss',
})
export class BrandsModelsComponent {}
