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
  categories = [
    { value: 'luces', label: 'Control de Luces', icon: 'bulb' },
    { value: 'seguridad', label: 'Seguridad del Hogar', icon: 'shield-checkmark' },
    { value: 'clima', label: 'Clima y Temperatura', icon: 'thermometer' },
    { value: 'consumo', label: 'Medidores de Consumo', icon: 'flash' },
    { value: 'general', label: 'General', icon: 'hardware-chip' }
  ];
  
  deviceTypes = [
    { value: 'smart-light', label: 'Luz Inteligente', category: 'luces', icon: 'bulb' },
    { value: 'camera', label: 'Cámara', category: 'seguridad', icon: 'videocam' },
    { value: 'motion-sensor', label: 'Sensor de Movimiento', category: 'seguridad', icon: 'radio-button-on' },
    { value: 'alarm', label: 'Alarma', category: 'seguridad', icon: 'warning' },
    { value: 'door-sensor', label: 'Sensor de Puerta', category: 'seguridad', icon: 'lock-closed' },
    { value: 'thermostat', label: 'Termostato', category: 'clima', icon: 'thermometer' },
    { value: 'temperature-sensor', label: 'Sensor de Temperatura', category: 'clima', icon: 'thermometer-outline' },
    { value: 'ac', label: 'Aire Acondicionado', category: 'clima', icon: 'snow' },
    { value: 'fan', label: 'Ventilador', category: 'clima', icon: 'leaf' },
    { value: 'water-meter', label: 'Medidor de Agua Potable', category: 'consumo', icon: 'water' },
    { value: 'electricity-meter', label: 'Medidor de Electricidad', category: 'consumo', icon: 'flash' },
    { value: 'hub', label: 'Hub Central', category: 'general', icon: 'hardware-chip' }
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
      category: ['', [Validators.required]],
      type: ['', [Validators.required]],
      location: ['']
    });

    // Actualizar tipo cuando cambia la categoría
    this.dispositivoForm.get('category')?.valueChanges.subscribe(category => {
      const typesForCategory = this.deviceTypes.filter(t => t.category === category);
      if (typesForCategory.length > 0) {
        this.dispositivoForm.patchValue({ type: typesForCategory[0].value });
      }
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

      const selectedType = this.deviceTypes.find(t => t.value === this.dispositivoForm.value.type);
      const device: Device = {
        id: '',
        name: this.dispositivoForm.value.name,
        type: this.dispositivoForm.value.type,
        category: this.dispositivoForm.value.category,
        status: 'connected',
        location: this.dispositivoForm.value.location,
        icon: selectedType?.icon || 'cube',
        value: this.getDefaultValue(this.dispositivoForm.value.type)
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

  getDeviceTypesForCategory(category: string) {
    return this.deviceTypes.filter(t => t.category === category);
  }

  getDefaultValue(type: string): any {
    const defaults: { [key: string]: any } = {
      'smart-light': { on: false, brightness: 0 },
      'camera': { recording: false },
      'motion-sensor': { active: false },
      'alarm': { armed: false },
      'door-sensor': { closed: true },
      'thermostat': { temperature: 22, humidity: 45 },
      'temperature-sensor': { temperature: 20 },
      'ac': { on: false, mode: 'cool', temperature: 24 },
      'fan': { on: false, speed: 1 },
      'water-meter': { currentConsumption: 0, unit: 'litros' },
      'electricity-meter': { currentConsumption: 0, unit: 'kWh' }
    };
    return defaults[type] || {};
  }
}

