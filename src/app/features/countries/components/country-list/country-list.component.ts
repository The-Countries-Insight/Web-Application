import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Country } from '../../+state/countries.models';

// Angular Material
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
  imports: [NgFor, NgIf, MatListModule, MatIconModule, MatButtonModule],
})
export class CountryListComponent {
  @Input() countries: Country[] = [];
  @Input() compact = false;

  @Output() selectCountry = new EventEmitter<string>();
  @Output() toggleFavorite = new EventEmitter<string>();

  onSelect(code: string): void {
    this.selectCountry.emit(code);
  }

  onToggleFavorite(code: string): void {
    this.toggleFavorite.emit(code);
  }
}
