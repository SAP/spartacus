/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input, Optional, } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { PromotionLocation, CartOutlets, } from '@spartacus/cart/base/root';
import { Subscription } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/storefront";
import * as i4 from "@angular/common";
import * as i5 from "../cart-item-list-row/cart-item-list-row.component";
export class CartItemListComponent {
    set items(items) {
        this.resolveItems(items);
        this.createForm();
    }
    get items() {
        return this._items;
    }
    set setLoading(value) {
        if (!this.readonly) {
            // Whenever the cart is loading, we disable the complete form
            // to avoid any user interaction with the cart.
            value
                ? this.form.disable({ emitEvent: false })
                : this.form.enable({ emitEvent: false });
            this.cd.markForCheck();
        }
    }
    constructor(activeCartService, selectiveCartService, userIdService, multiCartService, cd, outlet) {
        this.activeCartService = activeCartService;
        this.selectiveCartService = selectiveCartService;
        this.userIdService = userIdService;
        this.multiCartService = multiCartService;
        this.cd = cd;
        this.outlet = outlet;
        this.subscription = new Subscription();
        this.readonly = false;
        this.hasHeader = true;
        this.options = {
            isSaveForLater: false,
            optionalBtn: null,
            displayAddToCart: false,
        };
        this._items = [];
        this.form = new UntypedFormGroup({});
        this.promotionLocation = PromotionLocation.ActiveCart;
        this.CartOutlets = CartOutlets;
    }
    ngOnInit() {
        this.subscription.add(this.getInputsFromContext());
        this.subscription.add(this.userIdService
            ?.getUserId()
            .subscribe((userId) => (this.userId = userId)));
    }
    getInputsFromContext() {
        return this.outlet?.context$.subscribe((context) => {
            if (context.readonly !== undefined) {
                this.readonly = context.readonly;
            }
            if (context.hasHeader !== undefined) {
                this.hasHeader = context.hasHeader;
            }
            if (context.options !== undefined) {
                this.options = context.options;
            }
            if (context.cartId !== undefined) {
                this.cartId = context.cartId;
            }
            if (context.items !== undefined) {
                this.items = context.items;
            }
            if (context.promotionLocation !== undefined) {
                this.promotionLocation = context.promotionLocation;
            }
            if (context.cartIsLoading !== undefined) {
                this.setLoading = context.cartIsLoading;
            }
        });
    }
    /**
     * Resolves items passed to component input and updates 'items' field
     */
    resolveItems(items) {
        if (!items) {
            this._items = [];
            return;
        }
        // The items we're getting from the input do not have a consistent model.
        // In case of a `consignmentEntry`, we need to normalize the data from the orderEntry.
        if (items.every((item) => item.hasOwnProperty('orderEntry'))) {
            this.normalizeConsignmentEntries(items);
        }
        else {
            this.rerenderChangedItems(items);
        }
    }
    normalizeConsignmentEntries(items) {
        this._items = items.map((consignmentEntry) => {
            const entry = Object.assign({}, consignmentEntry.orderEntry);
            entry.quantity = consignmentEntry.quantity;
            return entry;
        });
    }
    /**
     * We'd like to avoid the unnecessary re-renders of unchanged cart items after the data reload.
     * OCC cart entries don't have any unique identifier that we could use in Angular `trackBy`.
     * So we update each array element to the new object only when it's any different to the previous one.
     */
    rerenderChangedItems(items) {
        let offset = 0;
        for (let i = 0; i - offset < Math.max(items.length, this._items.length); i++) {
            const index = i - offset;
            if (JSON.stringify(this._items?.[index]) !== JSON.stringify(items[index])) {
                if (this._items[index]) {
                    this.form?.removeControl(this.getControlName(this._items[index]));
                }
                if (!items[index]) {
                    this._items.splice(index, 1);
                    offset++;
                }
                else {
                    this._items[index] = items[index];
                }
            }
        }
    }
    /**
     * Creates form models for list items
     */
    createForm() {
        this._items.forEach((item) => {
            const controlName = this.getControlName(item);
            const control = this.form.get(controlName);
            if (control) {
                if (control.get('quantity')?.value !== item.quantity) {
                    control.patchValue({ quantity: item.quantity }, { emitEvent: false });
                }
            }
            else {
                const group = new UntypedFormGroup({
                    entryNumber: new UntypedFormControl(item.entryNumber),
                    quantity: new UntypedFormControl(item.quantity, { updateOn: 'blur' }),
                });
                this.form.addControl(controlName, group);
            }
            // If we disable form group before adding, disabled status will reset
            // Which forces us to disable control after including to form object
            if (!item.updateable || this.readonly) {
                this.form.controls[controlName].disable();
            }
        });
    }
    getControlName(item) {
        return item.entryNumber?.toString() || '';
    }
    removeEntry(item) {
        if (this.options.isSaveForLater) {
            this.selectiveCartService.removeEntry(item);
        }
        else if (this.cartId && this.userId) {
            this.multiCartService.removeEntry(this.userId, this.cartId, item.entryNumber);
        }
        else {
            this.activeCartService.removeEntry(item);
        }
        delete this.form.controls[this.getControlName(item)];
    }
    getControl(item) {
        return this.form.get(this.getControlName(item))?.valueChanges.pipe(
        // eslint-disable-next-line import/no-deprecated
        startWith(null), tap((value) => {
            if (item.updateable && value && !this.readonly) {
                if (this.options.isSaveForLater) {
                    this.selectiveCartService.updateEntry(value.entryNumber, value.quantity);
                }
                else if (this.cartId && this.userId) {
                    this.multiCartService.updateEntry(this.userId, this.cartId, value.entryNumber, value.quantity);
                }
                else {
                    this.activeCartService.updateEntry(value.entryNumber, value.quantity);
                }
            }
        }), map(() => this.form.get(this.getControlName(item))));
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
CartItemListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartItemListComponent, deps: [{ token: i1.ActiveCartFacade }, { token: i1.SelectiveCartFacade }, { token: i2.UserIdService }, { token: i1.MultiCartFacade }, { token: i0.ChangeDetectorRef }, { token: i3.OutletContextData, optional: true }], target: i0.ɵɵFactoryTarget.Component });
CartItemListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CartItemListComponent, selector: "cx-cart-item-list", inputs: { readonly: "readonly", hasHeader: "hasHeader", options: "options", cartId: "cartId", items: "items", promotionLocation: "promotionLocation", setLoading: ["cartIsLoading", "setLoading"] }, ngImport: i0, template: "<table role=\"table\">\n  <caption class=\"cx-visually-hidden\">\n    {{\n      'cartItems.caption' | cxTranslate\n    }}\n  </caption>\n  <thead *ngIf=\"hasHeader\">\n    <tr role=\"row\" class=\"cx-item-list-header\">\n      <th role=\"columnheader\" class=\"cx-item-list-desc\">\n        {{ 'cartItems.description' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\" class=\"cx-item-list-qty\">\n        {{ 'cartItems.quantity' | cxTranslate }}\n      </th>\n      <ng-container *ngIf=\"options.isSaveForLater; else totalHeader\">\n        <th role=\"columnheader\" class=\"cx-item-list-total\">\n          {{ 'saveForLaterItems.stock' | cxTranslate }}\n        </th>\n      </ng-container>\n      <ng-container\n        *ngIf=\"!readonly || options.isSaveForLater || options.displayAddToCart\"\n      >\n        <th role=\"columnheader\" class=\"cx-item-list-actions\">\n          {{ 'cartItems.actions' | cxTranslate }}\n        </th>\n      </ng-container>\n    </tr>\n  </thead>\n  <tbody class=\"cx-item-list-items\">\n    <ng-container *ngFor=\"let item of items; let i = index\">\n      <ng-container\n        *ngIf=\"getControl(item) | async as control\"\n        [class.is-changed]=\"control.get('quantity').disabled\"\n      >\n        <tr\n          cx-cart-item-list-row\n          role=\"row\"\n          class=\"cx-item-list-row\"\n          [item]=\"item\"\n          [quantityControl]=\"control.get('quantity')\"\n          [readonly]=\"readonly\"\n          [promotionLocation]=\"promotionLocation\"\n          [options]=\"options\"\n        ></tr>\n      </ng-container>\n    </ng-container>\n  </tbody>\n</table>\n\n<ng-template #totalHeader>\n  <th role=\"columnheader\" class=\"cx-item-list-total\">\n    {{ 'cartItems.total' | cxTranslate }}\n  </th>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i5.CartItemListRowComponent, selector: "[cx-cart-item-list-row], cx-cart-item-list-row" }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartItemListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-cart-item-list', changeDetection: ChangeDetectionStrategy.OnPush, template: "<table role=\"table\">\n  <caption class=\"cx-visually-hidden\">\n    {{\n      'cartItems.caption' | cxTranslate\n    }}\n  </caption>\n  <thead *ngIf=\"hasHeader\">\n    <tr role=\"row\" class=\"cx-item-list-header\">\n      <th role=\"columnheader\" class=\"cx-item-list-desc\">\n        {{ 'cartItems.description' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\" class=\"cx-item-list-qty\">\n        {{ 'cartItems.quantity' | cxTranslate }}\n      </th>\n      <ng-container *ngIf=\"options.isSaveForLater; else totalHeader\">\n        <th role=\"columnheader\" class=\"cx-item-list-total\">\n          {{ 'saveForLaterItems.stock' | cxTranslate }}\n        </th>\n      </ng-container>\n      <ng-container\n        *ngIf=\"!readonly || options.isSaveForLater || options.displayAddToCart\"\n      >\n        <th role=\"columnheader\" class=\"cx-item-list-actions\">\n          {{ 'cartItems.actions' | cxTranslate }}\n        </th>\n      </ng-container>\n    </tr>\n  </thead>\n  <tbody class=\"cx-item-list-items\">\n    <ng-container *ngFor=\"let item of items; let i = index\">\n      <ng-container\n        *ngIf=\"getControl(item) | async as control\"\n        [class.is-changed]=\"control.get('quantity').disabled\"\n      >\n        <tr\n          cx-cart-item-list-row\n          role=\"row\"\n          class=\"cx-item-list-row\"\n          [item]=\"item\"\n          [quantityControl]=\"control.get('quantity')\"\n          [readonly]=\"readonly\"\n          [promotionLocation]=\"promotionLocation\"\n          [options]=\"options\"\n        ></tr>\n      </ng-container>\n    </ng-container>\n  </tbody>\n</table>\n\n<ng-template #totalHeader>\n  <th role=\"columnheader\" class=\"cx-item-list-total\">\n    {{ 'cartItems.total' | cxTranslate }}\n  </th>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i1.SelectiveCartFacade }, { type: i2.UserIdService }, { type: i1.MultiCartFacade }, { type: i0.ChangeDetectorRef }, { type: i3.OutletContextData, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { readonly: [{
                type: Input
            }], hasHeader: [{
                type: Input
            }], options: [{
                type: Input
            }], cartId: [{
                type: Input
            }], items: [{
                type: Input,
                args: ['items']
            }], promotionLocation: [{
                type: Input
            }], setLoading: [{
                type: Input,
                args: ['cartIsLoading']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1pdGVtLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb21wb25lbnRzL2NhcnQtc2hhcmVkL2NhcnQtaXRlbS1saXN0L2NhcnQtaXRlbS1saXN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2UvY29tcG9uZW50cy9jYXJ0LXNoYXJlZC9jYXJ0LWl0ZW0tbGlzdC9jYXJ0LWl0ZW0tbGlzdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsS0FBSyxFQUdMLFFBQVEsR0FDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RSxPQUFPLEVBTUwsaUJBQWlCLEVBRWpCLFdBQVcsR0FDWixNQUFNLDJCQUEyQixDQUFDO0FBR25DLE9BQU8sRUFBYyxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7QUFpQnJELE1BQU0sT0FBTyxxQkFBcUI7SUFtQmhDLElBQ0ksS0FBSyxDQUFDLEtBQW1CO1FBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUlELElBQTRCLFVBQVUsQ0FBQyxLQUFjO1FBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLDZEQUE2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Q0FBQyxDQUN0RSxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7O2tIQTlOVSxxQkFBcUI7c0dBQXJCLHFCQUFxQiw4UEM5Q2xDLDh3REFzREE7MkZEUmEscUJBQXFCO2tCQUxqQyxTQUFTOytCQUNFLG1CQUFtQixtQkFFWix1QkFBdUIsQ0FBQyxNQUFNOzswQkFpRDVDLFFBQVE7NENBM0NGLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUcsU0FBUztzQkFBakIsS0FBSztnQkFFRyxPQUFPO3NCQUFmLEtBQUs7Z0JBTUcsTUFBTTtzQkFBZCxLQUFLO2dCQU1GLEtBQUs7c0JBRFIsS0FBSzt1QkFBQyxPQUFPO2dCQVNMLGlCQUFpQjtzQkFBekIsS0FBSztnQkFFc0IsVUFBVTtzQkFBckMsS0FBSzt1QkFBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVW50eXBlZEZvcm1Db250cm9sLCBVbnR5cGVkRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgQWN0aXZlQ2FydEZhY2FkZSxcbiAgQ2FydEl0ZW1Db21wb25lbnRPcHRpb25zLFxuICBDb25zaWdubWVudEVudHJ5LFxuICBNdWx0aUNhcnRGYWNhZGUsXG4gIE9yZGVyRW50cnksXG4gIFByb21vdGlvbkxvY2F0aW9uLFxuICBTZWxlY3RpdmVDYXJ0RmFjYWRlLFxuICBDYXJ0T3V0bGV0cyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBVc2VySWRTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE91dGxldENvbnRleHREYXRhIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzdGFydFdpdGgsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW50ZXJmYWNlIEl0ZW1MaXN0Q29udGV4dCB7XG4gIHJlYWRvbmx5PzogYm9vbGVhbjtcbiAgaGFzSGVhZGVyPzogYm9vbGVhbjtcbiAgb3B0aW9ucz86IENhcnRJdGVtQ29tcG9uZW50T3B0aW9ucztcbiAgY2FydElkPzogc3RyaW5nO1xuICBpdGVtcz86IE9yZGVyRW50cnlbXTtcbiAgcHJvbW90aW9uTG9jYXRpb24/OiBQcm9tb3Rpb25Mb2NhdGlvbjtcbiAgY2FydElzTG9hZGluZz86IGJvb2xlYW47XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWNhcnQtaXRlbS1saXN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NhcnQtaXRlbS1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENhcnRJdGVtTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgcHJvdGVjdGVkIHVzZXJJZDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgaGFzSGVhZGVyOiBib29sZWFuID0gdHJ1ZTtcblxuICBASW5wdXQoKSBvcHRpb25zOiBDYXJ0SXRlbUNvbXBvbmVudE9wdGlvbnMgPSB7XG4gICAgaXNTYXZlRm9yTGF0ZXI6IGZhbHNlLFxuICAgIG9wdGlvbmFsQnRuOiBudWxsLFxuICAgIGRpc3BsYXlBZGRUb0NhcnQ6IGZhbHNlLFxuICB9O1xuXG4gIEBJbnB1dCgpIGNhcnRJZDogc3RyaW5nO1xuXG4gIHByb3RlY3RlZCBfaXRlbXM6IE9yZGVyRW50cnlbXSA9IFtdO1xuICBmb3JtOiBVbnR5cGVkRm9ybUdyb3VwID0gbmV3IFVudHlwZWRGb3JtR3JvdXAoe30pO1xuXG4gIEBJbnB1dCgnaXRlbXMnKVxuICBzZXQgaXRlbXMoaXRlbXM6IE9yZGVyRW50cnlbXSkge1xuICAgIHRoaXMucmVzb2x2ZUl0ZW1zKGl0ZW1zKTtcbiAgICB0aGlzLmNyZWF0ZUZvcm0oKTtcbiAgfVxuICBnZXQgaXRlbXMoKTogT3JkZXJFbnRyeVtdIHtcbiAgICByZXR1cm4gdGhpcy5faXRlbXM7XG4gIH1cblxuICBASW5wdXQoKSBwcm9tb3Rpb25Mb2NhdGlvbjogUHJvbW90aW9uTG9jYXRpb24gPSBQcm9tb3Rpb25Mb2NhdGlvbi5BY3RpdmVDYXJ0O1xuXG4gIEBJbnB1dCgnY2FydElzTG9hZGluZycpIHNldCBzZXRMb2FkaW5nKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKCF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAvLyBXaGVuZXZlciB0aGUgY2FydCBpcyBsb2FkaW5nLCB3ZSBkaXNhYmxlIHRoZSBjb21wbGV0ZSBmb3JtXG4gICAgICAvLyB0byBhdm9pZCBhbnkgdXNlciBpbnRlcmFjdGlvbiB3aXRoIHRoZSBjYXJ0LlxuICAgICAgdmFsdWVcbiAgICAgICAgPyB0aGlzLmZvcm0uZGlzYWJsZSh7IGVtaXRFdmVudDogZmFsc2UgfSlcbiAgICAgICAgOiB0aGlzLmZvcm0uZW5hYmxlKHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG4gIHJlYWRvbmx5IENhcnRPdXRsZXRzID0gQ2FydE91dGxldHM7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhY3RpdmVDYXJ0U2VydmljZTogQWN0aXZlQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgc2VsZWN0aXZlQ2FydFNlcnZpY2U6IFNlbGVjdGl2ZUNhcnRGYWNhZGUsXG4gICAgcHJvdGVjdGVkIHVzZXJJZFNlcnZpY2U6IFVzZXJJZFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIG11bHRpQ2FydFNlcnZpY2U6IE11bHRpQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBPcHRpb25hbCgpIHByb3RlY3RlZCBvdXRsZXQ/OiBPdXRsZXRDb250ZXh0RGF0YTxJdGVtTGlzdENvbnRleHQ+XG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQodGhpcy5nZXRJbnB1dHNGcm9tQ29udGV4dCgpKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMudXNlcklkU2VydmljZVxuICAgICAgICA/LmdldFVzZXJJZCgpXG4gICAgICAgIC5zdWJzY3JpYmUoKHVzZXJJZCkgPT4gKHRoaXMudXNlcklkID0gdXNlcklkKSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldElucHV0c0Zyb21Db250ZXh0KCk6IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMub3V0bGV0Py5jb250ZXh0JC5zdWJzY3JpYmUoKGNvbnRleHQpID0+IHtcbiAgICAgIGlmIChjb250ZXh0LnJlYWRvbmx5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5yZWFkb25seSA9IGNvbnRleHQucmVhZG9ubHk7XG4gICAgICB9XG4gICAgICBpZiAoY29udGV4dC5oYXNIZWFkZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmhhc0hlYWRlciA9IGNvbnRleHQuaGFzSGVhZGVyO1xuICAgICAgfVxuICAgICAgaWYgKGNvbnRleHQub3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGNvbnRleHQub3B0aW9ucztcbiAgICAgIH1cbiAgICAgIGlmIChjb250ZXh0LmNhcnRJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuY2FydElkID0gY29udGV4dC5jYXJ0SWQ7XG4gICAgICB9XG4gICAgICBpZiAoY29udGV4dC5pdGVtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBjb250ZXh0Lml0ZW1zO1xuICAgICAgfVxuICAgICAgaWYgKGNvbnRleHQucHJvbW90aW9uTG9jYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnByb21vdGlvbkxvY2F0aW9uID0gY29udGV4dC5wcm9tb3Rpb25Mb2NhdGlvbjtcbiAgICAgIH1cbiAgICAgIGlmIChjb250ZXh0LmNhcnRJc0xvYWRpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnNldExvYWRpbmcgPSBjb250ZXh0LmNhcnRJc0xvYWRpbmc7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZXMgaXRlbXMgcGFzc2VkIHRvIGNvbXBvbmVudCBpbnB1dCBhbmQgdXBkYXRlcyAnaXRlbXMnIGZpZWxkXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVzb2x2ZUl0ZW1zKGl0ZW1zOiBPcmRlckVudHJ5W10pOiB2b2lkIHtcbiAgICBpZiAoIWl0ZW1zKSB7XG4gICAgICB0aGlzLl9pdGVtcyA9IFtdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFRoZSBpdGVtcyB3ZSdyZSBnZXR0aW5nIGZyb20gdGhlIGlucHV0IGRvIG5vdCBoYXZlIGEgY29uc2lzdGVudCBtb2RlbC5cbiAgICAvLyBJbiBjYXNlIG9mIGEgYGNvbnNpZ25tZW50RW50cnlgLCB3ZSBuZWVkIHRvIG5vcm1hbGl6ZSB0aGUgZGF0YSBmcm9tIHRoZSBvcmRlckVudHJ5LlxuICAgIGlmIChpdGVtcy5ldmVyeSgoaXRlbSkgPT4gaXRlbS5oYXNPd25Qcm9wZXJ0eSgnb3JkZXJFbnRyeScpKSkge1xuICAgICAgdGhpcy5ub3JtYWxpemVDb25zaWdubWVudEVudHJpZXMoaXRlbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlcmVuZGVyQ2hhbmdlZEl0ZW1zKGl0ZW1zKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgbm9ybWFsaXplQ29uc2lnbm1lbnRFbnRyaWVzKGl0ZW1zOiBPcmRlckVudHJ5W10pIHtcbiAgICB0aGlzLl9pdGVtcyA9IGl0ZW1zLm1hcCgoY29uc2lnbm1lbnRFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZW50cnkgPSBPYmplY3QuYXNzaWduKFxuICAgICAgICB7fSxcbiAgICAgICAgKGNvbnNpZ25tZW50RW50cnkgYXMgQ29uc2lnbm1lbnRFbnRyeSkub3JkZXJFbnRyeVxuICAgICAgKTtcbiAgICAgIGVudHJ5LnF1YW50aXR5ID0gY29uc2lnbm1lbnRFbnRyeS5xdWFudGl0eTtcbiAgICAgIHJldHVybiBlbnRyeTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXZSdkIGxpa2UgdG8gYXZvaWQgdGhlIHVubmVjZXNzYXJ5IHJlLXJlbmRlcnMgb2YgdW5jaGFuZ2VkIGNhcnQgaXRlbXMgYWZ0ZXIgdGhlIGRhdGEgcmVsb2FkLlxuICAgKiBPQ0MgY2FydCBlbnRyaWVzIGRvbid0IGhhdmUgYW55IHVuaXF1ZSBpZGVudGlmaWVyIHRoYXQgd2UgY291bGQgdXNlIGluIEFuZ3VsYXIgYHRyYWNrQnlgLlxuICAgKiBTbyB3ZSB1cGRhdGUgZWFjaCBhcnJheSBlbGVtZW50IHRvIHRoZSBuZXcgb2JqZWN0IG9ubHkgd2hlbiBpdCdzIGFueSBkaWZmZXJlbnQgdG8gdGhlIHByZXZpb3VzIG9uZS5cbiAgICovXG4gIHByb3RlY3RlZCByZXJlbmRlckNoYW5nZWRJdGVtcyhpdGVtczogT3JkZXJFbnRyeVtdKSB7XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgZm9yIChcbiAgICAgIGxldCBpID0gMDtcbiAgICAgIGkgLSBvZmZzZXQgPCBNYXRoLm1heChpdGVtcy5sZW5ndGgsIHRoaXMuX2l0ZW1zLmxlbmd0aCk7XG4gICAgICBpKytcbiAgICApIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gaSAtIG9mZnNldDtcbiAgICAgIGlmIChcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkodGhpcy5faXRlbXM/LltpbmRleF0pICE9PSBKU09OLnN0cmluZ2lmeShpdGVtc1tpbmRleF0pXG4gICAgICApIHtcbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1zW2luZGV4XSkge1xuICAgICAgICAgIHRoaXMuZm9ybT8ucmVtb3ZlQ29udHJvbCh0aGlzLmdldENvbnRyb2xOYW1lKHRoaXMuX2l0ZW1zW2luZGV4XSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXRlbXNbaW5kZXhdKSB7XG4gICAgICAgICAgdGhpcy5faXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICBvZmZzZXQrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9pdGVtc1tpbmRleF0gPSBpdGVtc1tpbmRleF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBmb3JtIG1vZGVscyBmb3IgbGlzdCBpdGVtc1xuICAgKi9cbiAgcHJvdGVjdGVkIGNyZWF0ZUZvcm0oKTogdm9pZCB7XG4gICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgY29udHJvbE5hbWUgPSB0aGlzLmdldENvbnRyb2xOYW1lKGl0ZW0pO1xuICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuZm9ybS5nZXQoY29udHJvbE5hbWUpO1xuICAgICAgaWYgKGNvbnRyb2wpIHtcbiAgICAgICAgaWYgKGNvbnRyb2wuZ2V0KCdxdWFudGl0eScpPy52YWx1ZSAhPT0gaXRlbS5xdWFudGl0eSkge1xuICAgICAgICAgIGNvbnRyb2wucGF0Y2hWYWx1ZSh7IHF1YW50aXR5OiBpdGVtLnF1YW50aXR5IH0sIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZ3JvdXAgPSBuZXcgVW50eXBlZEZvcm1Hcm91cCh7XG4gICAgICAgICAgZW50cnlOdW1iZXI6IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woaXRlbS5lbnRyeU51bWJlciksXG4gICAgICAgICAgcXVhbnRpdHk6IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woaXRlbS5xdWFudGl0eSwgeyB1cGRhdGVPbjogJ2JsdXInIH0pLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5mb3JtLmFkZENvbnRyb2woY29udHJvbE5hbWUsIGdyb3VwKTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgd2UgZGlzYWJsZSBmb3JtIGdyb3VwIGJlZm9yZSBhZGRpbmcsIGRpc2FibGVkIHN0YXR1cyB3aWxsIHJlc2V0XG4gICAgICAvLyBXaGljaCBmb3JjZXMgdXMgdG8gZGlzYWJsZSBjb250cm9sIGFmdGVyIGluY2x1ZGluZyB0byBmb3JtIG9iamVjdFxuICAgICAgaWYgKCFpdGVtLnVwZGF0ZWFibGUgfHwgdGhpcy5yZWFkb25seSkge1xuICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbY29udHJvbE5hbWVdLmRpc2FibGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRDb250cm9sTmFtZShpdGVtOiBPcmRlckVudHJ5KTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXRlbS5lbnRyeU51bWJlcj8udG9TdHJpbmcoKSB8fCAnJztcbiAgfVxuXG4gIHJlbW92ZUVudHJ5KGl0ZW06IE9yZGVyRW50cnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmlzU2F2ZUZvckxhdGVyKSB7XG4gICAgICB0aGlzLnNlbGVjdGl2ZUNhcnRTZXJ2aWNlLnJlbW92ZUVudHJ5KGl0ZW0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jYXJ0SWQgJiYgdGhpcy51c2VySWQpIHtcbiAgICAgIHRoaXMubXVsdGlDYXJ0U2VydmljZS5yZW1vdmVFbnRyeShcbiAgICAgICAgdGhpcy51c2VySWQsXG4gICAgICAgIHRoaXMuY2FydElkLFxuICAgICAgICBpdGVtLmVudHJ5TnVtYmVyIGFzIG51bWJlclxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hY3RpdmVDYXJ0U2VydmljZS5yZW1vdmVFbnRyeShpdGVtKTtcbiAgICB9XG4gICAgZGVsZXRlIHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmdldENvbnRyb2xOYW1lKGl0ZW0pXTtcbiAgfVxuXG4gIGdldENvbnRyb2woaXRlbTogT3JkZXJFbnRyeSk6IE9ic2VydmFibGU8VW50eXBlZEZvcm1Hcm91cD4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmZvcm0uZ2V0KHRoaXMuZ2V0Q29udHJvbE5hbWUoaXRlbSkpPy52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZGVwcmVjYXRlZFxuICAgICAgc3RhcnRXaXRoKG51bGwpLFxuICAgICAgdGFwKCh2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAoaXRlbS51cGRhdGVhYmxlICYmIHZhbHVlICYmICF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pc1NhdmVGb3JMYXRlcikge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RpdmVDYXJ0U2VydmljZS51cGRhdGVFbnRyeShcbiAgICAgICAgICAgICAgdmFsdWUuZW50cnlOdW1iZXIsXG4gICAgICAgICAgICAgIHZhbHVlLnF1YW50aXR5XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jYXJ0SWQgJiYgdGhpcy51c2VySWQpIHtcbiAgICAgICAgICAgIHRoaXMubXVsdGlDYXJ0U2VydmljZS51cGRhdGVFbnRyeShcbiAgICAgICAgICAgICAgdGhpcy51c2VySWQsXG4gICAgICAgICAgICAgIHRoaXMuY2FydElkLFxuICAgICAgICAgICAgICB2YWx1ZS5lbnRyeU51bWJlcixcbiAgICAgICAgICAgICAgdmFsdWUucXVhbnRpdHlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQ2FydFNlcnZpY2UudXBkYXRlRW50cnkoXG4gICAgICAgICAgICAgIHZhbHVlLmVudHJ5TnVtYmVyLFxuICAgICAgICAgICAgICB2YWx1ZS5xdWFudGl0eVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgbWFwKCgpID0+IDxVbnR5cGVkRm9ybUdyb3VwPnRoaXMuZm9ybS5nZXQodGhpcy5nZXRDb250cm9sTmFtZShpdGVtKSkpXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCI8dGFibGUgcm9sZT1cInRhYmxlXCI+XG4gIDxjYXB0aW9uIGNsYXNzPVwiY3gtdmlzdWFsbHktaGlkZGVuXCI+XG4gICAge3tcbiAgICAgICdjYXJ0SXRlbXMuY2FwdGlvbicgfCBjeFRyYW5zbGF0ZVxuICAgIH19XG4gIDwvY2FwdGlvbj5cbiAgPHRoZWFkICpuZ0lmPVwiaGFzSGVhZGVyXCI+XG4gICAgPHRyIHJvbGU9XCJyb3dcIiBjbGFzcz1cImN4LWl0ZW0tbGlzdC1oZWFkZXJcIj5cbiAgICAgIDx0aCByb2xlPVwiY29sdW1uaGVhZGVyXCIgY2xhc3M9XCJjeC1pdGVtLWxpc3QtZGVzY1wiPlxuICAgICAgICB7eyAnY2FydEl0ZW1zLmRlc2NyaXB0aW9uJyB8IGN4VHJhbnNsYXRlIH19XG4gICAgICA8L3RoPlxuICAgICAgPHRoIHJvbGU9XCJjb2x1bW5oZWFkZXJcIiBjbGFzcz1cImN4LWl0ZW0tbGlzdC1xdHlcIj5cbiAgICAgICAge3sgJ2NhcnRJdGVtcy5xdWFudGl0eScgfCBjeFRyYW5zbGF0ZSB9fVxuICAgICAgPC90aD5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJvcHRpb25zLmlzU2F2ZUZvckxhdGVyOyBlbHNlIHRvdGFsSGVhZGVyXCI+XG4gICAgICAgIDx0aCByb2xlPVwiY29sdW1uaGVhZGVyXCIgY2xhc3M9XCJjeC1pdGVtLWxpc3QtdG90YWxcIj5cbiAgICAgICAgICB7eyAnc2F2ZUZvckxhdGVySXRlbXMuc3RvY2snIHwgY3hUcmFuc2xhdGUgfX1cbiAgICAgICAgPC90aD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAqbmdJZj1cIiFyZWFkb25seSB8fCBvcHRpb25zLmlzU2F2ZUZvckxhdGVyIHx8IG9wdGlvbnMuZGlzcGxheUFkZFRvQ2FydFwiXG4gICAgICA+XG4gICAgICAgIDx0aCByb2xlPVwiY29sdW1uaGVhZGVyXCIgY2xhc3M9XCJjeC1pdGVtLWxpc3QtYWN0aW9uc1wiPlxuICAgICAgICAgIHt7ICdjYXJ0SXRlbXMuYWN0aW9ucycgfCBjeFRyYW5zbGF0ZSB9fVxuICAgICAgICA8L3RoPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC90cj5cbiAgPC90aGVhZD5cbiAgPHRib2R5IGNsYXNzPVwiY3gtaXRlbS1saXN0LWl0ZW1zXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtczsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAqbmdJZj1cImdldENvbnRyb2woaXRlbSkgfCBhc3luYyBhcyBjb250cm9sXCJcbiAgICAgICAgW2NsYXNzLmlzLWNoYW5nZWRdPVwiY29udHJvbC5nZXQoJ3F1YW50aXR5JykuZGlzYWJsZWRcIlxuICAgICAgPlxuICAgICAgICA8dHJcbiAgICAgICAgICBjeC1jYXJ0LWl0ZW0tbGlzdC1yb3dcbiAgICAgICAgICByb2xlPVwicm93XCJcbiAgICAgICAgICBjbGFzcz1cImN4LWl0ZW0tbGlzdC1yb3dcIlxuICAgICAgICAgIFtpdGVtXT1cIml0ZW1cIlxuICAgICAgICAgIFtxdWFudGl0eUNvbnRyb2xdPVwiY29udHJvbC5nZXQoJ3F1YW50aXR5JylcIlxuICAgICAgICAgIFtyZWFkb25seV09XCJyZWFkb25seVwiXG4gICAgICAgICAgW3Byb21vdGlvbkxvY2F0aW9uXT1cInByb21vdGlvbkxvY2F0aW9uXCJcbiAgICAgICAgICBbb3B0aW9uc109XCJvcHRpb25zXCJcbiAgICAgICAgPjwvdHI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC90Ym9keT5cbjwvdGFibGU+XG5cbjxuZy10ZW1wbGF0ZSAjdG90YWxIZWFkZXI+XG4gIDx0aCByb2xlPVwiY29sdW1uaGVhZGVyXCIgY2xhc3M9XCJjeC1pdGVtLWxpc3QtdG90YWxcIj5cbiAgICB7eyAnY2FydEl0ZW1zLnRvdGFsJyB8IGN4VHJhbnNsYXRlIH19XG4gIDwvdGg+XG48L25nLXRlbXBsYXRlPlxuIl19