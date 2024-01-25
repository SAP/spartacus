/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CartConfigService, isEmpty } from '@spartacus/cart/base/core';
import {
  ActiveCartFacade,
  Cart,
  SelectiveCartFacade,
} from '@spartacus/cart/base/root';
import { PageLayoutHandler } from '@spartacus/storefront';
import { combineLatest, Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartPageLayoutHandler implements PageLayoutHandler {
  constructor(
    protected activeCartService: ActiveCartFacade,
    protected selectiveCartService: SelectiveCartFacade,
    protected cartConfig: CartConfigService
  ) {}

  handle(
    slots$: Observable<string[]>,
    pageTemplate?: string,
    section?: string
  ) {
    if (pageTemplate === 'CartPageTemplate' && !section) {
      return combineLatest([
        slots$,
        this.activeCartService.getActive(),
        this.getSelectiveCart(),
        this.activeCartService.getLoading(),
      ]).pipe(
        map(([slots, cart, selectiveCart, loadingCart]) => {
          const exclude = (arr: string[], args: string[]) =>
            arr.filter((item) => args.every((arg) => arg !== item));
          return isEmpty(cart) && loadingCart
            ? exclude(slots, [
                'TopContent',
                'CenterRightContentSlot',
                'EmptyCartMiddleContent',
              ])
            : cart.totalItems
            ? exclude(slots, ['EmptyCartMiddleContent'])
            : selectiveCart?.totalItems
            ? exclude(slots, [
                'EmptyCartMiddleContent',
                'CenterRightContentSlot',
              ])
            : exclude(slots, ['TopContent', 'CenterRightContentSlot']);
        })
      );
    }
    return slots$;
  }

  protected getSelectiveCart(): Observable<Cart | null> {
    return this.cartConfig.isSelectiveCartEnabled()
      ? this.selectiveCartService.getCart().pipe(startWith(null))
      : of({} as Cart);
  }
}
