import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Country, CountryEvent } from './countries.models'; // 👈 agrega CountryEvent

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

    // 👇 NUEVO: simulación "WebSocket"
    'Connect Live Updates': emptyProps(),
    'Disconnect Live Updates': emptyProps(),
    'Live Update Received': props<{ event: CountryEvent }>(),
  },
});
