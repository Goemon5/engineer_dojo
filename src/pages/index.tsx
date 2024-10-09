import Image from "next/image";
import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Layout from "@/components/layout/Layout ";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div>
      <Layout>
        <h1>Welcome to Some Page</h1>
        <p>This is the content of the page.</p>
      </Layout>
    </div>
  );
}
