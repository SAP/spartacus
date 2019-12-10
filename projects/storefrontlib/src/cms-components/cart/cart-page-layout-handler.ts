import { Injectable } from '@angular/core';
import { CartService, SelectiveCartService } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageLayoutHandler } from '../../cms-structure/page/page-layout/page-layout-handler';

@Injectable({
  providedIn: 'root',
})
export class CartPageLayoutHandler implements PageLayoutHandler {
  constructor(
    private cartService: CartService,
    private selectiveCartService: SelectiveCartService
  ) {}

  handle(
    slots$: Observable<string[]>,
    pageTemplate?: string,
    section?: string
  ) {
    if (pageTemplate === 'CartPageTemplate' && !section) {
      return combineLatest([
        slots$,
        this.cartService.getActive(),
        this.selectiveCartService.getCart(),
      ]).pipe(
        map(([slots, cart, selectiveCart]) => {
          if (cart.totalItems) {
            return slots.filter(slot => slot !== 'EmptyCartMiddleContent');
          } else if (selectiveCart.totalItems) {
            return slots.filter(
              slot =>
                slot !== 'EmptyCartMiddleContent' &&
                slot !== 'CenterRightContentSlot'
            );
          } else {
            return slots.filter(
              slot => slot !== 'TopContent' && slot !== 'CenterRightContentSlot'
            );
          }
        })
      );
    }
    return slots$;
  }
}
