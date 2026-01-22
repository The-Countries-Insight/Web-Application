import {
  selectAllCountries,
  selectSelectedCountry,
  selectFavoriteCountries,
  selectLiveEvents,
} from './countries.selectors';
import { CountriesState } from './countries.models';

describe('Countries Selectors', () => {
  const baseState: CountriesState = {
    countries: [
      {
        code: 'MX',
        name: 'Mexico',
        capital: 'CDMX',
        region: 'Americas',
        population: 120_000_000,
        flagSvg: 'mx.svg',
      },
      {
        code: 'US',
        name: 'United States',
        capital: 'Washington',
        region: 'Americas',
        population: 300_000_000,
        flagSvg: 'us.svg',
      },
    ],
    loading: false,
    error: null,
    searchTerm: '',
    selectedCode: 'US',
    favorites: ['MX'],
    liveEvents: [
      {
        code: 'MX',
        message: 'Evento live',
        timestamp: '2025-01-01T00:00:00Z',
      },
    ],
  };

  const rootState = {
    countries: baseState,
  };

  it('selectAllCountries debe regresar la lista de países', () => {
    const result = selectAllCountries.projector(baseState);
    expect(result.length).toBe(2);
    expect(result[0].code).toBe('MX');
  });

  it('selectSelectedCountry debe regresar el país seleccionado', () => {
    const result = selectSelectedCountry.projector(
      baseState.countries,
      baseState.selectedCode
    );
    expect(result?.code).toBe('US');
  });

  it('selectFavoriteCountries debe regresar sólo favoritos', () => {
    const result = selectFavoriteCountries.projector(
      baseState.countries,
      baseState.favorites
    );
    expect(result.length).toBe(1);
    expect(result[0].code).toBe('MX');
  });

  it('selectLiveEvents debe regresar la lista de eventos live', () => {
    const result = selectLiveEvents.projector(baseState);
    expect(result.length).toBe(1);
    expect(result[0].message).toBe('Evento live');
  });
});
