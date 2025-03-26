import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { Token } from 'src/app/utils/token';

export interface IAppointment {
  _id?: string; // ID de l'appointment (optionnel si non encore créé)
  client: string; // ID du client
  vehicle: string; // ID du véhicule
  prestations: {
    service: string; // ID du service
    price: number; // Prix du service
  }[];
  mechanic?: string; // ID du mécanicien (optionnel)
  date: string; // Date du rendez-vous (au format ISO)
  status: boolean; // Statut du rendez-vous (confirmé ou non)
  isCanceled: boolean; // Indique si le rendez-vous est annulé
}

@Component({
  selector: 'app-clients-appointment',
  imports: [CommonModule, MatCardModule, MatTableModule, MatPaginatorModule],
  templateUrl: './clients-appointment.component.html',
  styleUrl: './clients-appointment.component.scss',
})
export class ClientsAppointmentComponent implements OnInit {
  displayedColumns: string[] = ['vehicle', 'prestation', 'mechanic', 'date'];

  ngOnInit(): void {
    this.loadClientAppointments();
  }

  private appointmentService = inject(AppointmentService);
  private _tokenUtils = inject(Token);

  appointments: IAppointment[] = [];
  private _TOKEN = localStorage.getItem('token');

  getClient() {
    const client = this._tokenUtils.getUserFromToken(this._TOKEN);
    return client;
  }

  loadClientAppointments() {
    const client = this.getClient();
    this.appointmentService
      .getAllClientAppointments(client)
      .subscribe((data) => {
        this.appointments = data;
        console.log(data);
      });
  }
}
