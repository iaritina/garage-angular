import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-grid-add',
    route: '/dashboard',
  },
  {
    displayName: 'Suivi des taches',
    iconName: 'hammer',
    route: '/tracking',
  },

  {
    navCap: 'Navigations',
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
  },
  {
    displayName: 'Vehicules',
    iconName: 'car',
    route: '/vehicles',
  },
  {
    displayName: 'Mecaniciens',
    iconName: 'users',
    route: '/mechanic',
  },
  {
    displayName: 'Marques',
    iconName: 'brand-volkswagen',
    route: '/brands-models',
  },
  {
    displayName: 'Produits',
    iconName: 'car-turbine',
    route: '/products',
  },
  {
    displayName: 'Services',
    iconName: 'hammer',
    route: '/services',
  },
  // {
  //   displayName: 'Badge',
  //   iconName: 'archive',
  //   route: '/ui-components/badge',
  // },
  // {
  //   displayName: 'Chips',
  //   iconName: 'info-circle',
  //   route: '/ui-components/chips',
  // },
  // {
  //   displayName: 'Lists',
  //   iconName: 'list-details',
  //   route: '/ui-components/lists',
  // },
  // {
  //   displayName: 'Menu',
  //   iconName: 'file-text',
  //   route: '/ui-components/menu',
  // },
  // {
  //   displayName: 'Tooltips',
  //   iconName: 'file-text-ai',
  //   route: '/ui-components/tooltips',
  // },
  // {
  //   displayName: 'Forms',
  //   iconName: 'clipboard-text',
  //   route: '/ui-components/forms',
  // },
  // {
  //   displayName: 'Tables',
  //   iconName: 'table',
  //   route: '/ui-components/tables',
  // },

  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'login',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
  },
];
