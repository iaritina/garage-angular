import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'src/app/material.module';
import { VehiclesBrandsService } from 'src/app/services/brands/vehicles-brands.service';
import { VehiclesModelsService } from 'src/app/services/models/vehicles-models.service';


@Component({
  selector: 'app-vehicle-form',
  imports: [
      CommonModule,
      MaterialModule,
      ReactiveFormsModule,
      MatDialogModule,
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
    ],
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent implements OnChanges {

  ngOnInit(): void {
    this.getAllBrand();
    this.form.get('brand')?.valueChanges.subscribe((value) => {
      if (value) {
        this.form.get('model')?.enable();
        this.getModelByBrand(value);
      } else {
        this.form.get('model')?.disable();
      }
    });

  }

  @Input() vehicleData: any | null = null;
  @Output() save = new EventEmitter<any>();

  brands: any[] = [];
  private brandService = inject(VehiclesBrandsService);

  models: any[] = [];
  private modelService = inject(VehiclesModelsService);

  getAllBrand() {
    this.brandService.getAllBrands().subscribe((data) => (this.brands = data));
  }

  getModelByBrand(brandId: string) {
    this.modelService.getModelsOfOneBrand(brandId).subscribe((models) => {
      this.models = models;

      if (this.vehicleData?.model) {
        this.form.patchValue({ model: this.vehicleData.model._id });
      }
    });
  }



  form = new FormGroup({
    brand: new FormControl('', [Validators.required]),
    model: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    immatriculation: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<VehicleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data?.vehicleData) {
      this.vehicleData = data.vehicleData;
      this.form.patchValue(this.vehicleData);
    }

    if (this.vehicleData?.model?.brand?._id) {
      this.getModelByBrand(this.vehicleData.model.brand._id);
      this.form.patchValue({ brand: this.vehicleData.model.brand._id });
    }
  }


  ngOnChanges(changes: SimpleChanges) {
    if(changes['vehicleData'] && this.vehicleData) {
      this.form.patchValue(this.vehicleData);
    }
  }

  onNoClick():void {
    this.dialogRef.close();
  }

  submit(event: Event) {
    event.preventDefault();
    if(this.form.valid) {
      this.save.emit(this.form.value);
      this.dialogRef.close(this.form.value);
    }
  }


}
