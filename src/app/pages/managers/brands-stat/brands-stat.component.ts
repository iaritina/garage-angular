import { Component } from '@angular/core';
import { BrandsAppointmentComponent } from '../brands-appointment/brands-appointment.component';
import { BrandsCountComponent } from '../brands-count/brands-count.component';

@Component({
  selector: 'app-brands-stat',
  imports: [BrandsAppointmentComponent, BrandsCountComponent],
  templateUrl: './brands-stat.component.html',
  styleUrl: './brands-stat.component.scss',
})
export class BrandsStatComponent {}
