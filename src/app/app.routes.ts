import { Routes } from '@angular/router';
import { CountriesPageComponent } from './features/countries/pages/countries-page/countries-page.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: CountriesPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
