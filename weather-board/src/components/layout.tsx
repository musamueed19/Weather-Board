import type { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      {/* header */}
      <main>{children}</main>
      {/* footer */}
    </div>
  );
};

export default Layout;
