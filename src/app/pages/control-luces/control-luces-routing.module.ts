import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControlLucesPage } from './control-luces.page';

const routes: Routes = [
  {
    path: '',
    component: ControlLucesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlLucesPageRoutingModule {}

