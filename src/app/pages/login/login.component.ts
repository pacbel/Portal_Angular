import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  Form,
  NgForm
} from '@angular/forms';
import { emailValidator } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { AuthService } from '../../auth/auth.service';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { AuthModel } from '../../auth/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements AfterViewInit {
  public form: FormGroup;
  public settings: Settings;
  private usuario: AuthModel = new AuthModel();

  constructor(
    public appSettings: AppSettings,
    public fb: FormBuilder,
    public router: Router,
    private authservice: AuthService
  ) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, emailValidator])],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  public onSubmit(dados): void {
    this.authservice.usuarioLogado = false;
    this.usuario.login = dados.value.email;
    this.usuario.senha = dados.value.password;
    if (this.authservice.loginUsuario(this.usuario)) {
      this.authservice.usuarioLogado = true;
      console.log('Usuario autorizado ' + this.authservice.login);
      this.router.navigate(['painel']);
    } else {
      console.log('Acesso não autorizado ' + this.authservice.login);
      this.form.reset();
    }
    console.log(this.authservice.usuarioLogado);
  }

  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }
}
