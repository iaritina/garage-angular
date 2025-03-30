import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  NgApexchartsModule,
  ApexStroke,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexResponsive,
} from 'ng-apexcharts';
import { BrandsStatService } from 'src/app/services/statistics/brand/brands-stat.service';

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  colors: string[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  responsive: ApexResponsive;
}

@Component({
  selector: 'app-brands-appointment',
  imports: [
    NgApexchartsModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './brands-appointment.component.html',
  styleUrl: './brands-appointment.component.scss',
})
export class BrandsAppointmentComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  public years: number[] = [];
  public selectedYear: number | null = null;

  ngOnInit(): void {
    this.initializeYears();
    this.loadBrandsStats();
  }

  private brandsStatService = inject(BrandsStatService);

  private loadBrandsStats(year: number | null = null): void {
    this.brandsStatService.getBrandsStat(year).subscribe((data: any[]) => {
      const categories = data.map((item) => item.name);
      const seriesData = data.map((item) => item.appointmentCount);

      // Configurer les options du graphique
      this.chartOptions = {
        series: [
          {
            name: 'Nombre de rendez-vous',
            data: seriesData,
          },
        ],
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            barHeight: '100%',
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: 'bottom',
            },
          },
        },
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            colors: ['#000'],
          },
          formatter: function (val: any, opt: any) {
            return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val;
          },
          offsetX: 0,
          dropShadow: {
            enabled: false,
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff'],
        },
        xaxis: {
          categories: categories,
          tickAmount: categories.length,
          labels: {
            formatter: function (value: number) {
              return Math.floor(value); // Arrondit vers le bas pour éviter les décimales
            },
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
        },

        tooltip: {
          theme: 'dark',
          x: {
            show: false,
          },
          y: {
            title: {
              formatter: function () {
                return '';
              },
            },
          },
        },
      };
    });
  }

  public onYearChange(year: number): void {
    this.selectedYear = year; // Mettre à jour l'année sélectionnée
    this.loadBrandsStats(year); // Recharger les données pour l'année sélectionnée
  }

  private initializeYears(): void {
    const currentYear = new Date().getFullYear(); // Année en cours
    for (let i = 0; i < 10; i++) {
      this.years.push(currentYear - i); // Ajouter les 10 dernières années
    }
  }
}
