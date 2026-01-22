import { CountriesApiMapperService } from './countries-api-mapper.service';

describe('CountriesApiMapperService', () => {
  let service: CountriesApiMapperService;

  beforeEach(() => {
    service = new CountriesApiMapperService();
  });

  it('debe mapear un país de la API a Country', () => {
    const apiCountry = {
      cca2: 'MX',
      name: { common: 'Mexico' },
      capital: ['CDMX'],
      region: 'Americas',
      population: 120_000_000,
      flags: { svg: 'mx.svg' },
    };

    const result = service.mapOne(apiCountry);

    expect(result.code).toBe('MX');
    expect(result.name).toBe('Mexico');
    expect(result.capital).toBe('CDMX');
    expect(result.region).toBe('Americas');
  });

  it('debe mapear una lista de países', () => {
    const apiCountries = [
      { cca2: 'MX', name: { common: 'Mexico' }, capital: ['CDMX'], region: 'Americas', population: 1, flags: { svg: 'mx.svg' } },
      { cca2: 'US', name: { common: 'United States' }, capital: ['Washington'], region: 'Americas', population: 2, flags: { svg: 'us.svg' } },
    ];

    const result = service.mapMany(apiCountries);
    expect(result.length).toBe(2);
    expect(result[1].code).toBe('US');
  });
});
