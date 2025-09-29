import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-provider";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";

interface ErrorPageProps {
  error?: Error | string;
  title?: string;
  description?: string;
  showRetry?: boolean;
  onRetry?: () => void;
  showHomeButton?: boolean;
}

const ErrorPage = ({
  error,
  title = "Something went wrong",
  description,
  showRetry = true,
  onRetry,
  showHomeButton = true,
}: ErrorPageProps) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isDark =
    theme === "dark" ||
    (theme === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  const logoSrc = isDark ? "/logo-dark.svg" : "/fullLogo.svg";

  // Extract error message
  const errorMessage = typeof error === "string" ? error : error?.message;
  const defaultDescription = errorMessage
    ? `Error: ${errorMessage}`
    : "We encountered an unexpected error. Our team has been notified and is working on a fix.";

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      // Default retry: reload the page
      window.location.reload();
    }
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="bg-gradient-to-br from-background to-muted min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <img
              src={logoSrc}
              alt="WeatherBoard"
              className="h-16 w-auto drop-shadow-sm"
              height={64}
            />
          </div>

          {/* Error Icon & Status */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-destructive/10 p-4">
                <AlertTriangle className="h-12 w-12 text-destructive" />
              </div>
            </div>

            <div className="space-y-3">
              <p className="inline-block rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">
                Error Occurred
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                {title}
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                {description || defaultDescription}
              </p>
            </div>
          </div>

          {/* Error Details (Development only) */}
          {import.meta.env.DEV && errorMessage && (
            <div className="mx-auto max-w-xl">
              <details className="text-left bg-muted/50 rounded-lg p-4 text-sm">
                <summary className="cursor-pointer font-medium text-muted-foreground mb-2">
                  Technical Details
                </summary>
                <pre className="whitespace-pre-wrap text-xs text-destructive font-mono">
                  {errorMessage}
                  {error instanceof Error && error.stack && (
                    <>\n\nStack Trace:\n{error.stack}</>
                  )}
                </pre>
              </details>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {showRetry && (
              <Button size="lg" onClick={handleRetry} className="min-w-[160px]">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            )}

            <Button
              variant="outline"
              size="lg"
              onClick={handleGoBack}
              className="min-w-[160px]"
            >
              <Home className="mr-2 h-4 w-4" />
              Go Back
            </Button>

            {showHomeButton && (
              <Button
                variant="ghost"
                size="lg"
                asChild
                className="min-w-[160px]"
              >
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
            )}
          </div>

          {/* Report Issue */}
          <div className="pt-6">
            <Button variant="link" size="sm" asChild>
              <a
                href="https://github.com/musamueed19/Weather-Board/issues/new"
                target="_blank"
                rel="noreferrer noopener"
                className="text-muted-foreground hover:text-foreground"
              >
                <Bug className="mr-2 h-3 w-3" />
                Report this issue
              </a>
            </Button>
          </div>

          {/* Helpful Tip */}
          <div className="pt-4 text-xs text-muted-foreground">
            <span className="opacity-80">Tip:</span> If this error persists, try
            clearing your browser cache or check your internet connection.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
