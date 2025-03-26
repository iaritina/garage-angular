import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { ProductsChoiceComponent } from '../products-choice/products-choice.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-confirm',
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss',
})
export class ConfirmComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  displayedColumns: string[] = ['prestation', 'price'];
  displayedColumnsProd: string[] = ['product', 'price'];

  confirmAppointment(value: any): void {
    this.data.save(value);
    this.dialogRef.close(); // Ferme le dialogue
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  readonly dialog = inject(MatDialog);
  /* openDialog(): void {
    const dialogRef = this.dialog.open(ProductsChoiceComponent, {
      data: { car: this.data.car.name, prestations: this.data.prestations },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  } */
}
