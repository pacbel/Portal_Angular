import * as XLSX from 'xlsx';
import { formatDate } from '@angular/common';

export class ExcelComponent {
  datahora: string = formatDate(new Date(), 'yyyy-MM-dd_hhmmss', 'en');
  export(tabela, nomePlanilha: string) {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tabela.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Plan1');

    XLSX.writeFile(wb, nomePlanilha + this.datahora + '.xlsx');
  }
}
