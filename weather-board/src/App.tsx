import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/theme-provider";
import WeatherDashBoardPage from "./pages/weather-dashboard";
import Layout from "./components/layout";
import CityPage from "./pages/city-page";
import NotFoundPage from "./pages/not-found-page";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ErrorPage from "./pages/error-page";

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <Routes>
            {/* Routes using the shared Layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<WeatherDashBoardPage />} />
              <Route path="/city/:cityName" element={<CityPage />} />
            </Route>
            {/* 404 route outside Layout so it renders without header/footer */}
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
