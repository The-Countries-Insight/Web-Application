import { createReducer, on } from '@ngrx/store';
import { CountriesState } from './countries.models';
import { CountriesActions } from './countries.actions';

export const initialState: CountriesState = {
  countries: [],
  loading: false,
  error: null,
  searchTerm: '',
  selectedCode: null,
  favorites: [],
  liveEvents: [],   // 👈 NUEVO
};

export const countriesReducer = createReducer(
  initialState,

  // Load all
  on(CountriesActions.loadAll, (state): CountriesState => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CountriesActions.loadAllSuccess, (state, { countries }): CountriesState => ({
    ...state,
    loading: false,
    countries,
  })),
  on(CountriesActions.loadAllFailure, (state, { error }): CountriesState => ({
    ...state,
    loading: false,
    error,
  })),

  // Search
  on(CountriesActions.search, (state, { term }): CountriesState => ({
    ...state,
    loading: true,
    error: null,
    searchTerm: term,
  })),
  on(CountriesActions.searchSuccess, (state, { countries }): CountriesState => ({
    ...state,
    loading: false,
    countries,
  })),
  on(CountriesActions.searchFailure, (state, { error }): CountriesState => ({
    ...state,
    loading: false,
    error,
  })),

  // Select
  on(CountriesActions.selectCountry, (state, { code }): CountriesState => ({
    ...state,
    selectedCode: code,
  })),

  // Toggle favorite
  on(CountriesActions.toggleFavorite, (state, { code }): CountriesState => {
    const exists = state.favorites.includes(code);
    return {
      ...state,
      favorites: exists
        ? state.favorites.filter((c) => c !== code)
        : [...state.favorites, code],
    };
  }),

  // Clear error
  on(CountriesActions.clearError, (state): CountriesState => ({
    ...state,
    error: null,
  })),

   // 👇 NUEVO: cada evento en vivo se agrega al inicio de la lista
  on(CountriesActions.liveUpdateReceived, (state, { event }): CountriesState => ({
    ...state,
    liveEvents: [event, ...state.liveEvents].slice(0, 50), // guarda solo los últimos 50
  }))
);
