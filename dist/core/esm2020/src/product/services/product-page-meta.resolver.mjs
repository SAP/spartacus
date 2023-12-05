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
import { isNotUndefined } from '../../util/type-guards';
import * as i0 from "@angular/core";
import * as i1 from "../../routing/facade/routing.service";
import * as i2 from "../facade/product.service";
import * as i3 from "../../i18n/translation.service";
import * as i4 from "../../cms/page/base-page-meta.resolver";
import * as i5 from "../../cms/page/routing/page-link.service";
/**
 * Resolves the page data for the Product Detail Page
 * based on the `PageType.PRODUCT_PAGE`.
 *
 * The page title, heading, description, breadcrumbs and
 * first GALLERY image are resolved if available in the data.
 */
export class ProductPageMetaResolver extends PageMetaResolver {
    constructor(routingService, productService, translation, basePageMetaResolver, pageLinkService) {
        super();
        this.routingService = routingService;
        this.productService = productService;
        this.translation = translation;
        this.basePageMetaResolver = basePageMetaResolver;
        this.pageLinkService = pageLinkService;
        // reusable observable for product data based on the current page
        this.product$ = this.routingService
            .getRouterState()
            .pipe(map((state) => state.state.params['productCode']), filter((code) => !!code), switchMap((code) => this.productService.get(code, "details" /* ProductScope.DETAILS */)), filter(isNotUndefined));
        this.pageType = PageType.PRODUCT_PAGE;
    }
    /**
     * Resolves the page heading for the Product Detail Page.
     * The page heading is used in the UI (`<h1>`), where as the page
     * title is used by the browser and crawlers.
     */
    resolveHeading() {
        return this.product$.pipe(switchMap((p) => this.translation.translate('pageMetaResolver.product.heading', {
            heading: p.name,
        })));
    }
    /**
     * Resolves the page title for the Product Detail Page. The page title
     * is resolved with the product name, the first category and the manufacturer.
     * The page title used by the browser (history, tabs) and crawlers.
     */
    resolveTitle() {
        return this.product$.pipe(switchMap((product) => {
            let title = product.name;
            title += this.resolveFirstCategory(product);
            title += this.resolveManufacturer(product);
            return this.translation.translate('pageMetaResolver.product.title', {
                title: title,
            });
        }));
    }
    /**
     * Resolves the page description for the Product Detail Page. The description
     * is based on the `product.summary`.
     */
    resolveDescription() {
        return this.product$.pipe(switchMap((product) => this.translation.translate('pageMetaResolver.product.description', {
            description: product.summary,
        })));
    }
    /**
     * Resolves breadcrumbs for the Product Detail Page. The breadcrumbs are driven by
     * a static home page crumb and a crumb for each category.
     */
    resolveBreadcrumbs() {
        return combineLatest([
            this.product$.pipe(),
            this.translation.translate('common.home'),
        ]).pipe(map(([product, label]) => {
            const breadcrumbs = [];
            breadcrumbs.push({ label, link: '/' });
            for (const { name, code, url } of product.categories || []) {
                breadcrumbs.push({
                    label: name || code,
                    link: url,
                });
            }
            return breadcrumbs;
        }));
    }
    /**
     * Resolves the main page image for the Product Detail Page. The product image
     * is based on the PRIMARY product image. The zoom format is used by default.
     */
    resolveImage() {
        return this.product$.pipe(map((product) => product.images?.PRIMARY?.zoom?.url ?? null));
    }
    resolveFirstCategory(product) {
        const firstCategory = product?.categories?.[0];
        return firstCategory
            ? ` | ${firstCategory.name || firstCategory.code}`
            : '';
    }
    resolveManufacturer(product) {
        return product.manufacturer ? ` | ${product.manufacturer}` : '';
    }
    resolveRobots() {
        return this.basePageMetaResolver.resolveRobots();
    }
    /**
     * Resolves the canonical url for the product page using the default canonical url
     * configuration.
     *
     * In case of a variant product, the baseProduct code is used to resolve the url. It's important
     * to know that this has a few limitations:
     * - We're not always able to get the super baseProduct, in case of multi-level variants.
     *   OCC only exposes the direct baseProduct, which might still not resolve in the correct
     *   canonical URL. This is business driven and subject to change in a customization.
     * - The url resolved for the variant doesn't contain any content other then the product code.
     *   This means that we do not provide any product data to resolve pretty URLs (for example
     *   the product title).
     */
    resolveCanonicalUrl() {
        return this.product$.pipe(switchMap((product) => this.findBaseProduct(product)), map((product) => {
            const url = this.routingService.getFullUrl({
                cxRoute: 'product',
                params: product,
            });
            return this.pageLinkService.getCanonicalUrl({}, url);
        }));
    }
    /**
     * Resolves the base product whenever the given product is a variant product.
     *
     * Since product variants can be multi-layered, we recursively try to find the base product
     * this might be too opinionated for your business though.
     */
    findBaseProduct(product) {
        if (product?.baseProduct) {
            return this.productService
                .get(product.baseProduct, "list" /* ProductScope.LIST */)
                .pipe(filter(isNotUndefined), switchMap((baseProduct) => this.findBaseProduct(baseProduct)));
        }
        return of(product);
    }
}
ProductPageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductPageMetaResolver, deps: [{ token: i1.RoutingService }, { token: i2.ProductService }, { token: i3.TranslationService }, { token: i4.BasePageMetaResolver }, { token: i5.PageLinkService }], target: i0.ɵɵFactoryTarget.Injectable });
ProductPageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductPageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductPageMetaResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i2.ProductService }, { type: i3.TranslationService }, { type: i4.BasePageMetaResolver }, { type: i5.PageLinkService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1wYWdlLW1ldGEucmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9wcm9kdWN0L3NlcnZpY2VzL3Byb2R1Y3QtcGFnZS1tZXRhLnJlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBV3JFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUdqRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7Ozs7QUFJeEQ7Ozs7OztHQU1HO0FBSUgsTUFBTSxPQUFPLHVCQUNYLFNBQVEsZ0JBQWdCO0lBU3hCLFlBQ1ksY0FBOEIsRUFDOUIsY0FBOEIsRUFDOUIsV0FBK0IsRUFDL0Isb0JBQTBDLEVBQzFDLGVBQWdDO1FBRTFDLEtBQUssRUFBRSxDQUFDO1FBTkUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0IseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFNNUMsaUVBQWlFO1FBQ3ZELGFBQVEsR0FBd0IsSUFBSSxDQUFDLGNBQWM7YUFDMUQsY0FBYyxFQUFFO2FBQ2hCLElBQUksQ0FDSCxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENB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QUMzQyxJQUFJLENBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUN0QixTQUFTLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FDOUQsQ0FBQztTQUNMO1FBQ0QsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckIsQ0FBQzs7b0hBektVLHVCQUF1Qjt3SEFBdkIsdUJBQXVCLGNBRnRCLE1BQU07MkZBRVAsdUJBQXVCO2tCQUhuQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQnJlYWRjcnVtYk1ldGEsIFBhZ2VSb2JvdHNNZXRhIH0gZnJvbSAnLi4vLi4vY21zL21vZGVsL3BhZ2UubW9kZWwnO1xuaW1wb3J0IHsgQmFzZVBhZ2VNZXRhUmVzb2x2ZXIgfSBmcm9tICcuLi8uLi9jbXMvcGFnZS9iYXNlLXBhZ2UtbWV0YS5yZXNvbHZlcic7XG5pbXBvcnQgeyBQYWdlTWV0YVJlc29sdmVyIH0gZnJvbSAnLi4vLi4vY21zL3BhZ2UvcGFnZS1tZXRhLnJlc29sdmVyJztcbmltcG9ydCB7XG4gIFBhZ2VCcmVhZGNydW1iUmVzb2x2ZXIsXG4gIFBhZ2VEZXNjcmlwdGlvblJlc29sdmVyLFxuICBQYWdlSGVhZGluZ1Jlc29sdmVyLFxuICBQYWdlSW1hZ2VSZXNvbHZlcixcbiAgUGFnZVJvYm90c1Jlc29sdmVyLFxuICBQYWdlVGl0bGVSZXNvbHZlcixcbn0gZnJvbSAnLi4vLi4vY21zL3BhZ2UvcGFnZS5yZXNvbHZlcnMnO1xuaW1wb3J0IHsgUGFnZUxpbmtTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY21zL3BhZ2Uvcm91dGluZy9wYWdlLWxpbmsuc2VydmljZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9pMThuL3RyYW5zbGF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGFnZVR5cGUgfSBmcm9tICcuLi8uLi9tb2RlbC9jbXMubW9kZWwnO1xuaW1wb3J0IHsgQ2F0ZWdvcnksIFByb2R1Y3QgfSBmcm9tICcuLi8uLi9tb2RlbC9wcm9kdWN0Lm1vZGVsJztcbmltcG9ydCB7IFJvdXRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcm91dGluZy9mYWNhZGUvcm91dGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IGlzTm90VW5kZWZpbmVkIH0gZnJvbSAnLi4vLi4vdXRpbC90eXBlLWd1YXJkcyc7XG5pbXBvcnQgeyBQcm9kdWN0U2VydmljZSB9IGZyb20gJy4uL2ZhY2FkZS9wcm9kdWN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZHVjdFNjb3BlIH0gZnJvbSAnLi4vbW9kZWwvcHJvZHVjdC1zY29wZSc7XG5cbi8qKlxuICogUmVzb2x2ZXMgdGhlIHBhZ2UgZGF0YSBmb3IgdGhlIFByb2R1Y3QgRGV0YWlsIFBhZ2VcbiAqIGJhc2VkIG9uIHRoZSBgUGFnZVR5cGUuUFJPRFVDVF9QQUdFYC5cbiAqXG4gKiBUaGUgcGFnZSB0aXRsZSwgaGVhZGluZywgZGVzY3JpcHRpb24sIGJyZWFkY3J1bWJzIGFuZFxuICogZmlyc3QgR0FMTEVSWSBpbWFnZSBhcmUgcmVzb2x2ZWQgaWYgYXZhaWxhYmxlIGluIHRoZSBkYXRhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdFBhZ2VNZXRhUmVzb2x2ZXJcbiAgZXh0ZW5kcyBQYWdlTWV0YVJlc29sdmVyXG4gIGltcGxlbWVudHNcbiAgICBQYWdlSGVhZGluZ1Jlc29sdmVyLFxuICAgIFBhZ2VUaXRsZVJlc29sdmVyLFxuICAgIFBhZ2VEZXNjcmlwdGlvblJlc29sdmVyLFxuICAgIFBhZ2VCcmVhZGNydW1iUmVzb2x2ZXIsXG4gICAgUGFnZUltYWdlUmVzb2x2ZXIsXG4gICAgUGFnZVJvYm90c1Jlc29sdmVyXG57XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHByb2R1Y3RTZXJ2aWNlOiBQcm9kdWN0U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRpb246IFRyYW5zbGF0aW9uU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYmFzZVBhZ2VNZXRhUmVzb2x2ZXI6IEJhc2VQYWdlTWV0YVJlc29sdmVyLFxuICAgIHByb3RlY3RlZCBwYWdlTGlua1NlcnZpY2U6IFBhZ2VMaW5rU2VydmljZVxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucGFnZVR5cGUgPSBQYWdlVHlwZS5QUk9EVUNUX1BBR0U7XG4gIH1cblxuICAvLyByZXVzYWJsZSBvYnNlcnZhYmxlIGZvciBwcm9kdWN0IGRhdGEgYmFzZWQgb24gdGhlIGN1cnJlbnQgcGFnZVxuICBwcm90ZWN0ZWQgcHJvZHVjdCQ6IE9ic2VydmFibGU8UHJvZHVjdD4gPSB0aGlzLnJvdXRpbmdTZXJ2aWNlXG4gICAgLmdldFJvdXRlclN0YXRlKClcbiAgICAucGlwZShcbiAgICAgIG1hcCgoc3RhdGUpID0+IHN0YXRlLnN0YXRlLnBhcmFtc1sncHJvZHVjdENvZGUnXSksXG4gICAgICBmaWx0ZXIoKGNvZGUpID0+ICEhY29kZSksXG4gICAgICBzd2l0Y2hNYXAoKGNvZGUpID0+IHRoaXMucHJvZHVjdFNlcnZpY2UuZ2V0KGNvZGUsIFByb2R1Y3RTY29wZS5ERVRBSUxTKSksXG4gICAgICBmaWx0ZXIoaXNOb3RVbmRlZmluZWQpXG4gICAgKTtcblxuICAvKipcbiAgICogUmVzb2x2ZXMgdGhlIHBhZ2UgaGVhZGluZyBmb3IgdGhlIFByb2R1Y3QgRGV0YWlsIFBhZ2UuXG4gICAqIFRoZSBwYWdlIGhlYWRpbmcgaXMgdXNlZCBpbiB0aGUgVUkgKGA8aDE+YCksIHdoZXJlIGFzIHRoZSBwYWdlXG4gICAqIHRpdGxlIGlzIHVzZWQgYnkgdGhlIGJyb3dzZXIgYW5kIGNyYXdsZXJzLlxuICAgKi9cbiAgcmVzb2x2ZUhlYWRpbmcoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9kdWN0JC5waXBlKFxuICAgICAgc3dpdGNoTWFwKChwOiBQcm9kdWN0KSA9PlxuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uLnRyYW5zbGF0ZSgncGFnZU1ldGFSZXNvbHZlci5wcm9kdWN0LmhlYWRpbmcnLCB7XG4gICAgICAgICAgaGVhZGluZzogcC5uYW1lLFxuICAgICAgICB9KVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZXMgdGhlIHBhZ2UgdGl0bGUgZm9yIHRoZSBQcm9kdWN0IERldGFpbCBQYWdlLiBUaGUgcGFnZSB0aXRsZVxuICAgKiBpcyByZXNvbHZlZCB3aXRoIHRoZSBwcm9kdWN0IG5hbWUsIHRoZSBmaXJzdCBjYXRlZ29yeSBhbmQgdGhlIG1hbnVmYWN0dXJlci5cbiAgICogVGhlIHBhZ2UgdGl0bGUgdXNlZCBieSB0aGUgYnJvd3NlciAoaGlzdG9yeSwgdGFicykgYW5kIGNyYXdsZXJzLlxuICAgKi9cbiAgcmVzb2x2ZVRpdGxlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMucHJvZHVjdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgocHJvZHVjdCkgPT4ge1xuICAgICAgICBsZXQgdGl0bGUgPSBwcm9kdWN0Lm5hbWU7XG4gICAgICAgIHRpdGxlICs9IHRoaXMucmVzb2x2ZUZpcnN0Q2F0ZWdvcnkocHJvZHVjdCk7XG4gICAgICAgIHRpdGxlICs9IHRoaXMucmVzb2x2ZU1hbnVmYWN0dXJlcihwcm9kdWN0KTtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRpb24udHJhbnNsYXRlKCdwYWdlTWV0YVJlc29sdmVyLnByb2R1Y3QudGl0bGUnLCB7XG4gICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNvbHZlcyB0aGUgcGFnZSBkZXNjcmlwdGlvbiBmb3IgdGhlIFByb2R1Y3QgRGV0YWlsIFBhZ2UuIFRoZSBkZXNjcmlwdGlvblxuICAgKiBpcyBiYXNlZCBvbiB0aGUgYHByb2R1Y3Quc3VtbWFyeWAuXG4gICAqL1xuICByZXNvbHZlRGVzY3JpcHRpb24oKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9kdWN0JC5waXBlKFxuICAgICAgc3dpdGNoTWFwKChwcm9kdWN0KSA9PlxuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uLnRyYW5zbGF0ZSgncGFnZU1ldGFSZXNvbHZlci5wcm9kdWN0LmRlc2NyaXB0aW9uJywge1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiBwcm9kdWN0LnN1bW1hcnksXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNvbHZlcyBicmVhZGNydW1icyBmb3IgdGhlIFByb2R1Y3QgRGV0YWlsIFBhZ2UuIFRoZSBicmVhZGNydW1icyBhcmUgZHJpdmVuIGJ5XG4gICAqIGEgc3RhdGljIGhvbWUgcGFnZSBjcnVtYiBhbmQgYSBjcnVtYiBmb3IgZWFjaCBjYXRlZ29yeS5cbiAgICovXG4gIHJlc29sdmVCcmVhZGNydW1icygpOiBPYnNlcnZhYmxlPEJyZWFkY3J1bWJNZXRhW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLnByb2R1Y3QkLnBpcGUoKSxcbiAgICAgIHRoaXMudHJhbnNsYXRpb24udHJhbnNsYXRlKCdjb21tb24uaG9tZScpLFxuICAgIF0pLnBpcGUoXG4gICAgICBtYXAoKFtwcm9kdWN0LCBsYWJlbF0pID0+IHtcbiAgICAgICAgY29uc3QgYnJlYWRjcnVtYnMgPSBbXTtcbiAgICAgICAgYnJlYWRjcnVtYnMucHVzaCh7IGxhYmVsLCBsaW5rOiAnLycgfSk7XG4gICAgICAgIGZvciAoY29uc3QgeyBuYW1lLCBjb2RlLCB1cmwgfSBvZiBwcm9kdWN0LmNhdGVnb3JpZXMgfHwgW10pIHtcbiAgICAgICAgICBicmVhZGNydW1icy5wdXNoKHtcbiAgICAgICAgICAgIGxhYmVsOiBuYW1lIHx8IGNvZGUsXG4gICAgICAgICAgICBsaW5rOiB1cmwsXG4gICAgICAgICAgfSBhcyBCcmVhZGNydW1iTWV0YSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJyZWFkY3J1bWJzO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc29sdmVzIHRoZSBtYWluIHBhZ2UgaW1hZ2UgZm9yIHRoZSBQcm9kdWN0IERldGFpbCBQYWdlLiBUaGUgcHJvZHVjdCBpbWFnZVxuICAgKiBpcyBiYXNlZCBvbiB0aGUgUFJJTUFSWSBwcm9kdWN0IGltYWdlLiBUaGUgem9vbSBmb3JtYXQgaXMgdXNlZCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcmVzb2x2ZUltYWdlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMucHJvZHVjdCQucGlwZShcbiAgICAgIG1hcCgocHJvZHVjdCkgPT4gKDxhbnk+cHJvZHVjdC5pbWFnZXM/LlBSSU1BUlkpPy56b29tPy51cmwgPz8gbnVsbClcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlc29sdmVGaXJzdENhdGVnb3J5KHByb2R1Y3Q6IFByb2R1Y3QpOiBzdHJpbmcge1xuICAgIGNvbnN0IGZpcnN0Q2F0ZWdvcnk6IENhdGVnb3J5IHwgdW5kZWZpbmVkID0gcHJvZHVjdD8uY2F0ZWdvcmllcz8uWzBdO1xuXG4gICAgcmV0dXJuIGZpcnN0Q2F0ZWdvcnlcbiAgICAgID8gYCB8ICR7Zmlyc3RDYXRlZ29yeS5uYW1lIHx8IGZpcnN0Q2F0ZWdvcnkuY29kZX1gXG4gICAgICA6ICcnO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlc29sdmVNYW51ZmFjdHVyZXIocHJvZHVjdDogUHJvZHVjdCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHByb2R1Y3QubWFudWZhY3R1cmVyID8gYCB8ICR7cHJvZHVjdC5tYW51ZmFjdHVyZXJ9YCA6ICcnO1xuICB9XG5cbiAgcmVzb2x2ZVJvYm90cygpOiBPYnNlcnZhYmxlPFBhZ2VSb2JvdHNNZXRhW10+IHtcbiAgICByZXR1cm4gdGhpcy5iYXNlUGFnZU1ldGFSZXNvbHZlci5yZXNvbHZlUm9ib3RzKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZXMgdGhlIGNhbm9uaWNhbCB1cmwgZm9yIHRoZSBwcm9kdWN0IHBhZ2UgdXNpbmcgdGhlIGRlZmF1bHQgY2Fub25pY2FsIHVybFxuICAgKiBjb25maWd1cmF0aW9uLlxuICAgKlxuICAgKiBJbiBjYXNlIG9mIGEgdmFyaWFudCBwcm9kdWN0LCB0aGUgYmFzZVByb2R1Y3QgY29kZSBpcyB1c2VkIHRvIHJlc29sdmUgdGhlIHVybC4gSXQncyBpbXBvcnRhbnRcbiAgICogdG8ga25vdyB0aGF0IHRoaXMgaGFzIGEgZmV3IGxpbWl0YXRpb25zOlxuICAgKiAtIFdlJ3JlIG5vdCBhbHdheXMgYWJsZSB0byBnZXQgdGhlIHN1cGVyIGJhc2VQcm9kdWN0LCBpbiBjYXNlIG9mIG11bHRpLWxldmVsIHZhcmlhbnRzLlxuICAgKiAgIE9DQyBvbmx5IGV4cG9zZXMgdGhlIGRpcmVjdCBiYXNlUHJvZHVjdCwgd2hpY2ggbWlnaHQgc3RpbGwgbm90IHJlc29sdmUgaW4gdGhlIGNvcnJlY3RcbiAgICogICBjYW5vbmljYWwgVVJMLiBUaGlzIGlzIGJ1c2luZXNzIGRyaXZlbiBhbmQgc3ViamVjdCB0byBjaGFuZ2UgaW4gYSBjdXN0b21pemF0aW9uLlxuICAgKiAtIFRoZSB1cmwgcmVzb2x2ZWQgZm9yIHRoZSB2YXJpYW50IGRvZXNuJ3QgY29udGFpbiBhbnkgY29udGVudCBvdGhlciB0aGVuIHRoZSBwcm9kdWN0IGNvZGUuXG4gICAqICAgVGhpcyBtZWFucyB0aGF0IHdlIGRvIG5vdCBwcm92aWRlIGFueSBwcm9kdWN0IGRhdGEgdG8gcmVzb2x2ZSBwcmV0dHkgVVJMcyAoZm9yIGV4YW1wbGVcbiAgICogICB0aGUgcHJvZHVjdCB0aXRsZSkuXG4gICAqL1xuICByZXNvbHZlQ2Fub25pY2FsVXJsKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMucHJvZHVjdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgocHJvZHVjdCkgPT4gdGhpcy5maW5kQmFzZVByb2R1Y3QocHJvZHVjdCkpLFxuICAgICAgbWFwKChwcm9kdWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMucm91dGluZ1NlcnZpY2UuZ2V0RnVsbFVybCh7XG4gICAgICAgICAgY3hSb3V0ZTogJ3Byb2R1Y3QnLFxuICAgICAgICAgIHBhcmFtczogcHJvZHVjdCxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2VMaW5rU2VydmljZS5nZXRDYW5vbmljYWxVcmwoe30sIHVybCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZXMgdGhlIGJhc2UgcHJvZHVjdCB3aGVuZXZlciB0aGUgZ2l2ZW4gcHJvZHVjdCBpcyBhIHZhcmlhbnQgcHJvZHVjdC5cbiAgICpcbiAgICogU2luY2UgcHJvZHVjdCB2YXJpYW50cyBjYW4gYmUgbXVsdGktbGF5ZXJlZCwgd2UgcmVjdXJzaXZlbHkgdHJ5IHRvIGZpbmQgdGhlIGJhc2UgcHJvZHVjdFxuICAgKiB0aGlzIG1pZ2h0IGJlIHRvbyBvcGluaW9uYXRlZCBmb3IgeW91ciBidXNpbmVzcyB0aG91Z2guXG4gICAqL1xuICBwcm90ZWN0ZWQgZmluZEJhc2VQcm9kdWN0KHByb2R1Y3Q6IFByb2R1Y3QpOiBPYnNlcnZhYmxlPFByb2R1Y3Q+IHtcbiAgICBpZiAocHJvZHVjdD8uYmFzZVByb2R1Y3QpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RTZXJ2aWNlXG4gICAgICAgIC5nZXQocHJvZHVjdC5iYXNlUHJvZHVjdCwgUHJvZHVjdFNjb3BlLkxJU1QpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcihpc05vdFVuZGVmaW5lZCksXG4gICAgICAgICAgc3dpdGNoTWFwKChiYXNlUHJvZHVjdCkgPT4gdGhpcy5maW5kQmFzZVByb2R1Y3QoYmFzZVByb2R1Y3QpKVxuICAgICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gb2YocHJvZHVjdCk7XG4gIH1cbn1cbiJdfQ==