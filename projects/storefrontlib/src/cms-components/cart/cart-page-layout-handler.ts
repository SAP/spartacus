import { Injectable } from '@angular/core';
import { CartService } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageLayoutHandler } from '../../cms-structure/page/page-layout/page-layout-handler';

@Injectable({
  providedIn: 'root',
})
export class CartPageLayoutHandler implements PageLayoutHandler {
  constructor(private cartService: CartService) {}

  handle(
    slots$: Observable<string[]>,
    pageTemplate?: string,
    section?: string
  ) {
    if (pageTemplate === 'CartPageTemplate' && !section) {
      return combineLatest([slots$, this.cartService.getActive()]).pipe(
        map(([slots, cart]) => {
          if (cart.totalItems) {
            return slots.filter(slot => slot !== 'EmptyCartMiddleContent');
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
