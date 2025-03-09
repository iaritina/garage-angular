import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './guards/auth.guard';
import { ServiceComponent } from './pages/service/service.component';
import { MechanicComponent } from './pages/mechanic/mechanic.component';
import { VehicleBrandComponent } from './pages/brands-models/vehicle-brand/vehicle-brand.component';
import { BrandsModelsComponent } from './pages/brands-models/brands-models.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'services',
        component: ServiceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'brands-models',
        component: BrandsModelsComponent,
      },
      {
        path: 'mechanic',
        component: MechanicComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
        canActivate: [AuthGuard], // Protéger cette route avec AuthGuard
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
