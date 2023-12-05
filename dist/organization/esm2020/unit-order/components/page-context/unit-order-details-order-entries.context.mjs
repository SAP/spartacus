/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { OrderEntriesSource, } from '@spartacus/cart/base/root';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../unit-level-order-detail";
export class UnitOrderDetailsOrderEntriesContext {
    constructor(unitLevelOrderDetailService) {
        this.unitLevelOrderDetailService = unitLevelOrderDetailService;
        this.type = OrderEntriesSource.UNIT_ORDER_DETAILS;
    }
    getEntries() {
        return this.unitLevelOrderDetailService
            .getOrderDetails()
            .pipe(map((order) => order?.entries ?? []));
    }
}
UnitOrderDetailsOrderEntriesContext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderDetailsOrderEntriesContext, deps: [{ token: i1.UnitLevelOrderDetailService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitOrderDetailsOrderEntriesContext.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderDetailsOrderEntriesContext, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderDetailsOrderEntriesContext, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.UnitLevelOrderDetailService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1vcmRlci1kZXRhaWxzLW9yZGVyLWVudHJpZXMuY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vdW5pdC1vcmRlci9jb21wb25lbnRzL3BhZ2UtY29udGV4dC91bml0LW9yZGVyLWRldGFpbHMtb3JkZXItZW50cmllcy5jb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFFTCxrQkFBa0IsR0FFbkIsTUFBTSwyQkFBMkIsQ0FBQztBQUduQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQU1yQyxNQUFNLE9BQU8sbUNBQW1DO0lBSzlDLFlBQ1ksMkJBQXdEO1FBQXhELGdDQUEyQixHQUEzQiwyQkFBMkIsQ0FBNkI7UUFIM0QsU0FBSSxHQUFHLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDO0lBSW5ELENBQUM7SUFFSixVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsMkJBQTJCO2FBQ3BDLGVBQWUsRUFBRTthQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7Z0lBYlUsbUNBQW1DO29JQUFuQyxtQ0FBbUMsY0FGbEMsTUFBTTsyRkFFUCxtQ0FBbUM7a0JBSC9DLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgR2V0T3JkZXJFbnRyaWVzQ29udGV4dCxcbiAgT3JkZXJFbnRyaWVzU291cmNlLFxuICBPcmRlckVudHJ5LFxufSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IE9yZGVyIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmRlci9yb290JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFVuaXRMZXZlbE9yZGVyRGV0YWlsU2VydmljZSB9IGZyb20gJy4uL3VuaXQtbGV2ZWwtb3JkZXItZGV0YWlsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFVuaXRPcmRlckRldGFpbHNPcmRlckVudHJpZXNDb250ZXh0XG4gIGltcGxlbWVudHMgR2V0T3JkZXJFbnRyaWVzQ29udGV4dFxue1xuICByZWFkb25seSB0eXBlID0gT3JkZXJFbnRyaWVzU291cmNlLlVOSVRfT1JERVJfREVUQUlMUztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdW5pdExldmVsT3JkZXJEZXRhaWxTZXJ2aWNlOiBVbml0TGV2ZWxPcmRlckRldGFpbFNlcnZpY2VcbiAgKSB7fVxuXG4gIGdldEVudHJpZXMoKTogT2JzZXJ2YWJsZTxPcmRlckVudHJ5W10+IHtcbiAgICByZXR1cm4gdGhpcy51bml0TGV2ZWxPcmRlckRldGFpbFNlcnZpY2VcbiAgICAgIC5nZXRPcmRlckRldGFpbHMoKVxuICAgICAgLnBpcGUobWFwKChvcmRlcjogT3JkZXIpID0+IG9yZGVyPy5lbnRyaWVzID8/IFtdKSk7XG4gIH1cbn1cbiJdfQ==