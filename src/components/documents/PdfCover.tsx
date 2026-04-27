import { useEffect, useRef, useState } from 'react'
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

GlobalWorkerOptions.workerSrc = workerUrl

type PdfCoverProps = {
  pdfUrl: string
  title: string
}

function PdfCover({ pdfUrl, title }: PdfCoverProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    let cancelled = false
    const loadingTask = getDocument({ url: pdfUrl })

    async function renderCover() {
      setStatus('loading')

      try {
        const pdf = await loadingTask.promise
        const page = await pdf.getPage(1)
        const canvas = canvasRef.current

        if (!canvas || cancelled) {
          return
        }

        const context = canvas.getContext('2d')

        if (!context) {
          throw new Error('No se pudo acceder al canvas.')
        }

        const viewport = page.getViewport({ scale: 1.45 })
        canvas.width = viewport.width
        canvas.height = viewport.height

        await page.render({ canvas, canvasContext: context, viewport }).promise

        if (!cancelled) {
          setStatus('ready')
        }
      } catch {
        if (!cancelled) {
          setStatus('error')
        }
      }
    }

    renderCover()

    return () => {
      cancelled = true
      loadingTask.destroy()
    }
  }, [pdfUrl])

  return (
    <div className="relative aspect-4/5 overflow-hidden rounded-xl border border-slate-200 bg-slate-950 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.65)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_45%),linear-gradient(180deg,rgba(15,23,42,0.05),rgba(15,23,42,0.35))]" />

      {status !== 'ready' ? (
        <div className="absolute inset-0 flex flex-col justify-end p-5 text-slate-100">
          <div className="space-y-3 rounded-lg border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
            <span className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-200">
              PDF
            </span>
            <p className="text-sm font-medium leading-5 text-white">{title}</p>
            <div className="space-y-2 pt-2">
              <div className="h-2 w-4/5 rounded-full bg-white/15" />
              <div className="h-2 w-11/12 rounded-full bg-white/10" />
              <div className="h-2 w-2/3 rounded-full bg-white/10" />
            </div>
            {status === 'error' ? (
              <p className="text-xs leading-5 text-slate-300">
                La portada se muestra como reserva porque no fue posible cargar el PDF.
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={status === 'ready' ? 'h-full w-full object-cover' : 'hidden'}
      />
    </div>
  )
}

export default PdfCover
