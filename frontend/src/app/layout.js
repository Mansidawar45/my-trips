import Header from "./components/Header";
import Footer from "./components/footer";
import "./globals.css"; // tailwind css

export const metadata = {
  title: "Travel App",
  description: "Travel destination details",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
