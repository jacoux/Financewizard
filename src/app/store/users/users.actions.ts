import { createAction, props } from '@ngrx/store';

export const loadUsers = createAction(
  '[Actions] Load Actionss'
);

export const loadUsersSuccess = createAction(
  '[Actions] Load Actionss Success',
  props<{ data: any }>()
);

export const loadUsersFailure = createAction(
  '[Actions] Load Actionss Failure',
  props<{ error: any }>()
);

export const setUser = createAction(
  '[Actions] set user Actionss',
  props<{ data: any }>()
);
