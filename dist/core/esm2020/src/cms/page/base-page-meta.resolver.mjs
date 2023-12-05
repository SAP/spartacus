/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { combineLatest, defer } from 'rxjs';
import { filter, map, shareReplay, startWith } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../facade/cms.service";
import * as i2 from "../../i18n/translation.service";
import * as i3 from "./routing/routing-page-meta.resolver";
import * as i4 from "@angular/router";
import * as i5 from "./routing/page-link.service";
export class BasePageMetaResolver {
    constructor(cmsService, translation, routingPageMetaResolver, router, pageLinkService) {
        this.cmsService = cmsService;
        this.translation = translation;
        this.routingPageMetaResolver = routingPageMetaResolver;
        this.router = router;
        this.pageLinkService = pageLinkService;
        /**
         * Helper to provide access to the current CMS page
         */
        this.page$ = defer(() => this.cmsService.getCurrentPage()).pipe(filter((p) => Boolean(p)));
        this.title$ = this.page$.pipe(map((p) => p.title));
        this.description$ = this.page$.pipe(map((p) => p.description));
        this.robots$ = this.page$.pipe(map((page) => page.robots || []));
        /**
         * Breadcrumb for the home page.
         */
        this.homeBreadcrumb$ = this.translation
            .translate('common.home')
            .pipe(map((label) => [{ label: label, link: '/' }]));
        /**
         * All the resolved breadcrumbs (including those from Angular child routes).
         */
        this.breadcrumb$ = combineLatest([
            this.homeBreadcrumb$,
            defer(() => this.routingPageMetaResolver?.resolveBreadcrumbs()),
        ]).pipe(map((breadcrumbs) => breadcrumbs.flat()), shareReplay({ bufferSize: 1, refCount: true }));
    }
    resolveTitle() {
        return this.title$;
    }
    resolveDescription() {
        return this.description$;
    }
    /**
     * Resolves a single breadcrumb item to the home page for each `ContentPage`.
     * The home page label is resolved from the translation service.
     */
    resolveBreadcrumbs() {
        return this.breadcrumb$;
    }
    resolveRobots() {
        return this.robots$;
    }
    resolveCanonicalUrl(options) {
        return this.router.events.pipe(filter((ev) => ev instanceof NavigationEnd), startWith(null), map(() => this.pageLinkService.getCanonicalUrl(options)));
    }
}
BasePageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BasePageMetaResolver, deps: [{ token: i1.CmsService }, { token: i2.TranslationService }, { token: i3.RoutingPageMetaResolver }, { token: i4.Router }, { token: i5.PageLinkService }], target: i0.ɵɵFactoryTarget.Injectable });
BasePageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BasePageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BasePageMetaResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CmsService }, { type: i2.TranslationService }, { type: i3.RoutingPageMetaResolver }, { type: i4.Router }, { type: i5.PageLinkService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1wYWdlLW1ldGEucmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9jbXMvcGFnZS9iYXNlLXBhZ2UtbWV0YS5yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFVLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDeEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBa0JyRSxNQUFNLE9BQU8sb0JBQW9CO0lBUS9CLFlBQ1ksVUFBc0IsRUFDdEIsV0FBK0IsRUFDL0IsdUJBQWdELEVBQ2hELE1BQWMsRUFDZCxlQUFnQztRQUpoQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBQ2hELFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFHNUM7O1dBRUc7UUFDTyxVQUFLLEdBQXFCLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FDakMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXhCLFdBQU0sR0FBbUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ2hFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUNwQixDQUFDO1FBRVEsaUJBQVksR0FBbUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ3RFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUMxQixDQUFDO1FBRVEsWUFBTyxHQUFpQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDL0QsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUNqQyxDQUFDO1FBRUY7O1dBRUc7UUFDTyxvQkFBZSxHQUFpQyxJQUFJLENBQUMsV0FBVzthQUN2RSxTQUFTLENBQUMsYUFBYSxDQUFDO2FBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBcUIsQ0FBQyxDQUFDLENBQUM7UUFFM0U7O1dBRUc7UUFDTyxnQkFBVyxHQUFpQyxhQUFhLENBQUM7WUFDbEUsSUFBSSxDQUFDLGVBQWU7WUFDcEIsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxrQkFBa0IsRUFBRSxDQUFDO1NBQ2hFLENBQUMsQ0FBQyxJQUFJLENBQ0wsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsRUFDeEMsV0FBVyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FDL0MsQ0FBQztJQXJDQyxDQUFDO0lBdUNKLFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7T0FHRztJQUNILGtCQUFrQjtRQUNoQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUVELGFBQWE7UUFDWCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELG1CQUFtQixDQUFDLE9BQTZCO1FBQy9DLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUM1QixNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsWUFBWSxhQUFhLENBQUMsRUFDM0MsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUNmLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUN6RCxDQUFDO0lBQ0osQ0FBQzs7aUhBL0VVLG9CQUFvQjtxSEFBcEIsb0JBQW9CLGNBRm5CLE1BQU07MkZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdmlnYXRpb25FbmQsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBkZWZlciwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHNoYXJlUmVwbGF5LCBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBUcmFuc2xhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9pMThuL3RyYW5zbGF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ21zU2VydmljZSB9IGZyb20gJy4uL2ZhY2FkZS9jbXMuc2VydmljZSc7XG5pbXBvcnQgeyBCcmVhZGNydW1iTWV0YSwgUGFnZSwgUGFnZVJvYm90c01ldGEgfSBmcm9tICcuLi9tb2RlbC9wYWdlLm1vZGVsJztcbmltcG9ydCB7IENhbm9uaWNhbFVybE9wdGlvbnMgfSBmcm9tICcuL2NvbmZpZy9wYWdlLW1ldGEuY29uZmlnJztcbmltcG9ydCB7XG4gIENhbm9uaWNhbFBhZ2VSZXNvbHZlcixcbiAgUGFnZUJyZWFkY3J1bWJSZXNvbHZlcixcbiAgUGFnZURlc2NyaXB0aW9uUmVzb2x2ZXIsXG4gIFBhZ2VSb2JvdHNSZXNvbHZlcixcbiAgUGFnZVRpdGxlUmVzb2x2ZXIsXG59IGZyb20gJy4vcGFnZS5yZXNvbHZlcnMnO1xuaW1wb3J0IHsgUGFnZUxpbmtTZXJ2aWNlIH0gZnJvbSAnLi9yb3V0aW5nL3BhZ2UtbGluay5zZXJ2aWNlJztcbmltcG9ydCB7IFJvdXRpbmdQYWdlTWV0YVJlc29sdmVyIH0gZnJvbSAnLi9yb3V0aW5nL3JvdXRpbmctcGFnZS1tZXRhLnJlc29sdmVyJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEJhc2VQYWdlTWV0YVJlc29sdmVyXG4gIGltcGxlbWVudHNcbiAgICBQYWdlVGl0bGVSZXNvbHZlcixcbiAgICBQYWdlRGVzY3JpcHRpb25SZXNvbHZlcixcbiAgICBQYWdlQnJlYWRjcnVtYlJlc29sdmVyLFxuICAgIFBhZ2VSb2JvdHNSZXNvbHZlcixcbiAgICBDYW5vbmljYWxQYWdlUmVzb2x2ZXJcbntcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNtc1NlcnZpY2U6IENtc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0aW9uOiBUcmFuc2xhdGlvblNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJvdXRpbmdQYWdlTWV0YVJlc29sdmVyOiBSb3V0aW5nUGFnZU1ldGFSZXNvbHZlcixcbiAgICBwcm90ZWN0ZWQgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJvdGVjdGVkIHBhZ2VMaW5rU2VydmljZTogUGFnZUxpbmtTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogSGVscGVyIHRvIHByb3ZpZGUgYWNjZXNzIHRvIHRoZSBjdXJyZW50IENNUyBwYWdlXG4gICAqL1xuICBwcm90ZWN0ZWQgcGFnZSQ6IE9ic2VydmFibGU8UGFnZT4gPSBkZWZlcigoKSA9PlxuICAgIHRoaXMuY21zU2VydmljZS5nZXRDdXJyZW50UGFnZSgpXG4gICkucGlwZShmaWx0ZXIoKHApID0+IEJvb2xlYW4ocCkpKTtcblxuICBwcm90ZWN0ZWQgdGl0bGUkOiBPYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD4gPSB0aGlzLnBhZ2UkLnBpcGUoXG4gICAgbWFwKChwKSA9PiBwLnRpdGxlKVxuICApO1xuXG4gIHByb3RlY3RlZCBkZXNjcmlwdGlvbiQ6IE9ic2VydmFibGU8c3RyaW5nIHwgdW5kZWZpbmVkPiA9IHRoaXMucGFnZSQucGlwZShcbiAgICBtYXAoKHApID0+IHAuZGVzY3JpcHRpb24pXG4gICk7XG5cbiAgcHJvdGVjdGVkIHJvYm90cyQ6IE9ic2VydmFibGU8UGFnZVJvYm90c01ldGFbXT4gPSB0aGlzLnBhZ2UkLnBpcGUoXG4gICAgbWFwKChwYWdlKSA9PiBwYWdlLnJvYm90cyB8fCBbXSlcbiAgKTtcblxuICAvKipcbiAgICogQnJlYWRjcnVtYiBmb3IgdGhlIGhvbWUgcGFnZS5cbiAgICovXG4gIHByb3RlY3RlZCBob21lQnJlYWRjcnVtYiQ6IE9ic2VydmFibGU8QnJlYWRjcnVtYk1ldGFbXT4gPSB0aGlzLnRyYW5zbGF0aW9uXG4gICAgLnRyYW5zbGF0ZSgnY29tbW9uLmhvbWUnKVxuICAgIC5waXBlKG1hcCgobGFiZWwpID0+IFt7IGxhYmVsOiBsYWJlbCwgbGluazogJy8nIH1dIGFzIEJyZWFkY3J1bWJNZXRhW10pKTtcblxuICAvKipcbiAgICogQWxsIHRoZSByZXNvbHZlZCBicmVhZGNydW1icyAoaW5jbHVkaW5nIHRob3NlIGZyb20gQW5ndWxhciBjaGlsZCByb3V0ZXMpLlxuICAgKi9cbiAgcHJvdGVjdGVkIGJyZWFkY3J1bWIkOiBPYnNlcnZhYmxlPEJyZWFkY3J1bWJNZXRhW10+ID0gY29tYmluZUxhdGVzdChbXG4gICAgdGhpcy5ob21lQnJlYWRjcnVtYiQsXG4gICAgZGVmZXIoKCkgPT4gdGhpcy5yb3V0aW5nUGFnZU1ldGFSZXNvbHZlcj8ucmVzb2x2ZUJyZWFkY3J1bWJzKCkpLFxuICBdKS5waXBlKFxuICAgIG1hcCgoYnJlYWRjcnVtYnMpID0+IGJyZWFkY3J1bWJzLmZsYXQoKSksXG4gICAgc2hhcmVSZXBsYXkoeyBidWZmZXJTaXplOiAxLCByZWZDb3VudDogdHJ1ZSB9KVxuICApO1xuXG4gIHJlc29sdmVUaXRsZSgpOiBPYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLnRpdGxlJDtcbiAgfVxuXG4gIHJlc29sdmVEZXNjcmlwdGlvbigpOiBPYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmRlc2NyaXB0aW9uJDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNvbHZlcyBhIHNpbmdsZSBicmVhZGNydW1iIGl0ZW0gdG8gdGhlIGhvbWUgcGFnZSBmb3IgZWFjaCBgQ29udGVudFBhZ2VgLlxuICAgKiBUaGUgaG9tZSBwYWdlIGxhYmVsIGlzIHJlc29sdmVkIGZyb20gdGhlIHRyYW5zbGF0aW9uIHNlcnZpY2UuXG4gICAqL1xuICByZXNvbHZlQnJlYWRjcnVtYnMoKTogT2JzZXJ2YWJsZTxCcmVhZGNydW1iTWV0YVtdIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMuYnJlYWRjcnVtYiQ7XG4gIH1cblxuICByZXNvbHZlUm9ib3RzKCk6IE9ic2VydmFibGU8UGFnZVJvYm90c01ldGFbXT4ge1xuICAgIHJldHVybiB0aGlzLnJvYm90cyQ7XG4gIH1cblxuICByZXNvbHZlQ2Fub25pY2FsVXJsKG9wdGlvbnM/OiBDYW5vbmljYWxVcmxPcHRpb25zKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIuZXZlbnRzLnBpcGUoXG4gICAgICBmaWx0ZXIoKGV2KSA9PiBldiBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpLFxuICAgICAgc3RhcnRXaXRoKG51bGwpLFxuICAgICAgbWFwKCgpID0+IHRoaXMucGFnZUxpbmtTZXJ2aWNlLmdldENhbm9uaWNhbFVybChvcHRpb25zKSlcbiAgICApO1xuICB9XG59XG4iXX0=