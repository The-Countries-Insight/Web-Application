import { Component, inject } from '@angular/core';
import { NgIf, AsyncPipe, DecimalPipe } from '@angular/common'; // 👈 agrega AsyncPipe aquí
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';
import { selectSelectedCountry } from '../../+state/countries.selectors';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
  imports: [
    NgIf,
    AsyncPipe,
    DecimalPipe,
    MatCardModule,
    MatIconModule,
  ],
})
export class CountryDetailComponent {
  private store = inject(Store<AppState>);
  country$ = this.store.select(selectSelectedCountry);
}
