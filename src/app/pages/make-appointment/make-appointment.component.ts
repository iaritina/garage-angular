import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelect } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ProductService } from 'src/app/services/product/product.service';
import { ServiceService } from 'src/app/services/service/service.service';
import {
  MAT_DATE_LOCALE,
  MatOption,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { Token } from 'src/app/utils/token';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

interface Service {
  _id: string;
  name: string;
  current_price: number;
  next_service_km: number;
  duration: number;
  commission: number;
  isDeleted: boolean;
}

interface Product {
  _id: string;
  name: string;
  current_price: number;
  service: string;
  isDeleted: boolean;
}

interface ServiceSelection {
  service: Service;
  selectedProducts: { product: Product; quantity: number }[];
}

interface IUser {
  _id: string;
  firstname: string;
  email: string;
  role: string;
}

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
    MatIconModule,
    MatProgressBarModule,
    MatGridListModule,
    MatSelect,
    MatOption,
    MatTooltipModule,
  ],
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.scss'],
})
export class MakeAppointmentComponent implements OnInit {
  services: Service[] = [];
  products: Product[] = [];
  mechanics: IUser[] = [];

  vehicles: any[] = [];
  vehicle = {};

  minDate: Date;
  loading: boolean = false;

  hasVehiclesFlag: boolean = false;

  private _token = inject(Token);
  private TOKEN = localStorage.getItem('token');

  selectedServices: ServiceSelection[] = [];
  appointment: any = {
    selectedServices: [],
    selectedVehicle: null,
    date: new Date().toISOString().split('T')[0],
  };

  private _formBuilder = inject(FormBuilder);

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0;
  };

  constructor(
    private serviceService: ServiceService,
    private productService: ProductService,
    private appointmentService: AppointmentService,
    private vehicleService: VehicleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadServices();
    this.loadProducts();
    this.getClientVehicle();
    this.minDate = new Date();
  }

  loadServices(): void {
    this.serviceService.getAllService().subscribe((data: any[]) => {
      this.services = data as Service[];
    });
  }

  loadProducts(): void {
    this.productService.getAllProduct().subscribe((data: any[]) => {
      this.products = data as Product[];
    });
  }

  getClient() {
    const client = this._token.getUserFromToken(this.TOKEN);
    return client;
  }

  getClientVehicle() {
    const client = this.getClient();
    this.vehicleService.getVehicleByUser(client).subscribe((vehicle) => {
      this.vehicles = vehicle;
      this.hasVehiclesFlag = this.vehicles && this.vehicles.length > 0;
    });
  }

  selectVehicle(vehicle: any): void {
    this.appointment.selectedVehicle = vehicle;
  }

  isServiceSelected(serviceId: string): boolean {
    return this.selectedServices.some((s) => s.service._id === serviceId);
  }

  selectService(service: Service): void {
    if (!this.selectedServices.find((s) => s.service._id === service._id)) {
      this.selectedServices.push({
        service: service,
        selectedProducts: [],
      });
    }
  }

  removeService(serviceId: string): void {
    this.selectedServices = this.selectedServices.filter(
      (s) => s.service._id !== serviceId
    );
  }

  getProductsForService(serviceId: string): Product[] {
    const filteredProducts = this.products.filter(
      (product: any) => product.service._id === serviceId
    );
    return filteredProducts;
  }

  getProductQuantity(
    serviceSelection: ServiceSelection,
    productId: string
  ): number {
    const productSelection = serviceSelection.selectedProducts.find(
      (p: any) => p.product._id === productId
    );
    return productSelection?.quantity || 0;
  }

  updateProductQuantity(
    serviceSelection: ServiceSelection,
    product: Product,
    quantity: number
  ): void {
    const productSelection = serviceSelection.selectedProducts.find(
      (p: any) => p.product._id === product._id
    );

    if (quantity > 0) {
      if (productSelection) {
        productSelection.quantity = quantity;
      } else {
        serviceSelection.selectedProducts.push({ product, quantity });
      }
    } else {
      serviceSelection.selectedProducts =
        serviceSelection.selectedProducts.filter(
          (p: any) => p.product._id !== product._id
        );
    }
  }

  form = this._formBuilder.group({
    prestations: this._formBuilder.array([]),
    date: [null, Validators.required],
    mechanic: ['', Validators.required],
  });

  loadAvailableMechanics() {
    this.loading = true;

    const selectedPrestations = this.selectedServices.map((prestation) => ({
      _id: prestation.service._id,
      name: prestation.service.name,
      current_price: prestation.service.current_price,
    }));

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

  saveAppointment(): void {
    const selectedPrestations = this.selectedServices.map(
      (service) => service.service
    );
    const selectedMechanic = this.form.value?.mechanic;
    const selectedDate = this.form.value?.date;
    const selectedVehicle = this.appointment.selectedVehicle._id;

    if (!selectedDate || !selectedPrestations.length) return;

    const date = new Date(selectedDate);
    date.setHours(12, 0, 0, 0);

    const prestationFormatted = selectedPrestations.map((prestation) => ({
      service: prestation._id,
      price: prestation.current_price,
    }));

    const interventionFormatted = this.selectedServices
      .map((service) =>
        service.selectedProducts.map((productSelection) => ({
          product: productSelection.product._id,
          price: productSelection.product.current_price,
          quantity: productSelection.quantity,
        }))
      )
      .flat();

    const dataFormatted = {
      appointment: {
        client: this.getClient(),
        vehicle: selectedVehicle,
        prestations: prestationFormatted,
        date: date,
        mechanic: selectedMechanic,
      },
      intervention: interventionFormatted,
    };

    this.appointmentService
      .createApt(dataFormatted.appointment, dataFormatted.intervention)
      .subscribe(() => {
        Swal.fire({
          title: 'Rendez-vous enregistrer !',
          text: 'Un courrier électronique a été envoyé pour la facture de votre service.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigate(['/my-appointments']);
        });
      });
  }
}
