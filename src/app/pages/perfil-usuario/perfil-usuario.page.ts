import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  perfilForm: FormGroup;
  userName: string = 'NOMBRE RESIDENTE';
  menuItems = [
    { name: 'Elemento 1', icon: 'A', checked: true },
    { name: 'Elemento 2', icon: 'A', checked: false },
    { name: 'Elemento 3', icon: 'A', checked: true },
    { name: 'Elemento 4', icon: 'A', checked: false },
    { name: 'Elemento 5', icon: 'A', checked: true }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.perfilForm = this.formBuilder.group({
      informacion1: ['', Validators.required],
      informacion2: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
    
    const user = this.authService.getCurrentUser();
    if (user && user.name) {
      this.userName = user.name.toUpperCase();
      this.perfilForm.patchValue({
        informacion1: user.name,
        informacion2: user.email || ''
      });
    }
  }

  async onSave() {
    if (this.perfilForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Guardando...'
      });
      await loading.present();

      // Simulación de guardado
      setTimeout(async () => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Información guardada exitosamente',
          duration: 2000,
          color: 'success'
        });
        await toast.present();
      }, 1000);
    }
  }

  toggleItem(index: number) {
    this.menuItems[index].checked = !this.menuItems[index].checked;
  }
}

