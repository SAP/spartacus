/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { distinctUntilChanged, map, shareReplay, switchMap, tap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/order/root";
export class ReplenishmentOrderDetailsService {
    constructor(routingService, replenishmentOrderHistoryFacade) {
        this.routingService = routingService;
        this.replenishmentOrderHistoryFacade = replenishmentOrderHistoryFacade;
        this.replenishmentOrderCode$ = this.routingService.getRouterState().pipe(map((routingData) => routingData.state.params.replenishmentOrderCode), distinctUntilChanged());
        this.replenishmentOrderLoad$ = this.replenishmentOrderCode$.pipe(tap((replenishmentOrderCode) => {
            if (Boolean(replenishmentOrderCode)) {
                this.replenishmentOrderHistoryFacade.loadReplenishmentOrderDetails(replenishmentOrderCode);
            }
            else {
                this.replenishmentOrderHistoryFacade.clearReplenishmentOrderDetails();
            }
        }), shareReplay({ bufferSize: 1, refCount: true }));
    }
    getOrderDetails() {
        return this.replenishmentOrderLoad$.pipe(switchMap((_) => this.replenishmentOrderHistoryFacade.getReplenishmentOrderDetails()));
    }
}
ReplenishmentOrderDetailsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderDetailsService, deps: [{ token: i1.RoutingService }, { token: i2.ReplenishmentOrderHistoryFacade }], target: i0.ɵɵFactoryTarget.Injectable });
ReplenishmentOrderDetailsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderDetailsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderDetailsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i2.ReplenishmentOrderHistoryFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGVuaXNobWVudC1vcmRlci1kZXRhaWxzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29tcG9uZW50cy9yZXBsZW5pc2htZW50LW9yZGVyLWRldGFpbHMvcmVwbGVuaXNobWVudC1vcmRlci1kZXRhaWxzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPM0MsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixHQUFHLEVBQ0gsV0FBVyxFQUNYLFNBQVMsRUFDVCxHQUFHLEdBQ0osTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUt4QixNQUFNLE9BQU8sZ0NBQWdDO0lBbUIzQyxZQUNZLGNBQThCLEVBQzlCLCtCQUFnRTtRQURoRSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsb0NBQStCLEdBQS9CLCtCQUErQixDQUFpQztRQXBCbEUsNEJBQXVCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQzNFLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsRUFDckUsb0JBQW9CLEVBQUUsQ0FDdkIsQ0FBQztRQUVRLDRCQUF1QixHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQ25FLEdBQUcsQ0FBQyxDQUFDLHNCQUE4QixFQUFFLEVBQUU7WUFDckMsSUFBSSxPQUFPLENBQUMsc0JBQXNCLENBQUMsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLCtCQUErQixDQUFDLDZCQUE2QixDQUNoRSxzQkFBc0IsQ0FDdkIsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLElBQUksQ0FBQywrQkFBK0IsQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO2FBQ3ZFO1FBQ0gsQ0FBQyxDQUFDLEVBQ0YsV0FBVyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FDL0MsQ0FBQztJQUtDLENBQUM7SUFFSixlQUFlO1FBQ2IsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUN0QyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUNkLElBQUksQ0FBQywrQkFBK0IsQ0FBQyw0QkFBNEIsRUFBRSxDQUNwRSxDQUNGLENBQUM7SUFDSixDQUFDOzs2SEE5QlUsZ0NBQWdDO2lJQUFoQyxnQ0FBZ0MsY0FGL0IsTUFBTTsyRkFFUCxnQ0FBZ0M7a0JBSDVDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGluZ1NlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgUmVwbGVuaXNobWVudE9yZGVyLFxuICBSZXBsZW5pc2htZW50T3JkZXJIaXN0b3J5RmFjYWRlLFxufSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIG1hcCxcbiAgc2hhcmVSZXBsYXksXG4gIHN3aXRjaE1hcCxcbiAgdGFwLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBSZXBsZW5pc2htZW50T3JkZXJEZXRhaWxzU2VydmljZSB7XG4gIHByb3RlY3RlZCByZXBsZW5pc2htZW50T3JkZXJDb2RlJCA9IHRoaXMucm91dGluZ1NlcnZpY2UuZ2V0Um91dGVyU3RhdGUoKS5waXBlKFxuICAgIG1hcCgocm91dGluZ0RhdGEpID0+IHJvdXRpbmdEYXRhLnN0YXRlLnBhcmFtcy5yZXBsZW5pc2htZW50T3JkZXJDb2RlKSxcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICk7XG5cbiAgcHJvdGVjdGVkIHJlcGxlbmlzaG1lbnRPcmRlckxvYWQkID0gdGhpcy5yZXBsZW5pc2htZW50T3JkZXJDb2RlJC5waXBlKFxuICAgIHRhcCgocmVwbGVuaXNobWVudE9yZGVyQ29kZTogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoQm9vbGVhbihyZXBsZW5pc2htZW50T3JkZXJDb2RlKSkge1xuICAgICAgICB0aGlzLnJlcGxlbmlzaG1lbnRPcmRlckhpc3RvcnlGYWNhZGUubG9hZFJlcGxlbmlzaG1lbnRPcmRlckRldGFpbHMoXG4gICAgICAgICAgcmVwbGVuaXNobWVudE9yZGVyQ29kZVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZXBsZW5pc2htZW50T3JkZXJIaXN0b3J5RmFjYWRlLmNsZWFyUmVwbGVuaXNobWVudE9yZGVyRGV0YWlscygpO1xuICAgICAgfVxuICAgIH0pLFxuICAgIHNoYXJlUmVwbGF5KHsgYnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IHRydWUgfSlcbiAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByZXBsZW5pc2htZW50T3JkZXJIaXN0b3J5RmFjYWRlOiBSZXBsZW5pc2htZW50T3JkZXJIaXN0b3J5RmFjYWRlXG4gICkge31cblxuICBnZXRPcmRlckRldGFpbHMoKTogT2JzZXJ2YWJsZTxSZXBsZW5pc2htZW50T3JkZXI+IHtcbiAgICByZXR1cm4gdGhpcy5yZXBsZW5pc2htZW50T3JkZXJMb2FkJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKChfKSA9PlxuICAgICAgICB0aGlzLnJlcGxlbmlzaG1lbnRPcmRlckhpc3RvcnlGYWNhZGUuZ2V0UmVwbGVuaXNobWVudE9yZGVyRGV0YWlscygpXG4gICAgICApXG4gICAgKTtcbiAgfVxufVxuIl19