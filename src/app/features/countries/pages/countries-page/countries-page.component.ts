import { Component, inject, signal } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
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
    AsyncPipe,
    // Material
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    // Feature components
    CountryListComponent,
    CountryDetailComponent,
  ],
})
export class CountriesPageComponent {
  private store = inject(Store<AppState>);

  countries$ = this.store.select(selectAllCountries);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);
  favoriteCountries$ = this.store.select(selectFavoriteCountries);

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
