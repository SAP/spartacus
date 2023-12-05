import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, Optional, Input, NgModule } from '@angular/core';
import * as i1 from '@spartacus/core';
import { VariantQualifier, UrlModule, I18nModule, provideDefaultConfigFactory } from '@spartacus/core';
import * as i2 from '@spartacus/storefront';
import { ProductListOutlets, provideOutlet, OutletPosition } from '@spartacus/storefront';
import { Subscription, EMPTY } from 'rxjs';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const PRODUCT_VARIANTS_FEATURE = 'productVariants';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ProductVariantStyleIconsComponent {
    constructor(config, productListItemContext) {
        var _a, _b;
        this.config = config;
        this.productListItemContext = productListItemContext;
        this.subscriptions = new Subscription();
        this.ProductListOutlets = ProductListOutlets;
        this.product$ = (_b = (_a = this.productListItemContext) === null || _a === void 0 ? void 0 : _a.product$) !== null && _b !== void 0 ? _b : EMPTY;
        this.variantNames = {};
    }
    ngOnInit() {
        this.setVariantsNames();
        this.subscriptions.add(this.product$.subscribe((product) => {
            if (product.variantOptions && product.variantOptions.length) {
                this.variants = product.variantOptions;
                this.setVariantsNames();
            }
        }));
    }
    setVariantsNames() {
        var _a;
        (_a = this.variants) === null || _a === void 0 ? void 0 : _a.forEach((variant) => {
            if (variant.code && variant.variantOptionQualifiers) {
                this.variantNames[variant.code] =
                    this.getVariantName(variant.variantOptionQualifiers) || '';
            }
        });
    }
    getVariantThumbnailUrl(variantOptionQualifiers) {
        var _a, _b, _c, _d;
        const thumbnail = variantOptionQualifiers.find((item) => item.qualifier === VariantQualifier.THUMBNAIL);
        return thumbnail
            ? `${(_c = (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.backend) === null || _b === void 0 ? void 0 : _b.occ) === null || _c === void 0 ? void 0 : _c.baseUrl}${(_d = thumbnail.image) === null || _d === void 0 ? void 0 : _d.url}`
            : '';
    }
    getVariantName(variantOptionQualifiers) {
        const rollupProperty = variantOptionQualifiers.find((item) => item.qualifier === VariantQualifier.ROLLUP_PROPERTY);
        const property = rollupProperty
            ? variantOptionQualifiers.find((item) => item.qualifier === rollupProperty.value)
            : null;
        return property ? property.value : '';
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
ProductVariantStyleIconsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantStyleIconsComponent, deps: [{ token: i1.OccConfig }, { token: i2.ProductListItemContext, optional: true }], target: i0.ɵɵFactoryTarget.Component });
ProductVariantStyleIconsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ProductVariantStyleIconsComponent, selector: "cx-variant-style-icons", inputs: { variants: "variants" }, ngImport: i0, template: "<ul class=\"variant-list\" *ngIf=\"variants && variants.length\">\n  <li *ngFor=\"let v of variants\">\n    <img\n      [attr.src]=\"getVariantThumbnailUrl(v.variantOptionQualifiers)\"\n      [attr.title]=\"variantNames[v.code]\"\n      [attr.alt]=\"variantNames[v.code]\"\n    />\n  </li>\n</ul>\n", styles: ["ul{padding:0;white-space:nowrap;overflow:hidden}ul li{display:inline}ul li img{width:50px}\n"], dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantStyleIconsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-variant-style-icons', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ul class=\"variant-list\" *ngIf=\"variants && variants.length\">\n  <li *ngFor=\"let v of variants\">\n    <img\n      [attr.src]=\"getVariantThumbnailUrl(v.variantOptionQualifiers)\"\n      [attr.title]=\"variantNames[v.code]\"\n      [attr.alt]=\"variantNames[v.code]\"\n    />\n  </li>\n</ul>\n", styles: ["ul{padding:0;white-space:nowrap;overflow:hidden}ul li{display:inline}ul li img{width:50px}\n"] }]
        }], ctorParameters: function () {
        return [{ type: i1.OccConfig }, { type: i2.ProductListItemContext, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { variants: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ProductVariantStyleIconsModule {
}
ProductVariantStyleIconsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantStyleIconsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProductVariantStyleIconsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantStyleIconsModule, declarations: [ProductVariantStyleIconsComponent], imports: [CommonModule, RouterModule, UrlModule, I18nModule], exports: [ProductVariantStyleIconsComponent] });
ProductVariantStyleIconsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantStyleIconsModule, imports: [CommonModule, RouterModule, UrlModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantStyleIconsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, UrlModule, I18nModule],
                    declarations: [ProductVariantStyleIconsComponent],
                    exports: [ProductVariantStyleIconsComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// TODO: Inline this factory when we start releasing Ivy compiled libraries
function defaultProductVariantsComponentsConfig() {
    const config = {
        featureModules: {
            [PRODUCT_VARIANTS_FEATURE]: {
                cmsComponents: ['ProductVariantSelectorComponent'],
            },
        },
    };
    return config;
}
class ProductVariantsRootModule {
}
ProductVariantsRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProductVariantsRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsRootModule, imports: [ProductVariantStyleIconsModule] });
ProductVariantsRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsRootModule, providers: [
        provideDefaultConfigFactory(defaultProductVariantsComponentsConfig),
        provideOutlet({
            id: ProductListOutlets.ITEM_DETAILS,
            position: OutletPosition.AFTER,
            component: ProductVariantStyleIconsComponent,
        }),
    ], imports: [ProductVariantStyleIconsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ProductVariantStyleIconsModule],
                    providers: [
                        provideDefaultConfigFactory(defaultProductVariantsComponentsConfig),
                        provideOutlet({
                            id: ProductListOutlets.ITEM_DETAILS,
                            position: OutletPosition.AFTER,
                            component: ProductVariantStyleIconsComponent,
                        }),
                    ],
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

export { PRODUCT_VARIANTS_FEATURE, ProductVariantStyleIconsComponent, ProductVariantStyleIconsModule, ProductVariantsRootModule, defaultProductVariantsComponentsConfig };
//# sourceMappingURL=spartacus-product-variants-root.mjs.map
