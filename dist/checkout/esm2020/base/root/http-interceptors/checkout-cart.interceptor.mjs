/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpErrorResponse, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/cart/base/root";
/**
 * Interceptor that handles "Cart not found" errors while a user is in a checkout step.
 *
 * When a user doing a checkout has a "Cart not found" error, he is redirected to checkout and the cart is reloaded.
 * If a "Cart not found" error happens and the user is not on checkout, this interceptor does not perform any actions.
 */
export class CheckoutCartInterceptor {
    constructor(routingService, multiCartFacade) {
        this.routingService = routingService;
        this.multiCartFacade = multiCartFacade;
    }
    intercept(request, next) {
        return this.routingService.getRouterState().pipe(take(1), switchMap((state) => {
            return next.handle(request).pipe(catchError((response) => {
                if (response instanceof HttpErrorResponse &&
                    this.isUserInCheckoutRoute(state.state?.semanticRoute)) {
                    if (this.isCartNotFoundError(response)) {
                        this.routingService.go({ cxRoute: 'cart' });
                        const cartCode = this.getCartIdFromError(response);
                        if (cartCode) {
                            this.multiCartFacade.reloadCart(cartCode);
                        }
                    }
                }
                return throwError(response);
            }));
        }));
    }
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
    isUserInCheckoutRoute(semanticRoute) {
        return semanticRoute?.toLowerCase().startsWith('checkout') ?? false;
    }
    /**
     * Checks of the error is for a cart not found, i.e. the cart doesn't exist anymore
     *
     * @param response
     */
    isCartNotFoundError(response) {
        return (response.status === 400 &&
            response.error?.errors?.[0]?.type === 'CartError' &&
            response.error?.errors?.[0]?.reason === 'notFound');
    }
    getCartIdFromError(response) {
        return response.error?.errors?.[0]?.subject;
    }
}
CheckoutCartInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCartInterceptor, deps: [{ token: i1.RoutingService }, { token: i2.MultiCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutCartInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCartInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCartInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i2.MultiCartFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtY2FydC5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iYXNlL3Jvb3QvaHR0cC1pbnRlcmNlcHRvcnMvY2hlY2tvdXQtY2FydC5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLGlCQUFpQixHQUtsQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUU3RDs7Ozs7R0FLRztBQUVILE1BQU0sT0FBTyx1QkFBdUI7SUFDbEMsWUFDWSxjQUE4QixFQUM5QixlQUFnQztRQURoQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQ3pDLENBQUM7SUFFSixTQUFTLENBQ1AsT0FBNkIsRUFDN0IsSUFBaUI7UUFFakIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FDOUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLFNBQVMsQ0FBQyxDQUFDLEtBQWtCLEVBQUUsRUFBRTtZQUMvQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUM5QixVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDdEIsSUFDRSxRQUFRLFlBQVksaUJBQWlCO29CQUNyQyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsRUFDdEQ7b0JBQ0EsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLEVBQUU7d0JBQ3RDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7d0JBRTVDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDbkQsSUFBSSxRQUFRLEVBQUU7NEJBQ1osSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7eUJBQzNDO3FCQUNGO2lCQUNGO2dCQUNELE9BQU8sVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUNILENBQUM7UUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ08scUJBQXFCLENBQUMsYUFBc0I7UUFDcEQsT0FBTyxhQUFhLEVBQUUsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssQ0FBQztJQUN0RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNPLG1CQUFtQixDQUFDLFFBQTJCO1FBQ3ZELE9BQU8sQ0FDTCxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUc7WUFDdkIsUUFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEtBQUssV0FBVztZQUNqRCxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sS0FBSyxVQUFVLENBQ25ELENBQUM7SUFDSixDQUFDO0lBRVMsa0JBQWtCLENBQUMsUUFBMkI7UUFDdEQsT0FBTyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQztJQUM5QyxDQUFDOztvSEFsRVUsdUJBQXVCO3dIQUF2Qix1QkFBdUIsY0FEVixNQUFNOzJGQUNuQix1QkFBdUI7a0JBRG5DLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgSHR0cEVycm9yUmVzcG9uc2UsXG4gIEh0dHBFdmVudCxcbiAgSHR0cEhhbmRsZXIsXG4gIEh0dHBJbnRlcmNlcHRvcixcbiAgSHR0cFJlcXVlc3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE11bHRpQ2FydEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgUm91dGVyU3RhdGUsIFJvdXRpbmdTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBJbnRlcmNlcHRvciB0aGF0IGhhbmRsZXMgXCJDYXJ0IG5vdCBmb3VuZFwiIGVycm9ycyB3aGlsZSBhIHVzZXIgaXMgaW4gYSBjaGVja291dCBzdGVwLlxuICpcbiAqIFdoZW4gYSB1c2VyIGRvaW5nIGEgY2hlY2tvdXQgaGFzIGEgXCJDYXJ0IG5vdCBmb3VuZFwiIGVycm9yLCBoZSBpcyByZWRpcmVjdGVkIHRvIGNoZWNrb3V0IGFuZCB0aGUgY2FydCBpcyByZWxvYWRlZC5cbiAqIElmIGEgXCJDYXJ0IG5vdCBmb3VuZFwiIGVycm9yIGhhcHBlbnMgYW5kIHRoZSB1c2VyIGlzIG5vdCBvbiBjaGVja291dCwgdGhpcyBpbnRlcmNlcHRvciBkb2VzIG5vdCBwZXJmb3JtIGFueSBhY3Rpb25zLlxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIENoZWNrb3V0Q2FydEludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgbXVsdGlDYXJ0RmFjYWRlOiBNdWx0aUNhcnRGYWNhZGVcbiAgKSB7fVxuXG4gIGludGVyY2VwdChcbiAgICByZXF1ZXN0OiBIdHRwUmVxdWVzdDx1bmtub3duPixcbiAgICBuZXh0OiBIdHRwSGFuZGxlclxuICApOiBPYnNlcnZhYmxlPEh0dHBFdmVudDx1bmtub3duPj4ge1xuICAgIHJldHVybiB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdldFJvdXRlclN0YXRlKCkucGlwZShcbiAgICAgIHRha2UoMSksXG4gICAgICBzd2l0Y2hNYXAoKHN0YXRlOiBSb3V0ZXJTdGF0ZSkgPT4ge1xuICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxdWVzdCkucGlwZShcbiAgICAgICAgICBjYXRjaEVycm9yKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICByZXNwb25zZSBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlICYmXG4gICAgICAgICAgICAgIHRoaXMuaXNVc2VySW5DaGVja291dFJvdXRlKHN0YXRlLnN0YXRlPy5zZW1hbnRpY1JvdXRlKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmlzQ2FydE5vdEZvdW5kRXJyb3IocmVzcG9uc2UpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0aW5nU2VydmljZS5nbyh7IGN4Um91dGU6ICdjYXJ0JyB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGNhcnRDb2RlID0gdGhpcy5nZXRDYXJ0SWRGcm9tRXJyb3IocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGlmIChjYXJ0Q29kZSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5tdWx0aUNhcnRGYWNhZGUucmVsb2FkQ2FydChjYXJ0Q29kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihyZXNwb25zZSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHBhcmFtZXRlciBzZW1hbnRpYyByb3V0ZSBpcyBwYXJ0IG9mIFwiY2hlY2tvdXRcIlxuICAgKiBDaGVja291dCBzZW1hbnRpYyByb3V0ZXM6XG4gICAqIGNoZWNrb3V0XG4gICAqIGNoZWNrb3V0UGF5bWVudFR5cGVcbiAgICogQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NcbiAgICogY2hlY2tvdXREZWxpdmVyeU1vZGVcbiAgICogY2hlY2tvdXRQYXltZW50RGV0YWlsc1xuICAgKiBjaGVja291dFJldmlld09yZGVyXG4gICAqIGNoZWNrb3V0TG9naW5cbiAgICogQHBhcmFtIHNlbWFudGljUm91dGVcbiAgICovXG4gIHByb3RlY3RlZCBpc1VzZXJJbkNoZWNrb3V0Um91dGUoc2VtYW50aWNSb3V0ZT86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBzZW1hbnRpY1JvdXRlPy50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoJ2NoZWNrb3V0JykgPz8gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIG9mIHRoZSBlcnJvciBpcyBmb3IgYSBjYXJ0IG5vdCBmb3VuZCwgaS5lLiB0aGUgY2FydCBkb2Vzbid0IGV4aXN0IGFueW1vcmVcbiAgICpcbiAgICogQHBhcmFtIHJlc3BvbnNlXG4gICAqL1xuICBwcm90ZWN0ZWQgaXNDYXJ0Tm90Rm91bmRFcnJvcihyZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgcmVzcG9uc2Uuc3RhdHVzID09PSA0MDAgJiZcbiAgICAgIHJlc3BvbnNlLmVycm9yPy5lcnJvcnM/LlswXT8udHlwZSA9PT0gJ0NhcnRFcnJvcicgJiZcbiAgICAgIHJlc3BvbnNlLmVycm9yPy5lcnJvcnM/LlswXT8ucmVhc29uID09PSAnbm90Rm91bmQnXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRDYXJ0SWRGcm9tRXJyb3IocmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gcmVzcG9uc2UuZXJyb3I/LmVycm9ycz8uWzBdPy5zdWJqZWN0O1xuICB9XG59XG4iXX0=