import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './side-login/side-login.component';
import { AppSideRegisterComponent } from './side-register/side-register.component';
import { RegisterClientVehicleComponent } from './register-client-vehicle/register-client-vehicle.component';
import { AppSamplePageComponent } from '../extra/sample-page/sample-page.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
      },
      {
        path: 'register',
        component: AppSideRegisterComponent,
      },
      {
        path: 'register-your-vehicle',
        component: RegisterClientVehicleComponent,
      },
      {
        path: 'unauthorized',
        component: AppSamplePageComponent,
      },
    ],
  },
];
