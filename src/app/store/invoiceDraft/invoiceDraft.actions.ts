import { createAction, props } from '@ngrx/store';

export const loadInvoiceDraft = createAction(
  '[Actions] Load Actionss'
);

export const loadInvoiceDraftSuccess = createAction(
  '[Actions] Load Actionss Success',
  props<{ data: any }>()
);

export const loadInvoiceDraftFailure = createAction(
  '[Actions] Load Actionss Failure',
  props<{ error: any }>()
);
