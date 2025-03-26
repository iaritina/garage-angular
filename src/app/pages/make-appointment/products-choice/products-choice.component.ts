import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-products-choice',
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './products-choice.component.html',
  styleUrl: './products-choice.component.scss',
})
export class ProductsChoiceComponent {
  readonly dialogRef = inject(MatDialogRef<ProductsChoiceComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  displayedColumns: string[] = ['choose', 'prestation', 'price'];

  private _formBuilder = inject(FormBuilder);

  form = this._formBuilder.group({
    prestations: this._formBuilder.array([]),
    vehicle: ['', Validators.required],
    date: [null, Validators.required],
    mechanic: ['', Validators.required],
  });

  isAnyPrestationSelected(): boolean {
    const prestationsArray = this.form.get('prestations') as FormArray;
    return prestationsArray.controls.some((control) => control.value === true);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
