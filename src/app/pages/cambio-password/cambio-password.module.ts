import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CambioPasswordPageRoutingModule } from './cambio-password-routing.module';
import { CambioPasswordPage } from './cambio-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CambioPasswordPageRoutingModule
  ],
  declarations: [CambioPasswordPage]
})
export class CambioPasswordPageModule {}

