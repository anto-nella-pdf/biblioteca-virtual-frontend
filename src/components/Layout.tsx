import { Toaster } from 'sonner'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),rgba(241,245,249,0.95)_36%,#e2e8f0_100%)] text-slate-900">
        <main className="mx-auto flex min-h-screen w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  )
}

export default Layout
