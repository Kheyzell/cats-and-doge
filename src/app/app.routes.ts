import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';

const ROUTE_PATHS = {
  home: '',
}

export const routes: Routes = [
  {
    path: ROUTE_PATHS.home,
    component: HomeComponent,
  },
  {
    path: '**',
    redirectTo: ROUTE_PATHS.home,
    pathMatch: 'full',
  }
];
