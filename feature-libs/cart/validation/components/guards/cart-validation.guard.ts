import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CartValidationFacade } from '@spartacus/cart/validation/root';
import {
  UserIdService,
  ActiveCartService,
  SemanticPathService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartValidationGuard implements CanActivate {
  constructor(
    protected cartValidationService: CartValidationFacade,
    protected userIdService: UserIdService,
    protected activeCartService: ActiveCartService,
    protected semanticPathService: SemanticPathService,
    protected router: Router,
    protected globalMessageService: GlobalMessageService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.cartValidationService.getCartModificationList().pipe(
      map((cartModificationList) => {
        if (cartModificationList?.cartModifications?.length != 0) {
          this.globalMessageService.add(
            { key: 'cartValidationErrors.cartEntriesChangeDuringCheckout' },
            GlobalMessageType.MSG_TYPE_ERROR
          );
          return this.router.parseUrl(this.semanticPathService.get('cart'));
        }
        return true;
      })
    );
  }
}
