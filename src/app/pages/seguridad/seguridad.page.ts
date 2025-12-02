import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceService, Device } from '../../services/device.service';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.page.html',
  styleUrls: ['./seguridad.page.scss'],
})
export class SeguridadPage implements OnInit {
  dispositivos: Device[] = [];

  constructor(
    private deviceService: DeviceService,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
    
    this.deviceService.getDevicesByCategory('seguridad').subscribe(devices => {
      this.dispositivos = devices;
    });
  }

  toggleDevice(device: Device) {
    let newValue: any = {};
    
    if (device.type === 'alarm') {
      newValue = { ...device.value, armed: !device.value?.armed };
    } else if (device.type === 'camera') {
      newValue = { ...device.value, recording: !device.value?.recording };
    } else if (device.type === 'motion-sensor') {
      newValue = { ...device.value, active: !device.value?.active };
    }
    
    this.deviceService.updateDevice(device.id, { value: newValue }).subscribe();
  }

  getStatusText(device: Device): string {
    if (device.type === 'alarm') {
      return device.value?.armed ? 'Activada' : 'Desactivada';
    } else if (device.type === 'camera') {
      return device.value?.recording ? 'Grabando' : 'Detenida';
    } else if (device.type === 'motion-sensor') {
      return device.value?.active ? 'Activo' : 'Inactivo';
    } else if (device.type === 'door-sensor') {
      return device.value?.closed ? 'Cerrada' : 'Abierta';
    }
    return 'Desconocido';
  }

  getStatusColor(device: Device): string {
    if (device.type === 'alarm' || device.type === 'camera') {
      return device.value?.armed || device.value?.recording ? 'success' : 'medium';
    } else if (device.type === 'motion-sensor') {
      return device.value?.active ? 'danger' : 'success';
    } else if (device.type === 'door-sensor') {
      return device.value?.closed ? 'success' : 'warning';
    }
    return 'medium';
  }
}

