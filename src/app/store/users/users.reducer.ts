import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from '../users/users.actions'


export const reducerFeatureKey = 'reducer';

export interface State {
   users: any[],
   loading : boolean,
   error: any
}

export const initialState: State = {
  users: [],
  loading : false,
  error: null
};

export const reducer = createReducer(
  initialState,
    on(UserActions.loadUsers, (state) => ({...state,loading:      false, error:null})),
  on(UserActions.loadUsersSuccess, (state, { data }) => ({
    ...state,
    users:data.users,
    loading: true,
    error: null
  })),
  on(UserActions.loadUsersFailure, (state,{error}) => ({...state,loading: false, error})),

);
