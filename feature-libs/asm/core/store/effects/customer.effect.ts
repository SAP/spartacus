/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerSearchPage } from '@spartacus/asm/root';
import { LoggerService, normalizeHttpError } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AsmConnector } from '../../connectors/asm.connector';
import { AsmActions } from '../actions/index';

@Injectable()
export class CustomerEffects {
  protected logger = inject(LoggerService);

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
            of(
              new AsmActions.CustomerSearchFail(
                normalizeHttpError(error, this.logger)
              )
            )
          )
        )
      )
    )
  );

  customerListCustomersSearch$: Observable<AsmActions.CustomerAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(AsmActions.CUSTOMER_LIST_CUSTOMERS_SEARCH),
        map((action: AsmActions.CustomerListCustomersSearch) => action.payload),
        switchMap((options) =>
          this.asmConnector.customerSearch(options).pipe(
            map((customerListCustomersSearchResults: CustomerSearchPage) => {
              return new AsmActions.CustomerListCustomersSearchSuccess(
                customerListCustomersSearchResults
              );
            }),
            catchError((error) =>
              of(
                new AsmActions.CustomerListCustomersSearchFail(
                  normalizeHttpError(error, this.logger)
                )
              )
            )
          )
        )
      )
    );

  constructor(private actions$: Actions, private asmConnector: AsmConnector) {}
}
