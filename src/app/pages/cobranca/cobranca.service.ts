import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
export interface Element {
  Sigla: string;
  Contrato: number;
  NomeFantasia: string;
  DataVencimento: string;
  PassodaRegua: string;
  Titulo: number;
  Total: number;
  Status: string;
}
@Injectable()
export class CobrancaService {
  apiUrl = 'http://201.62.245.178:8081/regua/cobranca';

  httpOptions = {
    headers: new HttpHeaders({
      'tsc-key': 'A972C577-DFB0-064E-1189-0154C99310DAAC12'
    })
  };

  public apps: Element[] = [];

  constructor(private http: HttpClient) { }

  getData(tipo) {
    this.getMessage(tipo).subscribe((data: Element[]) => {
      this.apps = data;
    });
    return this.apps;
  }

  getMessage(tipo): Observable<Element[]> {
    return this.http.get<Element[]>(this.apiUrl + '/' + tipo, this.httpOptions);
  }
}
