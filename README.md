# Smart Home - Aplicación IoT

Aplicación web desarrollada con Ionic y Angular para la gestión de dispositivos IoT en el hogar.

## Características

- 🔐 **Autenticación**: Login, registro y recuperación de contraseña
- 📊 **Dashboard**: Panel principal con servicios y opciones
- 👤 **Perfil de Usuario**: Gestión de información del residente
- 🏠 **Dispositivos IoT**: Visualización y gestión de dispositivos conectados
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
│   ├── pages/
│   │   ├── login/              # Página de inicio de sesión
│   │   ├── registro/           # Página de registro
│   │   ├── cambio-password/    # Cambio de contraseña
│   │   ├── dashboard/          # Panel principal
│   │   ├── perfil-usuario/     # Perfil del usuario
│   │   ├── dispositivos/       # Lista de dispositivos
│   │   └── agregar-dispositivo/# Agregar nuevo dispositivo
│   ├── services/
│   │   ├── auth.service.ts     # Servicio de autenticación
│   │   └── device.service.ts   # Servicio de dispositivos
│   └── app.module.ts           # Módulo principal
└── theme/
    └── variables.scss          # Variables de tema
```

## Páginas

### Login
Página de inicio de sesión con validación de formularios.

### Registro
Formulario de registro de nuevos usuarios.

### Cambio de Contraseña
Recuperación y cambio de contraseña.

### Dashboard
Panel principal con:
- Opciones circulares seleccionables
- Lista de servicios disponibles
- Menú lateral

### Perfil de Usuario
Gestión de información del residente con elementos interactivos.

### Dispositivos
Lista de dispositivos IoT conectados con opción de eliminar.

### Agregar Dispositivo
Formulario para agregar nuevos dispositivos IoT al sistema.

## Desarrollo

Para construir la aplicación para producción:

```bash
npm run build
```

## Notas

- La autenticación actualmente está simulada (localStorage)
- Los dispositivos se almacenan en memoria (BehaviorSubject)
- Para producción, conectar con un backend real

# smarthome
