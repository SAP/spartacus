import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MultiCartService, RouterState, RoutingService } from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

/**
 * Interceptor that handles "Cart not found" errors while a user is in a checkout step.
 *
 * When a user doing a checkout has a "Cart not found" error, he is redirected to checkout and the cart is reloaded.
 * If a "Cart not found" error happens and the user is not on checkout, this interceptor does not perform any actions.
 */
@Injectable({ providedIn: 'root' })
export class CheckoutCartInterceptor implements HttpInterceptor {
  constructor(
    protected routingService: RoutingService,
    protected multiCartService: MultiCartService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.routingService.getRouterState().pipe(
      take(1),
      switchMap((state: RouterState) => {
        return next.handle(request).pipe(
          catchError((response: any) => {
            if (
              response instanceof HttpErrorResponse &&
              this.isUserInCheckoutRoute(state.state?.semanticRoute)
            ) {
              if (this.isCartNotFoundError(response)) {
                this.routingService.go({ cxRoute: 'cart' });

                const cartCode = this.getCartIdFromError(response);
                if (cartCode) {
                  this.multiCartService.reloadCart(cartCode);
                }
              }
            }
            return throwError(response);
          })
        );
      })
    );
  }

  /**
   * Returns true if the parameter semantic route is part of "checkout"
   * Checkout semantic routes:
   * checkout
   * checkoutPaymentType
   * CheckoutShippingAddress
   * checkoutDeliveryMode
   * checkoutPaymentDetails
   * checkoutReviewOrder
   * checkoutLogin
   * @param semanticRoute
   */
  protected isUserInCheckoutRoute(semanticRoute?: string): boolean {
    return semanticRoute?.toLowerCase().startsWith('checkout') ?? false;
  }

  /**
   * Checks of the error is for a cart not found, i.e. the cart doesn't exist anymore
   *
   * @param response
   */
  protected isCartNotFoundError(response: HttpErrorResponse): boolean {
    return (
      response.status === 400 &&
      response.error?.errors?.[0]?.type === 'CartError' &&
      response.error?.errors?.[0]?.reason === 'notFound'
    );
  }

  protected getCartIdFromError(response: HttpErrorResponse): string {
    return response.error?.errors?.[0]?.subject;
  }
}
