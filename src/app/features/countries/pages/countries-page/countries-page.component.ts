import { Component, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';
import { CountriesActions } from '../../+state/countries.actions';
import {
  selectAllCountries,
  selectError,
  selectFavoriteCountries,
  selectLoading,
} from '../../+state/countries.selectors';

import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryDetailComponent } from '../../components/country-detail/country-detail.component';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-countries-page',
  templateUrl: './countries-page.component.html',
  styleUrls: ['./countries-page.component.scss'],
  imports: [
    NgIf,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CountryListComponent,
    CountryDetailComponent,
  ],
})
export class CountriesPageComponent {
  private store = inject(Store<AppState>);

  // 🔁 Antes: Observables con select(...)
  // countries$ = this.store.select(selectAllCountries);

  // ✅ Ahora: Signals con selectSignal(...)
  countries = this.store.selectSignal(selectAllCountries);
  loading = this.store.selectSignal(selectLoading);
  error = this.store.selectSignal(selectError);
  favoriteCountries = this.store.selectSignal(selectFavoriteCountries);

  // Signal local para el texto de búsqueda
  searchTerm = signal('');

  constructor() {
    this.store.dispatch(CountriesActions.loadAll());
  }

  onSearchChange(term: string): void {
    this.searchTerm.set(term);
    this.store.dispatch(CountriesActions.search({ term }));
  }

  clearSearch(): void {
    this.searchTerm.set('');
    this.store.dispatch(CountriesActions.search({ term: '' }));
  }

  onSelectCountry(code: string): void {
    this.store.dispatch(CountriesActions.selectCountry({ code }));
  }

  onToggleFavorite(code: string): void {
    this.store.dispatch(CountriesActions.toggleFavorite({ code }));
  }
}
