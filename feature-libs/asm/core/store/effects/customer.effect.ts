import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AsmConnector } from '../../connectors/asm.connector';
import { CustomerListsPage, CustomerSearchPage } from '../../models/asm.models';
import { AsmActions } from '../actions/index';

@Injectable()
export class CustomerEffects {
  customerLists$: Observable<AsmActions.CustomerAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(AsmActions.CUSTOMER_LISTS),
      // map((action: AsmActions.CustomerLists) => action.payload),
      switchMap(() =>
        this.asmConnector.customerLists().pipe(
          map((customerLists: CustomerListsPage) => {
            return new AsmActions.CustomerListsSuccess(customerLists);
          }),
          catchError((error) =>
            of(new AsmActions.CustomerListsFail(normalizeHttpError(error)))
          )
        )
      )
    )
  );

  customerSearch$: Observable<AsmActions.CustomerAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(AsmActions.CUSTOMER_SEARCH),
      map((action: AsmActions.CustomerSearch) => action.payload),
      switchMap((options) =>
        this.asmConnector.customerSearch(options).pipe(
          map((customerSearchResults: CustomerSearchPage) => {
            return new AsmActions.CustomerSearchSuccess(customerSearchResults);
          }),
          catchError((error) =>
            of(new AsmActions.CustomerSearchFail(normalizeHttpError(error)))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private asmConnector: AsmConnector) {}
}
