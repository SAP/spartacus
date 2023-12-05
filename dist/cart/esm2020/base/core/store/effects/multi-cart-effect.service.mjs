/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CartType } from '@spartacus/cart/base/root';
import { CartActions } from '../actions/index';
import * as i0 from "@angular/core";
export class MultiCartEffectsService {
    /**
     * Verifies if cart is the active cart or saved cart and returns the appropriate cart type
     * @param action
     * @returns cart type
     */
    getActiveCartTypeOnLoadSuccess(action) {
        if (action?.payload?.extraData?.active) {
            // saved cart is not active cart
            if (action.payload?.cart.saveTime) {
                return new CartActions.SetCartTypeIndex({
                    cartType: CartType.ACTIVE,
                    cartId: '',
                });
            }
            return new CartActions.SetCartTypeIndex({
                cartType: CartType.ACTIVE,
                cartId: action.meta.entityId,
            });
        }
    }
}
MultiCartEffectsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartEffectsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MultiCartEffectsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartEffectsService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartEffectsService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktY2FydC1lZmZlY3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2UvY29yZS9zdG9yZS9lZmZlY3RzL211bHRpLWNhcnQtZWZmZWN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7QUFHL0MsTUFBTSxPQUFPLHVCQUF1QjtJQUNsQzs7OztPQUlHO0lBQ0gsOEJBQThCLENBQzVCLE1BQW1DO1FBRW5DLElBQUksTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO1lBQ3RDLGdDQUFnQztZQUNoQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDakMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDdEMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxNQUFNO29CQUN6QixNQUFNLEVBQUUsRUFBRTtpQkFDWCxDQUFDLENBQUM7YUFDSjtZQUNELE9BQU8sSUFBSSxXQUFXLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ3RDLFFBQVEsRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFDekIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBa0I7YUFDdkMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOztvSEF0QlUsdUJBQXVCO3dIQUF2Qix1QkFBdUI7MkZBQXZCLHVCQUF1QjtrQkFEbkMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhcnRUeXBlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBDYXJ0QWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvaW5kZXgnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTXVsdGlDYXJ0RWZmZWN0c1NlcnZpY2Uge1xuICAvKipcbiAgICogVmVyaWZpZXMgaWYgY2FydCBpcyB0aGUgYWN0aXZlIGNhcnQgb3Igc2F2ZWQgY2FydCBhbmQgcmV0dXJucyB0aGUgYXBwcm9wcmlhdGUgY2FydCB0eXBlXG4gICAqIEBwYXJhbSBhY3Rpb25cbiAgICogQHJldHVybnMgY2FydCB0eXBlXG4gICAqL1xuICBnZXRBY3RpdmVDYXJ0VHlwZU9uTG9hZFN1Y2Nlc3MoXG4gICAgYWN0aW9uOiBDYXJ0QWN0aW9ucy5Mb2FkQ2FydFN1Y2Nlc3NcbiAgKTogQ2FydEFjdGlvbnMuU2V0Q2FydFR5cGVJbmRleCB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKGFjdGlvbj8ucGF5bG9hZD8uZXh0cmFEYXRhPy5hY3RpdmUpIHtcbiAgICAgIC8vIHNhdmVkIGNhcnQgaXMgbm90IGFjdGl2ZSBjYXJ0XG4gICAgICBpZiAoYWN0aW9uLnBheWxvYWQ/LmNhcnQuc2F2ZVRpbWUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDYXJ0QWN0aW9ucy5TZXRDYXJ0VHlwZUluZGV4KHtcbiAgICAgICAgICBjYXJ0VHlwZTogQ2FydFR5cGUuQUNUSVZFLFxuICAgICAgICAgIGNhcnRJZDogJycsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBDYXJ0QWN0aW9ucy5TZXRDYXJ0VHlwZUluZGV4KHtcbiAgICAgICAgY2FydFR5cGU6IENhcnRUeXBlLkFDVElWRSxcbiAgICAgICAgY2FydElkOiBhY3Rpb24ubWV0YS5lbnRpdHlJZCBhcyBzdHJpbmcsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==