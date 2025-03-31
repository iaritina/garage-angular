import {
  Component,
  EventEmitter,
  Inject,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { IVehicleBrand } from '../../vehicle-brand/vehicle-brand.component';
import { VehiclesBrandsService } from 'src/app/services/brands/vehicles-brands.service';
import { IVehicleModel } from '../vehicle-model.component';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-model-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelect,
    MatOption,
    MatDialogContent,
    CommonModule,
    MatDialogModule,
  ],
  templateUrl: './model-form.component.html',
  styleUrl: './model-form.component.scss',
})
export class ModelFormComponent implements OnInit, OnChanges {
  brands: IVehicleBrand[] = [];

  @Input() modelData: IVehicleModel | null = null;
  @Output() save = new EventEmitter();

  constructor(
    private brandService: VehiclesBrandsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModelFormComponent>
  ) {
    if (data?.modelData) {
      this.modelData = data.modelData;
      this.form.patchValue({
        name: this.modelData?.name,
        brand: this.modelData?.brand._id,
      });
    }
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.fetchBrands();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modelData'] && this.modelData) {
      this.form.patchValue({
        name: this.modelData.name,
        brand: this.modelData.brand._id,
      }); // met a jour la valeur du formulaire
    }
  }

  submit(event: Event) {
    event.preventDefault();
    console.log('Formulaire soumis', this.form.value);
    if (this.form.valid) {
      console.log('tonga');
      this.save.emit(this.form.value);
      this.dialogRef.close(this.form.value);
      this.form.reset();
    }
  }

  fetchBrands(): void {
    this.brandService.getAllBrands().subscribe((brands) => {
      this.brands = brands;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
