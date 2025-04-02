import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './side-login/side-login.component';
import { AppSideRegisterComponent } from './side-register/side-register.component';
import { RegisterClientVehicleComponent } from './register-client-vehicle/register-client-vehicle.component';
import { AppSamplePageComponent } from '../extra/sample-page/sample-page.component';
import { NotfoundComponent } from 'src/app/components/404/notfound/notfound.component';
import { SideLoginManagerComponent } from './side-login-manager/side-login-manager.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
        data: { title: 'Connexion' },
      },
      {
        path: 'login-manager',
        component: SideLoginManagerComponent,
        data: { title: 'Espace privée' },
      },
      {
        path: 'register',
        component: AppSideRegisterComponent,
        data: { title: 'Inscription' },
      },
      {
        path: 'register-your-vehicle',
        component: RegisterClientVehicleComponent,
        data: { title: 'Enregistrez votre voiture' },
      },
      {
        path: 'unauthorized',
        component: AppSamplePageComponent,
        data: { title: 'Non autorisé' },
      },
      {
        path: '404',
        component: NotfoundComponent,
        data: { title: 'Page non-existante' },
      },
    ],
  },
];
