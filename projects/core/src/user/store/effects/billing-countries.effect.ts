/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CountryType } from '../../../model/address.model';
import { SiteConnector } from '../../../site-context/connectors/site.connector';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { UserActions } from '../actions/index';

@Injectable()
export class BillingCountriesEffect {
  loadBillingCountries$: Observable<UserActions.BillingCountriesAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.LOAD_BILLING_COUNTRIES),
        switchMap(() => {
          return this.siteConnector.getCountries(CountryType.BILLING).pipe(
            map(
              (countries) =>
                new UserActions.LoadBillingCountriesSuccess(countries)
            ),
            catchError((error) =>
              of(
                new UserActions.LoadBillingCountriesFail(
                  normalizeHttpError(error)
                )
              )
            )
          );
        })
      )
    );

  constructor(
    private actions$: Actions,
    private siteConnector: SiteConnector
  ) {}
}
