import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromUserReducer from './../users/users.reducer';
import * as fromInvoiceDraftReducer from './../invoiceDraft/invoiceDraft.reducer';
import * as fromOrganizationReducer from './../organization/organization.reducer';
import { localStorageSyncReducer } from 'src/app/app.module';

export interface State {
  users: fromUserReducer.State;
  invoiceDraft: fromInvoiceDraftReducer.State;
  organization: fromOrganizationReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  users: fromUserReducer.reducer,
  invoiceDraft: fromInvoiceDraftReducer.reducer,
  organization: fromOrganizationReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = [localStorageSyncReducer];
