/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class BulkPricingService {
    constructor(productService) {
        this.productService = productService;
        this.PRODUCT_SCOPE = "bulkPrices" /* ProductScope.BULK_PRICES */;
    }
    getBulkPrices(productCode) {
        return this.productService.get(productCode, this.PRODUCT_SCOPE).pipe(switchMap((productPriceScope) => {
            return of(this.convert(productPriceScope));
        }));
    }
    convert(productPriceScope) {
        let bulkPrices = [];
        if (productPriceScope) {
            const basePrice = productPriceScope.price?.value;
            const volumePrices = productPriceScope.volumePrices;
            bulkPrices = volumePrices?.map((volumePrice) => this.parsePrice(volumePrice, basePrice));
        }
        return bulkPrices;
    }
    parsePrice(priceTier, basePrice) {
        const bulkPriceTemplate = {
            currencyIso: priceTier.currencyIso,
            formattedValue: priceTier.formattedValue,
            maxQuantity: priceTier.maxQuantity,
            minQuantity: priceTier.minQuantity,
            priceType: priceTier.priceType,
            value: priceTier.value,
            formattedDiscount: '',
            discount: 0,
        };
        return this.calculateDiscount(bulkPriceTemplate, basePrice);
    }
    calculateDiscount(bulkPriceTemplate, basePrice) {
        const bulkPrice = Object.assign({}, bulkPriceTemplate);
        const tierPrice = bulkPriceTemplate.value;
        if (tierPrice && basePrice) {
            const discount = Math.round(100.0 - (tierPrice / basePrice) * 100);
            const formatted = discount === 0 ? `${discount}%` : `-${discount}%`;
            bulkPrice.formattedDiscount = formatted;
            bulkPrice.discount = discount;
        }
        return bulkPrice;
    }
}
BulkPricingService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingService, deps: [{ token: i1.ProductService }], target: i0.ɵɵFactoryTarget.Injectable });
BulkPricingService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ProductService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVsay1wcmljaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC9idWxrLXByaWNpbmcvY29yZS9zZXJ2aWNlcy9idWxrLXByaWNpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBTTNDLE1BQU0sT0FBTyxrQkFBa0I7SUFHN0IsWUFBc0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBRmpDLGtCQUFhLCtDQUE0QjtJQUVMLENBQUM7SUFFeEQsYUFBYSxDQUFDLFdBQW1CO1FBQy9CLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQ2xFLFNBQVMsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLEVBQUU7WUFDOUIsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFUyxPQUFPLENBQ2YsaUJBQXNDO1FBRXRDLElBQUksVUFBVSxHQUE0QixFQUFFLENBQUM7UUFFN0MsSUFBSSxpQkFBaUIsRUFBRTtZQUNyQixNQUFNLFNBQVMsR0FBdUIsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztZQUNyRSxNQUFNLFlBQVksR0FBd0IsaUJBQWlCLENBQUMsWUFBWSxDQUFDO1lBRXpFLFVBQVUsR0FBRyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQ3hDLENBQUM7U0FDSDtRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFFUyxVQUFVLENBQ2xCLFNBQWdCLEVBQ2hCLFNBQTZCO1FBRTdCLE1BQU0saUJBQWlCLEdBQWM7WUFDbkMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxXQUFXO1lBQ2xDLGNBQWMsRUFBRSxTQUFTLENBQUMsY0FBYztZQUN4QyxXQUFXLEVBQUUsU0FBUyxDQUFDLFdBQVc7WUFDbEMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxXQUFXO1lBQ2xDLFNBQVMsRUFBRSxTQUFTLENBQUMsU0FBUztZQUM5QixLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUs7WUFDdEIsaUJBQWlCLEVBQUUsRUFBRTtZQUNyQixRQUFRLEVBQUUsQ0FBQztTQUNaLENBQUM7UUFFRixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRVMsaUJBQWlCLENBQ3pCLGlCQUE0QixFQUM1QixTQUE2QjtRQUU3QixNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBRXZELE1BQU0sU0FBUyxHQUF1QixpQkFBaUIsQ0FBQyxLQUFLLENBQUM7UUFFOUQsSUFBSSxTQUFTLElBQUksU0FBUyxFQUFFO1lBQzFCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sU0FBUyxHQUFHLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxHQUFHLENBQUM7WUFDcEUsU0FBUyxDQUFDLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztZQUN4QyxTQUFTLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUMvQjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7OytHQWhFVSxrQkFBa0I7bUhBQWxCLGtCQUFrQixjQUZqQixNQUFNOzJGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcmljZSwgUHJvZHVjdCwgUHJvZHVjdFNjb3BlLCBQcm9kdWN0U2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQnVsa1ByaWNlIH0gZnJvbSAnLi4vbW9kZWwvYnVsay1wcmljZS5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBCdWxrUHJpY2luZ1NlcnZpY2Uge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgUFJPRFVDVF9TQ09QRSA9IFByb2R1Y3RTY29wZS5CVUxLX1BSSUNFUztcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcHJvZHVjdFNlcnZpY2U6IFByb2R1Y3RTZXJ2aWNlKSB7fVxuXG4gIGdldEJ1bGtQcmljZXMocHJvZHVjdENvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8QnVsa1ByaWNlW10gfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9kdWN0U2VydmljZS5nZXQocHJvZHVjdENvZGUsIHRoaXMuUFJPRFVDVF9TQ09QRSkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgocHJvZHVjdFByaWNlU2NvcGUpID0+IHtcbiAgICAgICAgcmV0dXJuIG9mKHRoaXMuY29udmVydChwcm9kdWN0UHJpY2VTY29wZSkpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNvbnZlcnQoXG4gICAgcHJvZHVjdFByaWNlU2NvcGU6IFByb2R1Y3QgfCB1bmRlZmluZWRcbiAgKTogQnVsa1ByaWNlW10gfCB1bmRlZmluZWQge1xuICAgIGxldCBidWxrUHJpY2VzOiBCdWxrUHJpY2VbXSB8IHVuZGVmaW5lZCA9IFtdO1xuXG4gICAgaWYgKHByb2R1Y3RQcmljZVNjb3BlKSB7XG4gICAgICBjb25zdCBiYXNlUHJpY2U6IG51bWJlciB8IHVuZGVmaW5lZCA9IHByb2R1Y3RQcmljZVNjb3BlLnByaWNlPy52YWx1ZTtcbiAgICAgIGNvbnN0IHZvbHVtZVByaWNlczogUHJpY2VbXSB8IHVuZGVmaW5lZCA9IHByb2R1Y3RQcmljZVNjb3BlLnZvbHVtZVByaWNlcztcblxuICAgICAgYnVsa1ByaWNlcyA9IHZvbHVtZVByaWNlcz8ubWFwKCh2b2x1bWVQcmljZSkgPT5cbiAgICAgICAgdGhpcy5wYXJzZVByaWNlKHZvbHVtZVByaWNlLCBiYXNlUHJpY2UpXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBidWxrUHJpY2VzO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlUHJpY2UoXG4gICAgcHJpY2VUaWVyOiBQcmljZSxcbiAgICBiYXNlUHJpY2U6IG51bWJlciB8IHVuZGVmaW5lZFxuICApOiBCdWxrUHJpY2Uge1xuICAgIGNvbnN0IGJ1bGtQcmljZVRlbXBsYXRlOiBCdWxrUHJpY2UgPSB7XG4gICAgICBjdXJyZW5jeUlzbzogcHJpY2VUaWVyLmN1cnJlbmN5SXNvLFxuICAgICAgZm9ybWF0dGVkVmFsdWU6IHByaWNlVGllci5mb3JtYXR0ZWRWYWx1ZSxcbiAgICAgIG1heFF1YW50aXR5OiBwcmljZVRpZXIubWF4UXVhbnRpdHksXG4gICAgICBtaW5RdWFudGl0eTogcHJpY2VUaWVyLm1pblF1YW50aXR5LFxuICAgICAgcHJpY2VUeXBlOiBwcmljZVRpZXIucHJpY2VUeXBlLFxuICAgICAgdmFsdWU6IHByaWNlVGllci52YWx1ZSxcbiAgICAgIGZvcm1hdHRlZERpc2NvdW50OiAnJyxcbiAgICAgIGRpc2NvdW50OiAwLFxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy5jYWxjdWxhdGVEaXNjb3VudChidWxrUHJpY2VUZW1wbGF0ZSwgYmFzZVByaWNlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjYWxjdWxhdGVEaXNjb3VudChcbiAgICBidWxrUHJpY2VUZW1wbGF0ZTogQnVsa1ByaWNlLFxuICAgIGJhc2VQcmljZTogbnVtYmVyIHwgdW5kZWZpbmVkXG4gICk6IEJ1bGtQcmljZSB7XG4gICAgY29uc3QgYnVsa1ByaWNlID0gT2JqZWN0LmFzc2lnbih7fSwgYnVsa1ByaWNlVGVtcGxhdGUpO1xuXG4gICAgY29uc3QgdGllclByaWNlOiBudW1iZXIgfCB1bmRlZmluZWQgPSBidWxrUHJpY2VUZW1wbGF0ZS52YWx1ZTtcblxuICAgIGlmICh0aWVyUHJpY2UgJiYgYmFzZVByaWNlKSB7XG4gICAgICBjb25zdCBkaXNjb3VudCA9IE1hdGgucm91bmQoMTAwLjAgLSAodGllclByaWNlIC8gYmFzZVByaWNlKSAqIDEwMCk7XG4gICAgICBjb25zdCBmb3JtYXR0ZWQgPSBkaXNjb3VudCA9PT0gMCA/IGAke2Rpc2NvdW50fSVgIDogYC0ke2Rpc2NvdW50fSVgO1xuICAgICAgYnVsa1ByaWNlLmZvcm1hdHRlZERpc2NvdW50ID0gZm9ybWF0dGVkO1xuICAgICAgYnVsa1ByaWNlLmRpc2NvdW50ID0gZGlzY291bnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1bGtQcmljZTtcbiAgfVxufVxuIl19