import { SnackBarComponent } from 'src/app/components/snackbar/snack-bar/snack-bar.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { ServiceService } from 'src/app/services/service/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';

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
        ReactiveFormsModule,
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns1: string[] = ['name', 'price', 'duration', 'actions'];
  dataSource1: MatTableDataSource<any> = new MatTableDataSource();

  isFormVisible:boolean = false;

  constructor(
    private service: ServiceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllService();
  }

  ngAfterViewInit() {
    this.dataSource1.paginator = this.paginator;
  }

  form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required, Validators.email]),
    });

  getAllService() {
    this.service.getAllService().subscribe({
      next: (data) => {
        this.dataSource1.data = data;
      },
      error: (err) => console.error("Erreur lors de la récupération des données", err)
    });
  }

  deleteService(service: any) {
    this.service.delete(service._id).subscribe({
      next: () => {
        this.getAllService();
      },
      error: (err) => console.error('Erreur lor de la suppression du service',err)
    });
  }

  openForm() {
    this.isFormVisible = true;
  }

  closeForm() {
    this.isFormVisible = false;
  }

  isFieldValid(field: string) {
    const formControl = this.form.get(field);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) {
      return 'Ce champ est requis';
    }
    return '';
  }

  submit(event: Event) {
    event.preventDefault();

    this.service.createNewService(this.form.value).subscribe(() =>{
      this.form.reset();
      this.getAllService();
      this.isFormVisible = false;
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: {message: "Service creer avec success ✅", type: 'success'},
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-bg'],
      })
    });

  }



}
