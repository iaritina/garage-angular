import {
  Component,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { IVehicleBrand } from '../../brands-models/vehicle-brand/vehicle-brand.component';
import { VehiclesBrandsService } from 'src/app/services/brands/vehicles-brands.service';
import { IVehicleModel } from '../../brands-models/vehicle-model/vehicle-model.component';
import { VehiclesModelsService } from 'src/app/services/models/vehicles-models.service';

@Component({
  selector: 'app-register-client-vehicle',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register-client-vehicle.component.html',
  styleUrl: './register-client-vehicle.component.scss',
})
export class RegisterClientVehicleComponent implements OnInit {
  ngOnInit(): void {
    this.loadBrand();
  }

  brands: IVehicleBrand[] = [];
  private brandService = inject(VehiclesBrandsService);

  models: IVehicleModel[] = [];
  private modelService = inject(VehiclesModelsService);

  isModelDisabled: boolean = true;

  form = new FormGroup({
    brand: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    immatriculation: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required, Validators.maxLength(4)]),
  });

  loadBrand(): void {
    this.brandService.getAllBrands().subscribe((data) => (this.brands = data));
  }

  loadModelsOfOneBrand(brand_id: string) {
    this.modelService.getModelsOfOneBrand(brand_id).subscribe((data) => {
      this.models = data;
    });
  }

  onBrandChange(brand_id: string): void {
    this.loadModelsOfOneBrand(brand_id);
    this.isModelDisabled = !brand_id;
  }
}
