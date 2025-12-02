import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Device {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected';
  location?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private devicesSubject = new BehaviorSubject<Device[]>([]);
  public devices$ = this.devicesSubject.asObservable();

  constructor() {
    // Dispositivos de ejemplo
    const initialDevices: Device[] = [
      {
        id: '1',
        name: 'Dispositivo residente',
        type: 'sensor',
        status: 'connected',
        location: 'Sala'
      }
    ];
    this.devicesSubject.next(initialDevices);
  }

  getDevices(): Observable<Device[]> {
    return this.devices$;
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
}

