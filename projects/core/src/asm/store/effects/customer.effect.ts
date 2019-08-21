import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { CustomerService } from '../../services/customer.service';
import { CustomerActions } from '../actions/index';
import { CustomerSearchPage } from '../../models/asm.models';

@Injectable()
export class CustomerEffects {
  @Effect()
  customerSearch$: Observable<
    CustomerActions.CustomerAction
  > = this.actions$.pipe(
    ofType(CustomerActions.CUSTOMER_SEARCH),
    map((action: CustomerActions.CustomerSearch) => action.payload),
    mergeMap(({ searchTerm }) =>
      this.customerService.search(searchTerm).pipe(
        map((customerSearchResults: CustomerSearchPage) => {
          return new CustomerActions.CustomerSearchSuccess(
            customerSearchResults
          );
        }),
        catchError(error =>
          of(
            new CustomerActions.CustomerSearchFail(makeErrorSerializable(error))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private customerService: CustomerService
  ) {}
}
