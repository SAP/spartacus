/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { LoggerService } from '../../../logger';
import { BundleActions } from '../actions/index';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of, switchMap } from 'rxjs';
import { ProductSearchPage } from '@spartacus/core';

@Injectable()
export class BundleProductListEffects {
  protected logger = inject(LoggerService);

  // getProducts$: Observable<
  //   | BundleActions.GetBundleProductsSucceed
  //   | BundleActions.GetBundleProductsFailed
  // > = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(BundleActions.GET_BUNDLE_PRODUCTS),
  //     switchMap((action: BundleActions.GetBundleProducts) => {
  //       return of(
  //         new BundleActions.GetBundleProductsSucceed()
  //       );
  //     })
  //   )
  // );
  constructor(private actions$: Actions) {}
}
