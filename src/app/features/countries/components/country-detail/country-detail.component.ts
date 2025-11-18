import { Component, inject } from '@angular/core';
import { NgIf, DecimalPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';
import { selectSelectedCountry } from '../../+state/countries.selectors';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
  imports: [NgIf, DecimalPipe, MatCardModule, MatIconModule],
})
export class CountryDetailComponent {
  private store = inject(Store<AppState>);

  // Antes:
  // country$ = this.store.select(selectSelectedCountry);

  // Ahora:
  country = this.store.selectSignal(selectSelectedCountry);
}
