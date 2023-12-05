/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CommandStrategy, OCC_USER_ID_ANONYMOUS, } from '@spartacus/core';
import { ReplenishmentOrderScheduledEvent, } from '@spartacus/order/root';
import { combineLatest } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/core";
import * as i3 from "../connectors/scheduled-replenishment-order.connector";
import * as i4 from "@spartacus/order/root";
export class ScheduledReplenishmentOrderService {
    constructor(activeCartFacade, userIdService, commandService, scheduledReplenishmentOrderConnector, eventService, orderFacade) {
        this.activeCartFacade = activeCartFacade;
        this.userIdService = userIdService;
        this.commandService = commandService;
        this.scheduledReplenishmentOrderConnector = scheduledReplenishmentOrderConnector;
        this.eventService = eventService;
        this.orderFacade = orderFacade;
        this.scheduleReplenishmentOrderCommand = this.commandService.create(({ form, termsChecked }) => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.scheduledReplenishmentOrderConnector
            .scheduleReplenishmentOrder(cartId, form, termsChecked, userId)
            .pipe(tap((replenishmentOrder) => {
            this.orderFacade.setPlacedOrder(replenishmentOrder);
            this.eventService.dispatch({
                userId,
                cartId,
                /**
                 * As we know the cart is not anonymous (precondition checked),
                 * we can safely use the cartId, which is actually the cart.code.
                 */
                cartCode: cartId,
                replenishmentOrder,
            }, ReplenishmentOrderScheduledEvent);
        })))), {
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
                throw new Error('Order conditions not met');
            }
            return [userId, cartId];
        }));
    }
    /**
     * Schedule a replenishment order
     */
    scheduleReplenishmentOrder(scheduleReplenishmentForm, termsChecked) {
        return this.scheduleReplenishmentOrderCommand.execute({
            termsChecked,
            form: scheduleReplenishmentForm,
        });
    }
}
ScheduledReplenishmentOrderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduledReplenishmentOrderService, deps: [{ token: i1.ActiveCartFacade }, { token: i2.UserIdService }, { token: i2.CommandService }, { token: i3.ScheduledReplenishmentOrderConnector }, { token: i2.EventService }, { token: i4.OrderFacade }], target: i0.ɵɵFactoryTarget.Injectable });
ScheduledReplenishmentOrderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduledReplenishmentOrderService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduledReplenishmentOrderService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.UserIdService }, { type: i2.CommandService }, { type: i3.ScheduledReplenishmentOrderConnector }, { type: i2.EventService }, { type: i4.OrderFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZWR1bGVkLXJlcGxlbmlzaG1lbnQtb3JkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9jb3JlL2ZhY2FkZS9zY2hlZHVsZWQtcmVwbGVuaXNobWVudC1vcmRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFHTCxlQUFlLEVBRWYscUJBQXFCLEdBRXRCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUdMLGdDQUFnQyxHQUdqQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxhQUFhLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUFJM0QsTUFBTSxPQUFPLGtDQUFrQztJQXlDN0MsWUFDWSxnQkFBa0MsRUFDbEMsYUFBNEIsRUFDNUIsY0FBOEIsRUFDOUIsb0NBQTBFLEVBQzFFLFlBQTBCLEVBQzFCLFdBQXdCO1FBTHhCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHlDQUFvQyxHQUFwQyxvQ0FBb0MsQ0FBc0M7UUFDMUUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUE1QzFCLHNDQUFpQyxHQUd2QyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FJNUIsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLENBQ3pCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUksQ0FDL0IsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUM3QixJQUFJLENBQUMsb0NBQW9DO2FBQ3RDLDBCQUEwQixDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLE1BQU0sQ0FBQzthQUM5RCxJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsa0JBQWtCLEVBQUUsRUFBRTtZQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBRXBELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUN4QjtnQkFDRSxNQUFNO2dCQUNOLE1BQU07Z0JBQ047OzttQkFHRztnQkFDSCxRQUFRLEVBQUUsTUFBTTtnQkFDaEIsa0JBQWtCO2FBQ25CLEVBQ0QsZ0NBQWdDLENBQ2pDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FDSCxDQUNKLENBQ0YsRUFDSDtZQUNFLFFBQVEsRUFBRSxlQUFlLENBQUMsY0FBYztTQUN6QyxDQUNGLENBQUM7SUFTQyxDQUFDO0lBRU0scUJBQXFCO1FBQzdCLE9BQU8sYUFBYSxDQUFDO1lBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFO1lBQy9CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFO1NBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQ0wsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsRUFBRSxFQUFFO1lBQ3BDLElBQ0UsQ0FBQyxNQUFNO2dCQUNQLENBQUMsTUFBTTtnQkFDUCxDQUFDLE1BQU0sS0FBSyxxQkFBcUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUNsRDtnQkFDQSxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7YUFDN0M7WUFDRCxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSCwwQkFBMEIsQ0FDeEIseUJBQW9ELEVBQ3BELFlBQXFCO1FBRXJCLE9BQU8sSUFBSSxDQUFDLGlDQUFpQyxDQUFDLE9BQU8sQ0FBQztZQUNwRCxZQUFZO1lBQ1osSUFBSSxFQUFFLHlCQUF5QjtTQUNoQyxDQUFDLENBQUM7SUFDTCxDQUFDOzsrSEFqRlUsa0NBQWtDO21JQUFsQyxrQ0FBa0M7MkZBQWxDLGtDQUFrQztrQkFEOUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2ZUNhcnRGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIENvbW1hbmQsXG4gIENvbW1hbmRTZXJ2aWNlLFxuICBDb21tYW5kU3RyYXRlZ3ksXG4gIEV2ZW50U2VydmljZSxcbiAgT0NDX1VTRVJfSURfQU5PTllNT1VTLFxuICBVc2VySWRTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgT3JkZXJGYWNhZGUsXG4gIFJlcGxlbmlzaG1lbnRPcmRlcixcbiAgUmVwbGVuaXNobWVudE9yZGVyU2NoZWR1bGVkRXZlbnQsXG4gIFNjaGVkdWxlZFJlcGxlbmlzaG1lbnRPcmRlckZhY2FkZSxcbiAgU2NoZWR1bGVSZXBsZW5pc2htZW50Rm9ybSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmRlci9yb290JztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3dpdGNoTWFwLCB0YWtlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTY2hlZHVsZWRSZXBsZW5pc2htZW50T3JkZXJDb25uZWN0b3IgfSBmcm9tICcuLi9jb25uZWN0b3JzL3NjaGVkdWxlZC1yZXBsZW5pc2htZW50LW9yZGVyLmNvbm5lY3Rvcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTY2hlZHVsZWRSZXBsZW5pc2htZW50T3JkZXJTZXJ2aWNlXG4gIGltcGxlbWVudHMgU2NoZWR1bGVkUmVwbGVuaXNobWVudE9yZGVyRmFjYWRlXG57XG4gIHByb3RlY3RlZCBzY2hlZHVsZVJlcGxlbmlzaG1lbnRPcmRlckNvbW1hbmQ6IENvbW1hbmQ8XG4gICAgeyB0ZXJtc0NoZWNrZWQ6IGJvb2xlYW47IGZvcm06IFNjaGVkdWxlUmVwbGVuaXNobWVudEZvcm0gfSxcbiAgICBSZXBsZW5pc2htZW50T3JkZXJcbiAgPiA9IHRoaXMuY29tbWFuZFNlcnZpY2UuY3JlYXRlPFxuICAgIHsgdGVybXNDaGVja2VkOiBib29sZWFuOyBmb3JtOiBTY2hlZHVsZVJlcGxlbmlzaG1lbnRGb3JtIH0sXG4gICAgUmVwbGVuaXNobWVudE9yZGVyXG4gID4oXG4gICAgKHsgZm9ybSwgdGVybXNDaGVja2VkIH0pID0+XG4gICAgICB0aGlzLmNoZWNrb3V0UHJlY29uZGl0aW9ucygpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoW3VzZXJJZCwgY2FydElkXSkgPT5cbiAgICAgICAgICB0aGlzLnNjaGVkdWxlZFJlcGxlbmlzaG1lbnRPcmRlckNvbm5lY3RvclxuICAgICAgICAgICAgLnNjaGVkdWxlUmVwbGVuaXNobWVudE9yZGVyKGNhcnRJZCwgZm9ybSwgdGVybXNDaGVja2VkLCB1c2VySWQpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgdGFwKChyZXBsZW5pc2htZW50T3JkZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9yZGVyRmFjYWRlLnNldFBsYWNlZE9yZGVyKHJlcGxlbmlzaG1lbnRPcmRlcik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50U2VydmljZS5kaXNwYXRjaChcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkLFxuICAgICAgICAgICAgICAgICAgICBjYXJ0SWQsXG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBBcyB3ZSBrbm93IHRoZSBjYXJ0IGlzIG5vdCBhbm9ueW1vdXMgKHByZWNvbmRpdGlvbiBjaGVja2VkKSxcbiAgICAgICAgICAgICAgICAgICAgICogd2UgY2FuIHNhZmVseSB1c2UgdGhlIGNhcnRJZCwgd2hpY2ggaXMgYWN0dWFsbHkgdGhlIGNhcnQuY29kZS5cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGNhcnRDb2RlOiBjYXJ0SWQsXG4gICAgICAgICAgICAgICAgICAgIHJlcGxlbmlzaG1lbnRPcmRlcixcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBSZXBsZW5pc2htZW50T3JkZXJTY2hlZHVsZWRFdmVudFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICksXG4gICAge1xuICAgICAgc3RyYXRlZ3k6IENvbW1hbmRTdHJhdGVneS5DYW5jZWxQcmV2aW91cyxcbiAgICB9XG4gICk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGFjdGl2ZUNhcnRGYWNhZGU6IEFjdGl2ZUNhcnRGYWNhZGUsXG4gICAgcHJvdGVjdGVkIHVzZXJJZFNlcnZpY2U6IFVzZXJJZFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbW1hbmRTZXJ2aWNlOiBDb21tYW5kU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgc2NoZWR1bGVkUmVwbGVuaXNobWVudE9yZGVyQ29ubmVjdG9yOiBTY2hlZHVsZWRSZXBsZW5pc2htZW50T3JkZXJDb25uZWN0b3IsXG4gICAgcHJvdGVjdGVkIGV2ZW50U2VydmljZTogRXZlbnRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBvcmRlckZhY2FkZTogT3JkZXJGYWNhZGVcbiAgKSB7fVxuXG4gIHByb3RlY3RlZCBjaGVja291dFByZWNvbmRpdGlvbnMoKTogT2JzZXJ2YWJsZTxbc3RyaW5nLCBzdHJpbmddPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy51c2VySWRTZXJ2aWNlLnRha2VVc2VySWQoKSxcbiAgICAgIHRoaXMuYWN0aXZlQ2FydEZhY2FkZS50YWtlQWN0aXZlQ2FydElkKCksXG4gICAgICB0aGlzLmFjdGl2ZUNhcnRGYWNhZGUuaXNHdWVzdENhcnQoKSxcbiAgICBdKS5waXBlKFxuICAgICAgdGFrZSgxKSxcbiAgICAgIG1hcCgoW3VzZXJJZCwgY2FydElkLCBpc0d1ZXN0Q2FydF0pID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICF1c2VySWQgfHxcbiAgICAgICAgICAhY2FydElkIHx8XG4gICAgICAgICAgKHVzZXJJZCA9PT0gT0NDX1VTRVJfSURfQU5PTllNT1VTICYmICFpc0d1ZXN0Q2FydClcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPcmRlciBjb25kaXRpb25zIG5vdCBtZXQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3VzZXJJZCwgY2FydElkXTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY2hlZHVsZSBhIHJlcGxlbmlzaG1lbnQgb3JkZXJcbiAgICovXG4gIHNjaGVkdWxlUmVwbGVuaXNobWVudE9yZGVyKFxuICAgIHNjaGVkdWxlUmVwbGVuaXNobWVudEZvcm06IFNjaGVkdWxlUmVwbGVuaXNobWVudEZvcm0sXG4gICAgdGVybXNDaGVja2VkOiBib29sZWFuXG4gICk6IE9ic2VydmFibGU8UmVwbGVuaXNobWVudE9yZGVyPiB7XG4gICAgcmV0dXJuIHRoaXMuc2NoZWR1bGVSZXBsZW5pc2htZW50T3JkZXJDb21tYW5kLmV4ZWN1dGUoe1xuICAgICAgdGVybXNDaGVja2VkLFxuICAgICAgZm9ybTogc2NoZWR1bGVSZXBsZW5pc2htZW50Rm9ybSxcbiAgICB9KTtcbiAgfVxufVxuIl19