import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DATE_LOCALE,
  MatOptionModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { UserService } from 'src/app/services/user/user.service';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { Token } from 'src/app/utils/token';
import { IUser } from '../authentication/side-login/side-login.component';
import { ServiceService } from 'src/app/services/service/service.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface IAppointment {
  _id?: string;
  client: string;
  vehicle: string;
  prestations: {
    service: string;
    price: number;
  }[];
  mechanic?: string;
  date: string;
  status: boolean;
  isCanceled: boolean;
}

@Component({
  selector: 'app-clients-appointment',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr-Fr' },
    provideNativeDateAdapter(),
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './clients-appointment.component.html',
  styleUrl: './clients-appointment.component.scss',
})
export class ClientsAppointmentComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['vehicle', 'prestation', 'mechanic', 'date'];

  filterForm: FormGroup;
  vehicles: any[] = [];
  mechanics: IUser[] = [];
  services: any[] = [];
  hasVehiclesFlag: boolean = false;

  private _formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.filterForm = this._formBuilder.group({
      vehicleId: new FormControl(null),
      mechanicId: new FormControl(null),
      serviceId: new FormControl(null),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
    });

    //filtres
    this.loadVehicles();
    this.loadMechanics();
    this.loadServices();
    this.loadClientAppointments();
  }

  private appointmentService = inject(AppointmentService);
  private vehicleService = inject(VehicleService);
  private mechanicService = inject(UserService);
  private prestationsService = inject(ServiceService);
  private _tokenUtils = inject(Token);

  appointments: IAppointment[] = [];
  datasource = new MatTableDataSource<IAppointment>(this.appointments);
  private _TOKEN = localStorage.getItem('token');

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
  }

  getClient() {
    const client = this._tokenUtils.getUserFromToken(this._TOKEN);
    return client;
  }

  loadClientAppointments(filters = {}) {
    const client = this.getClient();
    this.appointmentService
      .getAllClientAppointments(client, filters)
      .subscribe((data) => {
        this.appointments = data;
        this.datasource.data = data;
      });
  }

  loadVehicles() {
    const client = this.getClient();
    this.vehicleService.getVehicleByUser(client).subscribe((data) => {
      this.vehicles = data;
      this.hasVehiclesFlag = this.vehicles && this.vehicles.length > 0;
    });
  }

  loadMechanics() {
    this.mechanicService.getMechanics().subscribe((data) => {
      this.mechanics = data.filter((user) => user.role === 'mecanicien');
    });
  }

  loadServices() {
    this.prestationsService.getAllService().subscribe((data) => {
      this.services = data;
    });
  }

  applyFilters() {
    const rawFilters = this.filterForm.value;

    const filters = Object.fromEntries(
      Object.entries(rawFilters).filter(
        ([_, value]) => value !== null && value !== undefined
      )
    );
    this.loadClientAppointments(filters);
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.applyFilters();
  }
}
