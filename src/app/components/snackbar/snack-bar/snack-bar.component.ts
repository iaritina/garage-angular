import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  imports: [CommonModule],
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent {
  public data = inject(MAT_SNACK_BAR_DATA);
  public snackBarRef = inject(MatSnackBarRef<SnackBarComponent>);
}
