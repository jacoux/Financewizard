import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs';
import { GeneralCrudService } from 'src/app/shared/services/general-crud.service';
import {
  createOrganization,
  createOrganizationSucces,
  createOrganizationError,
} from './organization.actions';
import { getOrganization } from './organization.selectors';

@Injectable()
export class organizationEffects {
  constructor(
    private actions$: Actions,
    private objService: GeneralCrudService,
    private router: Router,
    private store: Store
  ) {}

  createOrganizationEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createOrganization),
      withLatestFrom(this.store.select(getOrganization)),
      mergeMap(([, org]) =>
        this.objService.AddObject(org, 'organizations').pipe(
          map(
            () => createOrganizationSucces({ status: 100 }),
            this.router.navigate(['dashboard'])
          ),
          catchError(async (error) => createOrganizationError({ error: error }))
        )
      )
    )
  );
}
