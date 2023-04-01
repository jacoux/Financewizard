import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrganizationReducer from './organization.reducer';

export const getorganizationState = createFeatureSelector<fromOrganizationReducer.State>('organization');
export const loading = createSelector(getorganizationState,(state: fromOrganizationReducer.State) => state.loading);
export const getOrganization = createSelector(getorganizationState, (state: fromOrganizationReducer.State) => state.organization);
export const getOrganizationStatus = createSelector(getorganizationState, (state: fromOrganizationReducer.State) => state.status);