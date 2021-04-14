import { Injectable } from '@angular/core';

@Injectable()
export class TodoService {
  private _todoList = [
    { text: 'Enviar cobrança Via Café' },
    {
      text: 'Verificar títulos SERASA'
    },
    {
      text: 'Baixar títulos SERASA'
    },
    { text: 'Verificar lista de envios do dia' },
    {
      text: 'Verificar montante enviado no período'
    },
    { text: 'Conferir lista de envio de cobranças' },
    { text: 'Solicitar ao Shopping atualização dos E-mails de cadastro' },
    { text: 'Solicitar atualização de telefones para SMS' }
  ];

  getTodoList() {
    return this._todoList;
  }
}
