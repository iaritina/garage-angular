import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-sample-page',
  imports: [MaterialModule],
  templateUrl: './sample-page.component.html',
  styleUrls: ['./style.scss'],
})
export class AppSamplePageComponent {}
