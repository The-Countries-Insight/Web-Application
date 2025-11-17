import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountriesApiService {
  private readonly baseUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/all?fields=name,cca2,capital,region,population,flags`
    );
  }

  searchByName(name: string): Observable<any[]> {
    const encoded = encodeURIComponent(name);
    return this.http.get<any[]>(
      `${this.baseUrl}/name/${encoded}?fields=name,cca2,capital,region,population,flags`
    );
  }
}
