import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Component,OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SnackBarComponent } from 'src/app/components/snackbar/snack-bar/snack-bar.component';
import { MaterialModule } from 'src/app/material.module';
import { ServiceService } from 'src/app/services/service/service.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-mechanic',
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,

  ],
  templateUrl: './mechanic.component.html',
  styleUrl: './mechanic.component.scss'
})
export class MechanicComponent implements OnInit {

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {}

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns1: string[] = ['firstname', 'lastname', 'specialities', 'actions'];
  dataSource1: MatTableDataSource<any> = new MatTableDataSource();

  isFormVisible: boolean = false;

  ngOnInit(): void {
    this.getAllMechanics();
  }

  ngAfterViewInit() {
    this.dataSource1.paginator = this.paginator;
  }

  getAllMechanics() {
    this.userService.getAllUser().subscribe({
      next: (users) => {
        this.dataSource1.data = users.filter((user) => user.role === 'mecanicien' && !user.isDeleted);
      },
      error: (err) => console.error('Erreur lors de la récupération des données', err)
    });
  }

  deleteUser(user: any) {
    this.userService.deleteUser(user._id).subscribe({
      next: () => {
        this.getAllMechanics();
        this.snackBar.openFromComponent(SnackBarComponent, {
          data: { message: 'Mécanicien supprimé avec succès ✅', type: 'success' },
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-bg']
        });
      },
      error: (err) => console.error('Erreur lors de la suppression de l\'utilisateur', err)
    });
  }


  openForm() {
    this.isFormVisible = true;
  }

  closeForm() {
    this.isFormVisible = false;
  }

  form = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    role: new FormControl('mecanicien', [Validators.required]),
  });

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
    this.userService.registerUser(this.form.value).subscribe(() =>{
      this.form.reset();
      this.getAllMechanics();
      this.isFormVisible = false;
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: {message: "Service creer avec success ✅", type: 'success'},
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-bg'],
      })
    })
  }
}
