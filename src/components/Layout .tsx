import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: ReactNode; // JSXやtsxの要素も含まれる
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex flex-col items-center justify-center p-24 `}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
