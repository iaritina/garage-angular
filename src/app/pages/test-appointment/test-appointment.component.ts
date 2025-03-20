import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-test-appointment',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatTimepickerModule,
  ],
  templateUrl: './test-appointment.component.html',
  styleUrl: './test-appointment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestAppointmentComponent implements OnInit {
  private aptService = inject(AppointmentService);
  private readonly _adapter =
    inject<DateAdapter<unknown, unknown>>(DateAdapter);
  protected switchLocale() {
    this._adapter.setLocale('fr-FR');
  }
  ngOnInit(): void {
    this.switchLocale();
  }

  form = new FormGroup({
    vehicle: new FormControl<string | null>(null, [Validators.required]), // Peut être une string ou null
    aptDate: new FormControl<string | null>(null, [
      Validators.required,
      this.dateValidator,
    ]), // Date sous format string
    aptTime: new FormControl<string | null>(null), // Heure sous format string (ex: "14:30")
  });

  /* test(event: Event) {
    event.preventDefault();
    console.log(this.form.value.aptTime);
  } */
  saveApt(event: Event) {
    event.preventDefault();
    const formValues = this.form.value;

    if (!formValues.aptDate || !formValues.aptTime) {
      console.error('Date et heure sont requises !');
      return;
    }

    console.log(formValues.aptTime);

    // Convertir la date de l'utilisateur (sans heure)
    const localDate = new Date(formValues.aptDate as string);

    // Vérifier si la date est valide
    if (isNaN(localDate.getTime())) {
      console.error('Format de date invalide !');
      return;
    }

    // Extraire l'heure et les minutes
    let hours = 0,
      minutes = 0;
    const localHours = new Date(formValues.aptTime);
    hours = localHours.getHours();
    minutes = localHours.getMinutes();

    console.log(hours);

    // Appliquer l'heure et les minutes à la date
    localDate.setHours(hours, minutes, 0, 0);

    // Vérification après setHours

    // Convertir la date en UTC avant de l'envoyer à la base de données
    const utcDate = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    );

    // Créer l'objet final avec la date et l'heure fusionnées
    const appointmentData = {
      ...formValues,
      date: utcDate.toISOString(), // Date au format UTC
    };

    // Envoyer les données au service
    this.aptService.createApt(appointmentData).subscribe(() => {
      console.log('RDV créé avec succès !');
    });
  }
  // Validator pour la date
  dateValidator(control: AbstractControl) {
    const selectedDate = new Date(control.value);
    const today = new Date();

    // Vérifier si la date est dans le passé
    if (selectedDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
      return { pastDate: true }; // Erreur si la date est passée
    }
    return null; // Aucun problème
  }
}
