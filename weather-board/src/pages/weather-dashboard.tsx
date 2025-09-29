import LoadingSkeletion from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import useGeolocation from "@/hooks/use-geolocation";
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react";

const WeatherDashBoardPage = () => {
  // use useGeolocation hook to get user's current location
  const {
    coords,
    isLoading: locationLoading,
    error: locationError,
    getLocation,
  } = useGeolocation();

  const handleRefresh = () => {
    getLocation();
    if (coords) {
      // fetch weather data using coords
    }
  };

  // if (locationLoading)
  if (locationLoading) {
    return <LoadingSkeletion />;
  }

  if (locationError) {
    return (
      <Alert className="max-w-md py-6" variant={"destructive"}>
        <AlertTriangle className="size-4 ]" />
        <AlertTitle className="mb-2">Location Error</AlertTitle>
        <AlertDescription>
          <p>{locationError}</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="size-4" /> Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!coords) {
    return (
      <Alert className="max-w-md py-6" variant={"destructive"}>
        <AlertTitle className="mb-2">Location Required</AlertTitle>
        <AlertDescription>
          <p>Please enable location access to see your local weather</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="size-4" /> Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="">
      {/* Favorite Cities */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          aria-label="Refresh weather data"
          // whenever we fetching the weather & forecast data, this button is disabled
          // disabled={isFetching}
        >
          <RefreshCcw className="size-4" />
        </Button>
      </div>

      {/* Current and Hourly Weather */}
    </div>
  );
};

export default WeatherDashBoardPage;
