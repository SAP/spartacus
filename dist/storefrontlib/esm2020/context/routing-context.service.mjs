/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
/**
 * Resolves the context for the specific route, based on the property `data.cxContext`
 * defined in the Angular Route.
 */
export class RoutingContextService {
    constructor(activatedRoutesService, injector) {
        this.activatedRoutesService = activatedRoutesService;
        this.injector = injector;
        /**
         * Combined context token mapping consisting of all mappings defined in currently
         * Activated Angular Routes.
         *
         * The context token mapping is read from each Route's property `data.cxContext`.
         */
        this.contextTokenMapping$ = this.activatedRoutesService.routes$.pipe(map((routes) => this.getRoutesContextTokenMapping(routes)), shareReplay({ refCount: true, bufferSize: 1 }));
    }
    /**
     * Returns the merged context token mapping, consisting of mappings
     * defined in all Activated Angular Routes.
     */
    getRoutesContextTokenMapping(routes) {
        return Object.assign({}, ...routes.map((route) => route?.data?.cxContext));
    }
    /**
     * Resolves the specified `contextToken` from `cxContext` data parameter of the activated Angular Routes.
     * @param contextToken
     *
     * @returns instance from the root injector if defined, otherwise `undefined`.
     */
    get(contextToken) {
        return this.contextTokenMapping$.pipe(switchMap((contextMapping) => {
            const providerToken = contextMapping?.[contextToken];
            return !!providerToken
                ? this.injector.get(providerToken)
                : of(undefined);
        }));
    }
}
RoutingContextService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RoutingContextService, deps: [{ token: i1.ActivatedRoutesService }, { token: i1.UnifiedInjector }], target: i0.ɵɵFactoryTarget.Injectable });
RoutingContextService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RoutingContextService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RoutingContextService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.ActivatedRoutesService }, { type: i1.UnifiedInjector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy1jb250ZXh0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2NvbnRleHQvcm91dGluZy1jb250ZXh0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBRzdEOzs7R0FHRztBQUVILE1BQU0sT0FBTyxxQkFBcUI7SUFDaEMsWUFDWSxzQkFBOEMsRUFDOUMsUUFBeUI7UUFEekIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUM5QyxhQUFRLEdBQVIsUUFBUSxDQUFpQjtRQUdyQzs7Ozs7V0FLRztRQUNnQix5QkFBb0IsR0FFbkMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQzFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQzFELFdBQVcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQy9DLENBQUM7SUFiQyxDQUFDO0lBZUo7OztPQUdHO0lBQ08sNEJBQTRCLENBQ3BDLE1BQWdDO1FBRWhDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsR0FBRyxDQUFJLFlBQTBCO1FBQy9CLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FDbkMsU0FBUyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUU7WUFDM0IsTUFBTSxhQUFhLEdBQUcsY0FBYyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDckQsT0FBTyxDQUFDLENBQUMsYUFBYTtnQkFDcEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFJLGFBQWEsQ0FBQztnQkFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7a0hBNUNVLHFCQUFxQjtzSEFBckIscUJBQXFCLGNBRFIsTUFBTTsyRkFDbkIscUJBQXFCO2tCQURqQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlU25hcHNob3QgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGVzU2VydmljZSwgVW5pZmllZEluamVjdG9yIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHNoYXJlUmVwbGF5LCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb250ZXh0VG9rZW4gfSBmcm9tICcuL2NvbnRleHQubW9kZWwnO1xuXG4vKipcbiAqIFJlc29sdmVzIHRoZSBjb250ZXh0IGZvciB0aGUgc3BlY2lmaWMgcm91dGUsIGJhc2VkIG9uIHRoZSBwcm9wZXJ0eSBgZGF0YS5jeENvbnRleHRgXG4gKiBkZWZpbmVkIGluIHRoZSBBbmd1bGFyIFJvdXRlLlxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFJvdXRpbmdDb250ZXh0U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhY3RpdmF0ZWRSb3V0ZXNTZXJ2aWNlOiBBY3RpdmF0ZWRSb3V0ZXNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBpbmplY3RvcjogVW5pZmllZEluamVjdG9yXG4gICkge31cblxuICAvKipcbiAgICogQ29tYmluZWQgY29udGV4dCB0b2tlbiBtYXBwaW5nIGNvbnNpc3Rpbmcgb2YgYWxsIG1hcHBpbmdzIGRlZmluZWQgaW4gY3VycmVudGx5XG4gICAqIEFjdGl2YXRlZCBBbmd1bGFyIFJvdXRlcy5cbiAgICpcbiAgICogVGhlIGNvbnRleHQgdG9rZW4gbWFwcGluZyBpcyByZWFkIGZyb20gZWFjaCBSb3V0ZSdzIHByb3BlcnR5IGBkYXRhLmN4Q29udGV4dGAuXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgY29udGV4dFRva2VuTWFwcGluZyQ6IE9ic2VydmFibGU8XG4gICAgUmVjb3JkPENvbnRleHRUb2tlbiwgYW55PlxuICA+ID0gdGhpcy5hY3RpdmF0ZWRSb3V0ZXNTZXJ2aWNlLnJvdXRlcyQucGlwZShcbiAgICBtYXAoKHJvdXRlcykgPT4gdGhpcy5nZXRSb3V0ZXNDb250ZXh0VG9rZW5NYXBwaW5nKHJvdXRlcykpLFxuICAgIHNoYXJlUmVwbGF5KHsgcmVmQ291bnQ6IHRydWUsIGJ1ZmZlclNpemU6IDEgfSlcbiAgKTtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbWVyZ2VkIGNvbnRleHQgdG9rZW4gbWFwcGluZywgY29uc2lzdGluZyBvZiBtYXBwaW5nc1xuICAgKiBkZWZpbmVkIGluIGFsbCBBY3RpdmF0ZWQgQW5ndWxhciBSb3V0ZXMuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0Um91dGVzQ29udGV4dFRva2VuTWFwcGluZyhcbiAgICByb3V0ZXM6IEFjdGl2YXRlZFJvdXRlU25hcHNob3RbXVxuICApOiBSZWNvcmQ8Q29udGV4dFRva2VuLCBhbnk+IHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgLi4ucm91dGVzLm1hcCgocm91dGUpID0+IHJvdXRlPy5kYXRhPy5jeENvbnRleHQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNvbHZlcyB0aGUgc3BlY2lmaWVkIGBjb250ZXh0VG9rZW5gIGZyb20gYGN4Q29udGV4dGAgZGF0YSBwYXJhbWV0ZXIgb2YgdGhlIGFjdGl2YXRlZCBBbmd1bGFyIFJvdXRlcy5cbiAgICogQHBhcmFtIGNvbnRleHRUb2tlblxuICAgKlxuICAgKiBAcmV0dXJucyBpbnN0YW5jZSBmcm9tIHRoZSByb290IGluamVjdG9yIGlmIGRlZmluZWQsIG90aGVyd2lzZSBgdW5kZWZpbmVkYC5cbiAgICovXG4gIGdldDxUPihjb250ZXh0VG9rZW46IENvbnRleHRUb2tlbik6IE9ic2VydmFibGU8VCB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHRUb2tlbk1hcHBpbmckLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGNvbnRleHRNYXBwaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVyVG9rZW4gPSBjb250ZXh0TWFwcGluZz8uW2NvbnRleHRUb2tlbl07XG4gICAgICAgIHJldHVybiAhIXByb3ZpZGVyVG9rZW5cbiAgICAgICAgICA/IHRoaXMuaW5qZWN0b3IuZ2V0PFQ+KHByb3ZpZGVyVG9rZW4pXG4gICAgICAgICAgOiBvZih1bmRlZmluZWQpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=