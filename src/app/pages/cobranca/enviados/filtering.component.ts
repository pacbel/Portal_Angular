import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { CobrancaService, Element } from '../cobranca.service';
import { ExcelComponent } from '../../../app.excel';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.scss']
})
export class FilteringComponent implements OnInit {
  @ViewChild('TABLE', { static: false }) table: ElementRef;

  public displayedColumns = [
    'contrato',
    'datavencimento',
    'valor',
    'nome',
    'PassodaRegua',
    'nossoNumCnab',
    'dataEnvio'
  ];
  public dataSource: any;
  public settings: Settings;
  constructor(
    public appSettings: AppSettings,
    private tablesService: CobrancaService,
    private excel: ExcelComponent
  ) {
    this.settings = this.appSettings.settings;
    this.tablesService.getMessage(2).subscribe((data: Element[]) => {
      this.dataSource = new MatTableDataSource<Element>(data);
    });
  }
  ngOnInit() {}
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportar() {
    this.excel.export(this.table, 'Cobrancas_Enviadas_');
  }
}
