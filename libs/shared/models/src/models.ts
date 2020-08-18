export interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  publisher?: string;
  publishedDate?: string;
  coverUrl?: string;
}

export interface ReadingListItem extends Book/* Omit<Book, 'id'> */ {
  // id: string;
  finished?: boolean;
  finishedDate?: string;
}
