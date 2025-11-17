import { Injectable } from '@angular/core';
import { Country } from '../+state/countries.models';

@Injectable({ providedIn: 'root' })
export class CountriesApiMapperService {
  mapOne(apiCountry: any): Country {
    return {
      code: apiCountry.cca2,
      name: apiCountry.name?.common ?? '',
      capital: apiCountry.capital?.[0] ?? 'N/A',
      region: apiCountry.region ?? 'N/A',
      population: apiCountry.population ?? 0,
      flagSvg: apiCountry.flags?.svg ?? '',
    };
  }

  mapMany(apiCountries: any[]): Country[] {
    return apiCountries.map((c) => this.mapOne(c));
  }
}
