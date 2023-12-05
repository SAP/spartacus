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
export class CurrentUnitService extends CurrentItemService {
    constructor(routingService, orgUnitService) {
        super(routingService);
        this.routingService = routingService;
        this.orgUnitService = orgUnitService;
    }
    getParamKey() {
        return ROUTE_PARAMS.unitCode;
    }
    getItem(code) {
        return this.orgUnitService.get(code);
    }
    getError(code) {
        return this.orgUnitService.getErrorState(code);
    }
}
CurrentUnitService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUnitService, deps: [{ token: i1.RoutingService }, { token: i2.OrgUnitService }], target: i0.ɵɵFactoryTarget.Injectable });
CurrentUnitService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUnitService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUnitService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i2.OrgUnitService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC11bml0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdW5pdC9zZXJ2aWNlcy9jdXJyZW50LXVuaXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFM0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7QUFLdkUsTUFBTSxPQUFPLGtCQUFtQixTQUFRLGtCQUEyQjtJQUNqRSxZQUNZLGNBQThCLEVBQzlCLGNBQThCO1FBRXhDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUhaLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFHMUMsQ0FBQztJQUVTLFdBQVc7UUFDbkIsT0FBTyxZQUFZLENBQUMsUUFBUSxDQUFDO0lBQy9CLENBQUM7SUFFUyxPQUFPLENBQUMsSUFBWTtRQUM1QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxRQUFRLENBQUMsSUFBWTtRQUNuQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7OytHQWxCVSxrQkFBa0I7bUhBQWxCLGtCQUFrQixjQUZqQixNQUFNOzJGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCMkJVbml0LCBSb3V0aW5nU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPcmdVbml0U2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgUk9VVEVfUEFSQU1TIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDdXJyZW50SXRlbVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvY3VycmVudC1pdGVtLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ3VycmVudFVuaXRTZXJ2aWNlIGV4dGVuZHMgQ3VycmVudEl0ZW1TZXJ2aWNlPEIyQlVuaXQ+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgb3JnVW5pdFNlcnZpY2U6IE9yZ1VuaXRTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKHJvdXRpbmdTZXJ2aWNlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRQYXJhbUtleSgpIHtcbiAgICByZXR1cm4gUk9VVEVfUEFSQU1TLnVuaXRDb2RlO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEl0ZW0oY29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxCMkJVbml0PiB7XG4gICAgcmV0dXJuIHRoaXMub3JnVW5pdFNlcnZpY2UuZ2V0KGNvZGUpO1xuICB9XG5cbiAgZ2V0RXJyb3IoY29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMub3JnVW5pdFNlcnZpY2UuZ2V0RXJyb3JTdGF0ZShjb2RlKTtcbiAgfVxufVxuIl19