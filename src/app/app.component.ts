import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  currentRoute: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });
  }

  showTabs(): boolean {
    const routesWithoutTabs = ['/login', '/registro', '/cambio-password'];
    return this.authService.isAuthenticated() && 
           !routesWithoutTabs.some(route => this.currentRoute === route || this.currentRoute.startsWith(route));
  }
}

