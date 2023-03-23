import './globals.css'

export const metadata = {
  title: 'Space',
  description: 'Explore 3D e-commerce and meet your favorite creators.',
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
