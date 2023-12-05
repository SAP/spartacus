/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, ComponentRef, Input, Optional, } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { CartOutlets, CartUiEventAddToCart, } from '@spartacus/cart/base/root';
import { isNotNullable, } from '@spartacus/core';
import { ICON_TYPE, } from '@spartacus/storefront';
import { filter, map, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@spartacus/cart/base/root";
import * as i3 from "@spartacus/core";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
export class AddToCartComponent {
    constructor(currentProductService, cd, activeCartService, component, eventService, productListItemContext) {
        this.currentProductService = currentProductService;
        this.cd = cd;
        this.activeCartService = activeCartService;
        this.component = component;
        this.eventService = eventService;
        this.productListItemContext = productListItemContext;
        this.showQuantity = true;
        this.hasStock = false;
        this.inventoryThreshold = false;
        this.showInventory$ = this.component?.data$.pipe(map((data) => data.inventoryDisplay));
        this.quantity = 1;
        this.addToCartForm = new UntypedFormGroup({
            quantity: new UntypedFormControl(1, { updateOn: 'blur' }),
        });
        this.CartOutlets = CartOutlets;
        this.iconTypes = ICON_TYPE;
    }
    ngOnInit() {
        if (this.product) {
            this.productCode = this.product.code ?? '';
            this.setStockInfo(this.product);
            this.cd.markForCheck();
        }
        else if (this.productCode) {
            // force hasStock and quantity for the time being, as we do not have more info:
            this.quantity = 1;
            this.hasStock = true;
            this.cd.markForCheck();
        }
        else {
            this.subscription = (this.productListItemContext
                ? this.productListItemContext.product$
                : this.currentProductService.getProduct())
                .pipe(filter(isNotNullable))
                .subscribe((product) => {
                this.productCode = product.code ?? '';
                this.setStockInfo(product);
                this.cd.markForCheck();
            });
        }
    }
    setStockInfo(product) {
        this.quantity = 1;
        this.addToCartForm.controls['quantity'].setValue(1);
        this.hasStock = Boolean(product.stock?.stockLevelStatus !== 'outOfStock');
        this.inventoryThreshold = product.stock?.isValueRounded ?? false;
        if (this.hasStock && product.stock?.stockLevel) {
            this.maxQuantity = product.stock.stockLevel;
        }
        if (this.productListItemContext) {
            this.showQuantity = false;
        }
    }
    /**
     * In specific scenarios, we need to omit displaying the stock level or append a plus to the value.
     * When backoffice forces a product to be in stock, omit showing the stock level.
     * When product stock level is limited by a threshold value, append '+' at the end.
     * When out of stock, display no numerical value.
     */
    getInventory() {
        if (this.hasStock) {
            const quantityDisplay = this.maxQuantity
                ? this.maxQuantity.toString()
                : '';
            return this.inventoryThreshold ? quantityDisplay + '+' : quantityDisplay;
        }
        else {
            return '';
        }
    }
    updateCount(value) {
        this.quantity = value;
    }
    addToCart() {
        const quantity = this.addToCartForm.get('quantity')?.value;
        if (!this.productCode || quantity <= 0) {
            return;
        }
        if (this.pickupOptionCompRef instanceof ComponentRef) {
            this.pickupOptionCompRef.instance.intendedPickupLocation$
                .pipe(take(1))
                .subscribe((intendedPickupLocation) => {
                this.pickupStore =
                    intendedPickupLocation?.pickupOption === 'pickup'
                        ? intendedPickupLocation.name
                        : undefined;
            });
        }
        this.activeCartService
            .getEntries()
            .pipe(take(1))
            .subscribe((cartEntries) => {
            this.activeCartService.addEntry(this.productCode, quantity, this.pickupStore);
            // A CartUiEventAddToCart is dispatched.  This event is intended for the UI
            // responsible to provide feedback about what was added to the cart, like
            // the added to cart dialog.
            //
            // Because we call activeCartService.getEntries() before, we can be sure the
            // cart library is loaded already and that the event listener exists.
            this.eventService.dispatch(this.createCartUiEventAddToCart(this.productCode, quantity, cartEntries.length, this.pickupStore));
        });
    }
    createCartUiEventAddToCart(productCode, quantity, numberOfEntriesBeforeAdd, storeName) {
        const newEvent = new CartUiEventAddToCart();
        newEvent.productCode = productCode;
        newEvent.quantity = quantity;
        newEvent.numberOfEntriesBeforeAdd = numberOfEntriesBeforeAdd;
        newEvent.pickupStoreName = storeName;
        return newEvent;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
AddToCartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToCartComponent, deps: [{ token: i1.CurrentProductService }, { token: i0.ChangeDetectorRef }, { token: i2.ActiveCartFacade }, { token: i1.CmsComponentData }, { token: i3.EventService }, { token: i1.ProductListItemContext, optional: true }], target: i0.ɵɵFactoryTarget.Component });
AddToCartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AddToCartComponent, selector: "cx-add-to-cart", inputs: { productCode: "productCode", showQuantity: "showQuantity", options: "options", pickupStore: "pickupStore", product: "product" }, ngImport: i0, template: "<form *ngIf=\"productCode\" [formGroup]=\"addToCartForm\" (submit)=\"addToCart()\">\n  <div class=\"quantity\" *ngIf=\"showQuantity\">\n    <label>{{ 'addToCart.quantity' | cxTranslate }}</label>\n    <div class=\"cx-counter-stock\">\n      <cx-item-counter\n        *ngIf=\"hasStock\"\n        [max]=\"maxQuantity\"\n        [control]=\"addToCartForm.get('quantity')\"\n      ></cx-item-counter>\n\n      <span class=\"info\">\n        <span *ngIf=\"showInventory$ | async\">{{ getInventory() }}</span>\n        {{\n          hasStock\n            ? ('addToCart.inStock' | cxTranslate)\n            : ('addToCart.outOfStock' | cxTranslate)\n        }}</span\n      >\n    </div>\n  </div>\n\n  <ng-container *ngIf=\"hasStock\">\n    <ng-template\n      [cxOutlet]=\"CartOutlets.ADD_TO_CART_PICKUP_OPTION\"\n      [(cxComponentRef)]=\"pickupOptionCompRef\"\n    ></ng-template>\n  </ng-container>\n\n  <button\n    *ngIf=\"hasStock\"\n    [ngClass]=\"\n      options?.displayAddToCart\n        ? 'btn btn-tertiary'\n        : 'btn btn-primary btn-block'\n    \"\n    type=\"submit\"\n    [disabled]=\"quantity <= 0 || quantity > maxQuantity\"\n  >\n    <span\n      *ngIf=\"\n        options?.addToCartString === ('addToCart.buyItAgain' | cxTranslate)\n      \"\n      class=\"repeat-icon\"\n      ><cx-icon [type]=\"iconTypes.REPEAT\"></cx-icon\n    ></span>\n    <span\n      attr.aria-label=\"{{\n        options?.addToCartString ?? ('addToCart.addToCart' | cxTranslate)\n      }}\"\n      [ngClass]=\"\n        options?.addToCartString === ('addToCart.buyItAgain' | cxTranslate)\n          ? 'buyItAgainLink'\n          : ''\n      \"\n    >\n      {{ options?.addToCartString ?? ('addToCart.addToCart' | cxTranslate) }}\n    </span>\n  </button>\n</form>\n", dependencies: [{ kind: "directive", type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i5.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i5.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i1.ItemCounterComponent, selector: "cx-item-counter", inputs: ["control", "min", "max", "step", "allowZero", "readonly"] }, { kind: "directive", type: i1.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer", "cxComponentRef"], outputs: ["loaded", "cxComponentRefChange"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToCartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-add-to-cart', changeDetection: ChangeDetectionStrategy.OnPush, template: "<form *ngIf=\"productCode\" [formGroup]=\"addToCartForm\" (submit)=\"addToCart()\">\n  <div class=\"quantity\" *ngIf=\"showQuantity\">\n    <label>{{ 'addToCart.quantity' | cxTranslate }}</label>\n    <div class=\"cx-counter-stock\">\n      <cx-item-counter\n        *ngIf=\"hasStock\"\n        [max]=\"maxQuantity\"\n        [control]=\"addToCartForm.get('quantity')\"\n      ></cx-item-counter>\n\n      <span class=\"info\">\n        <span *ngIf=\"showInventory$ | async\">{{ getInventory() }}</span>\n        {{\n          hasStock\n            ? ('addToCart.inStock' | cxTranslate)\n            : ('addToCart.outOfStock' | cxTranslate)\n        }}</span\n      >\n    </div>\n  </div>\n\n  <ng-container *ngIf=\"hasStock\">\n    <ng-template\n      [cxOutlet]=\"CartOutlets.ADD_TO_CART_PICKUP_OPTION\"\n      [(cxComponentRef)]=\"pickupOptionCompRef\"\n    ></ng-template>\n  </ng-container>\n\n  <button\n    *ngIf=\"hasStock\"\n    [ngClass]=\"\n      options?.displayAddToCart\n        ? 'btn btn-tertiary'\n        : 'btn btn-primary btn-block'\n    \"\n    type=\"submit\"\n    [disabled]=\"quantity <= 0 || quantity > maxQuantity\"\n  >\n    <span\n      *ngIf=\"\n        options?.addToCartString === ('addToCart.buyItAgain' | cxTranslate)\n      \"\n      class=\"repeat-icon\"\n      ><cx-icon [type]=\"iconTypes.REPEAT\"></cx-icon\n    ></span>\n    <span\n      attr.aria-label=\"{{\n        options?.addToCartString ?? ('addToCart.addToCart' | cxTranslate)\n      }}\"\n      [ngClass]=\"\n        options?.addToCartString === ('addToCart.buyItAgain' | cxTranslate)\n          ? 'buyItAgainLink'\n          : ''\n      \"\n    >\n      {{ options?.addToCartString ?? ('addToCart.addToCart' | cxTranslate) }}\n    </span>\n  </button>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CurrentProductService }, { type: i0.ChangeDetectorRef }, { type: i2.ActiveCartFacade }, { type: i1.CmsComponentData }, { type: i3.EventService }, { type: i1.ProductListItemContext, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { productCode: [{
                type: Input
            }], showQuantity: [{
                type: Input
            }], options: [{
                type: Input
            }], pickupStore: [{
                type: Input
            }], product: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXRvLWNhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb21wb25lbnRzL2FkZC10by1jYXJ0L2FkZC10by1jYXJ0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2UvY29tcG9uZW50cy9hZGQtdG8tY2FydC9hZGQtdG8tY2FydC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFHTCxRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEUsT0FBTyxFQUdMLFdBQVcsRUFDWCxvQkFBb0IsR0FDckIsTUFBTSwyQkFBMkIsQ0FBQztBQUNuQyxPQUFPLEVBR0wsYUFBYSxHQUVkLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUdMLFNBQVMsR0FFVixNQUFNLHVCQUF1QixDQUFDO0FBRS9CLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBT25ELE1BQU0sT0FBTyxrQkFBa0I7SUFpQzdCLFlBQ1kscUJBQTRDLEVBQzVDLEVBQXFCLEVBQ3JCLGlCQUFtQyxFQUNuQyxTQUFrRCxFQUNsRCxZQUEwQixFQUNkLHNCQUErQztRQUwzRCwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQ3JCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsY0FBUyxHQUFULFNBQVMsQ0FBeUM7UUFDbEQsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDZCwy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QUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29tcG9uZW50UmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVudHlwZWRGb3JtQ29udHJvbCwgVW50eXBlZEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIEFjdGl2ZUNhcnRGYWNhZGUsXG4gIENhcnRJdGVtQ29tcG9uZW50T3B0aW9ucyxcbiAgQ2FydE91dGxldHMsXG4gIENhcnRVaUV2ZW50QWRkVG9DYXJ0LFxufSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIENtc0FkZFRvQ2FydENvbXBvbmVudCxcbiAgRXZlbnRTZXJ2aWNlLFxuICBpc05vdE51bGxhYmxlLFxuICBQcm9kdWN0LFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ21zQ29tcG9uZW50RGF0YSxcbiAgQ3VycmVudFByb2R1Y3RTZXJ2aWNlLFxuICBJQ09OX1RZUEUsXG4gIFByb2R1Y3RMaXN0SXRlbUNvbnRleHQsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1hZGQtdG8tY2FydCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9hZGQtdG8tY2FydC5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBZGRUb0NhcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHByb2R1Y3RDb2RlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNob3dRdWFudGl0eSA9IHRydWU7XG4gIEBJbnB1dCgpIG9wdGlvbnM6IENhcnRJdGVtQ29tcG9uZW50T3B0aW9ucztcbiAgQElucHV0KCkgcGlja3VwU3RvcmU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgLyoqXG4gICAqIEFzIGxvbmcgYXMgd2UgZG8gbm90IHN1cHBvcnQgIzUwMjYsIHdlIHJlcXVpcmUgcHJvZHVjdCBpbnB1dCwgYXMgd2UgbmVlZFxuICAgKiAgYSByZWZlcmVuY2UgdG8gdGhlIHByb2R1Y3QgbW9kZWwgdG8gZmV0Y2ggdGhlIHN0b2NrIGRhdGEuXG4gICAqL1xuICBASW5wdXQoKSBwcm9kdWN0OiBQcm9kdWN0O1xuXG4gIG1heFF1YW50aXR5OiBudW1iZXI7XG5cbiAgaGFzU3RvY2s6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaW52ZW50b3J5VGhyZXNob2xkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgc2hvd0ludmVudG9yeSQ6IE9ic2VydmFibGU8Ym9vbGVhbiB8IHVuZGVmaW5lZD4gfCB1bmRlZmluZWQgPVxuICAgIHRoaXMuY29tcG9uZW50Py5kYXRhJC5waXBlKG1hcCgoZGF0YSkgPT4gZGF0YS5pbnZlbnRvcnlEaXNwbGF5KSk7XG5cbiAgcXVhbnRpdHkgPSAxO1xuXG4gIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGFkZFRvQ2FydEZvcm0gPSBuZXcgVW50eXBlZEZvcm1Hcm91cCh7XG4gICAgcXVhbnRpdHk6IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woMSwgeyB1cGRhdGVPbjogJ2JsdXInIH0pLFxuICB9KTtcblxuICByZWFkb25seSBDYXJ0T3V0bGV0cyA9IENhcnRPdXRsZXRzO1xuXG4gIHBpY2t1cE9wdGlvbkNvbXBSZWY6IGFueTtcblxuICBpY29uVHlwZXMgPSBJQ09OX1RZUEU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGN1cnJlbnRQcm9kdWN0U2VydmljZTogQ3VycmVudFByb2R1Y3RTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJvdGVjdGVkIGFjdGl2ZUNhcnRTZXJ2aWNlOiBBY3RpdmVDYXJ0RmFjYWRlLFxuICAgIHByb3RlY3RlZCBjb21wb25lbnQ6IENtc0NvbXBvbmVudERhdGE8Q21zQWRkVG9DYXJ0Q29tcG9uZW50PixcbiAgICBwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJvdGVjdGVkIHByb2R1Y3RMaXN0SXRlbUNvbnRleHQ/OiBQcm9kdWN0TGlzdEl0ZW1Db250ZXh0XG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5wcm9kdWN0KSB7XG4gICAgICB0aGlzLnByb2R1Y3RDb2RlID0gdGhpcy5wcm9kdWN0LmNvZGUgPz8gJyc7XG4gICAgICB0aGlzLnNldFN0b2NrSW5mbyh0aGlzLnByb2R1Y3QpO1xuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucHJvZHVjdENvZGUpIHtcbiAgICAgIC8vIGZvcmNlIGhhc1N0b2NrIGFuZCBxdWFudGl0eSBmb3IgdGhlIHRpbWUgYmVpbmcsIGFzIHdlIGRvIG5vdCBoYXZlIG1vcmUgaW5mbzpcbiAgICAgIHRoaXMucXVhbnRpdHkgPSAxO1xuICAgICAgdGhpcy5oYXNTdG9jayA9IHRydWU7XG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IChcbiAgICAgICAgdGhpcy5wcm9kdWN0TGlzdEl0ZW1Db250ZXh0XG4gICAgICAgICAgPyB0aGlzLnByb2R1Y3RMaXN0SXRlbUNvbnRleHQucHJvZHVjdCRcbiAgICAgICAgICA6IHRoaXMuY3VycmVudFByb2R1Y3RTZXJ2aWNlLmdldFByb2R1Y3QoKVxuICAgICAgKVxuICAgICAgICAucGlwZShmaWx0ZXIoaXNOb3ROdWxsYWJsZSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICB0aGlzLnByb2R1Y3RDb2RlID0gcHJvZHVjdC5jb2RlID8/ICcnO1xuICAgICAgICAgIHRoaXMuc2V0U3RvY2tJbmZvKHByb2R1Y3QpO1xuICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRTdG9ja0luZm8ocHJvZHVjdDogUHJvZHVjdCk6IHZvaWQge1xuICAgIHRoaXMucXVhbnRpdHkgPSAxO1xuXG4gICAgdGhpcy5hZGRUb0NhcnRGb3JtLmNvbnRyb2xzWydxdWFudGl0eSddLnNldFZhbHVlKDEpO1xuXG4gICAgdGhpcy5oYXNTdG9jayA9IEJvb2xlYW4ocHJvZHVjdC5zdG9jaz8uc3RvY2tMZXZlbFN0YXR1cyAhPT0gJ291dE9mU3RvY2snKTtcblxuICAgIHRoaXMuaW52ZW50b3J5VGhyZXNob2xkID0gcHJvZHVjdC5zdG9jaz8uaXNWYWx1ZVJvdW5kZWQgPz8gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5oYXNTdG9jayAmJiBwcm9kdWN0LnN0b2NrPy5zdG9ja0xldmVsKSB7XG4gICAgICB0aGlzLm1heFF1YW50aXR5ID0gcHJvZHVjdC5zdG9jay5zdG9ja0xldmVsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb2R1Y3RMaXN0SXRlbUNvbnRleHQpIHtcbiAgICAgIHRoaXMuc2hvd1F1YW50aXR5ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluIHNwZWNpZmljIHNjZW5hcmlvcywgd2UgbmVlZCB0byBvbWl0IGRpc3BsYXlpbmcgdGhlIHN0b2NrIGxldmVsIG9yIGFwcGVuZCBhIHBsdXMgdG8gdGhlIHZhbHVlLlxuICAgKiBXaGVuIGJhY2tvZmZpY2UgZm9yY2VzIGEgcHJvZHVjdCB0byBiZSBpbiBzdG9jaywgb21pdCBzaG93aW5nIHRoZSBzdG9jayBsZXZlbC5cbiAgICogV2hlbiBwcm9kdWN0IHN0b2NrIGxldmVsIGlzIGxpbWl0ZWQgYnkgYSB0aHJlc2hvbGQgdmFsdWUsIGFwcGVuZCAnKycgYXQgdGhlIGVuZC5cbiAgICogV2hlbiBvdXQgb2Ygc3RvY2ssIGRpc3BsYXkgbm8gbnVtZXJpY2FsIHZhbHVlLlxuICAgKi9cbiAgZ2V0SW52ZW50b3J5KCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuaGFzU3RvY2spIHtcbiAgICAgIGNvbnN0IHF1YW50aXR5RGlzcGxheSA9IHRoaXMubWF4UXVhbnRpdHlcbiAgICAgICAgPyB0aGlzLm1heFF1YW50aXR5LnRvU3RyaW5nKClcbiAgICAgICAgOiAnJztcbiAgICAgIHJldHVybiB0aGlzLmludmVudG9yeVRocmVzaG9sZCA/IHF1YW50aXR5RGlzcGxheSArICcrJyA6IHF1YW50aXR5RGlzcGxheTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUNvdW50KHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnF1YW50aXR5ID0gdmFsdWU7XG4gIH1cblxuICBhZGRUb0NhcnQoKSB7XG4gICAgY29uc3QgcXVhbnRpdHkgPSB0aGlzLmFkZFRvQ2FydEZvcm0uZ2V0KCdxdWFudGl0eScpPy52YWx1ZTtcbiAgICBpZiAoIXRoaXMucHJvZHVjdENvZGUgfHwgcXVhbnRpdHkgPD0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBpY2t1cE9wdGlvbkNvbXBSZWYgaW5zdGFuY2VvZiBDb21wb25lbnRSZWYpIHtcbiAgICAgIHRoaXMucGlja3VwT3B0aW9uQ29tcFJlZi5pbnN0YW5jZS5pbnRlbmRlZFBpY2t1cExvY2F0aW9uJFxuICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAuc3Vic2NyaWJlKChpbnRlbmRlZFBpY2t1cExvY2F0aW9uOiBhbnkpID0+IHtcbiAgICAgICAgICB0aGlzLnBpY2t1cFN0b3JlID1cbiAgICAgICAgICAgIGludGVuZGVkUGlja3VwTG9jYXRpb24/LnBpY2t1cE9wdGlvbiA9PT0gJ3BpY2t1cCdcbiAgICAgICAgICAgICAgPyBpbnRlbmRlZFBpY2t1cExvY2F0aW9uLm5hbWVcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aXZlQ2FydFNlcnZpY2VcbiAgICAgIC5nZXRFbnRyaWVzKClcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKChjYXJ0RW50cmllcykgPT4ge1xuICAgICAgICB0aGlzLmFjdGl2ZUNhcnRTZXJ2aWNlLmFkZEVudHJ5KFxuICAgICAgICAgIHRoaXMucHJvZHVjdENvZGUsXG4gICAgICAgICAgcXVhbnRpdHksXG4gICAgICAgICAgdGhpcy5waWNrdXBTdG9yZVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIEEgQ2FydFVpRXZlbnRBZGRUb0NhcnQgaXMgZGlzcGF0Y2hlZC4gIFRoaXMgZXZlbnQgaXMgaW50ZW5kZWQgZm9yIHRoZSBVSVxuICAgICAgICAvLyByZXNwb25zaWJsZSB0byBwcm92aWRlIGZlZWRiYWNrIGFib3V0IHdoYXQgd2FzIGFkZGVkIHRvIHRoZSBjYXJ0LCBsaWtlXG4gICAgICAgIC8vIHRoZSBhZGRlZCB0byBjYXJ0IGRpYWxvZy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gQmVjYXVzZSB3ZSBjYWxsIGFjdGl2ZUNhcnRTZXJ2aWNlLmdldEVudHJpZXMoKSBiZWZvcmUsIHdlIGNhbiBiZSBzdXJlIHRoZVxuICAgICAgICAvLyBjYXJ0IGxpYnJhcnkgaXMgbG9hZGVkIGFscmVhZHkgYW5kIHRoYXQgdGhlIGV2ZW50IGxpc3RlbmVyIGV4aXN0cy5cbiAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZGlzcGF0Y2goXG4gICAgICAgICAgdGhpcy5jcmVhdGVDYXJ0VWlFdmVudEFkZFRvQ2FydChcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdENvZGUsXG4gICAgICAgICAgICBxdWFudGl0eSxcbiAgICAgICAgICAgIGNhcnRFbnRyaWVzLmxlbmd0aCxcbiAgICAgICAgICAgIHRoaXMucGlja3VwU3RvcmVcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVDYXJ0VWlFdmVudEFkZFRvQ2FydChcbiAgICBwcm9kdWN0Q29kZTogc3RyaW5nLFxuICAgIHF1YW50aXR5OiBudW1iZXIsXG4gICAgbnVtYmVyT2ZFbnRyaWVzQmVmb3JlQWRkOiBudW1iZXIsXG4gICAgc3RvcmVOYW1lPzogc3RyaW5nXG4gICkge1xuICAgIGNvbnN0IG5ld0V2ZW50ID0gbmV3IENhcnRVaUV2ZW50QWRkVG9DYXJ0KCk7XG4gICAgbmV3RXZlbnQucHJvZHVjdENvZGUgPSBwcm9kdWN0Q29kZTtcbiAgICBuZXdFdmVudC5xdWFudGl0eSA9IHF1YW50aXR5O1xuICAgIG5ld0V2ZW50Lm51bWJlck9mRW50cmllc0JlZm9yZUFkZCA9IG51bWJlck9mRW50cmllc0JlZm9yZUFkZDtcbiAgICBuZXdFdmVudC5waWNrdXBTdG9yZU5hbWUgPSBzdG9yZU5hbWU7XG4gICAgcmV0dXJuIG5ld0V2ZW50O1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIiwiPGZvcm0gKm5nSWY9XCJwcm9kdWN0Q29kZVwiIFtmb3JtR3JvdXBdPVwiYWRkVG9DYXJ0Rm9ybVwiIChzdWJtaXQpPVwiYWRkVG9DYXJ0KClcIj5cbiAgPGRpdiBjbGFzcz1cInF1YW50aXR5XCIgKm5nSWY9XCJzaG93UXVhbnRpdHlcIj5cbiAgICA8bGFiZWw+e3sgJ2FkZFRvQ2FydC5xdWFudGl0eScgfCBjeFRyYW5zbGF0ZSB9fTwvbGFiZWw+XG4gICAgPGRpdiBjbGFzcz1cImN4LWNvdW50ZXItc3RvY2tcIj5cbiAgICAgIDxjeC1pdGVtLWNvdW50ZXJcbiAgICAgICAgKm5nSWY9XCJoYXNTdG9ja1wiXG4gICAgICAgIFttYXhdPVwibWF4UXVhbnRpdHlcIlxuICAgICAgICBbY29udHJvbF09XCJhZGRUb0NhcnRGb3JtLmdldCgncXVhbnRpdHknKVwiXG4gICAgICA+PC9jeC1pdGVtLWNvdW50ZXI+XG5cbiAgICAgIDxzcGFuIGNsYXNzPVwiaW5mb1wiPlxuICAgICAgICA8c3BhbiAqbmdJZj1cInNob3dJbnZlbnRvcnkkIHwgYXN5bmNcIj57eyBnZXRJbnZlbnRvcnkoKSB9fTwvc3Bhbj5cbiAgICAgICAge3tcbiAgICAgICAgICBoYXNTdG9ja1xuICAgICAgICAgICAgPyAoJ2FkZFRvQ2FydC5pblN0b2NrJyB8IGN4VHJhbnNsYXRlKVxuICAgICAgICAgICAgOiAoJ2FkZFRvQ2FydC5vdXRPZlN0b2NrJyB8IGN4VHJhbnNsYXRlKVxuICAgICAgICB9fTwvc3BhblxuICAgICAgPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiaGFzU3RvY2tcIj5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtjeE91dGxldF09XCJDYXJ0T3V0bGV0cy5BRERfVE9fQ0FSVF9QSUNLVVBfT1BUSU9OXCJcbiAgICAgIFsoY3hDb21wb25lbnRSZWYpXT1cInBpY2t1cE9wdGlvbkNvbXBSZWZcIlxuICAgID48L25nLXRlbXBsYXRlPlxuICA8L25nLWNvbnRhaW5lcj5cblxuICA8YnV0dG9uXG4gICAgKm5nSWY9XCJoYXNTdG9ja1wiXG4gICAgW25nQ2xhc3NdPVwiXG4gICAgICBvcHRpb25zPy5kaXNwbGF5QWRkVG9DYXJ0XG4gICAgICAgID8gJ2J0biBidG4tdGVydGlhcnknXG4gICAgICAgIDogJ2J0biBidG4tcHJpbWFyeSBidG4tYmxvY2snXG4gICAgXCJcbiAgICB0eXBlPVwic3VibWl0XCJcbiAgICBbZGlzYWJsZWRdPVwicXVhbnRpdHkgPD0gMCB8fCBxdWFudGl0eSA+IG1heFF1YW50aXR5XCJcbiAgPlxuICAgIDxzcGFuXG4gICAgICAqbmdJZj1cIlxuICAgICAgICBvcHRpb25zPy5hZGRUb0NhcnRTdHJpbmcgPT09ICgnYWRkVG9DYXJ0LmJ1eUl0QWdhaW4nIHwgY3hUcmFuc2xhdGUpXG4gICAgICBcIlxuICAgICAgY2xhc3M9XCJyZXBlYXQtaWNvblwiXG4gICAgICA+PGN4LWljb24gW3R5cGVdPVwiaWNvblR5cGVzLlJFUEVBVFwiPjwvY3gtaWNvblxuICAgID48L3NwYW4+XG4gICAgPHNwYW5cbiAgICAgIGF0dHIuYXJpYS1sYWJlbD1cInt7XG4gICAgICAgIG9wdGlvbnM/LmFkZFRvQ2FydFN0cmluZyA/PyAoJ2FkZFRvQ2FydC5hZGRUb0NhcnQnIHwgY3hUcmFuc2xhdGUpXG4gICAgICB9fVwiXG4gICAgICBbbmdDbGFzc109XCJcbiAgICAgICAgb3B0aW9ucz8uYWRkVG9DYXJ0U3RyaW5nID09PSAoJ2FkZFRvQ2FydC5idXlJdEFnYWluJyB8IGN4VHJhbnNsYXRlKVxuICAgICAgICAgID8gJ2J1eUl0QWdhaW5MaW5rJ1xuICAgICAgICAgIDogJydcbiAgICAgIFwiXG4gICAgPlxuICAgICAge3sgb3B0aW9ucz8uYWRkVG9DYXJ0U3RyaW5nID8/ICgnYWRkVG9DYXJ0LmFkZFRvQ2FydCcgfCBjeFRyYW5zbGF0ZSkgfX1cbiAgICA8L3NwYW4+XG4gIDwvYnV0dG9uPlxuPC9mb3JtPlxuIl19