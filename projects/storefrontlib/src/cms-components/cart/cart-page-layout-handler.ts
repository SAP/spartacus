import { Injectable } from '@angular/core';
import { ActiveCartService, Cart, SelectiveCartService } from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageLayoutHandler } from '../../cms-structure/page/page-layout/page-layout-handler';

@Injectable({
  providedIn: 'root',
})
export class CartPageLayoutHandler implements PageLayoutHandler {
  constructor(
    protected activeCartService: ActiveCartService,
    protected selectiveCartService: SelectiveCartService
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
        this.selectiveCartService.isEnabled()
          ? this.selectiveCartService.getCart()
          : of({} as Cart),
        this.activeCartService.getLoading(),
      ]).pipe(
        map(([slots, cart, selectiveCart, loadingCart]) => {
          const exclude = (arr, args) =>
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
