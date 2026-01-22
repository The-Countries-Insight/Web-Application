import { countriesReducer, initialState } from './countries.reducer';
import { CountriesActions } from './countries.actions';
import { Country } from './countries.models';

describe('Countries Reducer', () => {
  it('debe regresar el estado inicial cuando la acción no es conocida', () => {
    const result = countriesReducer(undefined, { type: '@@INIT' } as any);
    expect(result).toEqual(initialState);
  });

  it('debe activar loading al hacer Load All', () => {
    const action = CountriesActions.loadAll();
    const result = countriesReducer(initialState, action);

    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('debe cargar países correctamente en Load All Success', () => {
    const countries: Country[] = [
      {
        code: 'MX',
        name: 'Mexico',
        capital: 'CDMX',
        region: 'Americas',
        population: 120_000_000,
        flagSvg: 'mx.svg',
      },
    ];

    const action = CountriesActions.loadAllSuccess({ countries });
    const result = countriesReducer(initialState, action);

    expect(result.loading).toBe(false);
    expect(result.countries.length).toBe(1);
    expect(result.countries[0].code).toBe('MX');
  });

  it('debe manejar errores en Load All Failure', () => {
    const action = CountriesActions.loadAllFailure({ error: 'Error X' });
    const result = countriesReducer(initialState, action);

    expect(result.loading).toBe(false);
    expect(result.error).toBe('Error X');
  });

  it('debe seleccionar un país en Select Country', () => {
    const action = CountriesActions.selectCountry({ code: 'US' });
    const result = countriesReducer(initialState, action);

    expect(result.selectedCode).toBe('US');
  });

  it('debe agregar y quitar favoritos en Toggle Favorite', () => {
    const actionAdd = CountriesActions.toggleFavorite({ code: 'MX' });
    const stateAfterAdd = countriesReducer(initialState, actionAdd);
    expect(stateAfterAdd.favorites).toContain('MX');

    const actionRemove = CountriesActions.toggleFavorite({ code: 'MX' });
    const stateAfterRemove = countriesReducer(stateAfterAdd, actionRemove);
    expect(stateAfterRemove.favorites).not.toContain('MX');
  });

  it('debe agregar eventos live en Live Update Received', () => {
    const event = {
      code: 'MX',
      message: 'Evento de prueba',
      timestamp: new Date().toISOString(),
    };

    const action = CountriesActions.liveUpdateReceived({ event });
    const result = countriesReducer(initialState, action);

    expect(result.liveEvents.length).toBe(1);
    expect(result.liveEvents[0].code).toBe('MX');
  });
});
