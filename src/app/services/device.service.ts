import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Device {
  id: string;
  name: string;
  type: string;
  category: 'luces' | 'seguridad' | 'clima' | 'general' | 'consumo';
  status: 'connected' | 'disconnected';
  location?: string;
  icon: string;
  value?: any; // Para valores como temperatura, estado de luz, etc.
  powerConsumption?: number; // Consumo en kWh (para dispositivos eléctricos)
}

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private devicesSubject = new BehaviorSubject<Device[]>([]);
  public devices$ = this.devicesSubject.asObservable();

  constructor() {
    // Dispositivos de ejemplo por categoría
    const initialDevices: Device[] = [
      // Dispositivos de Luces
      {
        id: '1',
        name: 'Luz Principal Sala',
        type: 'smart-light',
        category: 'luces',
        status: 'connected',
        location: 'Sala',
        icon: 'bulb',
        value: { on: true, brightness: 80 }
      },
      {
        id: '2',
        name: 'Luz Cocina',
        type: 'smart-light',
        category: 'luces',
        status: 'connected',
        location: 'Cocina',
        icon: 'bulb',
        value: { on: false, brightness: 0 }
      },
      {
        id: '3',
        name: 'Luz Dormitorio',
        type: 'smart-light',
        category: 'luces',
        status: 'connected',
        location: 'Dormitorio',
        icon: 'bulb',
        value: { on: true, brightness: 50 }
      },
      {
        id: '4',
        name: 'Luz Exterior',
        type: 'smart-light',
        category: 'luces',
        status: 'connected',
        location: 'Exterior',
        icon: 'flashlight',
        value: { on: true, brightness: 100 }
      },
      // Dispositivos de Seguridad
      {
        id: '5',
        name: 'Cámara Principal',
        type: 'camera',
        category: 'seguridad',
        status: 'connected',
        location: 'Entrada',
        icon: 'videocam',
        value: { recording: true }
      },
      {
        id: '6',
        name: 'Sensor de Movimiento',
        type: 'motion-sensor',
        category: 'seguridad',
        status: 'connected',
        location: 'Sala',
        icon: 'radio-button-on',
        value: { active: false }
      },
      {
        id: '7',
        name: 'Alarma Principal',
        type: 'alarm',
        category: 'seguridad',
        status: 'connected',
        location: 'Central',
        icon: 'warning',
        value: { armed: true }
      },
      {
        id: '8',
        name: 'Sensor de Puerta',
        type: 'door-sensor',
        category: 'seguridad',
        status: 'connected',
        location: 'Puerta Principal',
        icon: 'lock-closed',
        value: { closed: true }
      },
      // Dispositivos de Clima
      {
        id: '9',
        name: 'Termostato Principal',
        type: 'thermostat',
        category: 'clima',
        status: 'connected',
        location: 'Sala',
        icon: 'thermometer',
        value: { temperature: 22, humidity: 45 }
      },
      {
        id: '10',
        name: 'Sensor Temperatura Dormitorio',
        type: 'temperature-sensor',
        category: 'clima',
        status: 'connected',
        location: 'Dormitorio',
        icon: 'thermometer-outline',
        value: { temperature: 20 }
      },
      {
        id: '11',
        name: 'Aire Acondicionado',
        type: 'ac',
        category: 'clima',
        status: 'connected',
        location: 'Sala',
        icon: 'snow',
        value: { on: false, mode: 'cool', temperature: 24 }
      },
      {
        id: '12',
        name: 'Ventilador',
        type: 'fan',
        category: 'clima',
        status: 'connected',
        location: 'Dormitorio',
        icon: 'leaf',
        value: { on: true, speed: 3 }
      },
      // Dispositivos Generales
      {
        id: '13',
        name: 'Dispositivo Residente',
        type: 'hub',
        category: 'general',
        status: 'connected',
        location: 'Central',
        icon: 'hardware-chip'
      },
      // Medidores de Consumo
      {
        id: '14',
        name: 'Medidor de Agua Potable',
        type: 'water-meter',
        category: 'consumo',
        status: 'connected',
        location: 'Principal',
        icon: 'water',
        value: { currentConsumption: 0, unit: 'litros' },
        powerConsumption: 0
      },
      {
        id: '15',
        name: 'Medidor de Electricidad',
        type: 'electricity-meter',
        category: 'consumo',
        status: 'connected',
        location: 'Principal',
        icon: 'flash',
        value: { currentConsumption: 0, unit: 'kWh' },
        powerConsumption: 0
      }
    ];
    this.devicesSubject.next(initialDevices);
  }

  getDevices(): Observable<Device[]> {
    return this.devices$;
  }

  getDevicesByCategory(category: string): Observable<Device[]> {
    return new Observable(observer => {
      this.devices$.subscribe(devices => {
        const filtered = devices.filter(d => d.category === category);
        observer.next(filtered);
      });
    });
  }

  addDevice(device: Device): Observable<boolean> {
    return new Observable(observer => {
      const currentDevices = this.devicesSubject.value;
      const newDevice: Device = {
        ...device,
        id: Date.now().toString()
      };
      this.devicesSubject.next([...currentDevices, newDevice]);
      observer.next(true);
      observer.complete();
    });
  }

  removeDevice(deviceId: string): Observable<boolean> {
    return new Observable(observer => {
      const currentDevices = this.devicesSubject.value;
      const filteredDevices = currentDevices.filter(d => d.id !== deviceId);
      this.devicesSubject.next(filteredDevices);
      observer.next(true);
      observer.complete();
    });
  }

  updateDevice(deviceId: string, updates: Partial<Device>): Observable<boolean> {
    return new Observable(observer => {
      const currentDevices = this.devicesSubject.value;
      const updatedDevices = currentDevices.map(d => 
        d.id === deviceId ? { ...d, ...updates } : d
      );
      this.devicesSubject.next(updatedDevices);
      observer.next(true);
      observer.complete();
    });
  }
}

