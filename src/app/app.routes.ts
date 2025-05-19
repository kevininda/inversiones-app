import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AlertasComponent } from './pages/alertas/alertas.component';
import { InversionesComponent } from './pages/inversiones/inversiones.component';

import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'alertas', component: AlertasComponent },
      { path: 'inversiones', component: InversionesComponent },
    ]
  },
  { path: '**', redirectTo: 'login' }
];

