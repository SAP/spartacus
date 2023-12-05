/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { RequestedDeliveryDateConnector } from '../connectors/requested-delivery-date.connector';
import * as i0 from "@angular/core";
import * as i1 from "../connectors/requested-delivery-date.connector";
export class RequestedDeliveryDateService {
    /**
     * Set requested delivery date
     */
    setRequestedDeliveryDate(userId, cartId, requestedDate) {
        return this.requestedDeliveryDateConnector.setRequestedDeliveryDate(userId, cartId, requestedDate);
    }
    constructor(requestedDeliveryDateConnector) {
        this.requestedDeliveryDateConnector = requestedDeliveryDateConnector;
    }
}
RequestedDeliveryDateService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateService, deps: [{ token: i1.RequestedDeliveryDateConnector }], target: i0.ɵɵFactoryTarget.Injectable });
RequestedDeliveryDateService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RequestedDeliveryDateConnector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdGVkLWRlbGl2ZXJ5LWRhdGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9yZXF1ZXN0ZWQtZGVsaXZlcnktZGF0ZS9jb3JlL3NlcnZpY2VzL3JlcXVlc3RlZC1kZWxpdmVyeS1kYXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0saURBQWlELENBQUM7OztBQUdqRyxNQUFNLE9BQU8sNEJBQTRCO0lBR3ZDOztPQUVHO0lBQ0gsd0JBQXdCLENBQ3RCLE1BQWMsRUFDZCxNQUFjLEVBQ2QsYUFBcUI7UUFFckIsT0FBTyxJQUFJLENBQUMsOEJBQThCLENBQUMsd0JBQXdCLENBQ2pFLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxDQUNkLENBQUM7SUFDSixDQUFDO0lBRUQsWUFDWSw4QkFBOEQ7UUFBOUQsbUNBQThCLEdBQTlCLDhCQUE4QixDQUFnQztJQUN2RSxDQUFDOzt5SEFwQk8sNEJBQTRCOzZIQUE1Qiw0QkFBNEI7MkZBQTVCLDRCQUE0QjtrQkFEeEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlcXVlc3RlZERlbGl2ZXJ5RGF0ZUZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvcmVxdWVzdGVkLWRlbGl2ZXJ5LWRhdGUvcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBSZXF1ZXN0ZWREZWxpdmVyeURhdGVDb25uZWN0b3IgfSBmcm9tICcuLi9jb25uZWN0b3JzL3JlcXVlc3RlZC1kZWxpdmVyeS1kYXRlLmNvbm5lY3Rvcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZXF1ZXN0ZWREZWxpdmVyeURhdGVTZXJ2aWNlXG4gIGltcGxlbWVudHMgUmVxdWVzdGVkRGVsaXZlcnlEYXRlRmFjYWRlXG57XG4gIC8qKlxuICAgKiBTZXQgcmVxdWVzdGVkIGRlbGl2ZXJ5IGRhdGVcbiAgICovXG4gIHNldFJlcXVlc3RlZERlbGl2ZXJ5RGF0ZShcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQ6IHN0cmluZyxcbiAgICByZXF1ZXN0ZWREYXRlOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTx7fT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RlZERlbGl2ZXJ5RGF0ZUNvbm5lY3Rvci5zZXRSZXF1ZXN0ZWREZWxpdmVyeURhdGUoXG4gICAgICB1c2VySWQsXG4gICAgICBjYXJ0SWQsXG4gICAgICByZXF1ZXN0ZWREYXRlXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCByZXF1ZXN0ZWREZWxpdmVyeURhdGVDb25uZWN0b3I6IFJlcXVlc3RlZERlbGl2ZXJ5RGF0ZUNvbm5lY3RvclxuICApIHt9XG59XG4iXX0=