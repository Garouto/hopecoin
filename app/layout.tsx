import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "HOPE COIN - A New Dawn in Crypto",
  description: "Embrace hope and patience on your spiritual journey through cryptocurrency.",
  generator: "who ?",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon-NcI4hsIr6z2a1irKLAJeotM9fZmaZ5.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
