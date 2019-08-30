import { Injectable } from '@angular/core';
import { CartService, SaveForLaterService } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageLayoutHandler } from '../../cms-structure/page/page-layout/page-layout-handler';

@Injectable()
export class CartPageLayoutHandler implements PageLayoutHandler {
  constructor(
    private cartService: CartService,
    private saveForLaterService: SaveForLaterService
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
        this.saveForLaterService.getSaveForLater(),
      ]).pipe(
        map(([slots, cart, saveForLater]) => {
          if (cart.totalItems || saveForLater.totalItems) {
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
