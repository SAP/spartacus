import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { MultiCartService } from '../../cart/facade/multi-cart.service';
import { RouterState, RoutingService } from '../../routing/index';

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
              this.isCheckoutUserInCheckout(state.state?.semanticRoute)
            ) {
              if (
                response.status === 400 &&
                this.isCartNotFoundError(response)
              ) {
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
  protected isCheckoutUserInCheckout(semanticRoute: string): boolean {
    return semanticRoute.toLowerCase().startsWith('checkout');
  }

  /**
   * Checks of the error is for a cart not found, i.e. the cart doesn't exist anymore
   *
   * @param response
   */
  protected isCartNotFoundError(response: HttpErrorResponse): boolean {
    return (
      response.error?.errors?.[0]?.type === 'CartError' &&
      response.error?.errors?.[0]?.reason === 'notFound'
    );
  }

  protected getCartIdFromError(response: HttpErrorResponse): string {
    return response.error?.errors?.[0]?.subject;
  }
}
