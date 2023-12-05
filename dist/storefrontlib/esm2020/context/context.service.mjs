/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { distinctUntilChanged, shareReplay } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./routing-context.service";
/**
 * Generic service for resolving the context for the UI components.
 */
export class ContextService {
    constructor(routingContextService) {
        this.routingContextService = routingContextService;
    }
    /**
     * Returns the context for the given token.
     */
    get(contextToken) {
        return this.resolveContext(contextToken).pipe(distinctUntilChanged(), shareReplay({ refCount: true, bufferSize: 1 }));
    }
    /**
     * Resolves the context for the given token.
     */
    resolveContext(contextToken) {
        return this.routingContextService.get(contextToken);
    }
}
ContextService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ContextService, deps: [{ token: i1.RoutingContextService }], target: i0.ɵɵFactoryTarget.Injectable });
ContextService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ContextService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ContextService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.RoutingContextService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jb250ZXh0L2NvbnRleHQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUluRTs7R0FFRztBQUVILE1BQU0sT0FBTyxjQUFjO0lBQ3pCLFlBQXNCLHFCQUE0QztRQUE1QywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO0lBQUcsQ0FBQztJQUV0RTs7T0FFRztJQUNILEdBQUcsQ0FBSSxZQUEwQjtRQUMvQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUksWUFBWSxDQUFDLENBQUMsSUFBSSxDQUM5QyxvQkFBb0IsRUFBRSxFQUN0QixXQUFXLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUMvQyxDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ08sY0FBYyxDQUN0QixZQUEwQjtRQUUxQixPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdEQsQ0FBQzs7MkdBcEJVLGNBQWM7K0dBQWQsY0FBYyxjQURELE1BQU07MkZBQ25CLGNBQWM7a0JBRDFCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIHNoYXJlUmVwbGF5IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ29udGV4dFRva2VuIH0gZnJvbSAnLi9jb250ZXh0Lm1vZGVsJztcbmltcG9ydCB7IFJvdXRpbmdDb250ZXh0U2VydmljZSB9IGZyb20gJy4vcm91dGluZy1jb250ZXh0LnNlcnZpY2UnO1xuXG4vKipcbiAqIEdlbmVyaWMgc2VydmljZSBmb3IgcmVzb2x2aW5nIHRoZSBjb250ZXh0IGZvciB0aGUgVUkgY29tcG9uZW50cy5cbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBDb250ZXh0U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByb3V0aW5nQ29udGV4dFNlcnZpY2U6IFJvdXRpbmdDb250ZXh0U2VydmljZSkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29udGV4dCBmb3IgdGhlIGdpdmVuIHRva2VuLlxuICAgKi9cbiAgZ2V0PFQ+KGNvbnRleHRUb2tlbjogQ29udGV4dFRva2VuKTogT2JzZXJ2YWJsZTxUIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMucmVzb2x2ZUNvbnRleHQ8VD4oY29udGV4dFRva2VuKS5waXBlKFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgIHNoYXJlUmVwbGF5KHsgcmVmQ291bnQ6IHRydWUsIGJ1ZmZlclNpemU6IDEgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc29sdmVzIHRoZSBjb250ZXh0IGZvciB0aGUgZ2l2ZW4gdG9rZW4uXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVzb2x2ZUNvbnRleHQ8VD4oXG4gICAgY29udGV4dFRva2VuOiBDb250ZXh0VG9rZW5cbiAgKTogT2JzZXJ2YWJsZTxUIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMucm91dGluZ0NvbnRleHRTZXJ2aWNlLmdldChjb250ZXh0VG9rZW4pO1xuICB9XG59XG4iXX0=