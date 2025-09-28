# WeatherBoard — Product Requirements Document (PRD)

Tagline: All your forecasts, one dashboard.

Last updated: 2025-09-28
Status: Draft (MVP scope locked; enhancements noted in Roadmap)
Owner: musamueed19

---

## 1) Summary

WeatherBoard is a modern, portfolio-grade weather dashboard built with React and Vite. It provides fast, reliable current conditions and a 5-day forecast with a clean, data-first UI. It uses OpenWeather APIs and client-side caching to deliver responsive search, geolocation-based weather, and a polished dashboard experience with light/dark modes.

- Problem: People want a quick, trustworthy snapshot of current and upcoming weather without ads, clutter, or clicks.
- Solution: One concise dashboard that surfaces the right metrics (temp, humidity, wind, sunrise/sunset) and a clear 5-day outlook.
- Why now: Demonstrates strong frontend and API integration skills (React 19 + TanStack Query), production-ready patterns, and deployability (Vercel), ideal for portfolio.

## 2) Goals and Non‑Goals

Goals (MVP)

- Search by city with debounced input and resilient error states.
- Detect current location via browser Geolocation and show local weather.
- Display key metrics: temperature, condition, humidity, wind, sunrise, sunset.
- Show 5-day forecast (3-hour buckets aggregated to daily highs/lows with icons).
- Fast load with cached results: optimistic UI and SWR-ish refresh.
- Light/Dark mode toggle matching brand palette.

Non‑Goals (MVP)

- Hour-by-hour detailed timeline (nice-to-have in roadmap).
- Alerts/notifications, severe weather push.
- Multi-provider weather sources or backend proxy.
- Account system, favorites sync to cloud.

## 3) Users and Personas

- Commuter: Quickly checks today + next few days; cares about temp, condition, wind.
- Traveler: Evaluates 5-day trend; cares about highs/lows and rain probability.
- Recruiter/Engineer Reviewer: Evaluates code quality, architecture choices, UX polish, performance, accessibility.

Success = all personas can get weather in <2–3 interactions with clear, readable UI.

## 4) User Stories (MVP)

- As a user, I can search a city by name and see its current weather and 5-day forecast.
- As a user, I can let the app detect my location and see my local weather.
- As a user, I can switch between light and dark modes and the UI remembers my choice.
- As a user, I can see loading states and helpful error messages if the API fails.
- As a user, I can see sunrise/sunset, humidity, and wind for quick planning.

Edge cases

- Ambiguous city names (suggestions/resolve first result with country hint).
- Geolocation blocked/denied (fallback to search input and default city).
- API rate limits/network failures (show cached data if available; friendly retry).

## 5) Scope (MVP Deliverables)

Functional

- Search bar with debounce (300–500ms). Optional suggestions using OpenWeather Geocoding API.
- Detect location button using navigator.geolocation API.
- Current weather card with icon and key metrics.
- 5-day forecast cards (daily summary: icon, min/max, short condition).
- Units: metric by default; optional toggle to imperial (roadmap if not MVP).
- Theme toggle (persist in localStorage or prefers-color-scheme).

Non‑Functional

- Performance: First result visible <1.5s on fast network; Lighthouse Performance/Best Practices/SEO ≥ 90 on desktop.
- Accessibility: WCAG 2.1 AA color contrast; keyboard navigation for search and toggles; aria-live for loading/error.
- Resilience: Query caching + retries with backoff; offline friendly skeletons (optional).

## 6) Success Metrics

- Time to first data: <1.5s on cable/Fast 3G for a cached city; <2.5s cold.
- Search-to-result conversion: >95% successful lookups for valid city names.
- Error rate visible to user: <1% over 100 requests (excluding intentional offline tests).
- Lighthouse: PWA-ready optional, but Performance ≥ 90, A11y ≥ 90 on a representative page.

## 7) System Overview and Architecture

- Client: React 19 + Vite, TypeScript, React Router (if multi-route), TanStack Query for data fetching/caching.
- Styling: Tailwind CSS (planned) or CSS modules. Brand palette provided.
- UI components: Minimal custom, with optional Ant Design/shadcn later.
- API: OpenWeather (no server). Keys stored as public env var (VITE\_), managed in Vercel.
- Caching: TanStack Query (staleTime ~5m, cacheTime ~15m) + request dedup.

Data Flow

- User action (search/geo) -> Query function -> OpenWeather endpoints -> Normalize -> Store in query cache -> Render components.

Security

- API key is public (OpenWeather free tier) but restricted via rate limits. No sensitive secrets in client.

## 8) APIs and Data Contracts

OpenWeather Endpoints (Free tier)

- Direct Geocoding (search suggestions)
  GET https://api.openweathermap.org/geo/1.0/direct?q={CITY_NAME}&limit=5&appid={API_KEY}

- Reverse Geocoding (from lat/lon)
  GET https://api.openweathermap.org/geo/1.0/reverse?lat={LAT}&lon={LON}&limit=1&appid={API_KEY}

