import {
  Component,
  EventEmitter,
  Input,
  input,
  OnChanges,
  Output,
  output,
  SimpleChanges,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-brand-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss',
})
export class BrandFormComponent implements OnChanges {
  @Input() brand: { name: string } | null = null;
  @Output() save = new EventEmitter();

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['brand'] && this.brand) {
      this.form.patchValue(this.brand); // met a jour la valeur du formulaire
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.save.emit(this.form.value);
      this.form.reset();
    }
  }
}
