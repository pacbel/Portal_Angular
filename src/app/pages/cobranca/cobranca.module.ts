import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../shared/shared.module';
import { FilteringComponent } from './enviados/filtering.component';
import { SelectingComponent } from './envios/selecting.component';
import { CobrancaService } from './cobranca.service';

export const routes = [
  { path: '', redirectTo: 'envios', pathMatch: 'full' },
  {
    path: 'envios',
    component: SelectingComponent,
    data: { breadcrumb: 'Envios do Dia' }
  },
  {
    path: 'enviados',
    component: FilteringComponent,
    data: { breadcrumb: 'Cobranças Enviadas' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    SharedModule
  ],
  declarations: [FilteringComponent, SelectingComponent],
  providers: [CobrancaService]
})
export class CobrancaModule {}
