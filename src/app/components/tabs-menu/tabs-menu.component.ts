import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tabs-menu',
  templateUrl: './tabs-menu.component.html',
  styleUrls: ['./tabs-menu.component.scss'],
})
export class TabsMenuComponent implements OnInit {
  currentRoute: string = '';

  tabs = [
    {
      name: 'Dashboard',
      icon: 'home',
      route: '/dashboard'
    },
    {
      name: 'Dispositivos',
      icon: 'hardware-chip',
      route: '/dispositivos'
    },
    {
      name: 'Luces',
      icon: 'bulb',
      route: '/control-luces'
    },
    {
      name: 'Seguridad',
      icon: 'shield-checkmark',
      route: '/seguridad'
    },
    {
      name: 'Clima',
      icon: 'thermometer',
      route: '/clima'
    }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngOnInit() {
    this.currentRoute = this.router.url;
  }

  navigateTo(route: string) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([route]);
    }
  }

  isActive(route: string): boolean {
    return this.currentRoute === route || this.currentRoute.startsWith(route + '/');
  }
}

