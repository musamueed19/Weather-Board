import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

const WeatherDashBoardPage = () => {
  return (
    <div>
      {/* Favorite Cities */}
      <div>
        My Location
        <Button
          variant={"outline"}
          size={"icon"}
          // onClick={handleRefresh}
          aria-label="Refresh weather data"
          // whenever we fetching the weather & forecast data, this button is disabled
          // disabled={isFetching}
        >
          <RefreshCcw />
        </Button>
      </div>

      {/* Current and Hourly Weather */}
    </div>
  );
};

export default WeatherDashBoardPage;
