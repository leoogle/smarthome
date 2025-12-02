# Smart Home - Aplicación IoT

Aplicación web desarrollada con Ionic y Angular para la gestión de dispositivos IoT en el hogar.

## Características

- 🔐 **Autenticación**: Login, registro y recuperación de contraseña
- 📊 **Dashboard**: Panel principal con métricas de consumo y servicios
- 👤 **Perfil de Usuario**: Gestión de información del residente
- 🏠 **Dispositivos IoT**: Visualización y gestión de dispositivos conectados
- 💡 **Control de Luces**: Gestión de iluminación inteligente con control de brillo
- 🔒 **Seguridad del Hogar**: Sistema de seguridad con cámaras, sensores y alarmas
- 🌡️ **Clima y Temperatura**: Control de termostatos, aire acondicionado y ventiladores
- 💧 **Medidores de Consumo**: Monitoreo de agua potable y electricidad
- 📈 **Métricas Históricas**: Análisis de consumos con datos históricos
- ➕ **Agregar Dispositivos**: Formulario para agregar nuevos dispositivos IoT

## Tecnologías

- **Ionic 7**: Framework para aplicaciones móviles y web
- **Angular 17**: Framework de desarrollo
- **TypeScript**: Lenguaje de programación
- **SCSS**: Estilos

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar la aplicación en modo desarrollo:
```bash
npm start
```

3. La aplicación estará disponible en `http://localhost:4200`

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   └── tabs-menu/          # Menú de navegación inferior
│   ├── pages/
│   │   ├── login/              # Página de inicio de sesión
│   │   ├── registro/           # Página de registro
│   │   ├── cambio-password/    # Cambio de contraseña
│   │   ├── dashboard/          # Panel principal con métricas
│   │   ├── perfil-usuario/     # Perfil del usuario
│   │   ├── dispositivos/       # Lista de dispositivos por categoría
│   │   ├── control-luces/      # Control de iluminación
│   │   ├── seguridad/           # Sistema de seguridad
│   │   ├── clima/              # Control de clima
│   │   ├── metricas/           # Métricas históricas de consumo
│   │   └── agregar-dispositivo/# Agregar nuevo dispositivo
│   ├── services/
│   │   ├── auth.service.ts     # Servicio de autenticación
│   │   ├── device.service.ts   # Servicio de dispositivos IoT
│   │   └── metrics.service.ts  # Servicio de métricas y consumos
│   └── app.module.ts           # Módulo principal
└── theme/
    └── variables.scss          # Variables de tema
```

## Páginas

### Login
Página de inicio de sesión con validación de formularios y diseño moderno.

### Registro
Formulario de registro de nuevos usuarios con validación de contraseñas.

### Cambio de Contraseña
Recuperación y cambio de contraseña con validación.

### Dashboard
Panel principal con:
- Opciones circulares seleccionables
- Métricas de consumo en tiempo real:
  - Consumo actual de agua potable (litros)
  - Consumo actual de electricidad (kWh)
  - Promedios diarios
- Estadísticas de dispositivos (total y conectados)
- Top 5 dispositivos con mayor consumo eléctrico
- Lista de servicios disponibles
- Menú lateral

### Perfil de Usuario
Gestión de información del residente con elementos interactivos y checkboxes.

### Dispositivos
Lista de dispositivos IoT organizados por categorías:
- Control de Luces
- Seguridad del Hogar
- Clima y Temperatura
- Medidores de Consumo
- Dispositivos Generales

### Control de Luces
Gestión de iluminación inteligente:
- Encender/apagar luces
- Control de brillo con slider
- Estado de conexión
- Ubicación de cada dispositivo

### Seguridad del Hogar
Sistema de seguridad con:
- Cámaras de seguridad
- Sensores de movimiento
- Alarmas
- Sensores de puerta
- Control de activación/desactivación

### Clima y Temperatura
Control de clima:
- Termostatos con ajuste de temperatura
- Sensores de temperatura
- Aire acondicionado
- Ventiladores con control de velocidad

### Métricas Históricas
Análisis detallado de consumos:
- Selector de período (7, 15, 30 días)
- Resumen de consumos (actual, total, promedio)
- Historial diario de agua y electricidad
- Consumo por dispositivo con porcentajes
- Gráficos de barras de progreso

### Agregar Dispositivo
Formulario para agregar nuevos dispositivos IoT:
- Selección de categoría
- Tipos de dispositivo filtrados por categoría
- Asignación automática de iconos
- Valores por defecto según tipo

## Servicios

### AuthService
Maneja la autenticación de usuarios:
- Login
- Registro
- Cambio de contraseña
- Gestión de sesión
- Almacenamiento en localStorage

### DeviceService
Gestiona los dispositivos IoT:
- Listado de dispositivos
- Filtrado por categoría
- Agregar/eliminar dispositivos
- Actualización de estados
- Dispositivos preconfigurados (13 dispositivos de ejemplo)

### MetricsService
Maneja métricas y consumos:
- Medidores de agua y electricidad
- Historial de consumos (30 días)
- Cálculo de promedios
- Consumo por dispositivo
- Actualización en tiempo real

## Dispositivos Preconfigurados

La aplicación incluye 13 dispositivos de ejemplo:

**Luces (4):**
- Luz Principal Sala
- Luz Cocina
- Luz Dormitorio
- Luz Exterior

**Seguridad (4):**
- Cámara Principal
- Sensor de Movimiento
- Alarma Principal
- Sensor de Puerta

**Clima (4):**
- Termostato Principal
- Sensor Temperatura Dormitorio
- Aire Acondicionado
- Ventilador

**Medidores (2):**
- Medidor de Agua Potable
- Medidor de Electricidad

**General (1):**
- Dispositivo Residente (Hub)

## Menú de Navegación

Menú inferior con acceso rápido a:
- Dashboard
- Dispositivos
- Luces
- Seguridad
- Clima

El menú se muestra solo cuando el usuario está autenticado.

## Desarrollo

Para construir la aplicación para producción:

```bash
npm run build
```

## Notas

- La autenticación actualmente está simulada (localStorage)
- Los dispositivos se almacenan en memoria (BehaviorSubject)
- Las métricas incluyen datos históricos simulados de 30 días
- Los medidores se actualizan en tiempo real cada minuto
- Para producción, conectar con un backend real

## Características de Métricas

### Medidores de Consumo
- **Agua Potable**: Medición en litros con actualización en tiempo real
- **Electricidad**: Medición en kWh con seguimiento por dispositivo

### Métricas Históricas
- Historial de hasta 30 días
- Promedios diarios calculados automáticamente
- Consumo desglosado por dispositivo
- Porcentajes de consumo por dispositivo
- Visualización con barras de progreso

### Consumo por Dispositivo
Cada dispositivo eléctrico tiene su propio consumo registrado:
- Luces inteligentes
- Cámaras
- Termostatos
- Aire acondicionado
- Ventiladores
- Y más...

## Licencia

MIT
