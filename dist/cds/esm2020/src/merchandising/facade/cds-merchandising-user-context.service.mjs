/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { PageType, } from '@spartacus/core';
import { combineLatest, of } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../../profiletag";
import * as i3 from "@spartacus/storefront";
export class CdsMerchandisingUserContextService {
    constructor(routingService, productSearchService, profileTagEventService, profileTagLifecycleService, facetService) {
        this.routingService = routingService;
        this.productSearchService = productSearchService;
        this.profileTagEventService = profileTagEventService;
        this.profileTagLifecycleService = profileTagLifecycleService;
        this.facetService = facetService;
    }
    getUserContext() {
        return combineLatest([
            this.getConsentReferenceContext(),
            this.getPageContext(),
            this.getSearchContext(),
        ]).pipe(map(([consentContext, pageContext, searchContext]) => {
            const result = {
                ...consentContext,
                ...pageContext,
            };
            if (!pageContext.products) {
                result['facets'] = searchContext.facets;
                result['searchPhrase'] = searchContext.searchPhrase;
            }
            return result;
        }), distinctUntilChanged((prev, curr) => prev.facets === curr.facets &&
            prev.searchPhrase === curr.searchPhrase &&
            prev.consentReference === curr.consentReference &&
            prev.category === curr.category &&
            prev.products === curr.products));
    }
    getConsentReferenceContext() {
        return this.profileTagLifecycleService.consentChanged().pipe(switchMap((changed) => {
            if (changed.data.granted) {
                return this.profileTagEventService
                    .getConsentReference()
                    .pipe(map((consentReference) => ({ consentReference })));
            }
            else {
                this.profileTagEventService.handleConsentWithdrawn();
                return of({ consentReference: '' });
            }
        }));
    }
    getPageContext() {
        return this.routingService.getPageContext().pipe(map((pageContext) => {
            const result = {};
            if (pageContext.type === PageType.PRODUCT_PAGE) {
                result.products = [pageContext.id];
            }
            else if (pageContext.type === PageType.CATEGORY_PAGE) {
                result.category = pageContext.id;
            }
            return result;
        }));
    }
    getSearchContext() {
        return combineLatest([
            this.productSearchService
                .getResults()
                .pipe(startWith({})),
            this.facetService.facetList$.pipe(startWith({})),
        ]).pipe(map(([searchResult, facetList]) => {
            const facets = facetList?.activeFacets
                ?.map((facet) => `${facet.facetCode}:${facet.facetValueCode}`)
                .join(':');
            return {
                facets: facets || undefined,
                searchPhrase: searchResult.freeTextSearch || undefined,
            };
        }), distinctUntilChanged((prev, curr) => prev.facets === curr.facets && prev.searchPhrase === curr.searchPhrase));
    }
}
CdsMerchandisingUserContextService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsMerchandisingUserContextService, deps: [{ token: i1.RoutingService }, { token: i1.ProductSearchService }, { token: i2.ProfileTagEventService }, { token: i2.ProfileTagLifecycleService }, { token: i3.FacetService }], target: i0.ɵɵFactoryTarget.Injectable });
CdsMerchandisingUserContextService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsMerchandisingUserContextService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsMerchandisingUserContextService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i1.ProductSearchService }, { type: i2.ProfileTagEventService }, { type: i2.ProfileTagLifecycleService }, { type: i3.FacetService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RzLW1lcmNoYW5kaXNpbmctdXNlci1jb250ZXh0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2Nkcy9zcmMvbWVyY2hhbmRpc2luZy9mYWNhZGUvY2RzLW1lcmNoYW5kaXNpbmctdXNlci1jb250ZXh0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUNMLFFBQVEsR0FJVCxNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxhQUFhLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsR0FBRyxFQUNILFNBQVMsRUFDVCxTQUFTLEdBQ1YsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFVeEIsTUFBTSxPQUFPLGtDQUFrQztJQUM3QyxZQUNVLGNBQThCLEVBQzlCLG9CQUEwQyxFQUMxQyxzQkFBOEMsRUFDOUMsMEJBQXNELEVBQ3RELFlBQTBCO1FBSjFCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7UUFDOUMsK0JBQTBCLEdBQTFCLDBCQUEwQixDQUE0QjtRQUN0RCxpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUNqQyxDQUFDO0lBRUosY0FBYztRQUNaLE9BQU8sYUFBYSxDQUFDO1lBQ25CLElBQUksQ0FBQywwQkFBMEIsRUFBRTtZQUNqQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtTQUN4QixDQUFDLENBQUMsSUFBSSxDQUNMLEdBQUcsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLFdBQVcsRUFBRSxhQUFhLENBQUMsRUFBRSxFQUFF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O1lBRWIsT0FBTztnQkFDTCxNQUFNLEVBQUUsTUFBTSxJQUFJLFNBQVM7Z0JBQzNCLFlBQVksRUFBRSxZQUFZLENBQUMsY0FBYyxJQUFJLFNBQVM7YUFDM0IsQ0FBQztRQUNoQyxDQUFDLENBQUMsRUFDRixvQkFBb0IsQ0FDbEIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FDYixJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsWUFBWSxDQUN6RSxDQUNGLENBQUM7SUFDSixDQUFDOzsrSEEzRlUsa0NBQWtDO21JQUFsQyxrQ0FBa0MsY0FGakMsTUFBTTsyRkFFUCxrQ0FBa0M7a0JBSDlDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgUGFnZVR5cGUsXG4gIFByb2R1Y3RTZWFyY2hTZXJ2aWNlLFxuICBSb3V0aW5nU2VydmljZSxcbiAgUHJvZHVjdFNlYXJjaFBhZ2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBGYWNldFNlcnZpY2UsIEZhY2V0TGlzdCB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIG1hcCxcbiAgc3RhcnRXaXRoLFxuICBzd2l0Y2hNYXAsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIFByb2ZpbGVUYWdFdmVudFNlcnZpY2UsXG4gIFByb2ZpbGVUYWdMaWZlY3ljbGVTZXJ2aWNlLFxufSBmcm9tICcuLi8uLi9wcm9maWxldGFnJztcbmltcG9ydCB7IE1lcmNoYW5kaXNpbmdVc2VyQ29udGV4dCB9IGZyb20gJy4uL21vZGVsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENkc01lcmNoYW5kaXNpbmdVc2VyQ29udGV4dFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZSxcbiAgICBwcml2YXRlIHByb2R1Y3RTZWFyY2hTZXJ2aWNlOiBQcm9kdWN0U2VhcmNoU2VydmljZSxcbiAgICBwcml2YXRlIHByb2ZpbGVUYWdFdmVudFNlcnZpY2U6IFByb2ZpbGVUYWdFdmVudFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwcm9maWxlVGFnTGlmZWN5Y2xlU2VydmljZTogUHJvZmlsZVRhZ0xpZmVjeWNsZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBmYWNldFNlcnZpY2U6IEZhY2V0U2VydmljZVxuICApIHt9XG5cbiAgZ2V0VXNlckNvbnRleHQoKTogT2JzZXJ2YWJsZTxNZXJjaGFuZGlzaW5nVXNlckNvbnRleHQ+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLmdldENvbnNlbnRSZWZlcmVuY2VDb250ZXh0KCksXG4gICAgICB0aGlzLmdldFBhZ2VDb250ZXh0KCksXG4gICAgICB0aGlzLmdldFNlYXJjaENvbnRleHQoKSxcbiAgICBdKS5waXBlKFxuICAgICAgbWFwKChbY29uc2VudENvbnRleHQsIHBhZ2VDb250ZXh0LCBzZWFyY2hDb250ZXh0XSkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgICAgLi4uY29uc2VudENvbnRleHQsXG4gICAgICAgICAgLi4ucGFnZUNvbnRleHQsXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCFwYWdlQ29udGV4dC5wcm9kdWN0cykge1xuICAgICAgICAgIHJlc3VsdFsnZmFjZXRzJ10gPSBzZWFyY2hDb250ZXh0LmZhY2V0cztcbiAgICAgICAgICByZXN1bHRbJ3NlYXJjaFBocmFzZSddID0gc2VhcmNoQ29udGV4dC5zZWFyY2hQaHJhc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZChcbiAgICAgICAgKHByZXYsIGN1cnIpID0+XG4gICAgICAgICAgcHJldi5mYWNldHMgPT09IGN1cnIuZmFjZXRzICYmXG4gICAgICAgICAgcHJldi5zZWFyY2hQaHJhc2UgPT09IGN1cnIuc2VhcmNoUGhyYXNlICYmXG4gICAgICAgICAgcHJldi5jb25zZW50UmVmZXJlbmNlID09PSBjdXJyLmNvbnNlbnRSZWZlcmVuY2UgJiZcbiAgICAgICAgICBwcmV2LmNhdGVnb3J5ID09PSBjdXJyLmNhdGVnb3J5ICYmXG4gICAgICAgICAgcHJldi5wcm9kdWN0cyA9PT0gY3Vyci5wcm9kdWN0c1xuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGdldENvbnNlbnRSZWZlcmVuY2VDb250ZXh0KCk6IE9ic2VydmFibGU8TWVyY2hhbmRpc2luZ1VzZXJDb250ZXh0PiB7XG4gICAgcmV0dXJuIHRoaXMucHJvZmlsZVRhZ0xpZmVjeWNsZVNlcnZpY2UuY29uc2VudENoYW5nZWQoKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChjaGFuZ2VkKSA9PiB7XG4gICAgICAgIGlmIChjaGFuZ2VkLmRhdGEuZ3JhbnRlZCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnByb2ZpbGVUYWdFdmVudFNlcnZpY2VcbiAgICAgICAgICAgIC5nZXRDb25zZW50UmVmZXJlbmNlKClcbiAgICAgICAgICAgIC5waXBlKG1hcCgoY29uc2VudFJlZmVyZW5jZSkgPT4gKHsgY29uc2VudFJlZmVyZW5jZSB9KSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucHJvZmlsZVRhZ0V2ZW50U2VydmljZS5oYW5kbGVDb25zZW50V2l0aGRyYXduKCk7XG4gICAgICAgICAgcmV0dXJuIG9mKHsgY29uc2VudFJlZmVyZW5jZTogJycgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGFnZUNvbnRleHQoKTogT2JzZXJ2YWJsZTxNZXJjaGFuZGlzaW5nVXNlckNvbnRleHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yb3V0aW5nU2VydmljZS5nZXRQYWdlQ29udGV4dCgpLnBpcGUoXG4gICAgICBtYXAoKHBhZ2VDb250ZXh0KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHt9IGFzIE1lcmNoYW5kaXNpbmdVc2VyQ29udGV4dDtcblxuICAgICAgICBpZiAocGFnZUNvbnRleHQudHlwZSA9PT0gUGFnZVR5cGUuUFJPRFVDVF9QQUdFKSB7XG4gICAgICAgICAgcmVzdWx0LnByb2R1Y3RzID0gW3BhZ2VDb250ZXh0LmlkXTtcbiAgICAgICAgfSBlbHNlIGlmIChwYWdlQ29udGV4dC50eXBlID09PSBQYWdlVHlwZS5DQVRFR09SWV9QQUdFKSB7XG4gICAgICAgICAgcmVzdWx0LmNhdGVnb3J5ID0gcGFnZUNvbnRleHQuaWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U2VhcmNoQ29udGV4dCgpOiBPYnNlcnZhYmxlPE1lcmNoYW5kaXNpbmdVc2VyQ29udGV4dD4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMucHJvZHVjdFNlYXJjaFNlcnZpY2VcbiAgICAgICAgLmdldFJlc3VsdHMoKVxuICAgICAgICAucGlwZShzdGFydFdpdGgoe30gYXMgUHJvZHVjdFNlYXJjaFBhZ2UpKSxcbiAgICAgIHRoaXMuZmFjZXRTZXJ2aWNlLmZhY2V0TGlzdCQucGlwZShzdGFydFdpdGgoe30gYXMgRmFjZXRMaXN0KSksXG4gICAgXSkucGlwZShcbiAgICAgIG1hcCgoW3NlYXJjaFJlc3VsdCwgZmFjZXRMaXN0XSkgPT4ge1xuICAgICAgICBjb25zdCBmYWNldHMgPSBmYWNldExpc3Q/LmFjdGl2ZUZhY2V0c1xuICAgICAgICAgID8ubWFwKChmYWNldCkgPT4gYCR7ZmFjZXQuZmFjZXRDb2RlfToke2ZhY2V0LmZhY2V0VmFsdWVDb2RlfWApXG4gICAgICAgICAgLmpvaW4oJzonKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGZhY2V0czogZmFjZXRzIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICBzZWFyY2hQaHJhc2U6IHNlYXJjaFJlc3VsdC5mcmVlVGV4dFNlYXJjaCB8fCB1bmRlZmluZWQsXG4gICAgICAgIH0gYXMgTWVyY2hhbmRpc2luZ1VzZXJDb250ZXh0O1xuICAgICAgfSksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZChcbiAgICAgICAgKHByZXYsIGN1cnIpID0+XG4gICAgICAgICAgcHJldi5mYWNldHMgPT09IGN1cnIuZmFjZXRzICYmIHByZXYuc2VhcmNoUGhyYXNlID09PSBjdXJyLnNlYXJjaFBocmFzZVxuICAgICAgKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==