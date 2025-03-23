import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MonitoringService } from 'src/app/services/monitoring/monitoring.service';

@Component({
  selector: 'app-monitoring',
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
      MatMenuModule,
  ],
  templateUrl: './monitoring.component.html',
  styleUrl: './monitoring.component.scss'
})
export class MonitoringComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  data: any[] = []
  displayedColumns = ['marque', 'modele','service','mecanicien','status'];
  paginatedData = new MatTableDataSource();

  constructor(
    private monitoringService: MonitoringService,
  ){}

  ngOnInit(): void {
    this.getAllAppointment();
  }

  onPageChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const paginatedData = this.data.slice(startIndex, startIndex + event.pageSize);
    this.paginatedData.data = paginatedData;
  }


  getAllAppointment(): void {
    this.monitoringService.getAllAppointment().subscribe({
      next: (appointment) => {
        console.log("appointment",appointment);
        this.data = appointment;
        this.paginatedData.data = this.data;
        this.paginatedData.paginator = this.paginator;
      },
      error: (err) => console.error("Erreur lors de la recuperation des rendez-vous",err)
    });
  }
}
