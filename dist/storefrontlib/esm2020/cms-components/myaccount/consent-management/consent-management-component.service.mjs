/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class ConsentManagementComponentService {
    constructor(anonymousConsentsConfig) {
        this.anonymousConsentsConfig = anonymousConsentsConfig;
    }
    /**
     * Returns the list of mandatory consents
     * @param _templateList - list of all active consents. This parameter is not needed in core
     * implementation. But is needed in CDC implementation to fetch only the required consents
     * from this list
     * @returns array of consent IDs
     */
    getRequiredConsents(_templateList) {
        return (this.anonymousConsentsConfig?.anonymousConsents?.requiredConsents || []);
    }
}
ConsentManagementComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConsentManagementComponentService, deps: [{ token: i1.AnonymousConsentsConfig }], target: i0.ɵɵFactoryTarget.Injectable });
ConsentManagementComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConsentManagementComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConsentManagementComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.AnonymousConsentsConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc2VudC1tYW5hZ2VtZW50LWNvbXBvbmVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtY29tcG9uZW50cy9teWFjY291bnQvY29uc2VudC1tYW5hZ2VtZW50L2NvbnNlbnQtbWFuYWdlbWVudC1jb21wb25lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBSTNDLE1BQU0sT0FBTyxpQ0FBaUM7SUFDNUMsWUFBc0IsdUJBQWlEO1FBQWpELDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBMEI7SUFBRyxDQUFDO0lBQzNFOzs7Ozs7T0FNRztJQUNILG1CQUFtQixDQUFDLGFBQWdDO1FBQ2xELE9BQU8sQ0FDTCxJQUFJLENBQUMsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLElBQUksRUFBRSxDQUN4RSxDQUFDO0lBQ0osQ0FBQzs7OEhBYlUsaUNBQWlDO2tJQUFqQyxpQ0FBaUM7MkZBQWpDLGlDQUFpQztrQkFEN0MsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFub255bW91c0NvbnNlbnRzQ29uZmlnLCBDb25zZW50VGVtcGxhdGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29uc2VudE1hbmFnZW1lbnRDb21wb25lbnRTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGFub255bW91c0NvbnNlbnRzQ29uZmlnPzogQW5vbnltb3VzQ29uc2VudHNDb25maWcpIHt9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBsaXN0IG9mIG1hbmRhdG9yeSBjb25zZW50c1xuICAgKiBAcGFyYW0gX3RlbXBsYXRlTGlzdCAtIGxpc3Qgb2YgYWxsIGFjdGl2ZSBjb25zZW50cy4gVGhpcyBwYXJhbWV0ZXIgaXMgbm90IG5lZWRlZCBpbiBjb3JlXG4gICAqIGltcGxlbWVudGF0aW9uLiBCdXQgaXMgbmVlZGVkIGluIENEQyBpbXBsZW1lbnRhdGlvbiB0byBmZXRjaCBvbmx5IHRoZSByZXF1aXJlZCBjb25zZW50c1xuICAgKiBmcm9tIHRoaXMgbGlzdFxuICAgKiBAcmV0dXJucyBhcnJheSBvZiBjb25zZW50IElEc1xuICAgKi9cbiAgZ2V0UmVxdWlyZWRDb25zZW50cyhfdGVtcGxhdGVMaXN0OiBDb25zZW50VGVtcGxhdGVbXSk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5hbm9ueW1vdXNDb25zZW50c0NvbmZpZz8uYW5vbnltb3VzQ29uc2VudHM/LnJlcXVpcmVkQ29uc2VudHMgfHwgW11cbiAgICApO1xuICB9XG59XG4iXX0=