import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { MultiCartFacade } from '@spartacus/cart/base/root';
import { RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Interceptor that handles "Cart not found" errors while a user is in a checkout step.
 *
 * When a user doing a checkout has a "Cart not found" error, he is redirected to checkout and the cart is reloaded.
 * If a "Cart not found" error happens and the user is not on checkout, this interceptor does not perform any actions.
 */
export declare class CheckoutCartInterceptor implements HttpInterceptor {
    protected routingService: RoutingService;
    protected multiCartFacade: MultiCartFacade;
    constructor(routingService: RoutingService, multiCartFacade: MultiCartFacade);
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>;
    /**
     * Returns true if the parameter semantic route is part of "checkout"
     * Checkout semantic routes:
     * checkout
     * checkoutPaymentType
     * CheckoutDeliveryAddress
     * checkoutDeliveryMode
     * checkoutPaymentDetails
     * checkoutReviewOrder
     * checkoutLogin
     * @param semanticRoute
     */
    protected isUserInCheckoutRoute(semanticRoute?: string): boolean;
    /**
     * Checks of the error is for a cart not found, i.e. the cart doesn't exist anymore
     *
     * @param response
     */
    protected isCartNotFoundError(response: HttpErrorResponse): boolean;
    protected getCartIdFromError(response: HttpErrorResponse): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutCartInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutCartInterceptor>;
}
