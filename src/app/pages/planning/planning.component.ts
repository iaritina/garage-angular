import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
  providers: [DatePipe]
})
export class PlanningComponent implements OnInit {
  appointments: any[] = [];
  currentDate: Date = new Date();
  weeks: any[] = [];
  selectedAppointment: any = null;
  showModal: boolean = false;
  mechanics: any[] = [];
  selectedMechanics: string[] = [];
  weekdayNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  constructor(
    private appointmentService: AppointmentService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.findAllAppointments();
    this.generateWeeks();
  }

  findAllAppointments() {
    this.appointmentService.findAll().subscribe({
      next: (data) => {
        this.appointments = data;
        this.extractMechanics();
      },
      error: (err) => console.error("Erreur lors de la récupération des rendez-vous", err)
    });
  }

  extractMechanics() {
    const mechanicMap = new Map<string, any>();
    this.appointments.forEach(appointment => {
      if (appointment.mechanic && !mechanicMap.has(appointment.mechanic._id)) {
        mechanicMap.set(appointment.mechanic._id, {
          ...appointment.mechanic,
          color: this.getRandomColor()
        });
      }
    });
    this.mechanics = Array.from(mechanicMap.values());
    this.selectedMechanics = this.mechanics.map(m => m._id);
  }

  generateWeeks() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Ajuster pour commencer par Lundi
    let startDate = new Date(firstDay);
    if (startDate.getDay() === 0) { // Dimanche
      startDate.setDate(startDate.getDate() - 6);
    } else {
      startDate.setDate(startDate.getDate() - (startDate.getDay() - 1));
    }
    
    this.weeks = [];
    let currentDate = new Date(startDate);
    
    while (currentDate <= lastDay || this.weeks.length < 6) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push({
          date: new Date(currentDate),
          isCurrentMonth: currentDate.getMonth() === month
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      this.weeks.push(week);
    }
  }

  get currentMonthLabel(): string {
    return this.datePipe.transform(this.currentDate, 'MMMM yyyy') || '';
  }

  previousMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateWeeks();
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateWeeks();
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  }

  hasAppointment(date: Date): boolean {
    return this.getAppointments(date).length > 0;
  }

  getAppointments(date: Date): any[] {
    const dateStr = date.toISOString().split('T')[0];
    return this.appointments.filter(appt => {
      const apptDate = new Date(appt.date).toISOString().split('T')[0];
      return apptDate === dateStr && 
             (this.selectedMechanics.length === 0 || 
              this.selectedMechanics.includes(appt.mechanic._id));
    });
  }

  isMechanicSelected(mechanicId: string): boolean {
    return this.selectedMechanics.includes(mechanicId);
  }

  toggleMechanic(mechanicId: string) {
    if (this.isMechanicSelected(mechanicId)) {
      this.selectedMechanics = this.selectedMechanics.filter(id => id !== mechanicId);
    } else {
      this.selectedMechanics = [...this.selectedMechanics, mechanicId];
    }
  }

  getMechanicColor(mechanicId: string): string {
    const mechanic = this.mechanics.find(m => m._id === mechanicId);
    return mechanic ? mechanic.color : '#ccc';
  }

  getRandomColor(): string {
    const colors = ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f', '#edc948', '#b07aa1'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

// Ajoutez cette méthode pour formater la date
getFormattedDate(date: Date): string {
  return this.datePipe.transform(date, 'EEEE dd MMMM yyyy') || '';
}

// Modifiez la méthode d'ouverture de la modale
openAppointmentDetails(appointment: any, event?: MouseEvent) {
  if (event) event.stopPropagation();
  this.selectedAppointment = appointment;
  this.showModal = true;
  console.log('Selected appointment:', appointment); // Pour débogage
}

  closeModal() {
    this.showModal = false;
  }

  calculateTotal(prestations: any[]): number {
    return prestations.reduce((total, prestation) => {
      return total + parseFloat(prestation.price.$numberDecimal);
    }, 0);
  }
}