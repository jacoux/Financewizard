import { createAction, props } from '@ngrx/store';

export const loadInvoiceDraft = createAction('[Actions] Load Actionss draft');

export const loadInvoiceDraftSuccess = createAction(
  '[Actions] Load Actionss draft Success',
  props<{ data: any }>()
);

export const loadInvoiceDraftFailure = createAction(
  '[Actions] Load Actionss Failure',
  props<{ error: any }>()
);

export const saveInvoice = createAction(
  '[step 1] set invoice',
  props<{ data: any }>()
);

