/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { CmsService } from '@spartacus/core';
import { PageLayoutHandler } from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/*
 * temporary, will be removed or fixed
 */
@Injectable({
  providedIn: 'root',
})
export class CheckoutReviewPageLayoutHandler implements PageLayoutHandler {
  constructor(
    protected activeCartService: ActiveCartFacade,
    protected cmsService: CmsService
  ) {}

  handle(
    slots$: Observable<string[]>,
    pageTemplate?: string
  ): Observable<string[]> {
    if (pageTemplate === 'MultiStepCheckoutSummaryPageTemplate') {
      return combineLatest([
        slots$,
        this.cmsService.getCurrentPage(),
        this.activeCartService.hasPickupItems(),
      ]).pipe(
        map(([slots, page, hasPickup]) => {
          const exclude = (arr: string[], args: string[]) =>
            arr.filter((item) => args.every((arg) => arg !== item));

          if (page.label !== '/checkout/review-order') {
            return exclude(slots, ['OnlyForTest', 'OnlyForTest2']);
          } else {
            return hasPickup
              ? exclude(slots, ['BodyContent'])
              : exclude(slots, ['OnlyForTest', 'OnlyForTest2']);
          }
        })
      );
    }
    return slots$;
  }
}
