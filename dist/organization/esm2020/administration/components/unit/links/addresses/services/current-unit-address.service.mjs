/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { CurrentItemService } from '../../../../shared/current-item.service';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/organization/administration/core";
export class CurrentUnitAddressService extends CurrentItemService {
    constructor(routingService, unitService) {
        super(routingService);
        this.routingService = routingService;
        this.unitService = unitService;
        // override item$ as we need to use the unit code as well
        this.item$ = this.b2bUnit$.pipe(filter((unitUid) => Boolean(unitUid)), switchMap((unitUid) => this.key$.pipe(switchMap((code) => this.getItem(unitUid, code)))));
    }
    getDetailsRoute() {
        return 'orgUnitAddressDetails';
    }
    getParamKey() {
        return ROUTE_PARAMS.addressCode;
    }
    getItem(unitUid, addressId) {
        return addressId
            ? this.unitService.getAddress(unitUid, addressId)
            : of(undefined);
    }
    getError(code) {
        return this.unitService.getErrorState(code);
    }
}
CurrentUnitAddressService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUnitAddressService, deps: [{ token: i1.RoutingService }, { token: i2.OrgUnitService }], target: i0.ɵɵFactoryTarget.Injectable });
CurrentUnitAddressService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUnitAddressService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUnitAddressService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i2.OrgUnitService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC11bml0LWFkZHJlc3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2xpbmtzL2FkZHJlc3Nlcy9zZXJ2aWNlcy9jdXJyZW50LXVuaXQtYWRkcmVzcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMzRSxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7Ozs7QUFLN0UsTUFBTSxPQUFPLHlCQUEwQixTQUFRLGtCQUEyQjtJQVN4RSxZQUNZLGNBQThCLEVBQzlCLFdBQTJCO1FBRXJDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUhaLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFWdkMseURBQXlEO1FBQ2hELFVBQUssR0FBb0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ2xFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQ3JDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQVksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUN6RSxDQUNGLENBQUM7SUFPRixDQUFDO0lBRUQsZUFBZTtRQUNiLE9BQU8sdUJBQXVCLENBQUM7SUFDakMsQ0FBQztJQUVTLFdBQVc7UUFDbkIsT0FBTyxZQUFZLENBQUMsV0FBVyxDQUFDO0lBQ2xDLENBQUM7SUFFUyxPQUFPLENBQ2YsT0FBZSxFQUNmLFNBQWlCO1FBRWpCLE9BQU8sU0FBUztZQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO1lBQ2pELENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFZO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7c0hBbkNVLHlCQUF5QjswSEFBekIseUJBQXlCLGNBRnhCLE1BQU07MkZBRVAseUJBQXlCO2tCQUhyQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFkZHJlc3MsIFJvdXRpbmdTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9yZ1VuaXRTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQgeyBST1VURV9QQVJBTVMgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9yb290JztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEN1cnJlbnRJdGVtU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9jdXJyZW50LWl0ZW0uc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDdXJyZW50VW5pdEFkZHJlc3NTZXJ2aWNlIGV4dGVuZHMgQ3VycmVudEl0ZW1TZXJ2aWNlPEFkZHJlc3M+IHtcbiAgLy8gb3ZlcnJpZGUgaXRlbSQgYXMgd2UgbmVlZCB0byB1c2UgdGhlIHVuaXQgY29kZSBhcyB3ZWxsXG4gIHJlYWRvbmx5IGl0ZW0kOiBPYnNlcnZhYmxlPEFkZHJlc3MgfCB1bmRlZmluZWQ+ID0gdGhpcy5iMmJVbml0JC5waXBlKFxuICAgIGZpbHRlcigodW5pdFVpZCkgPT4gQm9vbGVhbih1bml0VWlkKSksXG4gICAgc3dpdGNoTWFwKCh1bml0VWlkKSA9PlxuICAgICAgdGhpcy5rZXkkLnBpcGUoc3dpdGNoTWFwKChjb2RlOiBzdHJpbmcpID0+IHRoaXMuZ2V0SXRlbSh1bml0VWlkLCBjb2RlKSkpXG4gICAgKVxuICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHVuaXRTZXJ2aWNlOiBPcmdVbml0U2VydmljZVxuICApIHtcbiAgICBzdXBlcihyb3V0aW5nU2VydmljZSk7XG4gIH1cblxuICBnZXREZXRhaWxzUm91dGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ29yZ1VuaXRBZGRyZXNzRGV0YWlscyc7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0UGFyYW1LZXkoKSB7XG4gICAgcmV0dXJuIFJPVVRFX1BBUkFNUy5hZGRyZXNzQ29kZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRJdGVtKFxuICAgIHVuaXRVaWQ6IHN0cmluZyxcbiAgICBhZGRyZXNzSWQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPEFkZHJlc3MgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gYWRkcmVzc0lkXG4gICAgICA/IHRoaXMudW5pdFNlcnZpY2UuZ2V0QWRkcmVzcyh1bml0VWlkLCBhZGRyZXNzSWQpXG4gICAgICA6IG9mKHVuZGVmaW5lZCk7XG4gIH1cblxuICBnZXRFcnJvcihjb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy51bml0U2VydmljZS5nZXRFcnJvclN0YXRlKGNvZGUpO1xuICB9XG59XG4iXX0=