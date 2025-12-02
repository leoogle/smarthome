import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceService, Device } from '../../services/device.service';
import { AuthService } from '../../services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-dispositivo',
  templateUrl: './agregar-dispositivo.page.html',
  styleUrls: ['./agregar-dispositivo.page.scss'],
})
export class AgregarDispositivoPage implements OnInit {
  dispositivoForm: FormGroup;
  deviceTypes = [
    { value: 'sensor', label: 'Sensor' },
    { value: 'actuador', label: 'Actuador' },
    { value: 'camera', label: 'Cámara' },
    { value: 'switch', label: 'Interruptor' },
    { value: 'thermostat', label: 'Termostato' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private deviceService: DeviceService,
    private router: Router,
    private authService: AuthService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.dispositivoForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      location: ['']
    });
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  async onAddDevice() {
    if (this.dispositivoForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Agregando dispositivo...'
      });
      await loading.present();

      const device: Device = {
        id: '',
        name: this.dispositivoForm.value.name,
        type: this.dispositivoForm.value.type,
        status: 'connected',
        location: this.dispositivoForm.value.location
      };

      this.deviceService.addDevice(device).subscribe({
        next: async (success) => {
          await loading.dismiss();
          if (success) {
            const toast = await this.toastController.create({
              message: 'Dispositivo agregado exitosamente',
              duration: 2000,
              color: 'success'
            });
            await toast.present();
            this.router.navigate(['/dispositivos']);
          }
        },
        error: async (error) => {
          await loading.dismiss();
          const toast = await this.toastController.create({
            message: 'Error al agregar dispositivo',
            duration: 2000,
            color: 'danger'
          });
          await toast.present();
        }
      });
    }
  }
}

