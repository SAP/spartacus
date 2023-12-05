import * as i1 from '@spartacus/core';
import * as i0 from '@angular/core';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class BulkPricingService {
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
        var _a;
        let bulkPrices = [];
        if (productPriceScope) {
            const basePrice = (_a = productPriceScope.price) === null || _a === void 0 ? void 0 : _a.value;
            const volumePrices = productPriceScope.volumePrices;
            bulkPrices = volumePrices === null || volumePrices === void 0 ? void 0 : volumePrices.map((volumePrice) => this.parsePrice(volumePrice, basePrice));
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { BulkPricingService };
//# sourceMappingURL=spartacus-product-bulk-pricing-core.mjs.map
