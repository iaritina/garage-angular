import { Component, OnInit, ViewChild } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { Token } from 'src/app/utils/token';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { VehicleFormComponent } from "./vehicle-form/vehicle-form.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle',
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginator,
    CommonModule,
],
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  title: string = "Liste des véhicules";
  vehicles: any[] = [];
  displayedColumns = ['Marque', 'Modele', 'Immatriculation', 'Annee', 'actions'];
  paginatedVehicles = new MatTableDataSource();
  showForm: boolean = false;

  constructor(
    private vehicleService: VehicleService,
    private tokenService: Token,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getVehicleByUser();
  }

  ngAfterViewInit(): void {
    this.paginatedVehicles.paginator = this.paginator;
  }

  onPageChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const paginatedData = this.vehicles.slice(startIndex, startIndex + event.pageSize);
    this.paginatedVehicles.data = paginatedData;
  }

  getVehicleByUser(): void {
    const token = localStorage.getItem("token");
    const userId: any = this.tokenService.getUserFromToken(token);
    this.vehicleService.getVehicleByUser(userId).subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
        this.paginatedVehicles.data = this.vehicles;
        this.paginatedVehicles.paginator = this.paginator;
      },
      error: (err) => console.error("Erreur lors de la récupération des véhicules", err)
    });
  }

  addNewVehicle() {
    this.showForm = true; 
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

}
