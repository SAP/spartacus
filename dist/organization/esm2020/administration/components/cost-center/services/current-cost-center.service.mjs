/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { CurrentItemService } from '../../shared/current-item.service';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/organization/administration/core";
export class CurrentCostCenterService extends CurrentItemService {
    constructor(routingService, costCenterService) {
        super(routingService);
        this.routingService = routingService;
        this.costCenterService = costCenterService;
    }
    getParamKey() {
        return ROUTE_PARAMS.costCenterCode;
    }
    getItem(code) {
        return this.costCenterService.get(code);
    }
    getError(code) {
        return this.costCenterService.getErrorState(code);
    }
}
CurrentCostCenterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentCostCenterService, deps: [{ token: i1.RoutingService }, { token: i2.CostCenterService }], target: i0.ɵɵFactoryTarget.Injectable });
CurrentCostCenterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentCostCenterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentCostCenterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i2.CostCenterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC1jb3N0LWNlbnRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL2Nvc3QtY2VudGVyL3NlcnZpY2VzL2N1cnJlbnQtY29zdC1jZW50ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFM0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7QUFLdkUsTUFBTSxPQUFPLHdCQUF5QixTQUFRLGtCQUE4QjtJQUMxRSxZQUNZLGNBQThCLEVBQzlCLGlCQUFvQztRQUU5QyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7UUFIWixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUdoRCxDQUFDO0lBRVMsV0FBVztRQUNuQixPQUFPLFlBQVksQ0FBQyxjQUFjLENBQUM7SUFDckMsQ0FBQztJQUVTLE9BQU8sQ0FBQyxJQUFZO1FBQzVCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsUUFBUSxDQUFDLElBQVk7UUFDbkIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUM7O3FIQWxCVSx3QkFBd0I7eUhBQXhCLHdCQUF3QixjQUZ2QixNQUFNOzJGQUVQLHdCQUF3QjtrQkFIcEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3N0Q2VudGVyLCBSb3V0aW5nU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDb3N0Q2VudGVyU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgUk9VVEVfUEFSQU1TIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDdXJyZW50SXRlbVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvY3VycmVudC1pdGVtLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ3VycmVudENvc3RDZW50ZXJTZXJ2aWNlIGV4dGVuZHMgQ3VycmVudEl0ZW1TZXJ2aWNlPENvc3RDZW50ZXI+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29zdENlbnRlclNlcnZpY2U6IENvc3RDZW50ZXJTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKHJvdXRpbmdTZXJ2aWNlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRQYXJhbUtleSgpIHtcbiAgICByZXR1cm4gUk9VVEVfUEFSQU1TLmNvc3RDZW50ZXJDb2RlO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEl0ZW0oY29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxDb3N0Q2VudGVyPiB7XG4gICAgcmV0dXJuIHRoaXMuY29zdENlbnRlclNlcnZpY2UuZ2V0KGNvZGUpO1xuICB9XG5cbiAgZ2V0RXJyb3IoY29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuY29zdENlbnRlclNlcnZpY2UuZ2V0RXJyb3JTdGF0ZShjb2RlKTtcbiAgfVxufVxuIl19