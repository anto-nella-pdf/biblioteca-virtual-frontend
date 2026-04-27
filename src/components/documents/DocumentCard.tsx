import { Link } from 'react-router'
import type { Document } from '../../types/document'
import { formatAuthors, formatDate } from '../../utils/documents'
import PdfCover from './PdfCover'

type DocumentCardProps = {
  document: Document
}

function DocumentCard({ document }: DocumentCardProps) {
  return (
    <Link
      to={`/documents/${document._id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white/90 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.55)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(15,23,42,0.65)]"
    >
      <PdfCover pdfUrl={document.docUrl} title={document.title} />

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="space-y-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400">
            Documento PDF
          </p>
          <h2 className="text-balance text-xl font-semibold leading-tight text-slate-900 transition group-hover:text-slate-600">
            {document.title}
          </h2>
          <p className="text-sm leading-6 text-slate-500">{formatAuthors(document.authors)}</p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400">
          <span>Subido {formatDate(new Date(document.createdAt))}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">
            Abrir
          </span>
        </div>
      </div>
    </Link>
  )
}

export default DocumentCard
