import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountriesState, Country } from '../+state/countries.models';

export const selectCountriesState =
  createFeatureSelector<CountriesState>('countries');

export const selectAllCountries = createSelector(
  selectCountriesState,
  (state): Country[] => state.countries
);

export const selectLoading = createSelector(
  selectCountriesState,
  (state): boolean => state.loading
);

export const selectError = createSelector(
  selectCountriesState,
  (state): string | null => state.error
);

export const selectSearchTerm = createSelector(
  selectCountriesState,
  (state): string => state.searchTerm
);

export const selectSelectedCountryCode = createSelector(
  selectCountriesState,
  (state): string | null => state.selectedCode
);

export const selectFavorites = createSelector(
  selectCountriesState,
  (state): string[] => state.favorites
);

export const selectSelectedCountry = createSelector(
  selectAllCountries,
  selectSelectedCountryCode,
  (countries, code): Country | null =>
    countries.find((c) => c.code === code) ?? null
);

export const selectFavoriteCountries = createSelector(
  selectAllCountries,
  selectFavorites,
  (countries, favoriteCodes): Country[] =>
    countries.filter((c) => favoriteCodes.includes(c.code))
);

export const selectLiveEvents = createSelector(
  selectCountriesState,
  (state: CountriesState) => state.liveEvents
);
