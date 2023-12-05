/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input, } from '@angular/core';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@angular/common";
import * as i3 from "@spartacus/storefront";
import * as i4 from "../price/configurator-price.component";
export class ConfiguratorOverviewBundleAttributeComponent {
    constructor(productService, translation) {
        this.productService = productService;
        this.translation = translation;
    }
    ngOnInit() {
        const noCommerceProduct = { images: {} };
        if (this.attributeOverview.productCode) {
            this.product$ = this.productService
                .get(this.attributeOverview.productCode, "list" /* ProductScope.LIST */)
                .pipe(map((respProduct) => {
                return respProduct ? respProduct : noCommerceProduct;
            }));
        }
        else {
            this.product$ = of(noCommerceProduct);
        }
    }
    /**
     * Returns primary image from product object
     *
     * @param {Product} product
     * @returns {(ImageGroup | ImageGroup[] | undefined)} - primary image. View can handle an undefined image
     */
    getProductPrimaryImage(product) {
        return product?.images?.PRIMARY;
    }
    /**
     * Extract corresponding price formula parameters
     *
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractPriceFormulaParameters() {
        return {
            quantity: this.attributeOverview.quantity,
            price: this.attributeOverview.valuePrice,
            priceTotal: this.attributeOverview.valuePriceTotal,
            isLightedUp: true,
        };
    }
    /**
     * Verifies whether the quantity should be displayed.
     *
     * @return {boolean} - 'true' if the quantity should be displayed, otherwise 'false'
     */
    displayQuantity() {
        const quantity = this.attributeOverview.quantity;
        return quantity !== undefined && quantity > 0;
    }
    /**
     * Verifies whether the item price should be displayed.
     *
     * @return {boolean} - 'true' if the item price price should be displayed, otherwise 'false'
     */
    displayPrice() {
        return (this.attributeOverview.valuePrice?.value !== undefined &&
            this.attributeOverview.valuePrice?.value > 0);
    }
    getAriaLabel() {
        let translatedText = '';
        if (this.displayQuantity()) {
            if (this.attributeOverview.valuePrice?.value !== undefined &&
                this.attributeOverview.valuePrice?.value !== 0) {
                this.translation
                    .translate('configurator.a11y.itemOfAttributeFullWithPriceAndQuantity', {
                    item: this.attributeOverview.value,
                    attribute: this.attributeOverview.attribute,
                    price: this.attributeOverview.valuePriceTotal?.formattedValue,
                    quantity: this.attributeOverview.quantity,
                })
                    .pipe(take(1))
                    .subscribe((text) => (translatedText = text));
            }
            else {
                this.translation
                    .translate('configurator.a11y.itemOfAttributeFullWithQuantity', {
                    item: this.attributeOverview.value,
                    attribute: this.attributeOverview.attribute,
                    quantity: this.attributeOverview.quantity,
                })
                    .pipe(take(1))
                    .subscribe((text) => (translatedText = text));
            }
        }
        else {
            if (this.attributeOverview.valuePrice?.value !== undefined &&
                this.attributeOverview.valuePrice?.value !== 0) {
                this.translation
                    .translate('configurator.a11y.itemOfAttributeFullWithPrice', {
                    item: this.attributeOverview.value,
                    attribute: this.attributeOverview.attribute,
                    price: this.attributeOverview.valuePriceTotal?.formattedValue,
                })
                    .pipe(take(1))
                    .subscribe((text) => (translatedText = text));
            }
            else {
                this.translation
                    .translate('configurator.a11y.itemOfAttributeFull', {
                    item: this.attributeOverview.value,
                    attribute: this.attributeOverview.attribute,
                })
                    .pipe(take(1))
                    .subscribe((text) => (translatedText = text));
            }
        }
        return translatedText;
    }
}
ConfiguratorOverviewBundleAttributeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewBundleAttributeComponent, deps: [{ token: i1.ProductService }, { token: i1.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorOverviewBundleAttributeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorOverviewBundleAttributeComponent, selector: "cx-configurator-cpq-overview-attribute", inputs: { attributeOverview: "attributeOverview" }, ngImport: i0, template: "<ng-container *ngIf=\"product$ | async as product\">\n  <div class=\"cx-value-container\">\n    <div class=\"cx-thumbnail\">\n      <cx-media\n        [container]=\"getProductPrimaryImage(product)\"\n        format=\"product\"\n        aria-hidden=\"true\"\n      ></cx-media>\n    </div>\n    <span class=\"cx-visually-hidden\">\n      {{ getAriaLabel() }}\n    </span>\n    <div class=\"cx-value-info\" aria-hidden=\"true\">\n      <div>\n        {{ attributeOverview.value }}\n      </div>\n      <span class=\"cx-code\" *ngIf=\"attributeOverview?.productCode\">\n        {{ 'configurator.attribute.id' | cxTranslate }}:\n        {{ attributeOverview.productCode }}</span\n      >\n      <div *ngIf=\"displayQuantity()\" class=\"cx-quantity\">\n        <span class=\"cx-identifier\">{{\n          'configurator.attribute.quantity' | cxTranslate\n        }}</span>\n        <span class=\"cx-item\">{{\n          attributeOverview.quantity | cxNumeric\n        }}</span>\n      </div>\n      <div *ngIf=\"displayPrice()\" class=\"cx-price\">\n        <span class=\"cx-identifier\">{{\n          'configurator.overviewForm.itemPrice' | cxTranslate\n        }}</span>\n        <span class=\"cx-item\">{{\n          attributeOverview.valuePrice?.formattedValue\n        }}</span>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"cx-attribute-price-container\" aria-hidden=\"true\">\n    <span class=\"cx-attribute-label\">{{ attributeOverview.attribute }}</span>\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "component", type: i4.ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i1.CxNumericPipe, name: "cxNumeric" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewBundleAttributeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-cpq-overview-attribute', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"product$ | async as product\">\n  <div class=\"cx-value-container\">\n    <div class=\"cx-thumbnail\">\n      <cx-media\n        [container]=\"getProductPrimaryImage(product)\"\n        format=\"product\"\n        aria-hidden=\"true\"\n      ></cx-media>\n    </div>\n    <span class=\"cx-visually-hidden\">\n      {{ getAriaLabel() }}\n    </span>\n    <div class=\"cx-value-info\" aria-hidden=\"true\">\n      <div>\n        {{ attributeOverview.value }}\n      </div>\n      <span class=\"cx-code\" *ngIf=\"attributeOverview?.productCode\">\n        {{ 'configurator.attribute.id' | cxTranslate }}:\n        {{ attributeOverview.productCode }}</span\n      >\n      <div *ngIf=\"displayQuantity()\" class=\"cx-quantity\">\n        <span class=\"cx-identifier\">{{\n          'configurator.attribute.quantity' | cxTranslate\n        }}</span>\n        <span class=\"cx-item\">{{\n          attributeOverview.quantity | cxNumeric\n        }}</span>\n      </div>\n      <div *ngIf=\"displayPrice()\" class=\"cx-price\">\n        <span class=\"cx-identifier\">{{\n          'configurator.overviewForm.itemPrice' | cxTranslate\n        }}</span>\n        <span class=\"cx-item\">{{\n          attributeOverview.valuePrice?.formattedValue\n        }}</span>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"cx-attribute-price-container\" aria-hidden=\"true\">\n    <span class=\"cx-attribute-label\">{{ attributeOverview.attribute }}</span>\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ProductService }, { type: i1.TranslationService }]; }, propDecorators: { attributeOverview: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLW92ZXJ2aWV3LWJ1bmRsZS1hdHRyaWJ1dGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL292ZXJ2aWV3LWJ1bmRsZS1hdHRyaWJ1dGUvY29uZmlndXJhdG9yLW92ZXJ2aWV3LWJ1bmRsZS1hdHRyaWJ1dGUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL292ZXJ2aWV3LWJ1bmRsZS1hdHRyaWJ1dGUvY29uZmlndXJhdG9yLW92ZXJ2aWV3LWJ1bmRsZS1hdHRyaWJ1dGUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssR0FFTixNQUFNLGVBQWUsQ0FBQztBQVF2QixPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQVMzQyxNQUFNLE9BQU8sNENBQTRDO0lBS3ZELFlBQ1ksY0FBOEIsRUFDOUIsV0FBK0I7UUFEL0IsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtJQUN4QyxDQUFDO0lBRUosUUFBUTtRQUNOLE1BQU0saUJBQWlCLEdBQVksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDbEQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWM7aUJBQ2hDLEdBQUcsQ0FBQyxJQUFJLENBQUMs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LGlCQUFpQixDQUFDLFVBQVUsRUFBRSxLQUFLLEtBQUssQ0FBQyxFQUM5QztnQkFDQSxJQUFJLENBQUMsV0FBVztxQkFDYixTQUFTLENBQUMsZ0RBQWdELEVBQUU7b0JBQzNELElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSztvQkFDbEMsU0FBUyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTO29CQUMzQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsRUFBRSxjQUFjO2lCQUM5RCxDQUFDO3FCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ2IsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ2pEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxXQUFXO3FCQUNiLFNBQVMsQ0FBQyx1Q0FBdUMsRUFBRTtvQkFDbEQsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLO29CQUNsQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVM7aUJBQzVDLENBQUM7cUJBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDYixTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDakQ7U0FDRjtRQUNELE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7O3lJQTlIVSw0Q0FBNEM7NkhBQTVDLDRDQUE0QyxrSUM3QnpELHdrREE4Q0E7MkZEakJhLDRDQUE0QztrQkFMeEQsU0FBUzsrQkFDRSx3Q0FBd0MsbUJBRWpDLHVCQUF1QixDQUFDLE1BQU07c0lBS3RDLGlCQUFpQjtzQkFBekIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgSW1hZ2VHcm91cCxcbiAgUHJvZHVjdCxcbiAgUHJvZHVjdFNjb3BlLFxuICBQcm9kdWN0U2VydmljZSxcbiAgVHJhbnNsYXRpb25TZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWwvY29uZmlndXJhdG9yLm1vZGVsJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclByaWNlQ29tcG9uZW50T3B0aW9ucyB9IGZyb20gJy4uL3ByaWNlL2NvbmZpZ3VyYXRvci1wcmljZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1jb25maWd1cmF0b3ItY3BxLW92ZXJ2aWV3LWF0dHJpYnV0ZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb25maWd1cmF0b3Itb3ZlcnZpZXctYnVuZGxlLWF0dHJpYnV0ZS5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JPdmVydmlld0J1bmRsZUF0dHJpYnV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHByb2R1Y3QkOiBPYnNlcnZhYmxlPFByb2R1Y3Q+O1xuXG4gIEBJbnB1dCgpIGF0dHJpYnV0ZU92ZXJ2aWV3OiBDb25maWd1cmF0b3IuQXR0cmlidXRlT3ZlcnZpZXc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHByb2R1Y3RTZXJ2aWNlOiBQcm9kdWN0U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRpb246IFRyYW5zbGF0aW9uU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc3Qgbm9Db21tZXJjZVByb2R1Y3Q6IFByb2R1Y3QgPSB7IGltYWdlczoge30gfTtcbiAgICBpZiAodGhpcy5hdHRyaWJ1dGVPdmVydmlldy5wcm9kdWN0Q29kZSkge1xuICAgICAgdGhpcy5wcm9kdWN0JCA9IHRoaXMucHJvZHVjdFNlcnZpY2VcbiAgICAgICAgLmdldCh0aGlzLmF0dHJpYnV0ZU92ZXJ2aWV3LnByb2R1Y3RDb2RlLCBQcm9kdWN0U2NvcGUuTElTVClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgbWFwKChyZXNwUHJvZHVjdCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BQcm9kdWN0ID8gcmVzcFByb2R1Y3QgOiBub0NvbW1lcmNlUHJvZHVjdDtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb2R1Y3QkID0gb2Yobm9Db21tZXJjZVByb2R1Y3QpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHByaW1hcnkgaW1hZ2UgZnJvbSBwcm9kdWN0IG9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0ge1Byb2R1Y3R9IHByb2R1Y3RcbiAgICogQHJldHVybnMgeyhJbWFnZUdyb3VwIHwgSW1hZ2VHcm91cFtdIHwgdW5kZWZpbmVkKX0gLSBwcmltYXJ5IGltYWdlLiBWaWV3IGNhbiBoYW5kbGUgYW4gdW5kZWZpbmVkIGltYWdlXG4gICAqL1xuICBnZXRQcm9kdWN0UHJpbWFyeUltYWdlKFxuICAgIHByb2R1Y3Q6IFByb2R1Y3RcbiAgKTogSW1hZ2VHcm91cCB8IEltYWdlR3JvdXBbXSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHByb2R1Y3Q/LmltYWdlcz8uUFJJTUFSWTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRyYWN0IGNvcnJlc3BvbmRpbmcgcHJpY2UgZm9ybXVsYSBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEByZXR1cm4ge0NvbmZpZ3VyYXRvclByaWNlQ29tcG9uZW50T3B0aW9uc30gLSBOZXcgcHJpY2UgZm9ybXVsYVxuICAgKi9cbiAgZXh0cmFjdFByaWNlRm9ybXVsYVBhcmFtZXRlcnMoKTogQ29uZmlndXJhdG9yUHJpY2VDb21wb25lbnRPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgcXVhbnRpdHk6IHRoaXMuYXR0cmlidXRlT3ZlcnZpZXcucXVhbnRpdHksXG4gICAgICBwcmljZTogdGhpcy5hdHRyaWJ1dGVPdmVydmlldy52YWx1ZVByaWNlLFxuICAgICAgcHJpY2VUb3RhbDogdGhpcy5hdHRyaWJ1dGVPdmVydmlldy52YWx1ZVByaWNlVG90YWwsXG4gICAgICBpc0xpZ2h0ZWRVcDogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIHdoZXRoZXIgdGhlIHF1YW50aXR5IHNob3VsZCBiZSBkaXNwbGF5ZWQuXG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gJ3RydWUnIGlmIHRoZSBxdWFudGl0eSBzaG91bGQgYmUgZGlzcGxheWVkLCBvdGhlcndpc2UgJ2ZhbHNlJ1xuICAgKi9cbiAgZGlzcGxheVF1YW50aXR5KCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHF1YW50aXR5ID0gdGhpcy5hdHRyaWJ1dGVPdmVydmlldy5xdWFudGl0eTtcbiAgICByZXR1cm4gcXVhbnRpdHkgIT09IHVuZGVmaW5lZCAmJiBxdWFudGl0eSA+IDA7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciB0aGUgaXRlbSBwcmljZSBzaG91bGQgYmUgZGlzcGxheWVkLlxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSAtICd0cnVlJyBpZiB0aGUgaXRlbSBwcmljZSBwcmljZSBzaG91bGQgYmUgZGlzcGxheWVkLCBvdGhlcndpc2UgJ2ZhbHNlJ1xuICAgKi9cbiAgZGlzcGxheVByaWNlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmF0dHJpYnV0ZU92ZXJ2aWV3LnZhbHVlUHJpY2U/LnZhbHVlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIHRoaXMuYXR0cmlidXRlT3ZlcnZpZXcudmFsdWVQcmljZT8udmFsdWUgPiAwXG4gICAgKTtcbiAgfVxuXG4gIGdldEFyaWFMYWJlbCgpOiBzdHJpbmcge1xuICAgIGxldCB0cmFuc2xhdGVkVGV4dCA9ICcnO1xuICAgIGlmICh0aGlzLmRpc3BsYXlRdWFudGl0eSgpKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuYXR0cmlidXRlT3ZlcnZpZXcudmFsdWVQcmljZT8udmFsdWUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICB0aGlzLmF0dHJpYnV0ZU92ZXJ2aWV3LnZhbHVlUHJpY2U/LnZhbHVlICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvblxuICAgICAgICAgIC50cmFuc2xhdGUoXG4gICAgICAgICAgICAnY29uZmlndXJhdG9yLmExMXkuaXRlbU9mQXR0cmlidXRlRnVsbFdpdGhQcmljZUFuZFF1YW50aXR5JyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaXRlbTogdGhpcy5hdHRyaWJ1dGVPdmVydmlldy52YWx1ZSxcbiAgICAgICAgICAgICAgYXR0cmlidXRlOiB0aGlzLmF0dHJpYnV0ZU92ZXJ2aWV3LmF0dHJpYnV0ZSxcbiAgICAgICAgICAgICAgcHJpY2U6IHRoaXMuYXR0cmlidXRlT3ZlcnZpZXcudmFsdWVQcmljZVRvdGFsPy5mb3JtYXR0ZWRWYWx1ZSxcbiAgICAgICAgICAgICAgcXVhbnRpdHk6IHRoaXMuYXR0cmlidXRlT3ZlcnZpZXcucXVhbnRpdHksXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKVxuICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgLnN1YnNjcmliZSgodGV4dCkgPT4gKHRyYW5zbGF0ZWRUZXh0ID0gdGV4dCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvblxuICAgICAgICAgIC50cmFuc2xhdGUoJ2NvbmZpZ3VyYXRvci5hMTF5Lml0ZW1PZkF0dHJpYnV0ZUZ1bGxXaXRoUXVhbnRpdHknLCB7XG4gICAgICAgICAgICBpdGVtOiB0aGlzLmF0dHJpYnV0ZU92ZXJ2aWV3LnZhbHVlLFxuICAgICAgICAgICAgYXR0cmlidXRlOiB0aGlzLmF0dHJpYnV0ZU92ZXJ2aWV3LmF0dHJpYnV0ZSxcbiAgICAgICAgICAgIHF1YW50aXR5OiB0aGlzLmF0dHJpYnV0ZU92ZXJ2aWV3LnF1YW50aXR5LFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCh0ZXh0KSA9PiAodHJhbnNsYXRlZFRleHQgPSB0ZXh0KSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVPdmVydmlldy52YWx1ZVByaWNlPy52YWx1ZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIHRoaXMuYXR0cmlidXRlT3ZlcnZpZXcudmFsdWVQcmljZT8udmFsdWUgIT09IDBcbiAgICAgICkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uXG4gICAgICAgICAgLnRyYW5zbGF0ZSgnY29uZmlndXJhdG9yLmExMXkuaXRlbU9mQXR0cmlidXRlRnVsbFdpdGhQcmljZScsIHtcbiAgICAgICAgICAgIGl0ZW06IHRoaXMuYXR0cmlidXRlT3ZlcnZpZXcudmFsdWUsXG4gICAgICAgICAgICBhdHRyaWJ1dGU6IHRoaXMuYXR0cmlidXRlT3ZlcnZpZXcuYXR0cmlidXRlLFxuICAgICAgICAgICAgcHJpY2U6IHRoaXMuYXR0cmlidXRlT3ZlcnZpZXcudmFsdWVQcmljZVRvdGFsPy5mb3JtYXR0ZWRWYWx1ZSxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgLnN1YnNjcmliZSgodGV4dCkgPT4gKHRyYW5zbGF0ZWRUZXh0ID0gdGV4dCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvblxuICAgICAgICAgIC50cmFuc2xhdGUoJ2NvbmZpZ3VyYXRvci5hMTF5Lml0ZW1PZkF0dHJpYnV0ZUZ1bGwnLCB7XG4gICAgICAgICAgICBpdGVtOiB0aGlzLmF0dHJpYnV0ZU92ZXJ2aWV3LnZhbHVlLFxuICAgICAgICAgICAgYXR0cmlidXRlOiB0aGlzLmF0dHJpYnV0ZU92ZXJ2aWV3LmF0dHJpYnV0ZSxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgLnN1YnNjcmliZSgodGV4dCkgPT4gKHRyYW5zbGF0ZWRUZXh0ID0gdGV4dCkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJhbnNsYXRlZFRleHQ7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJwcm9kdWN0JCB8IGFzeW5jIGFzIHByb2R1Y3RcIj5cbiAgPGRpdiBjbGFzcz1cImN4LXZhbHVlLWNvbnRhaW5lclwiPlxuICAgIDxkaXYgY2xhc3M9XCJjeC10aHVtYm5haWxcIj5cbiAgICAgIDxjeC1tZWRpYVxuICAgICAgICBbY29udGFpbmVyXT1cImdldFByb2R1Y3RQcmltYXJ5SW1hZ2UocHJvZHVjdClcIlxuICAgICAgICBmb3JtYXQ9XCJwcm9kdWN0XCJcbiAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgID48L2N4LW1lZGlhPlxuICAgIDwvZGl2PlxuICAgIDxzcGFuIGNsYXNzPVwiY3gtdmlzdWFsbHktaGlkZGVuXCI+XG4gICAgICB7eyBnZXRBcmlhTGFiZWwoKSB9fVxuICAgIDwvc3Bhbj5cbiAgICA8ZGl2IGNsYXNzPVwiY3gtdmFsdWUtaW5mb1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgPGRpdj5cbiAgICAgICAge3sgYXR0cmlidXRlT3ZlcnZpZXcudmFsdWUgfX1cbiAgICAgIDwvZGl2PlxuICAgICAgPHNwYW4gY2xhc3M9XCJjeC1jb2RlXCIgKm5nSWY9XCJhdHRyaWJ1dGVPdmVydmlldz8ucHJvZHVjdENvZGVcIj5cbiAgICAgICAge3sgJ2NvbmZpZ3VyYXRvci5hdHRyaWJ1dGUuaWQnIHwgY3hUcmFuc2xhdGUgfX06XG4gICAgICAgIHt7IGF0dHJpYnV0ZU92ZXJ2aWV3LnByb2R1Y3RDb2RlIH19PC9zcGFuXG4gICAgICA+XG4gICAgICA8ZGl2ICpuZ0lmPVwiZGlzcGxheVF1YW50aXR5KClcIiBjbGFzcz1cImN4LXF1YW50aXR5XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY3gtaWRlbnRpZmllclwiPnt7XG4gICAgICAgICAgJ2NvbmZpZ3VyYXRvci5hdHRyaWJ1dGUucXVhbnRpdHknIHwgY3hUcmFuc2xhdGVcbiAgICAgICAgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY3gtaXRlbVwiPnt7XG4gICAgICAgICAgYXR0cmlidXRlT3ZlcnZpZXcucXVhbnRpdHkgfCBjeE51bWVyaWNcbiAgICAgICAgfX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgKm5nSWY9XCJkaXNwbGF5UHJpY2UoKVwiIGNsYXNzPVwiY3gtcHJpY2VcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjeC1pZGVudGlmaWVyXCI+e3tcbiAgICAgICAgICAnY29uZmlndXJhdG9yLm92ZXJ2aWV3Rm9ybS5pdGVtUHJpY2UnIHwgY3hUcmFuc2xhdGVcbiAgICAgICAgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY3gtaXRlbVwiPnt7XG4gICAgICAgICAgYXR0cmlidXRlT3ZlcnZpZXcudmFsdWVQcmljZT8uZm9ybWF0dGVkVmFsdWVcbiAgICAgICAgfX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImN4LWF0dHJpYnV0ZS1wcmljZS1jb250YWluZXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICA8c3BhbiBjbGFzcz1cImN4LWF0dHJpYnV0ZS1sYWJlbFwiPnt7IGF0dHJpYnV0ZU92ZXJ2aWV3LmF0dHJpYnV0ZSB9fTwvc3Bhbj5cbiAgICA8Y3gtY29uZmlndXJhdG9yLXByaWNlXG4gICAgICBbZm9ybXVsYV09XCJleHRyYWN0UHJpY2VGb3JtdWxhUGFyYW1ldGVycygpXCJcbiAgICA+PC9jeC1jb25maWd1cmF0b3ItcHJpY2U+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG4iXX0=