/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { OCC_USER_ID_ANONYMOUS, } from '@spartacus/core';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../connectors";
export class FutureStockService {
    /**
     * Get future stock
     */
    getFutureStock() {
        return this.futureStockState$;
    }
    constructor(userIdService, futureStockConnector, routingService) {
        this.userIdService = userIdService;
        this.futureStockConnector = futureStockConnector;
        this.routingService = routingService;
        this.PRODUCT_KEY = 'productCode';
        this.futureStockState$ = this.routingService.getRouterState().pipe(withLatestFrom(this.userIdService.takeUserId()), switchMap(([{ state }, userId]) => {
            if (userId !== OCC_USER_ID_ANONYMOUS) {
                return this.futureStockConnector.getFutureStock(userId, state.params[this.PRODUCT_KEY]);
            }
            return of(undefined);
        }));
    }
}
FutureStockService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockService, deps: [{ token: i1.UserIdService }, { token: i2.FutureStockConnector }, { token: i1.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
FutureStockService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserIdService }, { type: i2.FutureStockConnector }, { type: i1.RoutingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnV0dXJlLXN0b2NrLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC9mdXR1cmUtc3RvY2svY29yZS9zZXJ2aWNlcy9mdXR1cmUtc3RvY2suc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXRDLE9BQU8sRUFDTCxxQkFBcUIsR0FHdEIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBSzNELE1BQU0sT0FBTyxrQkFBa0I7SUFnQjdCOztPQUVHO0lBQ0gsY0FBYztRQUNaLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2hDLENBQUM7SUFFRCxZQUNZLGFBQTRCLEVBQzVCLG9CQUEwQyxFQUMxQyxjQUE4QjtRQUY5QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQXpCdkIsZ0JBQVcsR0FBRyxhQUFhLENBQUM7UUFFckMsc0JBQWlCLEdBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUN2QyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUMvQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUNoQyxJQUFJLE1BQU0sS0FBSyxxQkFBcUIsRUFBRTtnQkFDcEMsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUM3QyxNQUFNLEVBQ04sS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQy9CLENBQUM7YUFDSDtZQUNELE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFZRCxDQUFDOzsrR0EzQk8sa0JBQWtCO21IQUFsQixrQkFBa0I7MkZBQWxCLGtCQUFrQjtrQkFEOUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGdXR1cmVTdG9ja0ZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvcHJvZHVjdC9mdXR1cmUtc3RvY2svcm9vdCc7XG5pbXBvcnQge1xuICBPQ0NfVVNFUl9JRF9BTk9OWU1PVVMsXG4gIFJvdXRpbmdTZXJ2aWNlLFxuICBVc2VySWRTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgc3dpdGNoTWFwLCB3aXRoTGF0ZXN0RnJvbSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEZ1dHVyZVN0b2NrQ29ubmVjdG9yIH0gZnJvbSAnLi4vY29ubmVjdG9ycyc7XG5pbXBvcnQgeyBQcm9kdWN0RnV0dXJlU3RvY2sgfSBmcm9tICcuLi9tb2RlbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGdXR1cmVTdG9ja1NlcnZpY2UgaW1wbGVtZW50cyBGdXR1cmVTdG9ja0ZhY2FkZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBQUk9EVUNUX0tFWSA9ICdwcm9kdWN0Q29kZSc7XG5cbiAgcHJvdGVjdGVkIGZ1dHVyZVN0b2NrU3RhdGUkOiBPYnNlcnZhYmxlPFByb2R1Y3RGdXR1cmVTdG9jayB8IHVuZGVmaW5lZD4gPVxuICAgIHRoaXMucm91dGluZ1NlcnZpY2UuZ2V0Um91dGVyU3RhdGUoKS5waXBlKFxuICAgICAgd2l0aExhdGVzdEZyb20odGhpcy51c2VySWRTZXJ2aWNlLnRha2VVc2VySWQoKSksXG4gICAgICBzd2l0Y2hNYXAoKFt7IHN0YXRlIH0sIHVzZXJJZF0pID0+IHtcbiAgICAgICAgaWYgKHVzZXJJZCAhPT0gT0NDX1VTRVJfSURfQU5PTllNT1VTKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZnV0dXJlU3RvY2tDb25uZWN0b3IuZ2V0RnV0dXJlU3RvY2soXG4gICAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgICBzdGF0ZS5wYXJhbXNbdGhpcy5QUk9EVUNUX0tFWV1cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgfSlcbiAgICApO1xuICAvKipcbiAgICogR2V0IGZ1dHVyZSBzdG9ja1xuICAgKi9cbiAgZ2V0RnV0dXJlU3RvY2soKTogT2JzZXJ2YWJsZTxQcm9kdWN0RnV0dXJlU3RvY2sgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5mdXR1cmVTdG9ja1N0YXRlJDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBmdXR1cmVTdG9ja0Nvbm5lY3RvcjogRnV0dXJlU3RvY2tDb25uZWN0b3IsXG4gICAgcHJvdGVjdGVkIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZVxuICApIHt9XG59XG4iXX0=