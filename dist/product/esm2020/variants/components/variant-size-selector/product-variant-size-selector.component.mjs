/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { isNotUndefined, VariantQualifier, } from '@spartacus/core';
import { filter, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@angular/common";
export class ProductVariantSizeSelectorComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC12YXJpYW50LXNpemUtc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QvdmFyaWFudHMvY29tcG9uZW50cy92YXJpYW50LXNpemUtc2VsZWN0b3IvcHJvZHVjdC12YXJpYW50LXNpemUtc2VsZWN0b3IuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QvdmFyaWFudHMvY29tcG9uZW50cy92YXJpYW50LXNpemUtc2VsZWN0b3IvcHJvZHVjdC12YXJpYW50LXNpemUtc2VsZWN0b3IuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFFTCxjQUFjLEVBTWQsZ0JBQWdCLEdBQ2pCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQU85QyxNQUFNLE9BQU8sbUNBQW1DO0lBQzlDLFlBQ1UsY0FBOEIsRUFDOUIsY0FBOEI7UUFEOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUNyQyxDQUFDO0lBUUosVUFBVSxDQUFDLElBQVk7UUFDckIsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsY0FBYztpQkFDaEIsR0FBRyxDQUFDLElBQUksaUNBQW9CO2lCQUM1QixJQUFJO1lBQ0gsdUZBQXVGO1lBQ3ZGLDRDQUE0QztZQUM1QyxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQ3RCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDUjtpQkFDQSxTQUFTLENBQUMsQ0FBQyxPQUFnQixFQUFFLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDO29CQUNyQixPQUFPLEVBQUUsU0FBUztvQkFDbEIsTUFBTSxFQUFFLE9BQU87aUJBQ2hCLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxxQkFBcUIsQ0FBQyxVQUFvQztRQUN4RCxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxLQUFLLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFFLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDOUIsQ0FBQzs7Z0lBbENVLG1DQUFtQztvSEFBbkMsbUNBQW1DLDhIQ3hCaEQsMHRCQXdCQTsyRkRBYSxtQ0FBbUM7a0JBTC9DLFNBQVM7K0JBQ0Usa0NBQWtDLG1CQUUzQix1QkFBdUIsQ0FBQyxNQUFNO2tJQVMvQyxPQUFPO3NCQUROLEtBQUs7Z0JBSU4sUUFBUTtzQkFEUCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJhc2VPcHRpb24sXG4gIGlzTm90VW5kZWZpbmVkLFxuICBQcm9kdWN0LFxuICBQcm9kdWN0U2NvcGUsXG4gIFByb2R1Y3RTZXJ2aWNlLFxuICBSb3V0aW5nU2VydmljZSxcbiAgVmFyaWFudE9wdGlvblF1YWxpZmllcixcbiAgVmFyaWFudFF1YWxpZmllcixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtcHJvZHVjdC12YXJpYW50LXNpemUtc2VsZWN0b3InLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJvZHVjdC12YXJpYW50LXNpemUtc2VsZWN0b3IuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdFZhcmlhbnRTaXplU2VsZWN0b3JDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHByb2R1Y3RTZXJ2aWNlOiBQcm9kdWN0U2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZVxuICApIHt9XG5cbiAgQElucHV0KClcbiAgcHJvZHVjdDogUHJvZHVjdDtcblxuICBASW5wdXQoKVxuICB2YXJpYW50czogQmFzZU9wdGlvbjtcblxuICBjaGFuZ2VTaXplKGNvZGU6IHN0cmluZyk6IG51bGwge1xuICAgIGlmIChjb2RlKSB7XG4gICAgICB0aGlzLnByb2R1Y3RTZXJ2aWNlXG4gICAgICAgIC5nZXQoY29kZSwgUHJvZHVjdFNjb3BlLkxJU1QpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIC8vIGJlbG93IGNhbGwgbWlnaHQgbG9va3MgcmVkdW5kYW50IGJ1dCBpbiBmYWN0IHRoaXMgZGF0YSBpcyBnb2luZyB0byBiZSBsb2FkZWQgYW55d2F5c1xuICAgICAgICAgIC8vIHdlJ3JlIGp1c3QgY2FsbGluZyBpdCBlYXJsaWVyIGFuZCBzdG9yaW5nXG4gICAgICAgICAgZmlsdGVyKGlzTm90VW5kZWZpbmVkKSxcbiAgICAgICAgICB0YWtlKDEpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgocHJvZHVjdDogUHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHRoaXMucm91dGluZ1NlcnZpY2UuZ28oe1xuICAgICAgICAgICAgY3hSb3V0ZTogJ3Byb2R1Y3QnLFxuICAgICAgICAgICAgcGFyYW1zOiBwcm9kdWN0LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgZ2V0VmFyaWFudE9wdGlvblZhbHVlKHF1YWxpZmllcnM6IFZhcmlhbnRPcHRpb25RdWFsaWZpZXJbXSkge1xuICAgIGNvbnN0IG9iaiA9IHF1YWxpZmllcnMuZmluZCgocSkgPT4gcS5xdWFsaWZpZXIgPT09IFZhcmlhbnRRdWFsaWZpZXIuU0laRSk7XG4gICAgcmV0dXJuIG9iaiA/IG9iai52YWx1ZSA6ICcnO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyPlxuICA8ZGl2IGNsYXNzPVwidmFyaWFudC1zZWxlY3RvclwiPlxuICAgIDxkaXYgY2xhc3M9XCJ2YXJpYW50LW5hbWVcIj57eyAncHJvZHVjdFZhcmlhbnRzLnNpemUnIHwgY3hUcmFuc2xhdGUgfX06PC9kaXY+XG4gICAgPHNlbGVjdFxuICAgICAgKGNoYW5nZSk9XCJjaGFuZ2VTaXplKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIHZhcmlhbnQtc2VsZWN0XCJcbiAgICA+XG4gICAgICA8b3B0aW9uXG4gICAgICAgICpuZ0Zvcj1cImxldCB2IG9mIHZhcmlhbnRzPy5vcHRpb25zXCJcbiAgICAgICAgdmFsdWU9XCJ7eyB2LmNvZGUgfX1cIlxuICAgICAgICBbc2VsZWN0ZWRdPVwidi5jb2RlID09PSBwcm9kdWN0Py5jb2RlXCJcbiAgICAgID5cbiAgICAgICAge3sgZ2V0VmFyaWFudE9wdGlvblZhbHVlKHYudmFyaWFudE9wdGlvblF1YWxpZmllcnMpIH19XG4gICAgICA8L29wdGlvbj5cbiAgICA8L3NlbGVjdD5cbiAgICA8YVxuICAgICAgaHJlZj1cIiNcIlxuICAgICAgY2xhc3M9XCJzaXplLWd1aWRlXCJcbiAgICAgIHRpdGxlPVwie3sgJ3Byb2R1Y3RWYXJpYW50cy5zaXplR3VpZGVMYWJlbCcgfCBjeFRyYW5zbGF0ZSB9fVwiXG4gICAgPlxuICAgICAge3sgJ3Byb2R1Y3RWYXJpYW50cy5zaXplR3VpZGVMYWJlbCcgfCBjeFRyYW5zbGF0ZSB9fVxuICAgIDwvYT5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==