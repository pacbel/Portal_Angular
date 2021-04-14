import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MsgboxComponent } from './msgbox.component';

@Injectable({
  providedIn: 'root'
})
export class MsgboxService {
  constructor(private ngbModal: NgbModal) {}
  confirm(
    titulo: string,
    pergunta: string,
    mensagem: string
  ): Observable<boolean> {
    const modal = this.ngbModal.open(MsgboxComponent, { backdrop: 'static' });
    modal.componentInstance.pergunta = pergunta;
    modal.componentInstance.titulo = titulo;
    modal.componentInstance.mensagem = mensagem;
    return from(modal.result).pipe(
      catchError(error => {
        console.warn(error);
        return of(undefined);
      })
    );
  }
}
