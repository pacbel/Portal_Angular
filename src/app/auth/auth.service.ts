import { Injectable } from '@angular/core';
import { AuthModel } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public usuarioLogado = false;
  public usuario: AuthModel;
  public login: string;
  public senha: string;

  constructor() { }

  loginUsuario(usuario: AuthModel) {
    this.usuarioLogado = false;
    if (usuario.login === '' && usuario.senha === '') {
      this.login = usuario.login;
      this.senha = usuario.senha;
      this.usuarioLogado = true;
      return true;
    }
  }

  usuarioEstaAutenticado() {
    return this.usuarioLogado;
  }
}
