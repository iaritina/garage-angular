import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { ServiceService } from 'src/app/services/service/service.service';
import { IUser } from '../authentication/side-login/side-login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import {
  MAT_DATE_LOCALE,
  MatOption,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MinutesToHours } from './minutesToHours';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from './confirm/confirm.component';
import { Token } from 'src/app/utils/token';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { ProductService } from 'src/app/services/product/product.service';
@Component({
  selector: 'app-make-appointment',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr-Fr' },
    provideNativeDateAdapter(),
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
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
    MatGridListModule,
    MinutesToHours,
    MatSelect,
    MatOption,
  ],
  templateUrl: './make-appointment.component.html',
  styleUrl: './make-appointment.component.scss',
})
export class MakeAppointmentComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  loading: boolean = false;

  //date sans dimanche
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0;
  };

  ngOnInit(): void {
    this.loadPrestations();
    this.getClientVehicle();
  }

  displayedColumns: string[] = ['choose', 'name', 'duration', 'current_price'];
  current_date = new Date();
  private prestationService = inject(ServiceService);
  private appointmentService = inject(AppointmentService);
  prestations: any[] = [];
  mechanics: IUser[] = [];
  vehicles: any[] = [];
  private vehicleService = inject(VehicleService);
  private productService = inject(ProductService);
  products: any[] = [];

  vehicle = {};

  private _token = inject(Token);
  private TOKEN = localStorage.getItem('token');

  private _formBuilder = inject(FormBuilder);

  //dialog
  openDialog(): void {
    const selectedPrestations = this.getSelectedPrestations();
    const totalPrice = this.getTotalPrice();
    const fixedDate = this.form.value?.date;
    const mechanic = this.getSelectedMechanic();
    this.getConcernedProducts();

    const selectedVehicle = this.form.value.vehicle;
    if (selectedVehicle) {
      this.vehicleService.getVehicleById(selectedVehicle).subscribe((data) => {
        this.vehicle = data.model;

        // Ouvrir le dialog après avoir récupéré le véhicule
        this.dialog.open(ConfirmComponent, {
          data: {
            prestations: selectedPrestations,
            total: totalPrice,
            date: fixedDate,
            mechanic: mechanic,
            car: this.vehicle,
            prod: this.products,
            save: (value: any) => this.saveAppointment(value),
          },
        });
      });
    } else {
      console.error('Aucun véhicule sélectionné');
    }
  }

  form = this._formBuilder.group({
    prestations: this._formBuilder.array([]),
    vehicle: ['', Validators.required],
    date: [null, Validators.required],
    mechanic: ['', Validators.required],
  });

  getClientVehicle() {
    const client = this._token.getUserFromToken(this.TOKEN);
    this.vehicleService.getVehicleByUser(client).subscribe((vehicle) => {
      this.vehicles = vehicle;
    });
  }

  saveAppointment(value: string): void {
    const selectedPrestations = this.getSelectedPrestations();
    const selectedMechanic = this.getSelectedMechanic();
    const selectedDate = this.form.value?.date;
    const selectedVehicle = this.form.value?.vehicle;

    if (!selectedDate || !selectedPrestations.length) return;

    const dateUTC = new Date(selectedDate);
    dateUTC.setHours(12, 0, 0, 0);

    if (value === 'confirmed') {
      const prestationsFormatted = selectedPrestations.map((prestation) => ({
        service: prestation._id,
        price: prestation.current_price,
      }));

      this.appointmentService
        .createApt({
          vehicle: selectedVehicle,
          prestations: prestationsFormatted,
          date: dateUTC.toISOString(),
          mechanic: selectedMechanic,
        })
        .subscribe((response) => {
          console.log('Rendez-vous enregistré avec succès', response);
        });
    }
  }

  isAnyPrestationSelected(): boolean {
    const prestationsArray = this.form.get('prestations') as FormArray;
    return prestationsArray.controls.some((control) => control.value === true); // Vérifie si une prestation est sélectionnée
  }

  getConcernedProducts() {
    const selectedPrestations = this.getSelectedPrestations();

    const prestationIds = selectedPrestations.map((p: any) => p?._id || p?.id);

    this.productService
      .getProductsByServices(prestationIds)
      .subscribe((products) => {
        this.products = products;
        console.log(this.products);
      });
  }

  getSelectedPrestations(): {
    _id: string;
    name: string;
    current_price: number;
  }[] {
    const prestationsArray = this.form.get('prestations') as FormArray;

    // Récupérer les IDs des prestations sélectionnées
    return this.prestations
      .filter((_, index) => prestationsArray.at(index).value === true)
      .map((prestation) => ({
        _id: prestation._id,
        name: prestation.name,
        current_price: prestation.current_price,
      }));
  }

  getTotalPrice(): number {
    return this.getSelectedPrestations().reduce(
      (sum, prestation) => sum + prestation.current_price,
      0
    );
  }

  loadPrestations(): void {
    this.loading = true;
    this.prestationService.getAllService().subscribe((data) => {
      this.prestations = data;
      this.loading = false;

      const prestationsArray = this.form.get('prestations') as FormArray;
      prestationsArray.clear();

      this.prestations.forEach(() => {
        prestationsArray.push(this._formBuilder.control(false));
      });
    });
  }
  getSelectedMechanic(): any {
    return this.mechanics.find(
      (m) => m._id === this.form.get('mechanic')?.value
    );
  }

  loadAvailableMechanics() {
    this.loading = true;

    const selectedPrestations = this.getSelectedPrestations();
    const selectedDate = this.form.get('date')?.value;

    if (!selectedPrestations.length || !selectedDate) {
      this.loading = false;
      return;
    }

    const requestData = {
      prestations: selectedPrestations,
      date: selectedDate,
    };

    this.appointmentService
      .getAvailableMecanics(requestData)
      .subscribe((mechanics) => {
        this.mechanics = mechanics;
        this.loading = false;
      });
  }
}
