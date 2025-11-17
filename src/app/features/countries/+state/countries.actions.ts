import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Country } from './countries.models';

export const CountriesActions = createActionGroup({
  source: 'Countries',
  events: {
    'Load All': emptyProps(),
    'Load All Success': props<{ countries: Country[] }>(),
    'Load All Failure': props<{ error: string }>(),

    'Search': props<{ term: string }>(),
    'Search Success': props<{ countries: Country[] }>(),
    'Search Failure': props<{ error: string }>(),

    'Select Country': props<{ code: string | null }>(),

    'Toggle Favorite': props<{ code: string }>(),

    'Clear Error': emptyProps(),
  },
});
