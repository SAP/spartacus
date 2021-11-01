import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  CartValidationService,
  SemanticPathService,
  GlobalMessageService,
  ActiveCartService,
  GlobalMessageType,
  CartConfigService,
} from '@spartacus/core';
import { map, withLatestFrom } from 'rxjs/operators';
import { CartValidationStateService } from '../cart-validation-state.service';

@Injectable({
  providedIn: 'root',
})
export class CartValidationGuard implements CanActivate {
  constructor(
    protected cartValidationService: CartValidationService,
    protected semanticPathService: SemanticPathService,
    protected router: Router,
    protected globalMessageService: GlobalMessageService,
    protected activeCartService: ActiveCartService,
    protected cartValidationStateService: CartValidationStateService,
    protected cartConfigService: CartConfigService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return !this.cartConfigService.isCartValidationEnabled()
      ? of(true)
      : this.cartValidationService.validateCart().pipe(
          withLatestFrom(this.activeCartService.getEntries()),
          map(([cartModificationList, cartEntries]) => {
            this.cartValidationStateService.updateValidationResultAndRoutingId(
              cartModificationList?.cartModifications
            );

            if (cartModificationList?.cartModifications?.length !== 0) {
              let validationResultMessage;

              if (
                cartEntries.length === 1 &&
                cartEntries[0].product.code ===
                  cartModificationList?.cartModifications[0].entry.product.code
              ) {
                validationResultMessage = {
                  key: 'validation.cartEntryRemoved',
                  params: {
                    name: cartModificationList?.cartModifications[0].entry
                      .product.name,
                  },
                };
              } else {
                validationResultMessage = {
                  key: 'validation.cartEntriesChangeDuringCheckout',
                };
              }
              this.globalMessageService.add(
                validationResultMessage,
                GlobalMessageType.MSG_TYPE_ERROR
              );
              this.activeCartService.reloadActiveCart();
              return this.router.parseUrl(this.semanticPathService.get('cart'));
            }

            return true;
          })
        );
  }
}
