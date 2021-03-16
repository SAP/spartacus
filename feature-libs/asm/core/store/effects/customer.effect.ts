import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AsmConnector } from '../../connectors/asm.connector';
import { CustomerSearchPage } from '../../models/asm.models';
import { AsmActions } from '../actions/index';

@Injectable()
export class CustomerEffects {
  @Effect()
  customerSearch$: Observable<AsmActions.CustomerAction> = this.actions$.pipe(
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
  );

  constructor(private actions$: Actions, private asmConnector: AsmConnector) {}
}
