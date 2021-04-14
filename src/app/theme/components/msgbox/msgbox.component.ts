import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-msgbox',
  templateUrl: './msgbox.component.html',
  styleUrls: ['./msgbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MsgboxComponent {
  titulo: string;
  pergunta: string;
  mensagem: string;
  confirmedResult: boolean;

  constructor(public activeModal: NgbActiveModal) {}
}
