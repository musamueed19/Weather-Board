import type { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

// WEATHER_KEYS
export const WEATHER_KEYS = {
  weather: (coords: Coordinates) => ["weather", coords] as const,
};

const useWeatherQuery = (coords: Coordinates | null) => {
  useQuery({
    queryKey: WEATHER_KEYS.weather(coords ?? { lat: 0, lon: 0 }),
    queryFn: () => (coords ? weatherAPI.getCurrentWeather(coords) : null),
    enabled: !!coords,
  });
};

export default useWeatherQuery;
