import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cambio-password',
  templateUrl: './cambio-password.page.html',
  styleUrls: ['./cambio-password.page.scss'],
})
export class CambioPasswordPage implements OnInit {
  cambioPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.cambioPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {}

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  async onChangePassword() {
    if (this.cambioPasswordForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Cambiando contraseña...'
      });
      await loading.present();

      this.authService.changePassword(
        this.cambioPasswordForm.value.email,
        this.cambioPasswordForm.value.newPassword
      ).subscribe({
        next: async (success) => {
          await loading.dismiss();
          if (success) {
            const toast = await this.toastController.create({
              message: 'Contraseña cambiada exitosamente',
              duration: 2000,
              color: 'success'
            });
            await toast.present();
            this.router.navigate(['/login']);
          }
        },
        error: async (error) => {
          await loading.dismiss();
          const toast = await this.toastController.create({
            message: 'Error al cambiar contraseña',
            duration: 2000,
            color: 'danger'
          });
          await toast.present();
        }
      });
    }
  }
}

