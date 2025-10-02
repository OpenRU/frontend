import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent),
  },
  {
    path: 'register',
    title: 'Register',
    loadComponent: () => import('./pages/register/register.component').then(c => c.RegisterComponent),
  },
  {
    path: 'home',
    title: 'Home',
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),
  },
  {
    path: 'create-menu',
    title: 'Cadastrar cardápio',
    loadComponent: () => import('./pages/create-menu/create-menu.component').then(c => c.CreateMenuComponent),
  },
  {
    path: 'create-items',
    title: 'Cadastrar item',
    loadComponent: () => import('./pages/create-items/create-items.component').then(c => c.CreateItemsComponent),
  },
];
