import { createAction, emptyProps, props } from '@ngrx/store';

export const loadInvoiceDraft = createAction('[Actions] Load Actions draft');

export const loadInvoiceDraftSuccess = createAction(
  '[Actions] Load Actions draft Success',
  props<{ data: any }>()
);

export const loadInvoiceDraftFailure = createAction(
  '[Actions] Load Actions Failure',
  props<{ error: any }>()
);

export const setInvoiceForEdit = createAction(
  '[step 1] set invoice for editing',
  props<{ data: any }>()
);

export const saveInvoice = createAction(
  '[step 1] set invoice',
  props<{ data: any }>()
);
export const saveInvoiceComplete = createAction(
  '[step 2] invoice send to db'
);

