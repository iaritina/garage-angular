import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-confirm',
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
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
}
