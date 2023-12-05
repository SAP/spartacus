/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CheckoutCostCenterSetEvent, } from '@spartacus/checkout/b2b/root';
import { CommandStrategy, OCC_USER_ID_ANONYMOUS, } from '@spartacus/core';
import { combineLatest } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/core";
import * as i3 from "../connectors/checkout-cost-center/checkout-cost-center.connector";
import * as i4 from "@spartacus/checkout/base/root";
export class CheckoutCostCenterService {
    constructor(activeCartFacade, userIdService, commandService, checkoutCostCenterConnector, checkoutQueryFacade, eventService) {
        this.activeCartFacade = activeCartFacade;
        this.userIdService = userIdService;
        this.commandService = commandService;
        this.checkoutCostCenterConnector = checkoutCostCenterConnector;
        this.checkoutQueryFacade = checkoutQueryFacade;
        this.eventService = eventService;
        this.setCostCenterCommand = this.commandService.create((payload) => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.checkoutCostCenterConnector
            .setCostCenter(userId, cartId, payload)
            .pipe(tap(() => this.eventService.dispatch({
            cartId,
            userId,
            code: payload,
        }, CheckoutCostCenterSetEvent))))), {
            strategy: CommandStrategy.CancelPrevious,
        });
    }
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
    getCostCenterState() {
        return this.checkoutQueryFacade.getCheckoutDetailsState().pipe(map((state) => ({
            ...state,
            data: state.data?.costCenter,
        })));
    }
    setCostCenter(costCenterId) {
        return this.setCostCenterCommand.execute(costCenterId);
    }
}
CheckoutCostCenterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterService, deps: [{ token: i1.ActiveCartFacade }, { token: i2.UserIdService }, { token: i2.CommandService }, { token: i3.CheckoutCostCenterConnector }, { token: i4.CheckoutQueryFacade }, { token: i2.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutCostCenterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.UserIdService }, { type: i2.CommandService }, { type: i3.CheckoutCostCenterConnector }, { type: i4.CheckoutQueryFacade }, { type: i2.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtY29zdC1jZW50ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iMmIvY29yZS9mYWNhZGUvY2hlY2tvdXQtY29zdC1jZW50ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBRUwsMEJBQTBCLEdBQzNCLE1BQU0sOEJBQThCLENBQUM7QUFFdEMsT0FBTyxFQUdMLGVBQWUsRUFHZixxQkFBcUIsR0FHdEIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsYUFBYSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0FBSTNELE1BQU0sT0FBTyx5QkFBeUI7SUEyQnBDLFlBQ1ksZ0JBQWtDLEVBQ2xDLGFBQTRCLEVBQzVCLGNBQThCLEVBQzlCLDJCQUF3RCxFQUN4RCxtQkFBd0MsRUFDeEMsWUFBMEI7UUFMMUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZ0NBQTJCLEdBQTNCLDJCQUEyQixDQUE2QjtRQUN4RCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBaEM1Qix5QkFBb0IsR0FDNUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQ3hCLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FDVixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLENBQy9CLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FDN0IsSUFBSSxDQUFDLDJCQUEyQjthQUM3QixhQUFhLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7YUFDdEMsSUFBSSxDQUNILEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FDUCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FDeEI7WUFDRSxNQUFNO1lBQ04sTUFBTTtZQUNOLElBQUksRUFBRSxPQUFPO1NBQ2QsRUFDRCwwQkFBMEIsQ0FDM0IsQ0FDRixDQUNGLENBQ0osQ0FDRixFQUNIO1lBQ0UsUUFBUSxFQUFFLGVBQWUsQ0FBQyxjQUFjO1NBQ3pDLENBQ0YsQ0FBQztJQVNELENBQUM7SUFFTSxxQkFBcUI7UUFDN0IsT0FBTyxhQUFhLENBQUM7WUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFO1lBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUU7U0FDcEMsQ0FBQyxDQUFDLElBQUksQ0FDTCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsSUFDRSxDQUFDLE1BQU07Z0JBQ1AsQ0FBQyxNQUFNO2dCQUNQLENBQUMsTUFBTSxLQUFLLHFCQUFxQixJQUFJLENBQUMsV0FBVyxDQUFDLEVBQ2xEO2dCQUNBLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQzthQUNoRDtZQUNELE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxJQUFJLENBQzVELEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNkLEdBQUcsS0FBSztZQUNSLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLFVBQVU7U0FDN0IsQ0FBQyxDQUFDLENBQ0osQ0FBQztJQUNKLENBQUM7SUFFRCxhQUFhLENBQUMsWUFBb0I7UUFDaEMsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3pELENBQUM7O3NIQW5FVSx5QkFBeUI7MEhBQXpCLHlCQUF5QjsyRkFBekIseUJBQXlCO2tCQURyQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZlQ2FydEZhY2FkZSwgQ2FydCB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQ2hlY2tvdXRDb3N0Q2VudGVyRmFjYWRlLFxuICBDaGVja291dENvc3RDZW50ZXJTZXRFdmVudCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jaGVja291dC9iMmIvcm9vdCc7XG5pbXBvcnQgeyBDaGVja291dFF1ZXJ5RmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jaGVja291dC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQ29tbWFuZCxcbiAgQ29tbWFuZFNlcnZpY2UsXG4gIENvbW1hbmRTdHJhdGVneSxcbiAgQ29zdENlbnRlcixcbiAgRXZlbnRTZXJ2aWNlLFxuICBPQ0NfVVNFUl9JRF9BTk9OWU1PVVMsXG4gIFF1ZXJ5U3RhdGUsXG4gIFVzZXJJZFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCwgdGFrZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2hlY2tvdXRDb3N0Q2VudGVyQ29ubmVjdG9yIH0gZnJvbSAnLi4vY29ubmVjdG9ycy9jaGVja291dC1jb3N0LWNlbnRlci9jaGVja291dC1jb3N0LWNlbnRlci5jb25uZWN0b3InO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXRDb3N0Q2VudGVyU2VydmljZSBpbXBsZW1lbnRzIENoZWNrb3V0Q29zdENlbnRlckZhY2FkZSB7XG4gIHByb3RlY3RlZCBzZXRDb3N0Q2VudGVyQ29tbWFuZDogQ29tbWFuZDxzdHJpbmcsIENhcnQ+ID1cbiAgICB0aGlzLmNvbW1hbmRTZXJ2aWNlLmNyZWF0ZTxzdHJpbmcsIENhcnQ+KFxuICAgICAgKHBheWxvYWQpID0+XG4gICAgICAgIHRoaXMuY2hlY2tvdXRQcmVjb25kaXRpb25zKCkucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoKFt1c2VySWQsIGNhcnRJZF0pID0+XG4gICAgICAgICAgICB0aGlzLmNoZWNrb3V0Q29zdENlbnRlckNvbm5lY3RvclxuICAgICAgICAgICAgICAuc2V0Q29zdENlbnRlcih1c2VySWQsIGNhcnRJZCwgcGF5bG9hZClcbiAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgdGFwKCgpID0+XG4gICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50U2VydmljZS5kaXNwYXRjaChcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGNhcnRJZCxcbiAgICAgICAgICAgICAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgICAgICAgICAgICAgY29kZTogcGF5bG9hZCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgQ2hlY2tvdXRDb3N0Q2VudGVyU2V0RXZlbnRcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICB7XG4gICAgICAgIHN0cmF0ZWd5OiBDb21tYW5kU3RyYXRlZ3kuQ2FuY2VsUHJldmlvdXMsXG4gICAgICB9XG4gICAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYWN0aXZlQ2FydEZhY2FkZTogQWN0aXZlQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgdXNlcklkU2VydmljZTogVXNlcklkU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29tbWFuZFNlcnZpY2U6IENvbW1hbmRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjaGVja291dENvc3RDZW50ZXJDb25uZWN0b3I6IENoZWNrb3V0Q29zdENlbnRlckNvbm5lY3RvcixcbiAgICBwcm90ZWN0ZWQgY2hlY2tvdXRRdWVyeUZhY2FkZTogQ2hlY2tvdXRRdWVyeUZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2VcbiAgKSB7fVxuXG4gIHByb3RlY3RlZCBjaGVja291dFByZWNvbmRpdGlvbnMoKTogT2JzZXJ2YWJsZTxbc3RyaW5nLCBzdHJpbmddPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy51c2VySWRTZXJ2aWNlLnRha2VVc2VySWQoKSxcbiAgICAgIHRoaXMuYWN0aXZlQ2FydEZhY2FkZS50YWtlQWN0aXZlQ2FydElkKCksXG4gICAgICB0aGlzLmFjdGl2ZUNhcnRGYWNhZGUuaXNHdWVzdENhcnQoKSxcbiAgICBdKS5waXBlKFxuICAgICAgdGFrZSgxKSxcbiAgICAgIG1hcCgoW3VzZXJJZCwgY2FydElkLCBpc0d1ZXN0Q2FydF0pID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICF1c2VySWQgfHxcbiAgICAgICAgICAhY2FydElkIHx8XG4gICAgICAgICAgKHVzZXJJZCA9PT0gT0NDX1VTRVJfSURfQU5PTllNT1VTICYmICFpc0d1ZXN0Q2FydClcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDaGVja291dCBjb25kaXRpb25zIG5vdCBtZXQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3VzZXJJZCwgY2FydElkXTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGdldENvc3RDZW50ZXJTdGF0ZSgpOiBPYnNlcnZhYmxlPFF1ZXJ5U3RhdGU8Q29zdENlbnRlciB8IHVuZGVmaW5lZD4+IHtcbiAgICByZXR1cm4gdGhpcy5jaGVja291dFF1ZXJ5RmFjYWRlLmdldENoZWNrb3V0RGV0YWlsc1N0YXRlKCkucGlwZShcbiAgICAgIG1hcCgoc3RhdGUpID0+ICh7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBkYXRhOiBzdGF0ZS5kYXRhPy5jb3N0Q2VudGVyLFxuICAgICAgfSkpXG4gICAgKTtcbiAgfVxuXG4gIHNldENvc3RDZW50ZXIoY29zdENlbnRlcklkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPENhcnQ+IHtcbiAgICByZXR1cm4gdGhpcy5zZXRDb3N0Q2VudGVyQ29tbWFuZC5leGVjdXRlKGNvc3RDZW50ZXJJZCk7XG4gIH1cbn1cbiJdfQ==