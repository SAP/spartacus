/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ItemService } from '../../../../shared/item.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/current-unit-user.service";
import * as i2 from "@spartacus/core";
import * as i3 from "./unit-user-roles-form.service";
import * as i4 from "@spartacus/organization/administration/core";
export class UnitUserRolesItemService extends ItemService {
    constructor(currentItemService, routingService, formService, unitService, b2bUserService) {
        super(currentItemService, routingService, formService);
        this.currentItemService = currentItemService;
        this.routingService = routingService;
        this.formService = formService;
        this.unitService = unitService;
        this.b2bUserService = b2bUserService;
    }
    save(form, key) {
        // we enable the unit so that the underlying
        // save method can read the complete form.value.
        form.get('orgUnit')?.enable();
        return super.save(form, key);
    }
    load(unitUid) {
        return this.b2bUserService.get(unitUid);
    }
    update(customerId, _user) {
        return this.b2bUserService.getLoadingStatus(customerId);
    }
    create(_customer) {
        return this.b2bUserService.getLoadingStatus('');
    }
    getDetailsRoute() {
        return this.currentItemService.getDetailsRoute();
    }
}
UnitUserRolesItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserRolesItemService, deps: [{ token: i1.CurrentUnitUserService }, { token: i2.RoutingService }, { token: i3.UnitUserRolesFormService }, { token: i4.OrgUnitService }, { token: i4.B2BUserService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitUserRolesItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserRolesItemService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserRolesItemService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CurrentUnitUserService }, { type: i2.RoutingService }, { type: i3.UnitUserRolesFormService }, { type: i4.OrgUnitService }, { type: i4.B2BUserService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC11c2VyLXJvbGVzLWl0ZW0uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2xpbmtzL3VzZXJzL3JvbGVzL3VuaXQtdXNlci1yb2xlcy1pdGVtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFTM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7Ozs7QUFNOUQsTUFBTSxPQUFPLHdCQUF5QixTQUFRLFdBQW9CO0lBQ2hFLFlBQ1ksa0JBQTBDLEVBQzFDLGNBQThCLEVBQzlCLFdBQXFDLEVBQ3JDLFdBQTJCLEVBQzNCLGNBQThCO1FBRXhDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFON0MsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUF3QjtRQUMxQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZ0JBQVcsR0FBWCxXQUFXLENBQTBCO1FBQ3JDLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUMzQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFHMUMsQ0FBQztJQUVELElBQUksQ0FDRixJQUFzQixFQUN0QixHQUFZO1FBRVosNENBQTRDO1FBQzVDLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBQzlCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQUksQ0FBQyxPQUFlO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELE1BQU0sQ0FDSixVQUFrQixFQUNsQixLQUFjO1FBRWQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFUyxNQUFNLENBQ2QsU0FBa0I7UUFFbEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFUyxlQUFlO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ25ELENBQUM7O3FIQXhDVSx3QkFBd0I7eUhBQXhCLHdCQUF3QixjQUZ2QixNQUFNOzJGQUVQLHdCQUF3QjtrQkFIcEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVbnR5cGVkRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQjJCVXNlciwgUm91dGluZ1NlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgQjJCVXNlclNlcnZpY2UsXG4gIE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXMsXG4gIE9yZ1VuaXRTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2l0ZW0uc2VydmljZSc7XG5pbXBvcnQgeyBDdXJyZW50VW5pdFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY3VycmVudC11bml0LXVzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBVbml0VXNlclJvbGVzRm9ybVNlcnZpY2UgfSBmcm9tICcuL3VuaXQtdXNlci1yb2xlcy1mb3JtLnNlcnZpY2UnO1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFVuaXRVc2VyUm9sZXNJdGVtU2VydmljZSBleHRlbmRzIEl0ZW1TZXJ2aWNlPEIyQlVzZXI+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGN1cnJlbnRJdGVtU2VydmljZTogQ3VycmVudFVuaXRVc2VyU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBmb3JtU2VydmljZTogVW5pdFVzZXJSb2xlc0Zvcm1TZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB1bml0U2VydmljZTogT3JnVW5pdFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGIyYlVzZXJTZXJ2aWNlOiBCMkJVc2VyU2VydmljZVxuICApIHtcbiAgICBzdXBlcihjdXJyZW50SXRlbVNlcnZpY2UsIHJvdXRpbmdTZXJ2aWNlLCBmb3JtU2VydmljZSk7XG4gIH1cblxuICBzYXZlKFxuICAgIGZvcm06IFVudHlwZWRGb3JtR3JvdXAsXG4gICAga2V5Pzogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8T3JnYW5pemF0aW9uSXRlbVN0YXR1czxCMkJVc2VyPj4ge1xuICAgIC8vIHdlIGVuYWJsZSB0aGUgdW5pdCBzbyB0aGF0IHRoZSB1bmRlcmx5aW5nXG4gICAgLy8gc2F2ZSBtZXRob2QgY2FuIHJlYWQgdGhlIGNvbXBsZXRlIGZvcm0udmFsdWUuXG4gICAgZm9ybS5nZXQoJ29yZ1VuaXQnKT8uZW5hYmxlKCk7XG4gICAgcmV0dXJuIHN1cGVyLnNhdmUoZm9ybSwga2V5KTtcbiAgfVxuXG4gIGxvYWQodW5pdFVpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxCMkJVc2VyPiB7XG4gICAgcmV0dXJuIHRoaXMuYjJiVXNlclNlcnZpY2UuZ2V0KHVuaXRVaWQpO1xuICB9XG5cbiAgdXBkYXRlKFxuICAgIGN1c3RvbWVySWQ6IHN0cmluZyxcbiAgICBfdXNlcjogQjJCVXNlclxuICApOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXM8QjJCVXNlcj4+IHtcbiAgICByZXR1cm4gdGhpcy5iMmJVc2VyU2VydmljZS5nZXRMb2FkaW5nU3RhdHVzKGN1c3RvbWVySWQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZShcbiAgICBfY3VzdG9tZXI6IEIyQlVzZXJcbiAgKTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb25JdGVtU3RhdHVzPEIyQlVzZXI+PiB7XG4gICAgcmV0dXJuIHRoaXMuYjJiVXNlclNlcnZpY2UuZ2V0TG9hZGluZ1N0YXR1cygnJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RGV0YWlsc1JvdXRlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudEl0ZW1TZXJ2aWNlLmdldERldGFpbHNSb3V0ZSgpO1xuICB9XG59XG4iXX0=