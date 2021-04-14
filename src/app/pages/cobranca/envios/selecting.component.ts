import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { CobrancaService, Element } from '../cobranca.service';
import { MsgboxService } from '../../../theme/components/msgbox/msgbox.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-selecting',
  templateUrl: './selecting.component.html'
})
export class SelectingComponent implements OnInit {
  public displayedColumns: string[] = [
    'select',
    'Sigla',
    'Contrato',
    'NomeFantasia',
    'DataVencimento',
    'PassodaRegua',
    'Titulo',
    'Total',
    'Status'
  ];
  public dataSource: any;
  public elementos = [];
  public selection = new SelectionModel<Element>(true, []);
  public retorno: boolean;

  constructor(
    private tablesService: CobrancaService,
    private msg: MsgboxService
  ) {
    this.dataSource = new MatTableDataSource<Element>();
  }
  ngOnInit() {
    this.tablesService.getMessage(1).subscribe((data: Element[]) => {
      this.dataSource = data;
      this.elementos = data;
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.elementos.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.elementos.forEach(row => this.selection.select(row));
  }

  openMsg() {
    this.msg
      .confirm(
        'Atenção!!',
        'Tem certeza que deseja excluir o registro?',
        'Este registro não poderá ser recuperado.'
      )
      .pipe(take(1))
      .subscribe(result => {
        if (result === true) {
          console.log('Excluir registros');
        }
      });
  }
}
