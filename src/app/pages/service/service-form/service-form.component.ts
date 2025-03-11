import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-service-form',
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
  templateUrl: './service-form.component.html',
  styleUrl: './service-form.component.scss'
})
export class ServiceFormComponent implements OnChanges {
  @Input() serviceData: any | null = null;
  @Output() save = new EventEmitter<any>();

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    current_price: new FormControl('', [Validators.required]),
    next_service_km: new FormControl('', [Validators.required]), // Suppression de Validators.email
    duration: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<ServiceFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data?.serviceData) {
      this.serviceData = data.serviceData;
      this.form.patchValue(this.serviceData);
    }
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['serviceData'] && this.serviceData) {
      this.form.patchValue(this.serviceData);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.save.emit(this.form.value);
      this.dialogRef.close(this.form.value);
    }
  }
}
