import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, NgModule, inject, isDevMode, Injectable, Input, ViewChild } from '@angular/core';
import * as i3 from '@angular/forms';
import { Validators, ReactiveFormsModule, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import * as i1 from '@spartacus/cart/base/root';
import { CartAddEntrySuccessEvent, CartAddEntryFailEvent, OrderEntriesSource, ProductImportStatus } from '@spartacus/cart/base/root';
import * as i2 from '@spartacus/core';
import { GlobalMessageType, I18nModule, provideDefaultConfig, LoggerService, UrlModule } from '@spartacus/core';
import { Subscription, merge, of, combineLatest, BehaviorSubject } from 'rxjs';
import { map, first, switchMap, filter, tap, catchError, mergeAll, take, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import * as i6 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2$1 from '@spartacus/storefront';
import { FormErrorsModule, ICON_TYPE, AtMessageModule, IconModule, ItemCounterModule, MediaModule, MessageComponentModule, ProgressButtonModule } from '@spartacus/storefront';
import * as i1$1 from '@spartacus/cart/quick-order/root';
import { QuickOrderOrderEntriesContextToken } from '@spartacus/cart/quick-order/root';
import * as i4 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i5 from '@spartacus/cart/quick-order/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartQuickOrderFormComponent {
    constructor(activeCartService, eventService, formBuilder, globalMessageService) {
        this.activeCartService = activeCartService;
        this.eventService = eventService;
        this.formBuilder = formBuilder;
        this.globalMessageService = globalMessageService;
        this.cartIsLoading$ = this.activeCartService
            .isStable()
            .pipe(map((loaded) => !loaded));
        this.cart$ = this.activeCartService.getActive();
        this.min = 1;
        this.subscription = new Subscription();
        this.cartEventsSubscription = new Subscription();
        this.minQuantityValue = 1;
    }
    ngOnInit() {
        this.buildForm();
        this.watchQuantityChange();
    }
    ngOnDestroy() {
        var _a, _b;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.cartEventsSubscription) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    }
    applyQuickOrder() {
        var _a, _b;
        if (this.quickOrderForm.invalid) {
            this.quickOrderForm.markAllAsTouched();
            return;
        }
        const productCode = (_a = this.quickOrderForm.get('productCode')) === null || _a === void 0 ? void 0 : _a.value;
        const quantity = (_b = this.quickOrderForm.get('quantity')) === null || _b === void 0 ? void 0 : _b.value;
        this.watchAddEntrySuccessEvent();
        this.watchAddEntryFailEvent();
        if (productCode && quantity) {
            this.activeCartService.addEntry(productCode, quantity);
        }
    }
    buildForm() {
        this.quickOrderForm = this.formBuilder.group({
            productCode: ['', [Validators.required]],
            quantity: [
                this.minQuantityValue,
                { updateOn: 'blur', validators: [Validators.required] },
            ],
        });
    }
    watchQuantityChange() {
        var _a;
        this.subscription.add((_a = this.quickOrderForm
            .get('quantity')) === null || _a === void 0 ? void 0 : _a.valueChanges.subscribe((value) => {
            var _a;
            return (_a = this.quickOrderForm
                .get('quantity')) === null || _a === void 0 ? void 0 : _a.setValue(this.getValidCount(value), { emitEvent: false });
        }));
    }
    watchAddEntrySuccessEvent() {
        this.cartEventsSubscription.add(this.eventService
            .get(CartAddEntrySuccessEvent)
            .pipe(first())
            .subscribe((data) => {
            var _a, _b;
            let key = 'quickOrderCartForm.stockLevelReached';
            let productTranslation;
            let messageType = GlobalMessageType.MSG_TYPE_WARNING;
            if (data.quantityAdded) {
                key =
                    data.quantityAdded > 1
                        ? 'quickOrderCartForm.entriesWereAdded'
                        : 'quickOrderCartForm.entryWasAdded';
                productTranslation =
                    data.quantityAdded > 1
                        ? 'quickOrderCartForm.products'
                        : 'quickOrderCartForm.product';
                messageType = GlobalMessageType.MSG_TYPE_CONFIRMATION;
            }
            this.globalMessageService.add({
                key,
                params: {
                    product: ((_b = (_a = data === null || data === void 0 ? void 0 : data.entry) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.name) || productTranslation,
                    quantity: data.quantityAdded,
                },
            }, messageType);
            this.resetForm();
        }));
    }
    watchAddEntryFailEvent() {
        this.cartEventsSubscription.add(this.eventService
            .get(CartAddEntryFailEvent)
            .pipe(first())
            .subscribe(() => {
            this.globalMessageService.add({
                key: 'quickOrderCartForm.noResults',
            }, GlobalMessageType.MSG_TYPE_ERROR);
        }));
    }
    getValidCount(value) {
        if (value < this.min || !value) {
            value = this.min;
        }
        return value;
    }
    resetForm() {
        this.quickOrderForm.reset();
    }
}
CartQuickOrderFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartQuickOrderFormComponent, deps: [{ token: i1.ActiveCartFacade }, { token: i2.EventService }, { token: i3.UntypedFormBuilder }, { token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Component });
CartQuickOrderFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CartQuickOrderFormComponent, selector: "cx-cart-quick-order-form", ngImport: i0, template: "<ng-container *ngIf=\"cart$ | async as cart\">\n  <div class=\"cx-cart-quick-order-form-title\">\n    {{ 'quickOrderCartForm.title' | cxTranslate }}\n  </div>\n  <div class=\"form-group\">\n    <form (ngSubmit)=\"applyQuickOrder()\" [formGroup]=\"quickOrderForm\">\n      <div class=\"cx-cart-quick-order-form-container\">\n        <span class=\"cx-cart-quick-order-form-productID\">\n          <label class=\"cx-cart-quick-order-form-label\">\n            {{ 'quickOrderCartForm.productCodeLabel' | cxTranslate }}\n          </label>\n          <input\n            [attr.aria-label]=\"\n              'quickOrderCartForm.entryProductCode' | cxTranslate\n            \"\n            aria-required=\"true\"\n            class=\"form-control input-product-code\"\n            formControlName=\"productCode\"\n            required=\"true\"\n            placeholder=\"{{\n              'quickOrderCartForm.productCodePlaceholder' | cxTranslate\n            }}\"\n            type=\"text\"\n          />\n        </span>\n\n        <span class=\"cx-cart-quick-order-form-qty\">\n          <label class=\"cx-cart-quick-order-form-label\">\n            {{ 'quickOrderCartForm.quantityLabel' | cxTranslate }}\n          </label>\n          <input\n            [attr.aria-label]=\"'quickOrderCartForm.quantity' | cxTranslate\"\n            aria-required=\"true\"\n            class=\"form-control input-quantity\"\n            formControlName=\"quantity\"\n            required=\"true\"\n            type=\"number\"\n          />\n        </span>\n        <button\n          [attr.aria-label]=\"'quickOrderCartForm.addToCart' | cxTranslate\"\n          [class.disabled]=\"cartIsLoading$ | async\"\n          [disabled]=\"cartIsLoading$ | async\"\n          class=\"btn btn-block btn-secondary apply-quick-order-button\"\n          type=\"submit\"\n        >\n          {{ 'quickOrderCartForm.add' | cxTranslate }}\n        </button>\n        <cx-form-errors\n          [control]=\"quickOrderForm.get('productCode')\"\n        ></cx-form-errors>\n        <cx-form-errors\n          [control]=\"quickOrderForm.get('quantity')\"\n        ></cx-form-errors>\n      </div>\n    </form></div\n></ng-container>\n", dependencies: [{ kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i2$1.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartQuickOrderFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-cart-quick-order-form', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"cart$ | async as cart\">\n  <div class=\"cx-cart-quick-order-form-title\">\n    {{ 'quickOrderCartForm.title' | cxTranslate }}\n  </div>\n  <div class=\"form-group\">\n    <form (ngSubmit)=\"applyQuickOrder()\" [formGroup]=\"quickOrderForm\">\n      <div class=\"cx-cart-quick-order-form-container\">\n        <span class=\"cx-cart-quick-order-form-productID\">\n          <label class=\"cx-cart-quick-order-form-label\">\n            {{ 'quickOrderCartForm.productCodeLabel' | cxTranslate }}\n          </label>\n          <input\n            [attr.aria-label]=\"\n              'quickOrderCartForm.entryProductCode' | cxTranslate\n            \"\n            aria-required=\"true\"\n            class=\"form-control input-product-code\"\n            formControlName=\"productCode\"\n            required=\"true\"\n            placeholder=\"{{\n              'quickOrderCartForm.productCodePlaceholder' | cxTranslate\n            }}\"\n            type=\"text\"\n          />\n        </span>\n\n        <span class=\"cx-cart-quick-order-form-qty\">\n          <label class=\"cx-cart-quick-order-form-label\">\n            {{ 'quickOrderCartForm.quantityLabel' | cxTranslate }}\n          </label>\n          <input\n            [attr.aria-label]=\"'quickOrderCartForm.quantity' | cxTranslate\"\n            aria-required=\"true\"\n            class=\"form-control input-quantity\"\n            formControlName=\"quantity\"\n            required=\"true\"\n            type=\"number\"\n          />\n        </span>\n        <button\n          [attr.aria-label]=\"'quickOrderCartForm.addToCart' | cxTranslate\"\n          [class.disabled]=\"cartIsLoading$ | async\"\n          [disabled]=\"cartIsLoading$ | async\"\n          class=\"btn btn-block btn-secondary apply-quick-order-button\"\n          type=\"submit\"\n        >\n          {{ 'quickOrderCartForm.add' | cxTranslate }}\n        </button>\n        <cx-form-errors\n          [control]=\"quickOrderForm.get('productCode')\"\n        ></cx-form-errors>\n        <cx-form-errors\n          [control]=\"quickOrderForm.get('quantity')\"\n        ></cx-form-errors>\n      </div>\n    </form></div\n></ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.EventService }, { type: i3.UntypedFormBuilder }, { type: i2.GlobalMessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartQuickOrderFormModule {
}
CartQuickOrderFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartQuickOrderFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartQuickOrderFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartQuickOrderFormModule, declarations: [CartQuickOrderFormComponent], imports: [CommonModule, ReactiveFormsModule, I18nModule, FormErrorsModule], exports: [CartQuickOrderFormComponent] });
CartQuickOrderFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartQuickOrderFormModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CartQuickOrderFormComponent: {
                    component: CartQuickOrderFormComponent,
                },
            },
        }),
    ], imports: [CommonModule, ReactiveFormsModule, I18nModule, FormErrorsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartQuickOrderFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ReactiveFormsModule, I18nModule, FormErrorsModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CartQuickOrderFormComponent: {
                                    component: CartQuickOrderFormComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [CartQuickOrderFormComponent],
                    exports: [CartQuickOrderFormComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

class QuickOrderOrderEntriesContext {
    constructor(quickOrderService, productConnector) {
        this.quickOrderService = quickOrderService;
        this.productConnector = productConnector;
        this.type = OrderEntriesSource.QUICK_ORDER;
        this.logger = inject(LoggerService);
    }
    getEntries() {
        return this.quickOrderService.getEntries();
    }
    addEntries(productsData) {
        return merge(productsData.map((productData) => this.quickOrderService
            .canAdd(productData.productCode, productsData)
            .pipe(switchMap((canAdd) => {
            if (canAdd) {
                return this.productConnector.get(productData.productCode).pipe(filter((product) => !!product), tap((product) => {
                    this.quickOrderService.addProduct(product, productData.quantity);
                }), map((product) => this.handleResults(product, productData)), catchError((response) => {
                    return of(this.handleErrors(response, productData.productCode));
                }));
            }
            else {
                return of({
                    productCode: productData.productCode,
                    statusCode: ProductImportStatus.LIMIT_EXCEEDED,
                });
            }
        })))).pipe(mergeAll(), take(productsData.length));
    }
    handleResults(product, productData) {
        var _a, _b;
        if (((_a = product.stock) === null || _a === void 0 ? void 0 : _a.stockLevel) &&
            productData.quantity > product.stock.stockLevel) {
            return {
                productCode: productData.productCode,
                productName: product === null || product === void 0 ? void 0 : product.name,
                statusCode: ProductImportStatus.LOW_STOCK,
                quantity: productData.quantity,
                quantityAdded: product.stock.stockLevel,
            };
        }
        else if (((_b = product.stock) === null || _b === void 0 ? void 0 : _b.stockLevelStatus) === 'outOfStock') {
            return {
                productCode: productData.productCode,
                statusCode: ProductImportStatus.NO_STOCK,
                productName: product === null || product === void 0 ? void 0 : product.name,
            };
        }
        else {
            return {
                productCode: productData.productCode,
                statusCode: ProductImportStatus.SUCCESS,
            };
        }
    }
    handleErrors(response, productCode) {
        var _a;
        if (((_a = response === null || response === void 0 ? void 0 : response.error) === null || _a === void 0 ? void 0 : _a.errors[0].type) === 'UnknownIdentifierError') {
            return {
                productCode,
                statusCode: ProductImportStatus.UNKNOWN_IDENTIFIER,
            };
        }
        else {
            if (isDevMode()) {
                this.logger.warn('Unrecognized cart add entry action type while mapping messages', response);
            }
            return {
                productCode,
                statusCode: ProductImportStatus.UNKNOWN_ERROR,
            };
        }
    }
}
QuickOrderOrderEntriesContext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderOrderEntriesContext, deps: [{ token: i1$1.QuickOrderFacade }, { token: i2.ProductConnector }], target: i0.ɵɵFactoryTarget.Injectable });
QuickOrderOrderEntriesContext.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderOrderEntriesContext, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderOrderEntriesContext, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.QuickOrderFacade }, { type: i2.ProductConnector }]; } });

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
const SEARCH_BOX_ACTIVE_CLASS = 'quick-order-searchbox-is-active';
class QuickOrderFormComponent {
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
        var _a, _b;
        event === null || event === void 0 ? void 0 : event.preventDefault();
        if (this.isResultsBoxOpen()) {
            this.toggleBodyClass(SEARCH_BOX_ACTIVE_CLASS, false);
        }
        const product = (_a = this.form.get('product')) === null || _a === void 0 ? void 0 : _a.value;
        if (!!product) {
            this.form.reset();
        }
        // We have to call 'close' method every time to make sure results list is empty and call detectChanges to change icon type in form
        this.close();
        (_b = this.cd) === null || _b === void 0 ? void 0 : _b.detectChanges();
    }
    add(product, event) {
        event === null || event === void 0 ? void 0 : event.preventDefault();
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
        return (string === null || string === void 0 ? void 0 : string.trim()) === '' || string == null;
    }
    watchQueryChange() {
        return this.form.valueChanges
            .pipe(distinctUntilChanged(), debounceTime(300), filter((value) => {
            var _a, _b, _c, _d;
            if ((_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.quickOrder) === null || _b === void 0 ? void 0 : _b.searchForm) {
                //Check if input to quick order is an empty after deleting input manually
                if (this.isEmpty(value.product)) {
                    //Clear recommendation results on empty string
                    this.clear();
                    return false;
                }
                return (!!value.product &&
                    value.product.length >=
                        ((_d = (_c = this.config.quickOrder) === null || _c === void 0 ? void 0 : _c.searchForm) === null || _d === void 0 ? void 0 : _d.minCharactersBeforeRequest));
            }
            return value;
        }))
            .subscribe((value) => {
            this.searchProducts(value.product);
        });
    }
    searchProducts(query) {
        this.searchSubscription.add(this.canAddProduct()
            .pipe(filter(Boolean), switchMap(() => {
            var _a, _b, _c;
            return this.quickOrderService
                .searchProducts(query, (_c = (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.quickOrder) === null || _b === void 0 ? void 0 : _b.searchForm) === null || _c === void 0 ? void 0 : _c.maxProducts)
                .pipe(take(1));
        }))
            .subscribe((products) => {
            var _a;
            this.results = products;
            if (this.results.length) {
                this.noResults = false;
                this.open();
            }
            else {
                this.noResults = true;
            }
            (_a = this.cd) === null || _a === void 0 ? void 0 : _a.detectChanges();
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
QuickOrderFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderFormComponent, deps: [{ token: i2.Config }, { token: i0.ChangeDetectorRef }, { token: i1$1.QuickOrderFacade }, { token: i2.WindowRef }], target: i0.ɵɵFactoryTarget.Component });
QuickOrderFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: QuickOrderFormComponent, selector: "cx-quick-order-form", inputs: { limit: "limit" }, ngImport: i0, template: "<form [formGroup]=\"form\" class=\"quick-order-form-container\">\n  <div\n    class=\"quick-order-form-input\"\n    role=\"search\"\n    [attr.aria-label]=\"'quickOrderForm.quickOrderSearch' | cxTranslate\"\n  >\n    <input\n      (blur)=\"onBlur($event)\"\n      (focus)=\"open()\"\n      (keydown.arrowdown)=\"focusNextChild($event)\"\n      (keydown.arrowup)=\"focusPreviousChild($event)\"\n      (keydown.enter)=\"addProduct($event)\"\n      (keydown.escape)=\"clear($event)\"\n      [attr.aria-label]=\"\n        'quickOrderForm.searchBoxLabel' | cxTranslate: { limit: limit }\n      \"\n      aria-controls=\"quick-order-search-results\"\n      aria-describedby=\"quickOrderFormInitialDescription\"\n      class=\"form-control\"\n      formControlName=\"product\"\n      placeholder=\"{{ 'quickOrderForm.placeholder' | cxTranslate }}\"\n      type=\"text\"\n    />\n\n    <button\n      *ngIf=\"form.get('product')?.value; else searchIcon\"\n      (click)=\"clear($event)\"\n      (keydown.enter)=\"clear($event)\"\n      [attr.aria-label]=\"'common.reset' | cxTranslate\"\n      class=\"quick-order-form-reset-icon\"\n    >\n      <cx-icon [type]=\"iconTypes.RESET\"></cx-icon>\n    </button>\n\n    <ng-template #searchIcon>\n      <button\n        [attr.aria-label]=\"'common.search' | cxTranslate\"\n        class=\"quick-order-form-search-icon\"\n        tabindex=\"-1\"\n      >\n        <cx-icon [type]=\"iconTypes.SEARCH\"></cx-icon>\n      </button>\n    </ng-template>\n\n    <span\n      *ngIf=\"!(canAddProduct() | async) && form.get('product')?.dirty\"\n      class=\"list-limit-reached-text\"\n      role=\"alert\"\n    >\n      {{ 'quickOrderForm.listLimitReached' | cxTranslate }}\n    </span>\n  </div>\n\n  <div\n    *ngIf=\"isResultsBoxOpen()\"\n    class=\"quick-order-results\"\n    role=\"dialog\"\n    id=\"quick-order-search-results\"\n  >\n    <ul\n      *ngIf=\"results.length\"\n      class=\"quick-order-results-products\"\n      role=\"listbox\"\n    >\n      <li\n        *ngFor=\"let product of results; let i = index\"\n        class=\"quick-order-results-product-container\"\n      >\n        <button\n          (blur)=\"onBlur($event)\"\n          (mousedown)=\"add(product, $event)\"\n          (keydown.arrowdown)=\"focusNextChild($event)\"\n          (keydown.arrowup)=\"focusPreviousChild($event)\"\n          (keydown.enter)=\"add(product, $event)\"\n          (keydown.escape)=\"clear($event)\"\n          [class.has-media]=\"\n            config?.quickOrder?.searchForm?.displayProductImages\n          \"\n          class=\"quick-order-results-product\"\n          role=\"option\"\n        >\n          <cx-media\n            *ngIf=\"config?.quickOrder?.searchForm?.displayProductImages\"\n            [alt]=\"product.name\"\n            [container]=\"product.images?.PRIMARY\"\n            class=\"media\"\n            format=\"thumbnail\"\n            role=\"presentation\"\n          ></cx-media>\n          <div class=\"name\" [innerHTML]=\"product.name\"></div>\n          <span class=\"id\">\n            {{\n              'quickOrderForm.id'\n                | cxTranslate\n                  : {\n                      id: product.code\n                    }\n            }}\n          </span>\n          <span class=\"price\">{{ product.price?.formattedValue }}</span>\n        </button>\n      </li>\n    </ul>\n\n    <span *ngIf=\"noResults\" class=\"quick-order-no-results\">\n      {{ 'quickOrderForm.noResults' | cxTranslate }}\n    </span>\n  </div>\n</form>\n\n<label\n  aria-live=\"polite\"\n  id=\"quickOrderFormInitialDescription\"\n  aria-atomic=\"true\"\n  class=\"cx-visually-hidden\"\n>\n  {{\n    results.length\n      ? ('quickOrderForm.productsResults'\n        | cxTranslate: { count: results.length })\n      : ''\n  }}\n  {{ 'quickOrderForm.initialDescription' | cxTranslate }}\n</label>\n", dependencies: [{ kind: "directive", type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2$1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i2$1.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "directive", type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-quick-order-form', changeDetection: ChangeDetectionStrategy.OnPush, template: "<form [formGroup]=\"form\" class=\"quick-order-form-container\">\n  <div\n    class=\"quick-order-form-input\"\n    role=\"search\"\n    [attr.aria-label]=\"'quickOrderForm.quickOrderSearch' | cxTranslate\"\n  >\n    <input\n      (blur)=\"onBlur($event)\"\n      (focus)=\"open()\"\n      (keydown.arrowdown)=\"focusNextChild($event)\"\n      (keydown.arrowup)=\"focusPreviousChild($event)\"\n      (keydown.enter)=\"addProduct($event)\"\n      (keydown.escape)=\"clear($event)\"\n      [attr.aria-label]=\"\n        'quickOrderForm.searchBoxLabel' | cxTranslate: { limit: limit }\n      \"\n      aria-controls=\"quick-order-search-results\"\n      aria-describedby=\"quickOrderFormInitialDescription\"\n      class=\"form-control\"\n      formControlName=\"product\"\n      placeholder=\"{{ 'quickOrderForm.placeholder' | cxTranslate }}\"\n      type=\"text\"\n    />\n\n    <button\n      *ngIf=\"form.get('product')?.value; else searchIcon\"\n      (click)=\"clear($event)\"\n      (keydown.enter)=\"clear($event)\"\n      [attr.aria-label]=\"'common.reset' | cxTranslate\"\n      class=\"quick-order-form-reset-icon\"\n    >\n      <cx-icon [type]=\"iconTypes.RESET\"></cx-icon>\n    </button>\n\n    <ng-template #searchIcon>\n      <button\n        [attr.aria-label]=\"'common.search' | cxTranslate\"\n        class=\"quick-order-form-search-icon\"\n        tabindex=\"-1\"\n      >\n        <cx-icon [type]=\"iconTypes.SEARCH\"></cx-icon>\n      </button>\n    </ng-template>\n\n    <span\n      *ngIf=\"!(canAddProduct() | async) && form.get('product')?.dirty\"\n      class=\"list-limit-reached-text\"\n      role=\"alert\"\n    >\n      {{ 'quickOrderForm.listLimitReached' | cxTranslate }}\n    </span>\n  </div>\n\n  <div\n    *ngIf=\"isResultsBoxOpen()\"\n    class=\"quick-order-results\"\n    role=\"dialog\"\n    id=\"quick-order-search-results\"\n  >\n    <ul\n      *ngIf=\"results.length\"\n      class=\"quick-order-results-products\"\n      role=\"listbox\"\n    >\n      <li\n        *ngFor=\"let product of results; let i = index\"\n        class=\"quick-order-results-product-container\"\n      >\n        <button\n          (blur)=\"onBlur($event)\"\n          (mousedown)=\"add(product, $event)\"\n          (keydown.arrowdown)=\"focusNextChild($event)\"\n          (keydown.arrowup)=\"focusPreviousChild($event)\"\n          (keydown.enter)=\"add(product, $event)\"\n          (keydown.escape)=\"clear($event)\"\n          [class.has-media]=\"\n            config?.quickOrder?.searchForm?.displayProductImages\n          \"\n          class=\"quick-order-results-product\"\n          role=\"option\"\n        >\n          <cx-media\n            *ngIf=\"config?.quickOrder?.searchForm?.displayProductImages\"\n            [alt]=\"product.name\"\n            [container]=\"product.images?.PRIMARY\"\n            class=\"media\"\n            format=\"thumbnail\"\n            role=\"presentation\"\n          ></cx-media>\n          <div class=\"name\" [innerHTML]=\"product.name\"></div>\n          <span class=\"id\">\n            {{\n              'quickOrderForm.id'\n                | cxTranslate\n                  : {\n                      id: product.code\n                    }\n            }}\n          </span>\n          <span class=\"price\">{{ product.price?.formattedValue }}</span>\n        </button>\n      </li>\n    </ul>\n\n    <span *ngIf=\"noResults\" class=\"quick-order-no-results\">\n      {{ 'quickOrderForm.noResults' | cxTranslate }}\n    </span>\n  </div>\n</form>\n\n<label\n  aria-live=\"polite\"\n  id=\"quickOrderFormInitialDescription\"\n  aria-atomic=\"true\"\n  class=\"cx-visually-hidden\"\n>\n  {{\n    results.length\n      ? ('quickOrderForm.productsResults'\n        | cxTranslate: { count: results.length })\n      : ''\n  }}\n  {{ 'quickOrderForm.initialDescription' | cxTranslate }}\n</label>\n" }]
        }], ctorParameters: function () { return [{ type: i2.Config }, { type: i0.ChangeDetectorRef }, { type: i1$1.QuickOrderFacade }, { type: i2.WindowRef }]; }, propDecorators: { limit: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class QuickOrderItemComponent {
    get entry() {
        return this._entry;
    }
    set entry(value) {
        this._entry = value;
        this.quantityControl = new UntypedFormControl(this.entry.quantity, {
            updateOn: 'blur',
        });
    }
    constructor(cd, quickOrderService) {
        this.cd = cd;
        this.quickOrderService = quickOrderService;
        this.loading = false;
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.subscription.add(this.quantityControl.valueChanges.subscribe(() => {
            this.quickOrderService.updateEntryQuantity(this.index, this.quantityControl.value);
        }));
        this.subscription.add(this.watchProductAdd());
    }
    removeEntry() {
        this.quickOrderService.softDeleteEntry(this.index);
        this.cd.detectChanges();
    }
    watchProductAdd() {
        return this.quickOrderService.getProductAdded().subscribe((productCode) => {
            var _a;
            if (productCode === ((_a = this.entry.product) === null || _a === void 0 ? void 0 : _a.code)) {
                this.quantityControl = new UntypedFormControl(this.entry.quantity);
                this.cd.detectChanges();
            }
        });
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
}
QuickOrderItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderItemComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1$1.QuickOrderFacade }], target: i0.ɵɵFactoryTarget.Component });
QuickOrderItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: QuickOrderItemComponent, selector: "[cx-quick-order-item], cx-quick-order-item", inputs: { entry: "entry", index: "index", loading: "loading" }, ngImport: i0, template: "<td role=\"cell\">\n  <div class=\"cx-table-item-container\">\n    <a\n      [ngClass]=\"{\n        disabled: loading,\n        'img-missing': !entry?.product?.images?.PRIMARY\n      }\"\n      [routerLink]=\"{ cxRoute: 'product', params: entry.product } | cxUrl\"\n      tabindex=\"-1\"\n    >\n      <cx-media\n        [container]=\"entry?.product?.images?.PRIMARY\"\n        [alt]=\"entry?.product?.name\"\n        format=\"cartIcon\"\n      ></cx-media>\n    </a>\n    <div class=\"cx-info\">\n      <div class=\"cx-name\">\n        <a\n          [ngClass]=\"{ disabled: loading }\"\n          [routerLink]=\"{ cxRoute: 'product', params: entry.product } | cxUrl\"\n          class=\"cx-link\"\n          >{{ entry.product?.name || '-' }}\n        </a>\n      </div>\n\n      <div class=\"cx-code\">\n        {{ 'quickOrderTable.id' | cxTranslate }} {{ entry.product?.code }}\n      </div>\n    </div>\n  </div>\n</td>\n\n<td role=\"cell\" class=\"cx-price\">\n  <div class=\"cx-mobile-header\">\n    {{ 'quickOrderTable.itemPrice' | cxTranslate }}\n  </div>\n  <div class=\"cx-value\">\n    {{ entry.basePrice?.formattedValue || '-' }}\n  </div>\n</td>\n\n<td role=\"cell\" class=\"cx-quantity\">\n  <div class=\"cx-mobile-header\">\n    {{ 'quickOrderTable.qty' | cxTranslate }}\n  </div>\n  <div class=\"cx-value\">\n    <cx-item-counter\n      [control]=\"quantityControl\"\n      [max]=\"entry.product?.stock?.stockLevel\"\n      [readonly]=\"loading\"\n    ></cx-item-counter>\n  </div>\n</td>\n\n<td role=\"cell\" class=\"cx-actions\">\n  <button\n    (click)=\"removeEntry()\"\n    [attr.aria-label]=\"'common.remove' | cxTranslate\"\n    [disabled]=\"loading\"\n    class=\"btn btn-tertiary\"\n  >\n    {{ 'common.remove' | cxTranslate }}\n  </button>\n</td>\n", dependencies: [{ kind: "directive", type: i6.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: i2$1.ItemCounterComponent, selector: "cx-item-counter", inputs: ["control", "min", "max", "step", "allowZero", "readonly"] }, { kind: "component", type: i2$1.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderItemComponent, decorators: [{
            type: Component,
            args: [{ selector: '[cx-quick-order-item], cx-quick-order-item', changeDetection: ChangeDetectionStrategy.OnPush, template: "<td role=\"cell\">\n  <div class=\"cx-table-item-container\">\n    <a\n      [ngClass]=\"{\n        disabled: loading,\n        'img-missing': !entry?.product?.images?.PRIMARY\n      }\"\n      [routerLink]=\"{ cxRoute: 'product', params: entry.product } | cxUrl\"\n      tabindex=\"-1\"\n    >\n      <cx-media\n        [container]=\"entry?.product?.images?.PRIMARY\"\n        [alt]=\"entry?.product?.name\"\n        format=\"cartIcon\"\n      ></cx-media>\n    </a>\n    <div class=\"cx-info\">\n      <div class=\"cx-name\">\n        <a\n          [ngClass]=\"{ disabled: loading }\"\n          [routerLink]=\"{ cxRoute: 'product', params: entry.product } | cxUrl\"\n          class=\"cx-link\"\n          >{{ entry.product?.name || '-' }}\n        </a>\n      </div>\n\n      <div class=\"cx-code\">\n        {{ 'quickOrderTable.id' | cxTranslate }} {{ entry.product?.code }}\n      </div>\n    </div>\n  </div>\n</td>\n\n<td role=\"cell\" class=\"cx-price\">\n  <div class=\"cx-mobile-header\">\n    {{ 'quickOrderTable.itemPrice' | cxTranslate }}\n  </div>\n  <div class=\"cx-value\">\n    {{ entry.basePrice?.formattedValue || '-' }}\n  </div>\n</td>\n\n<td role=\"cell\" class=\"cx-quantity\">\n  <div class=\"cx-mobile-header\">\n    {{ 'quickOrderTable.qty' | cxTranslate }}\n  </div>\n  <div class=\"cx-value\">\n    <cx-item-counter\n      [control]=\"quantityControl\"\n      [max]=\"entry.product?.stock?.stockLevel\"\n      [readonly]=\"loading\"\n    ></cx-item-counter>\n  </div>\n</td>\n\n<td role=\"cell\" class=\"cx-actions\">\n  <button\n    (click)=\"removeEntry()\"\n    [attr.aria-label]=\"'common.remove' | cxTranslate\"\n    [disabled]=\"loading\"\n    class=\"btn btn-tertiary\"\n  >\n    {{ 'common.remove' | cxTranslate }}\n  </button>\n</td>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1$1.QuickOrderFacade }]; }, propDecorators: { entry: [{
                type: Input,
                args: ['entry']
            }], index: [{
                type: Input
            }], loading: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class QuickOrderTableComponent {
    constructor() {
        this.entries = [];
        this.loading = false;
    }
}
QuickOrderTableComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderTableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
QuickOrderTableComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: QuickOrderTableComponent, selector: "cx-quick-order-table", inputs: { entries: "entries", loading: "loading" }, ngImport: i0, template: "<table\n  *ngIf=\"entries?.length > 0\"\n  class=\"cx-quick-order-table-wrapper\"\n  role=\"table\"\n>\n  <caption class=\"cx-visually-hidden\">\n    {{\n      'quickOrderTable.caption' | cxTranslate\n    }}\n  </caption>\n  <thead>\n    <tr role=\"row\" class=\"cx-item-list-header cx-quick-order-table-header\">\n      <th role=\"columnheader\" class=\"cx-item-list-desc\">\n        {{ 'quickOrderTable.product' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\" class=\"cx-item-list-price\">\n        {{ 'quickOrderTable.price' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\" class=\"cx-item-list-qty\">\n        {{ 'quickOrderTable.quantity' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\" class=\"cx-item-list-actions\">\n        {{ 'quickOrderTable.actions' | cxTranslate }}\n      </th>\n    </tr>\n  </thead>\n  <tbody class=\"cx-item-list-items\">\n    <tr\n      cx-quick-order-item\n      class=\"cx-item-list-row cx-quick-order-table-row\"\n      *ngFor=\"let entry of entries; let i = index\"\n      [entry]=\"entry\"\n      [index]=\"i\"\n      [loading]=\"loading\"\n    ></tr>\n  </tbody>\n</table>\n", dependencies: [{ kind: "directive", type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: QuickOrderItemComponent, selector: "[cx-quick-order-item], cx-quick-order-item", inputs: ["entry", "index", "loading"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-quick-order-table', changeDetection: ChangeDetectionStrategy.OnPush, template: "<table\n  *ngIf=\"entries?.length > 0\"\n  class=\"cx-quick-order-table-wrapper\"\n  role=\"table\"\n>\n  <caption class=\"cx-visually-hidden\">\n    {{\n      'quickOrderTable.caption' | cxTranslate\n    }}\n  </caption>\n  <thead>\n    <tr role=\"row\" class=\"cx-item-list-header cx-quick-order-table-header\">\n      <th role=\"columnheader\" class=\"cx-item-list-desc\">\n        {{ 'quickOrderTable.product' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\" class=\"cx-item-list-price\">\n        {{ 'quickOrderTable.price' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\" class=\"cx-item-list-qty\">\n        {{ 'quickOrderTable.quantity' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\" class=\"cx-item-list-actions\">\n        {{ 'quickOrderTable.actions' | cxTranslate }}\n      </th>\n    </tr>\n  </thead>\n  <tbody class=\"cx-item-list-items\">\n    <tr\n      cx-quick-order-item\n      class=\"cx-item-list-row cx-quick-order-table-row\"\n      *ngFor=\"let entry of entries; let i = index\"\n      [entry]=\"entry\"\n      [index]=\"i\"\n      [loading]=\"loading\"\n    ></tr>\n  </tbody>\n</table>\n" }]
        }], propDecorators: { entries: [{
                type: Input
            }], loading: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class QuickOrderComponent {
    constructor(activeCartService, component, globalMessageService, quickOrderService, quickOrderStatePersistenceService) {
        this.activeCartService = activeCartService;
        this.component = component;
        this.globalMessageService = globalMessageService;
        this.quickOrderService = quickOrderService;
        this.quickOrderStatePersistenceService = quickOrderStatePersistenceService;
        this.quickOrderListLimit$ = this.component.data$.pipe(map((data) => data.quickOrderListLimit), tap((limit) => {
            if (!!limit) {
                this.quickOrderService.setListLimit(limit);
            }
        }));
        this.isCartStable$ = combineLatest([
            this.activeCartService.getActiveCartId(),
            this.activeCartService.isStable(),
        ]).pipe(map(([activeCartId, isStable]) => (!activeCartId ? true : isStable)));
        this.globalMessageType = GlobalMessageType;
        this.cartErrors$ = new BehaviorSubject([]);
        this.cartWarnings$ = new BehaviorSubject([]);
        this.cartSuccesses$ = new BehaviorSubject([]);
        this.showAddToCartInformation$ = new BehaviorSubject(false);
        this.nonPurchasableProductError$ = new BehaviorSubject(null);
    }
    ngOnInit() {
        this.cartId$ = this.activeCartService.getActiveCartId();
        this.entries$ = this.quickOrderService.getEntries();
        this.quickOrderStatePersistenceService.initSync();
    }
    ngOnDestroy() {
        this.quickOrderService.clearDeletedEntries();
    }
    get errors$() {
        return this.cartErrors$.asObservable();
    }
    get warnings$() {
        return this.cartWarnings$.asObservable();
    }
    get successes$() {
        return this.cartSuccesses$.asObservable();
    }
    get nonPurchasableError$() {
        return this.quickOrderService.getNonPurchasableProductError();
    }
    get addToCartInformation$() {
        return this.showAddToCartInformation$.asObservable();
    }
    get softDeletedEntries$() {
        return this.quickOrderService.getSoftDeletedEntries();
    }
    clear() {
        this.quickOrderService.clearList();
        this.globalMessageService.add({
            key: 'quickOrderTable.listCleared',
        }, GlobalMessageType.MSG_TYPE_INFO);
    }
    addToCart(orderEntries) {
        if (!orderEntries.length) {
            this.showAddToCartInformation$.next(true);
            return;
        }
        this.clearStatuses();
        this.quickOrderService
            .addToCart()
            .pipe(first())
            .subscribe(([entries, errors]) => {
            errors.forEach((err) => {
                if (!err.entry) {
                    err.entry = orderEntries.find((e) => { var _a; return ((_a = e.product) === null || _a === void 0 ? void 0 : _a.code) === err.productCode; });
                }
            });
            this.extractErrors(errors);
            this.extractWarnings(errors);
            if (!errors.length) {
                this.showAddedToCartSuccessMessage();
            }
            else {
                this.extractSuccesses(errors, entries);
            }
        });
    }
    clearErrors() {
        this.cartErrors$.next([]);
    }
    clearWarnings() {
        this.cartWarnings$.next([]);
    }
    clearSuccesses() {
        this.cartSuccesses$.next([]);
    }
    clearAddToCartInformation() {
        this.showAddToCartInformation$.next(false);
    }
    undoDeletion(entry) {
        var _a;
        if ((_a = entry.product) === null || _a === void 0 ? void 0 : _a.code) {
            this.quickOrderService.restoreSoftDeletedEntry(entry.product.code);
        }
    }
    clearDeletion(entry) {
        var _a;
        if ((_a = entry.product) === null || _a === void 0 ? void 0 : _a.code) {
            this.quickOrderService.hardDeleteEntry(entry.product.code);
        }
    }
    clearNonPurchasableError() {
        this.quickOrderService.clearNonPurchasableProductError();
    }
    canAddProduct() {
        return this.quickOrderService.canAdd();
    }
    extractErrors(errors) {
        const noAddedEntries = errors.filter((error) => error.quantityAdded === 0);
        this.setErrors(noAddedEntries);
    }
    extractWarnings(errors) {
        const warnings = errors.filter((error) => error.quantityAdded !== 0);
        this.setWarnings(warnings);
    }
    extractSuccesses(errors, entries) {
        const successAddedEntries = [];
        entries.forEach((entry) => {
            const element = errors.find((error) => { var _a; return error.productCode === ((_a = entry.product) === null || _a === void 0 ? void 0 : _a.code); });
            if (!element) {
                successAddedEntries.push(entry);
            }
        });
        this.setSuccesses(successAddedEntries);
    }
    clearStatuses() {
        this.clearErrors();
        this.clearWarnings();
        this.clearSuccesses();
    }
    showAddedToCartSuccessMessage() {
        this.globalMessageService.add({
            key: 'quickOrderTable.addedtoCart',
        }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
    }
    setErrors(errors) {
        this.cartErrors$.next(errors);
    }
    setWarnings(warnings) {
        this.cartWarnings$.next(warnings);
    }
    setSuccesses(entries) {
        this.cartSuccesses$.next(entries);
    }
}
QuickOrderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderComponent, deps: [{ token: i1.ActiveCartFacade }, { token: i2$1.CmsComponentData }, { token: i2.GlobalMessageService }, { token: i1$1.QuickOrderFacade }, { token: i5.QuickOrderStatePersistenceService }], target: i0.ɵɵFactoryTarget.Component });
QuickOrderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: QuickOrderComponent, selector: "cx-quick-order", viewQueries: [{ propertyName: "quickOrderForm", first: true, predicate: ["quickOrderForm"], descendants: true }], ngImport: i0, template: "<div\n  aria-atomic=\"true\"\n  aria-live=\"assertive\"\n  aria-relevant=\"additions\"\n  class=\"quick-order-message-container\"\n>\n  <ng-container *ngIf=\"entries$ | async as entries\">\n    <ng-container *ngIf=\"!(canAddProduct() | async)\">\n      <ng-container *ngIf=\"quickOrderForm?.form?.get('product')?.dirty\">\n        <cx-message\n          [text]=\"\n            'quickOrderList.errors.listIsFull'\n              | cxTranslate: { count: entries.length }\n          \"\n          [isVisibleCloseButton]=\"false\"\n          [type]=\"globalMessageType.MSG_TYPE_ERROR\"\n          class=\"quick-order-list-limit-message\"\n        >\n        </cx-message>\n      </ng-container>\n    </ng-container>\n  </ng-container>\n\n  <ng-container *ngIf=\"addToCartInformation$ | async\">\n    <cx-message\n      (closeMessage)=\"clearAddToCartInformation()\"\n      [text]=\"\n        'quickOrderList.informations.addProductBeforeAddingToCart' | cxTranslate\n      \"\n      [type]=\"globalMessageType.MSG_TYPE_ERROR\"\n      class=\"quick-order-add-to-cart-information-message\"\n    >\n    </cx-message>\n  </ng-container>\n\n  <ng-container *ngIf=\"nonPurchasableError$ | async as nonPurchasableError\">\n    <cx-message\n      (closeMessage)=\"clearNonPurchasableError()\"\n      [text]=\"\n        'quickOrderList.errors.nonPurchasableError'\n          | cxTranslate: { name: nonPurchasableError.name }\n      \"\n      [type]=\"globalMessageType.MSG_TYPE_ERROR\"\n      class=\"quick-order-non-purchasable-product-error-message\"\n    >\n    </cx-message>\n  </ng-container>\n\n  <ng-container *ngIf=\"softDeletedEntries$ | async as deletedEntries\">\n    <cx-message\n      *ngFor=\"let deletedEntry of deletedEntries | keyvalue\"\n      (buttonAction)=\"undoDeletion(deletedEntry.value)\"\n      (closeMessage)=\"clearDeletion(deletedEntry.value)\"\n      [actionButtonText]=\"'quickOrderList.undo' | cxTranslate\"\n      [actionButtonMessage]=\"\n        'quickOrderList.revokeUndo'\n          | cxTranslate: { name: deletedEntry.value.product?.name }\n      \"\n      [text]=\"\n        'quickOrderList.productWasDeleted'\n          | cxTranslate: { name: deletedEntry.value.product?.name }\n      \"\n      [type]=\"globalMessageType.MSG_TYPE_CONFIRMATION\"\n      class=\"quick-order-deletions-message\"\n    >\n    </cx-message>\n  </ng-container>\n\n  <ng-container *ngIf=\"errors$ | async as errors\">\n    <cx-message\n      *ngIf=\"errors.length\"\n      (closeMessage)=\"clearErrors()\"\n      [accordionText]=\"'quickOrderList.errors.reviewErrors' | cxTranslate\"\n      [text]=\"'quickOrderList.errorProceedingToCart' | cxTranslate\"\n      [type]=\"globalMessageType.MSG_TYPE_ERROR\"\n      class=\"quick-order-errors-message\"\n    >\n      <ul class=\"quick-order-errors\">\n        <li *ngFor=\"let error of errors\" class=\"quick-order-error-item\">\n          <span>\n            {{\n              'quickOrderList.errors.productIsOutOfStock'\n                | cxTranslate\n                  : {\n                      name: error.entry.product.name,\n                      code: error.entry.product.code\n                    }\n            }}\n          </span>\n        </li>\n      </ul>\n      <div class=\"cx-visually-hidden\">\n        {{\n          'quickOrderList.errors.outOfStockErrorFound'\n            | cxTranslate: { count: errors.length }\n        }}\n      </div>\n    </cx-message>\n  </ng-container>\n\n  <ng-container *ngIf=\"warnings$ | async as warnings\">\n    <cx-message\n      *ngIf=\"warnings.length\"\n      (closeMessage)=\"clearWarnings()\"\n      [accordionText]=\"'quickOrderList.warnings.reviewWarnings' | cxTranslate\"\n      [text]=\"'quickOrderList.warningProceedingToCart' | cxTranslate\"\n      [type]=\"globalMessageType.MSG_TYPE_WARNING\"\n      class=\"quick-order-warnings-message\"\n    >\n      <ul class=\"quick-order-warnings\">\n        <li *ngFor=\"let warning of warnings\" class=\"quick-order-warning-item\">\n          <span>\n            {{\n              'quickOrderList.warnings.productWasReduced'\n                | cxTranslate\n                  : {\n                      name: warning.entry.product.name,\n                      code: warning.entry.product.code,\n                      quantityAdded: warning.quantityAdded\n                    }\n            }}\n          </span>\n        </li>\n      </ul>\n      <div class=\"cx-visually-hidden\">\n        {{\n          'quickOrderList.warnings.reduceWarningFound'\n            | cxTranslate: { count: warnings.length }\n        }}\n      </div>\n    </cx-message>\n  </ng-container>\n\n  <ng-container *ngIf=\"successes$ | async as successes\">\n    <cx-message\n      *ngIf=\"successes.length\"\n      (closeMessage)=\"clearSuccesses()\"\n      [text]=\"'quickOrderList.successfullyAddedToCart' | cxTranslate\"\n      [type]=\"globalMessageType.MSG_TYPE_CONFIRMATION\"\n      class=\"quick-order-successes-message\"\n    >\n      <ul class=\"quick-order-successes\">\n        <li *ngFor=\"let entry of successes\" class=\"quick-order-success-item\">\n          <span>{{\n            'quickOrderList.successes.productAddedToCart'\n              | cxTranslate\n                : {\n                    name: entry.product.name,\n                    code: entry.product.code\n                  }\n          }}</span>\n        </li>\n      </ul>\n      <div class=\"cx-visually-hidden\">\n        {{\n          'quickOrderList.successes.addedToCartFound'\n            | cxTranslate: { count: successes.length }\n        }}\n      </div>\n    </cx-message>\n  </ng-container>\n</div>\n\n<ng-container *ngIf=\"quickOrderListLimit$ | async as quickOrderListLimit\">\n  <ng-container *ngIf=\"entries$ | async as entries\">\n    <div class=\"quick-order-header\">\n      <h2>\n        {{ 'quickOrderList.header' | cxTranslate }}\n      </h2>\n      <p>\n        {{\n          'quickOrderList.subHeader'\n            | cxTranslate: { limit: quickOrderListLimit }\n        }}\n      </p>\n    </div>\n\n    <div class=\"quick-order-form-body\">\n      <cx-quick-order-form #quickOrderForm [limit]=\"quickOrderListLimit\">\n      </cx-quick-order-form>\n    </div>\n\n    <div class=\"quick-order-table-body\">\n      <cx-quick-order-table\n        [entries]=\"entries\"\n        [loading]=\"!(isCartStable$ | async)\"\n      ></cx-quick-order-table>\n    </div>\n\n    <div class=\"quick-order-footer row\">\n      <div class=\"col-xs-12 col-md-5 col-lg-3\">\n        <button\n          *ngIf=\"entries.length\"\n          (click)=\"clear()\"\n          [attr.aria-label]=\"'quickOrderList.emptyList' | cxTranslate\"\n          [disabled]=\"!(isCartStable$ | async)\"\n          class=\"btn btn-block btn-secondary clear-button\"\n          type=\"button\"\n        >\n          {{ 'quickOrderList.emptyList' | cxTranslate }}\n        </button>\n      </div>\n\n      <div class=\"col-xs-12 col-md-5 col-lg-3\">\n        <cx-progress-button\n          (clickEvent)=\"addToCart(entries)\"\n          [ariaLabel]=\"'quickOrderList.addToCart' | cxTranslate\"\n          [class]=\"'btn-block add-button'\"\n          [loading]=\"!(isCartStable$ | async)\"\n        >\n          {{ 'quickOrderList.addToCart' | cxTranslate }}\n        </cx-progress-button>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2$1.MessageComponent, selector: "cx-message", inputs: ["text", "actionButtonText", "actionButtonMessage", "accordionText", "showBody", "isVisibleCloseButton", "type"], outputs: ["closeMessage", "buttonAction"] }, { kind: "component", type: i2$1.ProgressButtonComponent, selector: "cx-progress-button", inputs: ["ariaLabel", "class", "disabled", "loading"], outputs: ["clickEvent"] }, { kind: "component", type: QuickOrderFormComponent, selector: "cx-quick-order-form", inputs: ["limit"] }, { kind: "component", type: QuickOrderTableComponent, selector: "cx-quick-order-table", inputs: ["entries", "loading"] }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }, { kind: "pipe", type: i6.KeyValuePipe, name: "keyvalue" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-quick-order', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  aria-atomic=\"true\"\n  aria-live=\"assertive\"\n  aria-relevant=\"additions\"\n  class=\"quick-order-message-container\"\n>\n  <ng-container *ngIf=\"entries$ | async as entries\">\n    <ng-container *ngIf=\"!(canAddProduct() | async)\">\n      <ng-container *ngIf=\"quickOrderForm?.form?.get('product')?.dirty\">\n        <cx-message\n          [text]=\"\n            'quickOrderList.errors.listIsFull'\n              | cxTranslate: { count: entries.length }\n          \"\n          [isVisibleCloseButton]=\"false\"\n          [type]=\"globalMessageType.MSG_TYPE_ERROR\"\n          class=\"quick-order-list-limit-message\"\n        >\n        </cx-message>\n      </ng-container>\n    </ng-container>\n  </ng-container>\n\n  <ng-container *ngIf=\"addToCartInformation$ | async\">\n    <cx-message\n      (closeMessage)=\"clearAddToCartInformation()\"\n      [text]=\"\n        'quickOrderList.informations.addProductBeforeAddingToCart' | cxTranslate\n      \"\n      [type]=\"globalMessageType.MSG_TYPE_ERROR\"\n      class=\"quick-order-add-to-cart-information-message\"\n    >\n    </cx-message>\n  </ng-container>\n\n  <ng-container *ngIf=\"nonPurchasableError$ | async as nonPurchasableError\">\n    <cx-message\n      (closeMessage)=\"clearNonPurchasableError()\"\n      [text]=\"\n        'quickOrderList.errors.nonPurchasableError'\n          | cxTranslate: { name: nonPurchasableError.name }\n      \"\n      [type]=\"globalMessageType.MSG_TYPE_ERROR\"\n      class=\"quick-order-non-purchasable-product-error-message\"\n    >\n    </cx-message>\n  </ng-container>\n\n  <ng-container *ngIf=\"softDeletedEntries$ | async as deletedEntries\">\n    <cx-message\n      *ngFor=\"let deletedEntry of deletedEntries | keyvalue\"\n      (buttonAction)=\"undoDeletion(deletedEntry.value)\"\n      (closeMessage)=\"clearDeletion(deletedEntry.value)\"\n      [actionButtonText]=\"'quickOrderList.undo' | cxTranslate\"\n      [actionButtonMessage]=\"\n        'quickOrderList.revokeUndo'\n          | cxTranslate: { name: deletedEntry.value.product?.name }\n      \"\n      [text]=\"\n        'quickOrderList.productWasDeleted'\n          | cxTranslate: { name: deletedEntry.value.product?.name }\n      \"\n      [type]=\"globalMessageType.MSG_TYPE_CONFIRMATION\"\n      class=\"quick-order-deletions-message\"\n    >\n    </cx-message>\n  </ng-container>\n\n  <ng-container *ngIf=\"errors$ | async as errors\">\n    <cx-message\n      *ngIf=\"errors.length\"\n      (closeMessage)=\"clearErrors()\"\n      [accordionText]=\"'quickOrderList.errors.reviewErrors' | cxTranslate\"\n      [text]=\"'quickOrderList.errorProceedingToCart' | cxTranslate\"\n      [type]=\"globalMessageType.MSG_TYPE_ERROR\"\n      class=\"quick-order-errors-message\"\n    >\n      <ul class=\"quick-order-errors\">\n        <li *ngFor=\"let error of errors\" class=\"quick-order-error-item\">\n          <span>\n            {{\n              'quickOrderList.errors.productIsOutOfStock'\n                | cxTranslate\n                  : {\n                      name: error.entry.product.name,\n                      code: error.entry.product.code\n                    }\n            }}\n          </span>\n        </li>\n      </ul>\n      <div class=\"cx-visually-hidden\">\n        {{\n          'quickOrderList.errors.outOfStockErrorFound'\n            | cxTranslate: { count: errors.length }\n        }}\n      </div>\n    </cx-message>\n  </ng-container>\n\n  <ng-container *ngIf=\"warnings$ | async as warnings\">\n    <cx-message\n      *ngIf=\"warnings.length\"\n      (closeMessage)=\"clearWarnings()\"\n      [accordionText]=\"'quickOrderList.warnings.reviewWarnings' | cxTranslate\"\n      [text]=\"'quickOrderList.warningProceedingToCart' | cxTranslate\"\n      [type]=\"globalMessageType.MSG_TYPE_WARNING\"\n      class=\"quick-order-warnings-message\"\n    >\n      <ul class=\"quick-order-warnings\">\n        <li *ngFor=\"let warning of warnings\" class=\"quick-order-warning-item\">\n          <span>\n            {{\n              'quickOrderList.warnings.productWasReduced'\n                | cxTranslate\n                  : {\n                      name: warning.entry.product.name,\n                      code: warning.entry.product.code,\n                      quantityAdded: warning.quantityAdded\n                    }\n            }}\n          </span>\n        </li>\n      </ul>\n      <div class=\"cx-visually-hidden\">\n        {{\n          'quickOrderList.warnings.reduceWarningFound'\n            | cxTranslate: { count: warnings.length }\n        }}\n      </div>\n    </cx-message>\n  </ng-container>\n\n  <ng-container *ngIf=\"successes$ | async as successes\">\n    <cx-message\n      *ngIf=\"successes.length\"\n      (closeMessage)=\"clearSuccesses()\"\n      [text]=\"'quickOrderList.successfullyAddedToCart' | cxTranslate\"\n      [type]=\"globalMessageType.MSG_TYPE_CONFIRMATION\"\n      class=\"quick-order-successes-message\"\n    >\n      <ul class=\"quick-order-successes\">\n        <li *ngFor=\"let entry of successes\" class=\"quick-order-success-item\">\n          <span>{{\n            'quickOrderList.successes.productAddedToCart'\n              | cxTranslate\n                : {\n                    name: entry.product.name,\n                    code: entry.product.code\n                  }\n          }}</span>\n        </li>\n      </ul>\n      <div class=\"cx-visually-hidden\">\n        {{\n          'quickOrderList.successes.addedToCartFound'\n            | cxTranslate: { count: successes.length }\n        }}\n      </div>\n    </cx-message>\n  </ng-container>\n</div>\n\n<ng-container *ngIf=\"quickOrderListLimit$ | async as quickOrderListLimit\">\n  <ng-container *ngIf=\"entries$ | async as entries\">\n    <div class=\"quick-order-header\">\n      <h2>\n        {{ 'quickOrderList.header' | cxTranslate }}\n      </h2>\n      <p>\n        {{\n          'quickOrderList.subHeader'\n            | cxTranslate: { limit: quickOrderListLimit }\n        }}\n      </p>\n    </div>\n\n    <div class=\"quick-order-form-body\">\n      <cx-quick-order-form #quickOrderForm [limit]=\"quickOrderListLimit\">\n      </cx-quick-order-form>\n    </div>\n\n    <div class=\"quick-order-table-body\">\n      <cx-quick-order-table\n        [entries]=\"entries\"\n        [loading]=\"!(isCartStable$ | async)\"\n      ></cx-quick-order-table>\n    </div>\n\n    <div class=\"quick-order-footer row\">\n      <div class=\"col-xs-12 col-md-5 col-lg-3\">\n        <button\n          *ngIf=\"entries.length\"\n          (click)=\"clear()\"\n          [attr.aria-label]=\"'quickOrderList.emptyList' | cxTranslate\"\n          [disabled]=\"!(isCartStable$ | async)\"\n          class=\"btn btn-block btn-secondary clear-button\"\n          type=\"button\"\n        >\n          {{ 'quickOrderList.emptyList' | cxTranslate }}\n        </button>\n      </div>\n\n      <div class=\"col-xs-12 col-md-5 col-lg-3\">\n        <cx-progress-button\n          (clickEvent)=\"addToCart(entries)\"\n          [ariaLabel]=\"'quickOrderList.addToCart' | cxTranslate\"\n          [class]=\"'btn-block add-button'\"\n          [loading]=\"!(isCartStable$ | async)\"\n        >\n          {{ 'quickOrderList.addToCart' | cxTranslate }}\n        </cx-progress-button>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2$1.CmsComponentData }, { type: i2.GlobalMessageService }, { type: i1$1.QuickOrderFacade }, { type: i5.QuickOrderStatePersistenceService }]; }, propDecorators: { quickOrderForm: [{
                type: ViewChild,
                args: ['quickOrderForm']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class QuickOrderListModule {
}
QuickOrderListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
QuickOrderListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderListModule, declarations: [QuickOrderComponent,
        QuickOrderFormComponent,
        QuickOrderItemComponent,
        QuickOrderTableComponent], imports: [AtMessageModule,
        CommonModule,
        FormErrorsModule,
        I18nModule,
        IconModule,
        ItemCounterModule,
        MediaModule,
        MessageComponentModule,
        ProgressButtonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule], exports: [QuickOrderComponent,
        QuickOrderFormComponent,
        QuickOrderItemComponent,
        QuickOrderTableComponent] });
QuickOrderListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderListModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                QuickOrderComponent: {
                    component: QuickOrderComponent,
                    data: {
                        quickOrderListLimit: 10,
                    },
                },
            },
        }),
    ], imports: [AtMessageModule,
        CommonModule,
        FormErrorsModule,
        I18nModule,
        IconModule,
        ItemCounterModule,
        MediaModule,
        MessageComponentModule,
        ProgressButtonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AtMessageModule,
                        CommonModule,
                        FormErrorsModule,
                        I18nModule,
                        IconModule,
                        ItemCounterModule,
                        MediaModule,
                        MessageComponentModule,
                        ProgressButtonModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                QuickOrderComponent: {
                                    component: QuickOrderComponent,
                                    data: {
                                        quickOrderListLimit: 10,
                                    },
                                },
                            },
                        }),
                    ],
                    declarations: [
                        QuickOrderComponent,
                        QuickOrderFormComponent,
                        QuickOrderItemComponent,
                        QuickOrderTableComponent,
                    ],
                    exports: [
                        QuickOrderComponent,
                        QuickOrderFormComponent,
                        QuickOrderItemComponent,
                        QuickOrderTableComponent,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class QuickOrderComponentsModule {
}
QuickOrderComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
QuickOrderComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderComponentsModule, imports: [RouterModule, QuickOrderListModule, CartQuickOrderFormModule] });
QuickOrderComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderComponentsModule, providers: [
        {
            provide: QuickOrderOrderEntriesContextToken,
            useExisting: QuickOrderOrderEntriesContext,
        },
    ], imports: [RouterModule, QuickOrderListModule, CartQuickOrderFormModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RouterModule, QuickOrderListModule, CartQuickOrderFormModule],
                    providers: [
                        {
                            provide: QuickOrderOrderEntriesContextToken,
                            useExisting: QuickOrderOrderEntriesContext,
                        },
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

export { CartQuickOrderFormComponent, CartQuickOrderFormModule, QuickOrderComponent, QuickOrderComponentsModule, QuickOrderFormComponent, QuickOrderItemComponent, QuickOrderListModule, QuickOrderOrderEntriesContext, QuickOrderTableComponent };
//# sourceMappingURL=spartacus-cart-quick-order-components.mjs.map
