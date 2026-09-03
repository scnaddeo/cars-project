import "./globals.css";

export const metadata = {
  title: {
    default: "Ferraio Motors — Bespoke Classic Car Recreations",
    template: "%s — Ferraio Motors",
  },
  description:
    "Ferraio Motors builds hand-crafted, aluminum-bodied recreations of the world's most iconic classic cars, built bespoke by master craftsmen.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
