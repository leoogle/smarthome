import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MetricsService, DeviceConsumption } from '../../services/metrics.service';
import { DeviceService } from '../../services/device.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  userName: string = 'RESIDENTE LAS LOMAS';
  selectedOption: number = 1;
  
  // Métricas
  currentWater: number = 0;
  currentElectricity: number = 0;
  averageWater: number = 0;
  averageElectricity: number = 0;
  deviceConsumptions: DeviceConsumption[] = [];
  totalDevices: number = 0;
  connectedDevices: number = 0;

  servicios = [
    {
      id: 1,
      name: 'Dispositivos conectados',
      icon: 'star',
      route: '/dispositivos'
    },
    {
      id: 2,
      name: 'Control de Luces',
      icon: 'bulb',
      route: '/control-luces'
    },
    {
      id: 3,
      name: 'Seguridad del Hogar',
      icon: 'shield-checkmark',
      route: '/seguridad'
    },
    {
      id: 4,
      name: 'Clima y Temperatura',
      icon: 'thermometer',
      route: '/clima'
    },
    {
      id: 5,
      name: 'Configuración',
      icon: 'settings',
      route: '/perfil-usuario'
    }
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private metricsService: MetricsService,
    private deviceService: DeviceService,
    public menuController: MenuController
  ) {
    const user = this.authService.getCurrentUser();
    if (user && user.name) {
      this.userName = user.name.toUpperCase();
    }
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
    
    this.loadMetrics();
    this.loadDeviceStats();
  }

  loadMetrics() {
    // Consumo actual
    this.metricsService.getCurrentWaterConsumption().subscribe(water => {
      this.currentWater = Math.round(water * 100) / 100;
    });
    
    this.metricsService.getCurrentElectricityConsumption().subscribe(electricity => {
      this.currentElectricity = Math.round(electricity * 100) / 100;
    });
    
    // Promedio diario (últimos 7 días)
    this.metricsService.getAverageDailyConsumption(7).subscribe(avg => {
      this.averageWater = avg.water;
      this.averageElectricity = avg.electricity;
    });
    
    // Consumo por dispositivo
    this.deviceService.getDevices().subscribe(devices => {
      const deviceNames: { [key: string]: string } = {};
      devices.forEach(device => {
        deviceNames[device.id] = device.name;
      });
      
      this.metricsService.getTotalDeviceConsumption(7, deviceNames).subscribe(consumptions => {
        this.deviceConsumptions = consumptions;
      });
    });
  }

  loadDeviceStats() {
    this.deviceService.getDevices().subscribe(devices => {
      this.totalDevices = devices.length;
      this.connectedDevices = devices.filter(d => d.status === 'connected').length;
    });
  }

  goToMetrics() {
    this.router.navigate(['/metricas']);
  }

  selectOption(option: number) {
    this.selectedOption = option;
  }

  navigateToService(route: string) {
    this.router.navigate([route]);
  }

  openMenu() {
    this.menuController.open();
  }

  goToProfile() {
    this.router.navigate(['/perfil-usuario']);
  }

  goToDevices() {
    this.router.navigate(['/dispositivos']);
  }

  logout() {
    this.authService.logout();
  }
}

