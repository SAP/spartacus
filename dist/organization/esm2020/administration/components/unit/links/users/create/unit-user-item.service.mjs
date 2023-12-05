/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { UserItemService } from '../../../../user/services/user-item.service';
import * as i0 from "@angular/core";
export class UnitUserItemService extends UserItemService {
    save(form, key) {
        // we enable the orgUnit temporarily so that the underlying
        // save method can read the complete form.value.
        form.get('orgUnit')?.enable();
        return super.save(form, key);
    }
    /**
     * @override
     * Returns 'unitDetails'
     */
    getDetailsRoute() {
        return 'orgUnitUserList';
    }
    buildRouteParams(item) {
        return { uid: item.orgUnit?.uid };
    }
    // @override to default method
    launchDetails(item) {
        const cxRoute = this.getDetailsRoute();
        const params = this.buildRouteParams(item);
        if (cxRoute && item && Object.keys(item).length > 0) {
            this.routingService.go({ cxRoute, params });
        }
    }
}
UnitUserItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserItemService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UnitUserItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserItemService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserItemService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC11c2VyLWl0ZW0uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2xpbmtzL3VzZXJzL2NyZWF0ZS91bml0LXVzZXItaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQzs7QUFLOUUsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGVBQWU7SUFDdEQsSUFBSSxDQUNGLElBQXNCLEVBQ3RCLEdBQVk7UUFFWiwyREFBMkQ7UUFDM0QsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFDOUIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7OztPQUdHO0lBQ08sZUFBZTtRQUN2QixPQUFPLGlCQUFpQixDQUFDO0lBQzNCLENBQUM7SUFFUyxnQkFBZ0IsQ0FBQyxJQUFhO1FBQ3RDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsOEJBQThCO0lBQzlCLGFBQWEsQ0FBQyxJQUFhO1FBQ3pCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNuRCxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQzdDO0lBQ0gsQ0FBQzs7Z0hBOUJVLG1CQUFtQjtvSEFBbkIsbUJBQW1CLGNBRmxCLE1BQU07MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVudHlwZWRGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCMkJVc2VyIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXMgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFVzZXJJdGVtU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3VzZXIvc2VydmljZXMvdXNlci1pdGVtLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVW5pdFVzZXJJdGVtU2VydmljZSBleHRlbmRzIFVzZXJJdGVtU2VydmljZSB7XG4gIHNhdmUoXG4gICAgZm9ybTogVW50eXBlZEZvcm1Hcm91cCxcbiAgICBrZXk/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb25JdGVtU3RhdHVzPEIyQlVzZXI+PiB7XG4gICAgLy8gd2UgZW5hYmxlIHRoZSBvcmdVbml0IHRlbXBvcmFyaWx5IHNvIHRoYXQgdGhlIHVuZGVybHlpbmdcbiAgICAvLyBzYXZlIG1ldGhvZCBjYW4gcmVhZCB0aGUgY29tcGxldGUgZm9ybS52YWx1ZS5cbiAgICBmb3JtLmdldCgnb3JnVW5pdCcpPy5lbmFibGUoKTtcbiAgICByZXR1cm4gc3VwZXIuc2F2ZShmb3JtLCBrZXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKiBSZXR1cm5zICd1bml0RGV0YWlscydcbiAgICovXG4gIHByb3RlY3RlZCBnZXREZXRhaWxzUm91dGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ29yZ1VuaXRVc2VyTGlzdCc7XG4gIH1cblxuICBwcm90ZWN0ZWQgYnVpbGRSb3V0ZVBhcmFtcyhpdGVtOiBCMkJVc2VyKSB7XG4gICAgcmV0dXJuIHsgdWlkOiBpdGVtLm9yZ1VuaXQ/LnVpZCB9O1xuICB9XG5cbiAgLy8gQG92ZXJyaWRlIHRvIGRlZmF1bHQgbWV0aG9kXG4gIGxhdW5jaERldGFpbHMoaXRlbTogQjJCVXNlcik6IHZvaWQge1xuICAgIGNvbnN0IGN4Um91dGUgPSB0aGlzLmdldERldGFpbHNSb3V0ZSgpO1xuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuYnVpbGRSb3V0ZVBhcmFtcyhpdGVtKTtcbiAgICBpZiAoY3hSb3V0ZSAmJiBpdGVtICYmIE9iamVjdC5rZXlzKGl0ZW0pLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMucm91dGluZ1NlcnZpY2UuZ28oeyBjeFJvdXRlLCBwYXJhbXMgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=