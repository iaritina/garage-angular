import {
  Component,
  EventEmitter,
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
  ],
  templateUrl: './model-form.component.html',
  styleUrl: './model-form.component.scss',
})
export class ModelFormComponent implements OnInit, OnChanges {
  brands: IVehicleBrand[] = [];

  @Input() model: IVehicleModel | null = null;
  @Output() save = new EventEmitter();

  private brandService = inject(VehiclesBrandsService);

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.fetchBrands();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model'] && this.model) {
      this.form.patchValue({
        name: this.model.name,
        brand: this.model.brand._id,
      }); // met a jour la valeur du formulaire
    }
  }

  submit(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.save.emit(this.form.value);
      this.form.reset();
    }
  }

  fetchBrands(): void {
    this.brandService.getAllBrands().subscribe((brands) => {
      this.brands = brands;
    });
  }
}
