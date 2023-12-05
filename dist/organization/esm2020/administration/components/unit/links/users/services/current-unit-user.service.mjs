/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { CurrentItemService } from '../../../../shared/current-item.service';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/organization/administration/core";
export class CurrentUnitUserService extends CurrentItemService {
    constructor(routingService, b2bUserService) {
        super(routingService);
        this.routingService = routingService;
        this.b2bUserService = b2bUserService;
    }
    getDetailsRoute() {
        return 'orgUnitUserList';
    }
    getParamKey() {
        return ROUTE_PARAMS.userCode;
    }
    getItem(customerId) {
        return this.b2bUserService.get(customerId);
    }
    getError(code) {
        return this.b2bUserService.getErrorState(code);
    }
}
CurrentUnitUserService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUnitUserService, deps: [{ token: i1.RoutingService }, { token: i2.B2BUserService }], target: i0.ɵɵFactoryTarget.Injectable });
CurrentUnitUserService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUnitUserService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUnitUserService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i2.B2BUserService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC11bml0LXVzZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2xpbmtzL3VzZXJzL3NlcnZpY2VzL2N1cnJlbnQtdW5pdC11c2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBRTNFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOzs7O0FBSzdFLE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxrQkFBMkI7SUFDckUsWUFDWSxjQUE4QixFQUM5QixjQUE4QjtRQUV4QyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7UUFIWixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBRzFDLENBQUM7SUFFRCxlQUFlO1FBQ2IsT0FBTyxpQkFBaUIsQ0FBQztJQUMzQixDQUFDO0lBRVMsV0FBVztRQUNuQixPQUFPLFlBQVksQ0FBQyxRQUFRLENBQUM7SUFDL0IsQ0FBQztJQUVTLE9BQU8sQ0FBQyxVQUFrQjtRQUNsQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxRQUFRLENBQUMsSUFBWTtRQUNuQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7O21IQXRCVSxzQkFBc0I7dUhBQXRCLHNCQUFzQixjQUZyQixNQUFNOzJGQUVQLHNCQUFzQjtrQkFIbEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCMkJVc2VyLCBSb3V0aW5nU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBCMkJVc2VyU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgUk9VVEVfUEFSQU1TIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDdXJyZW50SXRlbVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvY3VycmVudC1pdGVtLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ3VycmVudFVuaXRVc2VyU2VydmljZSBleHRlbmRzIEN1cnJlbnRJdGVtU2VydmljZTxCMkJVc2VyPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGIyYlVzZXJTZXJ2aWNlOiBCMkJVc2VyU2VydmljZVxuICApIHtcbiAgICBzdXBlcihyb3V0aW5nU2VydmljZSk7XG4gIH1cblxuICBnZXREZXRhaWxzUm91dGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ29yZ1VuaXRVc2VyTGlzdCc7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0UGFyYW1LZXkoKSB7XG4gICAgcmV0dXJuIFJPVVRFX1BBUkFNUy51c2VyQ29kZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRJdGVtKGN1c3RvbWVySWQ6IHN0cmluZyk6IE9ic2VydmFibGU8QjJCVXNlcj4ge1xuICAgIHJldHVybiB0aGlzLmIyYlVzZXJTZXJ2aWNlLmdldChjdXN0b21lcklkKTtcbiAgfVxuXG4gIGdldEVycm9yKGNvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmIyYlVzZXJTZXJ2aWNlLmdldEVycm9yU3RhdGUoY29kZSk7XG4gIH1cbn1cbiJdfQ==