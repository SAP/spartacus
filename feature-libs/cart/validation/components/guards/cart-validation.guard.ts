import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CartValidationFacade } from '@spartacus/cart/validation/root';
import {
  SemanticPathService,
  GlobalMessageService,
  UserIdService,
  ActiveCartService,
  GlobalMessageType,
  MultiCartService,
} from '@spartacus/core';
import { map } from 'rxjs/operators';
import {CartModificationList} from "../../root";

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
    return this.cartValidationService.getCartValidationStatus().pipe(
      map((cartModificationList: CartModificationList) => {
        console.log(cartModificationList)
        if (cartModificationList?.cartModifications?.length !== 0) {
          this.globalMessageService.add(
            { key: 'cartValidationErrors.cartEntriesChangeDuringCheckout' },
            GlobalMessageType.MSG_TYPE_ERROR
          );

          // this.multiCartService.loadCart({ cartId, userId });
          this.activeCartService.reloadActiveCart();

          return this.router.parseUrl(this.semanticPathService.get('cart'));
        }
        return true;
      })
    );
  }
}
