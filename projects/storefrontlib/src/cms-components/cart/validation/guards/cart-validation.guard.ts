import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {
  CartValidationService,
  CartModificationList,
  SemanticPathService,
  GlobalMessageService,
  ActiveCartService,
  GlobalMessageType,
} from '@spartacus/core';
import { map } from 'rxjs/operators';
import { CartValidationWarningsStateService } from '../cart-validation-warnings-state.service';

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
    protected cartValidationWarningsStateService: CartValidationWarningsStateService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    this.cartValidationWarningsStateService.checkoutRouteActivated$.next(true);
    this.cartValidationWarningsStateService.checkForValidationResultClear$.subscribe();

    return this.cartValidationService.getCartValidationStatus().pipe(
      map((cartModificationList: CartModificationList) => {
        this.cartValidationWarningsStateService.cartValidationResult$.next(
          cartModificationList.cartModifications
        );

        if (cartModificationList?.cartModifications?.length !== 0) {
          this.globalMessageService.add(
            { key: 'validation.cartEntriesChangeDuringCheckout' },
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
