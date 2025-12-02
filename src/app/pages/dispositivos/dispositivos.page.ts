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
  dispositivosPorCategoria: { [key: string]: Device[] } = {};
  categories: string[] = ['luces', 'seguridad', 'clima', 'consumo', 'general'];

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
      this.organizeByCategory();
    });
  }

  organizeByCategory() {
    this.dispositivosPorCategoria = {
      luces: [],
      seguridad: [],
      clima: [],
      consumo: [],
      general: []
    };
    
    this.dispositivos.forEach(device => {
      if (this.dispositivosPorCategoria[device.category]) {
        this.dispositivosPorCategoria[device.category].push(device);
      }
    });
  }

  getCategoryName(category: string): string {
    const names: { [key: string]: string } = {
      'luces': 'Control de Luces',
      'seguridad': 'Seguridad del Hogar',
      'clima': 'Clima y Temperatura',
      'consumo': 'Medidores de Consumo',
      'general': 'Dispositivos Generales'
    };
    return names[category] || category;
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'luces': 'bulb',
      'seguridad': 'shield-checkmark',
      'clima': 'thermometer',
      'consumo': 'flash',
      'general': 'hardware-chip'
    };
    return icons[category] || 'cube';
  }

  goToCategory(category: string) {
    const routes: { [key: string]: string } = {
      'luces': '/control-luces',
      'seguridad': '/seguridad',
      'clima': '/clima',
      'consumo': '/metricas',
      'general': '/dispositivos'
    };
    if (routes[category]) {
      this.router.navigate([routes[category]]);
    }
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

