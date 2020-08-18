import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { getReadingList, removeFromReadingList, markFinished } from '@tmo/books/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];
  readingList: ReadingListItem[];
  readingList$: Observable<ReadingListItem[]> = this.store.select(getReadingList);
  books$: Observable<ReadingListBook[]> = this.store.select(getAllBooks);

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getReadingList).subscribe(list => {
      this.readingList = list;
      console.log('lists', list)
    })
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
      console.log('bks', books)
    });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  isFinished(id) {
    /* return new Observable(observer => {
      this.readingList$.subscribe(list => {
        if (list.find(it => it.bookId === id && it.finishedDate)) {
          observer.next(true);
        } else {
          observer.next(false);
        }
      })
    }); */
    return this.readingList.find(it => it.bookId === id && it.finishedDate)
    
  }
}
