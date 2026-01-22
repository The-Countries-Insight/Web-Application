import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CountriesApiService } from './countries-api.service';

describe('CountriesApiService', () => {
  let service: CountriesApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountriesApiService],
    });

    service = TestBed.inject(CountriesApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe hacer GET a /all en getAllCountries', () => {
    service.getAllCountries().subscribe((response) => {
      expect(response.length).toBe(1);
    });

    const req = httpMock.expectOne((request) =>
      request.url.includes('/all')
    );

    expect(req.request.method).toBe('GET');

    req.flush([{}]);
  });

  it('debe hacer GET a /name/{name} en searchByName', () => {
    const term = 'mexico';

    service.searchByName(term).subscribe((response) => {
      expect(response.length).toBe(1);
    });

    const req = httpMock.expectOne((request) =>
      request.url.includes(`/name/${encodeURIComponent(term)}`)
    );

    expect(req.request.method).toBe('GET');

    req.flush([{}]);
  });
});
