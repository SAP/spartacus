/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { PageType } from '../../model/cms.model';
import { PageMetaResolver } from './page-meta.resolver';
import * as i0 from "@angular/core";
import * as i1 from "./base-page-meta.resolver";
/**
 * Resolves the page data for all Content Pages based on the `PageType.CONTENT_PAGE`.
 * More specific resolvers for content pages can be implemented by making them more
 * specific, for example by using the page template (see `CartPageMetaResolver`).
 *
 * The page title, description, breadcrumbs and robot information are resolved from the
 * content page data. The canonical URL is resolved from the URL.
 */
export class ContentPageMetaResolver extends PageMetaResolver {
    constructor(basePageMetaResolver) {
        super();
        this.basePageMetaResolver = basePageMetaResolver;
        this.pageType = PageType.CONTENT_PAGE;
    }
    resolveTitle() {
        return this.basePageMetaResolver.resolveTitle();
    }
    resolveDescription() {
        return this.basePageMetaResolver.resolveDescription();
    }
    resolveBreadcrumbs() {
        return this.basePageMetaResolver.resolveBreadcrumbs();
    }
    resolveRobots() {
        return this.basePageMetaResolver.resolveRobots();
    }
    resolveCanonicalUrl() {
        return this.basePageMetaResolver.resolveCanonicalUrl();
    }
}
ContentPageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ContentPageMetaResolver, deps: [{ token: i1.BasePageMetaResolver }], target: i0.ɵɵFactoryTarget.Injectable });
ContentPageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ContentPageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ContentPageMetaResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.BasePageMetaResolver }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1wYWdlLW1ldGEucmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9jbXMvcGFnZS9jb250ZW50LXBhZ2UtbWV0YS5yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFHakQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7OztBQVN4RDs7Ozs7OztHQU9HO0FBSUgsTUFBTSxPQUFPLHVCQUNYLFNBQVEsZ0JBQWdCO0lBUXhCLFlBQXNCLG9CQUEwQztRQUM5RCxLQUFLLEVBQUUsQ0FBQztRQURZLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFFOUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbEQsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ3hELENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUN4RCxDQUFDO0lBRUQsYUFBYTtRQUNYLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFRCxtQkFBbUI7UUFDakIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUN6RCxDQUFDOztvSEFoQ1UsdUJBQXVCO3dIQUF2Qix1QkFBdUIsY0FGdEIsTUFBTTsyRkFFUCx1QkFBdUI7a0JBSG5DLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUGFnZVR5cGUgfSBmcm9tICcuLi8uLi9tb2RlbC9jbXMubW9kZWwnO1xuaW1wb3J0IHsgQnJlYWRjcnVtYk1ldGEsIFBhZ2VSb2JvdHNNZXRhIH0gZnJvbSAnLi4vbW9kZWwvcGFnZS5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlUGFnZU1ldGFSZXNvbHZlciB9IGZyb20gJy4vYmFzZS1wYWdlLW1ldGEucmVzb2x2ZXInO1xuaW1wb3J0IHsgUGFnZU1ldGFSZXNvbHZlciB9IGZyb20gJy4vcGFnZS1tZXRhLnJlc29sdmVyJztcbmltcG9ydCB7XG4gIENhbm9uaWNhbFBhZ2VSZXNvbHZlcixcbiAgUGFnZUJyZWFkY3J1bWJSZXNvbHZlcixcbiAgUGFnZURlc2NyaXB0aW9uUmVzb2x2ZXIsXG4gIFBhZ2VSb2JvdHNSZXNvbHZlcixcbiAgUGFnZVRpdGxlUmVzb2x2ZXIsXG59IGZyb20gJy4vcGFnZS5yZXNvbHZlcnMnO1xuXG4vKipcbiAqIFJlc29sdmVzIHRoZSBwYWdlIGRhdGEgZm9yIGFsbCBDb250ZW50IFBhZ2VzIGJhc2VkIG9uIHRoZSBgUGFnZVR5cGUuQ09OVEVOVF9QQUdFYC5cbiAqIE1vcmUgc3BlY2lmaWMgcmVzb2x2ZXJzIGZvciBjb250ZW50IHBhZ2VzIGNhbiBiZSBpbXBsZW1lbnRlZCBieSBtYWtpbmcgdGhlbSBtb3JlXG4gKiBzcGVjaWZpYywgZm9yIGV4YW1wbGUgYnkgdXNpbmcgdGhlIHBhZ2UgdGVtcGxhdGUgKHNlZSBgQ2FydFBhZ2VNZXRhUmVzb2x2ZXJgKS5cbiAqXG4gKiBUaGUgcGFnZSB0aXRsZSwgZGVzY3JpcHRpb24sIGJyZWFkY3J1bWJzIGFuZCByb2JvdCBpbmZvcm1hdGlvbiBhcmUgcmVzb2x2ZWQgZnJvbSB0aGVcbiAqIGNvbnRlbnQgcGFnZSBkYXRhLiBUaGUgY2Fub25pY2FsIFVSTCBpcyByZXNvbHZlZCBmcm9tIHRoZSBVUkwuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDb250ZW50UGFnZU1ldGFSZXNvbHZlclxuICBleHRlbmRzIFBhZ2VNZXRhUmVzb2x2ZXJcbiAgaW1wbGVtZW50c1xuICAgIFBhZ2VUaXRsZVJlc29sdmVyLFxuICAgIFBhZ2VEZXNjcmlwdGlvblJlc29sdmVyLFxuICAgIFBhZ2VCcmVhZGNydW1iUmVzb2x2ZXIsXG4gICAgUGFnZVJvYm90c1Jlc29sdmVyLFxuICAgIENhbm9uaWNhbFBhZ2VSZXNvbHZlclxue1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgYmFzZVBhZ2VNZXRhUmVzb2x2ZXI6IEJhc2VQYWdlTWV0YVJlc29sdmVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnBhZ2VUeXBlID0gUGFnZVR5cGUuQ09OVEVOVF9QQUdFO1xuICB9XG5cbiAgcmVzb2x2ZVRpdGxlKCk6IE9ic2VydmFibGU8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMuYmFzZVBhZ2VNZXRhUmVzb2x2ZXIucmVzb2x2ZVRpdGxlKCk7XG4gIH1cblxuICByZXNvbHZlRGVzY3JpcHRpb24oKTogT2JzZXJ2YWJsZTxzdHJpbmcgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5iYXNlUGFnZU1ldGFSZXNvbHZlci5yZXNvbHZlRGVzY3JpcHRpb24oKTtcbiAgfVxuXG4gIHJlc29sdmVCcmVhZGNydW1icygpOiBPYnNlcnZhYmxlPEJyZWFkY3J1bWJNZXRhW10gfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5iYXNlUGFnZU1ldGFSZXNvbHZlci5yZXNvbHZlQnJlYWRjcnVtYnMoKTtcbiAgfVxuXG4gIHJlc29sdmVSb2JvdHMoKTogT2JzZXJ2YWJsZTxQYWdlUm9ib3RzTWV0YVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuYmFzZVBhZ2VNZXRhUmVzb2x2ZXIucmVzb2x2ZVJvYm90cygpO1xuICB9XG5cbiAgcmVzb2x2ZUNhbm9uaWNhbFVybCgpOiBPYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlTWV0YVJlc29sdmVyLnJlc29sdmVDYW5vbmljYWxVcmwoKTtcbiAgfVxufVxuIl19