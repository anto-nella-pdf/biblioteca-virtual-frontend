import { Link, useParams } from 'react-router'
import PdfCover from '../components/documents/PdfCover'
import { documents } from '../data/documents'
import { formatDate } from '../utils/documents'

const Document = () => {
  const { id } = useParams()
  const document = documents.find((item) => item._id === id)

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
          className="inline-flex items-center rounded-full border border-slate-900 bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
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
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
        >
          Volver
        </Link>

        <PdfCover pdfUrl={document.docUrl} title={document.title} />
      </div>

      <article className="rounded-xl border border-slate-200 bg-white/85 p-6 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.5)] backdrop-blur sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Detalle del documento
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {document.title}
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
          {document.authors
            .map((author) => `${author.firstName} ${author.lastName}`)
            .join(', ')}
        </p>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <MetaItem label="Creado" value={formatDate(document.createdAt)} />
          <MetaItem
            label="Actualizado"
            value={formatDate(document.updatedAt)}
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
