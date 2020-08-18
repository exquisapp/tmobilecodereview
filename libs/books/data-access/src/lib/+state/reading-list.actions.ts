import { createAction, props } from '@ngrx/store';
import { Book, ReadingListItem } from '@tmo/shared/models';

export const loadReadingList = createAction('[Reading List] Load list');

export const loadReadingListSuccess = createAction(
  '[Reading List] Load list success',
  props<{ list: ReadingListItem[] }>()
);
export const loadReadingListError = createAction(
  '[Reading List] Load list error',
  props<{ error: string }>()
);

export const addToReadingList = createAction(
  '[Reading List] Add to list',
  props<{ book: Book }>()
);

export const failedAddToReadingList = createAction(
  '[Reading List] Failed add to list',
  props<{ book: Book }>()
);

export const confirmedAddToReadingList = createAction(
  '[Reading List] Confirmed add to list',
  props<{ book: Book }>()
);

export const removeFromReadingList = createAction(
  '[Reading List] Remove from list',
  props<{ item: ReadingListItem }>()
);

export const failedRemoveFromReadingList = createAction(
  '[Reading List] Failed remove from list',
  props<{ item: ReadingListItem }>()
);

export const confirmedRemoveFromReadingList = createAction(
  '[Reading List] Confirmed remove from list',
  props<{ item: ReadingListItem }>()
);

export const markFinished = createAction(
  '[Reading List] Add to finished reading list',
  props<{ item: ReadingListItem }>()
);

export const failedtoMarkFinished = createAction(
  '[Reading List] Failed add to finished reading list',
  props<{ item: ReadingListItem }>()
);

export const confirmedMarkedAsFinished = createAction(
  '[Reading List] Confirmed add to finished reading list',
  props<{ item: ReadingListItem }>()
);

export const unmarkFinished = createAction(
  '[Reading List] Remove from finished reading list',
  props<{ item: ReadingListItem }>()
);

export const failedtoUnmarkFinished = createAction(
  '[Reading List] Failed to remove from finished reading list',
  props<{ item: ReadingListItem }>()
);

export const confirmedUnmarkedAsFinished = createAction(
  '[Reading List] Confirmed removing from finished reading list',
  props<{ item: ReadingListItem }>()
);