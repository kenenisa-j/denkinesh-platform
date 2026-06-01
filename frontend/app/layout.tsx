import "./globals.css"; // 👈 THIS IS THE CRITICAL MISSING LINK!

export const metadata = {
  title: "Denkinesh Technologies",
  description: "Enterprise Custom Software & Automation Solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}