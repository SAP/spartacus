import { RoutingService, WindowRef, AuthService } from '@spartacus/core';
import { Injectable } from '@angular/core';
import {
  AsmDeepLinkParameters,
  AsmEnablerService,
  CsAgentAuthService,
} from '@spartacus/asm/root';
import { combineLatest, BehaviorSubject, Observable } from 'rxjs';

// interface CartTypeKey {
//   [key: string]: string;
// }
//
// export const CART_TYPE_KEY: CartTypeKey = {
//   active: 'asm.activeCartAlertInfo',
//   inactive: 'asm.saveInactiveCartAlertInfo',
// };

@Injectable({
  providedIn: 'root',
})
export class AsmDeepLinkService {
  protected searchparam: URLSearchParams;
  protected showDeeplinkCartInfoAlert$: BehaviorSubject<boolean> =
    new BehaviorSubject(false);
  isEmulatedByDeepLink$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    protected routingService: RoutingService,
    protected winRef: WindowRef,
    protected asmEnablerService: AsmEnablerService,
    protected authService: AuthService,
    protected csAgentAuthService: CsAgentAuthService
  ) {
    this.searchparam = new URLSearchParams(this.winRef?.location?.search);
  }

  /**
   * check whether try to emulate customer from deeplink
   */
  isEmulateInURL(): boolean {
    return this.asmEnablerService?.isEmulateInURL() || false;
  }

  getSearchParameter(key: string): string | null {
    return this.searchparam.get(key);
  }

  isEmulatedByDeepLink(): BehaviorSubject<boolean> {
    return this.isEmulatedByDeepLink$;
  }

  setEmulatedByDeepLink(emulated: boolean) {
    this.isEmulatedByDeepLink$.next(emulated);
  }

  setShowDeeplinkCartInfoAlert(display: boolean) {
    this.showDeeplinkCartInfoAlert$.next(display);
  }

  shouldShowDeeplinkCartInfoAlert(): Observable<boolean> {
    return this.showDeeplinkCartInfoAlert$;
  }

  handleDeepLinkParamsAfterStartSession(
    parameters = this.getParamsInUrl()
  ): void {
    console.log(parameters);

    if (parameters.cartType === 'inactive') {
    } else if (parameters.cartType === 'active') {
      this.routingService.go({ cxRoute: 'cart' });
    } else if (parameters.cartType === 'saved' && parameters.cartId) {
      // Navigate to saved cart
      this.routingService.go('my-account/saved-cart/' + parameters.cartId);
    } else if (parameters.orderId) {
      // Navigate to order details
      this.routingService.go({
        cxRoute: 'orderDetails',
        params: { code: parameters.orderId },
      });
    } else if (parameters.ticketId) {
      // Navigate to support ticket details
      this.routingService.go({
        cxRoute: 'supportTicketDetails',
        params: { ticketCode: parameters.ticketId },
      });
    }
  }

  // TODO: remove any type
  getParamsInUrl(): AsmDeepLinkParameters | any {
    return {
      customerId: this.getSearchParameter('customerId'),
      orderId: this.getSearchParameter('orderId'),
      ticketId: this.getSearchParameter('ticketId'),
      cartId: this.getSearchParameter('cartId'),
      cartType: this.getSearchParameter('cartType'),
    };
  }

  /**
   * When agent is logged in and deep link has customerID,
   * call logout if has customer emulated(userLoggedin) but not emulated by deep link.
   * call startSessionWithParameters
   */
  subscribeForDeeplink() {
    if (this.isEmulateInURL()) {
      //Always route to home page to avoid 404
      this.routingService.go('/');
    }

    // this.deeplinkCartAlertKey = CART_TYPE_KEY[parameters.cartType || ''];

    return combineLatest([
      this.csAgentAuthService.isCustomerSupportAgentLoggedIn(),
      this.authService.isUserLoggedIn(),
      this.isEmulatedByDeepLink(),
    ]);
  }
}
