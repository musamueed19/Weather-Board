import { API_CONFIG } from "./config";
import type { Coordinates } from "./types";

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

  async getCurrentWeather(coords: Coordinates) {
    const {lat, lon} = coords;
    if (lat == null || lon == null) {
      throw new Error("Invalid coordinates");
    }
    const url = this.createURL("/weather", {
      lat: lat.toString(),
      lon: lon.toString(),
    });
    return this.fetchWeatherData(url);
  }

  async getForecast() {}

  async reverseGeocode() {}
}
