export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
  temp_kf?: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Rain {
  "1h": number;
}

export interface Snow {
  "1h": number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface CurrentWeatherResponse {
  coord: Coordinates;
  base: string;
  weather: WeatherCondition[];
  main: MainWeatherData;
  visibility: number;
  wind: Wind;
  rain: Rain;
  clouds: Clouds;
  snow?: Snow;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastListItem {
  dt: number;
  main: MainWeatherData;
  weather: WeatherCondition[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number; // Probability of precipitation
  rain?: Rain;
  snow?: Snow;
  sys: {
    pod: string; // Part of day (d/n)
  };
  dt_txt: string; // Date/time in text format
}

export interface City {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastListItem[];
  city: {
    id: number;
    name: string;
    coord: Coordinates;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface LocalNames {
  [key: string]: string;
}

export interface ReverseGeocodingItem {
  name: string;
  local_names: LocalNames;
  // or
  // local_names: Record <string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
// export interface ReverseGeocodingResponse extends Array<ReverseGeocodingItem> {}
export type ReverseGeocodingResponse = ReverseGeocodingItem[];
