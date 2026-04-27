import type { Author } from '../types/author'
import type { Document } from '../types/document'

export function sortAuthorsByLastName(authors: Author[]) {
  if (!authors) {
    return []
  }
  return [...authors].sort((leftAuthor, rightAuthor) => {
    const lastNameComparison = leftAuthor.lastName.localeCompare(
      rightAuthor.lastName,
      'es',
      {
        sensitivity: 'base',
      },
    )

    if (lastNameComparison !== 0) {
      return lastNameComparison
    }

    return leftAuthor.firstName.localeCompare(rightAuthor.firstName, 'es', {
      sensitivity: 'base',
    })
  })
}

export function formatAuthorLabel(author: Author[][number]) {
  const initial = author.firstName.trim().charAt(0).toUpperCase()

  return `${author.lastName}. ${initial}`
}

export function formatAuthors(authors: Author[]) {
  return sortAuthorsByLastName(authors)
    ?.map((author) => formatAuthorLabel(author))
    .join(' · ')
}

export function sortDocumentsByLeadAuthor(documents: Document[]) {
  return [...documents].sort((leftDocument, rightDocument) => {
    const leftAuthor = sortAuthorsByLastName(leftDocument.authors)[0]
    const rightAuthor = sortAuthorsByLastName(rightDocument.authors)[0]

    const leftSortKey = leftAuthor ? leftAuthor.lastName : leftDocument.title
    const rightSortKey = rightAuthor
      ? rightAuthor.lastName
      : rightDocument.title

    const surnameComparison = leftSortKey.localeCompare(rightSortKey, 'es', {
      sensitivity: 'base',
    })

    if (surnameComparison !== 0) {
      return surnameComparison
    }

    return leftDocument.title.localeCompare(rightDocument.title, 'es', {
      sensitivity: 'base',
    })
  })
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}
