import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { MileageService } from 'src/app/services/mileage/mileage.service';

@Component({
  selector: 'app-clients-history',
  imports: [],
  templateUrl: './clients-history.component.html',
  styleUrl: './clients-history.component.scss',
  providers: [DatePipe]
})
export class ClientsHistoryComponent implements OnInit{

  currentDate: Date = new Date();

  appointments: any[] = [];
  selectedAppointment: any = null;

  mileage: any = null;

  showModal: boolean = false;

  mechanics: any[] = [];
  selectedMechanics: string[] = [];

  weekdayNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  weeks: any[] = [];


  constructor(
    private appointmentService:AppointmentService,
    private mileageService: MileageService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.findClientAppointmentHistory();
    this.generateWeeks();
  }

  findClientAppointmentHistory() {
    this.appointmentService.getClientAppointment().subscribe({
      next: (data) => {
        this.appointments = data;
        this.extractMechanics();
      },
      error: (err) => console.error("Erreur lors de la recuperation des donnees",err),
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
    console.log("test",Array.from(mechanicMap.values()))
    this.mechanics = Array.from(mechanicMap.values());
    this.selectedMechanics = this.mechanics.map(m => m._id);
  }

  getMechanicColor(mechanicId: string): string {
    const mechanic = this.mechanics.find(m => m._id === mechanicId);
    return mechanic ? mechanic.color : '#ccc';
  }

  getRandomColor(): string {
    const colors = ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f', '#edc948', '#b07aa1'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  generateWeeks() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
  

    const firstDay = new Date(Date.UTC(year, month, 1));
    const lastDay = new Date(Date.UTC(year, month + 1, 0));
  

    let startDate = new Date(firstDay);
    if (startDate.getUTCDay() === 0) { 
      startDate.setUTCDate(startDate.getUTCDate() - 6);
    } else {
      startDate.setUTCDate(startDate.getUTCDate() - (startDate.getUTCDay() - 1));
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
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
      }
      this.weeks.push(week);
    }
  }

  getFormattedDate(date: Date): string {
    return this.datePipe.transform(date, 'EEEE dd MMMM yyyy') || '';
  }

  openAppointmentDetails(appointment: any, event?: MouseEvent) {
    if (event) event.stopPropagation();
    this.selectedAppointment = appointment;
    this.getMileageByAppointment(this.selectedAppointment._id);
    this.showModal = true;
    console.log('Selected appointment:', appointment); 
  }


  getMileageByAppointment(appointment: any) {
    this.mileageService.getMileageByAppointment(appointment).subscribe({
      next: (data) => {
        this.mileage = data;
      },
      error: (err) => console.error("Erreur lors de la recuperation du kilometrage",err),
    })
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

  closeModal() {
    this.showModal = false;
  }

}
