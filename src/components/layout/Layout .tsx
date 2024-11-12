import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: ReactNode; // JSXやtsxの要素も含まれる
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col lg:max-w-pc">
      <Header />
      <main
        className={`flex flex-col items-center justify-start min-h-[700px]`}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
