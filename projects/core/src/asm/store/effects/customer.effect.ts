import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { AsmConnector } from '../../connectors/asm.connector';
import { CustomerSearchPage } from '../../models/asm.models';
import { AsmActions } from '../actions/index';

@Injectable()
export class CustomerEffects {
  @Effect()
  customerSearch$: Observable<AsmActions.CustomerAction> = this.actions$.pipe(
    ofType(AsmActions.CUSTOMER_SEARCH),
    map((action: AsmActions.CustomerSearch) => action.payload),
    mergeMap(options =>
      this.asmConnector.customerSearch(options).pipe(
        map((customerSearchResults: CustomerSearchPage) => {
          return new AsmActions.CustomerSearchSuccess(customerSearchResults);
        }),
        catchError(error =>
          of(new AsmActions.CustomerSearchFail(makeErrorSerializable(error)))
        )
      )
    )
  );

  constructor(private actions$: Actions, private asmConnector: AsmConnector) {}
}
