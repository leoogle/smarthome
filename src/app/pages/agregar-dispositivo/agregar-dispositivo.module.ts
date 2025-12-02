import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgregarDispositivoPageRoutingModule } from './agregar-dispositivo-routing.module';
import { AgregarDispositivoPage } from './agregar-dispositivo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AgregarDispositivoPageRoutingModule
  ],
  declarations: [AgregarDispositivoPage]
})
export class AgregarDispositivoPageModule {}

