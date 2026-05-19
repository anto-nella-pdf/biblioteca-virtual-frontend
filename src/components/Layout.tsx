import { Toaster } from 'sonner'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const year = new Date().getFullYear()

  return (
    <>
      <div className="min-h-screen flex flex-col bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),rgba(241,245,249,0.95)_36%,#e2e8f0_100%)] text-slate-900">
        <main className="mx-auto flex flex-1 w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>

        <footer className="mt-auto bg-transparent text-slate-600 text-sm">
          <div className="mx-auto w-full max-w-7xl px-4 py-4 text-center sm:px-6 lg:px-8">
            Desarrollado por Antonella Azócar &copy; {year}
          </div>
        </footer>
      </div>
      <Toaster position="top-right" />
    </>
  )
}

export default Layout
