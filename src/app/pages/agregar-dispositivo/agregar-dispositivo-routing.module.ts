import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarDispositivoPage } from './agregar-dispositivo.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarDispositivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarDispositivoPageRoutingModule {}

