import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject, of } from 'rxjs';
import { CountriesEffects } from './countries.effects';
import { CountriesActions } from './countries.actions';
import { CountriesApiService } from '../../../core/countries-api.service';
import { CountriesApiMapperService } from './countries-api-mapper.service';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../../app.state';
import { Country } from './countries.models';
import { take } from 'rxjs/operators';

describe('CountriesEffects (simulateLiveUpdates$)', () => {
  let actions$: ReplaySubject<any>;
  let effects: CountriesEffects;

  beforeEach(() => {
    const apiMock: Partial<CountriesApiService> = {
      getAllCountries: () => of([]),
      searchByName: () => of([]),
    };

    const initialState: AppState = {
      countries: {
        countries: [
          {
            code: 'MX',
            name: 'Mexico',
            capital: 'CDMX',
            region: 'Americas',
            population: 120_000_000,
            flagSvg: 'mx.svg',
          } as Country,
        ],
        loading: false,
        error: null,
        searchTerm: '',
        selectedCode: null,
        favorites: [],
        liveEvents: [],
      },
    };

    TestBed.configureTestingModule({
      providers: [
        CountriesEffects,
        CountriesApiMapperService,
        { provide: CountriesApiService, useValue: apiMock },
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
      ],
    });

    effects = TestBed.inject(CountriesEffects);
  });

  it(
    'debe emitir Live Update Received después de Connect Live Updates',
    (done) => {
      actions$ = new ReplaySubject(1);
      actions$.next(CountriesActions.connectLiveUpdates());

      // Nos suscribimos al efecto y esperamos la primera emisión
      const sub = effects.simulateLiveUpdates$
        .pipe(take(1))
        .subscribe({
          next: (action) => {
            try {
              expect(action.type).toBe(
                CountriesActions.liveUpdateReceived.type
              );
              expect(action.event.code).toBe('MX');
              sub.unsubscribe();
              done();
            } catch (err) {
              done(err);
            }
          },
          error: (err) => done(err),
        });
    },
    // timeout alto por si el interval tarda (5s en el efecto)
    15000
  );
});
