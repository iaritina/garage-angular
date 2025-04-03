import { INavItem } from '../full.component';
import { NavItem } from './nav-item/nav-item';

export const navItems: INavItem[] = [
  {
    navCap: 'Gestion & Suivi',
  },
  {
    displayName: 'Tableau de bord',
    iconName: 'layout-grid-add',
    route: '/stat',
    roles: ['manager'],
  },
  {
    displayName: 'Statistiques',
    iconName: 'chart-infographic',
    route: 'statistics',
    roles: ['mecanicien'],
  },
  {
    displayName: 'Planning de rendez-vous',
    iconName: 'calendar',
    route: '/planning',
    roles: ['manager'],
  },
  {
    displayName: 'Suivi des tâches',
    iconName: 'hammer',
    route: '/tracking',
    roles: ['manager'],
  },
  {
    displayName: 'Mes réservations',
    iconName: 'calendar-clock',
    route: '/my-appointments',
    roles: ['client'],
  },

  {
    navCap: 'Gestion',
  },
  // {
  //   displayName: 'Rendez-vous',
  //   iconName: 'calendar',
  //   route: '/appointments',
  // },
  {
    displayName: 'Réserver',
    iconName: 'clock',
    route: '/make-appointment',
    roles: ['client'],
  },
  {
    displayName: 'Vehicules',
    iconName: 'car',
    route: '/vehicles',
    roles: ['client'],
  },
  {
    displayName: 'Mécaniciens',
    iconName: 'users',
    route: '/mechanic',
    roles: ['manager'],
  },
  {
    displayName: 'Marques',
    iconName: 'brand-volkswagen',
    route: '/brands-models',
    roles: ['manager', 'mecanicien'],
  },
  {
    displayName: 'Produits',
    iconName: 'car-turbine',
    route: '/products',
    roles: ['manager'],
  },
  {
    displayName: 'Services',
    iconName: 'hammer',
    route: '/services',
    roles: ['manager'],
  },
  {
    displayName: 'Mes tâches',
    iconName: 'list-check',
    route: '/task',
    roles: ['mecanicien'],
  },
];
