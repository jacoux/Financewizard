import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './invoiceDraft.actions'


export const reducerFeatureKey = 'reducer';

export interface State {
   invoiceDraft: any[],
   loading : boolean,
   error: any
}

export const initialState: State = {
  invoiceDraft: [],
  loading : false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(UserActions.loadInvoiceDraft, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(UserActions.loadInvoiceDraftSuccess, (state, { data }) => ({
    ...state,
    invoiceDraft: data,
    loading: true,
    error: null,
  })),

  on(UserActions.saveInvoice, (state, { data }) => ({
    ...state,
    invoiceDraft: data,
    loading: true,
    error: null,
  })),
  on(UserActions.saveInvoiceComplete, (state) => ({
    ...state,
    invoiceDraft: [],
    loading: true,
    error: null,
  })),

  on(UserActions.loadInvoiceDraftFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
