import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, Input, HostBinding, NgModule, Injectable, inject, Optional, ChangeDetectorRef, ViewChild, HostListener, ComponentFactoryResolver } from '@angular/core';
import * as i2 from '@spartacus/core';
import { UrlModule, I18nModule, FeaturesConfigModule, GlobalMessageType, provideDefaultConfig, AuthGuard, EventService, OCC_CART_ID_CURRENT, provideDefaultConfigFactory, MODULE_INITIALIZER, isNotUndefined } from '@spartacus/core';
import * as i2$1 from '@angular/common';
import { CommonModule, formatCurrency, getCurrencySymbol } from '@angular/common';
import * as i2$2 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i3$1 from '@angular/forms';
import { UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { map, distinctUntilChanged, tap, shareReplay, switchMap, filter, first, take, withLatestFrom, startWith } from 'rxjs/operators';
import * as i1 from '@spartacus/order/root';
import { paymentMethodCard, billingAddressCard, deliveryAddressCard, deliveryModeCard, OrderFacade, OrderConfirmationOrderEntriesContextToken, OrderOutlets, DownloadOrderInvoicesEvent, USE_MY_ACCOUNT_V2_ORDER, OrderDetailsOrderEntriesContextToken } from '@spartacus/order/root';
import * as i3 from '@spartacus/storefront';
import { MediaModule, ItemCounterModule, FormErrorsModule, MessageComponentModule, SpinnerModule, CustomFormValidators, CardModule, PwaModule, PromotionsModule, PasswordVisibilityToggleModule, provideOutlet, OutletModule, ICON_TYPE, LaunchDialogService, DIALOG_TYPE, KeyboardFocusModule, IconModule, PaginationModule, SortingModule, OutletContextData, OutletService, OutletPosition, ListNavigationModule } from '@spartacus/storefront';
import { MyAccountV2OrderHistoryService } from '@spartacus/order/core';
import { BehaviorSubject, combineLatest, of, Subscription } from 'rxjs';
import * as i3$3 from '@spartacus/cart/base/root';
import { CartOutlets, OrderEntriesSource, PromotionLocation, CartValidationStatusCode } from '@spartacus/cart/base/root';
import * as i1$1 from '@spartacus/user/profile/root';
import * as i4 from '@spartacus/cart/base/components/add-to-cart';
import { AddToCartModule } from '@spartacus/cart/base/components/add-to-cart';
import * as i3$2 from '@spartacus/pdf-invoices/components';
import { InvoicesListComponent, PDFInvoicesComponentsModule } from '@spartacus/pdf-invoices/components';
import { NgSelectModule } from '@ng-select/ng-select';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AmendOrderActionsComponent {
    constructor(routingService) {
        this.routingService = routingService;
        this.styles = 'row';
    }
    continue(event) {
        if (this.amendOrderForm.valid) {
            this.routingService.go({
                cxRoute: this.forwardRoute,
                params: { code: this.orderCode },
            });
        }
        else {
            this.amendOrderForm.markAllAsTouched();
            event.stopPropagation();
        }
    }
}
AmendOrderActionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AmendOrderActionsComponent, deps: [{ token: i2.RoutingService }], target: i0.ɵɵFactoryTarget.Component });
AmendOrderActionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AmendOrderActionsComponent, selector: "cx-amend-order-actions", inputs: { orderCode: "orderCode", amendOrderForm: "amendOrderForm", backRoute: "backRoute", forwardRoute: "forwardRoute" }, host: { properties: { "class": "this.styles" } }, ngImport: i0, template: "<div class=\"col-xs-12 col-md-4 col-lg-3\">\n  <a\n    [routerLink]=\"\n      {\n        cxRoute: backRoute,\n        params: { code: orderCode }\n      } | cxUrl\n    \"\n    class=\"btn btn-block btn-secondary\"\n  >\n    {{ 'common.back' | cxTranslate }}\n  </a>\n</div>\n<div class=\"col-xs-12 col-md-4 col-lg-3\">\n  <button\n    *ngIf=\"forwardRoute\"\n    class=\"btn btn-block btn-primary\"\n    (click)=\"continue($event)\"\n  >\n    {{ 'common.continue' | cxTranslate }}\n  </button>\n\n  <button\n    *ngIf=\"!forwardRoute\"\n    class=\"btn btn-block btn-primary\"\n    type=\"submit\"\n    [attr.aria-label]=\"\n      'orderDetails.cancellationAndReturn.submitDescription' | cxTranslate\n    \"\n  >\n    {{ 'orderDetails.cancellationAndReturn.submit' | cxTranslate }}\n  </button>\n</div>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AmendOrderActionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-amend-order-actions', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"col-xs-12 col-md-4 col-lg-3\">\n  <a\n    [routerLink]=\"\n      {\n        cxRoute: backRoute,\n        params: { code: orderCode }\n      } | cxUrl\n    \"\n    class=\"btn btn-block btn-secondary\"\n  >\n    {{ 'common.back' | cxTranslate }}\n  </a>\n</div>\n<div class=\"col-xs-12 col-md-4 col-lg-3\">\n  <button\n    *ngIf=\"forwardRoute\"\n    class=\"btn btn-block btn-primary\"\n    (click)=\"continue($event)\"\n  >\n    {{ 'common.continue' | cxTranslate }}\n  </button>\n\n  <button\n    *ngIf=\"!forwardRoute\"\n    class=\"btn btn-block btn-primary\"\n    type=\"submit\"\n    [attr.aria-label]=\"\n      'orderDetails.cancellationAndReturn.submitDescription' | cxTranslate\n    \"\n  >\n    {{ 'orderDetails.cancellationAndReturn.submit' | cxTranslate }}\n  </button>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i2.RoutingService }]; }, propDecorators: { orderCode: [{
                type: Input
            }], amendOrderForm: [{
                type: Input
            }], backRoute: [{
                type: Input
            }], forwardRoute: [{
                type: Input
            }], styles: [{
                type: HostBinding,
                args: ['class']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AmendOrderActionsModule {
}
AmendOrderActionsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AmendOrderActionsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AmendOrderActionsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AmendOrderActionsModule, declarations: [AmendOrderActionsComponent], imports: [CommonModule, RouterModule, UrlModule, I18nModule], exports: [AmendOrderActionsComponent] });
AmendOrderActionsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AmendOrderActionsModule, imports: [CommonModule, RouterModule, UrlModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AmendOrderActionsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, UrlModule, I18nModule],
                    declarations: [AmendOrderActionsComponent],
                    exports: [AmendOrderActionsComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var AmendOrderType;
(function (AmendOrderType) {
    AmendOrderType[AmendOrderType["CANCEL"] = 0] = "CANCEL";
    AmendOrderType[AmendOrderType["RETURN"] = 1] = "RETURN";
})(AmendOrderType || (AmendOrderType = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderDetailsService {
    constructor(orderHistoryFacade, routingService) {
        this.orderHistoryFacade = orderHistoryFacade;
        this.routingService = routingService;
        this.orderCode$ = this.routingService.getRouterState().pipe(map((routingData) => routingData.state.params.orderCode), distinctUntilChanged());
        this.orderLoad$ = this.orderCode$.pipe(tap((orderCode) => {
            if (orderCode) {
                this.orderHistoryFacade.loadOrderDetails(orderCode);
            }
            else {
                this.orderHistoryFacade.clearOrderDetails();
            }
        }), shareReplay({ bufferSize: 1, refCount: true }));
    }
    isOrderDetailsLoading() {
        return this.orderHistoryFacade.getOrderDetailsLoading();
    }
    getOrderDetails() {
        return this.orderLoad$.pipe(switchMap(() => this.orderHistoryFacade.getOrderDetails()));
    }
}
OrderDetailsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailsService, deps: [{ token: i1.OrderHistoryFacade }, { token: i2.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
OrderDetailsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.OrderHistoryFacade }, { type: i2.RoutingService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function ValidateQuantityToCancel(control) {
    if (!control.value) {
        return null;
    }
    const quantity = Object.values(control.value).reduce((acc, val) => acc + val, 0);
    return quantity > 0 ? null : { cxNoSelectedItemToCancel: true };
}
class OrderAmendService {
    constructor(orderDetailsService) {
        this.orderDetailsService = orderDetailsService;
    }
    /**
     * Returns entries with an amended quantity.
     */
    getAmendedEntries() {
        return this.getForm().pipe(switchMap((form) => {
            return this.getEntries().pipe(map((entries) => entries.filter((entry) => this.getFormControl(form, entry).value > 0)));
        }));
    }
    getOrder() {
        return this.orderDetailsService.getOrderDetails();
    }
    /**
     * returns the form with form data at runtime
     */
    getForm() {
        return this.getOrder().pipe(tap((order) => {
            if (!this.form || this.form.get('orderCode')?.value !== order.code) {
                this.buildForm(order);
            }
        }), map(() => this.form));
    }
    buildForm(order) {
        this.form = new UntypedFormGroup({});
        this.form.addControl('orderCode', new UntypedFormControl(order.code));
        const entryGroup = new UntypedFormGroup({}, { validators: [ValidateQuantityToCancel] });
        this.form.addControl('entries', entryGroup);
        (order.entries || []).forEach((entry) => {
            const key = entry?.entryNumber?.toString() ?? '';
            entryGroup.addControl(key, new UntypedFormControl(0, {
                validators: [
                    Validators.min(0),
                    Validators.max(this.getMaxAmendQuantity(entry)),
                ],
            }));
        });
    }
    getFormControl(form, entry) {
        return (form.get('entries')?.get(entry.entryNumber?.toString() ?? ''));
    }
    /**
     * As discussed, this calculation is moved to SPA side.
     * The calculation and validation should be in backend facade layer.
     */
    getAmendedPrice(entry) {
        const amendedQuantity = this.getFormControl(this.form, entry).value;
        const amendedPrice = Object.assign({}, entry.basePrice);
        amendedPrice.value =
            Math.round((entry.basePrice?.value ?? 0) * amendedQuantity * 100) / 100;
        amendedPrice.formattedValue = formatCurrency(amendedPrice.value, 
        // TODO: user current language
        'en', getCurrencySymbol(amendedPrice.currencyIso ?? '', 'narrow'), amendedPrice.currencyIso);
        return amendedPrice;
    }
    getMaxAmendQuantity(entry) {
        return ((this.isCancellation()
            ? entry.cancellableQuantity
            : entry.returnableQuantity) ||
            entry.quantity ||
            0);
    }
    isCancellation() {
        return this.amendType === AmendOrderType.CANCEL;
    }
}
OrderAmendService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderAmendService, deps: [{ token: OrderDetailsService }], target: i0.ɵɵFactoryTarget.Injectable });
OrderAmendService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderAmendService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderAmendService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: OrderDetailsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CancelOrReturnItemsComponent {
    constructor(orderAmendService) {
        this.orderAmendService = orderAmendService;
        this.isConfirmation = false;
        this.form$ = this.orderAmendService.getForm();
    }
    getControl(form, entry) {
        const control = (form.get('entries')?.get(entry.entryNumber?.toString() ?? ''));
        return control;
    }
    setAll(form) {
        this.entries.forEach((entry) => this.getControl(form, entry).setValue(this.getMaxAmendQuantity(entry)));
    }
    getItemPrice(entry) {
        return this.orderAmendService.getAmendedPrice(entry);
    }
    getMaxAmendQuantity(entry) {
        return this.orderAmendService.getMaxAmendQuantity(entry);
    }
    isCancellation() {
        return this.orderAmendService.isCancellation();
    }
}
CancelOrReturnItemsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CancelOrReturnItemsComponent, deps: [{ token: OrderAmendService }], target: i0.ɵɵFactoryTarget.Component });
CancelOrReturnItemsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CancelOrReturnItemsComponent, selector: "cx-amend-order-items", inputs: { entries: "entries", isConfirmation: "isConfirmation" }, ngImport: i0, template: "<div *ngIf=\"form$ | async as form\">\n  <button\n    *ngIf=\"!isConfirmation\"\n    class=\"btn btn-link cx-action-link\"\n    (click)=\"setAll(form)\"\n  >\n    {{ 'orderDetails.cancellationAndReturn.setAll' | cxTranslate }}\n  </button>\n\n  <table class=\"cx-amend-order-items\">\n    <caption class=\"cx-visually-hidden\">\n      {{\n        'orderDetails.caption' | cxTranslate\n      }}\n    </caption>\n    <thead>\n      <tr>\n        <th role=\"columnheader\" class=\"cx-item-list-desc\">\n          {{ 'orderDetails.cancellationAndReturn.item' | cxTranslate }}\n        </th>\n        <th role=\"columnheader\" class=\"cx-item-list-price\">\n          {{ 'orderDetails.cancellationAndReturn.itemPrice' | cxTranslate }}\n        </th>\n        <th\n          *ngIf=\"!isConfirmation\"\n          role=\"columnheader\"\n          class=\"cx-item-list-amend-qty\"\n        >\n          {{ 'orderDetails.cancellationAndReturn.quantity' | cxTranslate }}\n        </th>\n        <th role=\"columnheader\" class=\"cx-item-list-qty\">\n          {{\n            (isCancellation()\n              ? 'orderDetails.cancellationAndReturn.cancelQty'\n              : 'orderDetails.cancellationAndReturn.returnQty'\n            ) | cxTranslate\n          }}\n        </th>\n        <th\n          *ngIf=\"isConfirmation\"\n          role=\"columnheader\"\n          class=\"cx-item-list-total\"\n        >\n          {{ 'orderDetails.cancellationAndReturn.totalPrice' | cxTranslate }}\n        </th>\n      </tr>\n    </thead>\n    <tbody class=\"cx-item-list-items\">\n      <!--    TODO: This should be a separate component-->\n      <tr\n        *ngFor=\"let item of entries; let i = index\"\n        class=\"cx-item-list-row cx-amend-order-item-row\"\n      >\n        <td role=\"cell\">\n          <div class=\"cx-table-item-container\">\n            <cx-media\n              [container]=\"item.product.images?.PRIMARY\"\n              format=\"thumbnail\"\n            ></cx-media>\n\n            <div class=\"cx-info\">\n              <div class=\"cx-name\">\n                {{ item.product.name }}\n              </div>\n\n              <div *ngIf=\"item.product.code\" class=\"cx-code\">\n                {{ 'cartItems.id' | cxTranslate }} {{ item.product.code }}\n              </div>\n            </div>\n\n            <ng-container *ngIf=\"item.product.baseOptions?.length\">\n              <div\n                *ngFor=\"\n                  let variant of item.product.baseOptions[0]?.selected\n                    ?.variantOptionQualifiers\n                \"\n                class=\"cx-property\"\n              >\n                <div class=\"cx-label\" *ngIf=\"variant.name\">\n                  {{ variant.name }}:\n                </div>\n                <div class=\"cx-value\" *ngIf=\"variant.value\">\n                  {{ variant.value }}\n                </div>\n              </div>\n            </ng-container>\n          </div>\n        </td>\n\n        <td role=\"cell\" class=\"cx-price\" *ngIf=\"item.basePrice\">\n          <div class=\"cx-mobile-header\">\n            {{ 'orderDetails.cancellationAndReturn.itemPrice' | cxTranslate }}\n          </div>\n          <div class=\"cx-value\">\n            {{ item.basePrice?.formattedValue }}\n          </div>\n        </td>\n\n        <td role=\"cell\" *ngIf=\"!isConfirmation\" class=\"cx-request-qty\">\n          <div\n            class=\"cx-mobile-header\"\n            title=\"{{ 'cartItems.quantityTitle' | cxTranslate }}\"\n          >\n            {{ 'orderDetails.cancellationAndReturn.quantity' | cxTranslate }}\n          </div>\n          <div class=\"cx-value\">\n            {{ getMaxAmendQuantity(item) }}\n          </div>\n        </td>\n\n        <td role=\"cell\" class=\"cx-quantity\">\n          <div class=\"cx-mobile-header\">\n            {{\n              (isCancellation()\n                ? 'orderDetails.cancellationAndReturn.cancelQty'\n                : 'orderDetails.cancellationAndReturn.returnQty'\n              ) | cxTranslate\n            }}\n          </div>\n          <div class=\"cx-value\">\n            <ng-container *ngIf=\"isConfirmation\">\n              {{ getControl(form, item).value }}\n            </ng-container>\n            <cx-item-counter\n              *ngIf=\"!isConfirmation\"\n              [min]=\"0\"\n              [max]=\"getMaxAmendQuantity(item)\"\n              [control]=\"getControl(form, item)\"\n            ></cx-item-counter>\n          </div>\n        </td>\n\n        <td role=\"cell\" *ngIf=\"isConfirmation\" class=\"cx-total\">\n          <div class=\"cx-mobile-header\">\n            {{ 'orderDetails.cancellationAndReturn.totalPrice' | cxTranslate }}\n          </div>\n          <div class=\"cx-value\">{{ getItemPrice(item)?.formattedValue }}</div>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n", dependencies: [{ kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "component", type: i3.ItemCounterComponent, selector: "cx-item-counter", inputs: ["control", "min", "max", "step", "allowZero", "readonly"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CancelOrReturnItemsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-amend-order-items', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div *ngIf=\"form$ | async as form\">\n  <button\n    *ngIf=\"!isConfirmation\"\n    class=\"btn btn-link cx-action-link\"\n    (click)=\"setAll(form)\"\n  >\n    {{ 'orderDetails.cancellationAndReturn.setAll' | cxTranslate }}\n  </button>\n\n  <table class=\"cx-amend-order-items\">\n    <caption class=\"cx-visually-hidden\">\n      {{\n        'orderDetails.caption' | cxTranslate\n      }}\n    </caption>\n    <thead>\n      <tr>\n        <th role=\"columnheader\" class=\"cx-item-list-desc\">\n          {{ 'orderDetails.cancellationAndReturn.item' | cxTranslate }}\n        </th>\n        <th role=\"columnheader\" class=\"cx-item-list-price\">\n          {{ 'orderDetails.cancellationAndReturn.itemPrice' | cxTranslate }}\n        </th>\n        <th\n          *ngIf=\"!isConfirmation\"\n          role=\"columnheader\"\n          class=\"cx-item-list-amend-qty\"\n        >\n          {{ 'orderDetails.cancellationAndReturn.quantity' | cxTranslate }}\n        </th>\n        <th role=\"columnheader\" class=\"cx-item-list-qty\">\n          {{\n            (isCancellation()\n              ? 'orderDetails.cancellationAndReturn.cancelQty'\n              : 'orderDetails.cancellationAndReturn.returnQty'\n            ) | cxTranslate\n          }}\n        </th>\n        <th\n          *ngIf=\"isConfirmation\"\n          role=\"columnheader\"\n          class=\"cx-item-list-total\"\n        >\n          {{ 'orderDetails.cancellationAndReturn.totalPrice' | cxTranslate }}\n        </th>\n      </tr>\n    </thead>\n    <tbody class=\"cx-item-list-items\">\n      <!--    TODO: This should be a separate component-->\n      <tr\n        *ngFor=\"let item of entries; let i = index\"\n        class=\"cx-item-list-row cx-amend-order-item-row\"\n      >\n        <td role=\"cell\">\n          <div class=\"cx-table-item-container\">\n            <cx-media\n              [container]=\"item.product.images?.PRIMARY\"\n              format=\"thumbnail\"\n            ></cx-media>\n\n            <div class=\"cx-info\">\n              <div class=\"cx-name\">\n                {{ item.product.name }}\n              </div>\n\n              <div *ngIf=\"item.product.code\" class=\"cx-code\">\n                {{ 'cartItems.id' | cxTranslate }} {{ item.product.code }}\n              </div>\n            </div>\n\n            <ng-container *ngIf=\"item.product.baseOptions?.length\">\n              <div\n                *ngFor=\"\n                  let variant of item.product.baseOptions[0]?.selected\n                    ?.variantOptionQualifiers\n                \"\n                class=\"cx-property\"\n              >\n                <div class=\"cx-label\" *ngIf=\"variant.name\">\n                  {{ variant.name }}:\n                </div>\n                <div class=\"cx-value\" *ngIf=\"variant.value\">\n                  {{ variant.value }}\n                </div>\n              </div>\n            </ng-container>\n          </div>\n        </td>\n\n        <td role=\"cell\" class=\"cx-price\" *ngIf=\"item.basePrice\">\n          <div class=\"cx-mobile-header\">\n            {{ 'orderDetails.cancellationAndReturn.itemPrice' | cxTranslate }}\n          </div>\n          <div class=\"cx-value\">\n            {{ item.basePrice?.formattedValue }}\n          </div>\n        </td>\n\n        <td role=\"cell\" *ngIf=\"!isConfirmation\" class=\"cx-request-qty\">\n          <div\n            class=\"cx-mobile-header\"\n            title=\"{{ 'cartItems.quantityTitle' | cxTranslate }}\"\n          >\n            {{ 'orderDetails.cancellationAndReturn.quantity' | cxTranslate }}\n          </div>\n          <div class=\"cx-value\">\n            {{ getMaxAmendQuantity(item) }}\n          </div>\n        </td>\n\n        <td role=\"cell\" class=\"cx-quantity\">\n          <div class=\"cx-mobile-header\">\n            {{\n              (isCancellation()\n                ? 'orderDetails.cancellationAndReturn.cancelQty'\n                : 'orderDetails.cancellationAndReturn.returnQty'\n              ) | cxTranslate\n            }}\n          </div>\n          <div class=\"cx-value\">\n            <ng-container *ngIf=\"isConfirmation\">\n              {{ getControl(form, item).value }}\n            </ng-container>\n            <cx-item-counter\n              *ngIf=\"!isConfirmation\"\n              [min]=\"0\"\n              [max]=\"getMaxAmendQuantity(item)\"\n              [control]=\"getControl(form, item)\"\n            ></cx-item-counter>\n          </div>\n        </td>\n\n        <td role=\"cell\" *ngIf=\"isConfirmation\" class=\"cx-total\">\n          <div class=\"cx-mobile-header\">\n            {{ 'orderDetails.cancellationAndReturn.totalPrice' | cxTranslate }}\n          </div>\n          <div class=\"cx-value\">{{ getItemPrice(item)?.formattedValue }}</div>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: OrderAmendService }]; }, propDecorators: { entries: [{
                type: Input
            }], isConfirmation: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AmendOrderItemsModule {
}
AmendOrderItemsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AmendOrderItemsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AmendOrderItemsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AmendOrderItemsModule, declarations: [CancelOrReturnItemsComponent], imports: [CommonModule,
        ReactiveFormsModule,
        I18nModule,
        MediaModule,
        ItemCounterModule,
        FeaturesConfigModule,
        FormErrorsModule], exports: [CancelOrReturnItemsComponent] });
AmendOrderItemsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AmendOrderItemsModule, imports: [CommonModule,
        ReactiveFormsModule,
        I18nModule,
        MediaModule,
        ItemCounterModule,
        FeaturesConfigModule,
        FormErrorsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AmendOrderItemsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        I18nModule,
                        MediaModule,
                        ItemCounterModule,
                        FeaturesConfigModule,
                        FormErrorsModule,
                    ],
                    declarations: [CancelOrReturnItemsComponent],
                    exports: [CancelOrReturnItemsComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CancelOrderConfirmationComponent {
    constructor(orderAmendService) {
        this.orderAmendService = orderAmendService;
        this.form$ = this.orderAmendService
            .getForm()
            .pipe(tap((form) => (this.orderCode = form.value.orderCode)));
        this.entries$ = this.orderAmendService.getAmendedEntries();
    }
    submit(form) {
        if (form.valid) {
            this.orderAmendService.save();
        }
        else {
            form.markAllAsTouched();
        }
    }
}
CancelOrderConfirmationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CancelOrderConfirmationComponent, deps: [{ token: OrderAmendService }], target: i0.ɵɵFactoryTarget.Component });
CancelOrderConfirmationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CancelOrderConfirmationComponent, selector: "cx-cancel-order-confirmation", ngImport: i0, template: "<form\n  *ngIf=\"form$ | async as form\"\n  [formGroup]=\"form\"\n  (ngSubmit)=\"submit(form)\"\n>\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <cx-amend-order-items\n    *ngIf=\"entries$ | async as entries\"\n    [entries]=\"entries\"\n    [isConfirmation]=\"true\"\n  >\n  </cx-amend-order-items>\n\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <ng-template #actions>\n    <cx-amend-order-actions\n      *ngIf=\"orderCode\"\n      [orderCode]=\"orderCode\"\n      [amendOrderForm]=\"form\"\n      backRoute=\"orderCancel\"\n    ></cx-amend-order-actions>\n  </ng-template>\n</form>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i3$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "component", type: CancelOrReturnItemsComponent, selector: "cx-amend-order-items", inputs: ["entries", "isConfirmation"] }, { kind: "component", type: AmendOrderActionsComponent, selector: "cx-amend-order-actions", inputs: ["orderCode", "amendOrderForm", "backRoute", "forwardRoute"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CancelOrderConfirmationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-cancel-order-confirmation', changeDetection: ChangeDetectionStrategy.OnPush, template: "<form\n  *ngIf=\"form$ | async as form\"\n  [formGroup]=\"form\"\n  (ngSubmit)=\"submit(form)\"\n>\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <cx-amend-order-items\n    *ngIf=\"entries$ | async as entries\"\n    [entries]=\"entries\"\n    [isConfirmation]=\"true\"\n  >\n  </cx-amend-order-items>\n\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <ng-template #actions>\n    <cx-amend-order-actions\n      *ngIf=\"orderCode\"\n      [orderCode]=\"orderCode\"\n      [amendOrderForm]=\"form\"\n      backRoute=\"orderCancel\"\n    ></cx-amend-order-actions>\n  </ng-template>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: OrderAmendService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderCancellationService extends OrderAmendService {
    constructor(orderDetailsService, orderHistoryFacade, routing, globalMessageService) {
        super(orderDetailsService);
        this.orderDetailsService = orderDetailsService;
        this.orderHistoryFacade = orderHistoryFacade;
        this.routing = routing;
        this.globalMessageService = globalMessageService;
        this.amendType = AmendOrderType.CANCEL;
    }
    /**
     * Return cancellable order entries.
     */
    getEntries() {
        return this.getOrder().pipe(filter((order) => !!order?.entries), map((order) => order.entries?.filter((entry) => entry.entryNumber !== -1 &&
            entry.cancellableQuantity &&
            entry.cancellableQuantity > 0) ?? []));
    }
    save() {
        const orderCode = this.form.value.orderCode;
        const entries = this.form.value.entries;
        const inputs = Object.keys(entries)
            .filter((entryNumber) => entries[entryNumber] > 0)
            .map((entryNumber) => ({
            orderEntryNumber: Number(entryNumber),
            quantity: entries[entryNumber],
        }));
        this.form.reset();
        this.orderHistoryFacade.cancelOrder(orderCode, {
            cancellationRequestEntryInputs: inputs,
        });
        this.orderHistoryFacade
            .getCancelOrderSuccess()
            .pipe(first(Boolean))
            .subscribe(() => this.afterSave(orderCode));
    }
    afterSave(orderCode) {
        this.orderHistoryFacade.resetCancelOrderProcessState();
        this.globalMessageService.add({
            key: 'orderDetails.cancellationAndReturn.cancelSuccess',
            params: { orderCode },
        }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        this.routing.go({
            cxRoute: 'orders',
        });
    }
}
OrderCancellationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderCancellationService, deps: [{ token: OrderDetailsService }, { token: i1.OrderHistoryFacade }, { token: i2.RoutingService }, { token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
OrderCancellationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderCancellationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderCancellationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: OrderDetailsService }, { type: i1.OrderHistoryFacade }, { type: i2.RoutingService }, { type: i2.GlobalMessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderCancellationGuard {
    constructor(orderAmendService, semanticPathService, router) {
        this.orderAmendService = orderAmendService;
        this.semanticPathService = semanticPathService;
        this.router = router;
    }
    canActivate() {
        return this.orderAmendService.getForm().pipe(map((form) => {
            if (!form.valid) {
                // the order code is not available in the route
                // as long as we're inside a guard, hence we redirect
                // to the common orders page.
                return this.router.parseUrl(this.semanticPathService.get('orders') ?? '');
            }
            else {
                return true;
            }
        }));
    }
}
OrderCancellationGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderCancellationGuard, deps: [{ token: OrderCancellationService }, { token: i2.SemanticPathService }, { token: i2$2.Router }], target: i0.ɵɵFactoryTarget.Injectable });
OrderCancellationGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderCancellationGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderCancellationGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: OrderCancellationService }, { type: i2.SemanticPathService }, { type: i2$2.Router }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CancelOrderConfirmationModule {
}
CancelOrderConfirmationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CancelOrderConfirmationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CancelOrderConfirmationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CancelOrderConfirmationModule, declarations: [CancelOrderConfirmationComponent], imports: [CommonModule,
        ReactiveFormsModule,
        AmendOrderItemsModule,
        AmendOrderActionsModule], exports: [CancelOrderConfirmationComponent] });
CancelOrderConfirmationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CancelOrderConfirmationModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CancelOrderConfirmationComponent: {
                    component: CancelOrderConfirmationComponent,
                    guards: [AuthGuard, OrderCancellationGuard],
                    providers: [
                        {
                            provide: OrderAmendService,
                            useExisting: OrderCancellationService,
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        ReactiveFormsModule,
        AmendOrderItemsModule,
        AmendOrderActionsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CancelOrderConfirmationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        AmendOrderItemsModule,
                        AmendOrderActionsModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CancelOrderConfirmationComponent: {
                                    component: CancelOrderConfirmationComponent,
                                    guards: [AuthGuard, OrderCancellationGuard],
                                    providers: [
                                        {
                                            provide: OrderAmendService,
                                            useExisting: OrderCancellationService,
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [CancelOrderConfirmationComponent],
                    exports: [CancelOrderConfirmationComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CancelOrderComponent {
    constructor(orderAmendService) {
        this.orderAmendService = orderAmendService;
        this.globalMessageType = GlobalMessageType;
        this.form$ = this.orderAmendService
            .getForm()
            .pipe(tap((form) => (this.orderCode = form.value.orderCode)));
        this.entries$ = this.orderAmendService.getEntries();
    }
}
CancelOrderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CancelOrderComponent, deps: [{ token: OrderAmendService }], target: i0.ɵɵFactoryTarget.Component });
CancelOrderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CancelOrderComponent, selector: "cx-cancel-order", ngImport: i0, template: "<ng-container *ngIf=\"form$ | async as form\">\n  <cx-message\n    role=\"alert\"\n    *ngIf=\"!form.get('entries').valid && form.get('entries').touched\"\n    [text]=\"'formErrors.cxNoSelectedItemToCancel' | cxTranslate\"\n    [isVisibleCloseButton]=\"false\"\n    [type]=\"globalMessageType.MSG_TYPE_ERROR\"\n  >\n  </cx-message>\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n  <cx-amend-order-items *ngIf=\"entries$ | async as entries\" [entries]=\"entries\">\n  </cx-amend-order-items>\n\n  <cx-form-errors [control]=\"form.get('entries')\"></cx-form-errors>\n\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <ng-template #actions>\n    <cx-amend-order-actions\n      *ngIf=\"orderCode\"\n      [orderCode]=\"orderCode\"\n      [amendOrderForm]=\"form\"\n      backRoute=\"orderDetails\"\n      forwardRoute=\"orderCancelConfirmation\"\n    ></cx-amend-order-actions>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: CancelOrReturnItemsComponent, selector: "cx-amend-order-items", inputs: ["entries", "isConfirmation"] }, { kind: "component", type: AmendOrderActionsComponent, selector: "cx-amend-order-actions", inputs: ["orderCode", "amendOrderForm", "backRoute", "forwardRoute"] }, { kind: "component", type: i3.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "component", type: i3.MessageComponent, selector: "cx-message", inputs: ["text", "actionButtonText", "actionButtonMessage", "accordionText", "showBody", "isVisibleCloseButton", "type"], outputs: ["closeMessage", "buttonAction"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CancelOrderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-cancel-order', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"form$ | async as form\">\n  <cx-message\n    role=\"alert\"\n    *ngIf=\"!form.get('entries').valid && form.get('entries').touched\"\n    [text]=\"'formErrors.cxNoSelectedItemToCancel' | cxTranslate\"\n    [isVisibleCloseButton]=\"false\"\n    [type]=\"globalMessageType.MSG_TYPE_ERROR\"\n  >\n  </cx-message>\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n  <cx-amend-order-items *ngIf=\"entries$ | async as entries\" [entries]=\"entries\">\n  </cx-amend-order-items>\n\n  <cx-form-errors [control]=\"form.get('entries')\"></cx-form-errors>\n\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <ng-template #actions>\n    <cx-amend-order-actions\n      *ngIf=\"orderCode\"\n      [orderCode]=\"orderCode\"\n      [amendOrderForm]=\"form\"\n      backRoute=\"orderDetails\"\n      forwardRoute=\"orderCancelConfirmation\"\n    ></cx-amend-order-actions>\n  </ng-template>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: OrderAmendService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CancelOrderModule {
}
CancelOrderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CancelOrderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CancelOrderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CancelOrderModule, declarations: [CancelOrderComponent], imports: [CommonModule,
        I18nModule,
        AmendOrderItemsModule,
        AmendOrderActionsModule,
        FormErrorsModule,
        MessageComponentModule], exports: [CancelOrderComponent] });
CancelOrderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CancelOrderModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CancelOrderComponent: {
                    component: CancelOrderComponent,
                    guards: [AuthGuard],
                    providers: [
                        {
                            provide: OrderAmendService,
                            useExisting: OrderCancellationService,
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        I18nModule,
        AmendOrderItemsModule,
        AmendOrderActionsModule,
        FormErrorsModule,
        MessageComponentModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CancelOrderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        AmendOrderItemsModule,
                        AmendOrderActionsModule,
                        FormErrorsModule,
                        MessageComponentModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CancelOrderComponent: {
                                    component: CancelOrderComponent,
                                    guards: [AuthGuard],
                                    providers: [
                                        {
                                            provide: OrderAmendService,
                                            useExisting: OrderCancellationService,
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [CancelOrderComponent],
                    exports: [CancelOrderComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderCancellationModule {
}
OrderCancellationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderCancellationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderCancellationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderCancellationModule, imports: [CancelOrderModule, CancelOrderConfirmationModule] });
OrderCancellationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderCancellationModule, imports: [CancelOrderModule, CancelOrderConfirmationModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderCancellationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CancelOrderModule, CancelOrderConfirmationModule],
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
class OrderReturnService extends OrderAmendService {
    constructor(orderDetailsService, returnRequestService, routing, globalMessageService) {
        super(orderDetailsService);
        this.orderDetailsService = orderDetailsService;
        this.returnRequestService = returnRequestService;
        this.routing = routing;
        this.globalMessageService = globalMessageService;
        this.amendType = AmendOrderType.RETURN;
    }
    getEntries() {
        return this.getOrder().pipe(filter((order) => !!order.entries), map((order) => order.entries?.filter((entry) => entry.entryNumber !== -1 &&
            entry.returnableQuantity &&
            entry.returnableQuantity > 0) ?? []));
    }
    save() {
        const orderCode = this.form.value.orderCode;
        const entries = this.form.value.entries;
        const inputs = Object.keys(entries)
            .filter((entryNumber) => entries[entryNumber] > 0)
            .map((entryNumber) => ({
            orderEntryNumber: Number(entryNumber),
            quantity: entries[entryNumber],
        }));
        this.form.reset();
        this.returnRequestService.createOrderReturnRequest({
            orderCode,
            returnRequestEntryInputs: inputs,
        });
        this.returnRequestService
            .getReturnRequestSuccess()
            .pipe(first(Boolean))
            .subscribe(() => this.afterSave());
    }
    afterSave() {
        this.returnRequestService
            .getOrderReturnRequest()
            .pipe(first((r) => !!r))
            .subscribe((returnRequest) => {
            const rma = returnRequest.rma;
            this.globalMessageService.add({
                key: 'orderDetails.cancellationAndReturn.returnSuccess',
                params: { rma },
            }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
            this.routing.go({
                cxRoute: 'returnRequestDetails',
                params: { rma },
            });
        });
    }
}
OrderReturnService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnService, deps: [{ token: OrderDetailsService }, { token: i1.OrderReturnRequestFacade }, { token: i2.RoutingService }, { token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
OrderReturnService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: OrderDetailsService }, { type: i1.OrderReturnRequestFacade }, { type: i2.RoutingService }, { type: i2.GlobalMessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderReturnGuard {
    constructor(orderAmendService, semanticPathService, router) {
        this.orderAmendService = orderAmendService;
        this.semanticPathService = semanticPathService;
        this.router = router;
    }
    canActivate() {
        return this.orderAmendService.getForm().pipe(map((form) => {
            if (!form.valid) {
                // the order code is not available in the route
                // as long as we're inside a guard, hence we redirect
                // to the common orders page.
                return this.router.parseUrl(this.semanticPathService.get('orders') ?? '');
            }
            else {
                return true;
            }
        }));
    }
}
OrderReturnGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnGuard, deps: [{ token: OrderReturnService }, { token: i2.SemanticPathService }, { token: i2$2.Router }], target: i0.ɵɵFactoryTarget.Injectable });
OrderReturnGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: OrderReturnService }, { type: i2.SemanticPathService }, { type: i2$2.Router }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReturnOrderConfirmationComponent {
    constructor(orderAmendService) {
        this.orderAmendService = orderAmendService;
        this.form$ = this.orderAmendService
            .getForm()
            .pipe(tap((form) => (this.orderCode = form.value.orderCode)));
        this.entries$ = this.orderAmendService.getAmendedEntries();
    }
    submit(form) {
        form.disable();
        this.orderAmendService.save();
    }
}
ReturnOrderConfirmationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnOrderConfirmationComponent, deps: [{ token: OrderAmendService }], target: i0.ɵɵFactoryTarget.Component });
ReturnOrderConfirmationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ReturnOrderConfirmationComponent, selector: "cx-return-order-confirmation", ngImport: i0, template: "<form\n  *ngIf=\"form$ | async as form\"\n  [formGroup]=\"form\"\n  (ngSubmit)=\"submit(form)\"\n>\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <cx-amend-order-items\n    *ngIf=\"entries$ | async as entries\"\n    [entries]=\"entries\"\n    [isConfirmation]=\"true\"\n  >\n  </cx-amend-order-items>\n\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <ng-template #actions>\n    <cx-amend-order-actions\n      *ngIf=\"orderCode\"\n      [orderCode]=\"orderCode\"\n      [amendOrderForm]=\"form\"\n      backRoute=\"orderReturn\"\n    ></cx-amend-order-actions>\n  </ng-template>\n</form>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: CancelOrReturnItemsComponent, selector: "cx-amend-order-items", inputs: ["entries", "isConfirmation"] }, { kind: "directive", type: i3$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "component", type: AmendOrderActionsComponent, selector: "cx-amend-order-actions", inputs: ["orderCode", "amendOrderForm", "backRoute", "forwardRoute"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnOrderConfirmationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-return-order-confirmation', changeDetection: ChangeDetectionStrategy.OnPush, template: "<form\n  *ngIf=\"form$ | async as form\"\n  [formGroup]=\"form\"\n  (ngSubmit)=\"submit(form)\"\n>\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <cx-amend-order-items\n    *ngIf=\"entries$ | async as entries\"\n    [entries]=\"entries\"\n    [isConfirmation]=\"true\"\n  >\n  </cx-amend-order-items>\n\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <ng-template #actions>\n    <cx-amend-order-actions\n      *ngIf=\"orderCode\"\n      [orderCode]=\"orderCode\"\n      [amendOrderForm]=\"form\"\n      backRoute=\"orderReturn\"\n    ></cx-amend-order-actions>\n  </ng-template>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: OrderAmendService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReturnOrderConfirmationModule {
}
ReturnOrderConfirmationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnOrderConfirmationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReturnOrderConfirmationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ReturnOrderConfirmationModule, declarations: [ReturnOrderConfirmationComponent], imports: [CommonModule,
        AmendOrderItemsModule,
        I18nModule,
        ReactiveFormsModule,
        AmendOrderActionsModule], exports: [ReturnOrderConfirmationComponent] });
ReturnOrderConfirmationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnOrderConfirmationModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ReturnOrderConfirmationComponent: {
                    component: ReturnOrderConfirmationComponent,
                    guards: [AuthGuard, OrderReturnGuard],
                    providers: [
                        {
                            provide: OrderAmendService,
                            useExisting: OrderReturnService,
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        AmendOrderItemsModule,
        I18nModule,
        ReactiveFormsModule,
        AmendOrderActionsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnOrderConfirmationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        AmendOrderItemsModule,
                        I18nModule,
                        ReactiveFormsModule,
                        AmendOrderActionsModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ReturnOrderConfirmationComponent: {
                                    component: ReturnOrderConfirmationComponent,
                                    guards: [AuthGuard, OrderReturnGuard],
                                    providers: [
                                        {
                                            provide: OrderAmendService,
                                            useExisting: OrderReturnService,
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [ReturnOrderConfirmationComponent],
                    exports: [ReturnOrderConfirmationComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReturnOrderComponent {
    constructor(orderAmendService) {
        this.orderAmendService = orderAmendService;
        this.form$ = this.orderAmendService
            .getForm()
            .pipe(tap((form) => (this.orderCode = form.value.orderCode)));
        this.entries$ = this.orderAmendService.getEntries();
    }
}
ReturnOrderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnOrderComponent, deps: [{ token: OrderAmendService }], target: i0.ɵɵFactoryTarget.Component });
ReturnOrderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ReturnOrderComponent, selector: "cx-return-order", ngImport: i0, template: "<ng-container *ngIf=\"form$ | async as form\">\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <cx-amend-order-items *ngIf=\"entries$ | async as entries\" [entries]=\"entries\">\n  </cx-amend-order-items>\n\n  <cx-form-errors [control]=\"form.get('entries')\"></cx-form-errors>\n\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <ng-template #actions>\n    <cx-amend-order-actions\n      *ngIf=\"orderCode\"\n      [orderCode]=\"orderCode\"\n      [amendOrderForm]=\"form\"\n      backRoute=\"orderDetails\"\n      forwardRoute=\"orderReturnConfirmation\"\n    ></cx-amend-order-actions>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: CancelOrReturnItemsComponent, selector: "cx-amend-order-items", inputs: ["entries", "isConfirmation"] }, { kind: "component", type: AmendOrderActionsComponent, selector: "cx-amend-order-actions", inputs: ["orderCode", "amendOrderForm", "backRoute", "forwardRoute"] }, { kind: "component", type: i3.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnOrderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-return-order', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"form$ | async as form\">\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <cx-amend-order-items *ngIf=\"entries$ | async as entries\" [entries]=\"entries\">\n  </cx-amend-order-items>\n\n  <cx-form-errors [control]=\"form.get('entries')\"></cx-form-errors>\n\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <ng-template #actions>\n    <cx-amend-order-actions\n      *ngIf=\"orderCode\"\n      [orderCode]=\"orderCode\"\n      [amendOrderForm]=\"form\"\n      backRoute=\"orderDetails\"\n      forwardRoute=\"orderReturnConfirmation\"\n    ></cx-amend-order-actions>\n  </ng-template>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: OrderAmendService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReturnOrderModule {
}
ReturnOrderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnOrderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReturnOrderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ReturnOrderModule, declarations: [ReturnOrderComponent], imports: [CommonModule,
        AmendOrderItemsModule,
        AmendOrderActionsModule,
        FormErrorsModule], exports: [ReturnOrderComponent] });
ReturnOrderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnOrderModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ReturnOrderComponent: {
                    component: ReturnOrderComponent,
                    guards: [AuthGuard],
                    providers: [
                        {
                            provide: OrderAmendService,
                            useExisting: OrderReturnService,
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        AmendOrderItemsModule,
        AmendOrderActionsModule,
        FormErrorsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnOrderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        AmendOrderItemsModule,
                        AmendOrderActionsModule,
                        FormErrorsModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ReturnOrderComponent: {
                                    component: ReturnOrderComponent,
                                    guards: [AuthGuard],
                                    providers: [
                                        {
                                            provide: OrderAmendService,
                                            useExisting: OrderReturnService,
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [ReturnOrderComponent],
                    exports: [ReturnOrderComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderReturnModule {
}
OrderReturnModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderReturnModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnModule, imports: [ReturnOrderModule, ReturnOrderConfirmationModule] });
OrderReturnModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnModule, imports: [ReturnOrderModule, ReturnOrderConfirmationModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ReturnOrderModule, ReturnOrderConfirmationModule],
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderConfirmationGuard {
    constructor(orderFacade, router, semanticPathService) {
        this.orderFacade = orderFacade;
        this.router = router;
        this.semanticPathService = semanticPathService;
    }
    canActivate() {
        return this.orderFacade.getOrderDetails().pipe(map((orderDetails) => {
            if (orderDetails && Object.keys(orderDetails).length !== 0) {
                return true;
            }
            else {
                return this.router.parseUrl(this.semanticPathService.get('orders') ?? '');
            }
        }));
    }
}
OrderConfirmationGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationGuard, deps: [{ token: i1.OrderFacade }, { token: i2$2.Router }, { token: i2.SemanticPathService }], target: i0.ɵɵFactoryTarget.Injectable });
OrderConfirmationGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.OrderFacade }, { type: i2$2.Router }, { type: i2.SemanticPathService }]; } });

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
class MyAccountV2OrdersComponent {
    constructor() {
        this.service = inject(MyAccountV2OrderHistoryService);
        this.PAGE_SIZE = 3;
        this.orders$ = this.service
            .getOrderHistoryList(this.PAGE_SIZE)
            .pipe(tap(() => this.isLoaded$.next(true)));
        this.isLoaded$ = new BehaviorSubject(false);
    }
    getProduct(order) {
        if (order.entries) {
            for (const entry of order.entries) {
                if (entry.product && entry.product.name && entry.product.images) {
                    return entry.product;
                }
            }
            return order.entries[0].product;
        }
    }
    ngOnDestroy() {
        this.isLoaded$.next(false);
        this.service.clearOrderList();
    }
}
MyAccountV2OrdersComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrdersComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MyAccountV2OrdersComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: MyAccountV2OrdersComponent, selector: "cx-my-account-v2-orders", ngImport: i0, template: "<div class=\"cx-my-account-view-header\">\n  <!-- HEADER -->\n  <div\n    class=\"cx-my-account-view-heading\"\n    [attr.aria-label]=\"'myAccountV2OrderHistory.orderListResults' | cxTranslate\"\n  >\n    {{ 'myAccountV2Orders.heading' | cxTranslate }}\n  </div>\n\n  <!-- SHOW MORE -->\n  <div class=\"cx-my-account-view-show-more\">\n    <a\n      id=\"show-more-orders\"\n      [attr.aria-label]=\"'myAccountV2Orders.showMore' | cxTranslate\"\n      class=\"btn-link cx-action-link\"\n      [routerLink]=\"\n        {\n          cxRoute: 'orders'\n        } | cxUrl\n      \"\n    >\n      {{ 'myAccountV2Orders.showMore' | cxTranslate }}\n    </a>\n  </div>\n</div>\n\n<div *ngIf=\"orders$ | async as orderHistory; else noOrder\">\n  <!-- BODY -->\n  <ng-container *ngIf=\"orderHistory.pagination.totalResults > 0; else noOrder\">\n    <div class=\"cx-my-account-view-body\">\n      <ng-container *ngFor=\"let order of orderHistory.orders\">\n        <div class=\"cx-my-account-view-order\">\n          <div class=\"cx-my-account-view-order-header\">\n            <div\n              class=\"cx-my-account-view-status\"\n              *ngIf=\"order.statusDisplay\"\n              [attr.aria-label]=\"\n                'myAccountV2Orders.orderStatusLabel' | cxTranslate\n              \"\n            >\n              {{\n                'orderDetails.statusDisplay_' + order.statusDisplay\n                  | cxTranslate\n              }}\n            </div>\n            <div\n              class=\"cx-my-account-view-code\"\n              [attr.aria-label]=\"\n                'myAccountV2OrderHistory.orderCodeLabel' | cxTranslate\n              \"\n            >\n              {{\n                'myAccountV2Orders.orderNumber'\n                  | cxTranslate: { value: order.code }\n              }}\n            </div>\n          </div>\n          <div class=\"cx-my-account-view-order-body\">\n            <ng-container *ngIf=\"getProduct(order) as product\">\n              <div class=\"cx-my-account-view-order-column-1\">\n                <div class=\"cx-my-account-view-order-column-1-image\">\n                  <cx-media\n                    [container]=\"product.images?.PRIMARY\"\n                    class=\"cx-my-account-view-order-img\"\n                    format=\"thumbnail\"\n                    role=\"presentation\"\n                  ></cx-media>\n                </div>\n                <div class=\"cx-my-account-view-order-column-1-details\">\n                  <div class=\"cx-my-account-view-order-column-1-details-top\">\n                    <div class=\"cx-my-account-view-product-name\">\n                      {{ product.name }}\n                      <span *ngIf=\"order.totalItems - 1 > 1\">\n                        +\n                        {{\n                          'myAccountV2Orders.items'\n                            | cxTranslate: { value: order.totalItems - 1 }\n                        }}\n                      </span>\n                      <span *ngIf=\"order.totalItems - 1 === 1\">\n                        +\n                        {{\n                          'myAccountV2Orders.item' | cxTranslate: { value: 1 }\n                        }}\n                      </span>\n                    </div>\n                    <div class=\"cx-my-account-view-purchased-on\">\n                      {{\n                        'myAccountV2Orders.purchasedOn'\n                          | cxTranslate\n                            : {\n                                value: order.placed | cxDate: 'd, MMMM, yyyy'\n                              }\n                      }}\n                    </div>\n                    <div class=\"cx-my-account-view-item-count\">\n                      {{\n                        'myAccountV2Orders.orderedItems'\n                          | cxTranslate: { value: order.totalItems }\n                      }}\n                    </div>\n                  </div>\n                  <div class=\"cx-my-account-view-order-column-1-details-bottom\">\n                    <div class=\"cx-my-account-view-total-price\">\n                      {{\n                        'myAccountV2Orders.totalPrice'\n                          | cxTranslate: { value: order.total?.formattedValue }\n                      }}\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class=\"cx-my-account-view-order-column-2\">\n                <!-- order details -->\n                <span>\n                  <a\n                    class=\"btn-link cx-action-link\"\n                    [attr.aria-label]=\"\n                      'myAccountV2Orders.orderDetailsLabel' | cxTranslate\n                    \"\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'orderDetails',\n                        params: order\n                      } | cxUrl\n                    \"\n                  >\n                    {{ 'myAccountV2Orders.orderDetails' | cxTranslate }}\n                  </a>\n                </span>\n                <!-- return order -->\n                <span *ngIf=\"order.returnable\">\n                  {{ ' | '\n                  }}<a\n                    class=\"btn-link cx-action-link\"\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'orderReturn',\n                        params: order\n                      } | cxUrl\n                    \"\n                  >\n                    {{ 'myAccountV2Orders.returnOrder' | cxTranslate }}\n                  </a>\n                </span>\n              </div>\n            </ng-container>\n          </div>\n        </div>\n      </ng-container>\n    </div>\n  </ng-container>\n</div>\n<!-- NO ORDER CONTAINER -->\n<ng-template #noOrder>\n  <div class=\"cx-my-account-no-order\" *ngIf=\"isLoaded$ | async; else loading\">\n    <div [attr.aria-label]=\"'orderHistory.notFound' | cxTranslate\">\n      {{ 'orderHistory.noOrders' | cxTranslate }}\n    </div>\n    <a\n      [routerLink]=\"{ cxRoute: 'home' } | cxUrl\"\n      routerLinkActive=\"active\"\n      class=\"cx-no-order\"\n      >{{ 'orderHistory.startShopping' | cxTranslate }}</a\n    >\n  </div>\n</ng-template>\n\n<!-- ORDER HISTORY DATA STILL LOADING -->\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i2$2.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "component", type: i3.SpinnerComponent, selector: "cx-spinner" }, { kind: "component", type: i3.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.CxDatePipe, name: "cxDate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrdersComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-my-account-v2-orders', template: "<div class=\"cx-my-account-view-header\">\n  <!-- HEADER -->\n  <div\n    class=\"cx-my-account-view-heading\"\n    [attr.aria-label]=\"'myAccountV2OrderHistory.orderListResults' | cxTranslate\"\n  >\n    {{ 'myAccountV2Orders.heading' | cxTranslate }}\n  </div>\n\n  <!-- SHOW MORE -->\n  <div class=\"cx-my-account-view-show-more\">\n    <a\n      id=\"show-more-orders\"\n      [attr.aria-label]=\"'myAccountV2Orders.showMore' | cxTranslate\"\n      class=\"btn-link cx-action-link\"\n      [routerLink]=\"\n        {\n          cxRoute: 'orders'\n        } | cxUrl\n      \"\n    >\n      {{ 'myAccountV2Orders.showMore' | cxTranslate }}\n    </a>\n  </div>\n</div>\n\n<div *ngIf=\"orders$ | async as orderHistory; else noOrder\">\n  <!-- BODY -->\n  <ng-container *ngIf=\"orderHistory.pagination.totalResults > 0; else noOrder\">\n    <div class=\"cx-my-account-view-body\">\n      <ng-container *ngFor=\"let order of orderHistory.orders\">\n        <div class=\"cx-my-account-view-order\">\n          <div class=\"cx-my-account-view-order-header\">\n            <div\n              class=\"cx-my-account-view-status\"\n              *ngIf=\"order.statusDisplay\"\n              [attr.aria-label]=\"\n                'myAccountV2Orders.orderStatusLabel' | cxTranslate\n              \"\n            >\n              {{\n                'orderDetails.statusDisplay_' + order.statusDisplay\n                  | cxTranslate\n              }}\n            </div>\n            <div\n              class=\"cx-my-account-view-code\"\n              [attr.aria-label]=\"\n                'myAccountV2OrderHistory.orderCodeLabel' | cxTranslate\n              \"\n            >\n              {{\n                'myAccountV2Orders.orderNumber'\n                  | cxTranslate: { value: order.code }\n              }}\n            </div>\n          </div>\n          <div class=\"cx-my-account-view-order-body\">\n            <ng-container *ngIf=\"getProduct(order) as product\">\n              <div class=\"cx-my-account-view-order-column-1\">\n                <div class=\"cx-my-account-view-order-column-1-image\">\n                  <cx-media\n                    [container]=\"product.images?.PRIMARY\"\n                    class=\"cx-my-account-view-order-img\"\n                    format=\"thumbnail\"\n                    role=\"presentation\"\n                  ></cx-media>\n                </div>\n                <div class=\"cx-my-account-view-order-column-1-details\">\n                  <div class=\"cx-my-account-view-order-column-1-details-top\">\n                    <div class=\"cx-my-account-view-product-name\">\n                      {{ product.name }}\n                      <span *ngIf=\"order.totalItems - 1 > 1\">\n                        +\n                        {{\n                          'myAccountV2Orders.items'\n                            | cxTranslate: { value: order.totalItems - 1 }\n                        }}\n                      </span>\n                      <span *ngIf=\"order.totalItems - 1 === 1\">\n                        +\n                        {{\n                          'myAccountV2Orders.item' | cxTranslate: { value: 1 }\n                        }}\n                      </span>\n                    </div>\n                    <div class=\"cx-my-account-view-purchased-on\">\n                      {{\n                        'myAccountV2Orders.purchasedOn'\n                          | cxTranslate\n                            : {\n                                value: order.placed | cxDate: 'd, MMMM, yyyy'\n                              }\n                      }}\n                    </div>\n                    <div class=\"cx-my-account-view-item-count\">\n                      {{\n                        'myAccountV2Orders.orderedItems'\n                          | cxTranslate: { value: order.totalItems }\n                      }}\n                    </div>\n                  </div>\n                  <div class=\"cx-my-account-view-order-column-1-details-bottom\">\n                    <div class=\"cx-my-account-view-total-price\">\n                      {{\n                        'myAccountV2Orders.totalPrice'\n                          | cxTranslate: { value: order.total?.formattedValue }\n                      }}\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class=\"cx-my-account-view-order-column-2\">\n                <!-- order details -->\n                <span>\n                  <a\n                    class=\"btn-link cx-action-link\"\n                    [attr.aria-label]=\"\n                      'myAccountV2Orders.orderDetailsLabel' | cxTranslate\n                    \"\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'orderDetails',\n                        params: order\n                      } | cxUrl\n                    \"\n                  >\n                    {{ 'myAccountV2Orders.orderDetails' | cxTranslate }}\n                  </a>\n                </span>\n                <!-- return order -->\n                <span *ngIf=\"order.returnable\">\n                  {{ ' | '\n                  }}<a\n                    class=\"btn-link cx-action-link\"\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'orderReturn',\n                        params: order\n                      } | cxUrl\n                    \"\n                  >\n                    {{ 'myAccountV2Orders.returnOrder' | cxTranslate }}\n                  </a>\n                </span>\n              </div>\n            </ng-container>\n          </div>\n        </div>\n      </ng-container>\n    </div>\n  </ng-container>\n</div>\n<!-- NO ORDER CONTAINER -->\n<ng-template #noOrder>\n  <div class=\"cx-my-account-no-order\" *ngIf=\"isLoaded$ | async; else loading\">\n    <div [attr.aria-label]=\"'orderHistory.notFound' | cxTranslate\">\n      {{ 'orderHistory.noOrders' | cxTranslate }}\n    </div>\n    <a\n      [routerLink]=\"{ cxRoute: 'home' } | cxUrl\"\n      routerLinkActive=\"active\"\n      class=\"cx-no-order\"\n      >{{ 'orderHistory.startShopping' | cxTranslate }}</a\n    >\n  </div>\n</ng-template>\n\n<!-- ORDER HISTORY DATA STILL LOADING -->\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MyAccountV2OrdersModule {
}
MyAccountV2OrdersModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrdersModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MyAccountV2OrdersModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrdersModule, declarations: [MyAccountV2OrdersComponent], imports: [CommonModule,
        RouterModule,
        FormsModule,
        SpinnerModule,
        UrlModule,
        I18nModule,
        MediaModule], exports: [MyAccountV2OrdersComponent] });
