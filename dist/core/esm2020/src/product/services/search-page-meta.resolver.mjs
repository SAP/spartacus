/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import { PageType } from '../../model/cms.model';
import * as i0 from "@angular/core";
import * as i1 from "../../routing/facade/routing.service";
import * as i2 from "../facade/product-search.service";
import * as i3 from "../../i18n/translation.service";
import * as i4 from "../../cms/page/base-page-meta.resolver";
/**
 * Resolves the page data for the Search Result Page based on the
 * `PageType.CATEGORY_PAGE` and the `SearchResultsListPageTemplate` template.
 *
 * Only the page title is resolved in the standard implementation.
 */
export class SearchPageMetaResolver extends PageMetaResolver {
    constructor(routingService, productSearchService, translation, basePageMetaResolver) {
        super();
        this.routingService = routingService;
        this.productSearchService = productSearchService;
        this.translation = translation;
        this.basePageMetaResolver = basePageMetaResolver;
        this.total$ = this.productSearchService
            .getResults()
            .pipe(filter((data) => !!data?.pagination), map((results) => results.pagination?.totalResults));
        this.query$ = this.routingService
            .getRouterState()
            .pipe(map((state) => state.state.params['query']));
        this.pageType = PageType.CONTENT_PAGE;
        this.pageTemplate = 'SearchResultsListPageTemplate';
    }
    resolveTitle() {
        const sources = [this.total$, this.query$];
        return combineLatest(sources).pipe(switchMap(([count, query]) => this.translation
            .translate('pageMetaResolver.search.default_title')
            .pipe(mergeMap((defaultQuery) => this.translation.translate('pageMetaResolver.search.title', {
            count,
            query: query || defaultQuery,
        })))));
    }
    resolveRobots() {
        return this.basePageMetaResolver.resolveRobots();
    }
    /**
     * Resolves the canonical page for the search page.
     *
     * The default options will be used to resolve the url, which means that
     * the all query parameters are removed and https and www are added explicitly.
     */
    resolveCanonicalUrl() {
        return this.basePageMetaResolver.resolveCanonicalUrl();
    }
}
SearchPageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SearchPageMetaResolver, deps: [{ token: i1.RoutingService }, { token: i2.ProductSearchService }, { token: i3.TranslationService }, { token: i4.BasePageMetaResolver }], target: i0.ɵɵFactoryTarget.Injectable });
SearchPageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SearchPageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SearchPageMetaResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i2.ProductSearchService }, { type: i3.TranslationService }, { type: i4.BasePageMetaResolver }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXBhZ2UtbWV0YS5yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3Byb2R1Y3Qvc2VydmljZXMvc2VhcmNoLXBhZ2UtbWV0YS5yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdsRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQU1yRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7OztBQUlqRDs7Ozs7R0FLRztBQUlILE1BQU0sT0FBTyxzQkFDWCxTQUFRLGdCQUFnQjtJQWN4QixZQUNZLGNBQThCLEVBQzlCLG9CQUEwQyxFQUMxQyxXQUErQixFQUMvQixvQkFBMEM7UUFFcEQsS0FBSyxFQUFFLENBQUM7UUFMRSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0IseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQWY1QyxXQUFNLEdBQW1DLElBQUksQ0FBQyxvQkFBb0I7YUFDekUsVUFBVSxFQUFFO2FBQ1osSUFBSSxDQUNILE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsRUFDcEMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUNuRCxDQUFDO1FBRU0sV0FBTSxHQUF1QixJQUFJLENBQUMsY0FBYzthQUN2RCxjQUFjLEVBQUU7YUFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBU25ELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQztRQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLCtCQUErQixDQUFDO0lBQ3RELENBQUM7SUFFRCxZQUFZO1FBQ1YsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyxPQUFPLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ2hDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FDM0IsSUFBSSxDQUFDLFdBQVc7YUFDYixTQUFTLENBQUMsdUNBQXVDLENBQUM7YUFDbEQsSUFBSSxDQUNILFFBQVEsQ0FBQyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLCtCQUErQixFQUFFO1lBQzFELEtBQUs7WUFDTCxLQUFLLEVBQUUsS0FBSyxJQUFJLFlBQVk7U0FDN0IsQ0FBQyxDQUNILENBQ0YsQ0FDSixDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsYUFBYTtRQUNYLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILG1CQUFtQjtRQUNqQixPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQ3pELENBQUM7O21IQXhEVSxzQkFBc0I7dUhBQXRCLHNCQUFzQixjQUZyQixNQUFNOzJGQUVQLHNCQUFzQjtrQkFIbEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgbWVyZ2VNYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFBhZ2VSb2JvdHNNZXRhIH0gZnJvbSAnLi4vLi4vY21zL21vZGVsL3BhZ2UubW9kZWwnO1xuaW1wb3J0IHsgQmFzZVBhZ2VNZXRhUmVzb2x2ZXIgfSBmcm9tICcuLi8uLi9jbXMvcGFnZS9iYXNlLXBhZ2UtbWV0YS5yZXNvbHZlcic7XG5pbXBvcnQgeyBQYWdlTWV0YVJlc29sdmVyIH0gZnJvbSAnLi4vLi4vY21zL3BhZ2UvcGFnZS1tZXRhLnJlc29sdmVyJztcbmltcG9ydCB7XG4gIFBhZ2VSb2JvdHNSZXNvbHZlcixcbiAgUGFnZVRpdGxlUmVzb2x2ZXIsXG59IGZyb20gJy4uLy4uL2Ntcy9wYWdlL3BhZ2UucmVzb2x2ZXJzJztcbmltcG9ydCB7IFRyYW5zbGF0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL2kxOG4vdHJhbnNsYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBQYWdlVHlwZSB9IGZyb20gJy4uLy4uL21vZGVsL2Ntcy5tb2RlbCc7XG5pbXBvcnQgeyBSb3V0aW5nU2VydmljZSB9IGZyb20gJy4uLy4uL3JvdXRpbmcvZmFjYWRlL3JvdXRpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9kdWN0U2VhcmNoU2VydmljZSB9IGZyb20gJy4uL2ZhY2FkZS9wcm9kdWN0LXNlYXJjaC5zZXJ2aWNlJztcblxuLyoqXG4gKiBSZXNvbHZlcyB0aGUgcGFnZSBkYXRhIGZvciB0aGUgU2VhcmNoIFJlc3VsdCBQYWdlIGJhc2VkIG9uIHRoZVxuICogYFBhZ2VUeXBlLkNBVEVHT1JZX1BBR0VgIGFuZCB0aGUgYFNlYXJjaFJlc3VsdHNMaXN0UGFnZVRlbXBsYXRlYCB0ZW1wbGF0ZS5cbiAqXG4gKiBPbmx5IHRoZSBwYWdlIHRpdGxlIGlzIHJlc29sdmVkIGluIHRoZSBzdGFuZGFyZCBpbXBsZW1lbnRhdGlvbi5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaFBhZ2VNZXRhUmVzb2x2ZXJcbiAgZXh0ZW5kcyBQYWdlTWV0YVJlc29sdmVyXG4gIGltcGxlbWVudHMgUGFnZU1ldGFSZXNvbHZlciwgUGFnZVRpdGxlUmVzb2x2ZXIsIFBhZ2VSb2JvdHNSZXNvbHZlclxue1xuICBwcm90ZWN0ZWQgdG90YWwkOiBPYnNlcnZhYmxlPG51bWJlciB8IHVuZGVmaW5lZD4gPSB0aGlzLnByb2R1Y3RTZWFyY2hTZXJ2aWNlXG4gICAgLmdldFJlc3VsdHMoKVxuICAgIC5waXBlKFxuICAgICAgZmlsdGVyKChkYXRhKSA9PiAhIWRhdGE/LnBhZ2luYXRpb24pLFxuICAgICAgbWFwKChyZXN1bHRzKSA9PiByZXN1bHRzLnBhZ2luYXRpb24/LnRvdGFsUmVzdWx0cylcbiAgICApO1xuXG4gIHByb3RlY3RlZCBxdWVyeSQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMucm91dGluZ1NlcnZpY2VcbiAgICAuZ2V0Um91dGVyU3RhdGUoKVxuICAgIC5waXBlKG1hcCgoc3RhdGUpID0+IHN0YXRlLnN0YXRlLnBhcmFtc1sncXVlcnknXSkpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHByb2R1Y3RTZWFyY2hTZXJ2aWNlOiBQcm9kdWN0U2VhcmNoU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRpb246IFRyYW5zbGF0aW9uU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYmFzZVBhZ2VNZXRhUmVzb2x2ZXI6IEJhc2VQYWdlTWV0YVJlc29sdmVyXG4gICkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5wYWdlVHlwZSA9IFBhZ2VUeXBlLkNPTlRFTlRfUEFHRTtcbiAgICB0aGlzLnBhZ2VUZW1wbGF0ZSA9ICdTZWFyY2hSZXN1bHRzTGlzdFBhZ2VUZW1wbGF0ZSc7XG4gIH1cblxuICByZXNvbHZlVGl0bGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICBjb25zdCBzb3VyY2VzID0gW3RoaXMudG90YWwkLCB0aGlzLnF1ZXJ5JF07XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc291cmNlcykucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoW2NvdW50LCBxdWVyeV0pID0+XG4gICAgICAgIHRoaXMudHJhbnNsYXRpb25cbiAgICAgICAgICAudHJhbnNsYXRlKCdwYWdlTWV0YVJlc29sdmVyLnNlYXJjaC5kZWZhdWx0X3RpdGxlJylcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKChkZWZhdWx0UXVlcnkpID0+XG4gICAgICAgICAgICAgIHRoaXMudHJhbnNsYXRpb24udHJhbnNsYXRlKCdwYWdlTWV0YVJlc29sdmVyLnNlYXJjaC50aXRsZScsIHtcbiAgICAgICAgICAgICAgICBjb3VudCxcbiAgICAgICAgICAgICAgICBxdWVyeTogcXVlcnkgfHwgZGVmYXVsdFF1ZXJ5LFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcmVzb2x2ZVJvYm90cygpOiBPYnNlcnZhYmxlPFBhZ2VSb2JvdHNNZXRhW10+IHtcbiAgICByZXR1cm4gdGhpcy5iYXNlUGFnZU1ldGFSZXNvbHZlci5yZXNvbHZlUm9ib3RzKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZXMgdGhlIGNhbm9uaWNhbCBwYWdlIGZvciB0aGUgc2VhcmNoIHBhZ2UuXG4gICAqXG4gICAqIFRoZSBkZWZhdWx0IG9wdGlvbnMgd2lsbCBiZSB1c2VkIHRvIHJlc29sdmUgdGhlIHVybCwgd2hpY2ggbWVhbnMgdGhhdFxuICAgKiB0aGUgYWxsIHF1ZXJ5IHBhcmFtZXRlcnMgYXJlIHJlbW92ZWQgYW5kIGh0dHBzIGFuZCB3d3cgYXJlIGFkZGVkIGV4cGxpY2l0bHkuXG4gICAqL1xuICByZXNvbHZlQ2Fub25pY2FsVXJsKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuYmFzZVBhZ2VNZXRhUmVzb2x2ZXIucmVzb2x2ZUNhbm9uaWNhbFVybCgpO1xuICB9XG59XG4iXX0=