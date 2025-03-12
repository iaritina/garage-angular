import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Component,OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
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
import { MechanicFormComponent } from './mechanic-form/mechanic-form.component';

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
    public dialog: MatDialog
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns1: string[] = ['firstname', 'lastname', 'specialities', 'actions'];
  dataSource1: MatTableDataSource<any> = new MatTableDataSource();


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

  openDialog(mechanic: any = null):void {
    const dialogRef = this.dialog.open(MechanicFormComponent, {
      width: '600px',
      data: { mechanicData: mechanic }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if(mechanic) {
          this.updateMechanic(mechanic._id, result);
        }
        else {
          this.saveMechanic(result);
        }
      }
    })
  }


  saveMechanic(mechanic: any) {
    this.userService.createUser(mechanic).subscribe(() => {
      this.getAllMechanics();
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: { message: "Mecanicien ajoute avec succès ✅", type: 'success' },
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-bg'],
      });
    });
  }

  updateMechanic(id: string, mechanicData: any) {
    this.userService.updateUser(id, mechanicData).subscribe(() => {
      this.getAllMechanics();
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: { message: "Mecanicien mis à jour avec succès ✅", type: 'success' },
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-bg'],
      });
    })
  }

}
