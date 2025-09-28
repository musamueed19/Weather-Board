import Header from "./Header";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      {/* header */}
      <Header />
      <main className="container min-h-screen mx-auto px-4 py-8">
        <Outlet />
      </main>
      {/* footer */}
      <footer className="border-t backdrop-blur">
        <div className="container py-12 text-center mx-auto text-gray-400 supports-[backdrop-filter]:bg-background/60">
          Made with 💖 by, Muhammad Musa Mueed
        </div>
      </footer>
    </div>
  );
};

export default Layout;
