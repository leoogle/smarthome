import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  userName: string = 'RESIDENTE LAS LOMAS';
  selectedOption: number = 1;

  servicios = [
    {
      id: 1,
      name: 'Dispositivos conectados',
      icon: 'star',
      route: '/dispositivos'
    },
    {
      id: 2,
      name: 'Control de Luces',
      icon: 'bulb',
      route: '/dashboard'
    },
    {
      id: 3,
      name: 'Seguridad del Hogar',
      icon: 'shield-checkmark',
      route: '/dashboard'
    },
    {
      id: 4,
      name: 'Clima y Temperatura',
      icon: 'thermometer',
      route: '/dashboard'
    },
    {
      id: 5,
      name: 'Configuración',
      icon: 'settings',
      route: '/perfil-usuario'
    }
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    public menuController: MenuController
  ) {
    const user = this.authService.getCurrentUser();
    if (user && user.name) {
      this.userName = user.name.toUpperCase();
    }
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  selectOption(option: number) {
    this.selectedOption = option;
  }

  navigateToService(route: string) {
    if (route === '/dispositivos') {
      this.router.navigate([route]);
    }
  }

  openMenu() {
    this.menuController.open();
  }

  goToProfile() {
    this.router.navigate(['/perfil-usuario']);
  }

  goToDevices() {
    this.router.navigate(['/dispositivos']);
  }

  logout() {
    this.authService.logout();
  }
}

