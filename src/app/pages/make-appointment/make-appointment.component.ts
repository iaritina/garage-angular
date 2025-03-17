import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatStepperModule,
  StepperOrientation,
} from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { ServiceService } from 'src/app/services/service/service.service';
import { IUser } from '../authentication/side-login/side-login.component';
import { UserService } from 'src/app/services/user/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { map, Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@Component({
  selector: 'app-make-appointment',
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatStepperModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatTimepickerModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  templateUrl: './make-appointment.component.html',
  styleUrl: './make-appointment.component.scss',
})
export class MakeAppointmentComponent implements OnInit, OnDestroy {
  value: Date; //date

  isLinear = true;
  loading: boolean = false;

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    prestations: this._formBuilder.array([], this.minSelectedCheckboxes(1)),
  });

  secondFormGroup = this._formBuilder.group({
    mechanics: this._formBuilder.array([]),
    aptDate: ['', Validators.required], // Contrôle pour la date
    aptTime: ['', Validators.required],
  });

  ngOnInit(): void {
    this.loadPrestations();
    this.loadMechanics();
    this.updateCurrentDateTime();
    this.checkBreakpoint();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  get prestationsFormArray(): FormArray {
    return this.firstFormGroup.get('prestations') as FormArray;
  }

  displayedColumns: string[] = ['choose', 'name', 'duration', 'current_price'];
  current_date = new Date();
  private prestationService = inject(ServiceService);
  prestations: any[] = [];
  private intervalId: any;
  mechanics: IUser[] = [];
  private userService = inject(UserService);

  loadPrestations(): void {
    this.loading = true;
    this.prestationService.getAllService().subscribe((data) => {
      this.prestations = data;
      this.initPrestationsFormArray();
      this.loading = false;
    });
  }

  loadMechanics(): void {
    this.loading = true;
    this.userService.getMechanics().subscribe((data) => {
      this.mechanics = data;
      this.loading = false;
    });
  }

  initPrestationsFormArray(): void {
    this.prestations.forEach(() => {
      this.prestationsFormArray.push(this._formBuilder.control(false));
    });
  }

  getSelectedPrestations(): any[] {
    return this.prestations.filter(
      (_, index) => this.prestationsFormArray.at(index).value
    );
  }

  onNext(): void {
    const selectedPrestations = this.getSelectedPrestations();
    console.log('Prestations sélectionnées :', selectedPrestations);
  }

  updateCurrentDateTime(): void {
    this.intervalId = setInterval(() => {
      this.current_date = new Date();
    }, 1000);
  }
  minSelectedCheckboxes(min: number) {
    const validator: Validators = (
      formArray: AbstractControl
    ): ValidationErrors | null => {
      const totalSelected = formArray.value.reduce(
        (prev: number, next: boolean) => (next ? prev + 1 : prev),
        0
      );
      return totalSelected >= min ? null : { required: true };
    };
    return validator;
  }

  stepperOrientation: Observable<StepperOrientation>;
  private breakpointObserver = inject(BreakpointObserver);

  checkBreakpoint() {
    this.stepperOrientation = this.breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }
}
