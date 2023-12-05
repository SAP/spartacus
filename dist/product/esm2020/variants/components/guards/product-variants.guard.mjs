/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { isNotUndefined, } from '@spartacus/core';
import { of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@angular/router";
/**
 * Guard that will redirect to purchasable variant of product, if the navigation
 * is for the non-purchasable one
 */
export class ProductVariantsGuard {
    constructor(productService, semanticPathService, router) {
        this.productService = productService;
        this.semanticPathService = semanticPathService;
        this.router = router;
    }
    canActivate(activatedRoute) {
        const productCode = activatedRoute.params?.productCode;
        if (!productCode) {
            return of(true);
        }
        return this.productService.get(productCode, "variants" /* ProductScope.VARIANTS */).pipe(filter(isNotUndefined), switchMap((product) => {
            if (!product.purchasable) {
                const purchasableCode = this.findPurchasableProductCode(product);
                if (purchasableCode) {
                    return this.productService
                        .get(purchasableCode, "list" /* ProductScope.LIST */)
                        .pipe(filter(isNotUndefined), take(1), map((_product) => {
                        return this.router.createUrlTree(this.semanticPathService.transform({
                            cxRoute: 'product',
                            params: _product,
                        }));
                    }));
                }
            }
            return of(true);
        }));
    }
    /**
     * Finds a purchasable product code looking at variant options, if any
     *
     * @param product
     */
    findPurchasableProductCode(product) {
        if (product.variantOptions?.length) {
            const results = product.variantOptions.filter((variant) => {
                return variant.stock && variant.stock.stockLevel ? variant : false;
            });
            return results && results.length
                ? results[0]?.code
                : product.variantOptions[0]?.code;
        }
        return undefined;
    }
}
ProductVariantsGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsGuard, deps: [{ token: i1.ProductService }, { token: i1.SemanticPathService }, { token: i2.Router }], target: i0.ɵɵFactoryTarget.Injectable });
ProductVariantsGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ProductService }, { type: i1.SemanticPathService }, { type: i2.Router }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC12YXJpYW50cy5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0L3ZhcmlhbnRzL2NvbXBvbmVudHMvZ3VhcmRzL3Byb2R1Y3QtdmFyaWFudHMuZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPM0MsT0FBTyxFQUNMLGNBQWMsR0FNZixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBQzlEOzs7R0FHRztBQUlILE1BQU0sT0FBTyxvQkFBb0I7SUFDL0IsWUFDWSxjQUE4QixFQUM5QixtQkFBd0MsRUFDeEMsTUFBYztRQUZkLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDdkIsQ0FBQztJQUNKLFdBQVcsQ0FDVCxjQUFzQztRQUV0QyxNQUFNLFdBQVcsR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQztRQUN2RCxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2hCLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLHlDQUF3QixDQUFDLElBQUksQ0FDckUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUN0QixTQUFTLENBQUMsQ0FBQyxPQUFnQixFQUFFLEVBQUU7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUU7Z0JBQ3hCLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDakUsSUFBSSxlQUFlLEVBQUU7b0JBQ25CLE9BQU8sSUFBSSxDQUFDLGNBQWM7eUJBQ3ZCLEdBQUcsQ0FBQyxlQUFlLGlDQUFvQjt5QkFDdkMsSUFBSSxDQUNILE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFDdEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLEdBQUcsQ0FBQyxDQUFDLFFBQWlCLEVBQUUsRUFBRTt3QkFDeEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FDOUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQzs0QkFDakMsT0FBTyxFQUFFLFNBQVM7NEJBQ2xCLE1BQU0sRUFBRSxRQUFRO3lCQUNqQixDQUFDLENBQ0gsQ0FBQztvQkFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO2lCQUNMO2FBQ0Y7WUFDRCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUNEOzs7O09BSUc7SUFDTywwQkFBMEIsQ0FBQyxPQUFnQjtRQUNuRCxJQUFJLE9BQU8sQ0FBQyxjQUFjLEVBQUUsTUFBTSxFQUFFO1lBQ2xDLE1BQU0sT0FBTyxHQUFvQixPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FDNUQsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDVixPQUFPLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3JFLENBQUMsQ0FDRixDQUFDO1lBQ0YsT0FBTyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU07Z0JBQzlCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSTtnQkFDbEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDO1NBQ3JDO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQzs7aUhBeERVLG9CQUFvQjtxSEFBcEIsb0JBQW9CLGNBRm5CLE1BQU07MkZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gIENhbkFjdGl2YXRlLFxuICBSb3V0ZXIsXG4gIFVybFRyZWUsXG59IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBpc05vdFVuZGVmaW5lZCxcbiAgUHJvZHVjdCxcbiAgUHJvZHVjdFNjb3BlLFxuICBQcm9kdWN0U2VydmljZSxcbiAgU2VtYW50aWNQYXRoU2VydmljZSxcbiAgVmFyaWFudE9wdGlvbixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuLyoqXG4gKiBHdWFyZCB0aGF0IHdpbGwgcmVkaXJlY3QgdG8gcHVyY2hhc2FibGUgdmFyaWFudCBvZiBwcm9kdWN0LCBpZiB0aGUgbmF2aWdhdGlvblxuICogaXMgZm9yIHRoZSBub24tcHVyY2hhc2FibGUgb25lXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0VmFyaWFudHNHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHByb2R1Y3RTZXJ2aWNlOiBQcm9kdWN0U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgc2VtYW50aWNQYXRoU2VydmljZTogU2VtYW50aWNQYXRoU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcm91dGVyOiBSb3V0ZXJcbiAgKSB7fVxuICBjYW5BY3RpdmF0ZShcbiAgICBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdFxuICApOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBVcmxUcmVlPiB7XG4gICAgY29uc3QgcHJvZHVjdENvZGUgPSBhY3RpdmF0ZWRSb3V0ZS5wYXJhbXM/LnByb2R1Y3RDb2RlO1xuICAgIGlmICghcHJvZHVjdENvZGUpIHtcbiAgICAgIHJldHVybiBvZih0cnVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJvZHVjdFNlcnZpY2UuZ2V0KHByb2R1Y3RDb2RlLCBQcm9kdWN0U2NvcGUuVkFSSUFOVFMpLnBpcGUoXG4gICAgICBmaWx0ZXIoaXNOb3RVbmRlZmluZWQpLFxuICAgICAgc3dpdGNoTWFwKChwcm9kdWN0OiBQcm9kdWN0KSA9PiB7XG4gICAgICAgIGlmICghcHJvZHVjdC5wdXJjaGFzYWJsZSkge1xuICAgICAgICAgIGNvbnN0IHB1cmNoYXNhYmxlQ29kZSA9IHRoaXMuZmluZFB1cmNoYXNhYmxlUHJvZHVjdENvZGUocHJvZHVjdCk7XG4gICAgICAgICAgaWYgKHB1cmNoYXNhYmxlQ29kZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdFNlcnZpY2VcbiAgICAgICAgICAgICAgLmdldChwdXJjaGFzYWJsZUNvZGUsIFByb2R1Y3RTY29wZS5MSVNUKVxuICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIoaXNOb3RVbmRlZmluZWQpLFxuICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgbWFwKChfcHJvZHVjdDogUHJvZHVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucm91dGVyLmNyZWF0ZVVybFRyZWUoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VtYW50aWNQYXRoU2VydmljZS50cmFuc2Zvcm0oe1xuICAgICAgICAgICAgICAgICAgICAgIGN4Um91dGU6ICdwcm9kdWN0JyxcbiAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IF9wcm9kdWN0LFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2YodHJ1ZSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgLyoqXG4gICAqIEZpbmRzIGEgcHVyY2hhc2FibGUgcHJvZHVjdCBjb2RlIGxvb2tpbmcgYXQgdmFyaWFudCBvcHRpb25zLCBpZiBhbnlcbiAgICpcbiAgICogQHBhcmFtIHByb2R1Y3RcbiAgICovXG4gIHByb3RlY3RlZCBmaW5kUHVyY2hhc2FibGVQcm9kdWN0Q29kZShwcm9kdWN0OiBQcm9kdWN0KTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAocHJvZHVjdC52YXJpYW50T3B0aW9ucz8ubGVuZ3RoKSB7XG4gICAgICBjb25zdCByZXN1bHRzOiBWYXJpYW50T3B0aW9uW10gPSBwcm9kdWN0LnZhcmlhbnRPcHRpb25zLmZpbHRlcihcbiAgICAgICAgKHZhcmlhbnQpID0+IHtcbiAgICAgICAgICByZXR1cm4gdmFyaWFudC5zdG9jayAmJiB2YXJpYW50LnN0b2NrLnN0b2NrTGV2ZWwgPyB2YXJpYW50IDogZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICByZXR1cm4gcmVzdWx0cyAmJiByZXN1bHRzLmxlbmd0aFxuICAgICAgICA/IHJlc3VsdHNbMF0/LmNvZGVcbiAgICAgICAgOiBwcm9kdWN0LnZhcmlhbnRPcHRpb25zWzBdPy5jb2RlO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iXX0=