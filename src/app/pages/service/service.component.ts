import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { ServiceService } from 'src/app/services/service/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ServiceFormComponent } from './service-form/service-form.component';
import { SnackBarComponent } from 'src/app/components/snackbar/snack-bar/snack-bar.component';

@Component({
  selector: 'app-service',
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns1: string[] = ['name', 'price', 'duration', 'actions'];
  dataSource1: MatTableDataSource<any> = new MatTableDataSource();

  constructor(
    private service: ServiceService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllService();
  }

  ngAfterViewInit() {
    this.dataSource1.paginator = this.paginator;
  }

  getAllService() {
    this.service.getAllService().subscribe({
      next: (data) => {
        this.dataSource1.data = data;
      },
      error: (err) => console.error("Erreur lors de la récupération des données", err)
    });
  }

  deleteService(service: any) {
    this.service.deleteService(service._id).subscribe(() => {
      this.getAllService();
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: { message: "Service supprimer avec succès ✅", type: 'success' },
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-bg'],
      });
    });
  }

  openDialog(service: any = null): void {
    const dialogRef = this.dialog.open(ServiceFormComponent, {
      width: '400px',
      data: { ReserviceData: service }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (service) {
          this.updateService(service._id, result);
        } else {

          this.saveService(result);
        }
      }
    });
  }

  saveService(service: any) {
    this.service.createNewService(service).subscribe(() => {
      this.getAllService();
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: { message: "Service créé avec succès ✅", type: 'success' },
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-bg'],
      });
    });
  }


  updateService(id: string, serviceData: any) {
    this.service.updateService(id, serviceData).subscribe(() => {
      this.getAllService();
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: { message: "Service mis à jour avec succès ✅", type: 'success' },
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-bg'],
      });
    });
  }

}
