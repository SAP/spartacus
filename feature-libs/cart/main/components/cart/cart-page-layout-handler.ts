import { Injectable } from '@angular/core';
import {
  ActiveCartFacade,
  Cart,
  SelectiveCartFacade,
} from '@spartacus/cart/main/root';
import { PageLayoutHandler } from '@spartacus/storefront';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartConfigService } from '../services/cart-config.service';

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
        this.cartConfig.isSelectiveCartEnabled()
          ? this.selectiveCartService.getCart()
          : of({} as Cart),
        this.activeCartService.getLoading(),
      ]).pipe(
        map(([slots, cart, selectiveCart, loadingCart]) => {
          const exclude = (arr: string[], args: string[]) =>
            arr.filter((item) => args.every((arg) => arg !== item));
          return Object.keys(cart).length === 0 && loadingCart
            ? exclude(slots, [
                'TopContent',
                'CenterRightContentSlot',
                'EmptyCartMiddleContent',
              ])
            : cart.totalItems
            ? exclude(slots, ['EmptyCartMiddleContent'])
            : selectiveCart.totalItems
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
}
