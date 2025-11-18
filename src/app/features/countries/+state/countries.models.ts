// 👇 NUEVO: simulación de evento "en vivo"
export interface CountryEvent {
  code: string;
  message: string;
  timestamp: string;
}

export interface Country {
  code: string;
  name: string;
  capital: string;
  region: string;
  population: number;
  flagSvg: string;
}

export interface CountriesState {
  countries: Country[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCode: string | null;
  favorites: string[];
  liveEvents: CountryEvent[];  // 👈 NUEVO
}
