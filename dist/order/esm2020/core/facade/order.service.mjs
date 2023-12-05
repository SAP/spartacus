/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CommandStrategy, OCC_USER_ID_ANONYMOUS, } from '@spartacus/core';
import { OrderPlacedEvent } from '@spartacus/order/root';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/core";
import * as i3 from "../connectors/order.connector";
export class OrderService {
    constructor(activeCartFacade, userIdService, commandService, orderConnector, eventService) {
        this.activeCartFacade = activeCartFacade;
        this.userIdService = userIdService;
        this.commandService = commandService;
        this.orderConnector = orderConnector;
        this.eventService = eventService;
        this.placedOrder$ = new BehaviorSubject(undefined);
        this.placeOrderCommand = this.commandService.create((payload) => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.orderConnector.placeOrder(userId, cartId, payload).pipe(tap((order) => {
            this.placedOrder$.next(order);
            this.eventService.dispatch({
                userId,
                cartId,
                /**
                 * As we know the cart is not anonymous (precondition checked),
                 * we can safely use the cartId, which is actually the cart.code.
                 */
                cartCode: cartId,
                order,
            }, OrderPlacedEvent);
        })))), {
            strategy: CommandStrategy.CancelPrevious,
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
    placeOrder(termsChecked) {
        return this.placeOrderCommand.execute(termsChecked);
    }
    getOrderDetails() {
        return this.placedOrder$.asObservable();
    }
    clearPlacedOrder() {
        this.placedOrder$.next(undefined);
    }
    setPlacedOrder(order) {
        this.placedOrder$.next(order);
    }
    getPickupEntries() {
        return this.getOrderDetails().pipe(map((order) => order?.entries?.filter((entry) => entry.deliveryPointOfService !== undefined) || []));
    }
    getDeliveryEntries() {
        return this.getOrderDetails().pipe(map((order) => order?.entries?.filter((entry) => entry.deliveryPointOfService === undefined) || []));
    }
}
OrderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderService, deps: [{ token: i1.ActiveCartFacade }, { token: i2.UserIdService }, { token: i2.CommandService }, { token: i3.OrderConnector }, { token: i2.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
OrderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.UserIdService }, { type: i2.CommandService }, { type: i3.OrderConnector }, { type: i2.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9jb3JlL2ZhY2FkZS9vcmRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFHTCxlQUFlLEVBRWYscUJBQXFCLEdBRXRCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFzQixnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdFLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFJM0QsTUFBTSxPQUFPLFlBQVk7SUFpQ3ZCLFlBQ1ksZ0JBQWtDLEVBQ2xDLGFBQTRCLEVBQzVCLGNBQThCLEVBQzlCLGNBQThCLEVBQzlCLFlBQTBCO1FBSjFCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQXJDNUIsaUJBQVksR0FBRyxJQUFJLGVBQWUsQ0FBb0IsU0FBUyxDQUFDLENBQUM7UUFFakUsc0JBQWlCLEdBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUN4QixDQUFDLE9BQU8sRUFBRSxFQUFFLENBQ1YsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUMvQixTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLENBQzdCLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUMxRCxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNaLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUN4QjtnQkFDRSxNQUFNO2dCQUNOLE1BQU07Z0JBQ047OzttQkFHRztnQkFDSCxRQUFRLEVBQUUsTUFBTTtnQkFDaEIsS0FBSzthQUNOLEVBQ0QsZ0JBQWdCLENBQ2pCLENBQUM7UUFDSixDQUFDLENBQUMsQ0FDSCxDQUNGLENBQ0YsRUFDSDtZQUNFLFFBQVEsRUFBRSxlQUFlLENBQUMsY0FBYztTQUN6QyxDQUNGLENBQUM7SUFRRCxDQUFDO0lBRUo7O09BRUc7SUFDTyxxQkFBcUI7UUFDN0IsT0FBTyxhQUFhLENBQUM7WUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFO1lBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUU7U0FDcEMsQ0FBQyxDQUFDLElBQUksQ0FDTCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsSUFDRSxDQUFDLE1BQU07Z0JBQ1AsQ0FBQyxNQUFNO2dCQUNQLENBQUMsTUFBTSxLQUFLLHFCQUFxQixJQUFJLENBQUMsV0FBVyxDQUFDLEVBQ2xEO2dCQUNBLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQzthQUNoRDtZQUNELE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCxVQUFVLENBQUMsWUFBcUI7UUFDOUIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxlQUFlO1FBQ2IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsY0FBYyxDQUFDLEtBQVk7UUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELGdCQUFnQjtRQUNkLE9BQU8sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FDaEMsR0FBRyxDQUNELENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDUixLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FDcEIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsS0FBSyxTQUFTLENBQ3RELElBQUksRUFBRSxDQUNWLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsT0FBTyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSSxDQUNoQyxHQUFHLENBQ0QsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUNSLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUNwQixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLHNCQUFzQixLQUFLLFNBQVMsQ0FDdEQsSUFBSSxFQUFFLENBQ1YsQ0FDRixDQUFDO0lBQ0osQ0FBQzs7eUdBcEdVLFlBQVk7NkdBQVosWUFBWTsyRkFBWixZQUFZO2tCQUR4QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZlQ2FydEZhY2FkZSwgT3JkZXJFbnRyeSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQ29tbWFuZCxcbiAgQ29tbWFuZFNlcnZpY2UsXG4gIENvbW1hbmRTdHJhdGVneSxcbiAgRXZlbnRTZXJ2aWNlLFxuICBPQ0NfVVNFUl9JRF9BTk9OWU1PVVMsXG4gIFVzZXJJZFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPcmRlciwgT3JkZXJGYWNhZGUsIE9yZGVyUGxhY2VkRXZlbnQgfSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL3Jvb3QnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCwgdGFrZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT3JkZXJDb25uZWN0b3IgfSBmcm9tICcuLi9jb25uZWN0b3JzL29yZGVyLmNvbm5lY3Rvcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPcmRlclNlcnZpY2UgaW1wbGVtZW50cyBPcmRlckZhY2FkZSB7XG4gIHByb3RlY3RlZCBwbGFjZWRPcmRlciQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE9yZGVyIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuXG4gIHByb3RlY3RlZCBwbGFjZU9yZGVyQ29tbWFuZDogQ29tbWFuZDxib29sZWFuLCBPcmRlcj4gPVxuICAgIHRoaXMuY29tbWFuZFNlcnZpY2UuY3JlYXRlPGJvb2xlYW4sIE9yZGVyPihcbiAgICAgIChwYXlsb2FkKSA9PlxuICAgICAgICB0aGlzLmNoZWNrb3V0UHJlY29uZGl0aW9ucygpLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKChbdXNlcklkLCBjYXJ0SWRdKSA9PlxuICAgICAgICAgICAgdGhpcy5vcmRlckNvbm5lY3Rvci5wbGFjZU9yZGVyKHVzZXJJZCwgY2FydElkLCBwYXlsb2FkKS5waXBlKFxuICAgICAgICAgICAgICB0YXAoKG9yZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZWRPcmRlciQubmV4dChvcmRlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZGlzcGF0Y2goXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgY2FydElkLFxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogQXMgd2Uga25vdyB0aGUgY2FydCBpcyBub3QgYW5vbnltb3VzIChwcmVjb25kaXRpb24gY2hlY2tlZCksXG4gICAgICAgICAgICAgICAgICAgICAqIHdlIGNhbiBzYWZlbHkgdXNlIHRoZSBjYXJ0SWQsIHdoaWNoIGlzIGFjdHVhbGx5IHRoZSBjYXJ0LmNvZGUuXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBjYXJ0Q29kZTogY2FydElkLFxuICAgICAgICAgICAgICAgICAgICBvcmRlcixcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBPcmRlclBsYWNlZEV2ZW50XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICB7XG4gICAgICAgIHN0cmF0ZWd5OiBDb21tYW5kU3RyYXRlZ3kuQ2FuY2VsUHJldmlvdXMsXG4gICAgICB9XG4gICAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYWN0aXZlQ2FydEZhY2FkZTogQWN0aXZlQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgdXNlcklkU2VydmljZTogVXNlcklkU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29tbWFuZFNlcnZpY2U6IENvbW1hbmRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBvcmRlckNvbm5lY3RvcjogT3JkZXJDb25uZWN0b3IsXG4gICAgcHJvdGVjdGVkIGV2ZW50U2VydmljZTogRXZlbnRTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogUGVyZm9ybXMgdGhlIG5lY2Vzc2FyeSBjaGVja291dCBwcmVjb25kaXRpb25zLlxuICAgKi9cbiAgcHJvdGVjdGVkIGNoZWNrb3V0UHJlY29uZGl0aW9ucygpOiBPYnNlcnZhYmxlPFtzdHJpbmcsIHN0cmluZ10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLnVzZXJJZFNlcnZpY2UudGFrZVVzZXJJZCgpLFxuICAgICAgdGhpcy5hY3RpdmVDYXJ0RmFjYWRlLnRha2VBY3RpdmVDYXJ0SWQoKSxcbiAgICAgIHRoaXMuYWN0aXZlQ2FydEZhY2FkZS5pc0d1ZXN0Q2FydCgpLFxuICAgIF0pLnBpcGUoXG4gICAgICB0YWtlKDEpLFxuICAgICAgbWFwKChbdXNlcklkLCBjYXJ0SWQsIGlzR3Vlc3RDYXJ0XSkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIXVzZXJJZCB8fFxuICAgICAgICAgICFjYXJ0SWQgfHxcbiAgICAgICAgICAodXNlcklkID09PSBPQ0NfVVNFUl9JRF9BTk9OWU1PVVMgJiYgIWlzR3Vlc3RDYXJ0KVxuICAgICAgICApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NoZWNrb3V0IGNvbmRpdGlvbnMgbm90IG1ldCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbdXNlcklkLCBjYXJ0SWRdO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcGxhY2VPcmRlcih0ZXJtc0NoZWNrZWQ6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPE9yZGVyPiB7XG4gICAgcmV0dXJuIHRoaXMucGxhY2VPcmRlckNvbW1hbmQuZXhlY3V0ZSh0ZXJtc0NoZWNrZWQpO1xuICB9XG5cbiAgZ2V0T3JkZXJEZXRhaWxzKCk6IE9ic2VydmFibGU8T3JkZXIgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5wbGFjZWRPcmRlciQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBjbGVhclBsYWNlZE9yZGVyKCk6IHZvaWQge1xuICAgIHRoaXMucGxhY2VkT3JkZXIkLm5leHQodW5kZWZpbmVkKTtcbiAgfVxuXG4gIHNldFBsYWNlZE9yZGVyKG9yZGVyOiBPcmRlcik6IHZvaWQge1xuICAgIHRoaXMucGxhY2VkT3JkZXIkLm5leHQob3JkZXIpO1xuICB9XG5cbiAgZ2V0UGlja3VwRW50cmllcygpOiBPYnNlcnZhYmxlPE9yZGVyRW50cnlbXT4ge1xuICAgIHJldHVybiB0aGlzLmdldE9yZGVyRGV0YWlscygpLnBpcGUoXG4gICAgICBtYXAoXG4gICAgICAgIChvcmRlcikgPT5cbiAgICAgICAgICBvcmRlcj8uZW50cmllcz8uZmlsdGVyKFxuICAgICAgICAgICAgKGVudHJ5KSA9PiBlbnRyeS5kZWxpdmVyeVBvaW50T2ZTZXJ2aWNlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICApIHx8IFtdXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIGdldERlbGl2ZXJ5RW50cmllcygpOiBPYnNlcnZhYmxlPE9yZGVyRW50cnlbXT4ge1xuICAgIHJldHVybiB0aGlzLmdldE9yZGVyRGV0YWlscygpLnBpcGUoXG4gICAgICBtYXAoXG4gICAgICAgIChvcmRlcikgPT5cbiAgICAgICAgICBvcmRlcj8uZW50cmllcz8uZmlsdGVyKFxuICAgICAgICAgICAgKGVudHJ5KSA9PiBlbnRyeS5kZWxpdmVyeVBvaW50T2ZTZXJ2aWNlID09PSB1bmRlZmluZWRcbiAgICAgICAgICApIHx8IFtdXG4gICAgICApXG4gICAgKTtcbiAgfVxufVxuIl19