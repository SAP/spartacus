/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { filter, map, pairwise } from 'rxjs/operators';
import { createFrom } from '../../util/create-from';
import { FacetChangedEvent } from './product.events';
import * as i0 from "@angular/core";
import * as i1 from "../../event/event.service";
import * as i2 from "../facade/product-search.service";
export class ProductEventBuilder {
    constructor(eventService, productSearchService) {
        this.eventService = eventService;
        this.productSearchService = productSearchService;
        this.register();
    }
    register() {
        this.eventService.register(FacetChangedEvent, this.buildFacetChangedEvent());
    }
    /**
     * To get the changed facet, we need to compare the product search results
     * got before and after toggling the facet value. These 2 product searches must
     * have the same search queries except one different solr filter term. That means
     * these 2 searches must have the same 'freeTextSearch'; and if they are category
     * searches, they must have the same root (in the same category or brand).
     */
    buildFacetChangedEvent() {
        return this.productSearchService.getResults().pipe(pairwise(), filter(([prev, curr]) => this.compareSearchResults(prev, curr)), map(([prev, curr]) => {
            const toggled = this.getToggledBreadcrumb(curr.breadcrumbs, prev.breadcrumbs) ||
                this.getToggledBreadcrumb(prev.breadcrumbs, curr.breadcrumbs);
            if (toggled) {
                return createFrom(FacetChangedEvent, {
                    code: toggled.facetCode,
                    name: toggled.facetName,
                    valueCode: toggled.facetValueCode,
                    valueName: toggled.facetValueName,
                    selected: curr.breadcrumbs &&
                        prev.breadcrumbs &&
                        curr.breadcrumbs.length > prev.breadcrumbs.length,
                });
            }
        }));
    }
    /**
     * The 2 product searches (before and after facet changed) must have the same
     * search queries; and if they are category searches, they also must have the
     * same root (in the same category or brand).
     */
    compareSearchResults(prev, curr) {
        if (prev && Object.keys(prev).length !== 0) {
            // for text searches, they must have the same freeTextSearch
            const sameFreeTextSearch = prev.freeTextSearch !== '' &&
                prev.freeTextSearch === curr.freeTextSearch;
            // for category searches, they must have the same root
            const sameCategoryRoot = curr.breadcrumbs?.[0]?.facetCode === 'allCategories' &&
                prev.breadcrumbs?.[0]?.facetCode === curr.breadcrumbs[0]?.facetCode &&
                // same category or brand
                prev.breadcrumbs[0].facetValueCode ===
                    curr.breadcrumbs[0].facetValueCode;
            return sameFreeTextSearch || sameCategoryRoot;
        }
        return false;
    }
    /**
     * Get the toggled breadcrumb. The 2 breadcrumb lists got from the 2 search results
     * only can have one different solr filter term.
     */
    getToggledBreadcrumb(bc1, bc2) {
        if (bc1 && bc2 && bc1.length - bc2.length === 1) {
            return bc1.find((x) => !bc2.find((y) => y.facetCode === x.facetCode &&
                y.facetValueCode === x.facetValueCode));
        }
    }
}
ProductEventBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductEventBuilder, deps: [{ token: i1.EventService }, { token: i2.ProductSearchService }], target: i0.ɵɵFactoryTarget.Injectable });
ProductEventBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductEventBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductEventBuilder, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }, { type: i2.ProductSearchService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1ldmVudC5idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvcHJvZHVjdC9ldmVudC9wcm9kdWN0LWV2ZW50LmJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFNdkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXBELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7O0FBS3JELE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsWUFDWSxZQUEwQixFQUMxQixvQkFBMEM7UUFEMUMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUVwRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVTLFFBQVE7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQ3hCLGlCQUFpQixFQUNqQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FDOUIsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDTyxzQkFBc0I7UUFHOUIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUNoRCxRQUFRLEVBQUUsRUFDVixNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUMvRCxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ25CLE1BQU0sT0FBTyxHQUNYLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQzdELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNoRSxJQUFJLE9BQU8sRUFBRTtnQkFDWCxPQUFPLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRTtvQkFDbkMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxTQUFTO29CQUN2QixJQUFJLEVBQUUsT0FBTyxDQUFDLFNBQVM7b0JBQ3ZCLFNBQVMsRUFBRSxPQUFPLENBQUMsY0FBYztvQkFDakMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxjQUFjO29CQUNqQyxRQUFRLEVBQ04sSUFBSSxDQUFDLFdBQVc7d0JBQ2hCLElBQUksQ0FBQyxXQUFXO3dCQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU07aUJBQ3BELENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssb0JBQW9CLENBQzFCLElBQXVCLEVBQ3ZCLElBQXVCO1FBRXZCLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUMxQyw0REFBNEQ7WUFDNUQsTUFBTSxrQkFBa0IsR0FDdEIsSUFBSSxDQUFDLGNBQWMsS0FBSyxFQUFFO2dCQUMxQixJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxjQUFjLENBQUM7WUFFOUMsc0RBQXNEO1lBQ3RELE1BQU0sZ0JBQWdCLEdBQ3BCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLEtBQUssZUFBZTtnQkFDcEQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVM7Z0JBQ25FLHlCQUF5QjtnQkFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjO29CQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztZQUV2QyxPQUFPLGtCQUFrQixJQUFJLGdCQUFnQixDQUFDO1NBQy9DO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssb0JBQW9CLENBQzFCLEdBQTZCLEVBQzdCLEdBQTZCO1FBRTdCLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQy9DLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FDYixDQUFDLENBQUMsRUFBRSxFQUFFLENBQ0osQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUNQLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FDSixDQUFDLENBQUMsU0FBUyxLQUFLLENBQUMsQ0FBQyxTQUFTO2dCQUMzQixDQUFDLENBQUMsY0FBYyxLQUFLLENBQUMsQ0FBQyxjQUFjLENBQ3hDLENBQ0osQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7Z0hBOUZVLG1CQUFtQjtvSEFBbkIsbUJBQW1CLGNBRmxCLE1BQU07MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBwYWlyd2lzZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEV2ZW50U2VydmljZSB9IGZyb20gJy4uLy4uL2V2ZW50L2V2ZW50LnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgQnJlYWRjcnVtYixcbiAgUHJvZHVjdFNlYXJjaFBhZ2UsXG59IGZyb20gJy4uLy4uL21vZGVsL3Byb2R1Y3Qtc2VhcmNoLm1vZGVsJztcbmltcG9ydCB7IGNyZWF0ZUZyb20gfSBmcm9tICcuLi8uLi91dGlsL2NyZWF0ZS1mcm9tJztcbmltcG9ydCB7IFByb2R1Y3RTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vZmFjYWRlL3Byb2R1Y3Qtc2VhcmNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmFjZXRDaGFuZ2VkRXZlbnQgfSBmcm9tICcuL3Byb2R1Y3QuZXZlbnRzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RFdmVudEJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHByb2R1Y3RTZWFyY2hTZXJ2aWNlOiBQcm9kdWN0U2VhcmNoU2VydmljZVxuICApIHtcbiAgICB0aGlzLnJlZ2lzdGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVnaXN0ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5ldmVudFNlcnZpY2UucmVnaXN0ZXIoXG4gICAgICBGYWNldENoYW5nZWRFdmVudCxcbiAgICAgIHRoaXMuYnVpbGRGYWNldENoYW5nZWRFdmVudCgpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUbyBnZXQgdGhlIGNoYW5nZWQgZmFjZXQsIHdlIG5lZWQgdG8gY29tcGFyZSB0aGUgcHJvZHVjdCBzZWFyY2ggcmVzdWx0c1xuICAgKiBnb3QgYmVmb3JlIGFuZCBhZnRlciB0b2dnbGluZyB0aGUgZmFjZXQgdmFsdWUuIFRoZXNlIDIgcHJvZHVjdCBzZWFyY2hlcyBtdXN0XG4gICAqIGhhdmUgdGhlIHNhbWUgc2VhcmNoIHF1ZXJpZXMgZXhjZXB0IG9uZSBkaWZmZXJlbnQgc29sciBmaWx0ZXIgdGVybS4gVGhhdCBtZWFuc1xuICAgKiB0aGVzZSAyIHNlYXJjaGVzIG11c3QgaGF2ZSB0aGUgc2FtZSAnZnJlZVRleHRTZWFyY2gnOyBhbmQgaWYgdGhleSBhcmUgY2F0ZWdvcnlcbiAgICogc2VhcmNoZXMsIHRoZXkgbXVzdCBoYXZlIHRoZSBzYW1lIHJvb3QgKGluIHRoZSBzYW1lIGNhdGVnb3J5IG9yIGJyYW5kKS5cbiAgICovXG4gIHByb3RlY3RlZCBidWlsZEZhY2V0Q2hhbmdlZEV2ZW50KCk6IE9ic2VydmFibGU8XG4gICAgRmFjZXRDaGFuZ2VkRXZlbnQgfCB1bmRlZmluZWRcbiAgPiB7XG4gICAgcmV0dXJuIHRoaXMucHJvZHVjdFNlYXJjaFNlcnZpY2UuZ2V0UmVzdWx0cygpLnBpcGUoXG4gICAgICBwYWlyd2lzZSgpLFxuICAgICAgZmlsdGVyKChbcHJldiwgY3Vycl0pID0+IHRoaXMuY29tcGFyZVNlYXJjaFJlc3VsdHMocHJldiwgY3VycikpLFxuICAgICAgbWFwKChbcHJldiwgY3Vycl0pID0+IHtcbiAgICAgICAgY29uc3QgdG9nZ2xlZCA9XG4gICAgICAgICAgdGhpcy5nZXRUb2dnbGVkQnJlYWRjcnVtYihjdXJyLmJyZWFkY3J1bWJzLCBwcmV2LmJyZWFkY3J1bWJzKSB8fFxuICAgICAgICAgIHRoaXMuZ2V0VG9nZ2xlZEJyZWFkY3J1bWIocHJldi5icmVhZGNydW1icywgY3Vyci5icmVhZGNydW1icyk7XG4gICAgICAgIGlmICh0b2dnbGVkKSB7XG4gICAgICAgICAgcmV0dXJuIGNyZWF0ZUZyb20oRmFjZXRDaGFuZ2VkRXZlbnQsIHtcbiAgICAgICAgICAgIGNvZGU6IHRvZ2dsZWQuZmFjZXRDb2RlLFxuICAgICAgICAgICAgbmFtZTogdG9nZ2xlZC5mYWNldE5hbWUsXG4gICAgICAgICAgICB2YWx1ZUNvZGU6IHRvZ2dsZWQuZmFjZXRWYWx1ZUNvZGUsXG4gICAgICAgICAgICB2YWx1ZU5hbWU6IHRvZ2dsZWQuZmFjZXRWYWx1ZU5hbWUsXG4gICAgICAgICAgICBzZWxlY3RlZDpcbiAgICAgICAgICAgICAgY3Vyci5icmVhZGNydW1icyAmJlxuICAgICAgICAgICAgICBwcmV2LmJyZWFkY3J1bWJzICYmXG4gICAgICAgICAgICAgIGN1cnIuYnJlYWRjcnVtYnMubGVuZ3RoID4gcHJldi5icmVhZGNydW1icy5sZW5ndGgsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgMiBwcm9kdWN0IHNlYXJjaGVzIChiZWZvcmUgYW5kIGFmdGVyIGZhY2V0IGNoYW5nZWQpIG11c3QgaGF2ZSB0aGUgc2FtZVxuICAgKiBzZWFyY2ggcXVlcmllczsgYW5kIGlmIHRoZXkgYXJlIGNhdGVnb3J5IHNlYXJjaGVzLCB0aGV5IGFsc28gbXVzdCBoYXZlIHRoZVxuICAgKiBzYW1lIHJvb3QgKGluIHRoZSBzYW1lIGNhdGVnb3J5IG9yIGJyYW5kKS5cbiAgICovXG4gIHByaXZhdGUgY29tcGFyZVNlYXJjaFJlc3VsdHMoXG4gICAgcHJldjogUHJvZHVjdFNlYXJjaFBhZ2UsXG4gICAgY3VycjogUHJvZHVjdFNlYXJjaFBhZ2VcbiAgKTogYm9vbGVhbiB7XG4gICAgaWYgKHByZXYgJiYgT2JqZWN0LmtleXMocHJldikubGVuZ3RoICE9PSAwKSB7XG4gICAgICAvLyBmb3IgdGV4dCBzZWFyY2hlcywgdGhleSBtdXN0IGhhdmUgdGhlIHNhbWUgZnJlZVRleHRTZWFyY2hcbiAgICAgIGNvbnN0IHNhbWVGcmVlVGV4dFNlYXJjaCA9XG4gICAgICAgIHByZXYuZnJlZVRleHRTZWFyY2ggIT09ICcnICYmXG4gICAgICAgIHByZXYuZnJlZVRleHRTZWFyY2ggPT09IGN1cnIuZnJlZVRleHRTZWFyY2g7XG5cbiAgICAgIC8vIGZvciBjYXRlZ29yeSBzZWFyY2hlcywgdGhleSBtdXN0IGhhdmUgdGhlIHNhbWUgcm9vdFxuICAgICAgY29uc3Qgc2FtZUNhdGVnb3J5Um9vdCA9XG4gICAgICAgIGN1cnIuYnJlYWRjcnVtYnM/LlswXT8uZmFjZXRDb2RlID09PSAnYWxsQ2F0ZWdvcmllcycgJiZcbiAgICAgICAgcHJldi5icmVhZGNydW1icz8uWzBdPy5mYWNldENvZGUgPT09IGN1cnIuYnJlYWRjcnVtYnNbMF0/LmZhY2V0Q29kZSAmJlxuICAgICAgICAvLyBzYW1lIGNhdGVnb3J5IG9yIGJyYW5kXG4gICAgICAgIHByZXYuYnJlYWRjcnVtYnNbMF0uZmFjZXRWYWx1ZUNvZGUgPT09XG4gICAgICAgICAgY3Vyci5icmVhZGNydW1ic1swXS5mYWNldFZhbHVlQ29kZTtcblxuICAgICAgcmV0dXJuIHNhbWVGcmVlVGV4dFNlYXJjaCB8fCBzYW1lQ2F0ZWdvcnlSb290O1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB0b2dnbGVkIGJyZWFkY3J1bWIuIFRoZSAyIGJyZWFkY3J1bWIgbGlzdHMgZ290IGZyb20gdGhlIDIgc2VhcmNoIHJlc3VsdHNcbiAgICogb25seSBjYW4gaGF2ZSBvbmUgZGlmZmVyZW50IHNvbHIgZmlsdGVyIHRlcm0uXG4gICAqL1xuICBwcml2YXRlIGdldFRvZ2dsZWRCcmVhZGNydW1iKFxuICAgIGJjMTogQnJlYWRjcnVtYltdIHwgdW5kZWZpbmVkLFxuICAgIGJjMjogQnJlYWRjcnVtYltdIHwgdW5kZWZpbmVkXG4gICk6IEJyZWFkY3J1bWIgfCB1bmRlZmluZWQge1xuICAgIGlmIChiYzEgJiYgYmMyICYmIGJjMS5sZW5ndGggLSBiYzIubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gYmMxLmZpbmQoXG4gICAgICAgICh4KSA9PlxuICAgICAgICAgICFiYzIuZmluZChcbiAgICAgICAgICAgICh5KSA9PlxuICAgICAgICAgICAgICB5LmZhY2V0Q29kZSA9PT0geC5mYWNldENvZGUgJiZcbiAgICAgICAgICAgICAgeS5mYWNldFZhbHVlQ29kZSA9PT0geC5mYWNldFZhbHVlQ29kZVxuICAgICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iXX0=