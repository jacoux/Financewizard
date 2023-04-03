import { Action, createReducer, on } from '@ngrx/store';
import { Organization } from 'src/app/shared/types/invoice';
import * as OrgActions from './organization.actions';

export const reducerFeatureKey = 'reducer';

export interface State {
  organization: Organization | any;
  loading: boolean;
  error: any;
  status: number;
}

export const initialState: State = {
  organization: null,
  loading: false,
  error: null,
  status: 1,
};

export const reducer = createReducer(
  initialState,
  on(OrgActions.loadOrganization, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(OrgActions.loadOrganizationSuccess, (state, { data }) => ({
    ...state,
    organization: data.organization,
    loading: true,
    error: null,
    status: 1,
  })),

  on(OrgActions.setOrganizationData, (state, { data, status }) => ({
    ...state,
    organization: {
      ...state.organization,
      description: data,
    },
    loading: false,
    error: null,
    status: status,
  })),

  on(OrgActions.setType, (state, { data, status }) => ({
    ...state,
    organization: {
      ...state.organization,
      accountType: data,
    },
    status: status,
  })),

  on(OrgActions.setCompanyInfo, (state, { organization, status }) => ({
    ...state,
    organization: {
      ...state.organization,
      name: organization.name,
      companyVat: organization.companyVat,
      address: organization.address,
      employee: organization.employee,
    },
    status: status,
  })),

  on(OrgActions.createOrganizationSuccess, (state, { id }) => ({
    loading: false,
    error: null,
    organization: {
      ...state.organization,
      id: id,
    },
    status: 100000,
  })),

  on(OrgActions.setStep, (state, { status }) => ({
    // ...state,
    // organization: null,
    // loading: false,
    // error: null,
    // status: 1,
    ...state,
    status: status,
  })),

  on(OrgActions.loadOrganizationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(OrgActions.createOrganizationError, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);
