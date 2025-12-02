import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MetricasPageRoutingModule } from './metricas-routing.module';
import { MetricasPage } from './metricas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MetricasPageRoutingModule
  ],
  declarations: [MetricasPage]
})
export class MetricasPageModule {}

