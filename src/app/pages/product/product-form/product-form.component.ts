import { productsData } from './../../ui-components/tables/tables.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'src/app/material.module';
import { ServiceService } from 'src/app/services/service/service.service';

@Component({
  selector: 'app-product-form',
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
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnChanges {

  services: any[] = [];

  @Input() productData: any | null = null;
  @Output() save = new EventEmitter<any>();

  constructor(
    private service: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
     public dialogRef: MatDialogRef<ProductFormComponent>,
  ) {
    if(data?.productData) {
      this.productData = data.productData;
      this.form.patchValue({
        name: this.productData.name,
        current_price: this.productData.current_price,
        service: this.productData.service._id,
      });
    }

  }

  ngOnInit(): void {
    this.service.getAllService().subscribe((service) => this.services = service);
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    current_price: new FormControl('', [Validators.required]),
    service: new FormControl('',[Validators.required]),
  });

  ngOnChanges(changes: SimpleChanges) {
    console.log("product data",this.productData);
      if(changes['productData'] && this.productData) {
        this.form.patchValue({
          name: this.productData.name,
          current_price: this.productData.current_price,
          service: this.productData.service._id,
        });
      }
  }

  onNoClick(): void {
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
