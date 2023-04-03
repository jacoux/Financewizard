import { createAction, props } from '@ngrx/store';
import { AccountType, Organization } from 'src/app/shared/types/invoice';

export const loadOrganization = createAction('[Actions] Load Actionss');

export const loadOrganizationSuccess = createAction(
  '[Actions] Load Actionss Success',
  props<{ data: any }>()
);

export const createOrganization = createAction('[Actions] create Organization');

export const createOrganizationSuccess = createAction(
  '[Actions] create Organization success',
  props<{ id: string }>()
);

export const createOrganizationError = createAction(
  '[Actions] create Organization error',
  props<{ error: any }>()
);

export const loadOrganizationFailure = createAction(
  '[Actions] Load Actionss Failure',
  props<{ error: any }>()
);

export const loadsOrganizationWizardStep = createAction(
  '[Actions] load Organization step',
  props<{ status: number }>()
);

export const setCompanyInfo = createAction(
  '[Actions] set company info',
  props<{ organization: Organization; status: number }>()
);

export const setOrganizationData = createAction(
  '[Actions] set Organization step & description',
  props<{ status: number; data: any }>()
);

export const setStep = createAction(
  '[Actions] set Organization step',
  props<{ status: number }>()
);

export const setType = createAction(
  '[Actions] set Organization type',
  props<{ status: number; data: any }>()
);
