import {
  Component,
  ViewEncapsulation,
  ViewChild,
  OnInit,
  inject,
} from '@angular/core';

import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexResponsive,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';
import { BrandsCountStatService } from 'src/app/services/statistics/brand/brands-count-stat.service';

export interface yearlyChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}
@Component({
  selector: 'app-brands-count',
  imports: [MaterialModule, NgApexchartsModule],
  templateUrl: './brands-count.component.html',
  styleUrl: './brands-count.component.scss',
})
export class BrandsCountComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public yearlyChart!: Partial<yearlyChart> | any;

  private brandsCountStatService = inject(BrandsCountStatService);

  ngOnInit(): void {
    this.loadBrandsCountStat();
  }

  loadBrandsCountStat() {
    this.brandsCountStatService.getBrandsCountStat().subscribe((data: any) => {
      const labels = data.map((item: any) => item._id);
      const series = data.map((item: any) => item.count);

      this.yearlyChart = {
        series: series,
        chart: {
          type: 'pie',
          width: 380,
        },
        labels: labels,
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            colors: ['#000'],
          },
          dropShadow: {
            enabled: false,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: 'bottom',
              },
              dataLabels: {
                style: {
                  fontSize: '13px',
                },
              },
            },
          },
        ],
      };
    });
  }
}
