/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ItemService } from '../../shared/item.service';
import * as i0 from "@angular/core";
import * as i1 from "./current-unit.service";
import * as i2 from "@spartacus/core";
import * as i3 from "../form/unit-form.service";
import * as i4 from "@spartacus/organization/administration/core";
export class UnitItemService extends ItemService {
    constructor(currentItemService, routingService, formService, unitService) {
        super(currentItemService, routingService, formService);
        this.currentItemService = currentItemService;
        this.routingService = routingService;
        this.formService = formService;
        this.unitService = unitService;
    }
    /**
     * @override
     * Returns the unit for the given code.
     *
     * Loads the unit each time, to ensure accurate data is resolved.
     */
    load(code) {
        this.unitService.load(code);
        return this.unitService.get(code);
    }
    update(code, value) {
        this.unitService.update(code, value);
        return this.unitService.getLoadingStatus(value.uid ?? '');
    }
    create(value) {
        this.unitService.create(value);
        return this.unitService.getLoadingStatus(value.uid ?? '');
    }
    /**
     * @override
     * Returns 'unitDetails'
     */
    getDetailsRoute() {
        return 'orgUnitDetails';
    }
}
UnitItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitItemService, deps: [{ token: i1.CurrentUnitService }, { token: i2.RoutingService }, { token: i3.UnitFormService }, { token: i4.OrgUnitService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitItemService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitItemService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CurrentUnitService }, { type: i2.RoutingService }, { type: i3.UnitFormService }, { type: i4.OrgUnitService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1pdGVtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdW5pdC9zZXJ2aWNlcy91bml0LWl0ZW0uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU8zQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7OztBQU94RCxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxXQUFvQjtJQUN2RCxZQUNZLGtCQUFzQyxFQUN0QyxjQUE4QixFQUM5QixXQUE0QixFQUM1QixXQUEyQjtRQUVyQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBTDdDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGdCQUFXLEdBQVgsV0FBVyxDQUFpQjtRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7SUFHdkMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsSUFBSSxDQUFDLElBQVk7UUFDZixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxNQUFNLENBQ0osSUFBWSxFQUNaLEtBQWM7UUFFZCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVTLE1BQU0sQ0FDZCxLQUFjO1FBRWQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVEOzs7T0FHRztJQUNPLGVBQWU7UUFDdkIsT0FBTyxnQkFBZ0IsQ0FBQztJQUMxQixDQUFDOzs0R0ExQ1UsZUFBZTtnSEFBZixlQUFlLGNBRmQsTUFBTTsyRkFFUCxlQUFlO2tCQUgzQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEIyQlVuaXQsIFJvdXRpbmdTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXMsXG4gIE9yZ1VuaXRTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2l0ZW0uc2VydmljZSc7XG5pbXBvcnQgeyBVbml0Rm9ybVNlcnZpY2UgfSBmcm9tICcuLi9mb3JtL3VuaXQtZm9ybS5zZXJ2aWNlJztcbmltcG9ydCB7IEN1cnJlbnRVbml0U2VydmljZSB9IGZyb20gJy4vY3VycmVudC11bml0LnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVW5pdEl0ZW1TZXJ2aWNlIGV4dGVuZHMgSXRlbVNlcnZpY2U8QjJCVW5pdD4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY3VycmVudEl0ZW1TZXJ2aWNlOiBDdXJyZW50VW5pdFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZm9ybVNlcnZpY2U6IFVuaXRGb3JtU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdW5pdFNlcnZpY2U6IE9yZ1VuaXRTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGN1cnJlbnRJdGVtU2VydmljZSwgcm91dGluZ1NlcnZpY2UsIGZvcm1TZXJ2aWNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICogUmV0dXJucyB0aGUgdW5pdCBmb3IgdGhlIGdpdmVuIGNvZGUuXG4gICAqXG4gICAqIExvYWRzIHRoZSB1bml0IGVhY2ggdGltZSwgdG8gZW5zdXJlIGFjY3VyYXRlIGRhdGEgaXMgcmVzb2x2ZWQuXG4gICAqL1xuICBsb2FkKGNvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8QjJCVW5pdD4ge1xuICAgIHRoaXMudW5pdFNlcnZpY2UubG9hZChjb2RlKTtcbiAgICByZXR1cm4gdGhpcy51bml0U2VydmljZS5nZXQoY29kZSk7XG4gIH1cblxuICB1cGRhdGUoXG4gICAgY29kZTogc3RyaW5nLFxuICAgIHZhbHVlOiBCMkJVbml0XG4gICk6IE9ic2VydmFibGU8T3JnYW5pemF0aW9uSXRlbVN0YXR1czxCMkJVbml0Pj4ge1xuICAgIHRoaXMudW5pdFNlcnZpY2UudXBkYXRlKGNvZGUsIHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy51bml0U2VydmljZS5nZXRMb2FkaW5nU3RhdHVzKHZhbHVlLnVpZCA/PyAnJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlKFxuICAgIHZhbHVlOiBCMkJVbml0XG4gICk6IE9ic2VydmFibGU8T3JnYW5pemF0aW9uSXRlbVN0YXR1czxCMkJVbml0Pj4ge1xuICAgIHRoaXMudW5pdFNlcnZpY2UuY3JlYXRlKHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy51bml0U2VydmljZS5nZXRMb2FkaW5nU3RhdHVzKHZhbHVlLnVpZCA/PyAnJyk7XG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqIFJldHVybnMgJ3VuaXREZXRhaWxzJ1xuICAgKi9cbiAgcHJvdGVjdGVkIGdldERldGFpbHNSb3V0ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnb3JnVW5pdERldGFpbHMnO1xuICB9XG59XG4iXX0=