/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../../i18n/translation.service";
/**
 * Resolves the breadcrumb for the Angular ActivatedRouteSnapshot
 */
export class DefaultRoutePageMetaResolver {
    constructor(translation) {
        this.translation = translation;
    }
    /**
     * Resolves breadcrumb based on the given url and the breadcrumb config.
     *
     * - When breadcrumb config is empty, it returns an empty breadcrumb.
     * - When breadcrumb config is a string or object with `i18n` property,
     *    it translates it and use as a label of the returned breadcrumb.
     * - When breadcrumb config is an object with property `raw`, then
     *    it's used as a label of the returned breadcrumb.
     */
    resolveBreadcrumbs({ url, pageMetaConfig, }) {
        const breadcrumbConfig = pageMetaConfig?.breadcrumb;
        if (!breadcrumbConfig) {
            return of([]);
        }
        if (typeof breadcrumbConfig !== 'string' && breadcrumbConfig.raw) {
            return of([{ link: url, label: breadcrumbConfig.raw }]);
        }
        return this.translateBreadcrumbLabel(breadcrumbConfig).pipe(map((label) => [{ label, link: url }]));
    }
    /**
     * Translates the configured breadcrumb label
     */
    translateBreadcrumbLabel(breadcrumbConfig) {
        const i18nKey = typeof breadcrumbConfig === 'string'
            ? breadcrumbConfig
            : breadcrumbConfig.i18n;
        return this.getParams().pipe(switchMap((params) => this.translation.translate(i18nKey ?? '', params ?? {})));
    }
    /**
     * Resolves dynamic data for the whole resolver.
     */
    getParams() {
        return of({});
    }
}
DefaultRoutePageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DefaultRoutePageMetaResolver, deps: [{ token: i1.TranslationService }], target: i0.ɵɵFactoryTarget.Injectable });
DefaultRoutePageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DefaultRoutePageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DefaultRoutePageMetaResolver, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.TranslationService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1yb3V0ZS1wYWdlLW1ldGEucmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9jbXMvcGFnZS9yb3V0aW5nL2RlZmF1bHQtcm91dGUtcGFnZS1tZXRhLnJlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBU2hEOztHQUVHO0FBRUgsTUFBTSxPQUFnQiw0QkFBNEI7SUFHaEQsWUFBc0IsV0FBK0I7UUFBL0IsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO0lBQUcsQ0FBQztJQUV6RDs7Ozs7Ozs7T0FRRztJQUNILGtCQUFrQixDQUFDLEVBQ2pCLEdBQUcsRUFDSCxjQUFjLEdBQ2dCO1FBQzlCLE1BQU0sZ0JBQWdCLEdBQUcsY0FBYyxFQUFFLFVBQVUsQ0FBQztRQUVwRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDckIsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDZjtRQUVELElBQUksT0FBTyxnQkFBZ0IsS0FBSyxRQUFRLElBQUksZ0JBQWdCLENBQUMsR0FBRyxFQUFFO1lBQ2hFLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDekQ7UUFFRCxPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FDekQsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQ3ZDLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDTyx3QkFBd0IsQ0FDaEMsZ0JBQWdEO1FBRWhELE1BQU0sT0FBTyxHQUNYLE9BQU8sZ0JBQWdCLEtBQUssUUFBUTtZQUNsQyxDQUFDLENBQUMsZ0JBQWdCO1lBQ2xCLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7UUFFNUIsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUMxQixTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFFLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FDeEQsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ08sU0FBUztRQUNqQixPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoQixDQUFDOzt5SEF4RG1CLDRCQUE0Qjs2SEFBNUIsNEJBQTRCLGNBRHhCLE1BQU07MkZBQ1YsNEJBQTRCO2tCQURqRCxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFRyYW5zbGF0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2kxOG4vdHJhbnNsYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBCcmVhZGNydW1iTWV0YSB9IGZyb20gJy4uLy4uL21vZGVsL3BhZ2UubW9kZWwnO1xuaW1wb3J0IHtcbiAgUm91dGVCcmVhZGNydW1iQ29uZmlnLFxuICBSb3V0ZUJyZWFkY3J1bWJSZXNvbHZlcixcbiAgUm91dGVCcmVhZGNydW1iUmVzb2x2ZXJQYXJhbXMsXG59IGZyb20gJy4vcm91dGUtcGFnZS1tZXRhLm1vZGVsJztcblxuLyoqXG4gKiBSZXNvbHZlcyB0aGUgYnJlYWRjcnVtYiBmb3IgdGhlIEFuZ3VsYXIgQWN0aXZhdGVkUm91dGVTbmFwc2hvdFxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERlZmF1bHRSb3V0ZVBhZ2VNZXRhUmVzb2x2ZXJcbiAgaW1wbGVtZW50cyBSb3V0ZUJyZWFkY3J1bWJSZXNvbHZlclxue1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgdHJhbnNsYXRpb246IFRyYW5zbGF0aW9uU2VydmljZSkge31cblxuICAvKipcbiAgICogUmVzb2x2ZXMgYnJlYWRjcnVtYiBiYXNlZCBvbiB0aGUgZ2l2ZW4gdXJsIGFuZCB0aGUgYnJlYWRjcnVtYiBjb25maWcuXG4gICAqXG4gICAqIC0gV2hlbiBicmVhZGNydW1iIGNvbmZpZyBpcyBlbXB0eSwgaXQgcmV0dXJucyBhbiBlbXB0eSBicmVhZGNydW1iLlxuICAgKiAtIFdoZW4gYnJlYWRjcnVtYiBjb25maWcgaXMgYSBzdHJpbmcgb3Igb2JqZWN0IHdpdGggYGkxOG5gIHByb3BlcnR5LFxuICAgKiAgICBpdCB0cmFuc2xhdGVzIGl0IGFuZCB1c2UgYXMgYSBsYWJlbCBvZiB0aGUgcmV0dXJuZWQgYnJlYWRjcnVtYi5cbiAgICogLSBXaGVuIGJyZWFkY3J1bWIgY29uZmlnIGlzIGFuIG9iamVjdCB3aXRoIHByb3BlcnR5IGByYXdgLCB0aGVuXG4gICAqICAgIGl0J3MgdXNlZCBhcyBhIGxhYmVsIG9mIHRoZSByZXR1cm5lZCBicmVhZGNydW1iLlxuICAgKi9cbiAgcmVzb2x2ZUJyZWFkY3J1bWJzKHtcbiAgICB1cmwsXG4gICAgcGFnZU1ldGFDb25maWcsXG4gIH06IFJvdXRlQnJlYWRjcnVtYlJlc29sdmVyUGFyYW1zKTogT2JzZXJ2YWJsZTxCcmVhZGNydW1iTWV0YVtdPiB7XG4gICAgY29uc3QgYnJlYWRjcnVtYkNvbmZpZyA9IHBhZ2VNZXRhQ29uZmlnPy5icmVhZGNydW1iO1xuXG4gICAgaWYgKCFicmVhZGNydW1iQ29uZmlnKSB7XG4gICAgICByZXR1cm4gb2YoW10pO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgYnJlYWRjcnVtYkNvbmZpZyAhPT0gJ3N0cmluZycgJiYgYnJlYWRjcnVtYkNvbmZpZy5yYXcpIHtcbiAgICAgIHJldHVybiBvZihbeyBsaW5rOiB1cmwsIGxhYmVsOiBicmVhZGNydW1iQ29uZmlnLnJhdyB9XSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlQnJlYWRjcnVtYkxhYmVsKGJyZWFkY3J1bWJDb25maWcpLnBpcGUoXG4gICAgICBtYXAoKGxhYmVsKSA9PiBbeyBsYWJlbCwgbGluazogdXJsIH1dKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNsYXRlcyB0aGUgY29uZmlndXJlZCBicmVhZGNydW1iIGxhYmVsXG4gICAqL1xuICBwcm90ZWN0ZWQgdHJhbnNsYXRlQnJlYWRjcnVtYkxhYmVsKFxuICAgIGJyZWFkY3J1bWJDb25maWc6IHN0cmluZyB8IFJvdXRlQnJlYWRjcnVtYkNvbmZpZ1xuICApOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIGNvbnN0IGkxOG5LZXkgPVxuICAgICAgdHlwZW9mIGJyZWFkY3J1bWJDb25maWcgPT09ICdzdHJpbmcnXG4gICAgICAgID8gYnJlYWRjcnVtYkNvbmZpZ1xuICAgICAgICA6IGJyZWFkY3J1bWJDb25maWcuaTE4bjtcblxuICAgIHJldHVybiB0aGlzLmdldFBhcmFtcygpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKHBhcmFtcykgPT5cbiAgICAgICAgdGhpcy50cmFuc2xhdGlvbi50cmFuc2xhdGUoaTE4bktleSA/PyAnJywgcGFyYW1zID8/IHt9KVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZXMgZHluYW1pYyBkYXRhIGZvciB0aGUgd2hvbGUgcmVzb2x2ZXIuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0UGFyYW1zKCk6IE9ic2VydmFibGU8eyBbXzogc3RyaW5nXTogYW55IH0gfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gb2Yoe30pO1xuICB9XG59XG4iXX0=