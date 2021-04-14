import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoffComponent } from './logoff.component';

export const routes = [
  { path: '', component: LogoffComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [CommonModule]
})
export class LogoffcomponentModule {}
