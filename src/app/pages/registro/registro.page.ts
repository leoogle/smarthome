import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.registroForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {}

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  async onRegister() {
    if (this.registroForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Registrando...'
      });
      await loading.present();

      this.authService.register(this.registroForm.value).subscribe({
        next: async (success) => {
          await loading.dismiss();
          if (success) {
            const toast = await this.toastController.create({
              message: 'Registro exitoso',
              duration: 2000,
              color: 'success'
            });
            await toast.present();
            this.router.navigate(['/dashboard']);
          }
        },
        error: async (error) => {
          await loading.dismiss();
          const toast = await this.toastController.create({
            message: 'Error al registrar',
            duration: 2000,
            color: 'danger'
          });
          await toast.present();
        }
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}

