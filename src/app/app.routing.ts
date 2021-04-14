import { AuthGuard } from './auth/auth-guard';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages/pages.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import { LogoffComponent } from './pages/logoffcomponent/logoff.component';
import { SerasaComponent } from './pages/serasa/serasa.component';
import { HelpComponent } from './pages/help/help.component';

export const routes: Routes = [
  {
    path: 'painel',
    component: PagesComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            m => m.DashboardModule
          ),
        data: { breadcrumb: 'Dashboard' }
      },
      {
        path: 'cobranca',
        loadChildren: () =>
          import('./pages/cobranca/cobranca.module').then(
            m => m.CobrancaModule
          ),
        data: { breadcrumb: 'Cobrança' }
      },
      {
        path: 'search',
        component: SearchComponent,
        data: { breadcrumb: 'Search' }
      },
      {
        path: 'serasa',
        component: SerasaComponent,
        data: { breadcrumb: 'Serasa' }
      },
      {
        path: 'help',
        component: HelpComponent,
        data: { breadcrumb: 'Help' }
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'logoff',
    component: LogoffComponent
  },
  { path: 'error', component: ErrorComponent, data: { breadcrumb: 'Error' } },
  { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules // <- comment this line for enable lazy load
  // useHash: true
});
