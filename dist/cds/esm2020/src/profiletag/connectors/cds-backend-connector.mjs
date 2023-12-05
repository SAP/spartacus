/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../adapters/cds-backend-notification-adapter";
export class CdsBackendConnector {
    constructor(cdsBackendNotificationAdapter) {
        this.cdsBackendNotificationAdapter = cdsBackendNotificationAdapter;
    }
    notifySuccessfulLogin() {
        return this.cdsBackendNotificationAdapter.notifySuccessfulLogin();
    }
}
CdsBackendConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsBackendConnector, deps: [{ token: i1.CdsBackendNotificationAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
CdsBackendConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsBackendConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsBackendConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CdsBackendNotificationAdapter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RzLWJhY2tlbmQtY29ubmVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZHMvc3JjL3Byb2ZpbGV0YWcvY29ubmVjdG9ycy9jZHMtYmFja2VuZC1jb25uZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQU8zQyxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLFlBQ1UsNkJBQTREO1FBQTVELGtDQUE2QixHQUE3Qiw2QkFBNkIsQ0FBK0I7SUFDbkUsQ0FBQztJQUNKLHFCQUFxQjtRQUNuQixPQUFPLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ3BFLENBQUM7O2dIQU5VLG1CQUFtQjtvSEFBbkIsbUJBQW1CLGNBRmxCLE1BQU07MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENkc0JhY2tlbmROb3RpZmljYXRpb25BZGFwdGVyIH0gZnJvbSAnLi4vYWRhcHRlcnMvY2RzLWJhY2tlbmQtbm90aWZpY2F0aW9uLWFkYXB0ZXInO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2RzQmFja2VuZENvbm5lY3RvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2RzQmFja2VuZE5vdGlmaWNhdGlvbkFkYXB0ZXI6IENkc0JhY2tlbmROb3RpZmljYXRpb25BZGFwdGVyXG4gICkge31cbiAgbm90aWZ5U3VjY2Vzc2Z1bExvZ2luKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmNkc0JhY2tlbmROb3RpZmljYXRpb25BZGFwdGVyLm5vdGlmeVN1Y2Nlc3NmdWxMb2dpbigpO1xuICB9XG59XG4iXX0=