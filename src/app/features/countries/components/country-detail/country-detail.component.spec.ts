import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryDetailComponent } from './country-detail.component';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../../../app.state';
import { Country } from '../../+state/countries.models';

describe('CountryDetailComponent', () => {
  let component: CountryDetailComponent;
  let fixture: ComponentFixture<CountryDetailComponent>;

  const selectedCountry: Country = {
    code: 'MX',
    name: 'Mexico',
    capital: 'CDMX',
    region: 'Americas',
    population: 120_000_000,
    flagSvg: 'mx.svg',
  };

  const initialState: AppState = {
    countries: {
      countries: [selectedCountry],
      loading: false,
      error: null,
      searchTerm: '',
      selectedCode: 'MX',
      favorites: [],
      liveEvents: [],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryDetailComponent],
      providers: [
        provideMockStore({
          initialState,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CountryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar el nombre del país seleccionado', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Mexico');
  });
});
