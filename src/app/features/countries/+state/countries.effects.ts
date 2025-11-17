import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CountriesActions } from './countries.actions';
import { CountriesApiService } from '../../../core/countries-api.service';
import { CountriesApiMapperService } from './countries-api-mapper.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CountriesEffects {
  private actions$ = inject(Actions);
  private api = inject(CountriesApiService);
  private mapper = inject(CountriesApiMapperService);

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
}
