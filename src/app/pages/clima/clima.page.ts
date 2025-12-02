import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceService, Device } from '../../services/device.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.page.html',
  styleUrls: ['./clima.page.scss'],
})
export class ClimaPage implements OnInit {
  dispositivos: Device[] = [];

  constructor(
    private deviceService: DeviceService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
    
    this.deviceService.getDevicesByCategory('clima').subscribe(devices => {
      this.dispositivos = devices;
    });
  }

  toggleDevice(device: Device) {
    if (device.type === 'ac' || device.type === 'fan') {
      const newValue = {
        ...device.value,
        on: !device.value?.on
      };
      this.deviceService.updateDevice(device.id, { value: newValue }).subscribe();
    }
  }

  adjustTemperature(device: Device, event: any) {
    if (device.type === 'thermostat' || device.type === 'ac') {
      const temperature = event.detail.value;
      const newValue = {
        ...device.value,
        temperature: temperature
      };
      this.deviceService.updateDevice(device.id, { value: newValue }).subscribe();
    }
  }

  adjustFanSpeed(device: Device, event: any) {
    if (device.type === 'fan') {
      const speed = event.detail.value;
      const newValue = {
        ...device.value,
        speed: speed
      };
      this.deviceService.updateDevice(device.id, { value: newValue }).subscribe();
    }
  }
}

