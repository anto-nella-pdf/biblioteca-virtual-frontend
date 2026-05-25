import { Link } from 'react-router'
import DocumentCard from '../components/documents/DocumentCard'
import { sortDocumentsByLeadAuthor, normalizeString } from '../utils/documents'
import { useEffect, useState } from 'react'
import api from '../lib/api'
import type { Document } from '../types/document'

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>([])
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const getTotalAuthors = () => {
    const authorsSet = new Set<string>()
    documents.forEach((document) => {
      document.authors?.forEach((author) => {
        const authorKey = normalizeString(
          `${author.firstName}-${author.lastName}`,
        )
        authorsSet.add(authorKey)
      })
    })
    return authorsSet.size
  }

  const filterDocuments = (query: string) => {
    const lowerCaseQuery = normalizeString(query)
    return documents.filter((document) => {
      const titleMatch = normalizeString(document.title).includes(
        lowerCaseQuery,
      )
      const authorsMatch = document.authors?.some((author) => {
        const fullName = normalizeString(
          `${author.firstName} ${author.lastName}`,
        )
        return fullName.includes(lowerCaseQuery)
      })
      return titleMatch || authorsMatch
    })
  }

  useEffect(() => {
    let isMounted = true

    void (async () => {
      try {
        setLoading(true)
        const response = await api.get('/documents')

        if (isMounted) {
          setDocuments(sortDocumentsByLeadAuthor(response.data))
          setFilteredDocuments(sortDocumentsByLeadAuthor(response.data))
        }
      } catch (error) {
        console.error('Error al obtener documentos:', error)
      } finally {
        setLoading(false)
      }
    })()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-6 rounded-xl border border-slate-200 bg-white/80 p-6 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.5)] backdrop-blur sm:p-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Documentos
            </p>
            <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Biblioteca virtual UEN Ricardo Montilla
            </h1>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Bienvenidos a la Biblioteca virtual de la Unidad Educativa Nacional
            "Ricardo Montilla", un espacio para compartir conocimientos.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {loading ? (
            <SummaryBadge label="Cargando..." value="..." />
          ) : (
            <>
              <SummaryBadge
                label="Documentos"
                value={documents.length.toString()}
              />
              <SummaryBadge
                label="Autores"
                value={getTotalAuthors().toString()}
              />
            </>
          )}
          <Link
            to="/create"
            className="inline-flex items-center justify-center rounded-lg border border-slate-900 bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Nuevo documento
          </Link>
        </div>
      </header>

      <input
        type="text"
        placeholder="Buscar documentos..."
        className="rounded-lg border border-slate-200 px-4 py-3 w-full sm:w-auto"
        onChange={(e) => setFilteredDocuments(filterDocuments(e.target.value))}
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          <p className="col-span-full text-center text-sm text-slate-500">
            Cargando documentos...
          </p>
        ) : filteredDocuments.length === 0 ? (
          <p className="col-span-full text-center text-sm text-slate-500">
            No se encontraron documentos.
          </p>
        ) : (
          filteredDocuments.map((document) => (
            <DocumentCard key={document._id} document={document} />
          ))
        )}
      </div>
    </section>
  )
}

function SummaryBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-30 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
        {value}
      </p>
    </div>
  )
}

export default Documents
