export const metadata = {
  title: "SnapMsg",
  description: "Integrate your business with professional ai assisted response",
};

import "../_styles/globals.css";

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
