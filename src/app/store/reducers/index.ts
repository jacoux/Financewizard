import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromUserReducer from './../users/users.reducer';
import * as fromInvoiceDraftReducer from './../invoiceDraft/invoiceDraft.reducer';
import { environment } from '../../../environments/environment';


export interface State {
  users : fromUserReducer.State
  invoiceDraft : fromInvoiceDraftReducer.State
}

export const reducers: ActionReducerMap<State> = {
  users: fromUserReducer.reducer,
  invoiceDraft: fromInvoiceDraftReducer.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
