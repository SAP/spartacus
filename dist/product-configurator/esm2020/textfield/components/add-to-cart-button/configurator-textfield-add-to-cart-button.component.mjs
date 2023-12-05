/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import * as i0 from "@angular/core";
import * as i1 from "../../core/facade/configurator-textfield.service";
import * as i2 from "@angular/router";
import * as i3 from "@spartacus/core";
export class ConfiguratorTextfieldAddToCartButtonComponent {
    constructor(configuratorTextfieldService) {
        this.configuratorTextfieldService = configuratorTextfieldService;
    }
    /**
     * Adds the textfield configuration to the cart or updates it
     */
    onAddToCart() {
        const owner = this.configuration.owner;
        switch (owner.type) {
            case CommonConfigurator.OwnerType.PRODUCT:
                this.configuratorTextfieldService.addToCart(owner.id, this.configuration);
                break;
            case CommonConfigurator.OwnerType.CART_ENTRY:
                this.configuratorTextfieldService.updateCartEntry(owner.id, this.configuration);
                break;
        }
    }
    /**
     * Returns button description. Button will display 'addToCart' or 'done' in case configuration indicates that owner is a cart entry
     * @returns Resource key of button description
     */
    getButtonText() {
        return this.configuration.owner.type ===
            CommonConfigurator.OwnerType.CART_ENTRY
            ? 'configurator.addToCart.buttonUpdateCart'
            : 'configurator.addToCart.button';
    }
}
ConfiguratorTextfieldAddToCartButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldAddToCartButtonComponent, deps: [{ token: i1.ConfiguratorTextfieldService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorTextfieldAddToCartButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorTextfieldAddToCartButtonComponent, selector: "cx-configurator-textfield-add-to-cart-button", inputs: { configuration: "configuration", productCode: "productCode" }, ngImport: i0, template: "<button\n  class=\"cx-btn btn btn-block btn-primary cx-add-to-cart-btn\"\n  [routerLink]=\"{ cxRoute: 'cart' } | cxUrl\"\n  (click)=\"onAddToCart()\"\n>\n  {{ getButtonText() | cxTranslate }}\n</button>\n", dependencies: [{ kind: "directive", type: i2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldAddToCartButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-textfield-add-to-cart-button', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  class=\"cx-btn btn btn-block btn-primary cx-add-to-cart-btn\"\n  [routerLink]=\"{ cxRoute: 'cart' } | cxUrl\"\n  (click)=\"onAddToCart()\"\n>\n  {{ getButtonText() | cxTranslate }}\n</button>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorTextfieldService }]; }, propDecorators: { configuration: [{
                type: Input
            }], productCode: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXRleHRmaWVsZC1hZGQtdG8tY2FydC1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3RleHRmaWVsZC9jb21wb25lbnRzL2FkZC10by1jYXJ0LWJ1dHRvbi9jb25maWd1cmF0b3ItdGV4dGZpZWxkLWFkZC10by1jYXJ0LWJ1dHRvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvdGV4dGZpZWxkL2NvbXBvbmVudHMvYWRkLXRvLWNhcnQtYnV0dG9uL2NvbmZpZ3VyYXRvci10ZXh0ZmllbGQtYWRkLXRvLWNhcnQtYnV0dG9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7Ozs7QUFTNUUsTUFBTSxPQUFPLDZDQUE2QztJQUl4RCxZQUNZLDRCQUEwRDtRQUExRCxpQ0FBNEIsR0FBNUIsNEJBQTRCLENBQThCO0lBQ25FLENBQUM7SUFFSjs7T0FFRztJQUNILFdBQVc7UUFDVCxNQUFNLEtBQUssR0FBNkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDakUsUUFBUSxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2xCLEtBQUssa0JBQWtCLENBQUMsU0FBUyxDQUFDLE9BQU87Z0JBQ3ZDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxTQUFTLENBQ3pDLEtBQUssQ0FBQyxFQUFFLEVBQ1IsSUFBSSxDQUFDLGFBQWEsQ0FDbkIsQ0FBQztnQkFDRixNQUFNO1lBQ1IsS0FBSyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsVUFBVTtnQkFDMUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLGVBQWUsQ0FDL0MsS0FBSyxDQUFDLEVBQUUsRUFDUixJQUFJLENBQUMsYUFBYSxDQUNuQixDQUFDO2dCQUNGLE1BQU07U0FDVDtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxhQUFhO1FBQ1gsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJO1lBQ2xDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxVQUFVO1lBQ3ZDLENBQUMsQ0FBQyx5Q0FBeUM7WUFDM0MsQ0FBQyxDQUFDLCtCQUErQixDQUFDO0lBQ3RDLENBQUM7OzBJQXRDVSw2Q0FBNkM7OEhBQTdDLDZDQUE2Qyw0SkNoQjFELDhNQU9BOzJGRFNhLDZDQUE2QztrQkFMekQsU0FBUzsrQkFDRSw4Q0FBOEMsbUJBRXZDLHVCQUF1QixDQUFDLE1BQU07bUhBR3RDLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Db25maWd1cmF0b3IgfSBmcm9tICdAc3BhcnRhY3VzL3Byb2R1Y3QtY29uZmlndXJhdG9yL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JUZXh0ZmllbGRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9mYWNhZGUvY29uZmlndXJhdG9yLXRleHRmaWVsZC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclRleHRmaWVsZCB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWwvY29uZmlndXJhdG9yLXRleHRmaWVsZC5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWNvbmZpZ3VyYXRvci10ZXh0ZmllbGQtYWRkLXRvLWNhcnQtYnV0dG9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbmZpZ3VyYXRvci10ZXh0ZmllbGQtYWRkLXRvLWNhcnQtYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvclRleHRmaWVsZEFkZFRvQ2FydEJ1dHRvbkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRvclRleHRmaWVsZC5Db25maWd1cmF0aW9uO1xuICBASW5wdXQoKSBwcm9kdWN0Q29kZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjb25maWd1cmF0b3JUZXh0ZmllbGRTZXJ2aWNlOiBDb25maWd1cmF0b3JUZXh0ZmllbGRTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogQWRkcyB0aGUgdGV4dGZpZWxkIGNvbmZpZ3VyYXRpb24gdG8gdGhlIGNhcnQgb3IgdXBkYXRlcyBpdFxuICAgKi9cbiAgb25BZGRUb0NhcnQoKTogdm9pZCB7XG4gICAgY29uc3Qgb3duZXI6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lciA9IHRoaXMuY29uZmlndXJhdGlvbi5vd25lcjtcbiAgICBzd2l0Y2ggKG93bmVyLnR5cGUpIHtcbiAgICAgIGNhc2UgQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyVHlwZS5QUk9EVUNUOlxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRvclRleHRmaWVsZFNlcnZpY2UuYWRkVG9DYXJ0KFxuICAgICAgICAgIG93bmVyLmlkLFxuICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvblxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyVHlwZS5DQVJUX0VOVFJZOlxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRvclRleHRmaWVsZFNlcnZpY2UudXBkYXRlQ2FydEVudHJ5KFxuICAgICAgICAgIG93bmVyLmlkLFxuICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvblxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBidXR0b24gZGVzY3JpcHRpb24uIEJ1dHRvbiB3aWxsIGRpc3BsYXkgJ2FkZFRvQ2FydCcgb3IgJ2RvbmUnIGluIGNhc2UgY29uZmlndXJhdGlvbiBpbmRpY2F0ZXMgdGhhdCBvd25lciBpcyBhIGNhcnQgZW50cnlcbiAgICogQHJldHVybnMgUmVzb3VyY2Uga2V5IG9mIGJ1dHRvbiBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0QnV0dG9uVGV4dCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb24ub3duZXIudHlwZSA9PT1cbiAgICAgIENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lclR5cGUuQ0FSVF9FTlRSWVxuICAgICAgPyAnY29uZmlndXJhdG9yLmFkZFRvQ2FydC5idXR0b25VcGRhdGVDYXJ0J1xuICAgICAgOiAnY29uZmlndXJhdG9yLmFkZFRvQ2FydC5idXR0b24nO1xuICB9XG59XG4iLCI8YnV0dG9uXG4gIGNsYXNzPVwiY3gtYnRuIGJ0biBidG4tYmxvY2sgYnRuLXByaW1hcnkgY3gtYWRkLXRvLWNhcnQtYnRuXCJcbiAgW3JvdXRlckxpbmtdPVwieyBjeFJvdXRlOiAnY2FydCcgfSB8IGN4VXJsXCJcbiAgKGNsaWNrKT1cIm9uQWRkVG9DYXJ0KClcIlxuPlxuICB7eyBnZXRCdXR0b25UZXh0KCkgfCBjeFRyYW5zbGF0ZSB9fVxuPC9idXR0b24+XG4iXX0=