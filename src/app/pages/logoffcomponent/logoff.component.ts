import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logoffcomponent',
  templateUrl: './logoff.component.html',
  styleUrls: ['./logoff.component.scss']
})
export class LogoffComponent implements OnInit {
  constructor(private authservice: AuthService, public router: Router) {}

  ngOnInit() {
    this.authservice.usuarioLogado = false;
    this.authservice.login = '';
    this.authservice.senha = '';
    this.router.navigate(['login']);
  }
}
