import './globals.css'

export const metadata = {
  title: 'Report Processing System',
  description: 'A system for processing PDF reports and generating formatted reports with automatic captions',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <nav className="bg-navy text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Report Processing System</h1>
            <div className="space-x-4">
              <a href="/" className="hover:text-gray-300">Dashboard</a>
              <a href="/reports" className="hover:text-gray-300">Reports</a>
              <a href="/settings" className="hover:text-gray-300">Settings</a>
            </div>
          </div>
        </nav>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-navy text-white p-4 mt-auto">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Report Processing System. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
} 