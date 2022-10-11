import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerSearchPage } from '@spartacus/asm/root';
import { normalizeHttpError } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AsmConnector } from '../../connectors/asm.connector';
import { AsmActions } from '../actions/index';

@Injectable()
export class CustomerEffects {
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

  customer360Data$: Observable<AsmActions.CustomerAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(AsmActions.CUSTOMER_360_GET),
      map((action: AsmActions.Customer360Get) => action.payload),
      switchMap((request) =>
        this.asmConnector.getCustomer360Data(request).pipe(
          map((customer360Response: unknown) => {
            return new AsmActions.Customer360GetSuccess(customer360Response);
          }),
          catchError((error) =>
            of(new AsmActions.Customer360GetFail(normalizeHttpError(error)))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private asmConnector: AsmConnector) {}
}
