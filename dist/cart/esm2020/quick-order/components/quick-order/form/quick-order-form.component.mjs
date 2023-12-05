/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input, } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ICON_TYPE } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, take, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/cart/quick-order/root";
import * as i3 from "@angular/common";
import * as i4 from "@spartacus/storefront";
import * as i5 from "@angular/forms";
const SEARCH_BOX_ACTIVE_CLASS = 'quick-order-searchbox-is-active';
export class QuickOrderFormComponent {
    constructor(config, cd, quickOrderService, winRef) {
        this.config = config;
        this.cd = cd;
        this.quickOrderService = quickOrderService;
        this.winRef = winRef;
        this.iconTypes = ICON_TYPE;
        this.isSearching = false;
        this.noResults = false;
        this.results = [];
        this.subscription = new Subscription();
        this.searchSubscription = new Subscription();
    }
    ngOnInit() {
        this.buildForm();
        this.subscription.add(this.watchProductAdd());
        this.subscription.add(this.watchQueryChange());
    }
    onBlur(event) {
        // Use timeout to detect changes
        setTimeout(() => {
            if (!this.isSuggestionFocused()) {
                this.blurSuggestionBox(event);
            }
        });
    }
    clear(event) {
        event?.preventDefault();
        if (this.isResultsBoxOpen()) {
            this.toggleBodyClass(SEARCH_BOX_ACTIVE_CLASS, false);
        }
        const product = this.form.get('product')?.value;
        if (!!product) {
            this.form.reset();
        }
        // We have to call 'close' method every time to make sure results list is empty and call detectChanges to change icon type in form
        this.close();
        this.cd?.detectChanges();
    }
    add(product, event) {
        event?.preventDefault();
        // TODO change to nonpurchasable flag once we will support multidimensional products in search and when the purchasable flag will be available in search product response
        // Check if product is purchasable / non multidimensional
        if (product.multidimensional) {
            this.quickOrderService.setNonPurchasableProductError(product);
            this.clear();
            return;
        }
        else {
            this.quickOrderService.clearNonPurchasableProductError();
        }
        this.quickOrderService.addProduct(product);
    }
    addProduct(event) {
        this.quickOrderService
            .canAdd()
            .pipe(take(1))
            .subscribe((canAdd) => {
            if (canAdd) {
                // Add product if there is only one in the result list
                if (this.results.length === 1) {
                    this.add(this.results[0], event);
                    // Add product if there is focus on it
                }
                else if (this.getFocusedIndex() !== -1) {
                    const product = this.results[this.getFocusedIndex()];
                    this.add(product, event);
                }
            }
        });
    }
    focusNextChild(event) {
        event.preventDefault(); // Negate normal keyscroll
        if (!this.results.length) {
            return;
        }
        const [results, focusedIndex] = [
            this.getResultElements(),
            this.getFocusedIndex(),
        ];
        // Focus on first index moving to last
        if (results.length) {
            if (focusedIndex >= results.length - 1) {
                results[0].focus();
            }
            else {
                results[focusedIndex + 1].focus();
            }
        }
    }
    focusPreviousChild(event) {
        event.preventDefault(); // Negate normal keyscroll
        if (!this.results.length) {
            return;
        }
        const [results, focusedIndex] = [
            this.getResultElements(),
            this.getFocusedIndex(),
        ];
        // Focus on last index moving to first
        if (results.length) {
            if (focusedIndex < 1) {
                results[results.length - 1].focus();
            }
            else {
                results[focusedIndex - 1].focus();
            }
        }
    }
    isResultsBoxOpen() {
        return this.winRef
            ? !!this.winRef.document.querySelector(`.${SEARCH_BOX_ACTIVE_CLASS}`)
            : false;
    }
    canAddProduct() {
        return this.quickOrderService.canAdd();
    }
    open() {
        this.toggleBodyClass(SEARCH_BOX_ACTIVE_CLASS, true);
    }
    // Return result list as HTMLElement array
    getResultElements() {
        if (this.winRef) {
            return Array.from(this.winRef.document.querySelectorAll('.quick-order-results-products > li button'));
        }
        else {
            return [];
        }
    }
    blurSuggestionBox(event) {
        this.toggleBodyClass(SEARCH_BOX_ACTIVE_CLASS, false);
        if (event && event.target) {
            event.target.blur();
        }
    }
    // Return focused element as HTMLElement
    getFocusedElement() {
        if (this.winRef) {
            return this.winRef.document.activeElement;
        }
    }
    getFocusedIndex() {
        return this.getResultElements().indexOf(this.getFocusedElement());
    }
    isSuggestionFocused() {
        return this.getResultElements().includes(this.getFocusedElement());
    }
    toggleBodyClass(className, add) {
        // TODO(#14058): Remove condition
        if (this.winRef) {
            if (add === undefined) {
                this.winRef.document.body.classList.toggle(className);
            }
            else {
                add
                    ? this.winRef.document.body.classList.add(className)
                    : this.winRef.document.body.classList.remove(className);
            }
        }
    }
    buildForm() {
        const form = new UntypedFormGroup({});
        form.setControl('product', new UntypedFormControl(null));
        this.form = form;
    }
    isEmpty(string) {
        return string?.trim() === '' || string == null;
    }
    watchQueryChange() {
        return this.form.valueChanges
            .pipe(distinctUntilChanged(), debounceTime(300), filter((value) => {
            if (this.config?.quickOrder?.searchForm) {
                //Check if input to quick order is an empty after deleting input manually
                if (this.isEmpty(value.product)) {
                    //Clear recommendation results on empty string
                    this.clear();
                    return false;
                }
                return (!!value.product &&
                    value.product.length >=
                        this.config.quickOrder?.searchForm?.minCharactersBeforeRequest);
            }
            return value;
        }))
            .subscribe((value) => {
            this.searchProducts(value.product);
        });
    }
    searchProducts(query) {
        this.searchSubscription.add(this.canAddProduct()
            .pipe(filter(Boolean), switchMap(() => this.quickOrderService
            .searchProducts(query, this.config?.quickOrder?.searchForm?.maxProducts)
            .pipe(take(1))))
            .subscribe((products) => {
            this.results = products;
            if (this.results.length) {
                this.noResults = false;
                this.open();
            }
            else {
                this.noResults = true;
            }
            this.cd?.detectChanges();
        }));
    }
    clearResults() {
        this.results = [];
    }
    close() {
        this.resetSearchSubscription();
        this.clearResults();
        this.noResults = false;
    }
    resetSearchSubscription() {
        this.searchSubscription.unsubscribe();
        this.searchSubscription = new Subscription();
    }
    watchProductAdd() {
        return this.quickOrderService
            .getProductAdded()
            .subscribe(() => this.clear());
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
QuickOrderFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderFormComponent, deps: [{ token: i1.Config }, { token: i0.ChangeDetectorRef }, { token: i2.QuickOrderFacade }, { token: i1.WindowRef }], target: i0.ɵɵFactoryTarget.Component });
QuickOrderFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: QuickOrderFormComponent, selector: "cx-quick-order-form", inputs: { limit: "limit" }, ngImport: i0, template: "<form [formGroup]=\"form\" class=\"quick-order-form-container\">\n  <div\n    class=\"quick-order-form-input\"\n    role=\"search\"\n    [attr.aria-label]=\"'quickOrderForm.quickOrderSearch' | cxTranslate\"\n  >\n    <input\n      (blur)=\"onBlur($event)\"\n      (focus)=\"open()\"\n      (keydown.arrowdown)=\"focusNextChild($event)\"\n      (keydown.arrowup)=\"focusPreviousChild($event)\"\n      (keydown.enter)=\"addProduct($event)\"\n      (keydown.escape)=\"clear($event)\"\n      [attr.aria-label]=\"\n        'quickOrderForm.searchBoxLabel' | cxTranslate: { limit: limit }\n      \"\n      aria-controls=\"quick-order-search-results\"\n      aria-describedby=\"quickOrderFormInitialDescription\"\n      class=\"form-control\"\n      formControlName=\"product\"\n      placeholder=\"{{ 'quickOrderForm.placeholder' | cxTranslate }}\"\n      type=\"text\"\n    />\n\n    <button\n      *ngIf=\"form.get('product')?.value; else searchIcon\"\n      (click)=\"clear($event)\"\n      (keydown.enter)=\"clear($event)\"\n      [attr.aria-label]=\"'common.reset' | cxTranslate\"\n      class=\"quick-order-form-reset-icon\"\n    >\n      <cx-icon [type]=\"iconTypes.RESET\"></cx-icon>\n    </button>\n\n    <ng-template #searchIcon>\n      <button\n        [attr.aria-label]=\"'common.search' | cxTranslate\"\n        class=\"quick-order-form-search-icon\"\n        tabindex=\"-1\"\n      >\n        <cx-icon [type]=\"iconTypes.SEARCH\"></cx-icon>\n      </button>\n    </ng-template>\n\n    <span\n      *ngIf=\"!(canAddProduct() | async) && form.get('product')?.dirty\"\n      class=\"list-limit-reached-text\"\n      role=\"alert\"\n    >\n      {{ 'quickOrderForm.listLimitReached' | cxTranslate }}\n    </span>\n  </div>\n\n  <div\n    *ngIf=\"isResultsBoxOpen()\"\n    class=\"quick-order-results\"\n    role=\"dialog\"\n    id=\"quick-order-search-results\"\n  >\n    <ul\n      *ngIf=\"results.length\"\n      class=\"quick-order-results-products\"\n      role=\"listbox\"\n    >\n      <li\n        *ngFor=\"let product of results; let i = index\"\n        class=\"quick-order-results-product-container\"\n      >\n        <button\n          (blur)=\"onBlur($event)\"\n          (mousedown)=\"add(product, $event)\"\n          (keydown.arrowdown)=\"focusNextChild($event)\"\n          (keydown.arrowup)=\"focusPreviousChild($event)\"\n          (keydown.enter)=\"add(product, $event)\"\n          (keydown.escape)=\"clear($event)\"\n          [class.has-media]=\"\n            config?.quickOrder?.searchForm?.displayProductImages\n          \"\n          class=\"quick-order-results-product\"\n          role=\"option\"\n        >\n          <cx-media\n            *ngIf=\"config?.quickOrder?.searchForm?.displayProductImages\"\n            [alt]=\"product.name\"\n            [container]=\"product.images?.PRIMARY\"\n            class=\"media\"\n            format=\"thumbnail\"\n            role=\"presentation\"\n          ></cx-media>\n          <div class=\"name\" [innerHTML]=\"product.name\"></div>\n          <span class=\"id\">\n            {{\n              'quickOrderForm.id'\n                | cxTranslate\n                  : {\n                      id: product.code\n                    }\n            }}\n          </span>\n          <span class=\"price\">{{ product.price?.formattedValue }}</span>\n        </button>\n      </li>\n    </ul>\n\n    <span *ngIf=\"noResults\" class=\"quick-order-no-results\">\n      {{ 'quickOrderForm.noResults' | cxTranslate }}\n    </span>\n  </div>\n</form>\n\n<label\n  aria-live=\"polite\"\n  id=\"quickOrderFormInitialDescription\"\n  aria-atomic=\"true\"\n  class=\"cx-visually-hidden\"\n>\n  {{\n    results.length\n      ? ('quickOrderForm.productsResults'\n        | cxTranslate: { count: results.length })\n      : ''\n  }}\n  {{ 'quickOrderForm.initialDescription' | cxTranslate }}\n</label>\n", dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i4.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "directive", type: i5.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i5.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i5.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-quick-order-form', changeDetection: ChangeDetectionStrategy.OnPush, template: "<form [formGroup]=\"form\" class=\"quick-order-form-container\">\n  <div\n    class=\"quick-order-form-input\"\n    role=\"search\"\n    [attr.aria-label]=\"'quickOrderForm.quickOrderSearch' | cxTranslate\"\n  >\n    <input\n      (blur)=\"onBlur($event)\"\n      (focus)=\"open()\"\n      (keydown.arrowdown)=\"focusNextChild($event)\"\n      (keydown.arrowup)=\"focusPreviousChild($event)\"\n      (keydown.enter)=\"addProduct($event)\"\n      (keydown.escape)=\"clear($event)\"\n      [attr.aria-label]=\"\n        'quickOrderForm.searchBoxLabel' | cxTranslate: { limit: limit }\n      \"\n      aria-controls=\"quick-order-search-results\"\n      aria-describedby=\"quickOrderFormInitialDescription\"\n      class=\"form-control\"\n      formControlName=\"product\"\n      placeholder=\"{{ 'quickOrderForm.placeholder' | cxTranslate }}\"\n      type=\"text\"\n    />\n\n    <button\n      *ngIf=\"form.get('product')?.value; else searchIcon\"\n      (click)=\"clear($event)\"\n      (keydown.enter)=\"clear($event)\"\n      [attr.aria-label]=\"'common.reset' | cxTranslate\"\n      class=\"quick-order-form-reset-icon\"\n    >\n      <cx-icon [type]=\"iconTypes.RESET\"></cx-icon>\n    </button>\n\n    <ng-template #searchIcon>\n      <button\n        [attr.aria-label]=\"'common.search' | cxTranslate\"\n        class=\"quick-order-form-search-icon\"\n        tabindex=\"-1\"\n      >\n        <cx-icon [type]=\"iconTypes.SEARCH\"></cx-icon>\n      </button>\n    </ng-template>\n\n    <span\n      *ngIf=\"!(canAddProduct() | async) && form.get('product')?.dirty\"\n      class=\"list-limit-reached-text\"\n      role=\"alert\"\n    >\n      {{ 'quickOrderForm.listLimitReached' | cxTranslate }}\n    </span>\n  </div>\n\n  <div\n    *ngIf=\"isResultsBoxOpen()\"\n    class=\"quick-order-results\"\n    role=\"dialog\"\n    id=\"quick-order-search-results\"\n  >\n    <ul\n      *ngIf=\"results.length\"\n      class=\"quick-order-results-products\"\n      role=\"listbox\"\n    >\n      <li\n        *ngFor=\"let product of results; let i = index\"\n        class=\"quick-order-results-product-container\"\n      >\n        <button\n          (blur)=\"onBlur($event)\"\n          (mousedown)=\"add(product, $event)\"\n          (keydown.arrowdown)=\"focusNextChild($event)\"\n          (keydown.arrowup)=\"focusPreviousChild($event)\"\n          (keydown.enter)=\"add(product, $event)\"\n          (keydown.escape)=\"clear($event)\"\n          [class.has-media]=\"\n            config?.quickOrder?.searchForm?.displayProductImages\n          \"\n          class=\"quick-order-results-product\"\n          role=\"option\"\n        >\n          <cx-media\n            *ngIf=\"config?.quickOrder?.searchForm?.displayProductImages\"\n            [alt]=\"product.name\"\n            [container]=\"product.images?.PRIMARY\"\n            class=\"media\"\n            format=\"thumbnail\"\n            role=\"presentation\"\n          ></cx-media>\n          <div class=\"name\" [innerHTML]=\"product.name\"></div>\n          <span class=\"id\">\n            {{\n              'quickOrderForm.id'\n                | cxTranslate\n                  : {\n                      id: product.code\n                    }\n            }}\n          </span>\n          <span class=\"price\">{{ product.price?.formattedValue }}</span>\n        </button>\n      </li>\n    </ul>\n\n    <span *ngIf=\"noResults\" class=\"quick-order-no-results\">\n      {{ 'quickOrderForm.noResults' | cxTranslate }}\n    </span>\n  </div>\n</form>\n\n<label\n  aria-live=\"polite\"\n  id=\"quickOrderFormInitialDescription\"\n  aria-atomic=\"true\"\n  class=\"cx-visually-hidden\"\n>\n  {{\n    results.length\n      ? ('quickOrderForm.productsResults'\n        | cxTranslate: { count: results.length })\n      : ''\n  }}\n  {{ 'quickOrderForm.initialDescription' | cxTranslate }}\n</label>\n" }]
        }], ctorParameters: function () { return [{ type: i1.Config }, { type: i0.ChangeDetectorRef }, { type: i2.QuickOrderFacade }, { type: i1.WindowRef }]; }, propDecorators: { limit: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2stb3JkZXItZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9xdWljay1vcmRlci9jb21wb25lbnRzL3F1aWNrLW9yZGVyL2Zvcm0vcXVpY2stb3JkZXItZm9ybS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9xdWljay1vcmRlci9jb21wb25lbnRzL3F1aWNrLW9yZGVyL2Zvcm0vcXVpY2stb3JkZXItZm9ybS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsS0FBSyxHQUdOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3RFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRCxPQUFPLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFDTCxZQUFZLEVBQ1osb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTixTQUFTLEVBQ1QsSUFBSSxHQUNMLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7QUFFeEIsTUFBTSx1QkFBdUIsR0FBRyxpQ0FBaUMsQ0FBQztBQU9sRSxNQUFNLE9BQU8sdUJBQXVCO0lBWWxDLFlBQ1MsTUFBYyxFQUNYLEVBQXFCLEVBQ3JCLGlCQUFtQyxFQUNuQyxNQUFpQjtRQUhwQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ1gsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBZDdCLGNBQVMsR0FBRyxTQUFTLENBQUM7UUFDdEIsZ0JBQVcsR0FBWSxL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QUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNiO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO1lBRUQsSUFBSSxDQUFDLEVBQUUsRUFBRSxhQUFhLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ0osQ0FBQztJQUVTLFlBQVk7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVTLEtBQUs7UUFDYixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVTLHVCQUF1QjtRQUMvQixJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVTLGVBQWU7UUFDdkIsT0FBTyxJQUFJLENBQUMsaUJBQWlCO2FBQzFCLGVBQWUsRUFBRTthQUNqQixTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7O29IQTNSVSx1QkFBdUI7d0dBQXZCLHVCQUF1Qix1RkNsQ3BDLDJ4SEE0SEE7MkZEMUZhLHVCQUF1QjtrQkFMbkMsU0FBUzsrQkFDRSxxQkFBcUIsbUJBRWQsdUJBQXVCLENBQUMsTUFBTTtvTEFTdEMsS0FBSztzQkFBYixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVbnR5cGVkRm9ybUNvbnRyb2wsIFVudHlwZWRGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBRdWlja09yZGVyRmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L3F1aWNrLW9yZGVyL3Jvb3QnO1xuaW1wb3J0IHsgQ29uZmlnLCBQcm9kdWN0LCBXaW5kb3dSZWYgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgSUNPTl9UWVBFIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZGVib3VuY2VUaW1lLFxuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgZmlsdGVyLFxuICBzd2l0Y2hNYXAsXG4gIHRha2UsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuY29uc3QgU0VBUkNIX0JPWF9BQ1RJVkVfQ0xBU1MgPSAncXVpY2stb3JkZXItc2VhcmNoYm94LWlzLWFjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LXF1aWNrLW9yZGVyLWZvcm0nLFxuICB0ZW1wbGF0ZVVybDogJy4vcXVpY2stb3JkZXItZm9ybS5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBRdWlja09yZGVyRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgZm9ybTogVW50eXBlZEZvcm1Hcm91cDtcbiAgaWNvblR5cGVzID0gSUNPTl9UWVBFO1xuICBpc1NlYXJjaGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBub1Jlc3VsdHM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcmVzdWx0czogUHJvZHVjdFtdID0gW107XG5cbiAgQElucHV0KCkgbGltaXQ6IG51bWJlcjtcblxuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICBwcm90ZWN0ZWQgc2VhcmNoU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBjb25maWc6IENvbmZpZyxcbiAgICBwcm90ZWN0ZWQgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByb3RlY3RlZCBxdWlja09yZGVyU2VydmljZTogUXVpY2tPcmRlckZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgd2luUmVmOiBXaW5kb3dSZWZcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuYnVpbGRGb3JtKCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKHRoaXMud2F0Y2hQcm9kdWN0QWRkKCkpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZCh0aGlzLndhdGNoUXVlcnlDaGFuZ2UoKSk7XG4gIH1cblxuICBvbkJsdXIoZXZlbnQ6IFVJRXZlbnQpOiB2b2lkIHtcbiAgICAvLyBVc2UgdGltZW91dCB0byBkZXRlY3QgY2hhbmdlc1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmlzU3VnZ2VzdGlvbkZvY3VzZWQoKSkge1xuICAgICAgICB0aGlzLmJsdXJTdWdnZXN0aW9uQm94KGV2ZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNsZWFyKGV2ZW50PzogRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudD8ucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmICh0aGlzLmlzUmVzdWx0c0JveE9wZW4oKSkge1xuICAgICAgdGhpcy50b2dnbGVCb2R5Q2xhc3MoU0VBUkNIX0JPWF9BQ1RJVkVfQ0xBU1MsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9kdWN0ID0gdGhpcy5mb3JtLmdldCgncHJvZHVjdCcpPy52YWx1ZTtcblxuICAgIGlmICghIXByb2R1Y3QpIHtcbiAgICAgIHRoaXMuZm9ybS5yZXNldCgpO1xuICAgIH1cblxuICAgIC8vIFdlIGhhdmUgdG8gY2FsbCAnY2xvc2UnIG1ldGhvZCBldmVyeSB0aW1lIHRvIG1ha2Ugc3VyZSByZXN1bHRzIGxpc3QgaXMgZW1wdHkgYW5kIGNhbGwgZGV0ZWN0Q2hhbmdlcyB0byBjaGFuZ2UgaWNvbiB0eXBlIGluIGZvcm1cbiAgICB0aGlzLmNsb3NlKCk7XG4gICAgdGhpcy5jZD8uZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgYWRkKHByb2R1Y3Q6IFByb2R1Y3QsIGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50Py5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy8gVE9ETyBjaGFuZ2UgdG8gbm9ucHVyY2hhc2FibGUgZmxhZyBvbmNlIHdlIHdpbGwgc3VwcG9ydCBtdWx0aWRpbWVuc2lvbmFsIHByb2R1Y3RzIGluIHNlYXJjaCBhbmQgd2hlbiB0aGUgcHVyY2hhc2FibGUgZmxhZyB3aWxsIGJlIGF2YWlsYWJsZSBpbiBzZWFyY2ggcHJvZHVjdCByZXNwb25zZVxuXG4gICAgLy8gQ2hlY2sgaWYgcHJvZHVjdCBpcyBwdXJjaGFzYWJsZSAvIG5vbiBtdWx0aWRpbWVuc2lvbmFsXG4gICAgaWYgKHByb2R1Y3QubXVsdGlkaW1lbnNpb25hbCkge1xuICAgICAgdGhpcy5xdWlja09yZGVyU2VydmljZS5zZXROb25QdXJjaGFzYWJsZVByb2R1Y3RFcnJvcihwcm9kdWN0KTtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5xdWlja09yZGVyU2VydmljZS5jbGVhck5vblB1cmNoYXNhYmxlUHJvZHVjdEVycm9yKCk7XG4gICAgfVxuXG4gICAgdGhpcy5xdWlja09yZGVyU2VydmljZS5hZGRQcm9kdWN0KHByb2R1Y3QpO1xuICB9XG5cbiAgYWRkUHJvZHVjdChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLnF1aWNrT3JkZXJTZXJ2aWNlXG4gICAgICAuY2FuQWRkKClcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKChjYW5BZGQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgaWYgKGNhbkFkZCkge1xuICAgICAgICAgIC8vIEFkZCBwcm9kdWN0IGlmIHRoZXJlIGlzIG9ubHkgb25lIGluIHRoZSByZXN1bHQgbGlzdFxuICAgICAgICAgIGlmICh0aGlzLnJlc3VsdHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmFkZCh0aGlzLnJlc3VsdHNbMF0sIGV2ZW50KTtcbiAgICAgICAgICAgIC8vIEFkZCBwcm9kdWN0IGlmIHRoZXJlIGlzIGZvY3VzIG9uIGl0XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmdldEZvY3VzZWRJbmRleCgpICE9PSAtMSkge1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdCA9IHRoaXMucmVzdWx0c1t0aGlzLmdldEZvY3VzZWRJbmRleCgpXTtcbiAgICAgICAgICAgIHRoaXMuYWRkKHByb2R1Y3QsIGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgZm9jdXNOZXh0Q2hpbGQoZXZlbnQ6IFVJRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBOZWdhdGUgbm9ybWFsIGtleXNjcm9sbFxuICAgIGlmICghdGhpcy5yZXN1bHRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IFtyZXN1bHRzLCBmb2N1c2VkSW5kZXhdID0gW1xuICAgICAgdGhpcy5nZXRSZXN1bHRFbGVtZW50cygpLFxuICAgICAgdGhpcy5nZXRGb2N1c2VkSW5kZXgoKSxcbiAgICBdO1xuXG4gICAgLy8gRm9jdXMgb24gZmlyc3QgaW5kZXggbW92aW5nIHRvIGxhc3RcbiAgICBpZiAocmVzdWx0cy5sZW5ndGgpIHtcbiAgICAgIGlmIChmb2N1c2VkSW5kZXggPj0gcmVzdWx0cy5sZW5ndGggLSAxKSB7XG4gICAgICAgIHJlc3VsdHNbMF0uZm9jdXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdHNbZm9jdXNlZEluZGV4ICsgMV0uZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb2N1c1ByZXZpb3VzQ2hpbGQoZXZlbnQ6IFVJRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBOZWdhdGUgbm9ybWFsIGtleXNjcm9sbFxuICAgIGlmICghdGhpcy5yZXN1bHRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IFtyZXN1bHRzLCBmb2N1c2VkSW5kZXhdID0gW1xuICAgICAgdGhpcy5nZXRSZXN1bHRFbGVtZW50cygpLFxuICAgICAgdGhpcy5nZXRGb2N1c2VkSW5kZXgoKSxcbiAgICBdO1xuXG4gICAgLy8gRm9jdXMgb24gbGFzdCBpbmRleCBtb3ZpbmcgdG8gZmlyc3RcbiAgICBpZiAocmVzdWx0cy5sZW5ndGgpIHtcbiAgICAgIGlmIChmb2N1c2VkSW5kZXggPCAxKSB7XG4gICAgICAgIHJlc3VsdHNbcmVzdWx0cy5sZW5ndGggLSAxXS5mb2N1cygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0c1tmb2N1c2VkSW5kZXggLSAxXS5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlzUmVzdWx0c0JveE9wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMud2luUmVmXG4gICAgICA/ICEhdGhpcy53aW5SZWYuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7U0VBUkNIX0JPWF9BQ1RJVkVfQ0xBU1N9YClcbiAgICAgIDogZmFsc2U7XG4gIH1cblxuICBjYW5BZGRQcm9kdWN0KCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnF1aWNrT3JkZXJTZXJ2aWNlLmNhbkFkZCgpO1xuICB9XG5cbiAgb3BlbigpOiB2b2lkIHtcbiAgICB0aGlzLnRvZ2dsZUJvZHlDbGFzcyhTRUFSQ0hfQk9YX0FDVElWRV9DTEFTUywgdHJ1ZSk7XG4gIH1cblxuICAvLyBSZXR1cm4gcmVzdWx0IGxpc3QgYXMgSFRNTEVsZW1lbnQgYXJyYXlcbiAgcHJvdGVjdGVkIGdldFJlc3VsdEVsZW1lbnRzKCk6IEhUTUxFbGVtZW50W10ge1xuICAgIGlmICh0aGlzLndpblJlZikge1xuICAgICAgcmV0dXJuIEFycmF5LmZyb20oXG4gICAgICAgIHRoaXMud2luUmVmLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgJy5xdWljay1vcmRlci1yZXN1bHRzLXByb2R1Y3RzID4gbGkgYnV0dG9uJ1xuICAgICAgICApXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGJsdXJTdWdnZXN0aW9uQm94KGV2ZW50OiBVSUV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy50b2dnbGVCb2R5Q2xhc3MoU0VBUkNIX0JPWF9BQ1RJVkVfQ0xBU1MsIGZhbHNlKTtcblxuICAgIGlmIChldmVudCAmJiBldmVudC50YXJnZXQpIHtcbiAgICAgICg8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0KS5ibHVyKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJuIGZvY3VzZWQgZWxlbWVudCBhcyBIVE1MRWxlbWVudFxuICBwcm90ZWN0ZWQgZ2V0Rm9jdXNlZEVsZW1lbnQoKTogSFRNTEVsZW1lbnQgfCBhbnkge1xuICAgIGlmICh0aGlzLndpblJlZikge1xuICAgICAgcmV0dXJuIDxIVE1MRWxlbWVudD50aGlzLndpblJlZi5kb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRGb2N1c2VkSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5nZXRSZXN1bHRFbGVtZW50cygpLmluZGV4T2YodGhpcy5nZXRGb2N1c2VkRWxlbWVudCgpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc1N1Z2dlc3Rpb25Gb2N1c2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdldFJlc3VsdEVsZW1lbnRzKCkuaW5jbHVkZXModGhpcy5nZXRGb2N1c2VkRWxlbWVudCgpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCB0b2dnbGVCb2R5Q2xhc3MoY2xhc3NOYW1lOiBzdHJpbmcsIGFkZD86IGJvb2xlYW4pIHtcbiAgICAvLyBUT0RPKCMxNDA1OCk6IFJlbW92ZSBjb25kaXRpb25cbiAgICBpZiAodGhpcy53aW5SZWYpIHtcbiAgICAgIGlmIChhZGQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLndpblJlZi5kb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZFxuICAgICAgICAgID8gdGhpcy53aW5SZWYuZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSlcbiAgICAgICAgICA6IHRoaXMud2luUmVmLmRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBidWlsZEZvcm0oKSB7XG4gICAgY29uc3QgZm9ybSA9IG5ldyBVbnR5cGVkRm9ybUdyb3VwKHt9KTtcbiAgICBmb3JtLnNldENvbnRyb2woJ3Byb2R1Y3QnLCBuZXcgVW50eXBlZEZvcm1Db250cm9sKG51bGwpKTtcblxuICAgIHRoaXMuZm9ybSA9IGZvcm07XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNFbXB0eShzdHJpbmc/OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gc3RyaW5nPy50cmltKCkgPT09ICcnIHx8IHN0cmluZyA9PSBudWxsO1xuICB9XG5cbiAgcHJvdGVjdGVkIHdhdGNoUXVlcnlDaGFuZ2UoKTogU3Vic2NyaXB0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgIGRlYm91bmNlVGltZSgzMDApLFxuICAgICAgICBmaWx0ZXIoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuY29uZmlnPy5xdWlja09yZGVyPy5zZWFyY2hGb3JtKSB7XG4gICAgICAgICAgICAvL0NoZWNrIGlmIGlucHV0IHRvIHF1aWNrIG9yZGVyIGlzIGFuIGVtcHR5IGFmdGVyIGRlbGV0aW5nIGlucHV0IG1hbnVhbGx5XG4gICAgICAgICAgICBpZiAodGhpcy5pc0VtcHR5KHZhbHVlLnByb2R1Y3QpKSB7XG4gICAgICAgICAgICAgIC8vQ2xlYXIgcmVjb21tZW5kYXRpb24gcmVzdWx0cyBvbiBlbXB0eSBzdHJpbmdcbiAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAhIXZhbHVlLnByb2R1Y3QgJiZcbiAgICAgICAgICAgICAgdmFsdWUucHJvZHVjdC5sZW5ndGggPj1cbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5xdWlja09yZGVyPy5zZWFyY2hGb3JtPy5taW5DaGFyYWN0ZXJzQmVmb3JlUmVxdWVzdFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLnNlYXJjaFByb2R1Y3RzKHZhbHVlLnByb2R1Y3QpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2VhcmNoUHJvZHVjdHMocXVlcnk6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc2VhcmNoU3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMuY2FuQWRkUHJvZHVjdCgpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcihCb29sZWFuKSxcbiAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT5cbiAgICAgICAgICAgIHRoaXMucXVpY2tPcmRlclNlcnZpY2VcbiAgICAgICAgICAgICAgLnNlYXJjaFByb2R1Y3RzKFxuICAgICAgICAgICAgICAgIHF1ZXJ5LFxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnPy5xdWlja09yZGVyPy5zZWFyY2hGb3JtPy5tYXhQcm9kdWN0c1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKHByb2R1Y3RzKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZXN1bHRzID0gcHJvZHVjdHM7XG5cbiAgICAgICAgICBpZiAodGhpcy5yZXN1bHRzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5ub1Jlc3VsdHMgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5vUmVzdWx0cyA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5jZD8uZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY2xlYXJSZXN1bHRzKCk6IHZvaWQge1xuICAgIHRoaXMucmVzdWx0cyA9IFtdO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMucmVzZXRTZWFyY2hTdWJzY3JpcHRpb24oKTtcbiAgICB0aGlzLmNsZWFyUmVzdWx0cygpO1xuICAgIHRoaXMubm9SZXN1bHRzID0gZmFsc2U7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVzZXRTZWFyY2hTdWJzY3JpcHRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5zZWFyY2hTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnNlYXJjaFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgfVxuXG4gIHByb3RlY3RlZCB3YXRjaFByb2R1Y3RBZGQoKTogU3Vic2NyaXB0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5xdWlja09yZGVyU2VydmljZVxuICAgICAgLmdldFByb2R1Y3RBZGRlZCgpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xlYXIoKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCI8Zm9ybSBbZm9ybUdyb3VwXT1cImZvcm1cIiBjbGFzcz1cInF1aWNrLW9yZGVyLWZvcm0tY29udGFpbmVyXCI+XG4gIDxkaXZcbiAgICBjbGFzcz1cInF1aWNrLW9yZGVyLWZvcm0taW5wdXRcIlxuICAgIHJvbGU9XCJzZWFyY2hcIlxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiJ3F1aWNrT3JkZXJGb3JtLnF1aWNrT3JkZXJTZWFyY2gnIHwgY3hUcmFuc2xhdGVcIlxuICA+XG4gICAgPGlucHV0XG4gICAgICAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiXG4gICAgICAoZm9jdXMpPVwib3BlbigpXCJcbiAgICAgIChrZXlkb3duLmFycm93ZG93bik9XCJmb2N1c05leHRDaGlsZCgkZXZlbnQpXCJcbiAgICAgIChrZXlkb3duLmFycm93dXApPVwiZm9jdXNQcmV2aW91c0NoaWxkKCRldmVudClcIlxuICAgICAgKGtleWRvd24uZW50ZXIpPVwiYWRkUHJvZHVjdCgkZXZlbnQpXCJcbiAgICAgIChrZXlkb3duLmVzY2FwZSk9XCJjbGVhcigkZXZlbnQpXCJcbiAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiXG4gICAgICAgICdxdWlja09yZGVyRm9ybS5zZWFyY2hCb3hMYWJlbCcgfCBjeFRyYW5zbGF0ZTogeyBsaW1pdDogbGltaXQgfVxuICAgICAgXCJcbiAgICAgIGFyaWEtY29udHJvbHM9XCJxdWljay1vcmRlci1zZWFyY2gtcmVzdWx0c1wiXG4gICAgICBhcmlhLWRlc2NyaWJlZGJ5PVwicXVpY2tPcmRlckZvcm1Jbml0aWFsRGVzY3JpcHRpb25cIlxuICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgZm9ybUNvbnRyb2xOYW1lPVwicHJvZHVjdFwiXG4gICAgICBwbGFjZWhvbGRlcj1cInt7ICdxdWlja09yZGVyRm9ybS5wbGFjZWhvbGRlcicgfCBjeFRyYW5zbGF0ZSB9fVwiXG4gICAgICB0eXBlPVwidGV4dFwiXG4gICAgLz5cblxuICAgIDxidXR0b25cbiAgICAgICpuZ0lmPVwiZm9ybS5nZXQoJ3Byb2R1Y3QnKT8udmFsdWU7IGVsc2Ugc2VhcmNoSWNvblwiXG4gICAgICAoY2xpY2spPVwiY2xlYXIoJGV2ZW50KVwiXG4gICAgICAoa2V5ZG93bi5lbnRlcik9XCJjbGVhcigkZXZlbnQpXCJcbiAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiJ2NvbW1vbi5yZXNldCcgfCBjeFRyYW5zbGF0ZVwiXG4gICAgICBjbGFzcz1cInF1aWNrLW9yZGVyLWZvcm0tcmVzZXQtaWNvblwiXG4gICAgPlxuICAgICAgPGN4LWljb24gW3R5cGVdPVwiaWNvblR5cGVzLlJFU0VUXCI+PC9jeC1pY29uPlxuICAgIDwvYnV0dG9uPlxuXG4gICAgPG5nLXRlbXBsYXRlICNzZWFyY2hJY29uPlxuICAgICAgPGJ1dHRvblxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIidjb21tb24uc2VhcmNoJyB8IGN4VHJhbnNsYXRlXCJcbiAgICAgICAgY2xhc3M9XCJxdWljay1vcmRlci1mb3JtLXNlYXJjaC1pY29uXCJcbiAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICA+XG4gICAgICAgIDxjeC1pY29uIFt0eXBlXT1cImljb25UeXBlcy5TRUFSQ0hcIj48L2N4LWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPHNwYW5cbiAgICAgICpuZ0lmPVwiIShjYW5BZGRQcm9kdWN0KCkgfCBhc3luYykgJiYgZm9ybS5nZXQoJ3Byb2R1Y3QnKT8uZGlydHlcIlxuICAgICAgY2xhc3M9XCJsaXN0LWxpbWl0LXJlYWNoZWQtdGV4dFwiXG4gICAgICByb2xlPVwiYWxlcnRcIlxuICAgID5cbiAgICAgIHt7ICdxdWlja09yZGVyRm9ybS5saXN0TGltaXRSZWFjaGVkJyB8IGN4VHJhbnNsYXRlIH19XG4gICAgPC9zcGFuPlxuICA8L2Rpdj5cblxuICA8ZGl2XG4gICAgKm5nSWY9XCJpc1Jlc3VsdHNCb3hPcGVuKClcIlxuICAgIGNsYXNzPVwicXVpY2stb3JkZXItcmVzdWx0c1wiXG4gICAgcm9sZT1cImRpYWxvZ1wiXG4gICAgaWQ9XCJxdWljay1vcmRlci1zZWFyY2gtcmVzdWx0c1wiXG4gID5cbiAgICA8dWxcbiAgICAgICpuZ0lmPVwicmVzdWx0cy5sZW5ndGhcIlxuICAgICAgY2xhc3M9XCJxdWljay1vcmRlci1yZXN1bHRzLXByb2R1Y3RzXCJcbiAgICAgIHJvbGU9XCJsaXN0Ym94XCJcbiAgICA+XG4gICAgICA8bGlcbiAgICAgICAgKm5nRm9yPVwibGV0IHByb2R1Y3Qgb2YgcmVzdWx0czsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgIGNsYXNzPVwicXVpY2stb3JkZXItcmVzdWx0cy1wcm9kdWN0LWNvbnRhaW5lclwiXG4gICAgICA+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgKG1vdXNlZG93bik9XCJhZGQocHJvZHVjdCwgJGV2ZW50KVwiXG4gICAgICAgICAgKGtleWRvd24uYXJyb3dkb3duKT1cImZvY3VzTmV4dENoaWxkKCRldmVudClcIlxuICAgICAgICAgIChrZXlkb3duLmFycm93dXApPVwiZm9jdXNQcmV2aW91c0NoaWxkKCRldmVudClcIlxuICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cImFkZChwcm9kdWN0LCAkZXZlbnQpXCJcbiAgICAgICAgICAoa2V5ZG93bi5lc2NhcGUpPVwiY2xlYXIoJGV2ZW50KVwiXG4gICAgICAgICAgW2NsYXNzLmhhcy1tZWRpYV09XCJcbiAgICAgICAgICAgIGNvbmZpZz8ucXVpY2tPcmRlcj8uc2VhcmNoRm9ybT8uZGlzcGxheVByb2R1Y3RJbWFnZXNcbiAgICAgICAgICBcIlxuICAgICAgICAgIGNsYXNzPVwicXVpY2stb3JkZXItcmVzdWx0cy1wcm9kdWN0XCJcbiAgICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxjeC1tZWRpYVxuICAgICAgICAgICAgKm5nSWY9XCJjb25maWc/LnF1aWNrT3JkZXI/LnNlYXJjaEZvcm0/LmRpc3BsYXlQcm9kdWN0SW1hZ2VzXCJcbiAgICAgICAgICAgIFthbHRdPVwicHJvZHVjdC5uYW1lXCJcbiAgICAgICAgICAgIFtjb250YWluZXJdPVwicHJvZHVjdC5pbWFnZXM/LlBSSU1BUllcIlxuICAgICAgICAgICAgY2xhc3M9XCJtZWRpYVwiXG4gICAgICAgICAgICBmb3JtYXQ9XCJ0aHVtYm5haWxcIlxuICAgICAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICAgICAgPjwvY3gtbWVkaWE+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWVcIiBbaW5uZXJIVE1MXT1cInByb2R1Y3QubmFtZVwiPjwvZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWRcIj5cbiAgICAgICAgICAgIHt7XG4gICAgICAgICAgICAgICdxdWlja09yZGVyRm9ybS5pZCdcbiAgICAgICAgICAgICAgICB8IGN4VHJhbnNsYXRlXG4gICAgICAgICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZDogcHJvZHVjdC5jb2RlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJpY2VcIj57eyBwcm9kdWN0LnByaWNlPy5mb3JtYXR0ZWRWYWx1ZSB9fTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG5cbiAgICA8c3BhbiAqbmdJZj1cIm5vUmVzdWx0c1wiIGNsYXNzPVwicXVpY2stb3JkZXItbm8tcmVzdWx0c1wiPlxuICAgICAge3sgJ3F1aWNrT3JkZXJGb3JtLm5vUmVzdWx0cycgfCBjeFRyYW5zbGF0ZSB9fVxuICAgIDwvc3Bhbj5cbiAgPC9kaXY+XG48L2Zvcm0+XG5cbjxsYWJlbFxuICBhcmlhLWxpdmU9XCJwb2xpdGVcIlxuICBpZD1cInF1aWNrT3JkZXJGb3JtSW5pdGlhbERlc2NyaXB0aW9uXCJcbiAgYXJpYS1hdG9taWM9XCJ0cnVlXCJcbiAgY2xhc3M9XCJjeC12aXN1YWxseS1oaWRkZW5cIlxuPlxuICB7e1xuICAgIHJlc3VsdHMubGVuZ3RoXG4gICAgICA/ICgncXVpY2tPcmRlckZvcm0ucHJvZHVjdHNSZXN1bHRzJ1xuICAgICAgICB8IGN4VHJhbnNsYXRlOiB7IGNvdW50OiByZXN1bHRzLmxlbmd0aCB9KVxuICAgICAgOiAnJ1xuICB9fVxuICB7eyAncXVpY2tPcmRlckZvcm0uaW5pdGlhbERlc2NyaXB0aW9uJyB8IGN4VHJhbnNsYXRlIH19XG48L2xhYmVsPlxuIl19