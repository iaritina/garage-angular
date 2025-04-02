import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-statisics',
  templateUrl: './statisics.component.html',
  styleUrls: ['./statisics.component.scss']
})
export class StatisicsComponent implements OnInit {
  amountCommission = 0;
  repairedVehicle = 0;
  serviceRepaired: { [key: string]: number } = {};
  chart: any;

  constructor(private statisticsService: StatisticsService) {
    Chart.register(...registerables);
  }

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
      error: (err) => console.error("Erreur lors de la récupération des données", err)
    });
  }

  countRepairedVehicle() {
    this.statisticsService.countRepairedVehicle().subscribe({
      next: (data) => {
        this.repairedVehicle = data;
      },
      error: (err) => console.error("Erreur lors de la récupération des données", err)
    });
  }

  countSerivceByMechanic() {
    this.statisticsService.countSerivceByMechanic().subscribe({
      next: (data) => {
        this.serviceRepaired = data;
        this.createChart();
      },
      error: (err) => console.error("Erreur lors de la récupération des données", err)
    });
  }

  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }
  
    const ctx = document.getElementById('serviceChart') as HTMLCanvasElement;
    const labels = Object.keys(this.serviceRepaired);
    const data = Object.values(this.serviceRepaired);
  
    // Palette de couleurs variées
    const backgroundColors = [
      '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
      '#ec4899', '#14b8a6', '#f97316', '#64748b', '#84cc16'
    ];
  
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Nombre de réparations',
          data: data,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map(color => this.darkenColor(color, 20)),
          borderWidth: 2,
          borderRadius: 6, // Coins arrondis pour les barres
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#1e293b',
            titleColor: '#f8fafc',
            bodyColor: '#e2e8f0',
            padding: 12,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              label: function(context) {
                return ` ${context.parsed.y} réparation(s)`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: '#e2e8f0',
              drawTicks: false,
            },
            border: {
              dash: [4, 4],
            },
            title: {
              display: true,
              text: 'Nombre de réparations',
              color: '#64748b',
            },
            ticks: {
              stepSize: 1,
              color: '#64748b'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#64748b'
            },
            title: {
              display: true,
              text: 'Types de service',
              color: '#64748b'
            }
          }
        }
      }
    });
  }
  
  // Fonction pour assombrir les couleurs des bordures
  private darkenColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return `#${(
      0x1000000 +
      (R < 0 ? 0 : R) * 0x10000 +
      (G < 0 ? 0 : G) * 0x100 +
      (B < 0 ? 0 : B)
    ).toString(16).slice(1)}`;
  }
}