- Current Weather
  GET https://api.openweathermap.org/data/2.5/weather?lat={LAT}&lon={LON}&units=metric&appid={API_KEY}

- 5 Day / 3 Hour Forecast
  GET https://api.openweathermap.org/data/2.5/forecast?lat={LAT}&lon={LON}&units=metric&appid={API_KEY}

Normalized Types (example)

```ts
export type Coordinates = {
  lat: number;
  lon: number;
  name?: string;
  country?: string;
};
export type CurrentWeather = {
  location: { name: string; country: string };
  tempC: number; // also tempF if units toggle present
  condition: string; // e.g., "Clouds", "Rain"
  humidity: number; // %
  windKph: number;
  sunrise: number; // epoch
  sunset: number; // epoch
  icon: string; // openweather icon id
};
export type DailyForecast = {
  date: string; // YYYY-MM-DD
  minC: number;
  maxC: number;
  condition: string;
  icon: string;
};
```

Error Model

- Network/API failure -> user-facing message with retry button.
- 404 city not found -> guidance to refine search.
- Geolocation denied -> fall back to manual search; show helper text.

## 9) UX and UI

Branding

- Colors: Sky Blue #3B82F6 (primary), White #FFFFFF, Cool Gray #64748B, Sun Yellow #FACC15 (accent), Storm Dark #1E293B (dark).
- Fonts: Headings Poppins/Inter; Body Roboto/Nunito Sans.

Layout

- Navbar: Logo + app name + theme toggle.
- Search row: input with debounce + Detect Location button.
- Current Weather card: prominent temp and icon, details grid for humidity/wind/sunrise/sunset.
- 5-day forecast: horizontal scroll or responsive grid (cards with day, icon, min/max).
- Optional Insights: simple line chart (Recharts) for temp trend (roadmap if not MVP).

Navigation

- MVP can be single route (/). Optional routes: /city/:slug.

Accessibility

- All interactive controls keyboard-accessible (Tab order, Enter/Space).
- aria-live regions for async results and errors.
- Sufficient color contrast in both themes.

## 10) Technical Requirements

- React 19, Vite 7, TypeScript 5.
- TanStack Query (planned) for fetching and cache; retry: 2; staleTime: 5m; cacheTime: 15m.
- State: component local state + query cache; no global store required for MVP.
- Icons: OpenWeather icons or Lucide/React Icons.
- Env var: VITE_OPENWEATHER_API_KEY must be set.
- Build: `npm run build`; Deploy: Vercel static.

## 11) Deployment and Environments

- Hosting: Vercel (Prod + Preview on PRs).
- Env vars: OPENWEATHER_API_KEY -> set as VITE_OPENWEATHER_API_KEY in Vercel Project Settings.
- Analytics/Monitoring: Optional (PostHog/Umami/Sentry) — not in MVP.

## 12) Risks and Mitigations

- API Rate Limits: Cache aggressively and debounce search; preemptive instructions to users.
- Geolocation permissions: Provide obvious fallback and clear messaging.
- Icon mismatches/weather parsing: Normalize responses and unit-test mapping.
- Dark mode contrast: Validate with Lighthouse/Axe; adjust palette if needed.

## 13) Milestones

M0 — Project Setup (DONE/IN PROGRESS)

- Vite + React + TS scaffold, branding assets.

M1 — Data and Search (MVP)

- Geocoding + current weather fetch + forecast fetch + basic caching.
- Search + detect location + error/loading states.

M2 — UI Polish

- Themed components, responsive layout, a11y pass, empty states.

M3 — Deploy

- Vercel pipeline, env var, README polish, demo screenshots.

## 14) Acceptance Criteria (per feature)

Search by City

- Given a user types a valid city, when they press Enter, then current and forecast load within 2.5s on cold.
- When API fails, a non-blocking error toast and a retry control are visible.

Detect Location

- Given the user allows geolocation, the dashboard auto-loads their local weather.
- If denied, the app shows a friendly prompt to use search.

Current Weather Card

- Displays City, Country, Temp (°C), Condition, Humidity, Wind, Sunrise, Sunset.
- Uses appropriate icon for condition.

5-Day Forecast

- Renders 5 cards summarizing daily min/max and condition with icons.
- Cards are keyboard-focusable and accessible.

Theme Toggle

- Light/Dark persists across reloads and respects system preference initially.

## 15) Out of Scope (for MVP)

- Notifications, widgets, Apple/Android apps.
- Backend services, user accounts, multi-provider aggregation.
- Offline-first full PWA packaging (can be added post-MVP).

## 16) Open Questions

- Should we include unit toggle (°C/°F) in MVP or defer to first enhancement?
- Add favorites/pinned cities for quick switching?
- Which chart library for insights (Recharts vs lightweight SVG custom)?

---

Appendix A — References

- OpenWeather Docs: https://openweathermap.org/api
- Geocoding API: https://openweathermap.org/api/geocoding-api
- Icons: https://openweathermap.org/weather-conditions
- Vercel Env Vars: https://vercel.com/docs/projects/environment-variables
