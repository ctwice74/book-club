import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Book Club",
  description: "Manage books, meetings, and discussions with your club."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
