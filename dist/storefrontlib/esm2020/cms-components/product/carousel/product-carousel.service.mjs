/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { isNotUndefined, } from '@spartacus/core';
import { filter, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class ProductCarouselService {
    constructor(productService, semanticPathService) {
        this.productService = productService;
        this.semanticPathService = semanticPathService;
    }
    /**
     * Loads the product data and converts it `CarouselItem`.
     */
    loadProduct(code) {
        return this.productService.get(code).pipe(filter(isNotUndefined), map((product) => this.convertProduct(product)));
    }
    /**
     * Converts the product to a generic CarouselItem
     */
    convertProduct(source, displayTitle = true, displayProductPrices = true) {
        const item = {};
        if (displayTitle) {
            item.title = source.name;
        }
        if (displayProductPrices && source.price && source.price.formattedValue) {
            item.price = source.price.formattedValue;
        }
        if (source.images && source.images.PRIMARY) {
            item.media = {
                container: source.images.PRIMARY,
                format: 'product',
            };
        }
        item.route = this.semanticPathService.transform({
            cxRoute: 'product',
            params: source,
        });
        return item;
    }
}
ProductCarouselService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductCarouselService, deps: [{ token: i1.ProductService }, { token: i1.SemanticPathService }], target: i0.ɵɵFactoryTarget.Injectable });
ProductCarouselService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductCarouselService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductCarouselService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ProductService }, { type: i1.SemanticPathService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1jYXJvdXNlbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtY29tcG9uZW50cy9wcm9kdWN0L2Nhcm91c2VsL3Byb2R1Y3QtY2Fyb3VzZWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQ0wsY0FBYyxHQUlmLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBTTdDLE1BQU0sT0FBTyxzQkFBc0I7SUFDakMsWUFDWSxjQUE4QixFQUM5QixtQkFBd0M7UUFEeEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7SUFDakQsQ0FBQztJQUVKOztPQUVHO0lBQ0gsV0FBVyxDQUFDLElBQVk7UUFDdEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ3ZDLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFDdEIsR0FBRyxDQUFDLENBQUMsT0FBZ0IsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUN4RCxDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0ssY0FBYyxDQUNwQixNQUFlLEVBQ2YsWUFBWSxHQUFHLElBQUksRUFDbkIsb0JBQW9CLEdBQUcsSUFBSTtRQUUzQixNQUFNLElBQUksR0FBd0IsRUFBRSxDQUFDO1FBQ3JDLElBQUksWUFBWSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztTQUMxQjtRQUNELElBQUksb0JBQW9CLElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRTtZQUN2RSxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUc7Z0JBQ1gsU0FBUyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTztnQkFDaEMsTUFBTSxFQUFFLFNBQVM7YUFDbEIsQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDO1lBQzlDLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLE1BQU0sRUFBRSxNQUFNO1NBQ2YsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzttSEExQ1Usc0JBQXNCO3VIQUF0QixzQkFBc0IsY0FGckIsTUFBTTsyRkFFUCxzQkFBc0I7a0JBSGxDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgaXNOb3RVbmRlZmluZWQsXG4gIFByb2R1Y3QsXG4gIFByb2R1Y3RTZXJ2aWNlLFxuICBTZW1hbnRpY1BhdGhTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBQcm9kdWN0Q2Fyb3VzZWxJdGVtIH0gZnJvbSAnLi9wcm9kdWN0LWNhcm91c2VsLm1vZGVsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RDYXJvdXNlbFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdFNlcnZpY2U6IFByb2R1Y3RTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBzZW1hbnRpY1BhdGhTZXJ2aWNlOiBTZW1hbnRpY1BhdGhTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogTG9hZHMgdGhlIHByb2R1Y3QgZGF0YSBhbmQgY29udmVydHMgaXQgYENhcm91c2VsSXRlbWAuXG4gICAqL1xuICBsb2FkUHJvZHVjdChjb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2R1Y3RDYXJvdXNlbEl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9kdWN0U2VydmljZS5nZXQoY29kZSkucGlwZShcbiAgICAgIGZpbHRlcihpc05vdFVuZGVmaW5lZCksXG4gICAgICBtYXAoKHByb2R1Y3Q6IFByb2R1Y3QpID0+IHRoaXMuY29udmVydFByb2R1Y3QocHJvZHVjdCkpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyB0aGUgcHJvZHVjdCB0byBhIGdlbmVyaWMgQ2Fyb3VzZWxJdGVtXG4gICAqL1xuICBwcml2YXRlIGNvbnZlcnRQcm9kdWN0KFxuICAgIHNvdXJjZTogUHJvZHVjdCxcbiAgICBkaXNwbGF5VGl0bGUgPSB0cnVlLFxuICAgIGRpc3BsYXlQcm9kdWN0UHJpY2VzID0gdHJ1ZVxuICApOiBQcm9kdWN0Q2Fyb3VzZWxJdGVtIHtcbiAgICBjb25zdCBpdGVtOiBQcm9kdWN0Q2Fyb3VzZWxJdGVtID0ge307XG4gICAgaWYgKGRpc3BsYXlUaXRsZSkge1xuICAgICAgaXRlbS50aXRsZSA9IHNvdXJjZS5uYW1lO1xuICAgIH1cbiAgICBpZiAoZGlzcGxheVByb2R1Y3RQcmljZXMgJiYgc291cmNlLnByaWNlICYmIHNvdXJjZS5wcmljZS5mb3JtYXR0ZWRWYWx1ZSkge1xuICAgICAgaXRlbS5wcmljZSA9IHNvdXJjZS5wcmljZS5mb3JtYXR0ZWRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKHNvdXJjZS5pbWFnZXMgJiYgc291cmNlLmltYWdlcy5QUklNQVJZKSB7XG4gICAgICBpdGVtLm1lZGlhID0ge1xuICAgICAgICBjb250YWluZXI6IHNvdXJjZS5pbWFnZXMuUFJJTUFSWSxcbiAgICAgICAgZm9ybWF0OiAncHJvZHVjdCcsXG4gICAgICB9O1xuICAgIH1cbiAgICBpdGVtLnJvdXRlID0gdGhpcy5zZW1hbnRpY1BhdGhTZXJ2aWNlLnRyYW5zZm9ybSh7XG4gICAgICBjeFJvdXRlOiAncHJvZHVjdCcsXG4gICAgICBwYXJhbXM6IHNvdXJjZSxcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlbTtcbiAgfVxufVxuIl19