import { API_CONFIG } from "./config";
import type {
  Coordinates,
  CurrentWeatherResponse,
  ForecastResponse,
  ReverseGeocodingResponse,
} from "./types";

class WeatherAPI {
  private createURL(
    endpoint: string,
    params: Record<string, string | number>,
    BASE_URL: string = API_CONFIG.BASE_URL
  ): string {
    const searchParams = new URLSearchParams({
      ...API_CONFIG.DEFAULT_PARAMS,
      ...params,
    });

    return `${BASE_URL + endpoint}?${searchParams.toString()}`;
  }

  private async fetchWeatherData<T>(url: string): Promise<T> {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Error fetching weather data: ${res.statusText}`);
    }

    return res.json();
  }

  async getCurrentWeather(
    coords: Coordinates
  ): Promise<CurrentWeatherResponse> {
    const { lat, lon } = coords;
    if (lat == null || lon == null) {
      throw new Error("Invalid coordinates");
    }
    const url = this.createURL("/weather", {
      lat: lat.toString(),
      lon: lon.toString(),
    });
    return this.fetchWeatherData<CurrentWeatherResponse>(url);
  }

  async getForecast(coords: Coordinates): Promise<ForecastResponse> {
    const { lat, lon } = coords;
    if (lat == null || lon == null) {
      throw new Error("Invalid coordinates");
    }
    const url = this.createURL("/forecast", {
      lat: lat.toString(),
      lon: lon.toString(),
    });

    return this.fetchWeatherData<ForecastResponse>(url);
  }

  async reverseGeocode(
    coords: Coordinates,
    limit: number = 5
  ): Promise<ReverseGeocodingResponse> {
    const { lat, lon } = coords;
    const url = this.createURL(
      "/reverse",
      {
        lat: lat.toString(),
        lon: lon.toString(),
        limit,
      },
      API_CONFIG.GEOCODING_URL
    );

    return this.fetchWeatherData<ReverseGeocodingResponse>(url);
  }
}

export const weatherAPI = new WeatherAPI();
