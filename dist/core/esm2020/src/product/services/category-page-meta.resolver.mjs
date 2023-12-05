/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import { PageType } from '../../model/cms.model';
import * as i0 from "@angular/core";
import * as i1 from "../facade/product-search.service";
import * as i2 from "../../cms/facade/cms.service";
import * as i3 from "../../i18n/translation.service";
import * as i4 from "../../cms/page/base-page-meta.resolver";
/**
 * Resolves the page data for the Product Listing Page.
 *
 * The page title, and breadcrumbs are resolved in this implementation only.
 */
export class CategoryPageMetaResolver extends PageMetaResolver {
    constructor(productSearchService, cms, translation, basePageMetaResolver) {
        super();
        this.productSearchService = productSearchService;
        this.cms = cms;
        this.translation = translation;
        this.basePageMetaResolver = basePageMetaResolver;
        // reusable observable for search page data
        this.searchPage$ = this.cms
            .getCurrentPage()
            .pipe(filter((page) => Boolean(page)), switchMap((page) => 
        // only the existence of a plp component tells us if products
        // are rendered or if this is an ordinary content page
        this.hasProductListComponent(page)
            ? this.productSearchService
                .getResults()
                .pipe(filter((result) => Boolean(result)))
            : of(page)));
        this.pageType = PageType.CATEGORY_PAGE;
    }
    resolveTitle() {
        return this.searchPage$.pipe(filter((page) => !!page.pagination), switchMap((p) => this.translation.translate('pageMetaResolver.category.title', {
            count: p.pagination?.totalResults,
            query: p.breadcrumbs?.length
                ? p.breadcrumbs[0].facetValueName
                : undefined,
        })));
    }
    resolveBreadcrumbs() {
        return combineLatest([
            this.searchPage$.pipe(),
            this.translation.translate('common.home'),
        ]).pipe(map(([page, label]) => page.breadcrumbs
            ? this.resolveBreadcrumbData(page, label)
            : []));
    }
    resolveBreadcrumbData(page, label) {
        const breadcrumbs = [];
        breadcrumbs.push({ label: label, link: '/' });
        for (const br of page.breadcrumbs ?? []) {
            if (br.facetValueName) {
                if (br.facetCode === 'category' || br.facetCode === 'allCategories') {
                    breadcrumbs.push({
                        label: br.facetValueName,
                        link: `/c/${br.facetValueCode}`,
                    });
                }
                if (br.facetCode === 'brand') {
                    breadcrumbs.push({
                        label: br.facetValueName,
                        link: `/Brands/${br.facetValueName}/c/${br.facetValueCode}`,
                    });
                }
            }
        }
        return breadcrumbs;
    }
    hasProductListComponent(page) {
        return !!Object.keys(page.slots || {}).find((key) => !!page.slots?.[key].components?.find((comp) => comp.typeCode === 'CMSProductListComponent' ||
            comp.typeCode === 'ProductGridComponent'));
    }
    resolveRobots() {
        return this.basePageMetaResolver.resolveRobots();
    }
    /**
     * Resolves the canonical url for the category listing page.
     *
     * The default options will be used to resolve the url, which means that
     * all query parameters are removed and https and www are added explicitly.
     */
    resolveCanonicalUrl() {
        return this.basePageMetaResolver.resolveCanonicalUrl();
    }
}
CategoryPageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CategoryPageMetaResolver, deps: [{ token: i1.ProductSearchService }, { token: i2.CmsService }, { token: i3.TranslationService }, { token: i4.BasePageMetaResolver }], target: i0.ɵɵFactoryTarget.Injectable });
CategoryPageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CategoryPageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CategoryPageMetaResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ProductSearchService }, { type: i2.CmsService }, { type: i3.TranslationService }, { type: i4.BasePageMetaResolver }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnktcGFnZS1tZXRhLnJlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvcHJvZHVjdC9zZXJ2aWNlcy9jYXRlZ29yeS1wYWdlLW1ldGEucmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFReEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFPckUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7Ozs7QUFJakQ7Ozs7R0FJRztBQUlILE1BQU0sT0FBTyx3QkFDWCxTQUFRLGdCQUFnQjtJQW1CeEIsWUFDWSxvQkFBMEMsRUFDMUMsR0FBZSxFQUNmLFdBQStCLEVBQy9CLG9CQUEwQztRQUVwRCxLQUFLLEVBQUUsQ0FBQztRQUxFLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUNmLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBcEJ0RCwyQ0FBMkM7UUFDakMsZ0JBQVcsR0FBeUMsSUFBSSxDQUFDLEdBQUc7YUFDbkUsY0FBYyxFQUFFO2FBQ2hCLElBQUksQ0FDSCxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUMvQixTQUFTLENBQUMsQ0FBQyxJQUFVLEVBQUUsRUFBRTtRQUN2Qiw2REFBNkQ7UUFDN0Qsc0RBQXNEO1FBQ3RELElBQUks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QUMsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLElBQUksQ0FDbEMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUNQLElBQUksQ0FBQyxRQUFRLEtBQUsseUJBQXlCO1lBQzNDLElBQUksQ0FBQyxRQUFRLEtBQUssc0JBQXNCLENBQzNDLENBQ0osQ0FBQztJQUNKLENBQUM7SUFFRCxhQUFhO1FBQ1gsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsbUJBQW1CO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDekQsQ0FBQzs7cUhBMUdVLHdCQUF3Qjt5SEFBeEIsd0JBQXdCLGNBRnZCLE1BQU07MkZBRVAsd0JBQXdCO2tCQUhwQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ21zU2VydmljZSB9IGZyb20gJy4uLy4uL2Ntcy9mYWNhZGUvY21zLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgQnJlYWRjcnVtYk1ldGEsXG4gIFBhZ2UsXG4gIFBhZ2VSb2JvdHNNZXRhLFxufSBmcm9tICcuLi8uLi9jbXMvbW9kZWwvcGFnZS5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlUGFnZU1ldGFSZXNvbHZlciB9IGZyb20gJy4uLy4uL2Ntcy9wYWdlL2Jhc2UtcGFnZS1tZXRhLnJlc29sdmVyJztcbmltcG9ydCB7IFBhZ2VNZXRhUmVzb2x2ZXIgfSBmcm9tICcuLi8uLi9jbXMvcGFnZS9wYWdlLW1ldGEucmVzb2x2ZXInO1xuaW1wb3J0IHtcbiAgUGFnZUJyZWFkY3J1bWJSZXNvbHZlcixcbiAgUGFnZVJvYm90c1Jlc29sdmVyLFxuICBQYWdlVGl0bGVSZXNvbHZlcixcbn0gZnJvbSAnLi4vLi4vY21zL3BhZ2UvcGFnZS5yZXNvbHZlcnMnO1xuaW1wb3J0IHsgVHJhbnNsYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vaTE4bi90cmFuc2xhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFBhZ2VUeXBlIH0gZnJvbSAnLi4vLi4vbW9kZWwvY21zLm1vZGVsJztcbmltcG9ydCB7IFByb2R1Y3RTZWFyY2hQYWdlIH0gZnJvbSAnLi4vLi4vbW9kZWwvcHJvZHVjdC1zZWFyY2gubW9kZWwnO1xuaW1wb3J0IHsgUHJvZHVjdFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuLi9mYWNhZGUvcHJvZHVjdC1zZWFyY2guc2VydmljZSc7XG5cbi8qKlxuICogUmVzb2x2ZXMgdGhlIHBhZ2UgZGF0YSBmb3IgdGhlIFByb2R1Y3QgTGlzdGluZyBQYWdlLlxuICpcbiAqIFRoZSBwYWdlIHRpdGxlLCBhbmQgYnJlYWRjcnVtYnMgYXJlIHJlc29sdmVkIGluIHRoaXMgaW1wbGVtZW50YXRpb24gb25seS5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENhdGVnb3J5UGFnZU1ldGFSZXNvbHZlclxuICBleHRlbmRzIFBhZ2VNZXRhUmVzb2x2ZXJcbiAgaW1wbGVtZW50cyBQYWdlVGl0bGVSZXNvbHZlciwgUGFnZUJyZWFkY3J1bWJSZXNvbHZlciwgUGFnZVJvYm90c1Jlc29sdmVyXG57XG4gIC8vIHJldXNhYmxlIG9ic2VydmFibGUgZm9yIHNlYXJjaCBwYWdlIGRhdGFcbiAgcHJvdGVjdGVkIHNlYXJjaFBhZ2UkOiBPYnNlcnZhYmxlPFByb2R1Y3RTZWFyY2hQYWdlIHwgUGFnZT4gPSB0aGlzLmNtc1xuICAgIC5nZXRDdXJyZW50UGFnZSgpXG4gICAgLnBpcGUoXG4gICAgICBmaWx0ZXIoKHBhZ2UpID0+IEJvb2xlYW4ocGFnZSkpLFxuICAgICAgc3dpdGNoTWFwKChwYWdlOiBQYWdlKSA9PlxuICAgICAgICAvLyBvbmx5IHRoZSBleGlzdGVuY2Ugb2YgYSBwbHAgY29tcG9uZW50IHRlbGxzIHVzIGlmIHByb2R1Y3RzXG4gICAgICAgIC8vIGFyZSByZW5kZXJlZCBvciBpZiB0aGlzIGlzIGFuIG9yZGluYXJ5IGNvbnRlbnQgcGFnZVxuICAgICAgICB0aGlzLmhhc1Byb2R1Y3RMaXN0Q29tcG9uZW50KHBhZ2UpXG4gICAgICAgICAgPyB0aGlzLnByb2R1Y3RTZWFyY2hTZXJ2aWNlXG4gICAgICAgICAgICAgIC5nZXRSZXN1bHRzKClcbiAgICAgICAgICAgICAgLnBpcGUoZmlsdGVyKChyZXN1bHQpID0+IEJvb2xlYW4ocmVzdWx0KSkpXG4gICAgICAgICAgOiBvZihwYWdlKVxuICAgICAgKVxuICAgICk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHByb2R1Y3RTZWFyY2hTZXJ2aWNlOiBQcm9kdWN0U2VhcmNoU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY21zOiBDbXNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGlvbjogVHJhbnNsYXRpb25TZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBiYXNlUGFnZU1ldGFSZXNvbHZlcjogQmFzZVBhZ2VNZXRhUmVzb2x2ZXJcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnBhZ2VUeXBlID0gUGFnZVR5cGUuQ0FURUdPUllfUEFHRTtcbiAgfVxuXG4gIHJlc29sdmVUaXRsZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiAoPE9ic2VydmFibGU8UHJvZHVjdFNlYXJjaFBhZ2U+PnRoaXMuc2VhcmNoUGFnZSQpLnBpcGUoXG4gICAgICBmaWx0ZXIoKHBhZ2U6IFByb2R1Y3RTZWFyY2hQYWdlKSA9PiAhIXBhZ2UucGFnaW5hdGlvbiksXG4gICAgICBzd2l0Y2hNYXAoKHA6IFByb2R1Y3RTZWFyY2hQYWdlKSA9PlxuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uLnRyYW5zbGF0ZSgncGFnZU1ldGFSZXNvbHZlci5jYXRlZ29yeS50aXRsZScsIHtcbiAgICAgICAgICBjb3VudDogcC5wYWdpbmF0aW9uPy50b3RhbFJlc3VsdHMsXG4gICAgICAgICAgcXVlcnk6IHAuYnJlYWRjcnVtYnM/Lmxlbmd0aFxuICAgICAgICAgICAgPyBwLmJyZWFkY3J1bWJzWzBdLmZhY2V0VmFsdWVOYW1lXG4gICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcmVzb2x2ZUJyZWFkY3J1bWJzKCk6IE9ic2VydmFibGU8QnJlYWRjcnVtYk1ldGFbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgICg8T2JzZXJ2YWJsZTxQcm9kdWN0U2VhcmNoUGFnZT4+dGhpcy5zZWFyY2hQYWdlJCkucGlwZSgpLFxuICAgICAgdGhpcy50cmFuc2xhdGlvbi50cmFuc2xhdGUoJ2NvbW1vbi5ob21lJyksXG4gICAgXSkucGlwZShcbiAgICAgIG1hcCgoW3BhZ2UsIGxhYmVsXTogW1Byb2R1Y3RTZWFyY2hQYWdlLCBzdHJpbmddKSA9PlxuICAgICAgICBwYWdlLmJyZWFkY3J1bWJzXG4gICAgICAgICAgPyB0aGlzLnJlc29sdmVCcmVhZGNydW1iRGF0YSg8UHJvZHVjdFNlYXJjaFBhZ2U+cGFnZSwgbGFiZWwpXG4gICAgICAgICAgOiBbXVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVzb2x2ZUJyZWFkY3J1bWJEYXRhKFxuICAgIHBhZ2U6IFByb2R1Y3RTZWFyY2hQYWdlLFxuICAgIGxhYmVsOiBzdHJpbmdcbiAgKTogQnJlYWRjcnVtYk1ldGFbXSB7XG4gICAgY29uc3QgYnJlYWRjcnVtYnM6IEJyZWFkY3J1bWJNZXRhW10gPSBbXTtcbiAgICBicmVhZGNydW1icy5wdXNoKHsgbGFiZWw6IGxhYmVsLCBsaW5rOiAnLycgfSk7XG5cbiAgICBmb3IgKGNvbnN0IGJyIG9mIHBhZ2UuYnJlYWRjcnVtYnMgPz8gW10pIHtcbiAgICAgIGlmIChici5mYWNldFZhbHVlTmFtZSkge1xuICAgICAgICBpZiAoYnIuZmFjZXRDb2RlID09PSAnY2F0ZWdvcnknIHx8IGJyLmZhY2V0Q29kZSA9PT0gJ2FsbENhdGVnb3JpZXMnKSB7XG4gICAgICAgICAgYnJlYWRjcnVtYnMucHVzaCh7XG4gICAgICAgICAgICBsYWJlbDogYnIuZmFjZXRWYWx1ZU5hbWUsXG4gICAgICAgICAgICBsaW5rOiBgL2MvJHtici5mYWNldFZhbHVlQ29kZX1gLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChici5mYWNldENvZGUgPT09ICdicmFuZCcpIHtcbiAgICAgICAgICBicmVhZGNydW1icy5wdXNoKHtcbiAgICAgICAgICAgIGxhYmVsOiBici5mYWNldFZhbHVlTmFtZSxcbiAgICAgICAgICAgIGxpbms6IGAvQnJhbmRzLyR7YnIuZmFjZXRWYWx1ZU5hbWV9L2MvJHtici5mYWNldFZhbHVlQ29kZX1gLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBicmVhZGNydW1icztcbiAgfVxuXG4gIHByb3RlY3RlZCBoYXNQcm9kdWN0TGlzdENvbXBvbmVudChwYWdlOiBQYWdlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhT2JqZWN0LmtleXMocGFnZS5zbG90cyB8fCB7fSkuZmluZChcbiAgICAgIChrZXkpID0+XG4gICAgICAgICEhcGFnZS5zbG90cz8uW2tleV0uY29tcG9uZW50cz8uZmluZChcbiAgICAgICAgICAoY29tcCkgPT5cbiAgICAgICAgICAgIGNvbXAudHlwZUNvZGUgPT09ICdDTVNQcm9kdWN0TGlzdENvbXBvbmVudCcgfHxcbiAgICAgICAgICAgIGNvbXAudHlwZUNvZGUgPT09ICdQcm9kdWN0R3JpZENvbXBvbmVudCdcbiAgICAgICAgKVxuICAgICk7XG4gIH1cblxuICByZXNvbHZlUm9ib3RzKCk6IE9ic2VydmFibGU8UGFnZVJvYm90c01ldGFbXT4ge1xuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlTWV0YVJlc29sdmVyLnJlc29sdmVSb2JvdHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNvbHZlcyB0aGUgY2Fub25pY2FsIHVybCBmb3IgdGhlIGNhdGVnb3J5IGxpc3RpbmcgcGFnZS5cbiAgICpcbiAgICogVGhlIGRlZmF1bHQgb3B0aW9ucyB3aWxsIGJlIHVzZWQgdG8gcmVzb2x2ZSB0aGUgdXJsLCB3aGljaCBtZWFucyB0aGF0XG4gICAqIGFsbCBxdWVyeSBwYXJhbWV0ZXJzIGFyZSByZW1vdmVkIGFuZCBodHRwcyBhbmQgd3d3IGFyZSBhZGRlZCBleHBsaWNpdGx5LlxuICAgKi9cbiAgcmVzb2x2ZUNhbm9uaWNhbFVybCgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlTWV0YVJlc29sdmVyLnJlc29sdmVDYW5vbmljYWxVcmwoKTtcbiAgfVxufVxuIl19