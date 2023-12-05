/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { isNotUndefined } from '@spartacus/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { distinctUntilChanged, filter, first, map } from 'rxjs/operators';
import { ItemService } from '../../../../shared/item.service';
import * as i0 from "@angular/core";
import * as i1 from "./current-unit-address.service";
import * as i2 from "@spartacus/core";
import * as i3 from "../form/unit-address-form.service";
import * as i4 from "@spartacus/organization/administration/core";
export class UnitAddressItemService extends ItemService {
    constructor(currentItemService, routingService, formService, unitService) {
        super(currentItemService, routingService, formService);
        this.currentItemService = currentItemService;
        this.routingService = routingService;
        this.formService = formService;
        this.unitService = unitService;
        this.unitRouteParam$ = this.routingService.getParams().pipe(map((params) => params[ROUTE_PARAMS.unitCode]), distinctUntilChanged());
    }
    load(unitUid, addressId) {
        return this.unitService
            .getAddress(unitUid, addressId)
            .pipe(filter(isNotUndefined));
    }
    update(addressCode, address) {
        this.unitRouteParam$.pipe(first()).subscribe((unitCode) => {
            this.unitService.updateAddress(unitCode, addressCode, address);
        });
        return this.unitService.getAddressLoadingStatus(addressCode);
    }
    create(value) {
        this.unitRouteParam$
            .pipe(first())
            .subscribe((unitCode) => this.unitService.createAddress(unitCode, value));
        return this.unitService.getAddressLoadingStatus(value.id ?? '');
    }
    getDetailsRoute() {
        return this.currentItemService.getDetailsRoute();
    }
    delete(addressId, unitUid) {
        this.launchList();
        this.unitService.deleteAddress(unitUid, addressId);
        return this.unitService.getAddressLoadingStatus(addressId);
    }
    launchDetails(item) {
        if (!item.id) {
            // since the ID is generated in the backend
            // we redirect to the list instead.
            this.launchList();
        }
        else {
            this.unitRouteParam$.pipe(first()).subscribe((unitCode) => {
                this.routingService.go({
                    cxRoute: this.getDetailsRoute(),
                    params: { ...item, uid: unitCode },
                });
            });
        }
    }
    launchList() {
        this.unitRouteParam$.pipe(first()).subscribe((unitCode) => {
            this.routingService.go({
                cxRoute: 'orgUnitAddressList',
                params: { uid: unitCode },
            });
        });
    }
}
UnitAddressItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressItemService, deps: [{ token: i1.CurrentUnitAddressService }, { token: i2.RoutingService }, { token: i3.UnitAddressFormService }, { token: i4.OrgUnitService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitAddressItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressItemService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressItemService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CurrentUnitAddressService }, { type: i2.RoutingService }, { type: i3.UnitAddressFormService }, { type: i4.OrgUnitService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1hZGRyZXNzLWl0ZW0uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2xpbmtzL2FkZHJlc3Nlcy9zZXJ2aWNlcy91bml0LWFkZHJlc3MtaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBVyxjQUFjLEVBQWtCLE1BQU0saUJBQWlCLENBQUM7QUFLMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBRTNFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7O0FBTzlELE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxXQUFvQjtJQUM5RCxZQUNZLGtCQUE2QyxFQUM3QyxjQUE4QixFQUM5QixXQUFtQyxFQUNuQyxXQUEyQjtRQUVyQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBTDdDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBMkI7UUFDN0MsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGdCQUFXLEdBQVgsV0FBVyxDQUF3QjtRQUNuQyxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFLN0Isb0JBQWUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FDOUQsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQzlDLG9CQUFvQixFQUFFLENBQ3ZCLENBQUM7SUFMRixDQUFDO0lBT0QsSUFBSSxDQUFDLE9BQWUsRUFBRSxTQUFpQjtRQUNyQyxPQUFPLElBQUksQ0FBQyxXQUFXO2FBQ3BCLFVBQVUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO2FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsTUFBTSxDQUNKLFdBQW1CLEVBQ25CLE9BQWdCO1FBRWhCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDeEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRVMsTUFBTSxDQUNkLEtBQWM7UUFFZCxJQUFJLENBQUMsZUFBZTthQUNqQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDYixTQUFTLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzVFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFUyxlQUFlO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFRCxNQUFNLENBQ0osU0FBaUIsRUFDakIsT0FBZTtRQUVmLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDbkQsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxhQUFhLENBQUMsSUFBYTtRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNaLDJDQUEyQztZQUMzQyxtQ0FBbUM7WUFDbkMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ25CO2FBQU07WUFDTCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUN4RCxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztvQkFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUU7b0JBQy9CLE1BQU0sRUFBRSxFQUFFLEdBQUcsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUU7aUJBQ25DLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRVMsVUFBVTtRQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3hELElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDO2dCQUNyQixPQUFPLEVBQUUsb0JBQW9CO2dCQUM3QixNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFO2FBQzFCLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7bUhBM0VVLHNCQUFzQjt1SEFBdEIsc0JBQXNCLGNBRnJCLE1BQU07MkZBRVAsc0JBQXNCO2tCQUhsQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFkZHJlc3MsIGlzTm90VW5kZWZpbmVkLCBSb3V0aW5nU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBPcmdhbml6YXRpb25JdGVtU3RhdHVzLFxuICBPcmdVbml0U2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQgeyBST1VURV9QQVJBTVMgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9yb290JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIGZpcnN0LCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9pdGVtLnNlcnZpY2UnO1xuaW1wb3J0IHsgVW5pdEFkZHJlc3NGb3JtU2VydmljZSB9IGZyb20gJy4uL2Zvcm0vdW5pdC1hZGRyZXNzLWZvcm0uc2VydmljZSc7XG5pbXBvcnQgeyBDdXJyZW50VW5pdEFkZHJlc3NTZXJ2aWNlIH0gZnJvbSAnLi9jdXJyZW50LXVuaXQtYWRkcmVzcy5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFVuaXRBZGRyZXNzSXRlbVNlcnZpY2UgZXh0ZW5kcyBJdGVtU2VydmljZTxBZGRyZXNzPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjdXJyZW50SXRlbVNlcnZpY2U6IEN1cnJlbnRVbml0QWRkcmVzc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZm9ybVNlcnZpY2U6IFVuaXRBZGRyZXNzRm9ybVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHVuaXRTZXJ2aWNlOiBPcmdVbml0U2VydmljZVxuICApIHtcbiAgICBzdXBlcihjdXJyZW50SXRlbVNlcnZpY2UsIHJvdXRpbmdTZXJ2aWNlLCBmb3JtU2VydmljZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgdW5pdFJvdXRlUGFyYW0kID0gdGhpcy5yb3V0aW5nU2VydmljZS5nZXRQYXJhbXMoKS5waXBlKFxuICAgIG1hcCgocGFyYW1zKSA9PiBwYXJhbXNbUk9VVEVfUEFSQU1TLnVuaXRDb2RlXSksXG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICApO1xuXG4gIGxvYWQodW5pdFVpZDogc3RyaW5nLCBhZGRyZXNzSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8QWRkcmVzcz4ge1xuICAgIHJldHVybiB0aGlzLnVuaXRTZXJ2aWNlXG4gICAgICAuZ2V0QWRkcmVzcyh1bml0VWlkLCBhZGRyZXNzSWQpXG4gICAgICAucGlwZShmaWx0ZXIoaXNOb3RVbmRlZmluZWQpKTtcbiAgfVxuXG4gIHVwZGF0ZShcbiAgICBhZGRyZXNzQ29kZTogc3RyaW5nLFxuICAgIGFkZHJlc3M6IEFkZHJlc3NcbiAgKTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb25JdGVtU3RhdHVzPEFkZHJlc3M+PiB7XG4gICAgdGhpcy51bml0Um91dGVQYXJhbSQucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoKHVuaXRDb2RlKSA9PiB7XG4gICAgICB0aGlzLnVuaXRTZXJ2aWNlLnVwZGF0ZUFkZHJlc3ModW5pdENvZGUsIGFkZHJlc3NDb2RlLCBhZGRyZXNzKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy51bml0U2VydmljZS5nZXRBZGRyZXNzTG9hZGluZ1N0YXR1cyhhZGRyZXNzQ29kZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlKFxuICAgIHZhbHVlOiBBZGRyZXNzXG4gICk6IE9ic2VydmFibGU8T3JnYW5pemF0aW9uSXRlbVN0YXR1czxBZGRyZXNzPj4ge1xuICAgIHRoaXMudW5pdFJvdXRlUGFyYW0kXG4gICAgICAucGlwZShmaXJzdCgpKVxuICAgICAgLnN1YnNjcmliZSgodW5pdENvZGUpID0+IHRoaXMudW5pdFNlcnZpY2UuY3JlYXRlQWRkcmVzcyh1bml0Q29kZSwgdmFsdWUpKTtcbiAgICByZXR1cm4gdGhpcy51bml0U2VydmljZS5nZXRBZGRyZXNzTG9hZGluZ1N0YXR1cyh2YWx1ZS5pZCA/PyAnJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RGV0YWlsc1JvdXRlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudEl0ZW1TZXJ2aWNlLmdldERldGFpbHNSb3V0ZSgpO1xuICB9XG5cbiAgZGVsZXRlKFxuICAgIGFkZHJlc3NJZDogc3RyaW5nLFxuICAgIHVuaXRVaWQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXM8QWRkcmVzcz4+IHtcbiAgICB0aGlzLmxhdW5jaExpc3QoKTtcbiAgICB0aGlzLnVuaXRTZXJ2aWNlLmRlbGV0ZUFkZHJlc3ModW5pdFVpZCwgYWRkcmVzc0lkKTtcbiAgICByZXR1cm4gdGhpcy51bml0U2VydmljZS5nZXRBZGRyZXNzTG9hZGluZ1N0YXR1cyhhZGRyZXNzSWQpO1xuICB9XG5cbiAgbGF1bmNoRGV0YWlscyhpdGVtOiBBZGRyZXNzKTogdm9pZCB7XG4gICAgaWYgKCFpdGVtLmlkKSB7XG4gICAgICAvLyBzaW5jZSB0aGUgSUQgaXMgZ2VuZXJhdGVkIGluIHRoZSBiYWNrZW5kXG4gICAgICAvLyB3ZSByZWRpcmVjdCB0byB0aGUgbGlzdCBpbnN0ZWFkLlxuICAgICAgdGhpcy5sYXVuY2hMaXN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudW5pdFJvdXRlUGFyYW0kLnBpcGUoZmlyc3QoKSkuc3Vic2NyaWJlKCh1bml0Q29kZSkgPT4ge1xuICAgICAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdvKHtcbiAgICAgICAgICBjeFJvdXRlOiB0aGlzLmdldERldGFpbHNSb3V0ZSgpLFxuICAgICAgICAgIHBhcmFtczogeyAuLi5pdGVtLCB1aWQ6IHVuaXRDb2RlIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGxhdW5jaExpc3QoKSB7XG4gICAgdGhpcy51bml0Um91dGVQYXJhbSQucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoKHVuaXRDb2RlKSA9PiB7XG4gICAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdvKHtcbiAgICAgICAgY3hSb3V0ZTogJ29yZ1VuaXRBZGRyZXNzTGlzdCcsXG4gICAgICAgIHBhcmFtczogeyB1aWQ6IHVuaXRDb2RlIH0sXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19