MyAccountV2OrdersModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrdersModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                MyAccountViewOrderComponent: {
                    component: MyAccountV2OrdersComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        FormsModule,
        SpinnerModule,
        UrlModule,
        I18nModule,
        MediaModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrdersModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        FormsModule,
                        SpinnerModule,
                        UrlModule,
                        I18nModule,
                        MediaModule,
                    ],
                    declarations: [MyAccountV2OrdersComponent],
                    exports: [MyAccountV2OrdersComponent],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                MyAccountViewOrderComponent: {
                                    component: MyAccountV2OrdersComponent,
                                    guards: [AuthGuard],
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
class OrderDetailBillingComponent {
    constructor(orderDetailsService, translationService) {
        this.orderDetailsService = orderDetailsService;
        this.translationService = translationService;
        this.order$ = this.orderDetailsService.getOrderDetails();
    }
    getPaymentMethodCard(paymentDetails) {
        return combineLatest([
            this.translationService.translate('paymentForm.payment'),
            this.translationService.translate('paymentCard.expires', {
                month: paymentDetails.expiryMonth,
                year: paymentDetails.expiryYear,
            }),
        ]).pipe(map(([textTitle, textExpires]) => paymentMethodCard(textTitle, textExpires, paymentDetails)));
    }
    getBillingAddressCard(paymentDetails) {
        return combineLatest([
            this.translationService.translate('paymentForm.billingAddress'),
            this.translationService.translate('addressCard.billTo'),
        ]).pipe(map(([billingAddress, billTo]) => billingAddressCard(billingAddress, billTo, paymentDetails)));
    }
    isPaymentInfoCardFull(payment) {
        return (!!payment?.cardNumber && !!payment?.expiryMonth && !!payment?.expiryYear);
    }
}
OrderDetailBillingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailBillingComponent, deps: [{ token: OrderDetailsService }, { token: i2.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
OrderDetailBillingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: OrderDetailBillingComponent, selector: "cx-order-detail-billing", ngImport: i0, template: "<div class=\"cx-order-items\" *ngIf=\"order$ | async as order\">\n  <div class=\"cx-review-summary\" *ngIf=\"order.paymentInfo as paymentDetails\">\n    <ng-container *cxFeatureLevel=\"'!6.6'\">\n      <div class=\"cx-review-summary-card cx-review-summary-payment-card\">\n        <cx-card\n          [content]=\"getPaymentMethodCard(paymentDetails) | async\"\n        ></cx-card>\n      </div>\n    </ng-container>\n    <ng-container *cxFeatureLevel=\"'6.6'\">\n      <div\n        class=\"cx-review-summary-card cx-review-summary-payment-card\"\n        *ngIf=\"isPaymentInfoCardFull(paymentDetails)\"\n      >\n        <cx-card\n          [content]=\"getPaymentMethodCard(paymentDetails) | async\"\n        ></cx-card>\n      </div>\n    </ng-container>\n    <ng-container *cxFeatureLevel=\"'!6.6'\">\n      <div class=\"cx-review-summary-card cx-review-summary-payment-card\">\n        <cx-card\n          [content]=\"getBillingAddressCard(paymentDetails) | async\"\n        ></cx-card>\n      </div>\n    </ng-container>\n    <ng-container *cxFeatureLevel=\"'6.6'\">\n      <div\n        class=\"cx-review-summary-card cx-review-summary-payment-card\"\n        *ngIf=\"paymentDetails?.billingAddress\"\n      >\n        <cx-card\n          [content]=\"getBillingAddressCard(paymentDetails) | async\"\n        ></cx-card>\n      </div>\n    </ng-container>\n  </div>\n</div>\n", dependencies: [{ kind: "component", type: i3.CardComponent, selector: "cx-card", inputs: ["border", "editMode", "isDefault", "content", "fitToContainer", "truncateText", "charactersLimit", "index"], outputs: ["deleteCard", "setDefaultCard", "sendCard", "editCard", "cancelCard"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.FeatureLevelDirective, selector: "[cxFeatureLevel]", inputs: ["cxFeatureLevel"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailBillingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-detail-billing', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-order-items\" *ngIf=\"order$ | async as order\">\n  <div class=\"cx-review-summary\" *ngIf=\"order.paymentInfo as paymentDetails\">\n    <ng-container *cxFeatureLevel=\"'!6.6'\">\n      <div class=\"cx-review-summary-card cx-review-summary-payment-card\">\n        <cx-card\n          [content]=\"getPaymentMethodCard(paymentDetails) | async\"\n        ></cx-card>\n      </div>\n    </ng-container>\n    <ng-container *cxFeatureLevel=\"'6.6'\">\n      <div\n        class=\"cx-review-summary-card cx-review-summary-payment-card\"\n        *ngIf=\"isPaymentInfoCardFull(paymentDetails)\"\n      >\n        <cx-card\n          [content]=\"getPaymentMethodCard(paymentDetails) | async\"\n        ></cx-card>\n      </div>\n    </ng-container>\n    <ng-container *cxFeatureLevel=\"'!6.6'\">\n      <div class=\"cx-review-summary-card cx-review-summary-payment-card\">\n        <cx-card\n          [content]=\"getBillingAddressCard(paymentDetails) | async\"\n        ></cx-card>\n      </div>\n    </ng-container>\n    <ng-container *cxFeatureLevel=\"'6.6'\">\n      <div\n        class=\"cx-review-summary-card cx-review-summary-payment-card\"\n        *ngIf=\"paymentDetails?.billingAddress\"\n      >\n        <cx-card\n          [content]=\"getBillingAddressCard(paymentDetails) | async\"\n        ></cx-card>\n      </div>\n    </ng-container>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: OrderDetailsService }, { type: i2.TranslationService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderOverviewComponent {
    constructor(translation, orderDetailsService, component) {
        this.translation = translation;
        this.orderDetailsService = orderDetailsService;
        this.component = component;
        this.cartOutlets = CartOutlets;
        this.order$ = this.orderDetailsService.getOrderDetails();
        this.isOrderLoading$ = typeof this.orderDetailsService.isOrderDetailsLoading === 'function'
            ? this.orderDetailsService.isOrderDetailsLoading()
            : of(false);
        this.simple$ = this.component.data$.pipe(map((data) => data.simple));
    }
    getReplenishmentCodeCardContent(orderCode) {
        return this.translation.translate('orderDetails.replenishmentId').pipe(filter(() => Boolean(orderCode)), map((textTitle) => ({
            title: textTitle,
            text: [orderCode],
        })));
    }
    getReplenishmentActiveCardContent(active) {
        return combineLatest([
            this.translation.translate('orderDetails.status'),
            this.translation.translate('orderDetails.active'),
            this.translation.translate('orderDetails.cancelled'),
        ]).pipe(map(([textTitle, textActive, textCancelled]) => ({
            title: textTitle,
            text: [active ? textActive : textCancelled],
        })));
    }
    getReplenishmentStartOnCardContent(isoDate) {
        return this.translation.translate('orderDetails.startOn').pipe(filter(() => Boolean(isoDate)), map((textTitle) => {
            return {
                title: textTitle,
                text: [isoDate],
            };
        }));
    }
    getReplenishmentFrequencyCardContent(frequency) {
        return this.translation.translate('orderDetails.frequency').pipe(filter(() => Boolean(frequency)), map((textTitle) => ({
            title: textTitle,
            text: [frequency],
        })));
    }
    getReplenishmentNextDateCardContent(isoDate) {
        return this.translation.translate('orderDetails.nextOrderDate').pipe(filter(() => Boolean(isoDate)), map((textTitle) => {
            return {
                title: textTitle,
                text: [isoDate],
            };
        }));
    }
    getOrderCodeCardContent(orderCode) {
        return this.translation.translate('orderDetails.orderNumber').pipe(filter(() => Boolean(orderCode)), map((textTitle) => ({
            title: textTitle,
            text: [orderCode],
        })));
    }
    getOrderCurrentDateCardContent(isoDate) {
        return this.translation.translate('orderDetails.placedOn').pipe(filter(() => Boolean(isoDate)), map((textTitle) => {
            return {
                title: textTitle,
                text: [isoDate],
            };
        }));
    }
    getOrderStatusCardContent(status) {
        return combineLatest([
            this.translation.translate('orderDetails.status'),
            this.translation.translate('orderDetails.statusDisplay_' + status),
        ]).pipe(map(([textTitle, textStatus]) => ({
            title: textTitle,
            text: [textStatus],
        })));
    }
    getPurchaseOrderNumber(poNumber) {
        return combineLatest([
            this.translation.translate('orderDetails.purchaseOrderNumber'),
            this.translation.translate('orderDetails.emptyPurchaseOrderId'),
        ]).pipe(map(([textTitle, noneTextTitle]) => ({
            title: textTitle,
            text: [poNumber ? poNumber : noneTextTitle],
        })));
    }
    getMethodOfPaymentCardContent(hasPaymentInfo) {
        return combineLatest([
            this.translation.translate('orderDetails.methodOfPayment'),
            this.translation.translate('paymentTypes.paymentType_ACCOUNT'),
            this.translation.translate('paymentTypes.paymentType_CARD'),
        ]).pipe(map(([textTitle, textAccount, textCard]) => ({
            title: textTitle,
            text: [Boolean(hasPaymentInfo) ? textCard : textAccount],
        })));
    }
    getCostCenterCardContent(costCenter) {
        return this.translation.translate('orderDetails.costCenter').pipe(filter(() => Boolean(costCenter)), map((textTitle) => ({
            title: textTitle,
            textBold: costCenter?.name,
            text: ['(' + costCenter?.unit?.name + ')'],
        })));
    }
    getAddressCardContent(deliveryAddress) {
        return this.translation.translate('addressCard.shipTo').pipe(filter(() => Boolean(deliveryAddress)), map((textTitle) => {
            const formattedAddress = this.normalizeFormattedAddress(deliveryAddress.formattedAddress ?? '');
            return {
                title: textTitle,
                textBold: `${deliveryAddress.firstName} ${deliveryAddress.lastName}`,
                text: [formattedAddress, deliveryAddress.country?.name],
            };
        }));
    }
    getDeliveryModeCardContent(deliveryMode) {
        return this.translation.translate('orderDetails.shippingMethod').pipe(filter(() => Boolean(deliveryMode)), map((textTitle) => ({
            title: textTitle,
            textBold: deliveryMode.name,
            text: [
                deliveryMode.description,
                deliveryMode.deliveryCost?.formattedValue
                    ? deliveryMode.deliveryCost?.formattedValue
                    : '',
            ],
        })));
    }
    getPaymentInfoCardContent(payment) {
        return combineLatest([
            this.translation.translate('paymentForm.payment'),
            this.translation.translate('paymentCard.expires', {
                month: Boolean(payment) ? payment.expiryMonth : '',
                year: Boolean(payment) ? payment.expiryYear : '',
            }),
        ]).pipe(filter(() => Boolean(payment)), map(([textTitle, textExpires]) => paymentMethodCard(textTitle, textExpires, payment)));
    }
    isPaymentInfoCardFull(payment) {
        return (!!payment?.cardNumber && !!payment?.expiryMonth && !!payment?.expiryYear);
    }
    getBillingAddressCardContent(billingAddress) {
        return this.translation.translate('paymentForm.billingAddress').pipe(filter(() => Boolean(billingAddress)), map((textTitle) => ({
            title: textTitle,
            textBold: `${billingAddress.firstName} ${billingAddress.lastName}`,
            text: [
                billingAddress.formattedAddress,
                billingAddress.country?.name,
            ],
        })));
    }
    normalizeFormattedAddress(formattedAddress) {
        const addresses = formattedAddress
            .split(',')
            .map((address) => address.trim());
        return addresses.filter(Boolean).join(', ');
    }
}
OrderOverviewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderOverviewComponent, deps: [{ token: i2.TranslationService }, { token: OrderDetailsService }, { token: i3.CmsComponentData }], target: i0.ɵɵFactoryTarget.Component });
OrderOverviewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: OrderOverviewComponent, selector: "cx-order-overview", ngImport: i0, template: "<div class=\"cx-order-summary\" *ngIf=\"order$ | async as order\">\n  <ng-container *ngIf=\"!(isOrderLoading$ | async)\">\n    <div *ngIf=\"!(simple$ | async)\" class=\"container\">\n      <ng-container *ngIf=\"order.replenishmentOrderCode; else otherOrder\">\n        <div class=\"cx-summary-card\">\n          <cx-card\n            [content]=\"\n              getReplenishmentCodeCardContent(order?.replenishmentOrderCode)\n                | async\n            \"\n          ></cx-card>\n\n          <cx-card\n            [content]=\"getReplenishmentActiveCardContent(order?.active) | async\"\n          ></cx-card>\n        </div>\n\n        <div class=\"cx-summary-card\">\n          <cx-card\n            [content]=\"\n              getReplenishmentStartOnCardContent(order?.firstDate | cxDate)\n                | async\n            \"\n          ></cx-card>\n\n          <cx-card\n            [content]=\"\n              getReplenishmentFrequencyCardContent(\n                order?.trigger?.displayTimeTable\n              ) | async\n            \"\n          ></cx-card>\n\n          <cx-card\n            [content]=\"\n              getReplenishmentNextDateCardContent(\n                order?.trigger?.activationTime | cxDate\n              ) | async\n            \"\n          ></cx-card>\n\n          <!-- TODO:(CXINT-2309) for next major release remove feature level -->\n          <ng-container *cxFeatureLevel=\"'6.4'\">\n            <ng-template\n              [cxOutlet]=\"cartOutlets.ORDER_OVERVIEW\"\n              [cxOutletContext]=\"{ item: order, readonly: true }\"\n            >\n            </ng-template>\n          </ng-container>\n        </div>\n      </ng-container>\n\n      <ng-template #otherOrder>\n        <div class=\"cx-summary-card\">\n          <cx-card\n            [content]=\"getOrderCodeCardContent(order?.code) | async\"\n          ></cx-card>\n\n          <cx-card\n            [content]=\"\n              getOrderCurrentDateCardContent(order?.created | cxDate) | async\n            \"\n          ></cx-card>\n\n          <cx-card\n            [content]=\"getOrderStatusCardContent(order.statusDisplay) | async\"\n          ></cx-card>\n\n          <!-- TODO:(CXINT-2309) for next major release remove feature level -->\n          <ng-container *cxFeatureLevel=\"'6.4'\">\n            <ng-template\n              [cxOutlet]=\"cartOutlets.ORDER_OVERVIEW\"\n              [cxOutletContext]=\"{ item: order, readonly: true }\"\n            >\n            </ng-template>\n          </ng-container>\n        </div>\n      </ng-template>\n\n      <ng-container\n        *ngIf=\"order.purchaseOrderNumber || order.purchaseOrderNumber === ''\"\n      >\n        <div class=\"cx-summary-card\">\n          <cx-card\n            [content]=\"\n              getPurchaseOrderNumber(order?.purchaseOrderNumber) | async\n            \"\n          ></cx-card>\n\n          <cx-card\n            [content]=\"getMethodOfPaymentCardContent(order.paymentInfo) | async\"\n          ></cx-card>\n\n          <ng-container *ngIf=\"order.costCenter\">\n            <cx-card\n              [content]=\"getCostCenterCardContent(order?.costCenter) | async\"\n            ></cx-card>\n          </ng-container>\n        </div>\n      </ng-container>\n\n      <div class=\"cx-summary-card\">\n        <ng-container *ngIf=\"order.deliveryAddress\">\n          <cx-card\n            [content]=\"getAddressCardContent(order?.deliveryAddress) | async\"\n          ></cx-card>\n        </ng-container>\n\n        <ng-container *ngIf=\"order.deliveryMode\">\n          <cx-card\n            [content]=\"getDeliveryModeCardContent(order?.deliveryMode) | async\"\n          ></cx-card>\n        </ng-container>\n      </div>\n\n      <ng-container *ngIf=\"order.paymentInfo\">\n        <ng-container *cxFeatureLevel=\"'6.3'\">\n          <div\n            class=\"cx-summary-card\"\n            *ngIf=\"\n              order?.paymentInfo?.billingAddress ||\n              isPaymentInfoCardFull(order?.paymentInfo)\n            \"\n          >\n            <ng-container *ngIf=\"isPaymentInfoCardFull(order?.paymentInfo)\">\n              <cx-card\n                [content]=\"\n                  getPaymentInfoCardContent(order?.paymentInfo) | async\n                \"\n              ></cx-card>\n            </ng-container>\n\n            <cx-card\n              [content]=\"\n                getBillingAddressCardContent(order?.paymentInfo?.billingAddress)\n                  | async\n              \"\n            ></cx-card>\n          </div>\n        </ng-container>\n\n        <ng-container *cxFeatureLevel=\"'!6.3'\">\n          <div class=\"cx-summary-card\">\n            <cx-card\n              [content]=\"getPaymentInfoCardContent(order?.paymentInfo) | async\"\n            ></cx-card>\n\n            <cx-card\n              [content]=\"\n                getBillingAddressCardContent(order?.paymentInfo?.billingAddress)\n                  | async\n              \"\n            ></cx-card>\n          </div>\n        </ng-container>\n      </ng-container>\n    </div>\n\n    <div *ngIf=\"simple$ | async\" class=\"container\">\n      <div class=\"cx-order-details-cards\">\n        <cx-card\n          [content]=\"getOrderCodeCardContent(order?.code) | async\"\n        ></cx-card>\n\n        <cx-card\n          [content]=\"\n            getOrderCurrentDateCardContent(order?.created | cxDate) | async\n          \"\n        ></cx-card>\n\n        <cx-card\n          [content]=\"getOrderStatusCardContent(order.statusDisplay) | async\"\n        ></cx-card>\n\n        <!-- TODO:(CXINT-2309) for next major release remove feature level -->\n        <ng-container *cxFeatureLevel=\"'6.4'\">\n          <ng-template\n            [cxOutlet]=\"cartOutlets.ORDER_OVERVIEW\"\n            [cxOutletContext]=\"{ item: order, readonly: true }\"\n          >\n          </ng-template>\n        </ng-container>\n      </div>\n      <ng-container *cxFeatureLevel=\"'!6.6'\">\n        <cx-order-detail-billing></cx-order-detail-billing>\n      </ng-container>\n      <ng-container *cxFeatureLevel=\"'6.6'\">\n        <cx-order-detail-billing\n          *ngIf=\"\n            isPaymentInfoCardFull(order?.paymentInfo) ||\n            order?.paymentInfo?.billingAddress\n          \"\n        ></cx-order-detail-billing>\n      </ng-container>\n    </div>\n  </ng-container>\n</div>\n", dependencies: [{ kind: "component", type: i3.CardComponent, selector: "cx-card", inputs: ["border", "editMode", "isDefault", "content", "fitToContainer", "truncateText", "charactersLimit", "index"], outputs: ["deleteCard", "setDefaultCard", "sendCard", "editCard", "cancelCard"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.FeatureLevelDirective, selector: "[cxFeatureLevel]", inputs: ["cxFeatureLevel"] }, { kind: "directive", type: i3.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer", "cxComponentRef"], outputs: ["loaded", "cxComponentRefChange"] }, { kind: "component", type: OrderDetailBillingComponent, selector: "cx-order-detail-billing" }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.CxDatePipe, name: "cxDate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderOverviewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-overview', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-order-summary\" *ngIf=\"order$ | async as order\">\n  <ng-container *ngIf=\"!(isOrderLoading$ | async)\">\n    <div *ngIf=\"!(simple$ | async)\" class=\"container\">\n      <ng-container *ngIf=\"order.replenishmentOrderCode; else otherOrder\">\n        <div class=\"cx-summary-card\">\n          <cx-card\n            [content]=\"\n              getReplenishmentCodeCardContent(order?.replenishmentOrderCode)\n                | async\n            \"\n          ></cx-card>\n\n          <cx-card\n            [content]=\"getReplenishmentActiveCardContent(order?.active) | async\"\n          ></cx-card>\n        </div>\n\n        <div class=\"cx-summary-card\">\n          <cx-card\n            [content]=\"\n              getReplenishmentStartOnCardContent(order?.firstDate | cxDate)\n                | async\n            \"\n          ></cx-card>\n\n          <cx-card\n            [content]=\"\n              getReplenishmentFrequencyCardContent(\n                order?.trigger?.displayTimeTable\n              ) | async\n            \"\n          ></cx-card>\n\n          <cx-card\n            [content]=\"\n              getReplenishmentNextDateCardContent(\n                order?.trigger?.activationTime | cxDate\n              ) | async\n            \"\n          ></cx-card>\n\n          <!-- TODO:(CXINT-2309) for next major release remove feature level -->\n          <ng-container *cxFeatureLevel=\"'6.4'\">\n            <ng-template\n              [cxOutlet]=\"cartOutlets.ORDER_OVERVIEW\"\n              [cxOutletContext]=\"{ item: order, readonly: true }\"\n            >\n            </ng-template>\n          </ng-container>\n        </div>\n      </ng-container>\n\n      <ng-template #otherOrder>\n        <div class=\"cx-summary-card\">\n          <cx-card\n            [content]=\"getOrderCodeCardContent(order?.code) | async\"\n          ></cx-card>\n\n          <cx-card\n            [content]=\"\n              getOrderCurrentDateCardContent(order?.created | cxDate) | async\n            \"\n          ></cx-card>\n\n          <cx-card\n            [content]=\"getOrderStatusCardContent(order.statusDisplay) | async\"\n          ></cx-card>\n\n          <!-- TODO:(CXINT-2309) for next major release remove feature level -->\n          <ng-container *cxFeatureLevel=\"'6.4'\">\n            <ng-template\n              [cxOutlet]=\"cartOutlets.ORDER_OVERVIEW\"\n              [cxOutletContext]=\"{ item: order, readonly: true }\"\n            >\n            </ng-template>\n          </ng-container>\n        </div>\n      </ng-template>\n\n      <ng-container\n        *ngIf=\"order.purchaseOrderNumber || order.purchaseOrderNumber === ''\"\n      >\n        <div class=\"cx-summary-card\">\n          <cx-card\n            [content]=\"\n              getPurchaseOrderNumber(order?.purchaseOrderNumber) | async\n            \"\n          ></cx-card>\n\n          <cx-card\n            [content]=\"getMethodOfPaymentCardContent(order.paymentInfo) | async\"\n          ></cx-card>\n\n          <ng-container *ngIf=\"order.costCenter\">\n            <cx-card\n              [content]=\"getCostCenterCardContent(order?.costCenter) | async\"\n            ></cx-card>\n          </ng-container>\n        </div>\n      </ng-container>\n\n      <div class=\"cx-summary-card\">\n        <ng-container *ngIf=\"order.deliveryAddress\">\n          <cx-card\n            [content]=\"getAddressCardContent(order?.deliveryAddress) | async\"\n          ></cx-card>\n        </ng-container>\n\n        <ng-container *ngIf=\"order.deliveryMode\">\n          <cx-card\n            [content]=\"getDeliveryModeCardContent(order?.deliveryMode) | async\"\n          ></cx-card>\n        </ng-container>\n      </div>\n\n      <ng-container *ngIf=\"order.paymentInfo\">\n        <ng-container *cxFeatureLevel=\"'6.3'\">\n          <div\n            class=\"cx-summary-card\"\n            *ngIf=\"\n              order?.paymentInfo?.billingAddress ||\n              isPaymentInfoCardFull(order?.paymentInfo)\n            \"\n          >\n            <ng-container *ngIf=\"isPaymentInfoCardFull(order?.paymentInfo)\">\n              <cx-card\n                [content]=\"\n                  getPaymentInfoCardContent(order?.paymentInfo) | async\n                \"\n              ></cx-card>\n            </ng-container>\n\n            <cx-card\n              [content]=\"\n                getBillingAddressCardContent(order?.paymentInfo?.billingAddress)\n                  | async\n              \"\n            ></cx-card>\n          </div>\n        </ng-container>\n\n        <ng-container *cxFeatureLevel=\"'!6.3'\">\n          <div class=\"cx-summary-card\">\n            <cx-card\n              [content]=\"getPaymentInfoCardContent(order?.paymentInfo) | async\"\n            ></cx-card>\n\n            <cx-card\n              [content]=\"\n                getBillingAddressCardContent(order?.paymentInfo?.billingAddress)\n                  | async\n              \"\n            ></cx-card>\n          </div>\n        </ng-container>\n      </ng-container>\n    </div>\n\n    <div *ngIf=\"simple$ | async\" class=\"container\">\n      <div class=\"cx-order-details-cards\">\n        <cx-card\n          [content]=\"getOrderCodeCardContent(order?.code) | async\"\n        ></cx-card>\n\n        <cx-card\n          [content]=\"\n            getOrderCurrentDateCardContent(order?.created | cxDate) | async\n          \"\n        ></cx-card>\n\n        <cx-card\n          [content]=\"getOrderStatusCardContent(order.statusDisplay) | async\"\n        ></cx-card>\n\n        <!-- TODO:(CXINT-2309) for next major release remove feature level -->\n        <ng-container *cxFeatureLevel=\"'6.4'\">\n          <ng-template\n            [cxOutlet]=\"cartOutlets.ORDER_OVERVIEW\"\n            [cxOutletContext]=\"{ item: order, readonly: true }\"\n          >\n          </ng-template>\n        </ng-container>\n      </div>\n      <ng-container *cxFeatureLevel=\"'!6.6'\">\n        <cx-order-detail-billing></cx-order-detail-billing>\n      </ng-container>\n      <ng-container *cxFeatureLevel=\"'6.6'\">\n        <cx-order-detail-billing\n          *ngIf=\"\n            isPaymentInfoCardFull(order?.paymentInfo) ||\n            order?.paymentInfo?.billingAddress\n          \"\n        ></cx-order-detail-billing>\n      </ng-container>\n    </div>\n  </ng-container>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i2.TranslationService }, { type: OrderDetailsService }, { type: i3.CmsComponentData }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderConfirmationOrderEntriesContext {
    constructor(orderFacade) {
        this.orderFacade = orderFacade;
        this.type = OrderEntriesSource.ORDER_CONFIRMATION;
    }
    getEntries() {
        return this.orderFacade
            .getOrderDetails()
            .pipe(map((order) => order?.entries ?? []));
    }
}
OrderConfirmationOrderEntriesContext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationOrderEntriesContext, deps: [{ token: i1.OrderFacade }], target: i0.ɵɵFactoryTarget.Injectable });
OrderConfirmationOrderEntriesContext.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationOrderEntriesContext, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationOrderEntriesContext, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.OrderFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderConfirmationItemsComponent {
    constructor(orderFacade) {
        this.orderFacade = orderFacade;
        this.cartOutlets = CartOutlets;
        this.promotionLocation = PromotionLocation.Checkout;
        this.order$ = this.orderFacade.getOrderDetails();
    }
    ngOnDestroy() {
        this.orderFacade.clearPlacedOrder();
    }
}
OrderConfirmationItemsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationItemsComponent, deps: [{ token: i1.OrderFacade }], target: i0.ɵɵFactoryTarget.Component });
OrderConfirmationItemsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: OrderConfirmationItemsComponent, selector: "cx-order-confirmation-items", ngImport: i0, template: "<div class=\"cx-order-items container\" *ngIf=\"order$ | async as order\">\n  <h4 class=\"cx-order-items-header\">\n    {{ 'checkoutOrderConfirmation.orderItems' | cxTranslate }}\n  </h4>\n\n  <cx-promotions\n    [promotions]=\"order.appliedOrderPromotions || []\"\n  ></cx-promotions>\n\n  <ng-template\n    [cxOutlet]=\"cartOutlets.CART_ITEM_LIST\"\n    [cxOutletContext]=\"{\n      items: order.entries,\n      readonly: true,\n      promotionLocation: promotionLocation\n    }\"\n  >\n  </ng-template>\n</div>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.PromotionsComponent, selector: "cx-promotions", inputs: ["promotions"] }, { kind: "directive", type: i3.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer", "cxComponentRef"], outputs: ["loaded", "cxComponentRefChange"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationItemsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-confirmation-items', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-order-items container\" *ngIf=\"order$ | async as order\">\n  <h4 class=\"cx-order-items-header\">\n    {{ 'checkoutOrderConfirmation.orderItems' | cxTranslate }}\n  </h4>\n\n  <cx-promotions\n    [promotions]=\"order.appliedOrderPromotions || []\"\n  ></cx-promotions>\n\n  <ng-template\n    [cxOutlet]=\"cartOutlets.CART_ITEM_LIST\"\n    [cxOutletContext]=\"{\n      items: order.entries,\n      readonly: true,\n      promotionLocation: promotionLocation\n    }\"\n  >\n  </ng-template>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.OrderFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderConfirmationShippingComponent {
    constructor(orderFacade, translationService, cd, outlet) {
        this.orderFacade = orderFacade;
        this.translationService = translationService;
        this.cd = cd;
        this.outlet = outlet;
        this.showItemList = true;
        this.cartOutlets = CartOutlets;
        this.order$ = this.orderFacade
            .getOrderDetails()
            .pipe(tap((order) => {
            this.entries = order?.entries?.filter((entry) => !entry.deliveryPointOfService);
        }));
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.subscription.add(this.outlet?.context$.subscribe((context) => {
            if (context.showItemList !== undefined) {
                this.showItemList = context.showItemList;
            }
            if (context.order) {
                this.order$ = of(context.order);
            }
            this.cd.markForCheck();
        }));
    }
    getDeliveryAddressCard(deliveryAddress, countryName) {
        return combineLatest([
            this.translationService.translate('addressCard.shipTo'),
            this.translationService.translate('addressCard.phoneNumber'),
            this.translationService.translate('addressCard.mobileNumber'),
        ]).pipe(map(([textTitle, textPhone, textMobile]) => deliveryAddressCard(textTitle, textPhone, textMobile, deliveryAddress, countryName)));
    }
    getDeliveryModeCard(deliveryMode) {
        return combineLatest([
            this.translationService.translate('checkoutMode.deliveryMethod'),
        ]).pipe(map(([textTitle]) => deliveryModeCard(textTitle, deliveryMode)));
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
OrderConfirmationShippingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationShippingComponent, deps: [{ token: i1.OrderFacade }, { token: i2.TranslationService }, { token: i0.ChangeDetectorRef }, { token: i3.OutletContextData, optional: true }], target: i0.ɵɵFactoryTarget.Component });
OrderConfirmationShippingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: OrderConfirmationShippingComponent, selector: "cx-order-confirmation-shipping", inputs: { showItemList: "showItemList" }, ngImport: i0, template: "<div class=\"cx-order-items\" *ngIf=\"order$ | async as order\">\n  <ng-container *ngIf=\"!showItemList || entries?.length > 0\">\n    <h2 class=\"cx-review-header\">\n      {{ 'checkoutMode.deliveryEntries' | cxTranslate }}\n    </h2>\n\n    <div class=\"cx-review-summary cx-review-shipping-summary\">\n      <!-- DELIVERY ADDRESS SECTION -->\n      <div class=\"cx-review-summary-card-container\">\n        <div class=\"cx-review-summary-card cx-review-card-address\">\n          <cx-card\n            [content]=\"getDeliveryAddressCard(order.deliveryAddress) | async\"\n          ></cx-card>\n        </div>\n      </div>\n\n      <!-- DELIVERY MODE SECTION -->\n      <div class=\"cx-review-summary-card-container\">\n        <div class=\"cx-review-summary-card cx-review-card-address\">\n          <cx-card\n            [content]=\"getDeliveryModeCard(order.deliveryMode) | async\"\n          ></cx-card>\n        </div>\n      </div>\n    </div>\n\n    <!-- CART ITEM SECTION -->\n    <div *ngIf=\"showItemList\" class=\"cx-review-cart-item\">\n      <ng-template\n        [cxOutlet]=\"cartOutlets.CART_ITEM_LIST\"\n        [cxOutletContext]=\"{\n          items: entries,\n          readonly: true\n        }\"\n      >\n      </ng-template>\n    </div>\n  </ng-container>\n</div>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.CardComponent, selector: "cx-card", inputs: ["border", "editMode", "isDefault", "content", "fitToContainer", "truncateText", "charactersLimit", "index"], outputs: ["deleteCard", "setDefaultCard", "sendCard", "editCard", "cancelCard"] }, { kind: "directive", type: i3.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer", "cxComponentRef"], outputs: ["loaded", "cxComponentRefChange"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationShippingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-confirmation-shipping', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-order-items\" *ngIf=\"order$ | async as order\">\n  <ng-container *ngIf=\"!showItemList || entries?.length > 0\">\n    <h2 class=\"cx-review-header\">\n      {{ 'checkoutMode.deliveryEntries' | cxTranslate }}\n    </h2>\n\n    <div class=\"cx-review-summary cx-review-shipping-summary\">\n      <!-- DELIVERY ADDRESS SECTION -->\n      <div class=\"cx-review-summary-card-container\">\n        <div class=\"cx-review-summary-card cx-review-card-address\">\n          <cx-card\n            [content]=\"getDeliveryAddressCard(order.deliveryAddress) | async\"\n          ></cx-card>\n        </div>\n      </div>\n\n      <!-- DELIVERY MODE SECTION -->\n      <div class=\"cx-review-summary-card-container\">\n        <div class=\"cx-review-summary-card cx-review-card-address\">\n          <cx-card\n            [content]=\"getDeliveryModeCard(order.deliveryMode) | async\"\n          ></cx-card>\n        </div>\n      </div>\n    </div>\n\n    <!-- CART ITEM SECTION -->\n    <div *ngIf=\"showItemList\" class=\"cx-review-cart-item\">\n      <ng-template\n        [cxOutlet]=\"cartOutlets.CART_ITEM_LIST\"\n        [cxOutletContext]=\"{\n          items: entries,\n          readonly: true\n        }\"\n      >\n      </ng-template>\n    </div>\n  </ng-container>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.OrderFacade }, { type: i2.TranslationService }, { type: i0.ChangeDetectorRef }, { type: i3.OutletContextData, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { showItemList: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderGuestRegisterFormComponent {
    constructor(userRegisterFacade, routingService, authService, fb) {
        this.userRegisterFacade = userRegisterFacade;
        this.routingService = routingService;
        this.authService = authService;
        this.fb = fb;
        this.guestRegisterForm = this.fb.group({
            password: [
                '',
                [Validators.required, CustomFormValidators.passwordValidator],
            ],
            passwordconf: ['', Validators.required],
        }, {
            validators: CustomFormValidators.passwordsMustMatch('password', 'passwordconf'),
        });
    }
    submit() {
        if (this.guestRegisterForm.valid) {
            this.userRegisterFacade.registerGuest(this.guid, this.guestRegisterForm.value.password);
            if (!this.subscription) {
                this.subscription = this.authService
                    .isUserLoggedIn()
                    .subscribe((isLoggedIn) => {
                    if (isLoggedIn) {
                        this.routingService.go({ cxRoute: 'home' });
                    }
                });
            }
        }
        else {
            this.guestRegisterForm.markAllAsTouched();
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
OrderGuestRegisterFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderGuestRegisterFormComponent, deps: [{ token: i1$1.UserRegisterFacade }, { token: i2.RoutingService }, { token: i2.AuthService }, { token: i3$1.UntypedFormBuilder }], target: i0.ɵɵFactoryTarget.Component });
OrderGuestRegisterFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: OrderGuestRegisterFormComponent, selector: "cx-guest-register-form", inputs: { guid: "guid", email: "email" }, ngImport: i0, template: "<div class=\"register-guest\">\n  <div class=\"col-md-6 col-lg-4\">\n    <h3>{{ 'checkoutOrderConfirmation.createAccount' | cxTranslate }}</h3>\n    <p>\n      {{\n        'checkoutOrderConfirmation.createAccountForNext'\n          | cxTranslate: { email: email }\n      }}\n    </p>\n\n    <form (ngSubmit)=\"submit()\" [formGroup]=\"guestRegisterForm\">\n      <div class=\"form-group\">\n        <label>\n          <span class=\"label-content\">{{\n            'register.password.label' | cxTranslate\n          }}</span>\n          <input\n            required=\"true\"\n            class=\"form-control\"\n            type=\"password\"\n            name=\"password\"\n            placeholder=\"{{ 'register.password.placeholder' | cxTranslate }}\"\n            formControlName=\"password\"\n            [attr.aria-label]=\"'register.password.placeholder' | cxTranslate\"\n            cxPasswordVisibilitySwitch\n          />\n          <cx-form-errors\n            [control]=\"guestRegisterForm.get('password')\"\n          ></cx-form-errors>\n        </label>\n      </div>\n\n      <div class=\"form-group\">\n        <label>\n          <span class=\"label-content\">{{\n            'register.confirmPassword.label' | cxTranslate\n          }}</span>\n          <input\n            required=\"true\"\n            class=\"form-control\"\n            type=\"password\"\n            name=\"passwordconf\"\n            placeholder=\"{{\n              'register.confirmPassword.placeholder' | cxTranslate\n            }}\"\n            formControlName=\"passwordconf\"\n            [attr.aria-label]=\"\n              'register.confirmPassword.placeholder' | cxTranslate\n            \"\n            cxPasswordVisibilitySwitch\n          />\n          <cx-form-errors\n            [control]=\"guestRegisterForm.get('passwordconf')\"\n          ></cx-form-errors>\n        </label>\n      </div>\n\n      <button type=\"submit\" class=\"btn btn-block btn-primary\">\n        {{ 'common.submit' | cxTranslate }}\n      </button>\n    </form>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i3$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3$1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i3$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i3.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "directive", type: i3.PasswordVisibilityToggleDirective, selector: "[cxPasswordVisibilitySwitch][type=\"password\"]" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderGuestRegisterFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-guest-register-form', template: "<div class=\"register-guest\">\n  <div class=\"col-md-6 col-lg-4\">\n    <h3>{{ 'checkoutOrderConfirmation.createAccount' | cxTranslate }}</h3>\n    <p>\n      {{\n        'checkoutOrderConfirmation.createAccountForNext'\n          | cxTranslate: { email: email }\n      }}\n    </p>\n\n    <form (ngSubmit)=\"submit()\" [formGroup]=\"guestRegisterForm\">\n      <div class=\"form-group\">\n        <label>\n          <span class=\"label-content\">{{\n            'register.password.label' | cxTranslate\n          }}</span>\n          <input\n            required=\"true\"\n            class=\"form-control\"\n            type=\"password\"\n            name=\"password\"\n            placeholder=\"{{ 'register.password.placeholder' | cxTranslate }}\"\n            formControlName=\"password\"\n            [attr.aria-label]=\"'register.password.placeholder' | cxTranslate\"\n            cxPasswordVisibilitySwitch\n          />\n          <cx-form-errors\n            [control]=\"guestRegisterForm.get('password')\"\n          ></cx-form-errors>\n        </label>\n      </div>\n\n      <div class=\"form-group\">\n        <label>\n          <span class=\"label-content\">{{\n            'register.confirmPassword.label' | cxTranslate\n          }}</span>\n          <input\n            required=\"true\"\n            class=\"form-control\"\n            type=\"password\"\n            name=\"passwordconf\"\n            placeholder=\"{{\n              'register.confirmPassword.placeholder' | cxTranslate\n            }}\"\n            formControlName=\"passwordconf\"\n            [attr.aria-label]=\"\n              'register.confirmPassword.placeholder' | cxTranslate\n            \"\n            cxPasswordVisibilitySwitch\n          />\n          <cx-form-errors\n            [control]=\"guestRegisterForm.get('passwordconf')\"\n          ></cx-form-errors>\n        </label>\n      </div>\n\n      <button type=\"submit\" class=\"btn btn-block btn-primary\">\n        {{ 'common.submit' | cxTranslate }}\n      </button>\n    </form>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.UserRegisterFacade }, { type: i2.RoutingService }, { type: i2.AuthService }, { type: i3$1.UntypedFormBuilder }]; }, propDecorators: { guid: [{
                type: Input
            }], email: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderConfirmationThankYouMessageComponent {
    constructor(orderFacade, globalMessageService, translationService) {
        this.orderFacade = orderFacade;
        this.globalMessageService = globalMessageService;
        this.translationService = translationService;
        this.isGuestCustomer = false;
    }
    ngOnInit() {
        this.order$ = this.orderFacade.getOrderDetails().pipe(tap((order) => {
            this.isGuestCustomer =
                order && 'guestCustomer' in order
                    ? order.guestCustomer ?? false
                    : false;
            this.orderGuid = order?.guid;
        }));
    }
    ngAfterViewInit() {
        this.addThankYouMessage();
    }
    ngOnDestroy() {
        this.orderFacade.clearPlacedOrder();
    }
    addThankYouMessage() {
        this.getThankYouAssistiveMessage()
            .pipe(take(1))
            .subscribe(([order, confirmationOfOrderMessage, thankYouMessage, invoiceHasBeenSentByEmailMessage,]) => {
            const code = order.replenishmentOrderCode ??
                order.code;
            const message = `${confirmationOfOrderMessage} ${code}. ${thankYouMessage} ${invoiceHasBeenSentByEmailMessage}`;
            this.globalMessageService.add(message, GlobalMessageType.MSG_TYPE_ASSISTIVE);
        });
    }
    getThankYouAssistiveMessage() {
        const confirmationOfOrderMessage$ = this.translationService.translate('checkoutOrderConfirmation.confirmationOfOrder');
        const thankYouMessage$ = this.translationService.translate('checkoutOrderConfirmation.thankYou');
        const invoiceHasBeenSentByEmailMessage$ = this.translationService.translate('checkoutOrderConfirmation.invoiceHasBeenSentByEmail');
        return this.order$.pipe(filter((order) => !!order), withLatestFrom(confirmationOfOrderMessage$, thankYouMessage$, invoiceHasBeenSentByEmailMessage$));
    }
}
OrderConfirmationThankYouMessageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationThankYouMessageComponent, deps: [{ token: i1.OrderFacade }, { token: i2.GlobalMessageService }, { token: i2.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
OrderConfirmationThankYouMessageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: OrderConfirmationThankYouMessageComponent, selector: "cx-order-confirmation-thank-you-message", ngImport: i0, template: "<ng-container *ngIf=\"order$ | async as order\">\n  <div class=\"cx-page-header\">\n    <span class=\"cx-page-title\">\n      {{ 'checkoutOrderConfirmation.confirmationOfOrder' | cxTranslate }}\n      {{ order.replenishmentOrderCode ?? order.code }}\n    </span>\n  </div>\n\n  <div class=\"cx-order-confirmation-message\">\n    <h2>{{ 'checkoutOrderConfirmation.thankYou' | cxTranslate }}</h2>\n    <p>\n      {{ 'checkoutOrderConfirmation.invoiceHasBeenSentByEmail' | cxTranslate }}\n    </p>\n  </div>\n  <ng-container *cxFeatureLevel=\"'6.4'\">\n    <div\n      *ngIf=\"\n        isGuestCustomer &&\n        orderGuid &&\n        order?.paymentInfo?.billingAddress?.email\n      \"\n    >\n      <cx-guest-register-form\n        [guid]=\"orderGuid\"\n        [email]=\"order.paymentInfo.billingAddress.email\"\n      ></cx-guest-register-form>\n    </div>\n  </ng-container>\n  <ng-container *cxFeatureLevel=\"'!6.4'\">\n    <div *ngIf=\"isGuestCustomer\">\n      <cx-guest-register-form\n        [guid]=\"orderGuid\"\n        [email]=\"order.paymentInfo.billingAddress.email\"\n      ></cx-guest-register-form>\n    </div>\n  </ng-container>\n\n  <cx-add-to-home-screen-banner></cx-add-to-home-screen-banner>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.AddToHomeScreenBannerComponent, selector: "cx-add-to-home-screen-banner" }, { kind: "directive", type: i2.FeatureLevelDirective, selector: "[cxFeatureLevel]", inputs: ["cxFeatureLevel"] }, { kind: "component", type: OrderGuestRegisterFormComponent, selector: "cx-guest-register-form", inputs: ["guid", "email"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationThankYouMessageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-confirmation-thank-you-message', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"order$ | async as order\">\n  <div class=\"cx-page-header\">\n    <span class=\"cx-page-title\">\n      {{ 'checkoutOrderConfirmation.confirmationOfOrder' | cxTranslate }}\n      {{ order.replenishmentOrderCode ?? order.code }}\n    </span>\n  </div>\n\n  <div class=\"cx-order-confirmation-message\">\n    <h2>{{ 'checkoutOrderConfirmation.thankYou' | cxTranslate }}</h2>\n    <p>\n      {{ 'checkoutOrderConfirmation.invoiceHasBeenSentByEmail' | cxTranslate }}\n    </p>\n  </div>\n  <ng-container *cxFeatureLevel=\"'6.4'\">\n    <div\n      *ngIf=\"\n        isGuestCustomer &&\n        orderGuid &&\n        order?.paymentInfo?.billingAddress?.email\n      \"\n    >\n      <cx-guest-register-form\n        [guid]=\"orderGuid\"\n        [email]=\"order.paymentInfo.billingAddress.email\"\n      ></cx-guest-register-form>\n    </div>\n  </ng-container>\n  <ng-container *cxFeatureLevel=\"'!6.4'\">\n    <div *ngIf=\"isGuestCustomer\">\n      <cx-guest-register-form\n        [guid]=\"orderGuid\"\n        [email]=\"order.paymentInfo.billingAddress.email\"\n      ></cx-guest-register-form>\n    </div>\n  </ng-container>\n\n  <cx-add-to-home-screen-banner></cx-add-to-home-screen-banner>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.OrderFacade }, { type: i2.GlobalMessageService }, { type: i2.TranslationService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderConfirmationTotalsComponent {
    constructor(orderFacade) {
        this.orderFacade = orderFacade;
        this.cartOutlets = CartOutlets;
        this.order$ = this.orderFacade.getOrderDetails();
    }
    ngOnDestroy() {
        this.orderFacade.clearPlacedOrder();
    }
}
OrderConfirmationTotalsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationTotalsComponent, deps: [{ token: i1.OrderFacade }], target: i0.ɵɵFactoryTarget.Component });
OrderConfirmationTotalsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: OrderConfirmationTotalsComponent, selector: "cx-order-confirmation-totals", ngImport: i0, template: "<div class=\"cx-order-summary container\" *ngIf=\"order$ | async as order\">\n  <div class=\"row justify-content-end\">\n    <div class=\"col-sm-12 col-md-6 col-lg-5 col-xl-4\">\n      <ng-template\n        [cxOutlet]=\"cartOutlets.ORDER_SUMMARY\"\n        [cxOutletContext]=\"order\"\n      >\n      </ng-template>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer", "cxComponentRef"], outputs: ["loaded", "cxComponentRefChange"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationTotalsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-confirmation-totals', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-order-summary container\" *ngIf=\"order$ | async as order\">\n  <div class=\"row justify-content-end\">\n    <div class=\"col-sm-12 col-md-6 col-lg-5 col-xl-4\">\n      <ng-template\n        [cxOutlet]=\"cartOutlets.ORDER_SUMMARY\"\n        [cxOutletContext]=\"order\"\n      >\n      </ng-template>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.OrderFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const orderConfirmationComponents = [
    OrderConfirmationItemsComponent,
    OrderConfirmationThankYouMessageComponent,
    OrderConfirmationTotalsComponent,
    OrderGuestRegisterFormComponent,
    OrderConfirmationShippingComponent,
];
class OrderConfirmationModule {
}
OrderConfirmationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderConfirmationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationModule, declarations: [OrderConfirmationItemsComponent,
        OrderConfirmationThankYouMessageComponent,
        OrderConfirmationTotalsComponent,
        OrderGuestRegisterFormComponent,
        OrderConfirmationShippingComponent], imports: [CommonModule,
        CardModule,
        PwaModule,
        PromotionsModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule, i3.OutletModule, PasswordVisibilityToggleModule,
        FeaturesConfigModule], exports: [OrderConfirmationItemsComponent,
        OrderConfirmationThankYouMessageComponent,
        OrderConfirmationTotalsComponent,
        OrderGuestRegisterFormComponent,
        OrderConfirmationShippingComponent] });
OrderConfirmationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                OrderConfirmationThankMessageComponent: {
                    component: OrderConfirmationThankYouMessageComponent,
                    guards: [OrderConfirmationGuard],
                },
                ReplenishmentConfirmationMessageComponent: {
                    component: OrderConfirmationThankYouMessageComponent,
                    guards: [OrderConfirmationGuard],
                },
                OrderConfirmationItemsComponent: {
                    component: OrderConfirmationItemsComponent,
                    guards: [OrderConfirmationGuard],
                },
                ReplenishmentConfirmationItemsComponent: {
                    component: OrderConfirmationItemsComponent,
                    guards: [OrderConfirmationGuard],
                },
                OrderConfirmationTotalsComponent: {
                    component: OrderConfirmationTotalsComponent,
                    guards: [OrderConfirmationGuard],
                },
                ReplenishmentConfirmationTotalsComponent: {
                    component: OrderConfirmationTotalsComponent,
                    guards: [OrderConfirmationGuard],
                },
                OrderConfirmationOverviewComponent: {
                    component: OrderOverviewComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: OrderFacade,
                        },
                    ],
                    guards: [OrderConfirmationGuard],
                },
                ReplenishmentConfirmationOverviewComponent: {
                    component: OrderOverviewComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: OrderFacade,
                        },
                    ],
                    guards: [OrderConfirmationGuard],
                },
                OrderConfirmationShippingComponent: {
                    component: OrderConfirmationShippingComponent,
                    guards: [OrderConfirmationGuard],
                },
                OrderConfirmationBillingComponent: {
                    component: OrderDetailBillingComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: OrderFacade,
                        },
                    ],
                    guards: [OrderConfirmationGuard],
                },
            },
        }),
        {
            provide: OrderConfirmationOrderEntriesContextToken,
            useExisting: OrderConfirmationOrderEntriesContext,
        },
        provideOutlet({
            id: OrderOutlets.CONSIGNMENT_DELIVERY_INFO,
            component: OrderConfirmationShippingComponent,
        }),
    ], imports: [CommonModule,
        CardModule,
        PwaModule,
        PromotionsModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        OutletModule.forChild(),
        PasswordVisibilityToggleModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CardModule,
                        PwaModule,
                        PromotionsModule,
                        I18nModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                        OutletModule.forChild(),
                        PasswordVisibilityToggleModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                OrderConfirmationThankMessageComponent: {
                                    component: OrderConfirmationThankYouMessageComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                ReplenishmentConfirmationMessageComponent: {
                                    component: OrderConfirmationThankYouMessageComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                OrderConfirmationItemsComponent: {
                                    component: OrderConfirmationItemsComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                ReplenishmentConfirmationItemsComponent: {
                                    component: OrderConfirmationItemsComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                OrderConfirmationTotalsComponent: {
                                    component: OrderConfirmationTotalsComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                ReplenishmentConfirmationTotalsComponent: {
                                    component: OrderConfirmationTotalsComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                OrderConfirmationOverviewComponent: {
                                    component: OrderOverviewComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: OrderFacade,
                                        },
                                    ],
                                    guards: [OrderConfirmationGuard],
                                },
                                ReplenishmentConfirmationOverviewComponent: {
                                    component: OrderOverviewComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: OrderFacade,
                                        },
                                    ],
                                    guards: [OrderConfirmationGuard],
                                },
                                OrderConfirmationShippingComponent: {
                                    component: OrderConfirmationShippingComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                OrderConfirmationBillingComponent: {
                                    component: OrderDetailBillingComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: OrderFacade,
                                        },
                                    ],
                                    guards: [OrderConfirmationGuard],
                                },
                            },
                        }),
                        {
                            provide: OrderConfirmationOrderEntriesContextToken,
                            useExisting: OrderConfirmationOrderEntriesContext,
                        },
                        provideOutlet({
                            id: OrderOutlets.CONSIGNMENT_DELIVERY_INFO,
                            component: OrderConfirmationShippingComponent,
                        }),
                    ],
                    declarations: [...orderConfirmationComponents],
                    exports: [...orderConfirmationComponents],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderDetailActionsComponent {
    constructor(orderDetailsService) {
        this.orderDetailsService = orderDetailsService;
        this.order$ = this.orderDetailsService.getOrderDetails();
    }
}
OrderDetailActionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailActionsComponent, deps: [{ token: OrderDetailsService }], target: i0.ɵɵFactoryTarget.Component });
OrderDetailActionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: OrderDetailActionsComponent, selector: "cx-order-details-actions", ngImport: i0, template: "<ng-container *ngIf=\"order$ | async as order\">\n  <div class=\"cx-nav row\">\n    <div class=\"col-xs-12 col-md-4 col-lg-3\">\n      <button\n        [routerLink]=\"{ cxRoute: 'orders' } | cxUrl\"\n        class=\"btn btn-block btn-secondary\"\n      >\n        {{ 'common.back' | cxTranslate }}\n      </button>\n    </div>\n\n    <div class=\"col-xs-12 col-md-4 col-lg-3\">\n      <a\n        *ngIf=\"order.cancellable\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orderCancel',\n            params: order\n          } | cxUrl\n        \"\n        class=\"btn btn-block btn-secondary\"\n      >\n        {{ 'orderDetails.cancellationAndReturn.cancelAction' | cxTranslate }}\n      </a>\n\n      <a\n        *ngIf=\"order.returnable\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orderReturn',\n            params: order\n          } | cxUrl\n        \"\n        class=\"btn btn-block btn-secondary\"\n      >\n        {{ 'orderDetails.cancellationAndReturn.returnAction' | cxTranslate }}\n      </a>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailActionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-details-actions', template: "<ng-container *ngIf=\"order$ | async as order\">\n  <div class=\"cx-nav row\">\n    <div class=\"col-xs-12 col-md-4 col-lg-3\">\n      <button\n        [routerLink]=\"{ cxRoute: 'orders' } | cxUrl\"\n        class=\"btn btn-block btn-secondary\"\n      >\n        {{ 'common.back' | cxTranslate }}\n      </button>\n    </div>\n\n    <div class=\"col-xs-12 col-md-4 col-lg-3\">\n      <a\n        *ngIf=\"order.cancellable\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orderCancel',\n            params: order\n          } | cxUrl\n        \"\n        class=\"btn btn-block btn-secondary\"\n      >\n        {{ 'orderDetails.cancellationAndReturn.cancelAction' | cxTranslate }}\n      </a>\n\n      <a\n        *ngIf=\"order.returnable\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orderReturn',\n            params: order\n          } | cxUrl\n        \"\n        class=\"btn btn-block btn-secondary\"\n      >\n        {{ 'orderDetails.cancellationAndReturn.returnAction' | cxTranslate }}\n      </a>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: OrderDetailsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MyAccountV2OrderDetailsActionsComponent extends OrderDetailActionsComponent {
    constructor() {
        super(...arguments);
        this.eventService = inject(EventService);
    }
    ngOnInit() {
        this.order$.subscribe((order) => {
            this.order = order;
        });
    }
    showDialog(order) {
        const newEvent = new DownloadOrderInvoicesEvent();
        newEvent.order = order;
        this.eventService.dispatch(newEvent);
    }
}
MyAccountV2OrderDetailsActionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrderDetailsActionsComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
MyAccountV2OrderDetailsActionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: MyAccountV2OrderDetailsActionsComponent, selector: "cx-my-account-v2-order-details-actions", usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"order\">\n  <div class=\"cx-order-details-actions row\">\n    <div class=\"cx-view-all-orders\">\n      <span class=\"col-xs-12 col-md-4 col-lg-3\">\n        <span class=\"cx-action-button-left\">\n          <button\n            id=\"view-all-orders-btn\"\n            [routerLink]=\"{ cxRoute: 'orders' } | cxUrl\"\n            class=\"btn btn-block btn-secondary\"\n          >\n            {{ 'myAccountV2OrderDetails.viewAllOrders' | cxTranslate }}\n          </button>\n        </span>\n      </span>\n    </div>\n    <div class=\"cx-other-actions\">\n      <span class=\"col-xs-12 col-md-4 col-lg-3\">\n        <span *ngIf=\"order.cancellable\" class=\"cx-action-button\">\n          <button\n            id=\"cancel-items-btn\"\n            [routerLink]=\"\n              {\n                cxRoute: 'orderCancel',\n                params: order\n              } | cxUrl\n            \"\n            class=\"btn btn-block btn-secondary\"\n          >\n            {{ 'myAccountV2OrderDetails.cancelItems' | cxTranslate }}\n          </button>\n        </span>\n        <span *ngIf=\"order.returnable\" class=\"cx-action-button\">\n          <button\n            id=\"return-items-btn\"\n            [routerLink]=\"\n              {\n                cxRoute: 'orderReturn',\n                params: order\n              } | cxUrl\n            \"\n            class=\"btn btn-block btn-secondary\"\n          >\n            {{ 'myAccountV2OrderDetails.returnItems' | cxTranslate }}\n          </button>\n        </span>\n        <span class=\"cx-action-button\">\n          <button\n            id=\"download-invoices-btn\"\n            class=\"btn btn-block btn-secondary\"\n            (click)=\"showDialog(order)\"\n          >\n            {{ 'myAccountV2OrderDetails.downloadInvoices' | cxTranslate }}\n          </button>\n        </span>\n      </span>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrderDetailsActionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-my-account-v2-order-details-actions', template: "<ng-container *ngIf=\"order\">\n  <div class=\"cx-order-details-actions row\">\n    <div class=\"cx-view-all-orders\">\n      <span class=\"col-xs-12 col-md-4 col-lg-3\">\n        <span class=\"cx-action-button-left\">\n          <button\n            id=\"view-all-orders-btn\"\n            [routerLink]=\"{ cxRoute: 'orders' } | cxUrl\"\n            class=\"btn btn-block btn-secondary\"\n          >\n            {{ 'myAccountV2OrderDetails.viewAllOrders' | cxTranslate }}\n          </button>\n        </span>\n      </span>\n    </div>\n    <div class=\"cx-other-actions\">\n      <span class=\"col-xs-12 col-md-4 col-lg-3\">\n        <span *ngIf=\"order.cancellable\" class=\"cx-action-button\">\n          <button\n            id=\"cancel-items-btn\"\n            [routerLink]=\"\n              {\n                cxRoute: 'orderCancel',\n                params: order\n              } | cxUrl\n            \"\n            class=\"btn btn-block btn-secondary\"\n          >\n            {{ 'myAccountV2OrderDetails.cancelItems' | cxTranslate }}\n          </button>\n        </span>\n        <span *ngIf=\"order.returnable\" class=\"cx-action-button\">\n          <button\n            id=\"return-items-btn\"\n            [routerLink]=\"\n              {\n                cxRoute: 'orderReturn',\n                params: order\n              } | cxUrl\n            \"\n            class=\"btn btn-block btn-secondary\"\n          >\n            {{ 'myAccountV2OrderDetails.returnItems' | cxTranslate }}\n          </button>\n        </span>\n        <span class=\"cx-action-button\">\n          <button\n            id=\"download-invoices-btn\"\n            class=\"btn btn-block btn-secondary\"\n            (click)=\"showDialog(order)\"\n          >\n            {{ 'myAccountV2OrderDetails.downloadInvoices' | cxTranslate }}\n          </button>\n        </span>\n      </span>\n    </div>\n  </div>\n</ng-container>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MyAccountV2DownloadInvoicesComponent {
    constructor() {
        this.OrderOutlets = OrderOutlets;
        this.invoiceCount = undefined;
        this.iconTypes = ICON_TYPE;
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: true,
            focusOnEscape: true,
        };
        this.launchDialogService = inject(LaunchDialogService);
        this.cdr = inject(ChangeDetectorRef);
    }
    ngAfterViewChecked() {
        this.cdr.detectChanges();
        if (this.invoiceComponent &&
            this.invoiceComponent.pagination !== undefined) {
            this.invoiceCount = this.invoiceComponent.pagination.totalResults;
        }
    }
    close(reason, _message) {
        this.launchDialogService.closeDialog(reason);
    }
}
MyAccountV2DownloadInvoicesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2DownloadInvoicesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MyAccountV2DownloadInvoicesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: MyAccountV2DownloadInvoicesComponent, selector: "cx-my-account-v2-download-invoices", viewQueries: [{ propertyName: "invoiceComponent", first: true, predicate: InvoicesListComponent, descendants: true }], ngImport: i0, template: "<div\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close('Escape clicked')\"\n  class=\"cx-modal-container\"\n>\n  <div class=\"cx-modal-content\">\n    <div class=\"cx-dialog-header modal-header\">\n      <div class=\"cx-dialog-title modal-title\">\n        {{ 'myAccountV2OrderDetails.downloadInvoices' | cxTranslate }}\n      </div>\n      <button\n        type=\"button\"\n        class=\"close\"\n        attr.aria-label=\"{{ 'addToCart.closeModal' | cxTranslate }}\"\n        (click)=\"close('Close download invoices dialog')\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n\n    <div class=\"cx-dialog-body modal-body\">\n      <cx-invoices-list> </cx-invoices-list>\n      <div id=\"noInvoice\" *ngIf=\"invoiceCount === 0\">\n        {{ 'myAccountV2OrderDetails.noInvoices' | cxTranslate }}\n      </div>\n      <div *ngIf=\"invoiceCount === undefined\" class=\"cx-spinner\">\n        <cx-spinner></cx-spinner>\n      </div>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i3.SpinnerComponent, selector: "cx-spinner" }, { kind: "component", type: i3$2.InvoicesListComponent, selector: "cx-invoices-list" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2DownloadInvoicesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-my-account-v2-download-invoices', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close('Escape clicked')\"\n  class=\"cx-modal-container\"\n>\n  <div class=\"cx-modal-content\">\n    <div class=\"cx-dialog-header modal-header\">\n      <div class=\"cx-dialog-title modal-title\">\n        {{ 'myAccountV2OrderDetails.downloadInvoices' | cxTranslate }}\n      </div>\n      <button\n        type=\"button\"\n        class=\"close\"\n        attr.aria-label=\"{{ 'addToCart.closeModal' | cxTranslate }}\"\n        (click)=\"close('Close download invoices dialog')\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n\n    <div class=\"cx-dialog-body modal-body\">\n      <cx-invoices-list> </cx-invoices-list>\n      <div id=\"noInvoice\" *ngIf=\"invoiceCount === 0\">\n        {{ 'myAccountV2OrderDetails.noInvoices' | cxTranslate }}\n      </div>\n      <div *ngIf=\"invoiceCount === undefined\" class=\"cx-spinner\">\n        <cx-spinner></cx-spinner>\n      </div>\n    </div>\n  </div>\n</div>\n" }]
        }], propDecorators: { invoiceComponent: [{
                type: ViewChild,
                args: [InvoicesListComponent, { static: false }]
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultMyAccountV2DownloadInvoicesLayoutConfig = {
    launch: {
        DOWNLOAD_ORDER_INVOICES: {
            inlineRoot: true,
            component: MyAccountV2DownloadInvoicesComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MyAccountV2DownloadInvoicesEventListener {
    constructor() {
        this.subscription = new Subscription();
        this.eventService = inject(EventService);
        this.launchDialogService = inject(LaunchDialogService);
        this.onDownloadInvoices();
    }
    onDownloadInvoices() {
        this.subscription.add(this.eventService.get(DownloadOrderInvoicesEvent).subscribe((event) => {
            this.openDialog(event);
        }));
    }
    openDialog(event) {
        const dialog = this.launchDialogService.openDialog("DOWNLOAD_ORDER_INVOICES" /* LAUNCH_CALLER.DOWNLOAD_ORDER_INVOICES */, undefined, undefined, event.order);
        if (dialog) {
            dialog.pipe(take(1)).subscribe();
        }
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
MyAccountV2DownloadInvoicesEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2DownloadInvoicesEventListener, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MyAccountV2DownloadInvoicesEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2DownloadInvoicesEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2DownloadInvoicesEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MyAccountV2DownloadInvoicesModule {
    constructor() {
        this.downloadInvoicesDialogEventListener = inject(MyAccountV2DownloadInvoicesEventListener);
    }
}
MyAccountV2DownloadInvoicesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2DownloadInvoicesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MyAccountV2DownloadInvoicesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2DownloadInvoicesModule, declarations: [MyAccountV2DownloadInvoicesComponent], imports: [CommonModule,
        KeyboardFocusModule,
        IconModule,
        I18nModule,
        PaginationModule,
        SortingModule,
        SpinnerModule,
        PDFInvoicesComponentsModule], exports: [MyAccountV2DownloadInvoicesComponent] });
MyAccountV2DownloadInvoicesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2DownloadInvoicesModule, providers: [
        provideDefaultConfig(defaultMyAccountV2DownloadInvoicesLayoutConfig),
    ], imports: [CommonModule,
        KeyboardFocusModule,
        IconModule,
        I18nModule,
        PaginationModule,
        SortingModule,
        SpinnerModule,
        PDFInvoicesComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2DownloadInvoicesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        KeyboardFocusModule,
                        IconModule,
                        I18nModule,
                        PaginationModule,
                        SortingModule,
                        SpinnerModule,
                        PDFInvoicesComponentsModule,
                    ],
                    providers: [
                        provideDefaultConfig(defaultMyAccountV2DownloadInvoicesLayoutConfig),
                    ],
                    exports: [MyAccountV2DownloadInvoicesComponent],
                    declarations: [MyAccountV2DownloadInvoicesComponent],
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
const completedValues = ['DELIVERY_COMPLETED', 'PICKUP_COMPLETE'];
const cancelledValues = ['CANCELLED'];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MyAccountV2OrderConsignmentsService {
    getGroupedConsignments(order, pickup) {
        const consignments = pickup
            ? order.consignments?.filter((consignment) => consignment.deliveryPointOfService !== undefined)
            : order.consignments?.filter((consignment) => consignment.deliveryPointOfService === undefined);
        return this.groupConsignments(consignments);
    }
    getUnconsignedEntries(order, pickup) {
        if (order.replenishmentOrderCode) {
            return [];
        }
        return pickup
            ? order.unconsignedEntries?.filter((entry) => entry.deliveryPointOfService !== undefined)
            : order.unconsignedEntries?.filter((entry) => entry.deliveryPointOfService === undefined);
    }
    groupConsignments(consignments) {
        const grouped = consignments?.reduce((result, current) => {
            const key = this.getStatusGroupKey(current.status || '');
            result[key] = result[key] || [];
            result[key].push(current);
            return result;
        }, {});
        return grouped
            ? [...(grouped[1] || []), ...(grouped[0] || []), ...(grouped[-1] || [])]
            : undefined;
    }
    /**
     * complete: 0
     * processing: 1
     * cancel: -1
     */
    getStatusGroupKey(status) {
        if (completedValues.includes(status)) {
            return 0;
        }
        if (cancelledValues.includes(status)) {
            return -1;
        }
        return 1;
    }
}
MyAccountV2OrderConsignmentsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrderConsignmentsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MyAccountV2OrderConsignmentsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrderConsignmentsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrderConsignmentsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConsignmentTrackingComponent {
    constructor(orderHistoryFacade, launchDialogService, vcr) {
        this.orderHistoryFacade = orderHistoryFacade;
        this.launchDialogService = launchDialogService;
        this.vcr = vcr;
        this.consignmentStatus = [
            'SHIPPED',
            'IN_TRANSIT',
            'DELIVERY_COMPLETED',
            'DELIVERY_REJECTED',
            'DELIVERING',
        ];
    }
    ngOnInit() {
        this.consignmentTracking$ =
            this.orderHistoryFacade.getConsignmentTracking();
    }
    openTrackingDialog(consignment) {
        if (consignment.code) {
            this.orderHistoryFacade.loadConsignmentTracking(this.orderCode, consignment.code);
        }
        const modalInstanceData = {
            tracking$: this.consignmentTracking$,
            shipDate: consignment.statusDate,
        };
        const dialog = this.launchDialogService.openDialog("CONSIGNMENT_TRACKING" /* LAUNCH_CALLER.CONSIGNMENT_TRACKING */, this.element, this.vcr, modalInstanceData);
        if (dialog) {
            dialog.pipe(take(1)).subscribe();
        }
    }
    ngOnDestroy() {
        this.orderHistoryFacade.clearConsignmentTracking();
    }
}
ConsignmentTrackingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConsignmentTrackingComponent, deps: [{ token: i1.OrderHistoryFacade }, { token: i3.LaunchDialogService }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
ConsignmentTrackingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConsignmentTrackingComponent, selector: "cx-consignment-tracking", inputs: { consignment: "consignment", orderCode: "orderCode" }, viewQueries: [{ propertyName: "element", first: true, predicate: ["element"], descendants: true }], ngImport: i0, template: "<ng-container *ngIf=\"consignment && consignment.status\">\n  <div *ngIf=\"consignmentStatus.includes(consignment.status)\">\n    <button\n      (click)=\"openTrackingDialog(consignment)\"\n      class=\"btn btn-secondary btn-track\"\n      type=\"button\"\n    >\n      {{ 'orderDetails.consignmentTracking.action' | cxTranslate }}\n    </button>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConsignmentTrackingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-consignment-tracking', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"consignment && consignment.status\">\n  <div *ngIf=\"consignmentStatus.includes(consignment.status)\">\n    <button\n      (click)=\"openTrackingDialog(consignment)\"\n      class=\"btn btn-secondary btn-track\"\n      type=\"button\"\n    >\n      {{ 'orderDetails.consignmentTracking.action' | cxTranslate }}\n    </button>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.OrderHistoryFacade }, { type: i3.LaunchDialogService }, { type: i0.ViewContainerRef }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['element']
            }], consignment: [{
                type: Input
            }], orderCode: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderConsignedEntriesComponent {
    constructor() {
        this.promotionLocation = PromotionLocation.Order;
        this.OrderOutlets = OrderOutlets;
        this.CartOutlets = CartOutlets;
    }
}
OrderConsignedEntriesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConsignedEntriesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
OrderConsignedEntriesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: OrderConsignedEntriesComponent, selector: "cx-order-consigned-entries", inputs: { consignments: "consignments", order: "order", enableAddToCart: "enableAddToCart", buyItAgainTranslation: "buyItAgainTranslation" }, ngImport: i0, template: "<div *ngFor=\"let consignment of consignments\" class=\"cx-list row\">\n  <ng-template\n    [cxOutlet]=\"OrderOutlets.ORDER_CONSIGNMENT\"\n    [cxOutletContext]=\"{ item: consignment, order: order }\"\n  >\n    <div class=\"cx-list-header col-12\">\n      <div class=\"cx-list-status\">\n        <span *ngIf=\"consignment\">\n          {{\n            'orderDetails.deliveryStatus_' + consignment?.status | cxTranslate\n          }}\n        </span>\n      </div>\n      <div *ngIf=\"consignment?.statusDate\" class=\"cx-list-date\">\n        <div>{{ consignment?.statusDate | cxDate }}</div>\n      </div>\n\n      <cx-consignment-tracking\n        [orderCode]=\"order.code\"\n        [consignment]=\"consignment\"\n        *cxFeature=\"'consignmentTracking'\"\n      >\n      </cx-consignment-tracking>\n    </div>\n  </ng-template>\n  <div class=\"cx-list-item col-12\">\n    <ng-template\n      [cxOutlet]=\"CartOutlets.CART_ITEM_LIST\"\n      [cxOutletContext]=\"{\n        items: consignment.entries,\n        readonly: true,\n        promotionLocation: promotionLocation,\n        options: {\n          displayAddToCart: enableAddToCart,\n          addToCartString: buyItAgainTranslation,\n          optionalBtn: addToCartBtn\n        }\n      }\"\n    >\n    </ng-template>\n  </div>\n</div>\n\n<ng-template let-ctx #addToCartBtn>\n  <cx-add-to-cart\n    [productCode]=\"ctx.item.product?.code\"\n    [product]=\"ctx.item.product\"\n    [showQuantity]=\"false\"\n    [options]=\"ctx.options\"\n    [pickupStore]=\"ctx.item.deliveryPointOfService?.name\"\n    class=\"add-to-cart\"\n  >\n  </cx-add-to-cart>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.FeatureDirective, selector: "[cxFeature]", inputs: ["cxFeature"] }, { kind: "directive", type: i3.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer", "cxComponentRef"], outputs: ["loaded", "cxComponentRefChange"] }, { kind: "component", type: i4.AddToCartComponent, selector: "cx-add-to-cart", inputs: ["productCode", "showQuantity", "options", "pickupStore", "product"] }, { kind: "component", type: ConsignmentTrackingComponent, selector: "cx-consignment-tracking", inputs: ["consignment", "orderCode"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.CxDatePipe, name: "cxDate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConsignedEntriesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-consigned-entries', template: "<div *ngFor=\"let consignment of consignments\" class=\"cx-list row\">\n  <ng-template\n    [cxOutlet]=\"OrderOutlets.ORDER_CONSIGNMENT\"\n    [cxOutletContext]=\"{ item: consignment, order: order }\"\n  >\n    <div class=\"cx-list-header col-12\">\n      <div class=\"cx-list-status\">\n        <span *ngIf=\"consignment\">\n          {{\n            'orderDetails.deliveryStatus_' + consignment?.status | cxTranslate\n          }}\n        </span>\n      </div>\n      <div *ngIf=\"consignment?.statusDate\" class=\"cx-list-date\">\n        <div>{{ consignment?.statusDate | cxDate }}</div>\n      </div>\n\n      <cx-consignment-tracking\n        [orderCode]=\"order.code\"\n        [consignment]=\"consignment\"\n        *cxFeature=\"'consignmentTracking'\"\n      >\n      </cx-consignment-tracking>\n    </div>\n  </ng-template>\n  <div class=\"cx-list-item col-12\">\n    <ng-template\n      [cxOutlet]=\"CartOutlets.CART_ITEM_LIST\"\n      [cxOutletContext]=\"{\n        items: consignment.entries,\n        readonly: true,\n        promotionLocation: promotionLocation,\n        options: {\n          displayAddToCart: enableAddToCart,\n          addToCartString: buyItAgainTranslation,\n          optionalBtn: addToCartBtn\n        }\n      }\"\n    >\n    </ng-template>\n  </div>\n</div>\n\n<ng-template let-ctx #addToCartBtn>\n  <cx-add-to-cart\n    [productCode]=\"ctx.item.product?.code\"\n    [product]=\"ctx.item.product\"\n    [showQuantity]=\"false\"\n    [options]=\"ctx.options\"\n    [pickupStore]=\"ctx.item.deliveryPointOfService?.name\"\n    class=\"add-to-cart\"\n  >\n  </cx-add-to-cart>\n</ng-template>\n" }]
        }], propDecorators: { consignments: [{
                type: Input
            }], order: [{
                type: Input
            }], enableAddToCart: [{
                type: Input
            }], buyItAgainTranslation: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderDetailItemsComponent {
    constructor(orderDetailsService, component) {
        this.orderDetailsService = orderDetailsService;
        this.component = component;
        this.orderConsignmentsService = inject(MyAccountV2OrderConsignmentsService);
        this.OrderOutlets = OrderOutlets;
        this.CartOutlets = CartOutlets;
        this.promotionLocation = PromotionLocation.Order;
        this.order$ = this.orderDetailsService.getOrderDetails().pipe(tap((order) => {
            this.pickupConsignments = this.getGroupedConsignments(order, true);
            this.deliveryConsignments = this.getGroupedConsignments(order, false);
            this.pickupUnconsignedEntries = this.getUnconsignedEntries(order, true);
            this.deliveryUnConsignedEntries = this.getUnconsignedEntries(order, false);
        }));
        this.enableAddToCart$ = this.component.data$.pipe(map((data) => data.enableAddToCart));
        this.isOrderLoading$ = typeof this.orderDetailsService.isOrderDetailsLoading === 'function'
            ? this.orderDetailsService.isOrderDetailsLoading()
            : of(false);
        this.groupCartItems$ = this.component.data$.pipe(map((data) => data.groupCartItems));
    }
    getGroupedConsignments(order, pickup) {
        return this.orderConsignmentsService.getGroupedConsignments(order, pickup);
    }
    getUnconsignedEntries(order, pickup) {
        return this.orderConsignmentsService.getUnconsignedEntries(order, pickup);
    }
}
OrderDetailItemsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailItemsComponent, deps: [{ token: OrderDetailsService }, { token: i3.CmsComponentData }], target: i0.ɵɵFactoryTarget.Component });
OrderDetailItemsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: OrderDetailItemsComponent, selector: "cx-order-details-items", ngImport: i0, template: "<ng-container *ngIf=\"order$ | async as order\">\n  <ng-container *ngIf=\"!(isOrderLoading$ | async)\">\n    <ng-container\n      *ngIf=\"\n        order.consignments?.length ||\n        order.unconsignedEntries?.length ||\n        order.replenishmentOrderCode\n      \"\n    >\n      <cx-promotions\n        [promotions]=\"order.appliedOrderPromotions || []\"\n      ></cx-promotions>\n    </ng-container>\n\n    <!-- pickup consigned entries -->\n    <div\n      *ngIf=\"pickupConsignments?.length\"\n      class=\"cx-pickup-order-consigned-entries-header\"\n    >\n      {{ 'deliveryPointOfServiceDetails.itemsToBePickUp' | cxTranslate }}\n    </div>\n    <cx-order-consigned-entries\n      *ngIf=\"pickupConsignments\"\n      [order]=\"order\"\n      [consignments]=\"pickupConsignments\"\n      [enableAddToCart]=\"enableAddToCart$ | async\"\n      [buyItAgainTranslation]=\"'addToCart.buyItAgain' | cxTranslate\"\n    ></cx-order-consigned-entries>\n\n    <!-- delivery consignment address and delivery mode -->\n    <ng-template\n      *ngIf=\"\n        deliveryConsignments &&\n        deliveryConsignments.length > 0 &&\n        (groupCartItems$ | async)\n      \"\n      [cxOutlet]=\"OrderOutlets.CONSIGNMENT_DELIVERY_INFO\"\n      [cxOutletContext]=\"{\n        showItemList: false,\n        order: order\n      }\"\n    >\n    </ng-template>\n\n    <!-- delivery consigned entries -->\n    <cx-order-consigned-entries\n      *ngIf=\"deliveryConsignments\"\n      [order]=\"order\"\n      [consignments]=\"deliveryConsignments\"\n      [enableAddToCart]=\"enableAddToCart$ | async\"\n      [buyItAgainTranslation]=\"'addToCart.buyItAgain' | cxTranslate\"\n    ></cx-order-consigned-entries>\n\n    <!-- unconsigned entries -->\n    <ng-container *ngIf=\"order?.unconsignedEntries?.length\">\n      <div *ngIf=\"order?.statusDisplay\" class=\"cx-list-header\">\n        <div class=\"cx-list-status\">\n          {{\n            'orderDetails.statusDisplay_' + order?.statusDisplay | cxTranslate\n          }}\n        </div>\n      </div>\n      <!-- delivery unconsigned entries -->\n      <ng-container *ngIf=\"deliveryUnConsignedEntries?.length\">\n        <h2 *ngIf=\"groupCartItems$ | async\" class=\"cx-review-header\">\n          {{ 'checkoutMode.deliveryEntries' | cxTranslate }}\n        </h2>\n        <div class=\"cx-list-item\">\n          <ng-template\n            [cxOutlet]=\"CartOutlets.CART_ITEM_LIST\"\n            [cxOutletContext]=\"{\n              items: deliveryUnConsignedEntries,\n              readonly: true,\n              promotionLocation: promotionLocation,\n              options: {\n                displayAddToCart: enableAddToCart$ | async,\n                addToCartString: 'addToCart.buyItAgain' | cxTranslate,\n                optionalBtn: addToCartBtn\n              }\n            }\"\n          >\n          </ng-template>\n        </div>\n      </ng-container>\n      <!-- pickup unconsigned entries, b2b does not have pickup items -->\n      <ng-container *ngIf=\"pickupUnconsignedEntries?.length\">\n        <h2 class=\"cx-review-header\">\n          {{ 'checkoutPickupInStore.heading' | cxTranslate }}\n        </h2>\n        <div class=\"cx-list-item\">\n          <ng-template\n            [cxOutlet]=\"CartOutlets.CART_ITEM_LIST\"\n            [cxOutletContext]=\"{\n              items: pickupUnconsignedEntries,\n              readonly: true,\n              promotionLocation: promotionLocation,\n              options: {\n                displayAddToCart: enableAddToCart$ | async,\n                addToCartString: 'addToCart.buyItAgain' | cxTranslate,\n                optionalBtn: addToCartBtn\n              }\n            }\"\n          >\n          </ng-template>\n        </div>\n      </ng-container>\n    </ng-container>\n\n    <!-- replenishment other entries -->\n    <ng-container *ngIf=\"order?.entries && order?.replenishmentOrderCode\">\n      <div class=\"cx-list\">\n        <div *ngIf=\"order?.statusDisplay\" class=\"cx-list-header\">\n          <div class=\"cx-list-status\">\n            {{\n              'orderDetails.statusDisplay_' + order?.statusDisplay | cxTranslate\n            }}\n          </div>\n        </div>\n        <div class=\"cx-list-item\">\n          <ng-template\n            [cxOutlet]=\"CartOutlets.CART_ITEM_LIST\"\n            [cxOutletContext]=\"{\n              items: order.entries,\n              readonly: true,\n              promotionLocation: promotionLocation,\n              options: {\n                displayAddToCart: enableAddToCart$ | async,\n                addToCartString: 'addToCart.buyItAgain' | cxTranslate,\n                optionalBtn: addToCartBtn\n              }\n            }\"\n          >\n          </ng-template>\n        </div>\n      </div>\n    </ng-container>\n  </ng-container>\n\n  <ng-template let-ctx #addToCartBtn>\n    <cx-add-to-cart\n      [productCode]=\"ctx.item.product?.code\"\n      [product]=\"ctx.item.product\"\n      [showQuantity]=\"false\"\n      [options]=\"ctx.options\"\n      [pickupStore]=\"ctx.item.deliveryPointOfService?.name\"\n      class=\"add-to-cart\"\n    >\n    </cx-add-to-cart>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.PromotionsComponent, selector: "cx-promotions", inputs: ["promotions"] }, { kind: "directive", type: i3.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer", "cxComponentRef"], outputs: ["loaded", "cxComponentRefChange"] }, { kind: "component", type: i4.AddToCartComponent, selector: "cx-add-to-cart", inputs: ["productCode", "showQuantity", "options", "pickupStore", "product"] }, { kind: "component", type: OrderConsignedEntriesComponent, selector: "cx-order-consigned-entries", inputs: ["consignments", "order", "enableAddToCart", "buyItAgainTranslation"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailItemsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-details-items', template: "<ng-container *ngIf=\"order$ | async as order\">\n  <ng-container *ngIf=\"!(isOrderLoading$ | async)\">\n    <ng-container\n      *ngIf=\"\n        order.consignments?.length ||\n        order.unconsignedEntries?.length ||\n        order.replenishmentOrderCode\n      \"\n    >\n      <cx-promotions\n        [promotions]=\"order.appliedOrderPromotions || []\"\n      ></cx-promotions>\n    </ng-container>\n\n    <!-- pickup consigned entries -->\n    <div\n      *ngIf=\"pickupConsignments?.length\"\n      class=\"cx-pickup-order-consigned-entries-header\"\n    >\n      {{ 'deliveryPointOfServiceDetails.itemsToBePickUp' | cxTranslate }}\n    </div>\n    <cx-order-consigned-entries\n      *ngIf=\"pickupConsignments\"\n      [order]=\"order\"\n      [consignments]=\"pickupConsignments\"\n      [enableAddToCart]=\"enableAddToCart$ | async\"\n      [buyItAgainTranslation]=\"'addToCart.buyItAgain' | cxTranslate\"\n    ></cx-order-consigned-entries>\n\n    <!-- delivery consignment address and delivery mode -->\n    <ng-template\n      *ngIf=\"\n        deliveryConsignments &&\n        deliveryConsignments.length > 0 &&\n        (groupCartItems$ | async)\n      \"\n      [cxOutlet]=\"OrderOutlets.CONSIGNMENT_DELIVERY_INFO\"\n      [cxOutletContext]=\"{\n        showItemList: false,\n        order: order\n      }\"\n    >\n    </ng-template>\n\n    <!-- delivery consigned entries -->\n    <cx-order-consigned-entries\n      *ngIf=\"deliveryConsignments\"\n      [order]=\"order\"\n      [consignments]=\"deliveryConsignments\"\n      [enableAddToCart]=\"enableAddToCart$ | async\"\n      [buyItAgainTranslation]=\"'addToCart.buyItAgain' | cxTranslate\"\n    ></cx-order-consigned-entries>\n\n    <!-- unconsigned entries -->\n    <ng-container *ngIf=\"order?.unconsignedEntries?.length\">\n      <div *ngIf=\"order?.statusDisplay\" class=\"cx-list-header\">\n        <div class=\"cx-list-status\">\n          {{\n            'orderDetails.statusDisplay_' + order?.statusDisplay | cxTranslate\n          }}\n        </div>\n      </div>\n      <!-- delivery unconsigned entries -->\n      <ng-container *ngIf=\"deliveryUnConsignedEntries?.length\">\n        <h2 *ngIf=\"groupCartItems$ | async\" class=\"cx-review-header\">\n          {{ 'checkoutMode.deliveryEntries' | cxTranslate }}\n        </h2>\n        <div class=\"cx-list-item\">\n          <ng-template\n            [cxOutlet]=\"CartOutlets.CART_ITEM_LIST\"\n            [cxOutletContext]=\"{\n              items: deliveryUnConsignedEntries,\n              readonly: true,\n              promotionLocation: promotionLocation,\n              options: {\n                displayAddToCart: enableAddToCart$ | async,\n                addToCartString: 'addToCart.buyItAgain' | cxTranslate,\n                optionalBtn: addToCartBtn\n              }\n            }\"\n          >\n          </ng-template>\n        </div>\n      </ng-container>\n      <!-- pickup unconsigned entries, b2b does not have pickup items -->\n      <ng-container *ngIf=\"pickupUnconsignedEntries?.length\">\n        <h2 class=\"cx-review-header\">\n          {{ 'checkoutPickupInStore.heading' | cxTranslate }}\n        </h2>\n        <div class=\"cx-list-item\">\n          <ng-template\n            [cxOutlet]=\"CartOutlets.CART_ITEM_LIST\"\n            [cxOutletContext]=\"{\n              items: pickupUnconsignedEntries,\n              readonly: true,\n              promotionLocation: promotionLocation,\n              options: {\n                displayAddToCart: enableAddToCart$ | async,\n                addToCartString: 'addToCart.buyItAgain' | cxTranslate,\n                optionalBtn: addToCartBtn\n              }\n            }\"\n          >\n          </ng-template>\n        </div>\n      </ng-container>\n    </ng-container>\n\n    <!-- replenishment other entries -->\n    <ng-container *ngIf=\"order?.entries && order?.replenishmentOrderCode\">\n      <div class=\"cx-list\">\n        <div *ngIf=\"order?.statusDisplay\" class=\"cx-list-header\">\n          <div class=\"cx-list-status\">\n            {{\n              'orderDetails.statusDisplay_' + order?.statusDisplay | cxTranslate\n            }}\n          </div>\n        </div>\n        <div class=\"cx-list-item\">\n          <ng-template\n            [cxOutlet]=\"CartOutlets.CART_ITEM_LIST\"\n            [cxOutletContext]=\"{\n              items: order.entries,\n              readonly: true,\n              promotionLocation: promotionLocation,\n              options: {\n                displayAddToCart: enableAddToCart$ | async,\n                addToCartString: 'addToCart.buyItAgain' | cxTranslate,\n                optionalBtn: addToCartBtn\n              }\n            }\"\n          >\n          </ng-template>\n        </div>\n      </div>\n    </ng-container>\n  </ng-container>\n\n  <ng-template let-ctx #addToCartBtn>\n    <cx-add-to-cart\n      [productCode]=\"ctx.item.product?.code\"\n      [product]=\"ctx.item.product\"\n      [showQuantity]=\"false\"\n      [options]=\"ctx.options\"\n      [pickupStore]=\"ctx.item.deliveryPointOfService?.name\"\n      class=\"add-to-cart\"\n    >\n    </cx-add-to-cart>\n  </ng-template>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: OrderDetailsService }, { type: i3.CmsComponentData }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class TrackingEventsComponent {
    handleClick(event) {
        if (event.target.tagName === this.el.nativeElement.tagName) {
            this.close('Cross click');
        }
    }
    constructor(orderHistoryFacade, launchDialogService, el) {
        this.orderHistoryFacade = orderHistoryFacade;
        this.launchDialogService = launchDialogService;
        this.el = el;
        this.subscription = new Subscription();
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: 'button',
            focusOnEscape: true,
        };
    }
    ngOnInit() {
        this.subscription.add(this.launchDialogService.data$.subscribe((data) => {
            if (data) {
                this.init(data.tracking$, data.shipDate);
            }
        }));
    }
    ngOnDestroy() {
        this.orderHistoryFacade.clearConsignmentTracking();
        this.subscription?.unsubscribe();
    }
    init(tracking$, shipDate) {
        this.tracking$ = tracking$;
        this.shipDate = shipDate;
    }
    close(reason) {
        this.launchDialogService.closeDialog(reason);
    }
}
TrackingEventsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TrackingEventsComponent, deps: [{ token: i1.OrderHistoryFacade }, { token: i3.LaunchDialogService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
TrackingEventsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: TrackingEventsComponent, selector: "cx-tracking-events", host: { listeners: { "click": "handleClick($event)" } }, ngImport: i0, template: "<div\n  class=\"cx-consignment-tracking-dialog\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close('Escape clicked')\"\n>\n  <div class=\"cx-consignment-tracking-container\">\n    <ng-container\n      *ngIf=\"tracking$ | async as consignmentTracking; else loading\"\n    >\n      <!-- Modal Header -->\n      <div class=\"cx-modal-header\">\n        <div class=\"cx-consignment-tracking-title modal-title\">\n          {{ 'orderDetails.consignmentTracking.dialog.header' | cxTranslate }}\n        </div>\n        <button\n          type=\"button\"\n          class=\"close\"\n          [attr.aria-label]=\"'common.close' | cxTranslate\"\n          (click)=\"close('Cross click')\"\n        >\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <!-- Modal Body -->\n      <!-- shipment header -->\n      <ng-container\n        *ngIf=\"\n          consignmentTracking?.carrierDetails &&\n            consignmentTracking?.trackingID;\n          else noTracking\n        \"\n      >\n        <div class=\"cx-shipment-heading\">\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"cx-shipment-title\">\n                {{\n                  'orderDetails.consignmentTracking.dialog.shipped'\n                    | cxTranslate\n                }}\n              </div>\n              <div class=\"cx-shipment-content\">\n                {{ shipDate | cxDate: 'medium' }}\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"cx-shipment-title\">\n                {{\n                  'orderDetails.consignmentTracking.dialog.estimate'\n                    | cxTranslate\n                }}\n              </div>\n              <div class=\"cx-shipment-content\">\n                {{ consignmentTracking?.targetArrivalDate | cxDate: 'medium' }}\n              </div>\n            </div>\n          </div>\n\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"cx-shipment-title\">\n                {{\n                  'orderDetails.consignmentTracking.dialog.carrier'\n                    | cxTranslate\n                }}\n              </div>\n              <div class=\"cx-shipment-content\">\n                {{ consignmentTracking?.carrierDetails?.name }}\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"cx-shipment-title\">\n                {{\n                  'orderDetails.consignmentTracking.dialog.trackingId'\n                    | cxTranslate\n                }}\n              </div>\n              <div class=\"cx-shipment-content\">\n                <ng-container *ngIf=\"consignmentTracking?.trackingUrl\">\n                  <a\n                    target=\"_blank\"\n                    rel=\"noopener noreferrer\"\n                    [href]=\"consignmentTracking.trackingUrl\"\n                    >{{ consignmentTracking?.trackingID }}</a\n                  >\n                </ng-container>\n                <ng-container *ngIf=\"!consignmentTracking?.trackingUrl\">\n                  <label>\n                    {{ consignmentTracking?.trackingID }}\n                  </label>\n                </ng-container>\n              </div>\n            </div>\n          </div>\n        </div>\n      </ng-container>\n\n      <!-- tracking events -->\n      <div class=\"cx-tracking-events modal-body\">\n        <ng-container\n          *ngFor=\"let consignmentEvent of consignmentTracking.trackingEvents\"\n        >\n          <div class=\"cx-tracking-event-body\">\n            <div class=\"cx-tracking-event-content\">\n              {{ consignmentEvent.eventDate | cxDate: 'medium' }}\n            </div>\n            <div class=\"cx-tracking-event-title\">\n              {{ consignmentEvent.referenceCode }}\n            </div>\n            <div class=\"cx-tracking-event-content\">\n              {{ consignmentEvent.detail }}\n            </div>\n            <div class=\"cx-tracking-event-city\">\n              location: {{ consignmentEvent.location }}\n            </div>\n          </div>\n        </ng-container>\n      </div>\n    </ng-container>\n\n    <ng-template #noTracking>\n      <div class=\"cx-no-tracking-heading\">\n        <div class=\"cx-shipment-content\">\n          {{\n            'orderDetails.consignmentTracking.dialog.noTracking' | cxTranslate\n          }}\n        </div>\n      </div>\n    </ng-template>\n\n    <ng-template #loading>\n      <div class=\"cx-tracking-loading\">\n        <div class=\"header modal-header\">\n          <div class=\"title modal-title\">\n            {{\n              'orderDetails.consignmentTracking.dialog.loadingHeader'\n                | cxTranslate\n            }}\n          </div>\n          <button\n            type=\"button\"\n            class=\"close btn-dismiss\"\n            [attr.aria-label]=\"'common.close' | cxTranslate\"\n            (click)=\"close('Cross click')\"\n          >\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n        </div>\n        <!-- Modal Body -->\n        <div class=\"body modal-body\">\n          <div class=\"row\">\n            <div class=\"col-sm-12\">\n              <cx-spinner></cx-spinner>\n            </div>\n          </div>\n        </div>\n      </div>\n    </ng-template>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.SpinnerComponent, selector: "cx-spinner" }, { kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.CxDatePipe, name: "cxDate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TrackingEventsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-tracking-events', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"cx-consignment-tracking-dialog\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close('Escape clicked')\"\n>\n  <div class=\"cx-consignment-tracking-container\">\n    <ng-container\n      *ngIf=\"tracking$ | async as consignmentTracking; else loading\"\n    >\n      <!-- Modal Header -->\n      <div class=\"cx-modal-header\">\n        <div class=\"cx-consignment-tracking-title modal-title\">\n          {{ 'orderDetails.consignmentTracking.dialog.header' | cxTranslate }}\n        </div>\n        <button\n          type=\"button\"\n          class=\"close\"\n          [attr.aria-label]=\"'common.close' | cxTranslate\"\n          (click)=\"close('Cross click')\"\n        >\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <!-- Modal Body -->\n      <!-- shipment header -->\n      <ng-container\n        *ngIf=\"\n          consignmentTracking?.carrierDetails &&\n            consignmentTracking?.trackingID;\n          else noTracking\n        \"\n      >\n        <div class=\"cx-shipment-heading\">\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"cx-shipment-title\">\n                {{\n                  'orderDetails.consignmentTracking.dialog.shipped'\n                    | cxTranslate\n                }}\n              </div>\n              <div class=\"cx-shipment-content\">\n                {{ shipDate | cxDate: 'medium' }}\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"cx-shipment-title\">\n                {{\n                  'orderDetails.consignmentTracking.dialog.estimate'\n                    | cxTranslate\n                }}\n              </div>\n              <div class=\"cx-shipment-content\">\n                {{ consignmentTracking?.targetArrivalDate | cxDate: 'medium' }}\n              </div>\n            </div>\n          </div>\n\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"cx-shipment-title\">\n                {{\n                  'orderDetails.consignmentTracking.dialog.carrier'\n                    | cxTranslate\n                }}\n              </div>\n              <div class=\"cx-shipment-content\">\n                {{ consignmentTracking?.carrierDetails?.name }}\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"cx-shipment-title\">\n                {{\n                  'orderDetails.consignmentTracking.dialog.trackingId'\n                    | cxTranslate\n                }}\n              </div>\n              <div class=\"cx-shipment-content\">\n                <ng-container *ngIf=\"consignmentTracking?.trackingUrl\">\n                  <a\n                    target=\"_blank\"\n                    rel=\"noopener noreferrer\"\n                    [href]=\"consignmentTracking.trackingUrl\"\n                    >{{ consignmentTracking?.trackingID }}</a\n                  >\n                </ng-container>\n                <ng-container *ngIf=\"!consignmentTracking?.trackingUrl\">\n                  <label>\n                    {{ consignmentTracking?.trackingID }}\n                  </label>\n                </ng-container>\n              </div>\n            </div>\n          </div>\n        </div>\n      </ng-container>\n\n      <!-- tracking events -->\n      <div class=\"cx-tracking-events modal-body\">\n        <ng-container\n          *ngFor=\"let consignmentEvent of consignmentTracking.trackingEvents\"\n        >\n          <div class=\"cx-tracking-event-body\">\n            <div class=\"cx-tracking-event-content\">\n              {{ consignmentEvent.eventDate | cxDate: 'medium' }}\n            </div>\n            <div class=\"cx-tracking-event-title\">\n              {{ consignmentEvent.referenceCode }}\n            </div>\n            <div class=\"cx-tracking-event-content\">\n              {{ consignmentEvent.detail }}\n            </div>\n            <div class=\"cx-tracking-event-city\">\n              location: {{ consignmentEvent.location }}\n            </div>\n          </div>\n        </ng-container>\n      </div>\n    </ng-container>\n\n    <ng-template #noTracking>\n      <div class=\"cx-no-tracking-heading\">\n        <div class=\"cx-shipment-content\">\n          {{\n            'orderDetails.consignmentTracking.dialog.noTracking' | cxTranslate\n          }}\n        </div>\n      </div>\n    </ng-template>\n\n    <ng-template #loading>\n      <div class=\"cx-tracking-loading\">\n        <div class=\"header modal-header\">\n          <div class=\"title modal-title\">\n            {{\n              'orderDetails.consignmentTracking.dialog.loadingHeader'\n                | cxTranslate\n            }}\n          </div>\n          <button\n            type=\"button\"\n            class=\"close btn-dismiss\"\n            [attr.aria-label]=\"'common.close' | cxTranslate\"\n            (click)=\"close('Cross click')\"\n          >\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n        </div>\n        <!-- Modal Body -->\n        <div class=\"body modal-body\">\n          <div class=\"row\">\n            <div class=\"col-sm-12\">\n              <cx-spinner></cx-spinner>\n            </div>\n          </div>\n        </div>\n      </div>\n    </ng-template>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.OrderHistoryFacade }, { type: i3.LaunchDialogService }, { type: i0.ElementRef }]; }, propDecorators: { handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

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
class MyAccountV2ConsignmentTrackingComponent extends ConsignmentTrackingComponent {
    constructor() {
        super(...arguments);
        this.componentClass = 'cx-list-header col-12';
        this.outlet = inject(OutletContextData);
    }
    ngOnInit() {
        this.outlet?.context$.subscribe((context) => {
            this.consignment = context.item;
        });
        this.outlet?.context$.subscribe((context) => {
            this.orderCode = context?.order?.code ?? '';
        });
        super.ngOnInit();
    }
}
MyAccountV2ConsignmentTrackingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2ConsignmentTrackingComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
MyAccountV2ConsignmentTrackingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: MyAccountV2ConsignmentTrackingComponent, selector: "cx-my-account-v2-consignment-tracking", host: { properties: { "className": "this.componentClass" } }, usesInheritance: true, ngImport: i0, template: "<div *ngIf=\"consignment\" class=\"cx-list-status\">\n  <span>\n    <span *ngIf=\"consignment.status\">\n      {{ 'orderDetails.deliveryStatus_' + consignment.status | cxTranslate }}\n    </span>\n    <span\n      *ngIf=\"consignmentStatus.includes(consignment.status ?? '')\"\n      class=\"cx-item-list-tracking-id\"\n    >\n      <span *ngIf=\"consignment.trackingID; else showNoTrackingMessage\">\n        {{\n          'orderDetails.consignmentTracking.dialog.trackingId' | cxTranslate\n        }}:\n        <a\n          class=\"cx-tracking-id-link\"\n          (click)=\"openTrackingDialog(consignment)\"\n        >\n          {{ consignment.trackingID }}\n        </a>\n      </span>\n    </span>\n  </span>\n  <span *ngIf=\"consignment?.statusDate\" class=\"cx-consignment-status-date\">\n    {{ consignment.statusDate | cxDate }}\n  </span>\n  <ng-template #showNoTrackingMessage>\n    <a class=\"cx-tracking-id-link\" (click)=\"openTrackingDialog(consignment)\">\n      {{ 'orderDetails.consignmentTracking.action' | cxTranslate }}\n    </a>\n  </ng-template>\n</div>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.CxDatePipe, name: "cxDate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2ConsignmentTrackingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-my-account-v2-consignment-tracking', template: "<div *ngIf=\"consignment\" class=\"cx-list-status\">\n  <span>\n    <span *ngIf=\"consignment.status\">\n      {{ 'orderDetails.deliveryStatus_' + consignment.status | cxTranslate }}\n    </span>\n    <span\n      *ngIf=\"consignmentStatus.includes(consignment.status ?? '')\"\n      class=\"cx-item-list-tracking-id\"\n    >\n      <span *ngIf=\"consignment.trackingID; else showNoTrackingMessage\">\n        {{\n          'orderDetails.consignmentTracking.dialog.trackingId' | cxTranslate\n        }}:\n        <a\n          class=\"cx-tracking-id-link\"\n          (click)=\"openTrackingDialog(consignment)\"\n        >\n          {{ consignment.trackingID }}\n        </a>\n      </span>\n    </span>\n  </span>\n  <span *ngIf=\"consignment?.statusDate\" class=\"cx-consignment-status-date\">\n    {{ consignment.statusDate | cxDate }}\n  </span>\n  <ng-template #showNoTrackingMessage>\n    <a class=\"cx-tracking-id-link\" (click)=\"openTrackingDialog(consignment)\">\n      {{ 'orderDetails.consignmentTracking.action' | cxTranslate }}\n    </a>\n  </ng-template>\n</div>\n" }]
        }], propDecorators: { componentClass: [{
                type: HostBinding,
                args: ['className']
            }] } });

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
const defaultConsignmentTrackingLayoutConfig = {
    launch: {
        CONSIGNMENT_TRACKING: {
            inlineRoot: true,
            component: TrackingEventsComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderDetailReorderComponent {
    constructor(orderDetailsService, launchDialogService, vcr) {
        this.orderDetailsService = orderDetailsService;
        this.launchDialogService = launchDialogService;
        this.vcr = vcr;
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.order$ = this.orderDetailsService.getOrderDetails();
    }
    onReorderClick(order) {
        this.launchDialog(order.code);
    }
    launchDialog(orderCode) {
        const dialog = this.launchDialogService.openDialog("REORDER" /* LAUNCH_CALLER.REORDER */, this.element, this.vcr, { orderCode });
        if (dialog) {
            this.subscription.add(dialog.pipe(take(1)).subscribe());
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
OrderDetailReorderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailReorderComponent, deps: [{ token: OrderDetailsService }, { token: i3.LaunchDialogService }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
OrderDetailReorderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: OrderDetailReorderComponent, selector: "cx-order-details-reorder", viewQueries: [{ propertyName: "element", first: true, predicate: ["element"], descendants: true }], ngImport: i0, template: "<ng-container *ngIf=\"order$ | async as order\">\n  <ng-container *ngIf=\"order.code\">\n    <div class=\"cx-nav row\">\n      <div class=\"col-xs-12 col-md-10 col-lg-8\">\n        <button\n          #element\n          class=\"btn btn-primary\"\n          (click)=\"onReorderClick(order)\"\n        >\n          {{ 'reorder.button' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailReorderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-details-reorder', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"order$ | async as order\">\n  <ng-container *ngIf=\"order.code\">\n    <div class=\"cx-nav row\">\n      <div class=\"col-xs-12 col-md-10 col-lg-8\">\n        <button\n          #element\n          class=\"btn btn-primary\"\n          (click)=\"onReorderClick(order)\"\n        >\n          {{ 'reorder.button' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: OrderDetailsService }, { type: i3.LaunchDialogService }, { type: i0.ViewContainerRef }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['element']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReorderDialogComponent {
    constructor(launchDialogService, reorderOrderFacade, multiCartFacade) {
        this.launchDialogService = launchDialogService;
        this.reorderOrderFacade = reorderOrderFacade;
        this.multiCartFacade = multiCartFacade;
        this.iconTypes = ICON_TYPE;
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: true,
            focusOnEscape: true,
        };
        this.loading$ = new BehaviorSubject(false);
        this.showDecisionPrompt$ = new BehaviorSubject(true);
        this.data$ = this.launchDialogService.data$;
    }
    createCartFromOrder(orderCode) {
        this.showDecisionPrompt$.next(false);
        this.loading$.next(true);
        this.reorderOrderFacade
            .reorder(orderCode)
            .subscribe((cartModificationList) => {
            this.multiCartFacade.reloadCart(OCC_CART_ID_CURRENT);
            this.cartModifications = cartModificationList.cartModifications;
            this.loading$.next(false);
        });
    }
    close(reason) {
        this.launchDialogService.closeDialog(reason);
    }
    get cartValidationStatusCode() {
        return CartValidationStatusCode;
    }
}
ReorderDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReorderDialogComponent, deps: [{ token: i3.LaunchDialogService }, { token: i1.ReorderOrderFacade }, { token: i3$3.MultiCartFacade }], target: i0.ɵɵFactoryTarget.Component });
ReorderDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ReorderDialogComponent, selector: "cx-reorder-dialog", ngImport: i0, template: "<div\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close('Escape clicked')\"\n  class=\"cx-modal-container\"\n>\n  <div class=\"cx-modal-content\">\n    <ng-container>\n      <div class=\"cx-dialog-header modal-header\">\n        <div class=\"cx-dialog-title modal-title\">\n          {{ 'reorder.dialog.reorderProducts' | cxTranslate }}\n        </div>\n        <button\n          type=\"button\"\n          class=\"close\"\n          attr.aria-label=\"{{ 'addToCart.closeModal' | cxTranslate }}\"\n          (click)=\"close('Close reorder result dialog')\"\n        >\n          <span aria-hidden=\"true\">\n            <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n          </span>\n        </button>\n      </div>\n    </ng-container>\n\n    <!-- Modal Body -->\n    <div class=\"cx-dialog-body modal-body\">\n      <ng-container *ngIf=\"data$ | async as data\">\n        <ng-container *ngIf=\"showDecisionPrompt$ | async; else result\">\n          <div class=\"cx-reorder-dialog-areyousure-section\">\n            <p>\n              {{ 'reorder.dialog.areYouSureToReplaceCart' | cxTranslate }}\n            </p>\n            <div class=\"cx-reorder-dialog-footer\">\n              <div class=\"row\">\n                <div class=\"col-12\">\n                  <button\n                    class=\"btn btn-action\"\n                    (click)=\"close('Cancel creating cart from order')\"\n                  >\n                    {{ 'reorder.dialog.cancel' | cxTranslate }}\n                  </button>\n                  <button\n                    class=\"btn btn-primary\"\n                    (click)=\"createCartFromOrder(data.orderCode)\"\n                  >\n                    {{ 'reorder.dialog.continue' | cxTranslate }}\n                  </button>\n                </div>\n              </div>\n            </div>\n          </div>\n        </ng-container>\n        <ng-template #result>\n          <ng-container *ngIf=\"!(loading$ | async); else loading\">\n            <p>\n              <ng-container\n                *ngIf=\"!cartModifications?.length; else cartResponse\"\n              >\n                <span class=\"cx-cart-mod-entry-container\">\n                  <span class=\"alert-icon\">\n                    <cx-icon\n                      class=\"success\"\n                      [type]=\"iconTypes.SUCCESS\"\n                    ></cx-icon>\n                  </span>\n                  {{ 'reorder.dialog.messages.success' | cxTranslate }}\n                </span>\n              </ng-container>\n              <ng-template #cartResponse>\n                <span\n                  *ngFor=\"let cartModification of cartModifications\"\n                  class=\"cx-cart-mod-entry-container\"\n                >\n                  <ng-container\n                    *ngIf=\"\n                      cartModification.statusCode ===\n                        cartValidationStatusCode.LOW_STOCK;\n                      else errorIcon\n                    \"\n                  >\n                    <span class=\"alert-icon\">\n                      <cx-icon\n                        class=\"warning\"\n                        [type]=\"iconTypes.INFO\"\n                      ></cx-icon>\n                    </span>\n                  </ng-container>\n                  <ng-template #errorIcon>\n                    <span class=\"alert-icon\">\n                      <cx-icon class=\"error\" [type]=\"iconTypes.ERROR\"></cx-icon>\n                    </span>\n                  </ng-template>\n                  <span>\n                    {{\n                      'reorder.dialog.messages.' + cartModification.statusCode\n                        | cxTranslate\n                          : {\n                              quantity: cartModification.quantity,\n                              quantityAdded: cartModification.quantityAdded,\n                              productCode: cartModification.entry.product.code,\n                              productName: cartModification.entry.product.name\n                            }\n                    }}\n                  </span>\n                </span>\n              </ng-template>\n            </p>\n          </ng-container>\n          <ng-template #loading>\n            <div class=\"cx-spinner\">\n              <cx-spinner></cx-spinner>\n            </div>\n          </ng-template>\n        </ng-template>\n      </ng-container>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.SpinnerComponent, selector: "cx-spinner" }, { kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReorderDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-reorder-dialog', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close('Escape clicked')\"\n  class=\"cx-modal-container\"\n>\n  <div class=\"cx-modal-content\">\n    <ng-container>\n      <div class=\"cx-dialog-header modal-header\">\n        <div class=\"cx-dialog-title modal-title\">\n          {{ 'reorder.dialog.reorderProducts' | cxTranslate }}\n        </div>\n        <button\n          type=\"button\"\n          class=\"close\"\n          attr.aria-label=\"{{ 'addToCart.closeModal' | cxTranslate }}\"\n          (click)=\"close('Close reorder result dialog')\"\n        >\n          <span aria-hidden=\"true\">\n            <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n          </span>\n        </button>\n      </div>\n    </ng-container>\n\n    <!-- Modal Body -->\n    <div class=\"cx-dialog-body modal-body\">\n      <ng-container *ngIf=\"data$ | async as data\">\n        <ng-container *ngIf=\"showDecisionPrompt$ | async; else result\">\n          <div class=\"cx-reorder-dialog-areyousure-section\">\n            <p>\n              {{ 'reorder.dialog.areYouSureToReplaceCart' | cxTranslate }}\n            </p>\n            <div class=\"cx-reorder-dialog-footer\">\n              <div class=\"row\">\n                <div class=\"col-12\">\n                  <button\n                    class=\"btn btn-action\"\n                    (click)=\"close('Cancel creating cart from order')\"\n                  >\n                    {{ 'reorder.dialog.cancel' | cxTranslate }}\n                  </button>\n                  <button\n                    class=\"btn btn-primary\"\n                    (click)=\"createCartFromOrder(data.orderCode)\"\n                  >\n                    {{ 'reorder.dialog.continue' | cxTranslate }}\n                  </button>\n                </div>\n              </div>\n            </div>\n          </div>\n        </ng-container>\n        <ng-template #result>\n          <ng-container *ngIf=\"!(loading$ | async); else loading\">\n            <p>\n              <ng-container\n                *ngIf=\"!cartModifications?.length; else cartResponse\"\n              >\n                <span class=\"cx-cart-mod-entry-container\">\n                  <span class=\"alert-icon\">\n                    <cx-icon\n                      class=\"success\"\n                      [type]=\"iconTypes.SUCCESS\"\n                    ></cx-icon>\n                  </span>\n                  {{ 'reorder.dialog.messages.success' | cxTranslate }}\n                </span>\n              </ng-container>\n              <ng-template #cartResponse>\n                <span\n                  *ngFor=\"let cartModification of cartModifications\"\n                  class=\"cx-cart-mod-entry-container\"\n                >\n                  <ng-container\n                    *ngIf=\"\n                      cartModification.statusCode ===\n                        cartValidationStatusCode.LOW_STOCK;\n                      else errorIcon\n                    \"\n                  >\n                    <span class=\"alert-icon\">\n                      <cx-icon\n                        class=\"warning\"\n                        [type]=\"iconTypes.INFO\"\n                      ></cx-icon>\n                    </span>\n                  </ng-container>\n                  <ng-template #errorIcon>\n                    <span class=\"alert-icon\">\n                      <cx-icon class=\"error\" [type]=\"iconTypes.ERROR\"></cx-icon>\n                    </span>\n                  </ng-template>\n                  <span>\n                    {{\n                      'reorder.dialog.messages.' + cartModification.statusCode\n                        | cxTranslate\n                          : {\n                              quantity: cartModification.quantity,\n                              quantityAdded: cartModification.quantityAdded,\n                              productCode: cartModification.entry.product.code,\n                              productName: cartModification.entry.product.name\n                            }\n                    }}\n                  </span>\n                </span>\n              </ng-template>\n            </p>\n          </ng-container>\n          <ng-template #loading>\n            <div class=\"cx-spinner\">\n              <cx-spinner></cx-spinner>\n            </div>\n          </ng-template>\n        </ng-template>\n      </ng-container>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i3.LaunchDialogService }, { type: i1.ReorderOrderFacade }, { type: i3$3.MultiCartFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderDetailTotalsComponent {
    constructor(orderDetailsService) {
        this.orderDetailsService = orderDetailsService;
        this.CartOutlets = CartOutlets;
    }
    ngOnInit() {
        this.order$ = this.orderDetailsService.getOrderDetails();
    }
}
OrderDetailTotalsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailTotalsComponent, deps: [{ token: OrderDetailsService }], target: i0.ɵɵFactoryTarget.Component });
OrderDetailTotalsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: OrderDetailTotalsComponent, selector: "cx-order-details-totals", ngImport: i0, template: "<ng-container *ngIf=\"order$ | async as order\">\n  <div class=\"row justify-content-end\">\n    <div class=\"cx-summary col-sm-12 col-md-6 col-lg-5 col-xl-4\">\n      <ng-template\n        [cxOutlet]=\"CartOutlets.ORDER_SUMMARY\"\n        [cxOutletContext]=\"order\"\n      >\n      </ng-template>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer", "cxComponentRef"], outputs: ["loaded", "cxComponentRefChange"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailTotalsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-details-totals', template: "<ng-container *ngIf=\"order$ | async as order\">\n  <div class=\"row justify-content-end\">\n    <div class=\"cx-summary col-sm-12 col-md-6 col-lg-5 col-xl-4\">\n      <ng-template\n        [cxOutlet]=\"CartOutlets.ORDER_SUMMARY\"\n        [cxOutletContext]=\"order\"\n      >\n      </ng-template>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: OrderDetailsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultReorderLayoutConfig = {
    launch: {
        REORDER: {
            inline: true,
            component: ReorderDialogComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function registerOrderOutletFactory() {
    const isMyAccountV2 = inject(USE_MY_ACCOUNT_V2_ORDER);
    const outletService = inject(OutletService);
    const componentFactoryResolver = inject(ComponentFactoryResolver);
    return () => {
        const config = {
            component: MyAccountV2ConsignmentTrackingComponent,
            id: OrderOutlets.ORDER_CONSIGNMENT,
            position: OutletPosition.REPLACE,
        };
        if (isMyAccountV2) {
            const template = componentFactoryResolver.resolveComponentFactory(config.component);
            outletService.add(config.id, template, config.position);
        }
    };
}
const myAccountV2CmsMapping$1 = {
    cmsComponents: {
        AccountOrderDetailsActionsComponent: {
            component: MyAccountV2OrderDetailsActionsComponent,
            //guards: inherited from standard config,
        },
    },
};
const moduleComponents$2 = [
    OrderOverviewComponent,
    OrderDetailActionsComponent,
    OrderDetailItemsComponent,
    OrderDetailTotalsComponent,
    OrderDetailBillingComponent,
    TrackingEventsComponent,
    ConsignmentTrackingComponent,
    OrderConsignedEntriesComponent,
    OrderDetailReorderComponent,
    ReorderDialogComponent,
    MyAccountV2OrderDetailsActionsComponent,
    MyAccountV2ConsignmentTrackingComponent,
];
class OrderDetailsModule {
}
OrderDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailsModule, declarations: [OrderOverviewComponent,
        OrderDetailActionsComponent,
        OrderDetailItemsComponent,
        OrderDetailTotalsComponent,
        OrderDetailBillingComponent,
        TrackingEventsComponent,
        ConsignmentTrackingComponent,
        OrderConsignedEntriesComponent,
        OrderDetailReorderComponent,
        ReorderDialogComponent,
        MyAccountV2OrderDetailsActionsComponent,
        MyAccountV2ConsignmentTrackingComponent], imports: [CardModule,
        CommonModule,
        I18nModule,
        FeaturesConfigModule,
        PromotionsModule,
        UrlModule,
        SpinnerModule,
        RouterModule,
        OutletModule,
        AddToCartModule,
        KeyboardFocusModule,
        IconModule,
        MyAccountV2DownloadInvoicesModule], exports: [OrderOverviewComponent,
        OrderDetailActionsComponent,
        OrderDetailItemsComponent,
        OrderDetailTotalsComponent,
        OrderDetailBillingComponent,
        TrackingEventsComponent,
        ConsignmentTrackingComponent,
        OrderConsignedEntriesComponent,
        OrderDetailReorderComponent,
        ReorderDialogComponent,
        MyAccountV2OrderDetailsActionsComponent,
        MyAccountV2ConsignmentTrackingComponent] });
OrderDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                AccountOrderDetailsActionsComponent: {
                    component: OrderDetailActionsComponent,
                    guards: [AuthGuard],
                },
                AccountOrderDetailsItemsComponent: {
                    component: OrderDetailItemsComponent,
                    guards: [AuthGuard],
                    data: {
                        enableAddToCart: true,
                    },
                },
                AccountOrderDetailsGroupedItemsComponent: {
                    component: OrderDetailItemsComponent,
                    guards: [AuthGuard],
                    data: {
                        enableAddToCart: true,
                        groupCartItems: true,
                    },
                },
                AccountOrderDetailsTotalsComponent: {
                    component: OrderDetailTotalsComponent,
                    guards: [AuthGuard],
                },
                AccountOrderDetailsOverviewComponent: {
                    component: OrderOverviewComponent,
                    guards: [AuthGuard],
                },
                AccountOrderDetailsSimpleOverviewComponent: {
                    component: OrderOverviewComponent,
                    guards: [AuthGuard],
                    data: {
                        simple: true,
                    },
                },
                AccountOrderDetailsReorderComponent: {
                    component: OrderDetailReorderComponent,
                    guards: [AuthGuard],
                },
            },
            features: {
                consignmentTracking: '1.2',
            },
        }),
        provideDefaultConfig(defaultConsignmentTrackingLayoutConfig),
        provideDefaultConfig(defaultReorderLayoutConfig),
        provideDefaultConfigFactory(() => inject(USE_MY_ACCOUNT_V2_ORDER) ? myAccountV2CmsMapping$1 : {}),
        {
            provide: MODULE_INITIALIZER,
            useFactory: registerOrderOutletFactory,
            multi: true,
        },
    ], imports: [CardModule,
        CommonModule,
        I18nModule,
        FeaturesConfigModule,
        PromotionsModule,
        UrlModule,
        SpinnerModule,
        RouterModule,
        OutletModule,
        AddToCartModule,
        KeyboardFocusModule,
        IconModule,
        MyAccountV2DownloadInvoicesModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CardModule,
                        CommonModule,
                        I18nModule,
                        FeaturesConfigModule,
                        PromotionsModule,
                        UrlModule,
                        SpinnerModule,
                        RouterModule,
                        OutletModule,
                        AddToCartModule,
                        KeyboardFocusModule,
                        IconModule,
                        MyAccountV2DownloadInvoicesModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                AccountOrderDetailsActionsComponent: {
                                    component: OrderDetailActionsComponent,
                                    guards: [AuthGuard],
                                },
                                AccountOrderDetailsItemsComponent: {
                                    component: OrderDetailItemsComponent,
                                    guards: [AuthGuard],
                                    data: {
                                        enableAddToCart: true,
                                    },
                                },
                                AccountOrderDetailsGroupedItemsComponent: {
                                    component: OrderDetailItemsComponent,
                                    guards: [AuthGuard],
                                    data: {
                                        enableAddToCart: true,
                                        groupCartItems: true,
                                    },
                                },
                                AccountOrderDetailsTotalsComponent: {
                                    component: OrderDetailTotalsComponent,
                                    guards: [AuthGuard],
                                },
                                AccountOrderDetailsOverviewComponent: {
                                    component: OrderOverviewComponent,
                                    guards: [AuthGuard],
                                },
                                AccountOrderDetailsSimpleOverviewComponent: {
                                    component: OrderOverviewComponent,
                                    guards: [AuthGuard],
                                    data: {
                                        simple: true,
                                    },
                                },
                                AccountOrderDetailsReorderComponent: {
                                    component: OrderDetailReorderComponent,
                                    guards: [AuthGuard],
                                },
                            },
                            features: {
                                consignmentTracking: '1.2',
                            },
                        }),
                        provideDefaultConfig(defaultConsignmentTrackingLayoutConfig),
                        provideDefaultConfig(defaultReorderLayoutConfig),
                        provideDefaultConfigFactory(() => inject(USE_MY_ACCOUNT_V2_ORDER) ? myAccountV2CmsMapping$1 : {}),
                        {
                            provide: MODULE_INITIALIZER,
                            useFactory: registerOrderOutletFactory,
                            multi: true,
                        },
                    ],
                    declarations: [...moduleComponents$2],
                    exports: [...moduleComponents$2],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderHistoryComponent {
    constructor(routing, orderHistoryFacade, translation, replenishmentOrderHistoryFacade) {
        this.routing = routing;
        this.orderHistoryFacade = orderHistoryFacade;
        this.translation = translation;
        this.replenishmentOrderHistoryFacade = replenishmentOrderHistoryFacade;
        this.PAGE_SIZE = 5;
        this.orders$ = this.orderHistoryFacade
            .getOrderHistoryList(this.PAGE_SIZE)
            .pipe(tap((orders) => {
            this.setOrderHistoryParams(orders);
        }));
        this.hasReplenishmentOrder$ = this.replenishmentOrderHistoryFacade
            .getReplenishmentOrderDetails()
            .pipe(map((order) => order && Object.keys(order).length !== 0));
        this.isLoaded$ = this.orderHistoryFacade.getOrderHistoryListLoaded();
        /**
         * When "Order Return" feature is enabled, this component becomes one tab in
         * TabParagraphContainerComponent. This can be read from TabParagraphContainer.
         */
        this.tabTitleParam$ = this.orders$.pipe(map((order) => order?.pagination?.totalResults), filter(isNotUndefined), take(1));
    }
    setOrderHistoryParams(orders) {
        if (orders?.pagination?.sort) {
            this.sortType = orders.pagination.sort;
        }
        this.hasPONumber = orders?.orders?.[0]?.purchaseOrderNumber !== undefined;
    }
    ngOnDestroy() {
        this.orderHistoryFacade.clearOrderList();
    }
    changeSortCode(sortCode) {
        const event = {
            sortCode,
            currentPage: 0,
        };
        this.sortType = sortCode;
        this.fetchOrders(event);
    }
    pageChange(page) {
        const event = {
            sortCode: this.sortType,
            currentPage: page,
        };
        this.fetchOrders(event);
    }
    goToOrderDetail(order) {
        this.routing.go({
            cxRoute: 'orderDetails',
            params: order,
        });
    }
    getSortLabels() {
        return combineLatest([
            this.translation.translate('sorting.date'),
            this.translation.translate('sorting.orderNumber'),
        ]).pipe(map(([textByDate, textByOrderNumber]) => {
            return {
                byDate: textByDate,
                byOrderNumber: textByOrderNumber,
            };
        }));
    }
    fetchOrders(event) {
        this.orderHistoryFacade.loadOrderList(this.PAGE_SIZE, event.currentPage, event.sortCode);
    }
}
OrderHistoryComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderHistoryComponent, deps: [{ token: i2.RoutingService }, { token: i1.OrderHistoryFacade }, { token: i2.TranslationService }, { token: i1.ReplenishmentOrderHistoryFacade }], target: i0.ɵɵFactoryTarget.Component });
OrderHistoryComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: OrderHistoryComponent, selector: "cx-order-history", ngImport: i0, template: "<ng-container\n  *ngIf=\"{\n    orderHistory: orders$ | async,\n    replenishmentOrder: hasReplenishmentOrder$ | async\n  } as type\"\n>\n  <ng-container *ngIf=\"type.orderHistory\">\n    <div>\n      <!-- HEADER -->\n      <div\n        [ngClass]=\"\n          type.replenishmentOrder\n            ? 'cx-replenishment-details-order-history-header'\n            : 'cx-order-history-header'\n        \"\n      >\n        <h4 *ngIf=\"type.replenishmentOrder\">\n          {{ 'orderHistory.replenishmentHistory' | cxTranslate }}\n        </h4>\n        <h2 *ngIf=\"!type.replenishmentOrder\">\n          {{ 'orderHistory.orderHistory' | cxTranslate }}\n        </h2>\n      </div>\n\n      <!-- BODY -->\n      <div class=\"cx-order-history-body\">\n        <ng-container\n          *ngIf=\"type.orderHistory.pagination.totalResults > 0; else noOrder\"\n        >\n          <!-- Select Form and Pagination Top -->\n          <div class=\"cx-order-history-sort top\">\n            <label class=\"cx-order-history-form-group form-group\"\n              ><span>\n                {{ 'orderHistory.sortBy' | cxTranslate }}\n              </span>\n              <cx-sorting\n                [sortOptions]=\"type.orderHistory.sorts\"\n                [sortLabels]=\"getSortLabels() | async\"\n                (sortListEvent)=\"changeSortCode($event)\"\n                [selectedOption]=\"type.orderHistory.pagination.sort\"\n                placeholder=\"{{ 'orderHistory.sortBy' | cxTranslate }}\"\n                [ariaLabel]=\"'orderHistory.sortOrders' | cxTranslate\"\n                ariaControls=\"order-history-table\"\n              ></cx-sorting>\n            </label>\n            <div\n              *ngIf=\"type.orderHistory.pagination.totalPages > 1\"\n              class=\"cx-order-history-pagination\"\n            >\n              <cx-pagination\n                [pagination]=\"type.orderHistory.pagination\"\n                (viewPageEvent)=\"pageChange($event)\"\n              ></cx-pagination>\n            </div>\n          </div>\n\n          <table\n            role=\"table\"\n            id=\"order-history-table\"\n            class=\"table cx-order-history-table\"\n            [ngClass]=\"{ 'cx-order-history-table-po': hasPONumber }\"\n          >\n            <caption class=\"cx-visually-hidden\">\n              {{\n                'orderHistory.orderHistory' | cxTranslate\n              }}\n            </caption>\n            <thead class=\"cx-order-history-thead-mobile\">\n              <tr role=\"row\">\n                <th role=\"columnheader\">\n                  {{ 'orderHistory.orderId' | cxTranslate }}\n                </th>\n                <ng-container *ngIf=\"hasPONumber\">\n                  <th role=\"columnheader\">\n                    {{ 'orderHistory.PONumber' | cxTranslate }}\n                  </th>\n                  <th role=\"columnheader\">\n                    {{ 'orderHistory.costCenter' | cxTranslate }}\n                  </th>\n                </ng-container>\n                <th role=\"columnheader\">\n                  {{ 'orderHistory.date' | cxTranslate }}\n                </th>\n                <th role=\"columnheader\">\n                  {{ 'orderHistory.status' | cxTranslate }}\n                </th>\n                <th role=\"columnheader\">\n                  {{ 'orderHistory.total' | cxTranslate }}\n                </th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr\n                role=\"row\"\n                *ngFor=\"let order of type.orderHistory.orders\"\n                (click)=\"goToOrderDetail(order)\"\n              >\n                <td role=\"cell\" class=\"cx-order-history-code\">\n                  <div class=\"cx-order-history-label\">\n                    {{ 'orderHistory.orderId' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'orderDetails',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-order-history-value\"\n                  >\n                    {{ order?.code }}</a\n                  >\n                </td>\n                <ng-container *ngIf=\"hasPONumber\">\n                  <td role=\"cell\" class=\"cx-order-history-po\">\n                    <div class=\"cx-order-history-label\">\n                      {{ 'orderHistory.PONumber' | cxTranslate }}\n                    </div>\n                    <a\n                      *ngIf=\"order.purchaseOrderNumber\"\n                      [routerLink]=\"\n                        {\n                          cxRoute: 'orderDetails',\n                          params: order\n                        } | cxUrl\n                      \"\n                      class=\"cx-order-history-value\"\n                    >\n                      {{ order.purchaseOrderNumber }}</a\n                    >\n                  </td>\n                  <td role=\"cell\" class=\"cx-order-history-cost-center\">\n                    <div class=\"cx-order-history-label\">\n                      {{ 'orderHistory.costCenter' | cxTranslate }}\n                    </div>\n                    <a\n                      *ngIf=\"order.costCenter?.name\"\n                      [routerLink]=\"\n                        {\n                          cxRoute: 'orderDetails',\n                          params: order\n                        } | cxUrl\n                      \"\n                      class=\"cx-order-history-value\"\n                    >\n                      {{ order.costCenter?.name }}</a\n                    >\n                  </td>\n                </ng-container>\n\n                <td role=\"cell\" class=\"cx-order-history-placed\">\n                  <div class=\"cx-order-history-label\">\n                    {{ 'orderHistory.date' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'orderDetails',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-order-history-value\"\n                    >{{ order?.placed | cxDate: 'longDate' }}</a\n                  >\n                </td>\n                <td role=\"cell\" class=\"cx-order-history-status\">\n                  <div class=\"cx-order-history-label\">\n                    {{ 'orderHistory.status' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'orderDetails',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-order-history-value\"\n                  >\n                    {{\n                      'orderDetails.statusDisplay_' + order?.statusDisplay\n                        | cxTranslate\n                    }}</a\n                  >\n                </td>\n                <td role=\"cell\" class=\"cx-order-history-total\">\n                  <div class=\"cx-order-history-label\">\n                    {{ 'orderHistory.total' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'orderDetails',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-order-history-value\"\n                  >\n                    {{ order?.total.formattedValue }}</a\n                  >\n                </td>\n              </tr>\n            </tbody>\n          </table>\n\n          <!-- Select Form and Pagination Bottom -->\n          <div class=\"cx-order-history-sort bottom\">\n            <div\n              *ngIf=\"type.orderHistory.pagination.totalPages > 1\"\n              class=\"cx-order-history-pagination\"\n            >\n              <cx-pagination\n                [pagination]=\"type.orderHistory.pagination\"\n                (viewPageEvent)=\"pageChange($event)\"\n              ></cx-pagination>\n            </div>\n          </div>\n        </ng-container>\n\n        <!-- NO ORDER CONTAINER -->\n        <ng-template #noOrder>\n          <div\n            *ngIf=\"isLoaded$ | async\"\n            [ngClass]=\"\n              type.replenishmentOrder\n                ? 'cx-replenishment-details-order-history-no-order'\n                : 'cx-order-history-no-order'\n            \"\n          >\n            <div>\n              <ng-container *ngIf=\"type.replenishmentOrder; else otherOrder\">\n                <div>{{ 'orderHistory.notFound' | cxTranslate }}</div>\n              </ng-container>\n\n              <ng-template #otherOrder>\n                <div>{{ 'orderHistory.noOrders' | cxTranslate }}</div>\n                <a\n                  [routerLink]=\"{ cxRoute: 'home' } | cxUrl\"\n                  routerLinkActive=\"active\"\n                  class=\"btn btn-primary btn-block\"\n                  >{{ 'orderHistory.startShopping' | cxTranslate }}</a\n                >\n              </ng-template>\n            </div>\n          </div>\n        </ng-template>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i2$2.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "component", type: i3.SortingComponent, selector: "cx-sorting", inputs: ["sortOptions", "ariaControls", "ariaLabel", "selectedOption", "placeholder", "sortLabels"], outputs: ["sortListEvent"] }, { kind: "component", type: i3.PaginationComponent, selector: "cx-pagination", inputs: ["pageRoute", "queryParam", "defaultPage", "pagination"], outputs: ["viewPageEvent"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.CxDatePipe, name: "cxDate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderHistoryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-history', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container\n  *ngIf=\"{\n    orderHistory: orders$ | async,\n    replenishmentOrder: hasReplenishmentOrder$ | async\n  } as type\"\n>\n  <ng-container *ngIf=\"type.orderHistory\">\n    <div>\n      <!-- HEADER -->\n      <div\n        [ngClass]=\"\n          type.replenishmentOrder\n            ? 'cx-replenishment-details-order-history-header'\n            : 'cx-order-history-header'\n        \"\n      >\n        <h4 *ngIf=\"type.replenishmentOrder\">\n          {{ 'orderHistory.replenishmentHistory' | cxTranslate }}\n        </h4>\n        <h2 *ngIf=\"!type.replenishmentOrder\">\n          {{ 'orderHistory.orderHistory' | cxTranslate }}\n        </h2>\n      </div>\n\n      <!-- BODY -->\n      <div class=\"cx-order-history-body\">\n        <ng-container\n          *ngIf=\"type.orderHistory.pagination.totalResults > 0; else noOrder\"\n        >\n          <!-- Select Form and Pagination Top -->\n          <div class=\"cx-order-history-sort top\">\n            <label class=\"cx-order-history-form-group form-group\"\n              ><span>\n                {{ 'orderHistory.sortBy' | cxTranslate }}\n              </span>\n              <cx-sorting\n                [sortOptions]=\"type.orderHistory.sorts\"\n                [sortLabels]=\"getSortLabels() | async\"\n                (sortListEvent)=\"changeSortCode($event)\"\n                [selectedOption]=\"type.orderHistory.pagination.sort\"\n                placeholder=\"{{ 'orderHistory.sortBy' | cxTranslate }}\"\n                [ariaLabel]=\"'orderHistory.sortOrders' | cxTranslate\"\n                ariaControls=\"order-history-table\"\n              ></cx-sorting>\n            </label>\n            <div\n              *ngIf=\"type.orderHistory.pagination.totalPages > 1\"\n              class=\"cx-order-history-pagination\"\n            >\n              <cx-pagination\n                [pagination]=\"type.orderHistory.pagination\"\n                (viewPageEvent)=\"pageChange($event)\"\n              ></cx-pagination>\n            </div>\n          </div>\n\n          <table\n            role=\"table\"\n            id=\"order-history-table\"\n            class=\"table cx-order-history-table\"\n            [ngClass]=\"{ 'cx-order-history-table-po': hasPONumber }\"\n          >\n            <caption class=\"cx-visually-hidden\">\n              {{\n                'orderHistory.orderHistory' | cxTranslate\n              }}\n            </caption>\n            <thead class=\"cx-order-history-thead-mobile\">\n              <tr role=\"row\">\n                <th role=\"columnheader\">\n                  {{ 'orderHistory.orderId' | cxTranslate }}\n                </th>\n                <ng-container *ngIf=\"hasPONumber\">\n                  <th role=\"columnheader\">\n                    {{ 'orderHistory.PONumber' | cxTranslate }}\n                  </th>\n                  <th role=\"columnheader\">\n                    {{ 'orderHistory.costCenter' | cxTranslate }}\n                  </th>\n                </ng-container>\n                <th role=\"columnheader\">\n                  {{ 'orderHistory.date' | cxTranslate }}\n                </th>\n                <th role=\"columnheader\">\n                  {{ 'orderHistory.status' | cxTranslate }}\n                </th>\n                <th role=\"columnheader\">\n                  {{ 'orderHistory.total' | cxTranslate }}\n                </th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr\n                role=\"row\"\n                *ngFor=\"let order of type.orderHistory.orders\"\n                (click)=\"goToOrderDetail(order)\"\n              >\n                <td role=\"cell\" class=\"cx-order-history-code\">\n                  <div class=\"cx-order-history-label\">\n                    {{ 'orderHistory.orderId' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'orderDetails',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-order-history-value\"\n                  >\n                    {{ order?.code }}</a\n                  >\n                </td>\n                <ng-container *ngIf=\"hasPONumber\">\n                  <td role=\"cell\" class=\"cx-order-history-po\">\n                    <div class=\"cx-order-history-label\">\n                      {{ 'orderHistory.PONumber' | cxTranslate }}\n                    </div>\n                    <a\n                      *ngIf=\"order.purchaseOrderNumber\"\n                      [routerLink]=\"\n                        {\n                          cxRoute: 'orderDetails',\n                          params: order\n                        } | cxUrl\n                      \"\n                      class=\"cx-order-history-value\"\n                    >\n                      {{ order.purchaseOrderNumber }}</a\n                    >\n                  </td>\n                  <td role=\"cell\" class=\"cx-order-history-cost-center\">\n                    <div class=\"cx-order-history-label\">\n                      {{ 'orderHistory.costCenter' | cxTranslate }}\n                    </div>\n                    <a\n                      *ngIf=\"order.costCenter?.name\"\n                      [routerLink]=\"\n                        {\n                          cxRoute: 'orderDetails',\n                          params: order\n                        } | cxUrl\n                      \"\n                      class=\"cx-order-history-value\"\n                    >\n                      {{ order.costCenter?.name }}</a\n                    >\n                  </td>\n                </ng-container>\n\n                <td role=\"cell\" class=\"cx-order-history-placed\">\n                  <div class=\"cx-order-history-label\">\n                    {{ 'orderHistory.date' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'orderDetails',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-order-history-value\"\n                    >{{ order?.placed | cxDate: 'longDate' }}</a\n                  >\n                </td>\n                <td role=\"cell\" class=\"cx-order-history-status\">\n                  <div class=\"cx-order-history-label\">\n                    {{ 'orderHistory.status' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'orderDetails',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-order-history-value\"\n                  >\n                    {{\n                      'orderDetails.statusDisplay_' + order?.statusDisplay\n                        | cxTranslate\n                    }}</a\n                  >\n                </td>\n                <td role=\"cell\" class=\"cx-order-history-total\">\n                  <div class=\"cx-order-history-label\">\n                    {{ 'orderHistory.total' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'orderDetails',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-order-history-value\"\n                  >\n                    {{ order?.total.formattedValue }}</a\n                  >\n                </td>\n              </tr>\n            </tbody>\n          </table>\n\n          <!-- Select Form and Pagination Bottom -->\n          <div class=\"cx-order-history-sort bottom\">\n            <div\n              *ngIf=\"type.orderHistory.pagination.totalPages > 1\"\n              class=\"cx-order-history-pagination\"\n            >\n              <cx-pagination\n                [pagination]=\"type.orderHistory.pagination\"\n                (viewPageEvent)=\"pageChange($event)\"\n              ></cx-pagination>\n            </div>\n          </div>\n        </ng-container>\n\n        <!-- NO ORDER CONTAINER -->\n        <ng-template #noOrder>\n          <div\n            *ngIf=\"isLoaded$ | async\"\n            [ngClass]=\"\n              type.replenishmentOrder\n                ? 'cx-replenishment-details-order-history-no-order'\n                : 'cx-order-history-no-order'\n            \"\n          >\n            <div>\n              <ng-container *ngIf=\"type.replenishmentOrder; else otherOrder\">\n                <div>{{ 'orderHistory.notFound' | cxTranslate }}</div>\n              </ng-container>\n\n              <ng-template #otherOrder>\n                <div>{{ 'orderHistory.noOrders' | cxTranslate }}</div>\n                <a\n                  [routerLink]=\"{ cxRoute: 'home' } | cxUrl\"\n                  routerLinkActive=\"active\"\n                  class=\"btn btn-primary btn-block\"\n                  >{{ 'orderHistory.startShopping' | cxTranslate }}</a\n                >\n              </ng-template>\n            </div>\n          </div>\n        </ng-template>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i2.RoutingService }, { type: i1.OrderHistoryFacade }, { type: i2.TranslationService }, { type: i1.ReplenishmentOrderHistoryFacade }]; } });

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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var OrderCriticalStatus;
(function (OrderCriticalStatus) {
    OrderCriticalStatus["CANCELLED"] = "CANCELLED";
    OrderCriticalStatus["ERROR"] = "ERROR";
    OrderCriticalStatus["REJECTED"] = "REJECTED";
})(OrderCriticalStatus || (OrderCriticalStatus = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MyAccountV2ConsignmentEntriesComponent {
    getConsignmentNumber(code) {
        if (code) {
            const consignmentNumber = Number(code.split('_')[1]);
            if (!isNaN(consignmentNumber)) {
                return (consignmentNumber + 1).toString();
            }
        }
        return code;
    }
}
MyAccountV2ConsignmentEntriesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2ConsignmentEntriesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MyAccountV2ConsignmentEntriesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: MyAccountV2ConsignmentEntriesComponent, selector: "cx-my-account-v2-consignment-entries", inputs: { consignments: "consignments", orderCode: "orderCode" }, ngImport: i0, template: "<ng-container *ngFor=\"let consignment of consignments; index as i\">\n  <!--\nexample:\nConsignment 1 | In Process | Last Updated: 13, September, 2023\nConsignment 2 | Tracking Number: 5657474 | Estimated Delivery: 22, September, 2023\n  -->\n  <div\n    class=\"cx-consignment-info\"\n    [attr.aria-label]=\"\n      'myAccountV2OrderHistory.consignmentDetailLabel' | cxTranslate\n    \"\n    *ngIf=\"consignment\"\n  >\n    <span\n      [attr.aria-label]=\"\n        'myAccountV2OrderHistory.consignmentNumberLabel' | cxTranslate\n      \"\n    >\n      {{\n        'myAccountV2OrderHistory.consignmentCode'\n          | cxTranslate: { param: i + 1 }\n      }}\n    </span>\n    |\n    <ng-container *ngIf=\"consignment.trackingID; else showLastUpdated\">\n      <ng-container *ngIf=\"consignment.consignmentTracking as tracking\">\n        <span\n          [attr.aria-label]=\"\n            'orderDetails.consignmentTracking.dialog.trackingId' | cxTranslate\n          \"\n        >\n          {{\n            'orderDetails.consignmentTracking.dialog.trackingId' | cxTranslate\n          }}:\n          <ng-container *ngIf=\"tracking.trackingUrl; else showNumber\">\n            <a\n              class=\"cx-tracking-id\"\n              target=\"_blank\"\n              rel=\"noopener noreferrer\"\n              [href]=\"tracking.trackingUrl\"\n              >{{ tracking.trackingID }}</a\n            >\n          </ng-container>\n          |\n        </span>\n        <span\n          [attr.aria-label]=\"\n            'myAccountV2OrderHistory.estimateDeliveryLabel' | cxTranslate\n          \"\n        >\n          {{\n            'orderDetails.consignmentTracking.dialog.estimate' | cxTranslate\n          }}:\n          {{ tracking.targetArrivalDate | cxDate: 'd, MMMM, yyyy' }}\n        </span>\n        <ng-template #showNumber>\n          {{ tracking.trackingID }}\n        </ng-template>\n      </ng-container>\n    </ng-container>\n    <ng-template #showLastUpdated>\n      <span\n        [attr.aria-label]=\"\n          'myAccountV2OrderHistory.consignmentStatusLabel' | cxTranslate\n        \"\n        *ngIf=\"consignment.status\"\n      >\n        {{\n          'orderDetails.deliveryStatus_' + consignment?.status?.toUpperCase()\n            | cxTranslate\n        }}\n      </span>\n      <span\n        *ngIf=\"consignment.statusDate\"\n        [attr.aria-label]=\"\n          'myAccountV2OrderHistory.consignmentStatusDateLabel' | cxTranslate\n        \"\n      >\n        |\n        {{\n          'myAccountV2OrderHistory.statusDate'\n            | cxTranslate\n              : { param: consignment.statusDate | cxDate: 'd, MMMM, yyyy' }\n        }}\n      </span>\n    </ng-template>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.CxDatePipe, name: "cxDate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2ConsignmentEntriesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-my-account-v2-consignment-entries', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngFor=\"let consignment of consignments; index as i\">\n  <!--\nexample:\nConsignment 1 | In Process | Last Updated: 13, September, 2023\nConsignment 2 | Tracking Number: 5657474 | Estimated Delivery: 22, September, 2023\n  -->\n  <div\n    class=\"cx-consignment-info\"\n    [attr.aria-label]=\"\n      'myAccountV2OrderHistory.consignmentDetailLabel' | cxTranslate\n    \"\n    *ngIf=\"consignment\"\n  >\n    <span\n      [attr.aria-label]=\"\n        'myAccountV2OrderHistory.consignmentNumberLabel' | cxTranslate\n      \"\n    >\n      {{\n        'myAccountV2OrderHistory.consignmentCode'\n          | cxTranslate: { param: i + 1 }\n      }}\n    </span>\n    |\n    <ng-container *ngIf=\"consignment.trackingID; else showLastUpdated\">\n      <ng-container *ngIf=\"consignment.consignmentTracking as tracking\">\n        <span\n          [attr.aria-label]=\"\n            'orderDetails.consignmentTracking.dialog.trackingId' | cxTranslate\n          \"\n        >\n          {{\n            'orderDetails.consignmentTracking.dialog.trackingId' | cxTranslate\n          }}:\n          <ng-container *ngIf=\"tracking.trackingUrl; else showNumber\">\n            <a\n              class=\"cx-tracking-id\"\n              target=\"_blank\"\n              rel=\"noopener noreferrer\"\n              [href]=\"tracking.trackingUrl\"\n              >{{ tracking.trackingID }}</a\n            >\n          </ng-container>\n          |\n        </span>\n        <span\n          [attr.aria-label]=\"\n            'myAccountV2OrderHistory.estimateDeliveryLabel' | cxTranslate\n          \"\n        >\n          {{\n            'orderDetails.consignmentTracking.dialog.estimate' | cxTranslate\n          }}:\n          {{ tracking.targetArrivalDate | cxDate: 'd, MMMM, yyyy' }}\n        </span>\n        <ng-template #showNumber>\n          {{ tracking.trackingID }}\n        </ng-template>\n      </ng-container>\n    </ng-container>\n    <ng-template #showLastUpdated>\n      <span\n        [attr.aria-label]=\"\n          'myAccountV2OrderHistory.consignmentStatusLabel' | cxTranslate\n        \"\n        *ngIf=\"consignment.status\"\n      >\n        {{\n          'orderDetails.deliveryStatus_' + consignment?.status?.toUpperCase()\n            | cxTranslate\n        }}\n      </span>\n      <span\n        *ngIf=\"consignment.statusDate\"\n        [attr.aria-label]=\"\n          'myAccountV2OrderHistory.consignmentStatusDateLabel' | cxTranslate\n        \"\n      >\n        |\n        {{\n          'myAccountV2OrderHistory.statusDate'\n            | cxTranslate\n              : { param: consignment.statusDate | cxDate: 'd, MMMM, yyyy' }\n        }}\n      </span>\n    </ng-template>\n  </div>\n</ng-container>\n" }]
        }], propDecorators: { consignments: [{
                type: Input
            }], orderCode: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MyAccountV2OrderConsolidatedInformationComponent {
    constructor() {
        this.orderConsignmentsService = inject(MyAccountV2OrderConsignmentsService);
        this.criticalStatuses = Object.values(OrderCriticalStatus);
        this.IMAGE_COUNT = 4; //showing fixed no.of images, without using carousel
    }
    getConsignmentsCount(consignments) {
        let count = 0;
        if (consignments) {
            for (const consignment of consignments) {
                if (consignment.entries) {
                    count = count + consignment.entries.length;
                }
            }
        }
        return count;
    }
    getOrderEntriesCount(orderEntries) {
        return orderEntries?.length ?? 0;
    }
    isStatusCritical(status) {
        return this.criticalStatuses.includes(status.toUpperCase());
    }
    getPickupConsignments(consignments) {
        const orderDetail = {};
        orderDetail.consignments = consignments;
        return (this.orderConsignmentsService.getGroupedConsignments(orderDetail, true) ??
            []);
    }
    getDeliveryConsignments(consignments) {
        const orderDetail = {};
        orderDetail.consignments = consignments;
        return (this.orderConsignmentsService.getGroupedConsignments(orderDetail, false) ?? []);
    }
    getDeliveryUnconsignedEntries(unconsignedEntries) {
        const orderDetail = {};
        orderDetail.unconsignedEntries = unconsignedEntries;
        return (this.orderConsignmentsService.getUnconsignedEntries(orderDetail, false) ??
            []);
    }
    getPickupUnconsignedEntries(unconsignedEntries) {
        const orderDetail = {};
        orderDetail.unconsignedEntries = unconsignedEntries;
        return (this.orderConsignmentsService.getUnconsignedEntries(orderDetail, true) ??
            []);
    }
    getProductImages(entries) {
        const images = [];
        let index = 0;
        for (const item of entries) {
            if (item.product?.images) {
                if (index >= this.IMAGE_COUNT) {
                    break;
                }
                index++;
                images.push(item.product?.images);
            }
        }
        return images;
    }
}
MyAccountV2OrderConsolidatedInformationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrderConsolidatedInformationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MyAccountV2OrderConsolidatedInformationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: MyAccountV2OrderConsolidatedInformationComponent, selector: "cx-my-account-v2-order-consolidated-information", inputs: { order: "order" }, ngImport: i0, template: "<div class=\"cx-consolidated-order-info\" *ngIf=\"order\">\n  <div class=\"cx-order-info\">\n    <!-- pickup consigned entries \n  eg: To Be Picked Up - 3 Items\n  -->\n    <div\n      *ngIf=\"\n        getConsignmentsCount(getPickupConsignments(order.consignments ?? [])) >\n        0\n      \"\n    >\n      <div class=\"cx-order-status\">\n        {{\n          'myAccountV2OrderHistory.deliveryPointOfServiceDetails.itemsToBePickUp'\n            | cxTranslate\n        }}\n        <ng-container\n          *ngTemplateOutlet=\"\n            showManyItems;\n            context: {\n              count: getConsignmentsCount(\n                getPickupConsignments(order.consignments ?? [])\n              )\n            }\n          \"\n        ></ng-container>\n      </div>\n      <cx-my-account-v2-consignment-entries\n        [orderCode]=\"order.code ?? ''\"\n        [consignments]=\"getPickupConsignments(order.consignments ?? [])\"\n      ></cx-my-account-v2-consignment-entries>\n    </div>\n\n    <!-- delivery consigned entries\n  eg: To Be Shipped - 6 Items\n  -->\n    <div\n      *ngIf=\"\n        getConsignmentsCount(\n          getDeliveryConsignments(order.consignments ?? [])\n        ) > 0\n      \"\n    >\n      <!--heading taken from feature-libs/order/components/order-confirmation/order-confirmation-shipping/order-confirmation-shipping.component.html-->\n      <!--instead of [cxOutlet]=\"OrderOutlets.CONSIGNMENT_DELIVERY_INFO\"-->\n      <div class=\"cx-order-status\">\n        {{\n          'myAccountV2OrderHistory.checkoutMode.deliveryEntries' | cxTranslate\n        }}\n        <ng-container\n          *ngTemplateOutlet=\"\n            showManyItems;\n            context: {\n              count: getConsignmentsCount(\n                getDeliveryConsignments(order.consignments ?? [])\n              )\n            }\n          \"\n        ></ng-container>\n      </div>\n      <cx-my-account-v2-consignment-entries\n        [orderCode]=\"order.code ?? ''\"\n        [consignments]=\"getDeliveryConsignments(order.consignments ?? [])\"\n      ></cx-my-account-v2-consignment-entries>\n    </div>\n\n    <!-- unconsigned entries \n  eg: Some_Status - 1 Item\n  -->\n    <div *ngIf=\"getOrderEntriesCount(order.unconsignedEntries) > 0\">\n      <div *ngIf=\"order.statusDisplay\">\n        <div\n          class=\"cx-order-status-critical\"\n          *ngIf=\"isStatusCritical(order.statusDisplay); else nonCritical\"\n        >\n          {{\n            'orderDetails.statusDisplay_' + order.statusDisplay | cxTranslate\n          }}\n          -\n          <ng-container\n            *ngTemplateOutlet=\"\n              showManyItems;\n              context: { count: getOrderEntriesCount(order.unconsignedEntries) }\n            \"\n          ></ng-container>\n        </div>\n        <ng-template #nonCritical>\n          <div class=\"cx-order-status\">\n            {{\n              'orderDetails.statusDisplay_' + order.statusDisplay | cxTranslate\n            }}\n            -\n            <ng-container\n              *ngTemplateOutlet=\"\n                showManyItems;\n                context: {\n                  count: getOrderEntriesCount(order.unconsignedEntries)\n                }\n              \"\n            ></ng-container>\n          </div>\n        </ng-template>\n      </div>\n\n      <!-- delivery unconsigned entries \n      eg: To Be Shipped - 6 Items //showing this is in extra information format\n    -->\n      <div\n        class=\"cx-consignment-info\"\n        *ngIf=\"\n          getOrderEntriesCount(\n            getDeliveryUnconsignedEntries(order.unconsignedEntries ?? [])\n          ) > 0\n        \"\n      >\n        {{\n          'myAccountV2OrderHistory.checkoutMode.deliveryEntries' | cxTranslate\n        }}\n        <ng-container\n          *ngTemplateOutlet=\"\n            showManyItems;\n            context: {\n              count: getOrderEntriesCount(\n                getDeliveryUnconsignedEntries(order.unconsignedEntries ?? [])\n              )\n            }\n          \"\n        ></ng-container>\n      </div>\n\n      <!-- pickup unconsigned entries, b2b does not have pickup items\n      eg: To Be Picked Up - 7 Items //showing this is as an extra information format\n    -->\n      <div\n        class=\"cx-consignment-info\"\n        *ngIf=\"\n          getOrderEntriesCount(\n            getPickupUnconsignedEntries(order.unconsignedEntries ?? [])\n          ) > 0\n        \"\n      >\n        {{\n          'myAccountV2OrderHistory.checkoutPickupInStore.heading' | cxTranslate\n        }}\n        <ng-container\n          *ngTemplateOutlet=\"\n            showManyItems;\n            context: {\n              count: getOrderEntriesCount(\n                getPickupUnconsignedEntries(order.unconsignedEntries ?? [])\n              )\n            }\n          \"\n        ></ng-container>\n      </div>\n    </div>\n\n    <!--return request details\n  eg: Returned: 2 Items\n      Return Processed: 15, September, 2022\n  -->\n    <div *ngFor=\"let returnRequest of order.returnRequests\">\n      <div class=\"cx-order-status-critical\">\n        {{ 'returnRequestList.returnRequestId' | cxTranslate }}\n        <a\n          *ngIf=\"returnRequest.rma; else showReturnCode\"\n          [routerLink]=\"\n            {\n              cxRoute: 'returnRequestDetails',\n              params: returnRequest\n            } | cxUrl\n          \"\n          class=\"cx-order-status-critical-link\"\n        >\n          {{ returnRequest.rma }}</a\n        >\n      </div>\n      <ng-template #showReturnCode>\n        {{ returnRequest.code }}\n      </ng-template>\n      <div\n        class=\"cx-consignment-info\"\n        *ngIf=\"returnRequest.creationTime as creationTime\"\n      >\n        {{\n          'myAccountV2OrderHistory.returnProcessed'\n            | cxTranslate: { param: creationTime | cxDate: 'd, MMMM, yyyy' }\n        }}\n      </div>\n    </div>\n  </div>\n  <div class=\"cx-order-images-container\">\n    <ng-container *ngIf=\"order.entries\">\n      <ng-container *ngFor=\"let item of getProductImages(order.entries)\">\n        <cx-media\n          [container]=\"item.PRIMARY\"\n          class=\"cx-order-img\"\n          format=\"thumbnail\"\n          role=\"presentation\"\n        ></cx-media>\n      </ng-container>\n    </ng-container>\n  </div>\n</div>\n\n<ng-template #showManyItems let-count=\"count\">\n  <ng-container *ngIf=\"count > 1; else showOneItem\">\n    {{ 'myAccountV2OrderHistory.items' | cxTranslate: { param: count } }}\n  </ng-container>\n</ng-template>\n<ng-template #showOneItem>\n  {{ 'myAccountV2OrderHistory.item' | cxTranslate: { param: 1 } }}\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2$2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i3.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "component", type: MyAccountV2ConsignmentEntriesComponent, selector: "cx-my-account-v2-consignment-entries", inputs: ["consignments", "orderCode"] }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.CxDatePipe, name: "cxDate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrderConsolidatedInformationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-my-account-v2-order-consolidated-information', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-consolidated-order-info\" *ngIf=\"order\">\n  <div class=\"cx-order-info\">\n    <!-- pickup consigned entries \n  eg: To Be Picked Up - 3 Items\n  -->\n    <div\n      *ngIf=\"\n        getConsignmentsCount(getPickupConsignments(order.consignments ?? [])) >\n        0\n      \"\n    >\n      <div class=\"cx-order-status\">\n        {{\n          'myAccountV2OrderHistory.deliveryPointOfServiceDetails.itemsToBePickUp'\n            | cxTranslate\n        }}\n        <ng-container\n          *ngTemplateOutlet=\"\n            showManyItems;\n            context: {\n              count: getConsignmentsCount(\n                getPickupConsignments(order.consignments ?? [])\n              )\n            }\n          \"\n        ></ng-container>\n      </div>\n      <cx-my-account-v2-consignment-entries\n        [orderCode]=\"order.code ?? ''\"\n        [consignments]=\"getPickupConsignments(order.consignments ?? [])\"\n      ></cx-my-account-v2-consignment-entries>\n    </div>\n\n    <!-- delivery consigned entries\n  eg: To Be Shipped - 6 Items\n  -->\n    <div\n      *ngIf=\"\n        getConsignmentsCount(\n          getDeliveryConsignments(order.consignments ?? [])\n        ) > 0\n      \"\n    >\n      <!--heading taken from feature-libs/order/components/order-confirmation/order-confirmation-shipping/order-confirmation-shipping.component.html-->\n      <!--instead of [cxOutlet]=\"OrderOutlets.CONSIGNMENT_DELIVERY_INFO\"-->\n      <div class=\"cx-order-status\">\n        {{\n          'myAccountV2OrderHistory.checkoutMode.deliveryEntries' | cxTranslate\n        }}\n        <ng-container\n          *ngTemplateOutlet=\"\n            showManyItems;\n            context: {\n              count: getConsignmentsCount(\n                getDeliveryConsignments(order.consignments ?? [])\n              )\n            }\n          \"\n        ></ng-container>\n      </div>\n      <cx-my-account-v2-consignment-entries\n        [orderCode]=\"order.code ?? ''\"\n        [consignments]=\"getDeliveryConsignments(order.consignments ?? [])\"\n      ></cx-my-account-v2-consignment-entries>\n    </div>\n\n    <!-- unconsigned entries \n  eg: Some_Status - 1 Item\n  -->\n    <div *ngIf=\"getOrderEntriesCount(order.unconsignedEntries) > 0\">\n      <div *ngIf=\"order.statusDisplay\">\n        <div\n          class=\"cx-order-status-critical\"\n          *ngIf=\"isStatusCritical(order.statusDisplay); else nonCritical\"\n        >\n          {{\n            'orderDetails.statusDisplay_' + order.statusDisplay | cxTranslate\n          }}\n          -\n          <ng-container\n            *ngTemplateOutlet=\"\n              showManyItems;\n              context: { count: getOrderEntriesCount(order.unconsignedEntries) }\n            \"\n          ></ng-container>\n        </div>\n        <ng-template #nonCritical>\n          <div class=\"cx-order-status\">\n            {{\n              'orderDetails.statusDisplay_' + order.statusDisplay | cxTranslate\n            }}\n            -\n            <ng-container\n              *ngTemplateOutlet=\"\n                showManyItems;\n                context: {\n                  count: getOrderEntriesCount(order.unconsignedEntries)\n                }\n              \"\n            ></ng-container>\n          </div>\n        </ng-template>\n      </div>\n\n      <!-- delivery unconsigned entries \n      eg: To Be Shipped - 6 Items //showing this is in extra information format\n    -->\n      <div\n        class=\"cx-consignment-info\"\n        *ngIf=\"\n          getOrderEntriesCount(\n            getDeliveryUnconsignedEntries(order.unconsignedEntries ?? [])\n          ) > 0\n        \"\n      >\n        {{\n          'myAccountV2OrderHistory.checkoutMode.deliveryEntries' | cxTranslate\n        }}\n        <ng-container\n          *ngTemplateOutlet=\"\n            showManyItems;\n            context: {\n              count: getOrderEntriesCount(\n                getDeliveryUnconsignedEntries(order.unconsignedEntries ?? [])\n              )\n            }\n          \"\n        ></ng-container>\n      </div>\n\n      <!-- pickup unconsigned entries, b2b does not have pickup items\n      eg: To Be Picked Up - 7 Items //showing this is as an extra information format\n    -->\n      <div\n        class=\"cx-consignment-info\"\n        *ngIf=\"\n          getOrderEntriesCount(\n            getPickupUnconsignedEntries(order.unconsignedEntries ?? [])\n          ) > 0\n        \"\n      >\n        {{\n          'myAccountV2OrderHistory.checkoutPickupInStore.heading' | cxTranslate\n        }}\n        <ng-container\n          *ngTemplateOutlet=\"\n            showManyItems;\n            context: {\n              count: getOrderEntriesCount(\n                getPickupUnconsignedEntries(order.unconsignedEntries ?? [])\n              )\n            }\n          \"\n        ></ng-container>\n      </div>\n    </div>\n\n    <!--return request details\n  eg: Returned: 2 Items\n      Return Processed: 15, September, 2022\n  -->\n    <div *ngFor=\"let returnRequest of order.returnRequests\">\n      <div class=\"cx-order-status-critical\">\n        {{ 'returnRequestList.returnRequestId' | cxTranslate }}\n        <a\n          *ngIf=\"returnRequest.rma; else showReturnCode\"\n          [routerLink]=\"\n            {\n              cxRoute: 'returnRequestDetails',\n              params: returnRequest\n            } | cxUrl\n          \"\n          class=\"cx-order-status-critical-link\"\n        >\n          {{ returnRequest.rma }}</a\n        >\n      </div>\n      <ng-template #showReturnCode>\n        {{ returnRequest.code }}\n      </ng-template>\n      <div\n        class=\"cx-consignment-info\"\n        *ngIf=\"returnRequest.creationTime as creationTime\"\n      >\n        {{\n          'myAccountV2OrderHistory.returnProcessed'\n            | cxTranslate: { param: creationTime | cxDate: 'd, MMMM, yyyy' }\n        }}\n      </div>\n    </div>\n  </div>\n  <div class=\"cx-order-images-container\">\n    <ng-container *ngIf=\"order.entries\">\n      <ng-container *ngFor=\"let item of getProductImages(order.entries)\">\n        <cx-media\n          [container]=\"item.PRIMARY\"\n          class=\"cx-order-img\"\n          format=\"thumbnail\"\n          role=\"presentation\"\n        ></cx-media>\n      </ng-container>\n    </ng-container>\n  </div>\n</div>\n\n<ng-template #showManyItems let-count=\"count\">\n  <ng-container *ngIf=\"count > 1; else showOneItem\">\n    {{ 'myAccountV2OrderHistory.items' | cxTranslate: { param: count } }}\n  </ng-container>\n</ng-template>\n<ng-template #showOneItem>\n  {{ 'myAccountV2OrderHistory.item' | cxTranslate: { param: 1 } }}\n</ng-template>\n" }]
        }], propDecorators: { order: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MyAccountV2OrderHistoryComponent extends OrderHistoryComponent {
    constructor() {
        super(...arguments);
        this.service = inject(MyAccountV2OrderHistoryService);
        this.ITEMS_PER_PAGE = 5;
        this.isLoaded$ = new BehaviorSubject(false);
        this.orders$ = this.service
            .getOrderHistoryList(this.ITEMS_PER_PAGE)
            .pipe(tap((orders) => {
            this.isLoaded$.next(true);
            super.setOrderHistoryParams(orders);
        }));
    }
    pageChange(page) {
        this.isLoaded$.next(false);
        this.service.clearOrderList();
        super.pageChange(page);
    }
}
MyAccountV2OrderHistoryComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrderHistoryComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
MyAccountV2OrderHistoryComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: MyAccountV2OrderHistoryComponent, selector: "cx-my-account-v2-order-history", usesInheritance: true, ngImport: i0, template: "<div\n  *ngIf=\"orders$ | async as orderHistory; else noOrder\"\n  [attr.aria-label]=\"'myAccountV2OrderHistory.orderListResults' | cxTranslate\"\n>\n  <!-- HEADER -->\n  <div class=\"cx-my-account-v2-order-history-header\">\n    <h2>\n      {{\n        'myAccountV2OrderHistory.heading'\n          | cxTranslate: { param: tabTitleParam$ | async }\n      }}\n    </h2>\n  </div>\n  <!--BODY-->\n  <div class=\"cx-my-account-v2-order-history-body\">\n    <ng-container\n      *ngIf=\"orderHistory.pagination.totalResults > 0; else noOrder\"\n    >\n      <ng-container *ngFor=\"let order of orderHistory.orders\">\n        <div class=\"cx-each-order\">\n          <!--eg: Order # 12345-->\n          <div\n            class=\"cx-my-account-v2-order-history-code\"\n            [attr.aria-label]=\"\n              'myAccountV2OrderHistory.orderCodeLabel' | cxTranslate\n            \"\n            (click)=\"goToOrderDetail(order)\"\n          >\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'orderDetails',\n                  params: order\n                } | cxUrl\n              \"\n            >\n              {{ 'orderHistory.orderId' | cxTranslate }} {{ order?.code }}</a\n            >\n          </div>\n\n          <!--eg: 12,October,2022 | Total Price: $12.00-->\n          <div class=\"cx-my-account-v2-order-summary\">\n            <span\n              [attr.aria-label]=\"\n                'myAccountV2OrderHistory.orderPlaced' | cxTranslate\n              \"\n            >\n              {{ order.placed | cxDate: 'd, MMMM, yyyy' }} |\n            </span>\n            <span\n              [attr.aria-label]=\"\n                'myAccountV2OrderHistory.totalPriceLabel' | cxTranslate\n              \"\n            >\n              <strong>\n                {{\n                  'myAccountV2OrderHistory.totalPrice'\n                    | cxTranslate: { param: order.total?.formattedValue }\n                }}\n              </strong>\n            </span>\n          </div>\n\n          <!--eg: Display consolidated order information-->\n          <cx-my-account-v2-order-consolidated-information [order]=\"order\">\n          </cx-my-account-v2-order-consolidated-information>\n        </div>\n      </ng-container>\n\n      <!-- PAGINATION -->\n      <div\n        *ngIf=\"orderHistory.pagination.totalPages > 1\"\n        class=\"cx-order-history-pagination\"\n        [attr.aria-label]=\"\n          'myAccountV2OrderHistory.orderListPagination' | cxTranslate\n        \"\n      >\n        <cx-pagination\n          [pagination]=\"orderHistory.pagination\"\n          (viewPageEvent)=\"pageChange($event)\"\n        ></cx-pagination>\n      </div>\n    </ng-container>\n  </div>\n</div>\n\n<!-- NO ORDER CONTAINER -->\n<ng-template #noOrder>\n  <div *ngIf=\"isLoaded$ | async; else loading\">\n    <div [attr.aria-label]=\"'orderHistory.notFound' | cxTranslate\">\n      {{ 'orderHistory.noOrders' | cxTranslate }}\n    </div>\n    <a\n      [routerLink]=\"{ cxRoute: 'home' } | cxUrl\"\n      routerLinkActive=\"active\"\n      class=\"cx-no-order\"\n      >{{ 'orderHistory.startShopping' | cxTranslate }}</a\n    >\n  </div>\n</ng-template>\n\n<!-- ORDER HISTORY DATA STILL LOADING -->\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i2$2.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "component", type: i3.PaginationComponent, selector: "cx-pagination", inputs: ["pageRoute", "queryParam", "defaultPage", "pagination"], outputs: ["viewPageEvent"] }, { kind: "component", type: i3.SpinnerComponent, selector: "cx-spinner" }, { kind: "component", type: MyAccountV2OrderConsolidatedInformationComponent, selector: "cx-my-account-v2-order-consolidated-information", inputs: ["order"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.CxDatePipe, name: "cxDate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrderHistoryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-my-account-v2-order-history', template: "<div\n  *ngIf=\"orders$ | async as orderHistory; else noOrder\"\n  [attr.aria-label]=\"'myAccountV2OrderHistory.orderListResults' | cxTranslate\"\n>\n  <!-- HEADER -->\n  <div class=\"cx-my-account-v2-order-history-header\">\n    <h2>\n      {{\n        'myAccountV2OrderHistory.heading'\n          | cxTranslate: { param: tabTitleParam$ | async }\n      }}\n    </h2>\n  </div>\n  <!--BODY-->\n  <div class=\"cx-my-account-v2-order-history-body\">\n    <ng-container\n      *ngIf=\"orderHistory.pagination.totalResults > 0; else noOrder\"\n    >\n      <ng-container *ngFor=\"let order of orderHistory.orders\">\n        <div class=\"cx-each-order\">\n          <!--eg: Order # 12345-->\n          <div\n            class=\"cx-my-account-v2-order-history-code\"\n            [attr.aria-label]=\"\n              'myAccountV2OrderHistory.orderCodeLabel' | cxTranslate\n            \"\n            (click)=\"goToOrderDetail(order)\"\n          >\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'orderDetails',\n                  params: order\n                } | cxUrl\n              \"\n            >\n              {{ 'orderHistory.orderId' | cxTranslate }} {{ order?.code }}</a\n            >\n          </div>\n\n          <!--eg: 12,October,2022 | Total Price: $12.00-->\n          <div class=\"cx-my-account-v2-order-summary\">\n            <span\n              [attr.aria-label]=\"\n                'myAccountV2OrderHistory.orderPlaced' | cxTranslate\n              \"\n            >\n              {{ order.placed | cxDate: 'd, MMMM, yyyy' }} |\n            </span>\n            <span\n              [attr.aria-label]=\"\n                'myAccountV2OrderHistory.totalPriceLabel' | cxTranslate\n              \"\n            >\n              <strong>\n                {{\n                  'myAccountV2OrderHistory.totalPrice'\n                    | cxTranslate: { param: order.total?.formattedValue }\n                }}\n              </strong>\n            </span>\n          </div>\n\n          <!--eg: Display consolidated order information-->\n          <cx-my-account-v2-order-consolidated-information [order]=\"order\">\n          </cx-my-account-v2-order-consolidated-information>\n        </div>\n      </ng-container>\n\n      <!-- PAGINATION -->\n      <div\n        *ngIf=\"orderHistory.pagination.totalPages > 1\"\n        class=\"cx-order-history-pagination\"\n        [attr.aria-label]=\"\n          'myAccountV2OrderHistory.orderListPagination' | cxTranslate\n        \"\n      >\n        <cx-pagination\n          [pagination]=\"orderHistory.pagination\"\n          (viewPageEvent)=\"pageChange($event)\"\n        ></cx-pagination>\n      </div>\n    </ng-container>\n  </div>\n</div>\n\n<!-- NO ORDER CONTAINER -->\n<ng-template #noOrder>\n  <div *ngIf=\"isLoaded$ | async; else loading\">\n    <div [attr.aria-label]=\"'orderHistory.notFound' | cxTranslate\">\n      {{ 'orderHistory.noOrders' | cxTranslate }}\n    </div>\n    <a\n      [routerLink]=\"{ cxRoute: 'home' } | cxUrl\"\n      routerLinkActive=\"active\"\n      class=\"cx-no-order\"\n      >{{ 'orderHistory.startShopping' | cxTranslate }}</a\n    >\n  </div>\n</ng-template>\n\n<!-- ORDER HISTORY DATA STILL LOADING -->\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n" }]
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
const myAccountV2CmsMapping = {
    cmsComponents: {
        AccountOrderHistoryComponent: {
            component: MyAccountV2OrderHistoryComponent,
            //guards: inherited from standard config,
        },
    },
};
const moduleComponents$1 = [
    MyAccountV2OrderHistoryComponent,
    MyAccountV2OrderConsolidatedInformationComponent,
    MyAccountV2ConsignmentEntriesComponent,
];
class OrderHistoryModule {
}
OrderHistoryModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderHistoryModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderHistoryModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderHistoryModule, declarations: [OrderHistoryComponent, MyAccountV2OrderHistoryComponent,
        MyAccountV2OrderConsolidatedInformationComponent,
        MyAccountV2ConsignmentEntriesComponent], imports: [CommonModule,
        RouterModule,
        FormsModule,
        NgSelectModule,
        ListNavigationModule,
        UrlModule,
        I18nModule,
        SpinnerModule,
        MediaModule], exports: [OrderHistoryComponent, MyAccountV2OrderHistoryComponent,
        MyAccountV2OrderConsolidatedInformationComponent,
        MyAccountV2ConsignmentEntriesComponent] });
OrderHistoryModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderHistoryModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                AccountOrderHistoryComponent: {
                    component: OrderHistoryComponent,
                    guards: [AuthGuard],
                },
            },
        }),
        provideDefaultConfigFactory(() => inject(USE_MY_ACCOUNT_V2_ORDER) ? myAccountV2CmsMapping : {}),
    ], imports: [CommonModule,
        RouterModule,
        FormsModule,
        NgSelectModule,
        ListNavigationModule,
        UrlModule,
        I18nModule,
        SpinnerModule,
        MediaModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderHistoryModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        FormsModule,
                        NgSelectModule,
                        ListNavigationModule,
                        UrlModule,
                        I18nModule,
                        SpinnerModule,
                        MediaModule,
                    ],
                    declarations: [OrderHistoryComponent, ...moduleComponents$1],
                    exports: [OrderHistoryComponent, ...moduleComponents$1],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                AccountOrderHistoryComponent: {
                                    component: OrderHistoryComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                        provideDefaultConfigFactory(() => inject(USE_MY_ACCOUNT_V2_ORDER) ? myAccountV2CmsMapping : {}),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderDetailsOrderEntriesContext {
    constructor(orderHistoryFacade) {
        this.orderHistoryFacade = orderHistoryFacade;
        this.type = OrderEntriesSource.ORDER_DETAILS;
    }
    getEntries() {
        return this.orderHistoryFacade
            .getOrderDetails()
            .pipe(map((order) => order?.entries ?? []));
    }
}
OrderDetailsOrderEntriesContext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailsOrderEntriesContext, deps: [{ token: i1.OrderHistoryFacade }], target: i0.ɵɵFactoryTarget.Injectable });
OrderDetailsOrderEntriesContext.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailsOrderEntriesContext, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailsOrderEntriesContext, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.OrderHistoryFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReplenishmentOrderCancellationDialogComponent {
    handleClick(event) {
        // Close on click outside the dialog window
        if (event.target.tagName === this.el.nativeElement.tagName) {
            this.close('Cross click');
        }
    }
    constructor(replenishmentOrderHistoryFacade, globalMessageService, launchDialogService, el) {
        this.replenishmentOrderHistoryFacade = replenishmentOrderHistoryFacade;
        this.globalMessageService = globalMessageService;
        this.launchDialogService = launchDialogService;
        this.el = el;
        this.subscription = new Subscription();
        this.iconTypes = ICON_TYPE;
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: 'button',
            focusOnEscape: true,
        };
    }
    ngOnInit() {
        this.subscription.add(combineLatest([
            this.replenishmentOrderHistoryFacade
                .getReplenishmentOrderDetails()
                .pipe(startWith(null)),
            this.launchDialogService.data$,
        ]).subscribe(([replenishmentOrder, code]) => {
            this.replenishmentOrderCode =
                code || replenishmentOrder?.replenishmentOrderCode;
        }));
        this.subscription.add(this.replenishmentOrderHistoryFacade
            .getCancelReplenishmentOrderSuccess()
            .subscribe((value) => this.onSuccess(value)));
    }
    onSuccess(value) {
        if (value) {
            this.launchDialogService.closeDialog('Successffully cancelled replenishment');
            this.globalMessageService.add({
                key: 'orderDetails.cancelReplenishment.cancelSuccess',
                params: {
                    replenishmentOrderCode: this.replenishmentOrderCode,
                },
            }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        }
        this.replenishmentOrderHistoryFacade.clearCancelReplenishmentOrderProcessState();
    }
    close(reason) {
        this.launchDialogService.closeDialog(reason);
    }
    cancelReplenishment() {
        this.replenishmentOrderHistoryFacade.cancelReplenishmentOrder(this.replenishmentOrderCode);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
ReplenishmentOrderCancellationDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderCancellationDialogComponent, deps: [{ token: i1.ReplenishmentOrderHistoryFacade }, { token: i2.GlobalMessageService }, { token: i3.LaunchDialogService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
ReplenishmentOrderCancellationDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ReplenishmentOrderCancellationDialogComponent, selector: "cx-replenishment-order-cancellation-dialog", host: { listeners: { "click": "handleClick($event)" } }, ngImport: i0, template: "<div\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close('Escape clicked')\"\n  class=\"cx-cancel-replenishment-dialog-foreground\"\n>\n  <div class=\"cx-cancel-replenishment-dialog-content\">\n    <div class=\"cx-cancel-replenishment-dialog-header\">\n      <h3>\n        {{ 'orderDetails.cancelReplenishment.title' | cxTranslate }}\n      </h3>\n      <button\n        type=\"button\"\n        class=\"close\"\n        [attr.aria-label]=\"'common.close' | cxTranslate\"\n        (click)=\"close('Cross click')\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n    <div class=\"cx-cancel-replenishment-dialog-description\">\n      {{ 'orderDetails.cancelReplenishment.description' | cxTranslate }}\n    </div>\n\n    <div class=\"cx-cancel-replenishment-dialog-body\">\n      <div class=\"cx-cancel-replenishment-btns row\">\n        <div class=\"col-md-6\">\n          <button\n            class=\"btn btn-block btn-secondary\"\n            (click)=\"close('Close Replenishment Dialog')\"\n          >\n            {{ 'orderDetails.cancelReplenishment.reject' | cxTranslate }}\n          </button>\n        </div>\n        <div class=\"col-md-6\">\n          <button\n            class=\"btn btn-block btn-primary\"\n            (click)=\"cancelReplenishment()\"\n          >\n            {{ 'orderDetails.cancelReplenishment.accept' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderCancellationDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-replenishment-order-cancellation-dialog', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close('Escape clicked')\"\n  class=\"cx-cancel-replenishment-dialog-foreground\"\n>\n  <div class=\"cx-cancel-replenishment-dialog-content\">\n    <div class=\"cx-cancel-replenishment-dialog-header\">\n      <h3>\n        {{ 'orderDetails.cancelReplenishment.title' | cxTranslate }}\n      </h3>\n      <button\n        type=\"button\"\n        class=\"close\"\n        [attr.aria-label]=\"'common.close' | cxTranslate\"\n        (click)=\"close('Cross click')\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n    <div class=\"cx-cancel-replenishment-dialog-description\">\n      {{ 'orderDetails.cancelReplenishment.description' | cxTranslate }}\n    </div>\n\n    <div class=\"cx-cancel-replenishment-dialog-body\">\n      <div class=\"cx-cancel-replenishment-btns row\">\n        <div class=\"col-md-6\">\n          <button\n            class=\"btn btn-block btn-secondary\"\n            (click)=\"close('Close Replenishment Dialog')\"\n          >\n            {{ 'orderDetails.cancelReplenishment.reject' | cxTranslate }}\n          </button>\n        </div>\n        <div class=\"col-md-6\">\n          <button\n            class=\"btn btn-block btn-primary\"\n            (click)=\"cancelReplenishment()\"\n          >\n            {{ 'orderDetails.cancelReplenishment.accept' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ReplenishmentOrderHistoryFacade }, { type: i2.GlobalMessageService }, { type: i3.LaunchDialogService }, { type: i0.ElementRef }]; }, propDecorators: { handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReplenishmentOrderCancellationDialogModule {
}
ReplenishmentOrderCancellationDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderCancellationDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReplenishmentOrderCancellationDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderCancellationDialogModule, declarations: [ReplenishmentOrderCancellationDialogComponent], imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule], exports: [ReplenishmentOrderCancellationDialogComponent] });
ReplenishmentOrderCancellationDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderCancellationDialogModule, imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderCancellationDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule],
                    declarations: [ReplenishmentOrderCancellationDialogComponent],
                    exports: [ReplenishmentOrderCancellationDialogComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultReplenishmentOrderCancellationLayoutConfig = {
    launch: {
        REPLENISHMENT_ORDER: {
            inline: true,
            component: ReplenishmentOrderCancellationDialogComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReplenishmentOrderCancellationComponent {
    constructor(replenishmentOrderHistoryFacade, vcr, launchDialogService) {
        this.replenishmentOrderHistoryFacade = replenishmentOrderHistoryFacade;
        this.vcr = vcr;
        this.launchDialogService = launchDialogService;
        this.subscription = new Subscription();
        this.replenishmentOrder$ = this.replenishmentOrderHistoryFacade.getReplenishmentOrderDetails();
    }
    openDialog() {
        const dialog = this.launchDialogService.openDialog("REPLENISHMENT_ORDER" /* LAUNCH_CALLER.REPLENISHMENT_ORDER */, this.element, this.vcr);
        if (dialog) {
            this.subscription.add(dialog.pipe(take(1)).subscribe());
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.replenishmentOrderHistoryFacade.clearReplenishmentOrderDetails();
    }
}
ReplenishmentOrderCancellationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderCancellationComponent, deps: [{ token: i1.ReplenishmentOrderHistoryFacade }, { token: i0.ViewContainerRef }, { token: i3.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Component });
ReplenishmentOrderCancellationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ReplenishmentOrderCancellationComponent, selector: "cx-replenishment-order-cancellation", viewQueries: [{ propertyName: "element", first: true, predicate: ["element"], descendants: true }], ngImport: i0, template: "<div class=\"cx-cancel-replenishment-btns row\">\n  <div class=\"col-xs-12 col-md-5 col-lg-4\">\n    <a\n      class=\"btn btn-block btn-secondary\"\n      [routerLink]=\"\n        {\n          cxRoute: 'replenishmentOrders'\n        } | cxUrl\n      \"\n    >\n      {{ 'common.back' | cxTranslate }}\n    </a>\n  </div>\n  <div\n    *ngIf=\"(replenishmentOrder$ | async)?.active\"\n    class=\"col-xs-12 col-md-5 col-lg-4\"\n  >\n    <button #element class=\"btn btn-block btn-secondary\" (click)=\"openDialog()\">\n      {{ 'orderDetails.cancelReplenishment.title' | cxTranslate }}\n    </button>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderCancellationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-replenishment-order-cancellation', template: "<div class=\"cx-cancel-replenishment-btns row\">\n  <div class=\"col-xs-12 col-md-5 col-lg-4\">\n    <a\n      class=\"btn btn-block btn-secondary\"\n      [routerLink]=\"\n        {\n          cxRoute: 'replenishmentOrders'\n        } | cxUrl\n      \"\n    >\n      {{ 'common.back' | cxTranslate }}\n    </a>\n  </div>\n  <div\n    *ngIf=\"(replenishmentOrder$ | async)?.active\"\n    class=\"col-xs-12 col-md-5 col-lg-4\"\n  >\n    <button #element class=\"btn btn-block btn-secondary\" (click)=\"openDialog()\">\n      {{ 'orderDetails.cancelReplenishment.title' | cxTranslate }}\n    </button>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ReplenishmentOrderHistoryFacade }, { type: i0.ViewContainerRef }, { type: i3.LaunchDialogService }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['element']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReplenishmentOrderDetailsService {
    constructor(routingService, replenishmentOrderHistoryFacade) {
        this.routingService = routingService;
        this.replenishmentOrderHistoryFacade = replenishmentOrderHistoryFacade;
        this.replenishmentOrderCode$ = this.routingService.getRouterState().pipe(map((routingData) => routingData.state.params.replenishmentOrderCode), distinctUntilChanged());
        this.replenishmentOrderLoad$ = this.replenishmentOrderCode$.pipe(tap((replenishmentOrderCode) => {
            if (Boolean(replenishmentOrderCode)) {
                this.replenishmentOrderHistoryFacade.loadReplenishmentOrderDetails(replenishmentOrderCode);
            }
            else {
                this.replenishmentOrderHistoryFacade.clearReplenishmentOrderDetails();
            }
        }), shareReplay({ bufferSize: 1, refCount: true }));
    }
    getOrderDetails() {
        return this.replenishmentOrderLoad$.pipe(switchMap((_) => this.replenishmentOrderHistoryFacade.getReplenishmentOrderDetails()));
    }
}
ReplenishmentOrderDetailsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderDetailsService, deps: [{ token: i2.RoutingService }, { token: i1.ReplenishmentOrderHistoryFacade }], target: i0.ɵɵFactoryTarget.Injectable });
ReplenishmentOrderDetailsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderDetailsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderDetailsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.RoutingService }, { type: i1.ReplenishmentOrderHistoryFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const moduleComponents = [ReplenishmentOrderCancellationComponent];
class ReplenishmentOrderDetailsModule {
}
ReplenishmentOrderDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReplenishmentOrderDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderDetailsModule, declarations: [ReplenishmentOrderCancellationComponent], imports: [CardModule,
        CommonModule,
        I18nModule,
        PromotionsModule,
        UrlModule,
        ReplenishmentOrderCancellationDialogModule,
        SpinnerModule,
        ListNavigationModule,
        RouterModule], exports: [ReplenishmentOrderCancellationComponent] });
ReplenishmentOrderDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderDetailsModule, providers: [
        provideDefaultConfig(defaultReplenishmentOrderCancellationLayoutConfig),
        provideDefaultConfig({
            cmsComponents: {
                ReplenishmentDetailItemsComponent: {
                    component: OrderDetailItemsComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: ReplenishmentOrderDetailsService,
                        },
                    ],
                },
                ReplenishmentDetailTotalsComponent: {
                    component: OrderDetailTotalsComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: ReplenishmentOrderDetailsService,
                        },
                    ],
                },
                ReplenishmentDetailShippingComponent: {
                    component: OrderOverviewComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: ReplenishmentOrderDetailsService,
                        },
                    ],
                },
                ReplenishmentDetailActionsComponent: {
                    component: ReplenishmentOrderCancellationComponent,
                },
                ReplenishmentDetailOrderHistoryComponent: {
                    component: OrderHistoryComponent,
                },
            },
        }),
    ], imports: [CardModule,
        CommonModule,
        I18nModule,
        PromotionsModule,
        UrlModule,
        ReplenishmentOrderCancellationDialogModule,
        SpinnerModule,
        ListNavigationModule,
        RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CardModule,
                        CommonModule,
                        I18nModule,
                        PromotionsModule,
                        UrlModule,
                        ReplenishmentOrderCancellationDialogModule,
                        SpinnerModule,
                        ListNavigationModule,
                        RouterModule,
                    ],
                    providers: [
                        provideDefaultConfig(defaultReplenishmentOrderCancellationLayoutConfig),
                        provideDefaultConfig({
                            cmsComponents: {
                                ReplenishmentDetailItemsComponent: {
                                    component: OrderDetailItemsComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: ReplenishmentOrderDetailsService,
                                        },
                                    ],
                                },
                                ReplenishmentDetailTotalsComponent: {
                                    component: OrderDetailTotalsComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: ReplenishmentOrderDetailsService,
                                        },
                                    ],
                                },
                                ReplenishmentDetailShippingComponent: {
                                    component: OrderOverviewComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: ReplenishmentOrderDetailsService,
                                        },
                                    ],
                                },
                                ReplenishmentDetailActionsComponent: {
                                    component: ReplenishmentOrderCancellationComponent,
                                },
                                ReplenishmentDetailOrderHistoryComponent: {
                                    component: OrderHistoryComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [...moduleComponents],
                    exports: [...moduleComponents],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReplenishmentOrderHistoryComponent {
    constructor(routing, replenishmentOrderHistoryFacade, translation, vcr, launchDialogService) {
        this.routing = routing;
        this.replenishmentOrderHistoryFacade = replenishmentOrderHistoryFacade;
        this.translation = translation;
        this.vcr = vcr;
        this.launchDialogService = launchDialogService;
        this.subscription = new Subscription();
        this.PAGE_SIZE = 5;
        this.replenishmentOrders$ = this.replenishmentOrderHistoryFacade
            .getReplenishmentOrderHistoryList(this.PAGE_SIZE)
            .pipe(tap((replenishmentOrders) => {
            if (replenishmentOrders?.pagination?.sort) {
                this.sortType = replenishmentOrders.pagination.sort;
            }
        }));
        this.isLoaded$ = this.replenishmentOrderHistoryFacade.getReplenishmentOrderHistoryListSuccess();
    }
    changeSortCode(sortCode) {
        const event = {
            sortCode,
            currentPage: 0,
        };
        this.sortType = sortCode;
        this.fetchReplenishmentOrders(event);
    }
    pageChange(page) {
        const event = {
            sortCode: this.sortType,
            currentPage: page,
        };
        this.fetchReplenishmentOrders(event);
    }
    goToOrderDetail(order) {
        this.routing.go({
            cxRoute: 'replenishmentDetails',
            params: order,
        });
    }
    getSortLabels() {
        return combineLatest([
            this.translation.translate('sorting.date'),
            this.translation.translate('sorting.replenishmentNumber'),
            this.translation.translate('sorting.nextOrderDate'),
        ]).pipe(map(([textByDate, textByOrderNumber, textbyNextOrderDate]) => {
            return {
                byDate: textByDate,
                byReplenishmentNumber: textByOrderNumber,
                byNextOrderDate: textbyNextOrderDate,
            };
        }));
    }
    openDialog(event, replenishmentOrderCode) {
        const dialog = this.launchDialogService.openDialog("REPLENISHMENT_ORDER" /* LAUNCH_CALLER.REPLENISHMENT_ORDER */, this.element, this.vcr, replenishmentOrderCode);
        if (dialog) {
            this.subscription.add(dialog.pipe(take(1)).subscribe());
        }
        event.stopPropagation();
    }
    fetchReplenishmentOrders(event) {
        this.replenishmentOrderHistoryFacade.loadReplenishmentOrderList(this.PAGE_SIZE, event.currentPage, event.sortCode);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.replenishmentOrderHistoryFacade.clearReplenishmentOrderList();
    }
}
ReplenishmentOrderHistoryComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderHistoryComponent, deps: [{ token: i2.RoutingService }, { token: i1.ReplenishmentOrderHistoryFacade }, { token: i2.TranslationService }, { token: i0.ViewContainerRef }, { token: i3.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Component });
ReplenishmentOrderHistoryComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ReplenishmentOrderHistoryComponent, selector: "cx-replenishment-order-history", viewQueries: [{ propertyName: "element", first: true, predicate: ["element"], descendants: true }], ngImport: i0, template: "<ng-container *ngIf=\"replenishmentOrders$ | async as replenishmentOrders\">\n  <div class=\"container\">\n    <!-- HEADER -->\n    <div class=\"cx-replenishment-order-history-header\">\n      <h3>\n        {{ 'orderHistory.replenishmentOrderHistory' | cxTranslate }}\n      </h3>\n    </div>\n\n    <!-- BODY -->\n    <div class=\"cx-replenishment-order-history-body\">\n      <ng-container\n        *ngIf=\"replenishmentOrders.pagination.totalResults > 0; else noOrder\"\n      >\n        <!-- Select Form and Pagination Top -->\n        <div class=\"cx-replenishment-order-history-sort top row\">\n          <label\n            class=\"\n              cx-replenishment-order-history-form-group\n              form-group\n              col-sm-12 col-md-4 col-lg-4\n            \"\n          >\n            <span>{{ 'orderHistory.sortBy' | cxTranslate }}</span>\n            <cx-sorting\n              [sortOptions]=\"replenishmentOrders.sorts\"\n              [sortLabels]=\"getSortLabels() | async\"\n              (sortListEvent)=\"changeSortCode($event)\"\n              [selectedOption]=\"replenishmentOrders.pagination.sort\"\n              placeholder=\"{{ 'orderHistory.sortBy' | cxTranslate }}\"\n              [ariaLabel]=\"'orderHistory.sortOrders' | cxTranslate\"\n              ariaControls=\"replenishment-order-history-table\"\n            ></cx-sorting>\n          </label>\n          <div\n            class=\"cx-replenishment-order-history-pagination\"\n            *ngIf=\"replenishmentOrders.pagination.totalPages > 1\"\n          >\n            <cx-pagination\n              [pagination]=\"replenishmentOrders.pagination\"\n              (viewPageEvent)=\"pageChange($event)\"\n            ></cx-pagination>\n          </div>\n        </div>\n        <!-- TABLE -->\n        <table\n          id=\"replenishment-order-history-table\"\n          class=\"table cx-replenishment-order-history-table\"\n          role=\"table\"\n        >\n          <caption class=\"cx-visually-hidden\">\n            {{\n              'orderHistory.orderHistory' | cxTranslate\n            }}\n          </caption>\n          <thead class=\"cx-replenishment-order-history-thead-mobile\">\n            <th scope=\"col\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.replenishmentOrderId' | cxTranslate }}\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.purchaseOrderNumber' | cxTranslate }}\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.startOn' | cxTranslate }}\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.frequency' | cxTranslate }}\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.nextOrderDate' | cxTranslate }}\n              </span>\n            </th>\n            <th scope=\"col\" class=\"cx-replenishment-order-history-total\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.total' | cxTranslate }}\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.actions' | cxTranslate }}\n              </span>\n            </th>\n          </thead>\n          <tbody>\n            <tr\n              role=\"row\"\n              *ngFor=\"let order of replenishmentOrders.replenishmentOrders\"\n              (click)=\"goToOrderDetail(order)\"\n            >\n              <td class=\"cx-replenishment-order-history-code\" role=\"cell\">\n                <div class=\"d-md-none cx-replenishment-order-history-label\">\n                  {{ 'orderHistory.replenishmentOrderId' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'replenishmentDetails',\n                      params: order\n                    } | cxUrl\n                  \"\n                  class=\"cx-replenishment-order-history-value\"\n                >\n                  {{ order?.replenishmentOrderCode }}</a\n                >\n              </td>\n              <td role=\"cell\">\n                <div class=\"d-md-none cx-replenishment-order-history-label\">\n                  {{ 'orderHistory.purchaseOrderNumber' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'replenishmentDetails',\n                      params: order\n                    } | cxUrl\n                  \"\n                  class=\"\n                    cx-replenishment-order-history-value\n                    cx-purchase-order-number\n                  \"\n                >\n                  {{\n                    order?.purchaseOrderNumber?.length > 0\n                      ? order?.purchaseOrderNumber\n                      : ('orderHistory.emptyPurchaseOrderId' | cxTranslate)\n                  }}\n                </a>\n              </td>\n              <td role=\"cell\">\n                <div class=\"d-md-none cx-replenishment-order-history-label\">\n                  {{ 'orderHistory.startOn' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'replenishmentDetails',\n                      params: order\n                    } | cxUrl\n                  \"\n                  class=\"cx-replenishment-order-history-value\"\n                >\n                  {{ order?.firstDate | cxDate: 'M/d/yyyy' }}</a\n                >\n              </td>\n              <td class=\"cx-replenishment-order-history-frequency\" role=\"cell\">\n                <div class=\"d-md-none cx-replenishment-order-history-label\">\n                  {{ 'orderHistory.frequency' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'replenishmentDetails',\n                      params: order\n                    } | cxUrl\n                  \"\n                  class=\"cx-replenishment-order-history-value\"\n                >\n                  {{ order?.trigger.displayTimeTable | slice: 0:-12 }}\n                </a>\n              </td>\n              <td role=\"cell\">\n                <div class=\"d-md-none cx-replenishment-order-history-label\">\n                  {{ 'orderHistory.nextOrderDate' | cxTranslate }}\n                </div>\n\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'replenishmentDetails',\n                      params: order\n                    } | cxUrl\n                  \"\n                  class=\"\n                    cx-replenishment-order-history-value cx-next-order-date\n                  \"\n                >\n                  {{\n                    order?.active\n                      ? (order?.trigger.activationTime | cxDate: 'M/d/yyyy')\n                      : ('orderHistory.cancelled' | cxTranslate)\n                  }}\n                </a>\n              </td>\n              <td class=\"cx-replenishment-order-history-total\">\n                <div class=\"d-md-none cx-replenishment-order-history-label\">\n                  {{ 'orderHistory.total' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'replenishmentDetails',\n                      params: order\n                    } | cxUrl\n                  \"\n                  class=\"cx-replenishment-order-history-value\"\n                >\n                  {{ order?.totalPriceWithTax.formattedValue }}</a\n                >\n              </td>\n              <td class=\"cx-replenishment-order-history-cancel\" role=\"cell\">\n                <div\n                  class=\"d-md-none cx-replenishment-order-history-label\"\n                ></div>\n                <button\n                  (click)=\"openDialog($event, order?.replenishmentOrderCode)\"\n                  class=\"cx-order-cancel btn btn-secondary\"\n                  #element\n                  *ngIf=\"order?.active\"\n                >\n                  {{ 'orderHistory.cancel' | cxTranslate }}\n                </button>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n        <!-- Select Form and Pagination Bottom -->\n        <div class=\"cx-replenishment-order-history-sort bottom row\">\n          <div class=\"cx-replenishment-order-history-pagination\">\n            <cx-pagination\n              [pagination]=\"replenishmentOrders.pagination\"\n              (viewPageEvent)=\"pageChange($event)\"\n              *ngIf=\"replenishmentOrders.pagination.totalPages > 1\"\n            ></cx-pagination>\n          </div>\n        </div>\n      </ng-container>\n\n      <!-- NO ORDER CONTAINER -->\n      <ng-template #noOrder>\n        <div\n          class=\"cx-replenishment-order-history-no-order row\"\n          *ngIf=\"isLoaded$ | async\"\n        >\n          <div class=\"col-sm-12 col-md-6 col-lg-4\">\n            <div>{{ 'orderHistory.noReplenishmentOrders' | cxTranslate }}</div>\n            <a\n              [routerLink]=\"{ cxRoute: 'home' } | cxUrl\"\n              routerLinkActive=\"active\"\n              class=\"btn btn-primary btn-block\"\n              >{{ 'orderHistory.startShopping' | cxTranslate }}</a\n            >\n          </div>\n        </div>\n      </ng-template>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i2$2.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "component", type: i3.SortingComponent, selector: "cx-sorting", inputs: ["sortOptions", "ariaControls", "ariaLabel", "selectedOption", "placeholder", "sortLabels"], outputs: ["sortListEvent"] }, { kind: "component", type: i3.PaginationComponent, selector: "cx-pagination", inputs: ["pageRoute", "queryParam", "defaultPage", "pagination"], outputs: ["viewPageEvent"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2$1.SlicePipe, name: "slice" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.CxDatePipe, name: "cxDate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderHistoryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-replenishment-order-history', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"replenishmentOrders$ | async as replenishmentOrders\">\n  <div class=\"container\">\n    <!-- HEADER -->\n    <div class=\"cx-replenishment-order-history-header\">\n      <h3>\n        {{ 'orderHistory.replenishmentOrderHistory' | cxTranslate }}\n      </h3>\n    </div>\n\n    <!-- BODY -->\n    <div class=\"cx-replenishment-order-history-body\">\n      <ng-container\n        *ngIf=\"replenishmentOrders.pagination.totalResults > 0; else noOrder\"\n      >\n        <!-- Select Form and Pagination Top -->\n        <div class=\"cx-replenishment-order-history-sort top row\">\n          <label\n            class=\"\n              cx-replenishment-order-history-form-group\n              form-group\n              col-sm-12 col-md-4 col-lg-4\n            \"\n          >\n            <span>{{ 'orderHistory.sortBy' | cxTranslate }}</span>\n            <cx-sorting\n              [sortOptions]=\"replenishmentOrders.sorts\"\n              [sortLabels]=\"getSortLabels() | async\"\n              (sortListEvent)=\"changeSortCode($event)\"\n              [selectedOption]=\"replenishmentOrders.pagination.sort\"\n              placeholder=\"{{ 'orderHistory.sortBy' | cxTranslate }}\"\n              [ariaLabel]=\"'orderHistory.sortOrders' | cxTranslate\"\n              ariaControls=\"replenishment-order-history-table\"\n            ></cx-sorting>\n          </label>\n          <div\n            class=\"cx-replenishment-order-history-pagination\"\n            *ngIf=\"replenishmentOrders.pagination.totalPages > 1\"\n          >\n            <cx-pagination\n              [pagination]=\"replenishmentOrders.pagination\"\n              (viewPageEvent)=\"pageChange($event)\"\n            ></cx-pagination>\n          </div>\n        </div>\n        <!-- TABLE -->\n        <table\n          id=\"replenishment-order-history-table\"\n          class=\"table cx-replenishment-order-history-table\"\n          role=\"table\"\n        >\n          <caption class=\"cx-visually-hidden\">\n            {{\n              'orderHistory.orderHistory' | cxTranslate\n            }}\n          </caption>\n          <thead class=\"cx-replenishment-order-history-thead-mobile\">\n            <th scope=\"col\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.replenishmentOrderId' | cxTranslate }}\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.purchaseOrderNumber' | cxTranslate }}\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.startOn' | cxTranslate }}\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.frequency' | cxTranslate }}\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.nextOrderDate' | cxTranslate }}\n              </span>\n            </th>\n            <th scope=\"col\" class=\"cx-replenishment-order-history-total\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.total' | cxTranslate }}\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.actions' | cxTranslate }}\n              </span>\n            </th>\n          </thead>\n          <tbody>\n            <tr\n              role=\"row\"\n              *ngFor=\"let order of replenishmentOrders.replenishmentOrders\"\n              (click)=\"goToOrderDetail(order)\"\n            >\n              <td class=\"cx-replenishment-order-history-code\" role=\"cell\">\n                <div class=\"d-md-none cx-replenishment-order-history-label\">\n                  {{ 'orderHistory.replenishmentOrderId' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'replenishmentDetails',\n                      params: order\n                    } | cxUrl\n                  \"\n                  class=\"cx-replenishment-order-history-value\"\n                >\n                  {{ order?.replenishmentOrderCode }}</a\n                >\n              </td>\n              <td role=\"cell\">\n                <div class=\"d-md-none cx-replenishment-order-history-label\">\n                  {{ 'orderHistory.purchaseOrderNumber' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'replenishmentDetails',\n                      params: order\n                    } | cxUrl\n                  \"\n                  class=\"\n                    cx-replenishment-order-history-value\n                    cx-purchase-order-number\n                  \"\n                >\n                  {{\n                    order?.purchaseOrderNumber?.length > 0\n                      ? order?.purchaseOrderNumber\n                      : ('orderHistory.emptyPurchaseOrderId' | cxTranslate)\n                  }}\n                </a>\n              </td>\n              <td role=\"cell\">\n                <div class=\"d-md-none cx-replenishment-order-history-label\">\n                  {{ 'orderHistory.startOn' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'replenishmentDetails',\n                      params: order\n                    } | cxUrl\n                  \"\n                  class=\"cx-replenishment-order-history-value\"\n                >\n                  {{ order?.firstDate | cxDate: 'M/d/yyyy' }}</a\n                >\n              </td>\n              <td class=\"cx-replenishment-order-history-frequency\" role=\"cell\">\n                <div class=\"d-md-none cx-replenishment-order-history-label\">\n                  {{ 'orderHistory.frequency' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'replenishmentDetails',\n                      params: order\n                    } | cxUrl\n                  \"\n                  class=\"cx-replenishment-order-history-value\"\n                >\n                  {{ order?.trigger.displayTimeTable | slice: 0:-12 }}\n                </a>\n              </td>\n              <td role=\"cell\">\n                <div class=\"d-md-none cx-replenishment-order-history-label\">\n                  {{ 'orderHistory.nextOrderDate' | cxTranslate }}\n                </div>\n\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'replenishmentDetails',\n                      params: order\n                    } | cxUrl\n                  \"\n                  class=\"\n                    cx-replenishment-order-history-value cx-next-order-date\n                  \"\n                >\n                  {{\n                    order?.active\n                      ? (order?.trigger.activationTime | cxDate: 'M/d/yyyy')\n                      : ('orderHistory.cancelled' | cxTranslate)\n                  }}\n                </a>\n              </td>\n              <td class=\"cx-replenishment-order-history-total\">\n                <div class=\"d-md-none cx-replenishment-order-history-label\">\n                  {{ 'orderHistory.total' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'replenishmentDetails',\n                      params: order\n                    } | cxUrl\n                  \"\n                  class=\"cx-replenishment-order-history-value\"\n                >\n                  {{ order?.totalPriceWithTax.formattedValue }}</a\n                >\n              </td>\n              <td class=\"cx-replenishment-order-history-cancel\" role=\"cell\">\n                <div\n                  class=\"d-md-none cx-replenishment-order-history-label\"\n                ></div>\n                <button\n                  (click)=\"openDialog($event, order?.replenishmentOrderCode)\"\n                  class=\"cx-order-cancel btn btn-secondary\"\n                  #element\n                  *ngIf=\"order?.active\"\n                >\n                  {{ 'orderHistory.cancel' | cxTranslate }}\n                </button>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n        <!-- Select Form and Pagination Bottom -->\n        <div class=\"cx-replenishment-order-history-sort bottom row\">\n          <div class=\"cx-replenishment-order-history-pagination\">\n            <cx-pagination\n              [pagination]=\"replenishmentOrders.pagination\"\n              (viewPageEvent)=\"pageChange($event)\"\n              *ngIf=\"replenishmentOrders.pagination.totalPages > 1\"\n            ></cx-pagination>\n          </div>\n        </div>\n      </ng-container>\n\n      <!-- NO ORDER CONTAINER -->\n      <ng-template #noOrder>\n        <div\n          class=\"cx-replenishment-order-history-no-order row\"\n          *ngIf=\"isLoaded$ | async\"\n        >\n          <div class=\"col-sm-12 col-md-6 col-lg-4\">\n            <div>{{ 'orderHistory.noReplenishmentOrders' | cxTranslate }}</div>\n            <a\n              [routerLink]=\"{ cxRoute: 'home' } | cxUrl\"\n              routerLinkActive=\"active\"\n              class=\"btn btn-primary btn-block\"\n              >{{ 'orderHistory.startShopping' | cxTranslate }}</a\n            >\n          </div>\n        </div>\n      </ng-template>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i2.RoutingService }, { type: i1.ReplenishmentOrderHistoryFacade }, { type: i2.TranslationService }, { type: i0.ViewContainerRef }, { type: i3.LaunchDialogService }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['element']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReplenishmentOrderHistoryModule {
}
ReplenishmentOrderHistoryModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderHistoryModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReplenishmentOrderHistoryModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderHistoryModule, declarations: [ReplenishmentOrderHistoryComponent], imports: [CommonModule,
        RouterModule,
        ListNavigationModule,
        UrlModule,
        I18nModule], exports: [ReplenishmentOrderHistoryComponent] });
ReplenishmentOrderHistoryModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderHistoryModule, providers: [
        provideDefaultConfig(defaultReplenishmentOrderCancellationLayoutConfig),
        provideDefaultConfig({
            cmsComponents: {
                AccountReplenishmentHistoryComponent: {
                    component: ReplenishmentOrderHistoryComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        ListNavigationModule,
        UrlModule,
        I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderHistoryModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        ListNavigationModule,
                        UrlModule,
                        I18nModule,
                    ],
                    providers: [
                        provideDefaultConfig(defaultReplenishmentOrderCancellationLayoutConfig),
                        provideDefaultConfig({
                            cmsComponents: {
                                AccountReplenishmentHistoryComponent: {
                                    component: ReplenishmentOrderHistoryComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [ReplenishmentOrderHistoryComponent],
                    exports: [ReplenishmentOrderHistoryComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReturnRequestService {
    constructor(routingService, returnRequestService, globalMessageService) {
        this.routingService = routingService;
        this.returnRequestService = returnRequestService;
        this.globalMessageService = globalMessageService;
    }
    get isCancelling$() {
        return this.returnRequestService.getCancelReturnRequestLoading();
    }
    get isCancelSuccess$() {
        return this.returnRequestService.getCancelReturnRequestSuccess();
    }
    getReturnRequest() {
        return combineLatest([
            this.routingService.getRouterState(),
            this.returnRequestService.getOrderReturnRequest(),
            this.returnRequestService.getReturnRequestLoading(),
        ]).pipe(map(([routingState, returnRequest, isLoading]) => [
            routingState.state.params['returnCode'],
            returnRequest,
            isLoading,
        ]), filter(([returnCode]) => Boolean(returnCode)), tap(([returnCode, returnRequest, isLoading]) => {
            if ((returnRequest === undefined || returnRequest.rma !== returnCode) &&
                !isLoading) {
                this.returnRequestService.loadOrderReturnRequestDetail(returnCode);
            }
        }), map(([_, returnRequest]) => returnRequest), filter((returnRequest) => Boolean(returnRequest)), distinctUntilChanged());
    }
    clearReturnRequest() {
        this.returnRequestService.clearOrderReturnRequestDetail();
    }
    cancelReturnRequest(returnRequestCode) {
        this.returnRequestService.cancelOrderReturnRequest(returnRequestCode, {
            status: 'CANCELLING',
        });
    }
    cancelSuccess(rma) {
        this.returnRequestService.resetCancelReturnRequestProcessState();
        this.globalMessageService.add({
            key: 'returnRequest.cancelSuccess',
            params: { rma },
        }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        this.routingService.go({
            cxRoute: 'orders',
        });
    }
    backToList() {
        this.routingService.go({ cxRoute: 'orders' }, {
            state: {
                activeTab: 1,
            },
        });
    }
}
ReturnRequestService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestService, deps: [{ token: i2.RoutingService }, { token: i1.OrderReturnRequestFacade }, { token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
ReturnRequestService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.RoutingService }, { type: i1.OrderReturnRequestFacade }, { type: i2.GlobalMessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReturnRequestItemsComponent {
    constructor(returnRequestService) {
        this.returnRequestService = returnRequestService;
        this.returnRequest$ = this.returnRequestService.getReturnRequest();
    }
}
ReturnRequestItemsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestItemsComponent, deps: [{ token: ReturnRequestService }], target: i0.ɵɵFactoryTarget.Component });
ReturnRequestItemsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ReturnRequestItemsComponent, selector: "cx-return-request-items", ngImport: i0, template: "<table\n  class=\"cx-return-request-items\"\n  *ngIf=\"returnRequest$ | async as returnRequest\"\n>\n  <caption class=\"cx-visually-hidden\">\n    {{\n      'returnRequest.caption' | cxTranslate\n    }}\n  </caption>\n  <thead>\n    <tr>\n      <th role=\"columnheader\" class=\"cx-item-list-desc\">\n        {{ 'returnRequest.item' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\" class=\"cx-item-list-price\">\n        {{ 'returnRequest.itemPrice' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\" class=\"cx-item-list-qty\">\n        {{ 'returnRequest.returnQty' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\" class=\"cx-item-list-total\">\n        {{ 'returnRequest.total' | cxTranslate }}\n      </th>\n    </tr>\n  </thead>\n\n  <tbody class=\"cx-item-list-items\">\n    <!-- TODO: This should be a separate component-->\n    <tr\n      class=\"cx-item-list-row cx-return-request-item-row\"\n      *ngFor=\"let returnEntry of returnRequest.returnEntries; let i = index\"\n    >\n      <td role=\"cell\">\n        <!-- Item Image -->\n        <div class=\"cx-table-item-container\">\n          <cx-media\n            [container]=\"returnEntry.orderEntry?.product.images?.PRIMARY\"\n            format=\"thumbnail\"\n          ></cx-media>\n          <!-- Item Description -->\n          <div class=\"cx-info\">\n            <div *ngIf=\"returnEntry.orderEntry?.product.name\" class=\"cx-name\">\n              {{ returnEntry.orderEntry?.product.name }}\n            </div>\n            <div *ngIf=\"returnEntry.orderEntry?.product.code\" class=\"cx-code\">\n              {{ 'cartItems.id' | cxTranslate }}\n              {{ returnEntry.orderEntry?.product.code }}\n            </div>\n            <!-- Variants -->\n            <div\n              *ngFor=\"\n                let variant of (returnEntry.orderEntry?.product.baseOptions)[0]\n                  ?.selected?.variantOptionQualifiers\n              \"\n              class=\"cx-property\"\n            >\n              <div class=\"cx-label\" *ngIf=\"variant.name\">\n                {{ variant.name }}:\n              </div>\n              <div class=\"cx-value\" *ngIf=\"variant.value\">\n                {{ variant.value }}\n              </div>\n            </div>\n          </div>\n        </div>\n      </td>\n      <!-- Item Price -->\n      <td\n        role=\"cell\"\n        class=\"cx-price\"\n        *ngIf=\"returnEntry.orderEntry?.basePrice\"\n      >\n        <div class=\"cx-mobile-header\">\n          {{ 'returnRequest.itemPrice' | cxTranslate }}\n        </div>\n        <div class=\"cx-value\">\n          {{ returnEntry.orderEntry?.basePrice?.formattedValue }}\n        </div>\n      </td>\n      <!-- return Quantity -->\n      <td role=\"cell\" class=\"cx-quantity\">\n        <div class=\"cx-mobile-header\">\n          {{ 'returnRequest.returnQty' | cxTranslate }}\n        </div>\n        <div class=\"cx-value\">\n          {{ returnEntry.expectedQuantity }}\n        </div>\n      </td>\n      <!-- Total Price -->\n      <td role=\"cell\" class=\"cx-total\">\n        <div class=\"cx-mobile-header\">\n          {{ 'returnRequest.total' | cxTranslate }}\n        </div>\n        <div class=\"cx-value\">\n          {{ returnEntry.refundAmount?.formattedValue }}\n        </div>\n      </td>\n    </tr>\n  </tbody>\n</table>\n", dependencies: [{ kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestItemsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-return-request-items', changeDetection: ChangeDetectionStrategy.OnPush, template: "<table\n  class=\"cx-return-request-items\"\n  *ngIf=\"returnRequest$ | async as returnRequest\"\n>\n  <caption class=\"cx-visually-hidden\">\n    {{\n      'returnRequest.caption' | cxTranslate\n    }}\n  </caption>\n  <thead>\n    <tr>\n      <th role=\"columnheader\" class=\"cx-item-list-desc\">\n        {{ 'returnRequest.item' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\" class=\"cx-item-list-price\">\n        {{ 'returnRequest.itemPrice' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\" class=\"cx-item-list-qty\">\n        {{ 'returnRequest.returnQty' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\" class=\"cx-item-list-total\">\n        {{ 'returnRequest.total' | cxTranslate }}\n      </th>\n    </tr>\n  </thead>\n\n  <tbody class=\"cx-item-list-items\">\n    <!-- TODO: This should be a separate component-->\n    <tr\n      class=\"cx-item-list-row cx-return-request-item-row\"\n      *ngFor=\"let returnEntry of returnRequest.returnEntries; let i = index\"\n    >\n      <td role=\"cell\">\n        <!-- Item Image -->\n        <div class=\"cx-table-item-container\">\n          <cx-media\n            [container]=\"returnEntry.orderEntry?.product.images?.PRIMARY\"\n            format=\"thumbnail\"\n          ></cx-media>\n          <!-- Item Description -->\n          <div class=\"cx-info\">\n            <div *ngIf=\"returnEntry.orderEntry?.product.name\" class=\"cx-name\">\n              {{ returnEntry.orderEntry?.product.name }}\n            </div>\n            <div *ngIf=\"returnEntry.orderEntry?.product.code\" class=\"cx-code\">\n              {{ 'cartItems.id' | cxTranslate }}\n              {{ returnEntry.orderEntry?.product.code }}\n            </div>\n            <!-- Variants -->\n            <div\n              *ngFor=\"\n                let variant of (returnEntry.orderEntry?.product.baseOptions)[0]\n                  ?.selected?.variantOptionQualifiers\n              \"\n              class=\"cx-property\"\n            >\n              <div class=\"cx-label\" *ngIf=\"variant.name\">\n                {{ variant.name }}:\n              </div>\n              <div class=\"cx-value\" *ngIf=\"variant.value\">\n                {{ variant.value }}\n              </div>\n            </div>\n          </div>\n        </div>\n      </td>\n      <!-- Item Price -->\n      <td\n        role=\"cell\"\n        class=\"cx-price\"\n        *ngIf=\"returnEntry.orderEntry?.basePrice\"\n      >\n        <div class=\"cx-mobile-header\">\n          {{ 'returnRequest.itemPrice' | cxTranslate }}\n        </div>\n        <div class=\"cx-value\">\n          {{ returnEntry.orderEntry?.basePrice?.formattedValue }}\n        </div>\n      </td>\n      <!-- return Quantity -->\n      <td role=\"cell\" class=\"cx-quantity\">\n        <div class=\"cx-mobile-header\">\n          {{ 'returnRequest.returnQty' | cxTranslate }}\n        </div>\n        <div class=\"cx-value\">\n          {{ returnEntry.expectedQuantity }}\n        </div>\n      </td>\n      <!-- Total Price -->\n      <td role=\"cell\" class=\"cx-total\">\n        <div class=\"cx-mobile-header\">\n          {{ 'returnRequest.total' | cxTranslate }}\n        </div>\n        <div class=\"cx-value\">\n          {{ returnEntry.refundAmount?.formattedValue }}\n        </div>\n      </td>\n    </tr>\n  </tbody>\n</table>\n" }]
        }], ctorParameters: function () { return [{ type: ReturnRequestService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReturnRequestOverviewComponent {
    constructor(returnRequestService) {
        this.returnRequestService = returnRequestService;
        this.returnRequest$ = this.returnRequestService
            .getReturnRequest()
            .pipe(tap((returnRequest) => (this.rma = returnRequest.rma ?? '')));
        this.isCancelling$ = this.returnRequestService.isCancelling$;
    }
    ngOnInit() {
        this.subscription = this.returnRequestService.isCancelSuccess$.subscribe((success) => {
            if (success) {
                this.returnRequestService.cancelSuccess(this.rma);
            }
        });
    }
    cancelReturn(returnRequestCode) {
        this.returnRequestService.cancelReturnRequest(returnRequestCode);
    }
    back() {
        this.returnRequestService.backToList();
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
ReturnRequestOverviewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestOverviewComponent, deps: [{ token: ReturnRequestService }], target: i0.ɵɵFactoryTarget.Component });
ReturnRequestOverviewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ReturnRequestOverviewComponent, selector: "cx-return-request-overview", ngImport: i0, template: "<ng-container *ngIf=\"returnRequest$ | async as returnRequest\">\n  <div class=\"cx-nav row\">\n    <div class=\"col-xs-12 col-md-4 col-lg-3\">\n      <button (click)=\"back()\" class=\"btn btn-block btn-secondary\">\n        {{ 'common.back' | cxTranslate }}\n      </button>\n    </div>\n\n    <div class=\"col-xs-12 col-md-4 col-lg-3\">\n      <button\n        *ngIf=\"returnRequest.cancellable\"\n        class=\"btn btn-block btn-primary\"\n        (click)=\"cancelReturn(returnRequest.rma)\"\n        [disabled]=\"isCancelling$ | async\"\n      >\n        {{ 'returnRequest.cancel' | cxTranslate }}\n      </button>\n    </div>\n  </div>\n  <div class=\"cx-header row\">\n    <div class=\"cx-detail col-sm-12 col-md-4\">\n      <div class=\"cx-detail-label\">\n        {{ 'returnRequest.returnRequestId' | cxTranslate }}\n      </div>\n      <div class=\"cx-detail-value\">{{ returnRequest.rma }}</div>\n    </div>\n    <div class=\"cx-detail col-sm-12 col-md-4\">\n      <div class=\"cx-detail-label\">\n        {{ 'returnRequest.orderCode' | cxTranslate }}\n      </div>\n      <div class=\"cx-detail-value\">{{ returnRequest.order?.code }}</div>\n    </div>\n    <div class=\"cx-detail col-sm-12 col-md-4\">\n      <div class=\"cx-detail-label\">\n        {{ 'returnRequest.status' | cxTranslate }}\n      </div>\n      <div class=\"cx-detail-value\">\n        {{\n          'returnRequestList.statusDisplay_' + returnRequest?.status\n            | cxTranslate\n        }}\n      </div>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestOverviewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-return-request-overview', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"returnRequest$ | async as returnRequest\">\n  <div class=\"cx-nav row\">\n    <div class=\"col-xs-12 col-md-4 col-lg-3\">\n      <button (click)=\"back()\" class=\"btn btn-block btn-secondary\">\n        {{ 'common.back' | cxTranslate }}\n      </button>\n    </div>\n\n    <div class=\"col-xs-12 col-md-4 col-lg-3\">\n      <button\n        *ngIf=\"returnRequest.cancellable\"\n        class=\"btn btn-block btn-primary\"\n        (click)=\"cancelReturn(returnRequest.rma)\"\n        [disabled]=\"isCancelling$ | async\"\n      >\n        {{ 'returnRequest.cancel' | cxTranslate }}\n      </button>\n    </div>\n  </div>\n  <div class=\"cx-header row\">\n    <div class=\"cx-detail col-sm-12 col-md-4\">\n      <div class=\"cx-detail-label\">\n        {{ 'returnRequest.returnRequestId' | cxTranslate }}\n      </div>\n      <div class=\"cx-detail-value\">{{ returnRequest.rma }}</div>\n    </div>\n    <div class=\"cx-detail col-sm-12 col-md-4\">\n      <div class=\"cx-detail-label\">\n        {{ 'returnRequest.orderCode' | cxTranslate }}\n      </div>\n      <div class=\"cx-detail-value\">{{ returnRequest.order?.code }}</div>\n    </div>\n    <div class=\"cx-detail col-sm-12 col-md-4\">\n      <div class=\"cx-detail-label\">\n        {{ 'returnRequest.status' | cxTranslate }}\n      </div>\n      <div class=\"cx-detail-value\">\n        {{\n          'returnRequestList.statusDisplay_' + returnRequest?.status\n            | cxTranslate\n        }}\n      </div>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: ReturnRequestService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReturnRequestTotalsComponent {
    constructor(returnRequestService) {
        this.returnRequestService = returnRequestService;
        this.returnRequest$ = this.returnRequestService.getReturnRequest();
    }
    ngOnDestroy() {
        this.returnRequestService.clearReturnRequest();
    }
}
ReturnRequestTotalsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestTotalsComponent, deps: [{ token: ReturnRequestService }], target: i0.ɵɵFactoryTarget.Component });
ReturnRequestTotalsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ReturnRequestTotalsComponent, selector: "cx-return-request-totals", ngImport: i0, template: "<ng-container *ngIf=\"returnRequest$ | async as returnRequest\">\n  <div class=\"row justify-content-end\">\n    <div class=\"cx-summary col-sm-12 col-md-6 col-lg-5 col-xl-4\">\n      <h4>{{ 'returnRequest.summary' | cxTranslate }}</h4>\n      <div class=\"cx-summary-row\">\n        <div class=\"col-6 cx-summary-label\">\n          {{ 'returnRequest.subtotal' | cxTranslate }}\n        </div>\n        <div class=\"col-6 cx-summary-amount\">\n          {{ returnRequest.subTotal?.formattedValue }}\n        </div>\n      </div>\n      <div class=\"cx-summary-row\">\n        <div class=\"col-6 cx-summary-label\">\n          {{ 'returnRequest.deliveryCode' | cxTranslate }}\n        </div>\n        <div class=\"col-6 cx-summary-amount\">\n          {{ returnRequest.deliveryCost?.formattedValue }}\n        </div>\n      </div>\n      <div class=\"cx-summary-row cx-summary-total\">\n        <div class=\"col-6 cx-summary-label\">\n          {{ 'returnRequest.estimatedRefund' | cxTranslate }}\n        </div>\n        <div class=\"col-6 cx-summary-amount\">\n          {{ returnRequest.totalPrice?.formattedValue }}\n        </div>\n      </div>\n      <div class=\"cx-summary-row cx-footnote\">\n        {{ 'returnRequest.note' | cxTranslate }}\n      </div>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestTotalsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-return-request-totals', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"returnRequest$ | async as returnRequest\">\n  <div class=\"row justify-content-end\">\n    <div class=\"cx-summary col-sm-12 col-md-6 col-lg-5 col-xl-4\">\n      <h4>{{ 'returnRequest.summary' | cxTranslate }}</h4>\n      <div class=\"cx-summary-row\">\n        <div class=\"col-6 cx-summary-label\">\n          {{ 'returnRequest.subtotal' | cxTranslate }}\n        </div>\n        <div class=\"col-6 cx-summary-amount\">\n          {{ returnRequest.subTotal?.formattedValue }}\n        </div>\n      </div>\n      <div class=\"cx-summary-row\">\n        <div class=\"col-6 cx-summary-label\">\n          {{ 'returnRequest.deliveryCode' | cxTranslate }}\n        </div>\n        <div class=\"col-6 cx-summary-amount\">\n          {{ returnRequest.deliveryCost?.formattedValue }}\n        </div>\n      </div>\n      <div class=\"cx-summary-row cx-summary-total\">\n        <div class=\"col-6 cx-summary-label\">\n          {{ 'returnRequest.estimatedRefund' | cxTranslate }}\n        </div>\n        <div class=\"col-6 cx-summary-amount\">\n          {{ returnRequest.totalPrice?.formattedValue }}\n        </div>\n      </div>\n      <div class=\"cx-summary-row cx-footnote\">\n        {{ 'returnRequest.note' | cxTranslate }}\n      </div>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: ReturnRequestService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const components = [
    ReturnRequestOverviewComponent,
    ReturnRequestItemsComponent,
    ReturnRequestTotalsComponent,
];
class ReturnRequestDetailModule {
}
ReturnRequestDetailModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestDetailModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReturnRequestDetailModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestDetailModule, declarations: [ReturnRequestOverviewComponent,
        ReturnRequestItemsComponent,
        ReturnRequestTotalsComponent], imports: [CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        MediaModule,
        FeaturesConfigModule], exports: [ReturnRequestOverviewComponent,
        ReturnRequestItemsComponent,
        ReturnRequestTotalsComponent] });
ReturnRequestDetailModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestDetailModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ReturnRequestOverviewComponent: {
                    component: ReturnRequestOverviewComponent,
                },
                ReturnRequestItemsComponent: {
                    component: ReturnRequestItemsComponent,
                },
                ReturnRequestTotalsComponent: {
                    component: ReturnRequestTotalsComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        MediaModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestDetailModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        MediaModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ReturnRequestOverviewComponent: {
                                    component: ReturnRequestOverviewComponent,
                                },
                                ReturnRequestItemsComponent: {
                                    component: ReturnRequestItemsComponent,
                                },
                                ReturnRequestTotalsComponent: {
                                    component: ReturnRequestTotalsComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [...components],
                    exports: [...components],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderReturnRequestListComponent {
    constructor(returnRequestService, translation) {
        this.returnRequestService = returnRequestService;
        this.translation = translation;
        this.PAGE_SIZE = 5;
        this.returnRequests$ = this.returnRequestService.getOrderReturnRequestList(this.PAGE_SIZE).pipe(tap((requestList) => {
            if (requestList?.pagination?.sort) {
                this.sortType = requestList.pagination.sort;
            }
        }));
        /**
         * When "Order Return" feature is enabled, this component becomes one tab in
         * TabParagraphContainerComponent. This can be read from TabParagraphContainer.
         */
        this.tabTitleParam$ = this.returnRequests$.pipe(map((returnRequests) => returnRequests?.pagination?.totalResults), filter(isNotUndefined), take(1));
    }
    ngOnDestroy() {
        this.returnRequestService.clearOrderReturnRequestList();
    }
    changeSortCode(sortCode) {
        const event = {
            sortCode,
            currentPage: 0,
        };
        this.sortType = sortCode;
        this.fetchReturnRequests(event);
    }
    pageChange(page) {
        const event = {
            sortCode: this.sortType,
            currentPage: page,
        };
        this.fetchReturnRequests(event);
    }
    getSortLabels() {
        return combineLatest([
            this.translation.translate('sorting.date'),
            this.translation.translate('sorting.rma'),
        ]).pipe(map(([textByDate, textByRma]) => {
            return {
                byDate: textByDate,
                byRMA: textByRma,
            };
        }));
    }
    fetchReturnRequests(event) {
        this.returnRequestService.loadOrderReturnRequestList(this.PAGE_SIZE, event.currentPage, event.sortCode);
    }
}
OrderReturnRequestListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnRequestListComponent, deps: [{ token: i1.OrderReturnRequestFacade }, { token: i2.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
OrderReturnRequestListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: OrderReturnRequestListComponent, selector: "cx-order-return-request-list", ngImport: i0, template: "<ng-container *ngIf=\"returnRequests$ | async as returnRequests\">\n  <div class=\"container\">\n    <!-- BODY -->\n    <div class=\"cx-order-history-body\">\n      <ng-container *ngIf=\"returnRequests.pagination.totalResults > 0\">\n        <!-- Select Form and Pagination Top -->\n        <div class=\"cx-order-history-sort top\">\n          <label class=\"cx-order-history-form-group form-group\"\n            ><span>{{ 'returnRequestList.sortBy' | cxTranslate }}</span>\n            <cx-sorting\n              [sortOptions]=\"returnRequests.sorts\"\n              [sortLabels]=\"getSortLabels() | async\"\n              (sortListEvent)=\"changeSortCode($event)\"\n              [selectedOption]=\"returnRequests.pagination.sort\"\n              [ariaLabel]=\"'returnRequestList.sortReturns' | cxTranslate\"\n              ariaControls=\"order-return-table\"\n            ></cx-sorting>\n          </label>\n          <div class=\"cx-order-history-pagination\">\n            <cx-pagination\n              [pagination]=\"returnRequests.pagination\"\n              (viewPageEvent)=\"pageChange($event)\"\n            ></cx-pagination>\n          </div>\n        </div>\n        <!-- TABLE -->\n        <table id=\"order-return-table\" class=\"table cx-order-history-table\">\n          <thead class=\"cx-order-history-thead-mobile\">\n            <th scope=\"col\">\n              {{ 'returnRequestList.returnRequestId' | cxTranslate }}\n            </th>\n            <th scope=\"col\">{{ 'returnRequestList.orderId' | cxTranslate }}</th>\n            <th scope=\"col\">\n              {{ 'returnRequestList.date' | cxTranslate }}\n            </th>\n            <th scope=\"col\">{{ 'returnRequestList.status' | cxTranslate }}</th>\n          </thead>\n          <tbody>\n            <tr *ngFor=\"let return of returnRequests.returnRequests\">\n              <td class=\"cx-order-history-code\">\n                <div class=\"cx-order-history-label\">\n                  {{ 'returnRequestList.returnRequestId' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'returnRequestDetails',\n                      params: return\n                    } | cxUrl\n                  \"\n                  class=\"cx-order-history-value\"\n                >\n                  {{ return?.rma }}</a\n                >\n              </td>\n              <td class=\"cx-order-history-code\">\n                <div class=\"cx-order-history-label\">\n                  {{ 'returnRequestList.orderId' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'orderDetails',\n                      params: return?.order\n                    } | cxUrl\n                  \"\n                  class=\"cx-order-history-value\"\n                >\n                  {{ return?.order?.code }}</a\n                >\n              </td>\n\n              <td class=\"cx-order-history-placed\">\n                <div class=\"cx-order-history-label\">\n                  {{ 'returnRequestList.date' | cxTranslate }}\n                </div>\n                {{ return?.creationTime | cxDate: 'longDate' }}\n              </td>\n              <td class=\"cx-order-history-status\">\n                <div class=\"cx-order-history-label\">\n                  {{ 'returnRequestList.status' | cxTranslate }}\n                </div>\n                {{\n                  'returnRequestList.statusDisplay_' + return?.status\n                    | cxTranslate\n                }}\n              </td>\n            </tr>\n          </tbody>\n        </table>\n        <!-- Select Form and Pagination Bottom -->\n        <div class=\"cx-order-history-sort bottom\">\n          <label class=\"cx-order-history-form-group form-group\"\n            ><span>{{ 'returnRequestList.sortBy' | cxTranslate }}</span>\n            <cx-sorting\n              [sortOptions]=\"returnRequests.sorts\"\n              [sortLabels]=\"getSortLabels() | async\"\n              (sortListEvent)=\"changeSortCode($event)\"\n              [selectedOption]=\"returnRequests.pagination.sort\"\n              [ariaLabel]=\"'returnRequestList.sortReturns' | cxTranslate\"\n              ariaControls=\"order-return-table\"\n            ></cx-sorting>\n          </label>\n          <div class=\"cx-order-history-pagination\">\n            <cx-pagination\n              [pagination]=\"returnRequests.pagination\"\n              (viewPageEvent)=\"pageChange($event)\"\n            ></cx-pagination>\n          </div>\n        </div>\n      </ng-container>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i3.SortingComponent, selector: "cx-sorting", inputs: ["sortOptions", "ariaControls", "ariaLabel", "selectedOption", "placeholder", "sortLabels"], outputs: ["sortListEvent"] }, { kind: "component", type: i3.PaginationComponent, selector: "cx-pagination", inputs: ["pageRoute", "queryParam", "defaultPage", "pagination"], outputs: ["viewPageEvent"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.CxDatePipe, name: "cxDate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnRequestListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-return-request-list', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"returnRequests$ | async as returnRequests\">\n  <div class=\"container\">\n    <!-- BODY -->\n    <div class=\"cx-order-history-body\">\n      <ng-container *ngIf=\"returnRequests.pagination.totalResults > 0\">\n        <!-- Select Form and Pagination Top -->\n        <div class=\"cx-order-history-sort top\">\n          <label class=\"cx-order-history-form-group form-group\"\n            ><span>{{ 'returnRequestList.sortBy' | cxTranslate }}</span>\n            <cx-sorting\n              [sortOptions]=\"returnRequests.sorts\"\n              [sortLabels]=\"getSortLabels() | async\"\n              (sortListEvent)=\"changeSortCode($event)\"\n              [selectedOption]=\"returnRequests.pagination.sort\"\n              [ariaLabel]=\"'returnRequestList.sortReturns' | cxTranslate\"\n              ariaControls=\"order-return-table\"\n            ></cx-sorting>\n          </label>\n          <div class=\"cx-order-history-pagination\">\n            <cx-pagination\n              [pagination]=\"returnRequests.pagination\"\n              (viewPageEvent)=\"pageChange($event)\"\n            ></cx-pagination>\n          </div>\n        </div>\n        <!-- TABLE -->\n        <table id=\"order-return-table\" class=\"table cx-order-history-table\">\n          <thead class=\"cx-order-history-thead-mobile\">\n            <th scope=\"col\">\n              {{ 'returnRequestList.returnRequestId' | cxTranslate }}\n            </th>\n            <th scope=\"col\">{{ 'returnRequestList.orderId' | cxTranslate }}</th>\n            <th scope=\"col\">\n              {{ 'returnRequestList.date' | cxTranslate }}\n            </th>\n            <th scope=\"col\">{{ 'returnRequestList.status' | cxTranslate }}</th>\n          </thead>\n          <tbody>\n            <tr *ngFor=\"let return of returnRequests.returnRequests\">\n              <td class=\"cx-order-history-code\">\n                <div class=\"cx-order-history-label\">\n                  {{ 'returnRequestList.returnRequestId' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'returnRequestDetails',\n                      params: return\n                    } | cxUrl\n                  \"\n                  class=\"cx-order-history-value\"\n                >\n                  {{ return?.rma }}</a\n                >\n              </td>\n              <td class=\"cx-order-history-code\">\n                <div class=\"cx-order-history-label\">\n                  {{ 'returnRequestList.orderId' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'orderDetails',\n                      params: return?.order\n                    } | cxUrl\n                  \"\n                  class=\"cx-order-history-value\"\n                >\n                  {{ return?.order?.code }}</a\n                >\n              </td>\n\n              <td class=\"cx-order-history-placed\">\n                <div class=\"cx-order-history-label\">\n                  {{ 'returnRequestList.date' | cxTranslate }}\n                </div>\n                {{ return?.creationTime | cxDate: 'longDate' }}\n              </td>\n              <td class=\"cx-order-history-status\">\n                <div class=\"cx-order-history-label\">\n                  {{ 'returnRequestList.status' | cxTranslate }}\n                </div>\n                {{\n                  'returnRequestList.statusDisplay_' + return?.status\n                    | cxTranslate\n                }}\n              </td>\n            </tr>\n          </tbody>\n        </table>\n        <!-- Select Form and Pagination Bottom -->\n        <div class=\"cx-order-history-sort bottom\">\n          <label class=\"cx-order-history-form-group form-group\"\n            ><span>{{ 'returnRequestList.sortBy' | cxTranslate }}</span>\n            <cx-sorting\n              [sortOptions]=\"returnRequests.sorts\"\n              [sortLabels]=\"getSortLabels() | async\"\n              (sortListEvent)=\"changeSortCode($event)\"\n              [selectedOption]=\"returnRequests.pagination.sort\"\n              [ariaLabel]=\"'returnRequestList.sortReturns' | cxTranslate\"\n              ariaControls=\"order-return-table\"\n            ></cx-sorting>\n          </label>\n          <div class=\"cx-order-history-pagination\">\n            <cx-pagination\n              [pagination]=\"returnRequests.pagination\"\n              (viewPageEvent)=\"pageChange($event)\"\n            ></cx-pagination>\n          </div>\n        </div>\n      </ng-container>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.OrderReturnRequestFacade }, { type: i2.TranslationService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReturnRequestListModule {
}
ReturnRequestListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReturnRequestListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestListModule, declarations: [OrderReturnRequestListComponent], imports: [CommonModule,
        RouterModule,
        ListNavigationModule,
        UrlModule,
        I18nModule], exports: [OrderReturnRequestListComponent] });
ReturnRequestListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestListModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                OrderReturnRequestListComponent: {
                    component: OrderReturnRequestListComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        ListNavigationModule,
        UrlModule,
        I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        ListNavigationModule,
                        UrlModule,
                        I18nModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                OrderReturnRequestListComponent: {
                                    component: OrderReturnRequestListComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [OrderReturnRequestListComponent],
                    exports: [OrderReturnRequestListComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderComponentsModule {
}
OrderComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderComponentsModule, imports: [OrderHistoryModule,
        OrderDetailsModule,
        ReplenishmentOrderDetailsModule,
        OrderCancellationModule,
        OrderReturnModule,
        ReplenishmentOrderHistoryModule,
        ReturnRequestListModule,
        ReturnRequestDetailModule,
        OrderConfirmationModule,
        MyAccountV2OrdersModule] });
OrderComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderComponentsModule, providers: [
        {
            provide: OrderDetailsOrderEntriesContextToken,
            useExisting: OrderDetailsOrderEntriesContext,
        },
    ], imports: [OrderHistoryModule,
        OrderDetailsModule,
        ReplenishmentOrderDetailsModule,
        OrderCancellationModule,
        OrderReturnModule,
        ReplenishmentOrderHistoryModule,
        ReturnRequestListModule,
        ReturnRequestDetailModule,
        OrderConfirmationModule,
        MyAccountV2OrdersModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        OrderHistoryModule,
                        OrderDetailsModule,
                        ReplenishmentOrderDetailsModule,
                        OrderCancellationModule,
                        OrderReturnModule,
                        ReplenishmentOrderHistoryModule,
                        ReturnRequestListModule,
                        ReturnRequestDetailModule,
                        OrderConfirmationModule,
                        MyAccountV2OrdersModule,
                    ],
                    providers: [
                        {
                            provide: OrderDetailsOrderEntriesContextToken,
                            useExisting: OrderDetailsOrderEntriesContext,
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

export { AmendOrderActionsComponent, AmendOrderActionsModule, AmendOrderItemsModule, AmendOrderType, CancelOrReturnItemsComponent, CancelOrderComponent, CancelOrderConfirmationComponent, CancelOrderConfirmationModule, CancelOrderModule, ConsignmentTrackingComponent, MyAccountV2ConsignmentEntriesComponent, MyAccountV2ConsignmentTrackingComponent, MyAccountV2DownloadInvoicesComponent, MyAccountV2DownloadInvoicesEventListener, MyAccountV2DownloadInvoicesModule, MyAccountV2OrderConsignmentsService, MyAccountV2OrderConsolidatedInformationComponent, MyAccountV2OrderDetailsActionsComponent, MyAccountV2OrderHistoryComponent, MyAccountV2OrdersComponent, MyAccountV2OrdersModule, OrderAmendService, OrderCancellationGuard, OrderCancellationModule, OrderCancellationService, OrderComponentsModule, OrderConfirmationGuard, OrderConfirmationItemsComponent, OrderConfirmationModule, OrderConfirmationOrderEntriesContext, OrderConfirmationShippingComponent, OrderConfirmationThankYouMessageComponent, OrderConfirmationTotalsComponent, OrderConsignedEntriesComponent, OrderCriticalStatus, OrderDetailActionsComponent, OrderDetailBillingComponent, OrderDetailItemsComponent, OrderDetailReorderComponent, OrderDetailTotalsComponent, OrderDetailsModule, OrderDetailsOrderEntriesContext, OrderDetailsService, OrderGuestRegisterFormComponent, OrderHistoryComponent, OrderHistoryModule, OrderOverviewComponent, OrderReturnGuard, OrderReturnModule, OrderReturnRequestListComponent, OrderReturnService, ReorderDialogComponent, ReplenishmentOrderCancellationComponent, ReplenishmentOrderCancellationDialogComponent, ReplenishmentOrderCancellationDialogModule, ReplenishmentOrderDetailsModule, ReplenishmentOrderDetailsService, ReplenishmentOrderHistoryComponent, ReplenishmentOrderHistoryModule, ReturnOrderComponent, ReturnOrderConfirmationComponent, ReturnOrderConfirmationModule, ReturnOrderModule, ReturnRequestDetailModule, ReturnRequestItemsComponent, ReturnRequestListModule, ReturnRequestOverviewComponent, ReturnRequestTotalsComponent, TrackingEventsComponent, defaultMyAccountV2DownloadInvoicesLayoutConfig, defaultReplenishmentOrderCancellationLayoutConfig };
//# sourceMappingURL=spartacus-order-components.mjs.map
