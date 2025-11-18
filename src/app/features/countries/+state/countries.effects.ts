import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CountriesActions } from './countries.actions';
import { CountriesApiService } from '../../../core/countries-api.service';
import { CountriesApiMapperService } from './countries-api-mapper.service';
import { catchError, map, mergeMap, of, switchMap, interval, withLatestFrom, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { selectAllCountries } from './countries.selectors';
import { CountryEvent } from './countries.models';

@Injectable()
export class CountriesEffects {
  private actions$ = inject(Actions);
  private api = inject(CountriesApiService);
  private mapper = inject(CountriesApiMapperService);
  private store = inject(Store<AppState>);   // 👈 para leer países desde el state

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.loadAll),
      mergeMap(() =>
        this.api.getAllCountries().pipe(
          map((apiCountries) =>
            CountriesActions.loadAllSuccess({
              countries: this.mapper.mapMany(apiCountries),
            })
          ),
          catchError(() =>
            of(
              CountriesActions.loadAllFailure({
                error: 'Error loading countries',
              })
            )
          )
        )
      )
    )
  );

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.search),
      mergeMap(({ term }) =>
        (term ? this.api.searchByName(term) : this.api.getAllCountries()).pipe(
          map((apiCountries) =>
            CountriesActions.searchSuccess({
              countries: this.mapper.mapMany(apiCountries),
            })
          ),
          catchError(() =>
            of(
              CountriesActions.searchFailure({
                error: 'Error searching countries',
              })
            )
          )
        )
      )
    )
  );

   // 👇 NUEVO: simulación de "WebSocket" con interval
  simulateLiveUpdates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.connectLiveUpdates),
      switchMap(() =>
        interval(5000).pipe( // cada 5 segundos
          withLatestFrom(this.store.select(selectAllCountries)),
          map(([tick, countries]) => {
            if (!countries.length) {
              const event: CountryEvent = {
                code: 'N/A',
                message: 'Waiting for countries to load...',
                timestamp: new Date().toISOString(),
              };
              return CountriesActions.liveUpdateReceived({ event });
            }

            const random = countries[Math.floor(Math.random() * countries.length)];
            const event: CountryEvent = {
              code: random.code,
              message: `Random live update #${tick} for ${random.name}`,
              timestamp: new Date().toISOString(),
            };

            return CountriesActions.liveUpdateReceived({ event });
          }),
          // se cancela cuando disparamos Disconnect Live Updates
          takeUntil(
            this.actions$.pipe(
              ofType(CountriesActions.disconnectLiveUpdates)
            )
          )
        )
      )
    )
  );
}
