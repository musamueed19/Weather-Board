import { useTheme } from "@/context/theme-provider";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark =
    theme === "dark" ||
    (theme === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  const logoSrc = isDark ? "/logo-dark.svg" : "/fullLogo.svg";

  return (
    <header className="sticky py-2 top-0 z-50 w-full border-b backdrop-blur bg-background/95 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logoSrc} alt="WeatherBoard" className="h-14 w-auto" />
        </Link>

        <div>
          {/* Search */}

          {/* Theme Toggle */}
          <Button
            variant={"outline"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`flex items-center justify-center  cursor-pointer p-2 rounded-md bg-background/60 hover:bg-background/70`}
          >
            <div
              className={`transition-transform duration-500 ${
                isDark ? "rotate-180" : "rotate-0"
              }`}
            >
              {isDark ? (
                <Sun className="size-5 text-yellow-200 transition-all rotate-0" />
              ) : (
                <Moon className="size-5 text-gray-500 transition-all rotate-0" />
              )}
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
