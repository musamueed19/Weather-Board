import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-provider";

const NotFoundPage = () => {
  const { theme } = useTheme();
  const isDark =
    theme === "dark" ||
    (theme === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  const logoSrc = isDark ? "/logo-dark.svg" : "/logo-light.svg";

  return (
    <div className="bg-gradient-to-br from-background to-muted min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center space-y-8">
          <div className="flex justify-center">
            <img
              src={logoSrc}
              alt="WeatherBoard"
              className="h-16 w-auto drop-shadow-sm"
              height={64}
            />
          </div>

          <div className="space-y-3">
            <p className="inline-block rounded-full bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              404 — Page Not Found
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Lost in the clouds
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              We couldn’t find that page. Let’s get you back to clear skies. If
              you typed a city URL, please check the spelling or use the
              dashboard search.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button size="lg" asChild>
              <Link to="/" aria-label="Go back to WeatherBoard home">
                ← Back to Dashboard
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://github.com/musamueed19/Weather-Board/issues/new"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Report an issue on GitHub"
              >
                Report an issue
              </a>
            </Button>
          </div>

          <div className="pt-6 text-xs text-muted-foreground">
            <span className="opacity-80">Tip:</span> Try searching by city name
            from the home page to get current conditions and a 5‑day forecast.
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
