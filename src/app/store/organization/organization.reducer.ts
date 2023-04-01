import { Action, createReducer, on } from '@ngrx/store';
import { Organization } from 'src/app/shared/types/invoice';
import * as UserActions from './organization.actions';

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
  on(UserActions.loadOrganization, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(UserActions.loadOrganizationSuccess, (state, { data }) => ({
    ...state,
    organization: data.organization,
    loading: true,
    error: null,
    status: 1,
  })),

  on(UserActions.setOrganizationData, (state, { data, status }) => ({
    ...state,
    organization: {
      ...state.organization,
      description: data,
    },
    loading: false,
    error: null,
    status: status,
  })),

  on(UserActions.setType, (state, { data, status }) => ({
    ...state,
    organization: {
      ...state.organization,
      accountType: data,
    },
    status: status,
  })),

  on(UserActions.setCompanyInfo, (state, { organization, status }) => ({
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

  on(UserActions.createOrganization, (state, { data, status }) => ({
    ...state,
    organization: {
      ...state.organization,
      sector: data,
    },
    status: status,
  })),

  on(
    UserActions.setStep,
    UserActions.createOrganizationSucces,
    (state, { status }) => ({
      ...state,
      status: status,
    })
  ),

  on(UserActions.loadOrganizationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(UserActions.createOrganizationError, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);
