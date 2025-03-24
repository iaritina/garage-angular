import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SnackBarComponent } from 'src/app/components/snackbar/snack-bar/snack-bar.component';
import { MaterialModule } from 'src/app/material.module';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { Token } from 'src/app/utils/token';

@Component({
  selector: 'app-task',
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
          MaterialModule
          
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit{
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  data: any[] = [];
  displayedColumns = ['marque', 'modele','service'];
  paginatedData = new MatTableDataSource();

  private _token = inject(Token);
  private TOKEN = localStorage.getItem('token');

  constructor(
    private appointmentService: AppointmentService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getTask();
  }

  onPageChange(event: any): void {
    const startindex = event.pageIndex * event.pageSize;
    const paginatedData = this.data.slice(startindex, startindex + event.pageSize);
    this.paginatedData.data = paginatedData;
  }

  getTask(): void {
    const mechanicId = this._token.getUserFromToken(this.TOKEN);
    this.appointmentService.getAppointmentMechanic(mechanicId).subscribe({
      next: (appointment) => {
        console.log("list",appointment);
        this.data = appointment;
        this.paginatedData.data = this.data;
        this.paginatedData.paginator = this.paginator;
      },
      error: (err) => console.error("Erreur lors de la recuperation des donnees",err)
    });
  }

  completeTask(task: any) {
    this.appointmentService.completeTask(task._id).subscribe(() => {
      this.getTask();
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: { message: "Tache terminer avec succès ✅", type: 'success' },
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-bg'],
      });
    });
  }
}
