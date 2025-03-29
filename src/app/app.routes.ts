import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { BrandsModelsComponent } from './pages/brands-models/brands-models.component';
import { MechanicComponent } from './pages/mechanic/mechanic.component';
import { ServiceComponent } from './pages/service/service.component';
import { VehicleFormComponent } from './pages/vehicle/vehicle-form/vehicle-form.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';
import { MakeAppointmentComponent } from './pages/make-appointment/make-appointment.component';
import { ProductComponent } from './pages/product/product.component';
import { MonitoringComponent } from './pages/monitoring/monitoring.component';
import { TaskComponent } from './pages/task/task.component';
import { ClientsAppointmentComponent } from './pages/clients-appointment/clients-appointment.component';
import { StatisicsComponent } from './pages/statisics/statisics.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'tracking',
        component: MonitoringComponent,
        canActivate: [AuthGuard],
        data: { roles: ['manager'] },
      },
      {
        path: 'statistics',
        component: StatisicsComponent,
        canActivate: [AuthGuard],
        data: { roles: ['mecanicien'] },
      },
      {
        path: 'my-appointments',
        component: ClientsAppointmentComponent,
        canActivate: [AuthGuard],
        data: { roles: ['client'] },
      },
      {
        path: 'vehicles',
        component: VehicleComponent,
        canActivate: [AuthGuard],
        data: { roles: ['manager', 'mecanicien'] },
      },
      {
        path: 'make-appointment',
        component: MakeAppointmentComponent,
        canActivate: [AuthGuard],
        data: { roles: ['client'] },
      },
      {
        path: 'add-vehicle',
        component: VehicleFormComponent,
        canActivate: [AuthGuard],
        data: { roles: ['manager', 'mecanicien'] },
      },
      {
        path: 'task',
        component: TaskComponent,
        canActivate: [AuthGuard],
        data: { roles: ['mecanicien'] },
      },
      // {
      //   path: 'appointments',
      //   component: AppointmentListComponent,
      //   canActivate: [AuthGuard],
      // },
      {
        path: 'products',
        component: ProductComponent,
        canActivate: [AuthGuard],
        data: { roles: ['manager', 'mecanicien'] },
      },
      {
        path: 'services',
        component: ServiceComponent,
        canActivate: [AuthGuard],
        data: { roles: ['manager'] },
      },
      {
        path: 'brands-models',
        component: BrandsModelsComponent,
        canActivate: [AuthGuard],
        data: { roles: ['manager', 'mecanicien'] },
      },
      {
        path: 'mechanic',
        component: MechanicComponent,
        canActivate: [AuthGuard],
        data: { roles: ['manager'] },
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
        canActivate: [AuthGuard], // Protéger cette route avec AuthGuard
        data: { roles: ['manager'] },
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
        canActivate: [AuthGuard], // Protéger cette route avec AuthGuard
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  // Redirection si l'URL ne correspond à aucune route
  { path: '**', redirectTo: '/authentication/login' },
];
