import "./globals.css";
import RefreshRedirect from '@/components/RefreshRedirect'

export const metadata = {
  title: "Muhammad Ali Abd Aziz",
  description: "Portfolio of Muhammad Ali Abd Aziz — Bachelor of Computer Science (Hons.), Web & Software Developer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RefreshRedirect />
        {children}
        </body>
    </html>
  );
}