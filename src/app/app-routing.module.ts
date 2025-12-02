import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'cambio-password',
    loadChildren: () => import('./pages/cambio-password/cambio-password.module').then(m => m.CambioPasswordPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'perfil-usuario',
    loadChildren: () => import('./pages/perfil-usuario/perfil-usuario.module').then(m => m.PerfilUsuarioPageModule)
  },
  {
    path: 'dispositivos',
    loadChildren: () => import('./pages/dispositivos/dispositivos.module').then(m => m.DispositivosPageModule)
  },
  {
    path: 'agregar-dispositivo',
    loadChildren: () => import('./pages/agregar-dispositivo/agregar-dispositivo.module').then(m => m.AgregarDispositivoPageModule)
  },
  {
    path: 'control-luces',
    loadChildren: () => import('./pages/control-luces/control-luces.module').then(m => m.ControlLucesPageModule)
  },
  {
    path: 'seguridad',
    loadChildren: () => import('./pages/seguridad/seguridad.module').then(m => m.SeguridadPageModule)
  },
  {
    path: 'clima',
    loadChildren: () => import('./pages/clima/clima.module').then(m => m.ClimaPageModule)
  },
  {
    path: 'metricas',
    loadChildren: () => import('./pages/metricas/metricas.module').then(m => m.MetricasPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

