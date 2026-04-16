import './globals.css'

export const metadata = {
  title: 'MediScribe AI',
  description: 'AI-driven preliminary medical insights',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
