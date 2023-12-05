import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, Input, NgModule, Injectable } from '@angular/core';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2$1 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i1 from '@spartacus/core';
import { VariantQualifier, UrlModule, I18nModule, isNotUndefined, VariantType, isNotNullable, provideDefaultConfig } from '@spartacus/core';
import { filter, take, distinctUntilChanged, tap, switchMap, map } from 'rxjs/operators';
import * as i1$1 from '@spartacus/storefront';
import { of } from 'rxjs';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ProductVariantColorSelectorComponent {
    constructor(routingService) {
        this.routingService = routingService;
    }
    changeColor(code, name) {
        if (code) {
            this.routingService.go({
                cxRoute: 'product',
                params: { code, name },
            });
        }
        return null;
    }
    getVariantOptionValue(qualifiers) {
        const obj = qualifiers.find((q) => q.qualifier === VariantQualifier.COLOR);
        return obj ? obj.value : '';
    }
}
ProductVariantColorSelectorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantColorSelectorComponent, deps: [{ token: i1.RoutingService }], target: i0.ɵɵFactoryTarget.Component });
ProductVariantColorSelectorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ProductVariantColorSelectorComponent, selector: "cx-product-variant-color-selector", inputs: { product: "product", variants: "variants" }, ngImport: i0, template: "<ng-container>\n  <div class=\"variant-selector\">\n    <div class=\"variant-name\">{{ 'productVariants.color' | cxTranslate }}:</div>\n\n    <select\n      (change)=\"changeColor($event.target.value, product?.name)\"\n      class=\"form-control variant-select\"\n    >\n      <option\n        *ngFor=\"let v of variants?.options\"\n        value=\"{{ v.code }}\"\n        [selected]=\"v.code === product?.code\"\n      >\n        {{ getVariantOptionValue(v.variantOptionQualifiers) }}\n      </option>\n    </select>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantColorSelectorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-product-variant-color-selector', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container>\n  <div class=\"variant-selector\">\n    <div class=\"variant-name\">{{ 'productVariants.color' | cxTranslate }}:</div>\n\n    <select\n      (change)=\"changeColor($event.target.value, product?.name)\"\n      class=\"form-control variant-select\"\n    >\n      <option\n        *ngFor=\"let v of variants?.options\"\n        value=\"{{ v.code }}\"\n        [selected]=\"v.code === product?.code\"\n      >\n        {{ getVariantOptionValue(v.variantOptionQualifiers) }}\n      </option>\n    </select>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }]; }, propDecorators: { product: [{
                type: Input
            }], variants: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ProductVariantColorSelectorModule {
}
ProductVariantColorSelectorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantColorSelectorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProductVariantColorSelectorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantColorSelectorModule, declarations: [ProductVariantColorSelectorComponent], imports: [CommonModule, RouterModule, UrlModule, I18nModule], exports: [ProductVariantColorSelectorComponent] });
ProductVariantColorSelectorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantColorSelectorModule, imports: [CommonModule, RouterModule, UrlModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantColorSelectorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, UrlModule, I18nModule],
                    declarations: [ProductVariantColorSelectorComponent],
                    exports: [ProductVariantColorSelectorComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ProductVariantSizeSelectorComponent {
    constructor(productService, routingService) {
        this.productService = productService;
        this.routingService = routingService;
    }
    changeSize(code) {
        if (code) {
            this.productService
                .get(code, "list" /* ProductScope.LIST */)
                .pipe(
            // below call might looks redundant but in fact this data is going to be loaded anyways
            // we're just calling it earlier and storing
            filter(isNotUndefined), take(1))
                .subscribe((product) => {
                this.routingService.go({
                    cxRoute: 'product',
                    params: product,
                });
            });
        }
        return null;
    }
    getVariantOptionValue(qualifiers) {
        const obj = qualifiers.find((q) => q.qualifier === VariantQualifier.SIZE);
        return obj ? obj.value : '';
    }
}
ProductVariantSizeSelectorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantSizeSelectorComponent, deps: [{ token: i1.ProductService }, { token: i1.RoutingService }], target: i0.ɵɵFactoryTarget.Component });
ProductVariantSizeSelectorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ProductVariantSizeSelectorComponent, selector: "cx-product-variant-size-selector", inputs: { product: "product", variants: "variants" }, ngImport: i0, template: "<ng-container>\n  <div class=\"variant-selector\">\n    <div class=\"variant-name\">{{ 'productVariants.size' | cxTranslate }}:</div>\n    <select\n      (change)=\"changeSize($event.target.value)\"\n      class=\"form-control variant-select\"\n    >\n      <option\n        *ngFor=\"let v of variants?.options\"\n        value=\"{{ v.code }}\"\n        [selected]=\"v.code === product?.code\"\n      >\n        {{ getVariantOptionValue(v.variantOptionQualifiers) }}\n      </option>\n    </select>\n    <a\n      href=\"#\"\n      class=\"size-guide\"\n      title=\"{{ 'productVariants.sizeGuideLabel' | cxTranslate }}\"\n    >\n      {{ 'productVariants.sizeGuideLabel' | cxTranslate }}\n    </a>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantSizeSelectorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-product-variant-size-selector', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container>\n  <div class=\"variant-selector\">\n    <div class=\"variant-name\">{{ 'productVariants.size' | cxTranslate }}:</div>\n    <select\n      (change)=\"changeSize($event.target.value)\"\n      class=\"form-control variant-select\"\n    >\n      <option\n        *ngFor=\"let v of variants?.options\"\n        value=\"{{ v.code }}\"\n        [selected]=\"v.code === product?.code\"\n      >\n        {{ getVariantOptionValue(v.variantOptionQualifiers) }}\n      </option>\n    </select>\n    <a\n      href=\"#\"\n      class=\"size-guide\"\n      title=\"{{ 'productVariants.sizeGuideLabel' | cxTranslate }}\"\n    >\n      {{ 'productVariants.sizeGuideLabel' | cxTranslate }}\n    </a>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ProductService }, { type: i1.RoutingService }]; }, propDecorators: { product: [{
                type: Input
            }], variants: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ProductVariantSizeSelectorModule {
}
ProductVariantSizeSelectorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantSizeSelectorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProductVariantSizeSelectorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantSizeSelectorModule, declarations: [ProductVariantSizeSelectorComponent], imports: [CommonModule, RouterModule, UrlModule, I18nModule], exports: [ProductVariantSizeSelectorComponent] });
ProductVariantSizeSelectorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantSizeSelectorModule, imports: [CommonModule, RouterModule, UrlModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantSizeSelectorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, UrlModule, I18nModule],
                    declarations: [ProductVariantSizeSelectorComponent],
                    exports: [ProductVariantSizeSelectorComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ProductVariantStyleSelectorComponent {
    constructor(config, productService, routingService) {
        this.config = config;
        this.productService = productService;
        this.routingService = routingService;
        this.variantQualifier = VariantQualifier;
    }
    getVariantOptionValue(qualifiers) {
        const obj = qualifiers.find((q) => q.qualifier === VariantQualifier.STYLE);
        return obj ? obj.value : '';
    }
    getVariantThumbnailUrl(variantOptionQualifiers) {
        var _a, _b, _c, _d;
        const qualifier = variantOptionQualifiers.find((item) => item.image);
        return qualifier
            ? `${(_c = (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.backend) === null || _b === void 0 ? void 0 : _b.occ) === null || _c === void 0 ? void 0 : _c.baseUrl}${(_d = qualifier.image) === null || _d === void 0 ? void 0 : _d.url}`
            : '';
    }
    changeStyle(code) {
        if (code) {
            this.productService
                .get(code, "list" /* ProductScope.LIST */)
                .pipe(
            // below call might looks redundant but in fact this data is going to be loaded anyways
            // we're just calling it earlier and storing
            filter(isNotUndefined), take(1))
                .subscribe((product) => {
                this.routingService.go({
                    cxRoute: 'product',
                    params: product,
                });
            });
        }
        return null;
    }
}
ProductVariantStyleSelectorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantStyleSelectorComponent, deps: [{ token: i1.OccConfig }, { token: i1.ProductService }, { token: i1.RoutingService }], target: i0.ɵɵFactoryTarget.Component });
ProductVariantStyleSelectorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ProductVariantStyleSelectorComponent, selector: "cx-product-variant-style-selector", inputs: { variants: "variants" }, ngImport: i0, template: "<ng-container>\n  <div class=\"variant-selector\">\n    <div *ngIf=\"variants.selected\" class=\"variant-name\">\n      {{ 'productVariants.style' | cxTranslate }}:\n      <span class=\"style-name\">{{\n        getVariantOptionValue(variants?.selected.variantOptionQualifiers)\n      }}</span>\n    </div>\n    <ul class=\"variant-list\">\n      <li\n        *ngFor=\"let v of variants?.options\"\n        [ngClass]=\"{ 'selected-variant': v.code === variants?.selected?.code }\"\n      >\n        <button class=\"variant-button\" (click)=\"changeStyle(v.code)\">\n          <img\n            src=\"{{ getVariantThumbnailUrl(v.variantOptionQualifiers) }}\"\n            title=\"{{ getVariantOptionValue(v.variantOptionQualifiers) }}\"\n            alt=\"{{ getVariantOptionValue(v.variantOptionQualifiers) }}\"\n          />\n        </button>\n      </li>\n    </ul>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantStyleSelectorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-product-variant-style-selector', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container>\n  <div class=\"variant-selector\">\n    <div *ngIf=\"variants.selected\" class=\"variant-name\">\n      {{ 'productVariants.style' | cxTranslate }}:\n      <span class=\"style-name\">{{\n        getVariantOptionValue(variants?.selected.variantOptionQualifiers)\n      }}</span>\n    </div>\n    <ul class=\"variant-list\">\n      <li\n        *ngFor=\"let v of variants?.options\"\n        [ngClass]=\"{ 'selected-variant': v.code === variants?.selected?.code }\"\n      >\n        <button class=\"variant-button\" (click)=\"changeStyle(v.code)\">\n          <img\n            src=\"{{ getVariantThumbnailUrl(v.variantOptionQualifiers) }}\"\n            title=\"{{ getVariantOptionValue(v.variantOptionQualifiers) }}\"\n            alt=\"{{ getVariantOptionValue(v.variantOptionQualifiers) }}\"\n          />\n        </button>\n      </li>\n    </ul>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.OccConfig }, { type: i1.ProductService }, { type: i1.RoutingService }]; }, propDecorators: { variants: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ProductVariantStyleSelectorModule {
}
ProductVariantStyleSelectorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantStyleSelectorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProductVariantStyleSelectorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantStyleSelectorModule, declarations: [ProductVariantStyleSelectorComponent], imports: [CommonModule, RouterModule, UrlModule, I18nModule], exports: [ProductVariantStyleSelectorComponent] });
ProductVariantStyleSelectorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantStyleSelectorModule, imports: [CommonModule, RouterModule, UrlModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantStyleSelectorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, UrlModule, I18nModule],
                    declarations: [ProductVariantStyleSelectorComponent],
                    exports: [ProductVariantStyleSelectorComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ProductVariantsContainerComponent {
    constructor(currentProductService) {
        this.currentProductService = currentProductService;
        this.variants = {};
        this.variantType = VariantType;
    }
    ngOnInit() {
        this.product$ = this.currentProductService.getProduct().pipe(filter(isNotNullable), filter((product) => !!product.baseOptions), distinctUntilChanged(), tap((product) => {
            product.baseOptions.forEach((option) => {
                if (option === null || option === void 0 ? void 0 : option.variantType) {
                    this.variants[option.variantType] = option;
                }
            });
        }));
    }
}
ProductVariantsContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsContainerComponent, deps: [{ token: i1$1.CurrentProductService }], target: i0.ɵɵFactoryTarget.Component });
ProductVariantsContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ProductVariantsContainerComponent, selector: "cx-product-variants-container", ngImport: i0, template: "<ng-container *ngIf=\"product$ | async as product\">\n  <div class=\"variant-section\" *ngIf=\"product.baseOptions?.length\">\n    <cx-product-variant-style-selector\n      *ngIf=\"variants[variantType.STYLE]\"\n      [variants]=\"variants[variantType.STYLE]\"\n    ></cx-product-variant-style-selector>\n    <cx-product-variant-size-selector\n      *ngIf=\"variants[variantType.SIZE]\"\n      [product]=\"product\"\n      [variants]=\"variants[variantType.SIZE]\"\n    ></cx-product-variant-size-selector>\n    <cx-product-variant-color-selector\n      *ngIf=\"variants[variantType.COLOR]\"\n      [product]=\"product\"\n      [variants]=\"variants[variantType.COLOR]\"\n    ></cx-product-variant-color-selector>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ProductVariantStyleSelectorComponent, selector: "cx-product-variant-style-selector", inputs: ["variants"] }, { kind: "component", type: ProductVariantSizeSelectorComponent, selector: "cx-product-variant-size-selector", inputs: ["product", "variants"] }, { kind: "component", type: ProductVariantColorSelectorComponent, selector: "cx-product-variant-color-selector", inputs: ["product", "variants"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-product-variants-container', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"product$ | async as product\">\n  <div class=\"variant-section\" *ngIf=\"product.baseOptions?.length\">\n    <cx-product-variant-style-selector\n      *ngIf=\"variants[variantType.STYLE]\"\n      [variants]=\"variants[variantType.STYLE]\"\n    ></cx-product-variant-style-selector>\n    <cx-product-variant-size-selector\n      *ngIf=\"variants[variantType.SIZE]\"\n      [product]=\"product\"\n      [variants]=\"variants[variantType.SIZE]\"\n    ></cx-product-variant-size-selector>\n    <cx-product-variant-color-selector\n      *ngIf=\"variants[variantType.COLOR]\"\n      [product]=\"product\"\n      [variants]=\"variants[variantType.COLOR]\"\n    ></cx-product-variant-color-selector>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.CurrentProductService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ProductVariantsContainerModule {
}
ProductVariantsContainerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsContainerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProductVariantsContainerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsContainerModule, declarations: [ProductVariantsContainerComponent], imports: [CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ProductVariantStyleSelectorModule,
        ProductVariantSizeSelectorModule,
        ProductVariantColorSelectorModule] });
ProductVariantsContainerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsContainerModule, imports: [CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ProductVariantStyleSelectorModule,
        ProductVariantSizeSelectorModule,
        ProductVariantColorSelectorModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsContainerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        ProductVariantStyleSelectorModule,
                        ProductVariantSizeSelectorModule,
                        ProductVariantColorSelectorModule,
                    ],
                    declarations: [ProductVariantsContainerComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Guard that will redirect to purchasable variant of product, if the navigation
 * is for the non-purchasable one
 */
class ProductVariantsGuard {
    constructor(productService, semanticPathService, router) {
        this.productService = productService;
        this.semanticPathService = semanticPathService;
        this.router = router;
    }
    canActivate(activatedRoute) {
        var _a;
        const productCode = (_a = activatedRoute.params) === null || _a === void 0 ? void 0 : _a.productCode;
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
        var _a, _b, _c;
        if ((_a = product.variantOptions) === null || _a === void 0 ? void 0 : _a.length) {
            const results = product.variantOptions.filter((variant) => {
                return variant.stock && variant.stock.stockLevel ? variant : false;
            });
            return results && results.length
                ? (_b = results[0]) === null || _b === void 0 ? void 0 : _b.code
                : (_c = product.variantOptions[0]) === null || _c === void 0 ? void 0 : _c.code;
        }
        return undefined;
    }
}
ProductVariantsGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsGuard, deps: [{ token: i1.ProductService }, { token: i1.SemanticPathService }, { token: i2$1.Router }], target: i0.ɵɵFactoryTarget.Injectable });
ProductVariantsGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ProductService }, { type: i1.SemanticPathService }, { type: i2$1.Router }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ProductVariantsComponentsModule {
}
ProductVariantsComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProductVariantsComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsComponentsModule, imports: [ProductVariantsContainerModule,
        ProductVariantColorSelectorModule,
        ProductVariantSizeSelectorModule,
        ProductVariantStyleSelectorModule] });
ProductVariantsComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsComponentsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ProductVariantSelectorComponent: {
                    component: ProductVariantsContainerComponent,
                    guards: [ProductVariantsGuard],
                },
            },
        }),
    ], imports: [ProductVariantsContainerModule,
        ProductVariantColorSelectorModule,
        ProductVariantSizeSelectorModule,
        ProductVariantStyleSelectorModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ProductVariantsContainerModule,
                        ProductVariantColorSelectorModule,
                        ProductVariantSizeSelectorModule,
                        ProductVariantStyleSelectorModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ProductVariantSelectorComponent: {
                                    component: ProductVariantsContainerComponent,
                                    guards: [ProductVariantsGuard],
                                },
                            },
                        }),
                    ],
                }]
        }] });

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

export { ProductVariantColorSelectorComponent, ProductVariantColorSelectorModule, ProductVariantSizeSelectorComponent, ProductVariantSizeSelectorModule, ProductVariantStyleSelectorComponent, ProductVariantStyleSelectorModule, ProductVariantsComponentsModule, ProductVariantsContainerComponent, ProductVariantsContainerModule, ProductVariantsGuard };
//# sourceMappingURL=spartacus-product-variants-components.mjs.map
