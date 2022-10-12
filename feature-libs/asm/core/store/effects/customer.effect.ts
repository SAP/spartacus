/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AsmCustomer360Response } from '@spartacus/asm/root';
import { normalizeHttpError } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AsmConnector } from '../../connectors/asm.connector';
import { CustomerSearchPage } from '../../models/asm.models';
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
      switchMap((params) =>
        this.asmConnector.getCustomer360Data(...params).pipe(
          map((customer360Response: AsmCustomer360Response) => {
            return new AsmActions.Customer360GetSuccess(customer360Response);
          }),
          catchError((error) =>
            of(new AsmActions.Customer360GetFail(normalizeHttpError(error)))
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
                  normalizeHttpError(error)
                )
              )
            )
          )
        )
      )
    );

  constructor(private actions$: Actions, private asmConnector: AsmConnector) {}
}
