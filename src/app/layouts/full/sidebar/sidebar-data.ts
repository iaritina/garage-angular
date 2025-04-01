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
    displayName: 'Suivi des taches',
    iconName: 'hammer',
    route: '/tracking',
    roles: ['manager'],
  },
  {
    displayName: 'Mes reservations',
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
    roles: ['manager', 'mecanicien'],
  },
  {
    displayName: 'Mecaniciens',
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
    roles: ['manager', 'mecanicien'],
  },
  {
    displayName: 'Services',
    iconName: 'hammer',
    route: '/services',
    roles: ['manager'],
  },
  {
    displayName: 'Mes taches',
    iconName: 'list-check',
    route: '/task',
  },
];
