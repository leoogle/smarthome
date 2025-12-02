import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ControlLucesPageRoutingModule } from './control-luces-routing.module';
import { ControlLucesPage } from './control-luces.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControlLucesPageRoutingModule
  ],
  declarations: [ControlLucesPage]
})
export class ControlLucesPageModule {}

