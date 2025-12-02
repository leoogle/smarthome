import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetricsService, ConsumptionRecord, DeviceConsumption } from '../../services/metrics.service';
import { DeviceService } from '../../services/device.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-metricas',
  templateUrl: './metricas.page.html',
  styleUrls: ['./metricas.page.scss'],
})
export class MetricasPage implements OnInit {
  selectedPeriod: number = 7; // días
  consumptionHistory: ConsumptionRecord[] = [];
  deviceConsumptions: DeviceConsumption[] = [];
  currentWater: number = 0;
  currentElectricity: number = 0;
  averageWater: number = 0;
  averageElectricity: number = 0;
  totalWater: number = 0;
  totalElectricity: number = 0;

  periods = [
    { value: 7, label: '7 días' },
    { value: 15, label: '15 días' },
    { value: 30, label: '30 días' }
  ];

  constructor(
    private metricsService: MetricsService,
    private deviceService: DeviceService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
    
    this.loadMetrics();
  }

  onPeriodChange() {
    this.loadMetrics();
  }

  loadMetrics() {
    // Consumo actual
    this.metricsService.getCurrentWaterConsumption().subscribe(water => {
      this.currentWater = Math.round(water * 100) / 100;
    });
    
    this.metricsService.getCurrentElectricityConsumption().subscribe(electricity => {
      this.currentElectricity = Math.round(electricity * 100) / 100;
    });

    // Historial
    this.metricsService.getConsumptionHistory(this.selectedPeriod).subscribe(history => {
      this.consumptionHistory = history;
      
      // Calcular totales
      this.totalWater = Math.round(history.reduce((sum, r) => sum + r.water, 0) * 100) / 100;
      this.totalElectricity = Math.round(history.reduce((sum, r) => sum + r.electricity, 0) * 100) / 100;
    });

    // Promedios
    this.metricsService.getAverageDailyConsumption(this.selectedPeriod).subscribe(avg => {
      this.averageWater = avg.water;
      this.averageElectricity = avg.electricity;
    });

    // Consumo por dispositivo
    this.deviceService.getDevices().subscribe(devices => {
      const deviceNames: { [key: string]: string } = {};
      devices.forEach(device => {
        deviceNames[device.id] = device.name;
      });
      
      this.metricsService.getTotalDeviceConsumption(this.selectedPeriod, deviceNames).subscribe(consumptions => {
        this.deviceConsumptions = consumptions;
      });
    });
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
  }
}

