import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Response, response } from 'express';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GeneralCrudService } from 'src/app/shared/services/general-crud.service';
import { Organization } from 'src/app/shared/types/invoice';
import {
  createOrganization,
  createOrganizationSuccess,
  createOrganizationError,
} from './organization.actions';
import { getOrganization } from './organization.selectors';

@Injectable()
export class organizationEffects {
  constructor(
    private actions$: Actions,
    private objService: GeneralCrudService,
    private router: Router,
    private aService: AuthService,
    private store: Store
  ) {}

  // createOrganizationEffect$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(createOrganization),
  //     withLatestFrom(this.store.select(getOrganization)),
  //     mergeMap(([, org]) =>
  //       this.objService.AddObject(org, 'organizations').pipe(
  //         map(async (res: any) =>
  //           createOrganizationSuccess({
  //             orgId: res,
  //           })
  //         ),
  //         catchError(async (error) => {
  //           return createOrganizationError(error);
  //         })
  //       )
  //     )
  //   )
  // );

  createOrgSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createOrganizationSuccess),
      tap(({ id }) => {
        this.aService.updateUser(id);
      })
    )
  );
}
