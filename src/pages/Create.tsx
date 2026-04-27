import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import type { Author } from '../types/author'
import api from '../lib/api'
import {
  FileUploaderRegular,
  type OutputCollectionState,
} from '@uploadcare/react-uploader'
import '@uploadcare/react-uploader/core.css'
import { toast } from 'sonner'

const Create = () => {
  const [authors, setAuthors] = useState<Author[]>([])
  const [title, setTitle] = useState<string>('')
  const [docUrl, setDocUrl] = useState<string>('')
  const [abstract, setAbstract] = useState<string>('')
  const navigate = useNavigate()

  const addAuthor = () => {
    setAuthors([...authors, { firstName: '', lastName: '', ci: '' }])
  }

  const updateAuthor = (index: number, field: keyof Author, value: string) => {
    const updatedAuthors = [...authors]
    updatedAuthors[index][field] = value
    setAuthors(updatedAuthors)
  }

  const removeAuthor = (index: number) => {
    const updatedAuthors = [...authors]
    updatedAuthors.splice(index, 1)
    setAuthors(updatedAuthors)
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      if (!title || !docUrl) {
        toast.error('Por favor, complete el título y cargue un archivo PDF.')
        return
      }
      if (authors.length === 0) {
        toast.error('Por favor, agregue al menos un autor.')
        return
      }
      if (
        authors.some(
          (author) => !author.firstName || !author.lastName || !author.ci,
        )
      ) {
        toast.error('Por favor, complete toda la información de los autores.')
        return
      }
      await api.post('/documents', {
        title,
        authors,
        docUrl,
        abstract,
      })
      toast.success('Documento creado exitosamente.')
      navigate('/documents')
    } catch (error) {
      console.error(error)
      toast.error('Error al crear el documento.')
    }
  }

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-5 rounded-lg border border-slate-200 bg-white/80 p-6 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.5)] backdrop-blur sm:p-8 w-full">
      <Link
        to="/documents"
        className="inline-flex w-fit items-center text-sm font-medium transition hover:underline text-slate-600 hover:text-slate-900"
      >
        Volver a documentos
      </Link>
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
        Crear
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
        Nuevo documento
      </h1>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-medium text-slate-700">
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm placeholder-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            placeholder="Ingrese el título del documento"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="file" className="text-sm font-medium text-slate-700">
            Archivo PDF
          </label>
          {}
          <FileUploaderRegular
            useCloudImageEditor={false}
            sourceList="local, gdrive"
            classNameUploader="uc-light"
            pubkey={import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY as string}
            accept="application/pdf"
            onChange={(event: OutputCollectionState) => {
              if (!event.successEntries.length) return

              const firstEntry = event.successEntries[0]
              if (!firstEntry?.cdnUrl) return

              setDocUrl(firstEntry.cdnUrl)
            }}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">
              Autores
            </label>
            <button
              type="button"
              onClick={addAuthor}
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-400 hover:text-slate-900"
            >
              Agregar autor
            </button>
          </div>

          {authors.map((author, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={author.firstName}
                onChange={(e) =>
                  updateAuthor(index, 'firstName', e.target.value)
                }
                placeholder="Nombre"
                className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm placeholder-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                autoComplete="off"
              />
              <input
                type="text"
                value={author.lastName}
                onChange={(e) =>
                  updateAuthor(index, 'lastName', e.target.value)
                }
                placeholder="Apellido"
                className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm placeholder-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                autoComplete="off"
              />
              <input
                type="text"
                value={author.ci}
                onChange={(e) => updateAuthor(index, 'ci', e.target.value)}
                placeholder="Cédula de identidad"
                className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm placeholder-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => removeAuthor(index)}
                className="inline-flex items-center rounded-lg border border-red-300 bg-red-100 px-3 py-1 text-sm font-medium text-red-600 shadow-sm transition hover:border-red-400 hover:bg-red-200 hover:text-red-900"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="abstract"
            className="text-sm font-medium text-slate-700"
          >
            Resumen (opcional)
          </label>
          <textarea
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm placeholder-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            placeholder="Ingrese el resumen del documento"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          className="inline-flex w-fit items-center rounded-lg border border-slate-900 bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 cursor-pointer"
        >
          Crear documento
        </button>
      </form>
    </section>
  )
}

export default Create
