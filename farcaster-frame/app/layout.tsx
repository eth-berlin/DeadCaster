import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  // without a title, warpcast won't validate your frame
  title: "deadcaster",
  description: "Your final cast for all to see!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
