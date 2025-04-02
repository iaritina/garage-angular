import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service/service.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-statistics',
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit{

  customerCount = 0;
  service: any;

  constructor(
    private userService: UserService,
    private serviceService: ServiceService,
  ) {}

  ngOnInit(): void {
    this.loadCustomerCount();
    this.loadMostRequestedService();
  }

  loadCustomerCount() {
    this.userService.getCustomerCount().subscribe({
      next: (data) => {
        this.customerCount = data
      },
      error: (err) => {
        console.error("Error fetching data",err.message);
      }
    });
  }

  loadMostRequestedService() {
    this.serviceService.getCountService().subscribe({
      next: (data) => {
        if (data && Object.keys(data).length > 0) {
          const mostRequestedService = Object.entries(data).reduce((a: any, b: any) => (b[1] > a[1] ? b : a));
          this.service = { name: mostRequestedService[0], count: mostRequestedService[1] };
        } else {
          this.service = null;
        }
      },
      error: (err) => {
        console.error("Error fetching data", err.message);
      }
    });
  }
  

}
