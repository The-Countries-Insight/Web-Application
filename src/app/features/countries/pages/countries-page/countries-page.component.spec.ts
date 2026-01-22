import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountriesPageComponent } from './countries-page.component';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../../../app.state';
import { Country } from '../../+state/countries.models';

describe('CountriesPageComponent', () => {
  let component: CountriesPageComponent;
  let fixture: ComponentFixture<CountriesPageComponent>;

  const countriesMock: Country[] = [
    {
      code: 'MX',
      name: 'Mexico',
      capital: 'CDMX',
      region: 'Americas',
      population: 120_000_000,
      flagSvg: 'mx.svg',
    },
  ];

  const initialState: AppState = {
    countries: {
      countries: countriesMock,
      loading: false,
      error: null,
      searchTerm: '',
      selectedCode: null,
      favorites: [],
      liveEvents: [],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountriesPageComponent],
      providers: [
        provideMockStore({
          initialState,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CountriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar el título en el template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Country Insights');
  });
});
