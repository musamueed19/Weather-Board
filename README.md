<div align="center">

<img src="./weather-board/public/fullLogo.svg" alt="WeatherBoard" width="520" />

<h1>WeatherBoard</h1>

<p><strong>All your forecasts, one dashboard.</strong></p>

[Live Demo](#) · [Report Bug](https://github.com/musamueed19/Weather-Board/issues) · [Request Feature](https://github.com/musamueed19/Weather-Board/issues)

</div>

---

## Overview

WeatherBoard is a clean, fast weather dashboard built with React + Vite. It shows your current conditions and a 5‑day outlook with a focus on readability, speed, and a modern dashboard feel.

Highlights

- Lightning-fast client with query caching (planned: TanStack Query)
- Geolocation support and city search with debouncing
- Polished UI and accessible light/dark themes

> Branding:
Sky Blue (#3B82F6),
Sun Yellow (#FACC15),
Cool Gray (#64748B),
Storm Dark (#1E293B),
White (#FFFFFF),

## Features

- Search weather by city name
- Detect current location weather (Geolocation API)
- Current dashboard: Temperature, Condition, Humidity, Wind, Sunrise/Sunset
- 5‑day forecast (daily min/max + icon)
- Light/Dark mode toggle (persisted)

Planned Enhancements

- Autocomplete suggestions via OpenWeather Geocoding API
- Temperature trend chart (Recharts)
- Units toggle °C/°F

## Screenshots

> Note: Replace placeholders with real screenshots after implementing UI.

![WeatherBoard dashboard light](./docs/images/dashboard-light.png)

![WeatherBoard dashboard dark](./docs/images/dashboard-dark.png)

## Tech Stack

- React 19 + TypeScript
- Vite 7
- TanStack Query (planned)
- Tailwind CSS (planned)
- OpenWeather API

## Getting Started

Prerequisites

- Node.js 18+
- OpenWeather API key (free) https://openweathermap.org/api

1. Clone and install

```bash
npm install
```

2. Configure environment

Create a `.env` file in the project root (use `.env.example` as a guide):

```
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

3. Run the app

```bash
npm run dev
```

The dev server URL will be shown in the terminal (typically http://localhost:5173).

## Project Structure

```
weather-board/
├─ public/
│  ├─ logo-light.svg
│  ├─ logo-dark.svg
│  └─ fullLogo.svg
├─ src/
│  ├─ assets/
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css
├─ docs/
│  └─ PRD.md
├─ index.html
├─ package.json
└─ README.md
```

## Configuration

- Title/Meta: Update `index.html` for title/description.
- API Key: Uses `VITE_OPENWEATHER_API_KEY` at build/runtime.
- Query Caching: When TanStack Query is added, set sensible defaults: `staleTime` ~5m, `cacheTime` ~15m, `retry` 2.

## Deployment (Vercel)

1. Push to GitHub.
2. Import repo in Vercel.
3. Add environment variable in Project Settings:
   - `VITE_OPENWEATHER_API_KEY = <your_key>`
4. Deploy. Preview URLs on PRs are automatic.

## Roadmap

- [ ] City autocomplete (geocoding)
- [ ] Forecast chart (Recharts)
- [ ] Units toggle (°C/°F)
- [ ] Favorites/pinned cities
- [ ] PWA: offline shell + install prompt

## Contributing

Contributions are welcome. Open an issue to discuss ideas or bugs. If you submit a PR, please:

- Keep commits focused and small.
- Update docs/screenshots if behavior changes.

## License

MIT © 2025 musamueed19
