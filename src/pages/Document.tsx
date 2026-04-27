import { Link, useParams } from 'react-router'
import PdfCover from '../components/documents/PdfCover'
import { formatDate } from '../utils/documents'
import { useEffect, useState } from 'react'
import type { Document } from '../types/document'
import api from '../lib/api'

const Document = () => {
  const { id } = useParams()
  const [document, setDocument] = useState<Document | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let isMounted = true

    void (async () => {
      try {
        setLoading(true)
        const response = await api.get(`/documents/${id}`)
        console.log('Documento obtenido:', response.data)

        if (isMounted) {
          setDocument(response.data)
        }
      } catch (error) {
        console.error('Error al obtener documento:', error)
      } finally {
        setLoading(false)
      }
    })()

    return () => {
      isMounted = false
    }
  }, [id])

  if (loading) {
    return (
      <section className="mx-auto flex max-w-3xl flex-col items-start gap-4 rounded-xl border border-slate-200 bg-white/80 p-6 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.5)] backdrop-blur sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Documento
        </p>
        <h1 className="h-10 w-3/4 animate-pulse rounded-lg bg-slate-200" />
        <p className="mt-4 h-6 w-1/2 animate-pulse rounded-lg bg-slate-200" />
        <p className="mt-2 h-6 w-1/3 animate-pulse rounded-lg bg-slate-200" />
      </section>
    )
  }

  if (!document) {
    return (
      <section className="mx-auto flex max-w-3xl flex-col items-start gap-4 rounded-xl border border-slate-200 bg-white/80 p-6 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.5)] backdrop-blur sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Documento
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          No encontrado
        </h1>
        <p className="text-sm leading-7 text-slate-500">
          El documento solicitado no existe o fue movido.
        </p>
        <Link
          to="/documents"
          className="inline-flex w-fit items-center text-sm font-medium transition hover:underline text-slate-600 hover:text-slate-900"
        >
          Volver a documentos
        </Link>
      </section>
    )
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(280px,360px)_1fr]">
      <div className="space-y-4">
        <Link
          to="/documents"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
        >
          Volver
        </Link>

        {loading ? (
          <div className="h-64 animate-pulse rounded-lg bg-slate-200" />
        ) : (
          <div>
            <PdfCover pdfUrl={document.docUrl} title={document.title} />
            <a href={document.docUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-medium text-slate-900 transition hover:underline">
              Ver PDF completo
            </a>
          </div>
        )}
      </div>

      <article className="rounded-lg border border-slate-200 bg-white/85 p-6 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.5)] backdrop-blur sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Detalle del documento
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {document.title}
        </h1>

        <ul className="mt-4 space-y-1">
          {document.authors.map((author) => (
            <li className="max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              {author.firstName} {author.lastName}
            </li>
          ))}
        </ul>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <MetaItem
            label="Creado"
            value={formatDate(new Date(document.createdAt))}
          />
          <MetaItem
            label="Actualizado"
            value={formatDate(new Date(document.updatedAt))}
          />
          <MetaItem
            label="Autoras y autores"
            value={document.authors.length.toString()}
          />
          <MetaItem label="Fuente" value="PDF" />
        </dl>

        {document.abstract && (
          <div className="mt-8 rounded-lg border border-slate-100 bg-slate-50 p-5 text-sm leading-7 text-slate-500">
            {document.abstract}
          </div>
        )}
      </article>
    </section>
  )
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-400">
        {label}
      </dt>
      <dd className="mt-3 text-sm font-medium text-slate-900">{value}</dd>
    </div>
  )
}

export default Document
