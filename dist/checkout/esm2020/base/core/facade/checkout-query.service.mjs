/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CheckoutQueryReloadEvent, CheckoutQueryResetEvent, } from '@spartacus/checkout/base/root';
import { OCC_USER_ID_ANONYMOUS, } from '@spartacus/core';
import { combineLatest } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/core";
import * as i3 from "../connectors/checkout/checkout.connector";
export class CheckoutQueryService {
    /**
     * Returns the reload events for the checkout query.
     */
    getCheckoutQueryReloadEvents() {
        return [CheckoutQueryReloadEvent];
    }
    /**
     * Returns the reset events for the checkout query.
     */
    getCheckoutQueryResetEvents() {
        return [CheckoutQueryResetEvent];
    }
    constructor(activeCartFacade, userIdService, queryService, checkoutConnector) {
        this.activeCartFacade = activeCartFacade;
        this.userIdService = userIdService;
        this.queryService = queryService;
        this.checkoutConnector = checkoutConnector;
        this.checkoutQuery$ = this.queryService.create(() => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.checkoutConnector.getCheckoutDetails(userId, cartId))), {
            reloadOn: this.getCheckoutQueryReloadEvents(),
            resetOn: this.getCheckoutQueryResetEvents(),
        });
    }
    /**
     * Performs the necessary checkout preconditions.
     */
    checkoutPreconditions() {
        return combineLatest([
            this.userIdService.takeUserId(),
            this.activeCartFacade.takeActiveCartId(),
            this.activeCartFacade.isGuestCart(),
        ]).pipe(take(1), map(([userId, cartId, isGuestCart]) => {
            if (!userId ||
                !cartId ||
                (userId === OCC_USER_ID_ANONYMOUS && !isGuestCart)) {
                throw new Error('Checkout conditions not met');
            }
            return [userId, cartId];
        }));
    }
    getCheckoutDetailsState() {
        return this.checkoutQuery$.getState();
    }
}
CheckoutQueryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutQueryService, deps: [{ token: i1.ActiveCartFacade }, { token: i2.UserIdService }, { token: i2.QueryService }, { token: i3.CheckoutConnector }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutQueryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutQueryService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutQueryService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.UserIdService }, { type: i2.QueryService }, { type: i3.CheckoutConnector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtcXVlcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iYXNlL2NvcmUvZmFjYWRlL2NoZWNrb3V0LXF1ZXJ5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUVMLHdCQUF3QixFQUN4Qix1QkFBdUIsR0FFeEIsTUFBTSwrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLEVBQ0wscUJBQXFCLEdBTXRCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLGFBQWEsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFJdEQsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQjs7T0FFRztJQUNPLDRCQUE0QjtRQUNwQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0Q7O09BRUc7SUFDTywyQkFBMkI7UUFDbkMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDbkMsQ0FBQztJQWdCRCxZQUNZLGdCQUFrQyxFQUNsQyxhQUE0QixFQUM1QixZQUEwQixFQUMxQixpQkFBb0M7UUFIcEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBbEJ0QyxtQkFBYyxHQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FDdEIsR0FBRyxFQUFFLENBQ0gsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUMvQixTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLENBQzdCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQzFELENBQ0YsRUFDSDtZQUNFLFFBQVEsRUFBRSxJQUFJLENBQUMsNEJBQTRCLEVBQUU7WUFDN0MsT0FBTyxFQUFFLElBQUksQ0FBQywyQkFBMkIsRUFBRTtTQUM1QyxDQUNGLENBQUM7SUFPRCxDQUFDO0lBRUo7O09BRUc7SUFDTyxxQkFBcUI7UUFDN0IsT0FBTyxhQUFhLENBQUM7WUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFO1lBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUU7U0FDcEMsQ0FBQyxDQUFDLElBQUksQ0FDTCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsSUFDRSxDQUFDLE1BQU07Z0JBQ1AsQ0FBQyxNQUFNO2dCQUNQLENBQUMsTUFBTSxLQUFLLHFCQUFxQixJQUFJLENBQUMsV0FBVyxDQUFDLEVBQ2xEO2dCQUNBLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQzthQUNoRDtZQUNELE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCx1QkFBdUI7UUFDckIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3hDLENBQUM7O2lIQTVEVSxvQkFBb0I7cUhBQXBCLG9CQUFvQjsyRkFBcEIsb0JBQW9CO2tCQURoQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZlQ2FydEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQ2hlY2tvdXRRdWVyeUZhY2FkZSxcbiAgQ2hlY2tvdXRRdWVyeVJlbG9hZEV2ZW50LFxuICBDaGVja291dFF1ZXJ5UmVzZXRFdmVudCxcbiAgQ2hlY2tvdXRTdGF0ZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jaGVja291dC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgT0NDX1VTRVJfSURfQU5PTllNT1VTLFxuICBRdWVyeSxcbiAgUXVlcnlOb3RpZmllcixcbiAgUXVlcnlTZXJ2aWNlLFxuICBRdWVyeVN0YXRlLFxuICBVc2VySWRTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDaGVja291dENvbm5lY3RvciB9IGZyb20gJy4uL2Nvbm5lY3RvcnMvY2hlY2tvdXQvY2hlY2tvdXQuY29ubmVjdG9yJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENoZWNrb3V0UXVlcnlTZXJ2aWNlIGltcGxlbWVudHMgQ2hlY2tvdXRRdWVyeUZhY2FkZSB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByZWxvYWQgZXZlbnRzIGZvciB0aGUgY2hlY2tvdXQgcXVlcnkuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0Q2hlY2tvdXRRdWVyeVJlbG9hZEV2ZW50cygpOiBRdWVyeU5vdGlmaWVyW10ge1xuICAgIHJldHVybiBbQ2hlY2tvdXRRdWVyeVJlbG9hZEV2ZW50XTtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcmVzZXQgZXZlbnRzIGZvciB0aGUgY2hlY2tvdXQgcXVlcnkuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0Q2hlY2tvdXRRdWVyeVJlc2V0RXZlbnRzKCk6IFF1ZXJ5Tm90aWZpZXJbXSB7XG4gICAgcmV0dXJuIFtDaGVja291dFF1ZXJ5UmVzZXRFdmVudF07XG4gIH1cblxuICBwcm90ZWN0ZWQgY2hlY2tvdXRRdWVyeSQ6IFF1ZXJ5PENoZWNrb3V0U3RhdGUgfCB1bmRlZmluZWQ+ID1cbiAgICB0aGlzLnF1ZXJ5U2VydmljZS5jcmVhdGU8Q2hlY2tvdXRTdGF0ZSB8IHVuZGVmaW5lZD4oXG4gICAgICAoKSA9PlxuICAgICAgICB0aGlzLmNoZWNrb3V0UHJlY29uZGl0aW9ucygpLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKChbdXNlcklkLCBjYXJ0SWRdKSA9PlxuICAgICAgICAgICAgdGhpcy5jaGVja291dENvbm5lY3Rvci5nZXRDaGVja291dERldGFpbHModXNlcklkLCBjYXJ0SWQpXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAge1xuICAgICAgICByZWxvYWRPbjogdGhpcy5nZXRDaGVja291dFF1ZXJ5UmVsb2FkRXZlbnRzKCksXG4gICAgICAgIHJlc2V0T246IHRoaXMuZ2V0Q2hlY2tvdXRRdWVyeVJlc2V0RXZlbnRzKCksXG4gICAgICB9XG4gICAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYWN0aXZlQ2FydEZhY2FkZTogQWN0aXZlQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgdXNlcklkU2VydmljZTogVXNlcklkU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcXVlcnlTZXJ2aWNlOiBRdWVyeVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNoZWNrb3V0Q29ubmVjdG9yOiBDaGVja291dENvbm5lY3RvclxuICApIHt9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIHRoZSBuZWNlc3NhcnkgY2hlY2tvdXQgcHJlY29uZGl0aW9ucy5cbiAgICovXG4gIHByb3RlY3RlZCBjaGVja291dFByZWNvbmRpdGlvbnMoKTogT2JzZXJ2YWJsZTxbc3RyaW5nLCBzdHJpbmddPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy51c2VySWRTZXJ2aWNlLnRha2VVc2VySWQoKSxcbiAgICAgIHRoaXMuYWN0aXZlQ2FydEZhY2FkZS50YWtlQWN0aXZlQ2FydElkKCksXG4gICAgICB0aGlzLmFjdGl2ZUNhcnRGYWNhZGUuaXNHdWVzdENhcnQoKSxcbiAgICBdKS5waXBlKFxuICAgICAgdGFrZSgxKSxcbiAgICAgIG1hcCgoW3VzZXJJZCwgY2FydElkLCBpc0d1ZXN0Q2FydF0pID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICF1c2VySWQgfHxcbiAgICAgICAgICAhY2FydElkIHx8XG4gICAgICAgICAgKHVzZXJJZCA9PT0gT0NDX1VTRVJfSURfQU5PTllNT1VTICYmICFpc0d1ZXN0Q2FydClcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDaGVja291dCBjb25kaXRpb25zIG5vdCBtZXQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3VzZXJJZCwgY2FydElkXTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGdldENoZWNrb3V0RGV0YWlsc1N0YXRlKCk6IE9ic2VydmFibGU8UXVlcnlTdGF0ZTxDaGVja291dFN0YXRlIHwgdW5kZWZpbmVkPj4ge1xuICAgIHJldHVybiB0aGlzLmNoZWNrb3V0UXVlcnkkLmdldFN0YXRlKCk7XG4gIH1cbn1cbiJdfQ==