/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { VariantQualifier, } from '@spartacus/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@angular/common";
export class ProductVariantColorSelectorComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC12YXJpYW50LWNvbG9yLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0L3ZhcmlhbnRzL2NvbXBvbmVudHMvdmFyaWFudC1jb2xvci1zZWxlY3Rvci9wcm9kdWN0LXZhcmlhbnQtY29sb3Itc2VsZWN0b3IuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QvdmFyaWFudHMvY29tcG9uZW50cy92YXJpYW50LWNvbG9yLXNlbGVjdG9yL3Byb2R1Y3QtdmFyaWFudC1jb2xvci1zZWxlY3Rvci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUtMLGdCQUFnQixHQUNqQixNQUFNLGlCQUFpQixDQUFDOzs7O0FBT3pCLE1BQU0sT0FBTyxvQ0FBb0M7SUFDL0MsWUFBb0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQUcsQ0FBQztJQVF0RCxXQUFXLENBQUMsSUFBWSxFQUFFLElBQVk7UUFDcEMsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztnQkFDckIsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7YUFDdkIsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxxQkFBcUIsQ0FBQyxVQUFvQztRQUN4RCxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxLQUFLLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNFLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDOUIsQ0FBQzs7aUlBckJVLG9DQUFvQztxSEFBcEMsb0NBQW9DLCtIQ3BCakQsb2lCQWtCQTsyRkRFYSxvQ0FBb0M7a0JBTGhELFNBQVM7K0JBQ0UsbUNBQW1DLG1CQUU1Qix1QkFBdUIsQ0FBQyxNQUFNO3FHQU0vQyxPQUFPO3NCQUROLEtBQUs7Z0JBSU4sUUFBUTtzQkFEUCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJhc2VPcHRpb24sXG4gIFByb2R1Y3QsXG4gIFJvdXRpbmdTZXJ2aWNlLFxuICBWYXJpYW50T3B0aW9uUXVhbGlmaWVyLFxuICBWYXJpYW50UXVhbGlmaWVyLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1wcm9kdWN0LXZhcmlhbnQtY29sb3Itc2VsZWN0b3InLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJvZHVjdC12YXJpYW50LWNvbG9yLXNlbGVjdG9yLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RWYXJpYW50Q29sb3JTZWxlY3RvckNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlKSB7fVxuXG4gIEBJbnB1dCgpXG4gIHByb2R1Y3Q6IFByb2R1Y3Q7XG5cbiAgQElucHV0KClcbiAgdmFyaWFudHM6IEJhc2VPcHRpb247XG5cbiAgY2hhbmdlQ29sb3IoY29kZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBudWxsIHtcbiAgICBpZiAoY29kZSkge1xuICAgICAgdGhpcy5yb3V0aW5nU2VydmljZS5nbyh7XG4gICAgICAgIGN4Um91dGU6ICdwcm9kdWN0JyxcbiAgICAgICAgcGFyYW1zOiB7IGNvZGUsIG5hbWUgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBnZXRWYXJpYW50T3B0aW9uVmFsdWUocXVhbGlmaWVyczogVmFyaWFudE9wdGlvblF1YWxpZmllcltdKSB7XG4gICAgY29uc3Qgb2JqID0gcXVhbGlmaWVycy5maW5kKChxKSA9PiBxLnF1YWxpZmllciA9PT0gVmFyaWFudFF1YWxpZmllci5DT0xPUik7XG4gICAgcmV0dXJuIG9iaiA/IG9iai52YWx1ZSA6ICcnO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyPlxuICA8ZGl2IGNsYXNzPVwidmFyaWFudC1zZWxlY3RvclwiPlxuICAgIDxkaXYgY2xhc3M9XCJ2YXJpYW50LW5hbWVcIj57eyAncHJvZHVjdFZhcmlhbnRzLmNvbG9yJyB8IGN4VHJhbnNsYXRlIH19OjwvZGl2PlxuXG4gICAgPHNlbGVjdFxuICAgICAgKGNoYW5nZSk9XCJjaGFuZ2VDb2xvcigkZXZlbnQudGFyZ2V0LnZhbHVlLCBwcm9kdWN0Py5uYW1lKVwiXG4gICAgICBjbGFzcz1cImZvcm0tY29udHJvbCB2YXJpYW50LXNlbGVjdFwiXG4gICAgPlxuICAgICAgPG9wdGlvblxuICAgICAgICAqbmdGb3I9XCJsZXQgdiBvZiB2YXJpYW50cz8ub3B0aW9uc1wiXG4gICAgICAgIHZhbHVlPVwie3sgdi5jb2RlIH19XCJcbiAgICAgICAgW3NlbGVjdGVkXT1cInYuY29kZSA9PT0gcHJvZHVjdD8uY29kZVwiXG4gICAgICA+XG4gICAgICAgIHt7IGdldFZhcmlhbnRPcHRpb25WYWx1ZSh2LnZhcmlhbnRPcHRpb25RdWFsaWZpZXJzKSB9fVxuICAgICAgPC9vcHRpb24+XG4gICAgPC9zZWxlY3Q+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG4iXX0=