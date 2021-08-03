import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { CartValidationFacade } from '@spartacus/cart/validation/root';
import {
  SemanticPathService,
  GlobalMessageService,
  UserIdService,
  ActiveCartService,
  GlobalMessageType,
  MultiCartService,
} from '@spartacus/core';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartValidationGuard implements CanActivate {
  constructor(
    protected cartValidationService: CartValidationFacade,
    protected semanticPathService: SemanticPathService,
    protected router: Router,
    protected globalMessageService: GlobalMessageService,
    protected userIdService: UserIdService,
    protected activeCartService: ActiveCartService,
    protected multiCartService: MultiCartService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return combineLatest([
      this.activeCartService.getActiveCartId(),
      this.userIdService.takeUserId(),
    ]).pipe(
      switchMap(([cartId, userId]) =>
        combineLatest([
          of(cartId),
          of(userId),
          this.cartValidationService.getCartModificationList(cartId, userId),
        ])
      ),
      map((data) => {
        const [cartId, userId, cartModificationList] = data;

        if (cartModificationList?.cartModifications?.length != 0) {
          this.globalMessageService.add(
            { key: 'cartValidationErrors.cartEntriesChangeDuringCheckout' },
            GlobalMessageType.MSG_TYPE_ERROR
          );

          this.multiCartService.loadCart({ cartId, userId });

          return this.router.parseUrl(this.semanticPathService.get('cart'));
        }
        return true;
      })
    );
  }
}
