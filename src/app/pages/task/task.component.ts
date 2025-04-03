import { Component, inject, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { SnackBarComponent } from 'src/app/components/snackbar/snack-bar/snack-bar.component';
import { Token } from 'src/app/utils/token';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialModule } from 'src/app/material.module';
import { MileageService } from 'src/app/services/mileage/mileage.service';

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
    CommonModule,
    MatMenuModule,
    MaterialModule,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('taskKilometerDialog') taskKilometerDialog: TemplateRef<any>;  // 🔹 Référence au ng-template

  data: any[] = [];
  displayedColumns = ['marque', 'modele', 'service', 'actions'];
  paginatedData = new MatTableDataSource();

  kilometerForm: FormGroup;
  dialogRef: MatDialogRef<any>;

  private _token = inject(Token);
  private TOKEN = localStorage.getItem('token');

  constructor(
    private appointmentService: AppointmentService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,  
    private fb: FormBuilder,
    private mileageService: MileageService
  ) {
    this.kilometerForm = this.fb.group({
      kilometrage: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.getTask();
  }

  onPageChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const paginatedData = this.data.slice(startIndex, startIndex + event.pageSize);
    this.paginatedData.data = paginatedData;
  }

  getTask(): void {
    const mechanicId = this._token.getUserFromToken(this.TOKEN);
    this.appointmentService.getAppointmentMechanic(mechanicId).subscribe({
      next: (appointment) => {
        console.log("Liste des rendez-vous :", appointment);
        this.data = appointment;
        this.paginatedData.data = this.data;
        this.paginatedData.paginator = this.paginator;
      },
      error: (err) => console.error("Erreur lors de la récupération des données", err)
    });
  }

  completeTask(task: any) {
    this.kilometerForm.reset();
  
    this.dialogRef = this.dialog.open(this.taskKilometerDialog, {
      width: '400px'
    });
  
    this.dialogRef.afterClosed().subscribe(result => {
      if (result && result.kilometrage !== undefined) {
        const kilometers = result.kilometrage;

        console.log('task',task);
        const services = task.prestations.map((prestation: any) => prestation.service._id); 

        this.appointmentService.completeTask(task._id).subscribe(() => {
          this.mileageService.create(task._id, task.vehicle._id,services,kilometers). subscribe({
            next:() => {
              this.getTask();
              this.snackBar.openFromComponent(SnackBarComponent, {
                data: { message: "Tâche terminée avec succès ✅", type: 'success' },
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: ['snackbar-bg'],
              });
            },
            error:(err) => console.error("Erreur lors de l'insertion des donnees",err)
          });
          
        });
      }
    });
  }
  
  submitKilometrage(): void {
    if (this.kilometerForm.valid) {
      // Fermer le pop-up et envoyer les données au `afterClosed`
      this.dialogRef.close({ kilometrage: this.kilometerForm.value.kilometrage });
    }
  }
  
}
