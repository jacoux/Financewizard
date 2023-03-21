import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInvoiceDraftReducer from './invoiceDraft.reducer';

export const getInvoiceDraftState = createFeatureSelector<fromInvoiceDraftReducer.State>('InvoiceDraft');
export const loading = createSelector(
    getInvoiceDraftState,
    (state: fromInvoiceDraftReducer.State) => state.loading
);
export const getInvoiceDraft = createSelector(
    getInvoiceDraftState,
    (state: fromInvoiceDraftReducer.State) => state.invoiceDraft
);