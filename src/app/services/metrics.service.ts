import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export interface ConsumptionRecord {
  date: Date;
  water: number; // litros
  electricity: number; // kWh
  deviceConsumption: { [deviceId: string]: number }; // kWh por dispositivo
}

export interface DeviceConsumption {
  deviceId: string;
  deviceName: string;
  consumption: number; // kWh
  percentage: number; // porcentaje del total
}

@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  private consumptionHistorySubject = new BehaviorSubject<ConsumptionRecord[]>([]);
  public consumptionHistory$ = this.consumptionHistorySubject.asObservable();

  private waterMeterSubject = new BehaviorSubject<number>(0);
  public waterMeter$ = this.waterMeterSubject.asObservable();

  private electricityMeterSubject = new BehaviorSubject<number>(0);
  public electricityMeter$ = this.electricityMeterSubject.asObservable();

  constructor() {
    // Inicializar con datos históricos simulados
    this.initializeHistoricalData();
    // Simular actualización en tiempo real
    this.startRealTimeUpdates();
  }

  private initializeHistoricalData() {
    const history: ConsumptionRecord[] = [];
    const now = new Date();
    
    // Generar datos de los últimos 30 días
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Consumo de agua (variación diaria)
      const waterBase = 150 + Math.random() * 50; // 150-200 litros
      
      // Consumo de electricidad (variación diaria)
      const electricityBase = 15 + Math.random() * 10; // 15-25 kWh
      
      // Consumo por dispositivo (simulado)
      const deviceConsumption: { [key: string]: number } = {
        '1': (electricityBase * 0.15), // Luz Principal Sala
        '2': (electricityBase * 0.10), // Luz Cocina
        '3': (electricityBase * 0.12), // Luz Dormitorio
        '4': (electricityBase * 0.08), // Luz Exterior
        '5': (electricityBase * 0.20), // Cámara Principal
        '9': (electricityBase * 0.10), // Termostato
        '11': (electricityBase * 0.15), // Aire Acondicionado
        '12': (electricityBase * 0.10)  // Ventilador
      };
      
      history.push({
        date,
        water: Math.round(waterBase * 100) / 100,
        electricity: Math.round(electricityBase * 100) / 100,
        deviceConsumption
      });
    }
    
    this.consumptionHistorySubject.next(history);
    
    // Establecer valores actuales
    const today = history[history.length - 1];
    this.waterMeterSubject.next(today.water);
    this.electricityMeterSubject.next(today.electricity);
  }

  private startRealTimeUpdates() {
    // Simular actualización cada minuto (para demo más rápida)
    setInterval(() => {
      const currentWater = this.waterMeterSubject.value;
      const currentElectricity = this.electricityMeterSubject.value;
      
      // Incrementar agua (simulación de flujo)
      const waterIncrement = Math.random() * 0.1; // 0-0.1 litros
      this.waterMeterSubject.next(Math.round((currentWater + waterIncrement) * 100) / 100);
      
      // Incrementar electricidad (simulación de consumo)
      const electricityIncrement = Math.random() * 0.02; // 0-0.02 kWh
      this.electricityMeterSubject.next(Math.round((currentElectricity + electricityIncrement) * 100) / 100);
    }, 60000); // 1 minuto
  }

  getCurrentWaterConsumption(): Observable<number> {
    return this.waterMeter$;
  }

  getCurrentElectricityConsumption(): Observable<number> {
    return this.electricityMeter$;
  }

  getConsumptionHistory(days: number = 7): Observable<ConsumptionRecord[]> {
    return new Observable(observer => {
      this.consumptionHistory$.subscribe(history => {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        const filtered = history.filter(record => record.date >= cutoffDate);
        observer.next(filtered);
      });
    });
  }

  getDeviceConsumption(deviceId: string, days: number = 7): Observable<number> {
    return new Observable(observer => {
      this.getConsumptionHistory(days).subscribe(history => {
        const total = history.reduce((sum, record) => {
          return sum + (record.deviceConsumption[deviceId] || 0);
        }, 0);
        observer.next(Math.round(total * 100) / 100);
      });
    });
  }

  getTotalDeviceConsumption(days: number = 7, deviceNames?: { [key: string]: string }): Observable<DeviceConsumption[]> {
    return new Observable(observer => {
      this.getConsumptionHistory(days).subscribe(history => {
        const deviceTotals: { [key: string]: { name: string; consumption: number } } = {};
        
        history.forEach(record => {
          Object.keys(record.deviceConsumption).forEach(deviceId => {
            if (!deviceTotals[deviceId]) {
              const name = deviceNames && deviceNames[deviceId] 
                ? deviceNames[deviceId] 
                : `Dispositivo ${deviceId}`;
              deviceTotals[deviceId] = { name, consumption: 0 };
            }
            deviceTotals[deviceId].consumption += record.deviceConsumption[deviceId];
          });
        });

        const totalElectricity = history.reduce((sum, r) => sum + r.electricity, 0);
        
        const result: DeviceConsumption[] = Object.keys(deviceTotals).map(deviceId => ({
          deviceId,
          deviceName: deviceTotals[deviceId].name,
          consumption: Math.round(deviceTotals[deviceId].consumption * 100) / 100,
          percentage: totalElectricity > 0 
            ? Math.round((deviceTotals[deviceId].consumption / totalElectricity) * 100 * 100) / 100
            : 0
        }));

        observer.next(result.sort((a, b) => b.consumption - a.consumption));
      });
    });
  }

  getAverageDailyConsumption(days: number = 7): Observable<{ water: number; electricity: number }> {
    return new Observable(observer => {
      this.getConsumptionHistory(days).subscribe(history => {
        if (history.length === 0) {
          observer.next({ water: 0, electricity: 0 });
          return;
        }

        const totalWater = history.reduce((sum, r) => sum + r.water, 0);
        const totalElectricity = history.reduce((sum, r) => sum + r.electricity, 0);
        
        observer.next({
          water: Math.round((totalWater / history.length) * 100) / 100,
          electricity: Math.round((totalElectricity / history.length) * 100) / 100
        });
      });
    });
  }

  private addConsumptionRecord(record: ConsumptionRecord) {
    const current = this.consumptionHistorySubject.value;
    this.consumptionHistorySubject.next([...current, record]);
  }
}

