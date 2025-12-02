import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceService, Device } from '../../services/device.service';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dispositivos',
  templateUrl: './dispositivos.page.html',
  styleUrls: ['./dispositivos.page.scss'],
})
export class DispositivosPage implements OnInit {
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
    
    this.deviceService.getDevices().subscribe(devices => {
      this.dispositivos = devices;
    });
  }

  goToAddDevice() {
    this.router.navigate(['/agregar-dispositivo']);
  }

  async removeDevice(device: Device) {
    const alert = await this.alertController.create({
      header: 'Eliminar dispositivo',
      message: `¿Estás seguro de eliminar ${device.name}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.deviceService.removeDevice(device.id).subscribe();
          }
        }
      ]
    });

    await alert.present();
  }
}

