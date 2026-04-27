import type { Author } from './author'

export type Document = {
  _id: string
  title: string
  authors: Author[]
  abstract?: string
  docUrl: string
  createdAt: Date
  updatedAt: Date
}
