import {
  Component,
  Inject,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-brand-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss',
})
export class BrandFormComponent implements OnChanges {
  @Input() brand: { name: string } | null = null;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BrandFormComponent>
  ) {
    if (data?.brand) {
      this.brand = data.brand;
      this.form.patchValue({
        name: this.brand?.name,
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['brand'] && this.brand) {
      this.form.patchValue(this.brand); // met a jour la valeur du formulaire
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
      this.form.reset();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
