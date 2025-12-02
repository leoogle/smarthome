import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceService, Device } from '../../services/device.service';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-control-luces',
  templateUrl: './control-luces.page.html',
  styleUrls: ['./control-luces.page.scss'],
})
export class ControlLucesPage implements OnInit {
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
    
    this.deviceService.getDevicesByCategory('luces').subscribe(devices => {
      this.dispositivos = devices;
    });
  }

  toggleLight(device: Device) {
    const newValue = {
      ...device.value,
      on: !device.value?.on,
      brightness: device.value?.on ? 0 : 80
    };
    this.deviceService.updateDevice(device.id, { value: newValue }).subscribe();
  }

  async adjustBrightness(device: Device, event: any) {
    const brightness = event.detail.value;
    const newValue = {
      ...device.value,
      brightness: brightness,
      on: brightness > 0
    };
    this.deviceService.updateDevice(device.id, { value: newValue }).subscribe();
  }

  getBrightness(device: Device): number {
    return device.value?.brightness || 0;
  }
}

