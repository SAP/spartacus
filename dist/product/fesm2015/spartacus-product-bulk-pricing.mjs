import * as i0 from '@angular/core';
import { Component, NgModule } from '@angular/core';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1 from '@spartacus/core';
import { I18nModule, ConfigModule, provideDefaultConfig } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { switchMap } from 'rxjs/operators';
import * as i2 from '@spartacus/product/bulk-pricing/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class BulkPricingTableComponent {
    constructor(routingService, bulkPricingService) {
        this.routingService = routingService;
        this.bulkPricingService = bulkPricingService;
        this.PRODUCT_KEY = 'productCode';
    }
    ngOnInit() {
        this.priceTiers$ = this.getPrices();
    }
    formatQuantity(tier) {
        let formattedQuantityRange = '';
        if (!tier.maxQuantity) {
            formattedQuantityRange = tier.minQuantity + '+';
        }
        else {
            formattedQuantityRange = tier.minQuantity + ' - ' + tier.maxQuantity;
        }
        return formattedQuantityRange;
    }
    getPrices() {
        return this.routingService.getRouterState().pipe(switchMap((state) => {
            const productCode = state.state.params[this.PRODUCT_KEY];
            return this.bulkPricingService.getBulkPrices(productCode);
        }));
    }
}
BulkPricingTableComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingTableComponent, deps: [{ token: i1.RoutingService }, { token: i2.BulkPricingService }], target: i0.ɵɵFactoryTarget.Component });
BulkPricingTableComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: BulkPricingTableComponent, selector: "cx-bulk-pricing-table", ngImport: i0, template: "<ng-container *ngIf=\"priceTiers$ | async as priceTiers\">\n  <div class=\"cx-bulk-pricing-table-container\" *ngIf=\"priceTiers.length > 0\">\n    <table class=\"table\">\n      <thead class=\"thead-light\">\n        <tr>\n          <th scope=\"col\">{{ 'bulkPricingTable.quantity' | cxTranslate }}</th>\n          <th scope=\"col\">{{ 'bulkPricingTable.price' | cxTranslate }}</th>\n          <th scope=\"col\">{{ 'bulkPricingTable.discount' | cxTranslate }}</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let tier of priceTiers\">\n          <td>{{ formatQuantity(tier) }}</td>\n          <td>{{ tier.formattedValue }}</td>\n          <td>{{ tier.formattedDiscount }}</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-bulk-pricing-table', template: "<ng-container *ngIf=\"priceTiers$ | async as priceTiers\">\n  <div class=\"cx-bulk-pricing-table-container\" *ngIf=\"priceTiers.length > 0\">\n    <table class=\"table\">\n      <thead class=\"thead-light\">\n        <tr>\n          <th scope=\"col\">{{ 'bulkPricingTable.quantity' | cxTranslate }}</th>\n          <th scope=\"col\">{{ 'bulkPricingTable.price' | cxTranslate }}</th>\n          <th scope=\"col\">{{ 'bulkPricingTable.discount' | cxTranslate }}</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let tier of priceTiers\">\n          <td>{{ formatQuantity(tier) }}</td>\n          <td>{{ tier.formattedValue }}</td>\n          <td>{{ tier.formattedDiscount }}</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i2.BulkPricingService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class BulkPricingTableModule {
}
BulkPricingTableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BulkPricingTableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingTableModule, declarations: [BulkPricingTableComponent], imports: [CommonModule,
        I18nModule,
        SpinnerModule, i1.ConfigModule], exports: [BulkPricingTableComponent] });
BulkPricingTableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingTableModule, imports: [CommonModule,
        I18nModule,
        SpinnerModule,
        ConfigModule.withConfig({
            cmsComponents: {
                BulkPricingTableComponent: {
                    component: BulkPricingTableComponent,
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingTableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        SpinnerModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                BulkPricingTableComponent: {
                                    component: BulkPricingTableComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [BulkPricingTableComponent],
                    exports: [BulkPricingTableComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultOccBulkPricingConfig = {
    backend: {
        occ: {
            endpoints: {
                product: {
                    bulkPrices: 'orgProducts/${productCode}?fields=price(DEFAULT),volumePrices(FULL)',
                },
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class BulkPricingOccModule {
}
BulkPricingOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BulkPricingOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingOccModule, imports: [CommonModule] });
BulkPricingOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingOccModule, providers: [provideDefaultConfig(defaultOccBulkPricingConfig)], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [provideDefaultConfig(defaultOccBulkPricingConfig)],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class BulkPricingModule {
}
BulkPricingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BulkPricingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingModule, imports: [BulkPricingOccModule, BulkPricingTableModule] });
BulkPricingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingModule, imports: [BulkPricingOccModule, BulkPricingTableModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BulkPricingOccModule, BulkPricingTableModule],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { BulkPricingModule };
//# sourceMappingURL=spartacus-product-bulk-pricing.mjs.map
