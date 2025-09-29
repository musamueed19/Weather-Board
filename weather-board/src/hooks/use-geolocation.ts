// Custom Hook is a very powerful feature of React that allows you to encapsulate and reuse stateful logic across multiple components.
// A custom hook is a JavaScript function whose name starts with "use" and that may call other hooks.
// Custom hooks allow you to extract component logic into reusable functions, making your code more modular and easier to maintain.

import type { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";

interface GeolocationState {
  coords: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}

const useGeolocation = () => {
  const [locationData, setLocationData] = useState<GeolocationState>({
    coords: null,
    error: null,
    isLoading: true,
  });

  // This function will be called soon, as our app is loaded
  const getLocation = () => {
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

    // if failed to get Navigator.geolocation
    if (!navigator.geolocation) {
      setLocationData((prev) => ({
        ...prev,
        coords: null,
        isLoading: false,
        error: "Geolocation is not supported by your browser",
      }));
      return;
    }

    // Now, it means we success until here
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationData((prev) => ({
          coords: {
            lat: pos?.coords?.latitude,
            lon: pos?.coords?.longitude,
          },
          error: null,
          isLoading: false,
        }));
      },
      (err) => {
        let errorMessage: string = "";

        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = "User denied the request for Geolocation.";
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case err.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
            break;
        }
        setLocationData((prev) => ({
          ...prev,
          coords: null,
          isLoading: false,
          error: errorMessage,
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation,
  };
};

export default useGeolocation;
