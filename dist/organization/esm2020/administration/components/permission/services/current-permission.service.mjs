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
export class CurrentPermissionService extends CurrentItemService {
    constructor(routingService, permissionService) {
        super(routingService);
        this.routingService = routingService;
        this.permissionService = permissionService;
    }
    getParamKey() {
        return ROUTE_PARAMS.permissionCode;
    }
    getItem(code) {
        return this.permissionService.get(code);
    }
    getError(code) {
        return this.permissionService.getErrorState(code);
    }
}
CurrentPermissionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentPermissionService, deps: [{ token: i1.RoutingService }, { token: i2.PermissionService }], target: i0.ɵɵFactoryTarget.Injectable });
CurrentPermissionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentPermissionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentPermissionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i2.PermissionService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC1wZXJtaXNzaW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvcGVybWlzc2lvbi9zZXJ2aWNlcy9jdXJyZW50LXBlcm1pc3Npb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU0zQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFM0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7QUFLdkUsTUFBTSxPQUFPLHdCQUF5QixTQUFRLGtCQUE4QjtJQUMxRSxZQUNZLGNBQThCLEVBQzlCLGlCQUFvQztRQUU5QyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7UUFIWixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUdoRCxDQUFDO0lBRVMsV0FBVztRQUNuQixPQUFPLFlBQVksQ0FBQyxjQUFjLENBQUM7SUFDckMsQ0FBQztJQUVTLE9BQU8sQ0FBQyxJQUFZO1FBQzVCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsUUFBUSxDQUFDLElBQVk7UUFDbkIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUM7O3FIQWxCVSx3QkFBd0I7eUhBQXhCLHdCQUF3QixjQUZ2QixNQUFNOzJGQUVQLHdCQUF3QjtrQkFIcEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0aW5nU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBQZXJtaXNzaW9uLFxuICBQZXJtaXNzaW9uU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQgeyBST1VURV9QQVJBTVMgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9yb290JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEN1cnJlbnRJdGVtU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9jdXJyZW50LWl0ZW0uc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDdXJyZW50UGVybWlzc2lvblNlcnZpY2UgZXh0ZW5kcyBDdXJyZW50SXRlbVNlcnZpY2U8UGVybWlzc2lvbj4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBwZXJtaXNzaW9uU2VydmljZTogUGVybWlzc2lvblNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIocm91dGluZ1NlcnZpY2UpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFBhcmFtS2V5KCkge1xuICAgIHJldHVybiBST1VURV9QQVJBTVMucGVybWlzc2lvbkNvZGU7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0SXRlbShjb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFBlcm1pc3Npb24+IHtcbiAgICByZXR1cm4gdGhpcy5wZXJtaXNzaW9uU2VydmljZS5nZXQoY29kZSk7XG4gIH1cblxuICBnZXRFcnJvcihjb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5wZXJtaXNzaW9uU2VydmljZS5nZXRFcnJvclN0YXRlKGNvZGUpO1xuICB9XG59XG4iXX0=