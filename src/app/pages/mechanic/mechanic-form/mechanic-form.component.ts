  import { CommonModule } from '@angular/common';
  import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
  import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
  import { MatButtonModule } from '@angular/material/button';
  import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatInputModule } from '@angular/material/input';
  import { MaterialModule } from 'src/app/material.module';
  import { MatChipInputEvent } from '@angular/material/chips';
  import { COMMA, ENTER } from '@angular/cdk/keycodes';
  import { ServiceService } from 'src/app/services/service/service.service';
  import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

  @Component({
    selector: 'app-mechanic-form',
    imports: [
      CommonModule,
      MaterialModule,
      ReactiveFormsModule,
      MatDialogModule,
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
    ],
    templateUrl: './mechanic-form.component.html',
    styleUrl: './mechanic-form.component.scss'
  })
  export class MechanicFormComponent implements OnChanges {
    @Input() mechanicData: any | null = null;
    @Output() save = new EventEmitter<any>();

    service: any[] = [];
    phones: string[] = [];
    specialities: any[] = [];

    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    addOnBlur = true;
    phoneError: string | null = null;

    form = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl<string[]>([]),
      specialities: new FormControl<string[]>([])
    });

    constructor(
      public dialogRef: MatDialogRef<MechanicFormComponent>,
      private serviceService: ServiceService,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      if (data?.mechanicData) {
        this.mechanicData = data.mechanicData;
        this.phones = this.mechanicData.phone|| [];
        this.specialities = this.mechanicData.specialities?.map((item: any) => item._id) || [];

        this.form.patchValue({
          firstname: this.mechanicData.firstname,
          lastname: this.mechanicData.lastname,
          email: this.mechanicData.email,
          phone: this.phones,
          specialities: this.specialities,
        });

      }
    }

    ngOnInit() {
      this.getAllService();
    }


    getAllService() {
      this.serviceService.getAllService().subscribe({
        next: (data) => {
          this.service = data
        },
        error: (err) => console.error("Erreur lors de la recuperation des services",err)
      });
    }

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['mechanicData'] && this.mechanicData) {
        this.phones = this.mechanicData.phone || [];
        this.specialities = this.mechanicData.specialities?.map((item: any) => item._id) || []; // Extraire les _id

        this.form.patchValue({
          firstname: this.mechanicData.firstname,
          lastname: this.mechanicData.lastname,
          email: this.mechanicData.email,
          phone: this.phones,
          specialities: this.specialities,
        });
      }
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    submit(event: Event) {
      event.preventDefault();
      if (this.form.valid) {
        this.form.patchValue({
          phone: this.phones,
          specialities: this.specialities
        });
        this.save.emit(this.form.value);
        this.dialogRef.close(this.form.value);
      }
    }

    addPhone(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();

      this.phoneError = this.validatePhoneNumber(value);

      if (!this.phoneError && value) {
        this.phones.push(value);
        this.form.get('phone')?.setValue(this.phones);
      }

      event.chipInput!.clear(); // Effacer le champ après validation
    }


    removePhone(phone: string): void {
      const index = this.phones.indexOf(phone);

      if (index >= 0) {
        this.phones.splice(index, 1);
        this.form.get('phone')?.setValue(this.phones); // Mettre à jour le champ phone du formulaire avec un tableau
      }
    }

    editPhone(phone: string, event: any): void {
      const value = event.value.trim();

      this.phoneError = this.validatePhoneNumber(value);

      if (!this.phoneError && value) {
        this.removePhone(phone);
        this.phones.push(value);
        this.form.get('phone')?.setValue(this.phones);
      }
    }

    validatePhoneNumber(phone: string): string | null {
      if (phone.startsWith('0')) {
        if (phone.length !== 10) {
          return 'Le numéro de téléphone doit contenir 10 chiffres.';
        }
        if (!/^0(32|33|34|37|38)\d{7}$/.test(phone)) {
          return 'Le numéro de téléphone doit commencer par 032, 033, 034, 037 ou 038.';
        }
      } else if (phone.startsWith('+261')) {
        if (phone.length !== 13) {
          return 'Le numéro de téléphone doit contenir 13 chiffres.';
        }
        if (!/^\+261(32|33|34|37|38)\d{7}$/.test(phone)) {
          return 'Le numéro de téléphone doit commencer par +261 suivi de 32, 33, 34, 37 ou 38.';
        }
      } else {
        return 'Le numéro de téléphone doit commencer par 0 ou +261.';
      }

      if (!/^\d+$/.test(phone.replace('+261', ''))) {
        return 'Le numéro de téléphone ne doit contenir que des chiffres.';
      }

      return null;
    }


    validateAndAddPhone(event: Event): void {
      const inputElement = event.target as HTMLInputElement;
      const value = inputElement.value.trim();

      this.phoneError = this.validatePhoneNumber(value);

      if (!this.phoneError && value && !this.phones.includes(value)) {
        this.phones.push(value);
        this.form.get('phone')?.setValue(this.phones);
        inputElement.value = ''; // Effacer l'input seulement si le numéro est valide
      }
    }


    addItem(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();

      if (value) {
        this.specialities.push(value);
      }
      event.chipInput!.clear();
    }

    removeItem(itemId: string): void {
      const index = this.specialities.indexOf(itemId);

      if (index >= 0) {
        this.specialities.splice(index, 1);
        this.form.get('specialities')?.setValue(this.specialities);
      }
    }

    onItemSelected(event: MatAutocompleteSelectedEvent): void {
      const selectedItem = event.option.value;
      const selectedId = selectedItem._id;

      if (selectedId && !this.specialities.includes(selectedId)) {
        this.specialities.push(selectedId);
        this.form.get('specialities')?.setValue(this.specialities);
      }
    }

    getSpecialityNameById(id: string): string {
      if (!this.service || this.service.length === 0) {
        return ''; // Retourner une chaîne vide si this.service n'est pas initialisé
      }
      const speciality = this.service.find(item => item._id === id);
      return speciality ? speciality.name : '';
    }
  }
