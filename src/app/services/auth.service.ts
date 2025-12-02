import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(email: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      // Simulación de autenticación
      // En producción, esto haría una llamada HTTP real
      setTimeout(() => {
        const user = {
          email: email,
          name: 'RESIDENTE LAS LOMAS',
          id: '1'
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
        observer.next(true);
        observer.complete();
      }, 1000);
    });
  }

  register(userData: any): Observable<boolean> {
    return new Observable(observer => {
      // Simulación de registro
      setTimeout(() => {
        const user = {
          email: userData.email,
          name: userData.name || 'Usuario',
          id: Date.now().toString()
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
        observer.next(true);
        observer.complete();
      }, 1000);
    });
  }

  changePassword(email: string, newPassword: string): Observable<boolean> {
    return new Observable(observer => {
      // Simulación de cambio de contraseña
      setTimeout(() => {
        observer.next(true);
        observer.complete();
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}

