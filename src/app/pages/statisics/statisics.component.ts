import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-statisics',
  imports: [],
  templateUrl: './statisics.component.html',
  styleUrl: './statisics.component.scss'
})
export class StatisicsComponent implements OnInit{

  amountCommission = 0;
  repairedVehicle = 0;
  serviceRepaired = 0;

  constructor(
    private statisticsService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.getAmountOfCommission();
    this.countRepairedVehicle();
    this.countSerivceByMechanic();
  }

  getAmountOfCommission() {
    this.statisticsService.getAmountCommission().subscribe({
      next: (data) => {
        this.amountCommission = data;
      },
      error: (err) => console.error("Erreur lors de la recuperation des donnees",err)
    });
  }

  countRepairedVehicle() {
    this.statisticsService.countRepairedVehicle().subscribe({
      next: (data) => {
        this.repairedVehicle = data;
      },
      error: (err) => console.error("Erreur lors de la recuperation des donnees",err)
    });
  }

  countSerivceByMechanic() {
    this.statisticsService.countSerivceByMechanic().subscribe({
      next: (data) => {
        this.serviceRepaired = data;
      },
      error: (err) => console.error("Erreur lors de la recuperation des donnees",err)
    });
  }


}
