/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { DirectionMode } from '@spartacus/storefront';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@angular/common";
import * as i3 from "@spartacus/core";
export class ConfiguratorPriceComponent {
    constructor(directionService) {
        this.directionService = directionService;
    }
    isRTLDirection() {
        return this.directionService.getDirection() === DirectionMode.RTL;
    }
    removeSign(value, sign) {
        if (value) {
            return value.replace(sign, '');
        }
        return '';
    }
    addSign(value, sign, before) {
        if (value) {
            return before ? sign + value : value + sign;
        }
        return '';
    }
    compileFormattedValue(priceValue, formattedValue, isRTL) {
        if (priceValue > 0) {
            return this.addSign(formattedValue, '+', !isRTL);
        }
        else {
            if (isRTL) {
                const withoutSign = this.removeSign(formattedValue, '-');
                return this.addSign(withoutSign, '-', false);
            }
            return formattedValue ?? '';
        }
    }
    /**
     * Retrieves price.
     *
     * @return {string} - value price formula
     */
    get price() {
        if (this.formula.priceTotal) {
            return this.priceTotal;
        }
        else {
            return this.compileFormattedValue(this.formula.price?.value ?? 0, this.formula.price?.formattedValue, this.isRTLDirection());
        }
    }
    /**
     * Retrieves the total price.
     *
     * @return {string} - total price formula
     */
    get priceTotal() {
        return this.compileFormattedValue(this.formula.priceTotal?.value ?? 0, this.formula.priceTotal?.formattedValue, this.isRTLDirection());
    }
    /**
     * Verifies whether quantity with price should be displayed.
     *
     * @return {boolean} - 'true' if quantity and price should be displayed, otherwise 'false'
     */
    displayQuantityAndPrice() {
        const quantity = this.formula.quantity;
        return quantity ? this.formula.price?.value !== 0 && quantity >= 1 : false;
    }
    /**
     * Verifies whether only price should be displayed.
     *
     * @return {boolean} - 'true' if only price should be displayed, otherwise 'false'
     */
    displayPriceOnly() {
        const priceValue = this.formula.price?.value ?? 0;
        const priceTotalValue = this.formula.priceTotal?.value ?? 0;
        return ((priceValue !== 0 || priceTotalValue !== 0) &&
            !this.displayQuantityAndPrice());
    }
    /**
     * Verifies whether the price formula should be displayed.
     *
     * @return {boolean} - 'true' if price formula should be displayed, otherwise 'false'
     */
    displayFormula() {
        const displayFormula = (this.formula.quantity && this.formula.quantity !== 0) ||
            (this.formula.price && this.formula.price?.value !== 0) ||
            (this.formula.priceTotal && this.formula.priceTotal?.value !== 0);
        return displayFormula ?? false;
    }
    /**
     * Retrieves formula for quantity with price.
     *
     * @param {string} formattedQuantity- formatted quantity
     * @return {string} - price formula
     */
    quantityWithPrice(formattedQuantity) {
        return formattedQuantity + 'x(' + this.formula.price?.formattedValue + ')';
    }
    /**
     * Verifies whether the price is lighted up.
     *
     * @return {boolean} - 'true' if price should be lighted up, otherwise 'false'
     */
    isPriceLightedUp() {
        return this.formula.isLightedUp ?? false;
    }
    /**
     * Retrieves the styling for the corresponding element.
     *
     * @return {string} - corresponding style class
     */
    get styleClass() {
        let styleClass = 'cx-price';
        if (!this.isPriceLightedUp()) {
            styleClass += ' cx-greyed-out';
        }
        return styleClass;
    }
}
ConfiguratorPriceComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorPriceComponent, deps: [{ token: i1.DirectionService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorPriceComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: { formula: "formula" }, ngImport: i0, template: "<ng-container *ngIf=\"displayFormula()\">\n  <ng-container *ngIf=\"displayPriceOnly()\">\n    <div\n      [ngClass]=\"styleClass\"\n      [attr.aria-label]=\"'configurator.a11y.valueSurcharge' | cxTranslate\"\n    >\n      {{ price }}\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"displayQuantityAndPrice()\">\n    <div\n      class=\"cx-quantity-price\"\n      [attr.aria-label]=\"'configurator.a11y.valueSurcharge' | cxTranslate\"\n    >\n      {{ quantityWithPrice(formula?.quantity | cxNumeric) }}\n    </div>\n    <div class=\"cx-price-total\">{{ priceTotal }}</div>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i3.CxNumericPipe, name: "cxNumeric" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorPriceComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-price', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"displayFormula()\">\n  <ng-container *ngIf=\"displayPriceOnly()\">\n    <div\n      [ngClass]=\"styleClass\"\n      [attr.aria-label]=\"'configurator.a11y.valueSurcharge' | cxTranslate\"\n    >\n      {{ price }}\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"displayQuantityAndPrice()\">\n    <div\n      class=\"cx-quantity-price\"\n      [attr.aria-label]=\"'configurator.a11y.valueSurcharge' | cxTranslate\"\n    >\n      {{ quantityWithPrice(formula?.quantity | cxNumeric) }}\n    </div>\n    <div class=\"cx-price-total\">{{ priceTotal }}</div>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.DirectionService }]; }, propDecorators: { formula: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXByaWNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29tcG9uZW50cy9wcmljZS9jb25maWd1cmF0b3ItcHJpY2UuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL3ByaWNlL2NvbmZpZ3VyYXRvci1wcmljZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLGFBQWEsRUFBb0IsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFlMUUsTUFBTSxPQUFPLDBCQUEwQjtJQUdyQyxZQUFzQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUFHLENBQUM7SUFFbEQsY0FBYztRQUN0QixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsS0FBSyxhQUFhLENBQUMsR0FBRyxDQUFDO0lBQ3BFLENBQUM7SUFFUyxVQUFVLENBQUMsS0FBeUIsRUFBRSxJQUFZO1FBQzFELElBQUksS0FBSyxFQUFFO1lBQ1QsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNoQztRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVTLE9BQU8sQ0FDZixLQUF5QixFQUN6QixJQUFZLEVBQ1osTUFBZTtRQUVmLElBQUksS0FBSyxFQUFFO1lBQ1QsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUss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QUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLGNBQWMsR0FBRyxHQUFHLENBQUM7SUFDN0UsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxnQkFBZ0I7UUFDZCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILElBQUksVUFBVTtRQUNaLElBQUksVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUU7WUFDNUIsVUFBVSxJQUFJLGdCQUFnQixDQUFDO1NBQ2hDO1FBRUQsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQzs7dUhBN0lVLDBCQUEwQjsyR0FBMUIsMEJBQTBCLDZGQ3RCdkMsNm1CQW1CQTsyRkRHYSwwQkFBMEI7a0JBTHRDLFNBQVM7K0JBQ0UsdUJBQXVCLG1CQUVoQix1QkFBdUIsQ0FBQyxNQUFNO3VHQUd0QyxPQUFPO3NCQUFmLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3Rpb25Nb2RlLCBEaXJlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3IgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVsL2NvbmZpZ3VyYXRvci5tb2RlbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlndXJhdG9yUHJpY2VDb21wb25lbnRPcHRpb25zIHtcbiAgcXVhbnRpdHk/OiBudW1iZXI7XG4gIHByaWNlPzogQ29uZmlndXJhdG9yLlByaWNlRGV0YWlscztcbiAgcHJpY2VUb3RhbD86IENvbmZpZ3VyYXRvci5QcmljZURldGFpbHM7XG4gIGlzTGlnaHRlZFVwPzogYm9vbGVhbjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtY29uZmlndXJhdG9yLXByaWNlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbmZpZ3VyYXRvci1wcmljZS5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JQcmljZUNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGZvcm11bGE6IENvbmZpZ3VyYXRvclByaWNlQ29tcG9uZW50T3B0aW9ucztcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZGlyZWN0aW9uU2VydmljZTogRGlyZWN0aW9uU2VydmljZSkge31cblxuICBwcm90ZWN0ZWQgaXNSVExEaXJlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlyZWN0aW9uU2VydmljZS5nZXREaXJlY3Rpb24oKSA9PT0gRGlyZWN0aW9uTW9kZS5SVEw7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVtb3ZlU2lnbih2YWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkLCBzaWduOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2Uoc2lnbiwgJycpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWRkU2lnbihcbiAgICB2YWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIHNpZ246IHN0cmluZyxcbiAgICBiZWZvcmU6IGJvb2xlYW5cbiAgKTogc3RyaW5nIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBiZWZvcmUgPyBzaWduICsgdmFsdWUgOiB2YWx1ZSArIHNpZ247XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHByb3RlY3RlZCBjb21waWxlRm9ybWF0dGVkVmFsdWUoXG4gICAgcHJpY2VWYWx1ZTogbnVtYmVyLFxuICAgIGZvcm1hdHRlZFZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgaXNSVEw6IGJvb2xlYW5cbiAgKTogc3RyaW5nIHtcbiAgICBpZiAocHJpY2VWYWx1ZSA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZFNpZ24oZm9ybWF0dGVkVmFsdWUsICcrJywgIWlzUlRMKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlzUlRMKSB7XG4gICAgICAgIGNvbnN0IHdpdGhvdXRTaWduID0gdGhpcy5yZW1vdmVTaWduKGZvcm1hdHRlZFZhbHVlLCAnLScpO1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRTaWduKHdpdGhvdXRTaWduLCAnLScsIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmb3JtYXR0ZWRWYWx1ZSA/PyAnJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHByaWNlLlxuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gdmFsdWUgcHJpY2UgZm9ybXVsYVxuICAgKi9cbiAgZ2V0IHByaWNlKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuZm9ybXVsYS5wcmljZVRvdGFsKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcmljZVRvdGFsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5jb21waWxlRm9ybWF0dGVkVmFsdWUoXG4gICAgICAgIHRoaXMuZm9ybXVsYS5wcmljZT8udmFsdWUgPz8gMCxcbiAgICAgICAgdGhpcy5mb3JtdWxhLnByaWNlPy5mb3JtYXR0ZWRWYWx1ZSxcbiAgICAgICAgdGhpcy5pc1JUTERpcmVjdGlvbigpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIHRvdGFsIHByaWNlLlxuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gdG90YWwgcHJpY2UgZm9ybXVsYVxuICAgKi9cbiAgZ2V0IHByaWNlVG90YWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb21waWxlRm9ybWF0dGVkVmFsdWUoXG4gICAgICB0aGlzLmZvcm11bGEucHJpY2VUb3RhbD8udmFsdWUgPz8gMCxcbiAgICAgIHRoaXMuZm9ybXVsYS5wcmljZVRvdGFsPy5mb3JtYXR0ZWRWYWx1ZSxcbiAgICAgIHRoaXMuaXNSVExEaXJlY3Rpb24oKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciBxdWFudGl0eSB3aXRoIHByaWNlIHNob3VsZCBiZSBkaXNwbGF5ZWQuXG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gJ3RydWUnIGlmIHF1YW50aXR5IGFuZCBwcmljZSBzaG91bGQgYmUgZGlzcGxheWVkLCBvdGhlcndpc2UgJ2ZhbHNlJ1xuICAgKi9cbiAgZGlzcGxheVF1YW50aXR5QW5kUHJpY2UoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcXVhbnRpdHkgPSB0aGlzLmZvcm11bGEucXVhbnRpdHk7XG4gICAgcmV0dXJuIHF1YW50aXR5ID8gdGhpcy5mb3JtdWxhLnByaWNlPy52YWx1ZSAhPT0gMCAmJiBxdWFudGl0eSA+PSAxIDogZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciBvbmx5IHByaWNlIHNob3VsZCBiZSBkaXNwbGF5ZWQuXG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gJ3RydWUnIGlmIG9ubHkgcHJpY2Ugc2hvdWxkIGJlIGRpc3BsYXllZCwgb3RoZXJ3aXNlICdmYWxzZSdcbiAgICovXG4gIGRpc3BsYXlQcmljZU9ubHkoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcHJpY2VWYWx1ZSA9IHRoaXMuZm9ybXVsYS5wcmljZT8udmFsdWUgPz8gMDtcbiAgICBjb25zdCBwcmljZVRvdGFsVmFsdWUgPSB0aGlzLmZvcm11bGEucHJpY2VUb3RhbD8udmFsdWUgPz8gMDtcbiAgICByZXR1cm4gKFxuICAgICAgKHByaWNlVmFsdWUgIT09IDAgfHwgcHJpY2VUb3RhbFZhbHVlICE9PSAwKSAmJlxuICAgICAgIXRoaXMuZGlzcGxheVF1YW50aXR5QW5kUHJpY2UoKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciB0aGUgcHJpY2UgZm9ybXVsYSBzaG91bGQgYmUgZGlzcGxheWVkLlxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSAtICd0cnVlJyBpZiBwcmljZSBmb3JtdWxhIHNob3VsZCBiZSBkaXNwbGF5ZWQsIG90aGVyd2lzZSAnZmFsc2UnXG4gICAqL1xuICBkaXNwbGF5Rm9ybXVsYSgpOiBib29sZWFuIHtcbiAgICBjb25zdCBkaXNwbGF5Rm9ybXVsYSA9XG4gICAgICAodGhpcy5mb3JtdWxhLnF1YW50aXR5ICYmIHRoaXMuZm9ybXVsYS5xdWFudGl0eSAhPT0gMCkgfHxcbiAgICAgICh0aGlzLmZvcm11bGEucHJpY2UgJiYgdGhpcy5mb3JtdWxhLnByaWNlPy52YWx1ZSAhPT0gMCkgfHxcbiAgICAgICh0aGlzLmZvcm11bGEucHJpY2VUb3RhbCAmJiB0aGlzLmZvcm11bGEucHJpY2VUb3RhbD8udmFsdWUgIT09IDApO1xuICAgIHJldHVybiBkaXNwbGF5Rm9ybXVsYSA/PyBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgZm9ybXVsYSBmb3IgcXVhbnRpdHkgd2l0aCBwcmljZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZvcm1hdHRlZFF1YW50aXR5LSBmb3JtYXR0ZWQgcXVhbnRpdHlcbiAgICogQHJldHVybiB7c3RyaW5nfSAtIHByaWNlIGZvcm11bGFcbiAgICovXG4gIHF1YW50aXR5V2l0aFByaWNlKGZvcm1hdHRlZFF1YW50aXR5OiBzdHJpbmcgfCBudWxsKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZm9ybWF0dGVkUXVhbnRpdHkgKyAneCgnICsgdGhpcy5mb3JtdWxhLnByaWNlPy5mb3JtYXR0ZWRWYWx1ZSArICcpJztcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZmllcyB3aGV0aGVyIHRoZSBwcmljZSBpcyBsaWdodGVkIHVwLlxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSAtICd0cnVlJyBpZiBwcmljZSBzaG91bGQgYmUgbGlnaHRlZCB1cCwgb3RoZXJ3aXNlICdmYWxzZSdcbiAgICovXG4gIGlzUHJpY2VMaWdodGVkVXAoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybXVsYS5pc0xpZ2h0ZWRVcCA/PyBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIHN0eWxpbmcgZm9yIHRoZSBjb3JyZXNwb25kaW5nIGVsZW1lbnQuXG4gICAqXG4gICAqIEByZXR1cm4ge3N0cmluZ30gLSBjb3JyZXNwb25kaW5nIHN0eWxlIGNsYXNzXG4gICAqL1xuICBnZXQgc3R5bGVDbGFzcygpOiBzdHJpbmcge1xuICAgIGxldCBzdHlsZUNsYXNzID0gJ2N4LXByaWNlJztcbiAgICBpZiAoIXRoaXMuaXNQcmljZUxpZ2h0ZWRVcCgpKSB7XG4gICAgICBzdHlsZUNsYXNzICs9ICcgY3gtZ3JleWVkLW91dCc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0eWxlQ2xhc3M7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJkaXNwbGF5Rm9ybXVsYSgpXCI+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJkaXNwbGF5UHJpY2VPbmx5KClcIj5cbiAgICA8ZGl2XG4gICAgICBbbmdDbGFzc109XCJzdHlsZUNsYXNzXCJcbiAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiJ2NvbmZpZ3VyYXRvci5hMTF5LnZhbHVlU3VyY2hhcmdlJyB8IGN4VHJhbnNsYXRlXCJcbiAgICA+XG4gICAgICB7eyBwcmljZSB9fVxuICAgIDwvZGl2PlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRpc3BsYXlRdWFudGl0eUFuZFByaWNlKClcIj5cbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cImN4LXF1YW50aXR5LXByaWNlXCJcbiAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiJ2NvbmZpZ3VyYXRvci5hMTF5LnZhbHVlU3VyY2hhcmdlJyB8IGN4VHJhbnNsYXRlXCJcbiAgICA+XG4gICAgICB7eyBxdWFudGl0eVdpdGhQcmljZShmb3JtdWxhPy5xdWFudGl0eSB8IGN4TnVtZXJpYykgfX1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY3gtcHJpY2UtdG90YWxcIj57eyBwcmljZVRvdGFsIH19PC9kaXY+XG4gIDwvbmctY29udGFpbmVyPlxuPC9uZy1jb250YWluZXI+XG4iXX0=