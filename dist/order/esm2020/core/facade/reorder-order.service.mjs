/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CommandStrategy, } from '@spartacus/core';
import { combineLatest } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../connectors/reorder-order.connector";
import * as i3 from "@spartacus/cart/base/root";
export class ReorderOrderService {
    constructor(commandService, reorderOrderConnector, userIdService, activeCartFacade, multiCartFacade) {
        this.commandService = commandService;
        this.reorderOrderConnector = reorderOrderConnector;
        this.userIdService = userIdService;
        this.activeCartFacade = activeCartFacade;
        this.multiCartFacade = multiCartFacade;
        this.reorderCommand = this.commandService.create(({ orderId }) => this.reorderPreconditions().pipe(switchMap((userId) => this.reorderOrderConnector.reorder(orderId, userId))), {
            strategy: CommandStrategy.CancelPrevious,
        });
    }
    /**
     * Create cart from an existing order
     */
    reorder(orderId) {
        return this.reorderCommand.execute({
            orderId,
        });
    }
    reorderPreconditions() {
        return combineLatest([
            this.userIdService.takeUserId(),
            this.activeCartFacade.getActiveCartId(),
        ]).pipe(take(1), map(([userId, cartId]) => {
            if (!userId) {
                throw new Error('Must be logged in to reorder');
            }
            if (cartId) {
                this.multiCartFacade.deleteCart(cartId, userId);
            }
            return userId;
        }));
    }
}
ReorderOrderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReorderOrderService, deps: [{ token: i1.CommandService }, { token: i2.ReorderOrderConnector }, { token: i1.UserIdService }, { token: i3.ActiveCartFacade }, { token: i3.MultiCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
ReorderOrderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReorderOrderService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReorderOrderService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CommandService }, { type: i2.ReorderOrderConnector }, { type: i1.UserIdService }, { type: i3.ActiveCartFacade }, { type: i3.MultiCartFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVvcmRlci1vcmRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZGVyL2NvcmUvZmFjYWRlL3Jlb3JkZXItb3JkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU0zQyxPQUFPLEVBR0wsZUFBZSxHQUVoQixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxhQUFhLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBSXRELE1BQU0sT0FBTyxtQkFBbUI7SUFjOUIsWUFDWSxjQUE4QixFQUM5QixxQkFBNEMsRUFDNUMsYUFBNEIsRUFDNUIsZ0JBQWtDLEVBQ2xDLGVBQWdDO1FBSmhDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBbEJsQyxtQkFBYyxHQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FDeEIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FDZCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxJQUFJLENBQzlCLFNBQVMsQ0FBQyxDQUFDLE1BQWMsRUFBRSxFQUFFLENBQzNCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUNwRCxDQUNGLEVBQ0g7WUFDRSxRQUFRLEVBQUUsZUFBZSxDQUFDLGNBQWM7U0FDekMsQ0FDRixDQUFDO0lBUUQsQ0FBQztJQUVKOztPQUVHO0lBQ0gsT0FBTyxDQUFDLE9BQWU7UUFDckIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQztZQUNqQyxPQUFPO1NBQ1IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVTLG9CQUFvQjtRQUM1QixPQUFPLGFBQWEsQ0FBQztZQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRTtZQUMvQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFO1NBQ3hDLENBQUMsQ0FBQyxJQUFJLENBQ0wsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUU7WUFDdkIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDWCxNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7YUFDakQ7WUFFRCxJQUFJLE1BQU0sRUFBRTtnQkFDVixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDakQ7WUFFRCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7Z0hBakRVLG1CQUFtQjtvSEFBbkIsbUJBQW1COzJGQUFuQixtQkFBbUI7a0JBRC9CLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBY3RpdmVDYXJ0RmFjYWRlLFxuICBDYXJ0TW9kaWZpY2F0aW9uTGlzdCxcbiAgTXVsdGlDYXJ0RmFjYWRlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIENvbW1hbmQsXG4gIENvbW1hbmRTZXJ2aWNlLFxuICBDb21tYW5kU3RyYXRlZ3ksXG4gIFVzZXJJZFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBSZW9yZGVyT3JkZXJGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL3Jvb3QnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBSZW9yZGVyT3JkZXJDb25uZWN0b3IgfSBmcm9tICcuLi9jb25uZWN0b3JzL3Jlb3JkZXItb3JkZXIuY29ubmVjdG9yJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlb3JkZXJPcmRlclNlcnZpY2UgaW1wbGVtZW50cyBSZW9yZGVyT3JkZXJGYWNhZGUge1xuICBwcm90ZWN0ZWQgcmVvcmRlckNvbW1hbmQ6IENvbW1hbmQ8eyBvcmRlcklkOiBzdHJpbmcgfSwgQ2FydE1vZGlmaWNhdGlvbkxpc3Q+ID1cbiAgICB0aGlzLmNvbW1hbmRTZXJ2aWNlLmNyZWF0ZTx7IG9yZGVySWQ6IHN0cmluZyB9LCBDYXJ0TW9kaWZpY2F0aW9uTGlzdD4oXG4gICAgICAoeyBvcmRlcklkIH0pID0+XG4gICAgICAgIHRoaXMucmVvcmRlclByZWNvbmRpdGlvbnMoKS5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcCgodXNlcklkOiBzdHJpbmcpID0+XG4gICAgICAgICAgICB0aGlzLnJlb3JkZXJPcmRlckNvbm5lY3Rvci5yZW9yZGVyKG9yZGVySWQsIHVzZXJJZClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICB7XG4gICAgICAgIHN0cmF0ZWd5OiBDb21tYW5kU3RyYXRlZ3kuQ2FuY2VsUHJldmlvdXMsXG4gICAgICB9XG4gICAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29tbWFuZFNlcnZpY2U6IENvbW1hbmRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByZW9yZGVyT3JkZXJDb25uZWN0b3I6IFJlb3JkZXJPcmRlckNvbm5lY3RvcixcbiAgICBwcm90ZWN0ZWQgdXNlcklkU2VydmljZTogVXNlcklkU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYWN0aXZlQ2FydEZhY2FkZTogQWN0aXZlQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgbXVsdGlDYXJ0RmFjYWRlOiBNdWx0aUNhcnRGYWNhZGVcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgY2FydCBmcm9tIGFuIGV4aXN0aW5nIG9yZGVyXG4gICAqL1xuICByZW9yZGVyKG9yZGVySWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Q2FydE1vZGlmaWNhdGlvbkxpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZW9yZGVyQ29tbWFuZC5leGVjdXRlKHtcbiAgICAgIG9yZGVySWQsXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVvcmRlclByZWNvbmRpdGlvbnMoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLnVzZXJJZFNlcnZpY2UudGFrZVVzZXJJZCgpLFxuICAgICAgdGhpcy5hY3RpdmVDYXJ0RmFjYWRlLmdldEFjdGl2ZUNhcnRJZCgpLFxuICAgIF0pLnBpcGUoXG4gICAgICB0YWtlKDEpLFxuICAgICAgbWFwKChbdXNlcklkLCBjYXJ0SWRdKSA9PiB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IGJlIGxvZ2dlZCBpbiB0byByZW9yZGVyJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FydElkKSB7XG4gICAgICAgICAgdGhpcy5tdWx0aUNhcnRGYWNhZGUuZGVsZXRlQ2FydChjYXJ0SWQsIHVzZXJJZCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdXNlcklkO1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=