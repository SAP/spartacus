/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Optional, ViewChild, } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GlobalMessageType, OCC_CART_ID_CURRENT, } from '@spartacus/core';
import { BehaviorSubject, combineLatest, defer, EMPTY, iif, Subscription, } from 'rxjs';
import { concatMap, filter, finalize, map, shareReplay, take, tap, } from 'rxjs/operators';
import { BIND_CART_DIALOG_ACTION } from '../asm-bind-cart-dialog/asm-bind-cart-dialog.component';
import { SAVE_CART_DIALOG_ACTION } from '../asm-save-cart-dialog/asm-save-cart-dialog.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/cart/base/root";
import * as i3 from "@spartacus/asm/root";
import * as i4 from "@spartacus/storefront";
import * as i5 from "@spartacus/cart/saved-cart/root";
import * as i6 from "../services/asm-component.service";
import * as i7 from "@angular/common";
import * as i8 from "@angular/forms";
import * as i9 from "../dot-spinner/dot-spinner.component";
export class AsmBindCartComponent {
    constructor(globalMessageService, activeCartFacade, multiCartFacade, asmBindCartFacade, launchDialogService, savedCartFacade, asmComponentService, routing, featureConfig) {
        this.globalMessageService = globalMessageService;
        this.activeCartFacade = activeCartFacade;
        this.multiCartFacade = multiCartFacade;
        this.asmBindCartFacade = asmBindCartFacade;
        this.launchDialogService = launchDialogService;
        this.savedCartFacade = savedCartFacade;
        this.asmComponentService = asmComponentService;
        this.routing = routing;
        this.featureConfig = featureConfig;
        this.activeCartValidator = (control) => {
            if (control.value === this.activeCartId) {
                return { activeCartError: true };
            }
            if (!!this.deepLinkCartId && control.value !== this.deepLinkCartId) {
                this.resetDeeplinkCart();
            }
            return null;
        };
        this.cartId = new FormControl('', [
            Validators.required,
            Validators.minLength(1),
            this.activeCartValidator,
        ]);
        this.loading$ = new BehaviorSubject(false);
        this.valid$ = this.cartId.statusChanges.pipe(map((status) => status === 'VALID'), shareReplay(1));
        this.activeCartId = '';
        this.deepLinkCartId = '';
        this.displayBindCartBtn$ = new BehaviorSubject(true);
        this.displaySaveCartBtn$ = new BehaviorSubject(false);
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.subscribeForDeeplinkCart();
        this.subscription.add(this.activeCartFacade.getActiveCartId().subscribe((response) => {
            this.activeCartId = response ?? '';
            this.cartId.setValue(this.deepLinkCartId || this.activeCartId);
        }));
    }
    resetInput() {
        if (!this.cartId.value) {
            this.cartId.setValue(this.activeCartId);
        }
    }
    /**
     * Bind the input cart number to the customer
     */
    bindCartToCustomer() {
        const anonymousCartId = this.cartId.value;
        const subscription = combineLatest([
            this.loading$.asObservable(),
            this.valid$,
        ])
            .pipe(take(1), filter(([loading, valid]) => !loading && valid), tap(() => this.loading$.next(true)), concatMap(() => this.activeCartFacade.getActive().pipe(map((cart) => cart.deliveryItemsQuantity ?? 0), take(1))), concatMap((cartItemCount) => iif(() => Boolean(this.activeCartId && cartItemCount), this.openDialog(this.activeCartId, anonymousCartId), this.simpleBindCart(anonymousCartId))), finalize(() => this.loading$.next(false)))
            .subscribe({
            next: () => {
                this.globalMessageService.add({ key: 'asm.bindCart.success' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
            },
            error: (error) => {
                this.globalMessageService.add(error.details?.[0].message ?? '', GlobalMessageType.MSG_TYPE_ERROR);
            },
        });
        this.subscription.add(subscription);
    }
    onSaveInactiveCart() {
        this.asmComponentService?.setShowDeeplinkCartInfoAlert(false);
        const customerId = this.asmComponentService?.getSearchParameter('customerId');
        this.multiCartFacade.loadCart({
            cartId: this.deepLinkCartId,
            userId: customerId,
        });
        this.multiCartFacade
            .getCartEntity(this.deepLinkCartId)
            .pipe(filter((state) => state.loading === false && state.success === true), take(1), map((state) => state.value), filter((cart) => !!cart))
            .subscribe((cart) => {
            this.openASMSaveCartDialog(cart);
        });
        this.afterCloseASMSaveCartDialog();
    }
    clearText() {
        this.cartId.setValue('');
        this.resetDeeplinkCart();
    }
    resetDeeplinkCart() {
        if (this.featureConfig?.isLevel('6.2')) {
            this.deepLinkCartId = '';
            this.displayBindCartBtn$.next(true);
            this.displaySaveCartBtn$.next(false);
            this.asmComponentService?.setShowDeeplinkCartInfoAlert(false);
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * Binds cart on subscription and reloads cart
     */
    simpleBindCart(anonymousCartId) {
        return defer(() => this.asmBindCartFacade.bindCart(anonymousCartId)).pipe(tap(() => this.multiCartFacade.reloadCart(OCC_CART_ID_CURRENT)));
    }
    /**
     * Opens dialog and passes non-cancel result to select action
     */
    openDialog(activeCartId, anonymousCartId) {
        return defer(() => {
            this.launchDialogService.openDialogAndSubscribe("ASM_BIND_CART" /* LAUNCH_CALLER.ASM_BIND_CART */, this.bindToCartElemRef);
            return this.launchDialogService.dialogClose.pipe(filter((result) => Boolean(result)), take(1));
        }).pipe(filter((dialogResult) => Boolean(dialogResult)), concatMap((dialogResult) => {
            return this.selectBindAction(activeCartId, anonymousCartId, dialogResult);
        }));
    }
    selectBindAction(activeCartId, anonymousCartId, action) {
        switch (action) {
            case BIND_CART_DIALOG_ACTION.REPLACE:
                return this.replaceCart(activeCartId, anonymousCartId);
            case BIND_CART_DIALOG_ACTION.CANCEL:
            default:
                return EMPTY;
        }
    }
    replaceCart(previousActiveCartId, anonymousCartId) {
        return this.simpleBindCart(anonymousCartId).pipe(tap(() => {
            this.savedCartFacade.saveCart({
                cartId: previousActiveCartId,
                saveCartName: previousActiveCartId,
                // TODO(#12660): Remove default value once backend is updated
                saveCartDescription: '-',
            });
        }));
    }
    // TODO(CXSPA-3090): Remove optional service flags in 7.0
    subscribeForDeeplinkCart() {
        if (this.featureConfig?.isLevel('6.2')) {
            this.subscription.add(this.asmComponentService
                ?.isEmulatedByDeepLink()
                .pipe(filter((emulated) => emulated &&
                !!this.asmComponentService?.getSearchParameter('cartId')))
                .subscribe(() => {
                // TODO(CXSPA-3090): Remove feature flag in 7.0.
                if (this.featureConfig?.isLevel('6.3')) {
                    const cartType = this.asmComponentService?.getSearchParameter('cartType');
                    if (cartType === 'inactive' || cartType === 'active') {
                        this.displayBindCartBtn$.next(false);
                        this.displaySaveCartBtn$.next(cartType === 'inactive');
                        this.deepLinkCartId =
                            this.asmComponentService?.getSearchParameter('cartId');
                        this.cartId.setValue(this.deepLinkCartId);
                        this.asmComponentService?.setShowDeeplinkCartInfoAlert(true);
                        this.asmComponentService?.handleDeepLinkNavigation();
                    }
                    return;
                }
                // TODO(CXSPA-3090): Remove this implementation in 7.0
                if (this.isDeepLinkInactiveCart()) {
                    this.displayBindCartBtn$.next(false);
                    this.displaySaveCartBtn$.next(true);
                    this.onDeeplinkCart();
                }
                else if (this.isDeepLinkActiveCart()) {
                    this.onDeeplinkCart();
                    this.goToActiveCartDetail();
                    this.displayBindCartBtn$.next(false);
                    this.displaySaveCartBtn$.next(false);
                }
            }));
        }
    }
    /**
     * @deprecated in 6.3: Will be removed in CXSPA-3090.
     */
    onDeeplinkCart() {
        this.deepLinkCartId = this.asmComponentService?.getSearchParameter('cartId');
        this.cartId.setValue(this.deepLinkCartId);
        this.asmComponentService?.setShowDeeplinkCartInfoAlert(true);
    }
    /**
     * @deprecated in 6.3: Will be removed in CXSPA-3090.
     */
    isDeepLinkInactiveCart() {
        const cartType = this.asmComponentService?.getSearchParameter('cartType');
        return cartType === 'inactive';
    }
    /**
     * @deprecated in 6.3: Will be removed in CXSPA-3090.
     */
    isDeepLinkActiveCart() {
        const cartType = this.asmComponentService?.getSearchParameter('cartType');
        return cartType === 'active';
    }
    openASMSaveCartDialog(inactiveCart) {
        this.launchDialogService.openDialogAndSubscribe("ASM_SAVE_CART" /* LAUNCH_CALLER.ASM_SAVE_CART */, this.saveInactiveCartElemRef, inactiveCart);
    }
    afterCloseASMSaveCartDialog() {
        this.launchDialogService.dialogClose
            .pipe(filter((result) => result === SAVE_CART_DIALOG_ACTION.SAVE), take(1), tap(() => this.loading$.next(true)))
            .subscribe();
        this.savedCartFacade
            .getSaveCartProcessSuccess()
            .pipe(filter((success) => success), take(1), tap(() => this.loading$.next(false)))
            .subscribe(() => {
            this.goToSavedCartDetails(this.deepLinkCartId);
            this.displaySaveCartBtn$.next(false);
        });
        this.savedCartFacade
            .getSaveCartProcessError()
            .pipe(filter((error) => error), take(1), tap(() => this.loading$.next(false)))
            .subscribe();
    }
    goToSavedCartDetails(cartId) {
        this.routing?.go({
            cxRoute: 'savedCartsDetails',
            params: { savedCartId: cartId },
        });
    }
    /**
     * @deprecated in 6.3: Will be removed in CXSPA-3090.
     */
    goToActiveCartDetail() {
        this.routing?.go({ cxRoute: 'cart' });
    }
}
AsmBindCartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmBindCartComponent, deps: [{ token: i1.GlobalMessageService }, { token: i2.ActiveCartFacade }, { token: i2.MultiCartFacade }, { token: i3.AsmBindCartFacade }, { token: i4.LaunchDialogService }, { token: i5.SavedCartFacade }, { token: i6.AsmComponentService, optional: true }, { token: i1.RoutingService, optional: true }, { token: i1.FeatureConfigService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
AsmBindCartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmBindCartComponent, selector: "cx-asm-bind-cart", viewQueries: [{ propertyName: "bindToCartElemRef", first: true, predicate: ["bindToCart"], descendants: true }, { propertyName: "saveInactiveCartElemRef", first: true, predicate: ["saveInactiveCart"], descendants: true }], ngImport: i0, template: "<form>\n  <label for=\"cartNumber\">{{ 'asm.bindCart.cartNumber' | cxTranslate }} </label>\n  <div\n    role=\"search\"\n    [attr.aria-label]=\"'asm.bindCart.assignCartId' | cxTranslate\"\n    class=\"cx-asm-assignCart\"\n    [class.active]=\"valid$ | async\"\n    (click)=\"cartIdElement.focus()\"\n  >\n    <input\n      autocomplete=\"off\"\n      #cartIdElement\n      formcontrolname=\"cartNumber\"\n      [formControl]=\"cartId\"\n      (keydown.enter)=\"bindCartToCustomer()\"\n      (blur)=\"resetInput()\"\n      [attr.aria-label]=\"'asm.bindCart.enterCartId' | cxTranslate\"\n    />\n    <button\n      class=\"cx-asm-reset\"\n      [attr.aria-label]=\"'asm.bindCart.resetCartId' | cxTranslate\"\n      [class.visible]=\"cartId.value?.length > 0\"\n      (click)=\"clearText()\"\n    >\n      <cx-icon class=\"cx-icon fas fa-times-circle\"></cx-icon>\n    </button>\n  </div>\n  <button\n    #bindToCart\n    *ngIf=\"displayBindCartBtn$ | async\"\n    class=\"cx-asm-bindCartToCustomer\"\n    [disabled]=\"!(valid$ | async)\"\n    type=\"submit\"\n    [class.cx-asm-active]=\"valid$ | async\"\n    [class.cx-bind-loading]=\"loading$ | async\"\n    (click)=\"bindCartToCustomer()\"\n  >\n    <span [attr.aria-hidden]=\"loading$ | async\">\n      {{ 'asm.bindCart.bindCartToCustomer' | cxTranslate }}\n    </span>\n    <cx-dot-spinner\n      [attr.aria-hidden]=\"!(loading$ | async)\"\n      [attr.aria-label]=\"'common.loading' | cxTranslate\"\n    ></cx-dot-spinner>\n  </button>\n\n  <ng-container *cxFeatureLevel=\"'6.2'\">\n    <button\n      id=\"asm-save-inactive-cart-btn\"\n      #saveInactiveCart\n      *ngIf=\"displaySaveCartBtn$ | async\"\n      class=\"cx-asm-bindCartToCustomer cx-asm-active\"\n      type=\"submit\"\n      [class.cx-bind-loading]=\"loading$ | async\"\n      (click)=\"onSaveInactiveCart()\"\n    >\n      <span [attr.aria-hidden]=\"loading$ | async\">\n        {{ 'asm.saveCart.saveCartBtn' | cxTranslate }}\n      </span>\n      <cx-dot-spinner\n        [attr.aria-hidden]=\"!(loading$ | async)\"\n        [attr.aria-label]=\"'common.loading' | cxTranslate\"\n      ></cx-dot-spinner>\n    </button>\n  </ng-container>\n</form>\n", dependencies: [{ kind: "directive", type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i8.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i8.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i8.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i8.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: i4.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i8.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FeatureLevelDirective, selector: "[cxFeatureLevel]", inputs: ["cxFeatureLevel"] }, { kind: "component", type: i9.DotSpinnerComponent, selector: "cx-dot-spinner" }, { kind: "pipe", type: i7.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmBindCartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-bind-cart', changeDetection: ChangeDetectionStrategy.OnPush, template: "<form>\n  <label for=\"cartNumber\">{{ 'asm.bindCart.cartNumber' | cxTranslate }} </label>\n  <div\n    role=\"search\"\n    [attr.aria-label]=\"'asm.bindCart.assignCartId' | cxTranslate\"\n    class=\"cx-asm-assignCart\"\n    [class.active]=\"valid$ | async\"\n    (click)=\"cartIdElement.focus()\"\n  >\n    <input\n      autocomplete=\"off\"\n      #cartIdElement\n      formcontrolname=\"cartNumber\"\n      [formControl]=\"cartId\"\n      (keydown.enter)=\"bindCartToCustomer()\"\n      (blur)=\"resetInput()\"\n      [attr.aria-label]=\"'asm.bindCart.enterCartId' | cxTranslate\"\n    />\n    <button\n      class=\"cx-asm-reset\"\n      [attr.aria-label]=\"'asm.bindCart.resetCartId' | cxTranslate\"\n      [class.visible]=\"cartId.value?.length > 0\"\n      (click)=\"clearText()\"\n    >\n      <cx-icon class=\"cx-icon fas fa-times-circle\"></cx-icon>\n    </button>\n  </div>\n  <button\n    #bindToCart\n    *ngIf=\"displayBindCartBtn$ | async\"\n    class=\"cx-asm-bindCartToCustomer\"\n    [disabled]=\"!(valid$ | async)\"\n    type=\"submit\"\n    [class.cx-asm-active]=\"valid$ | async\"\n    [class.cx-bind-loading]=\"loading$ | async\"\n    (click)=\"bindCartToCustomer()\"\n  >\n    <span [attr.aria-hidden]=\"loading$ | async\">\n      {{ 'asm.bindCart.bindCartToCustomer' | cxTranslate }}\n    </span>\n    <cx-dot-spinner\n      [attr.aria-hidden]=\"!(loading$ | async)\"\n      [attr.aria-label]=\"'common.loading' | cxTranslate\"\n    ></cx-dot-spinner>\n  </button>\n\n  <ng-container *cxFeatureLevel=\"'6.2'\">\n    <button\n      id=\"asm-save-inactive-cart-btn\"\n      #saveInactiveCart\n      *ngIf=\"displaySaveCartBtn$ | async\"\n      class=\"cx-asm-bindCartToCustomer cx-asm-active\"\n      type=\"submit\"\n      [class.cx-bind-loading]=\"loading$ | async\"\n      (click)=\"onSaveInactiveCart()\"\n    >\n      <span [attr.aria-hidden]=\"loading$ | async\">\n        {{ 'asm.saveCart.saveCartBtn' | cxTranslate }}\n      </span>\n      <cx-dot-spinner\n        [attr.aria-hidden]=\"!(loading$ | async)\"\n        [attr.aria-label]=\"'common.loading' | cxTranslate\"\n      ></cx-dot-spinner>\n    </button>\n  </ng-container>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: i1.GlobalMessageService }, { type: i2.ActiveCartFacade }, { type: i2.MultiCartFacade }, { type: i3.AsmBindCartFacade }, { type: i4.LaunchDialogService }, { type: i5.SavedCartFacade }, { type: i6.AsmComponentService, decorators: [{
                    type: Optional
                }] }, { type: i1.RoutingService, decorators: [{
                    type: Optional
                }] }, { type: i1.FeatureConfigService, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { bindToCartElemRef: [{
                type: ViewChild,
                args: ['bindToCart']
            }], saveInactiveCartElemRef: [{
                type: ViewChild,
                args: ['saveInactiveCart']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWJpbmQtY2FydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL2NvbXBvbmVudHMvYXNtLWJpbmQtY2FydC9hc20tYmluZC1jYXJ0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY29tcG9uZW50cy9hc20tYmluZC1jYXJ0L2FzbS1iaW5kLWNhcnQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUlULFFBQVEsRUFDUixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBZSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVF0RSxPQUFPLEVBR0wsaUJBQWlCLEVBRWpCLG1CQUFtQixHQUVwQixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFDTCxlQUFlLEVBQ2YsYUFBYSxFQUNiLEtBQUssRUFDTCxLQUFLLEVBQ0wsR0FBRyxFQUVILFlBQVksR0FDYixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFFBQVEsRUFDUixHQUFHLEVBQ0gsV0FBVyxFQUNYLElBQUksRUFDSixHQUFHLEdBQ0osTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUNqRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQzs7Ozs7Ozs7Ozs7QUFRakcsTUFBTSxPQUFPLG9CQUFvQjtJQTREL0IsWUFDWSxvQkFBMEMsRUFDMUMsZ0JBQWtDLEVBQ2xDLGVBQWdDLEVBQ2hDLGlCQUFvQyxFQUNwQyxtQkFBd0MsRUFDeEMsZUFBZ0MsRUFDcEIsbUJBQXlDLEVBQ3pDLE9BQXdCLEVBQ3hC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RUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFO1NBQ2hDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNPLG9CQUFvQjtRQUM1QixJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7O2lIQWpYVSxvQkFBb0I7cUdBQXBCLG9CQUFvQix1UkMzRGpDLDhuRUFrRUE7MkZEUGEsb0JBQW9CO2tCQUxoQyxTQUFTOytCQUNFLGtCQUFrQixtQkFFWCx1QkFBdUIsQ0FBQyxNQUFNOzswQkFxRTVDLFFBQVE7OzBCQUNSLFFBQVE7OzBCQUNSLFFBQVE7NENBdENjLGlCQUFpQjtzQkFBekMsU0FBUzt1QkFBQyxZQUFZO2dCQUV2Qix1QkFBdUI7c0JBRHRCLFNBQVM7dUJBQUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIFZhbGlkYXRvckZuLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQXNtQmluZENhcnRGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL2FzbS9yb290JztcbmltcG9ydCB7XG4gIEFjdGl2ZUNhcnRGYWNhZGUsXG4gIENhcnQsXG4gIE11bHRpQ2FydEZhY2FkZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBTYXZlZENhcnRGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvc2F2ZWQtY2FydC9yb290JztcbmltcG9ydCB7XG4gIEZlYXR1cmVDb25maWdTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgR2xvYmFsTWVzc2FnZVR5cGUsXG4gIEh0dHBFcnJvck1vZGVsLFxuICBPQ0NfQ0FSVF9JRF9DVVJSRU5ULFxuICBSb3V0aW5nU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IExhdW5jaERpYWxvZ1NlcnZpY2UsIExBVU5DSF9DQUxMRVIgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHtcbiAgQmVoYXZpb3JTdWJqZWN0LFxuICBjb21iaW5lTGF0ZXN0LFxuICBkZWZlcixcbiAgRU1QVFksXG4gIGlpZixcbiAgT2JzZXJ2YWJsZSxcbiAgU3Vic2NyaXB0aW9uLFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGNvbmNhdE1hcCxcbiAgZmlsdGVyLFxuICBmaW5hbGl6ZSxcbiAgbWFwLFxuICBzaGFyZVJlcGxheSxcbiAgdGFrZSxcbiAgdGFwLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBCSU5EX0NBUlRfRElBTE9HX0FDVElPTiB9IGZyb20gJy4uL2FzbS1iaW5kLWNhcnQtZGlhbG9nL2FzbS1iaW5kLWNhcnQtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTQVZFX0NBUlRfRElBTE9HX0FDVElPTiB9IGZyb20gJy4uL2FzbS1zYXZlLWNhcnQtZGlhbG9nL2FzbS1zYXZlLWNhcnQtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBc21Db21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXNtLWNvbXBvbmVudC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtYXNtLWJpbmQtY2FydCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9hc20tYmluZC1jYXJ0LmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFzbUJpbmRDYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBhY3RpdmVDYXJ0VmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChjb250cm9sKSA9PiB7XG4gICAgaWYgKGNvbnRyb2wudmFsdWUgPT09IHRoaXMuYWN0aXZlQ2FydElkKSB7XG4gICAgICByZXR1cm4geyBhY3RpdmVDYXJ0RXJyb3I6IHRydWUgfTtcbiAgICB9XG5cbiAgICBpZiAoISF0aGlzLmRlZXBMaW5rQ2FydElkICYmIGNvbnRyb2wudmFsdWUgIT09IHRoaXMuZGVlcExpbmtDYXJ0SWQpIHtcbiAgICAgIHRoaXMucmVzZXREZWVwbGlua0NhcnQoKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgY2FydElkOiBGb3JtQ29udHJvbDxzdHJpbmcgfCBudWxsPiA9IG5ldyBGb3JtQ29udHJvbCgnJywgW1xuICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgVmFsaWRhdG9ycy5taW5MZW5ndGgoMSksXG4gICAgdGhpcy5hY3RpdmVDYXJ0VmFsaWRhdG9yLFxuICBdKTtcblxuICBsb2FkaW5nJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG5cbiAgdmFsaWQkID0gdGhpcy5jYXJ0SWQuc3RhdHVzQ2hhbmdlcy5waXBlKFxuICAgIG1hcCgoc3RhdHVzKSA9PiBzdGF0dXMgPT09ICdWQUxJRCcpLFxuICAgIHNoYXJlUmVwbGF5KDEpXG4gICk7XG5cbiAgYWN0aXZlQ2FydElkID0gJyc7XG4gIGRlZXBMaW5rQ2FydElkID0gJyc7XG5cbiAgZGlzcGxheUJpbmRDYXJ0QnRuJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh0cnVlKTtcbiAgZGlzcGxheVNhdmVDYXJ0QnRuJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG5cbiAgQFZpZXdDaGlsZCgnYmluZFRvQ2FydCcpIGJpbmRUb0NhcnRFbGVtUmVmOiBFbGVtZW50UmVmPEhUTUxCdXR0b25FbGVtZW50PjtcbiAgQFZpZXdDaGlsZCgnc2F2ZUluYWN0aXZlQ2FydCcpXG4gIHNhdmVJbmFjdGl2ZUNhcnRFbGVtUmVmOiBFbGVtZW50UmVmPEhUTUxCdXR0b25FbGVtZW50PjtcblxuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgICBhY3RpdmVDYXJ0RmFjYWRlOiBBY3RpdmVDYXJ0RmFjYWRlLFxuICAgIG11bHRpQ2FydEZhY2FkZTogTXVsdGlDYXJ0RmFjYWRlLFxuICAgIGFzbUJpbmRDYXJ0RmFjYWRlOiBBc21CaW5kQ2FydEZhY2FkZSxcbiAgICBsYXVuY2hEaWFsb2dTZXJ2aWNlOiBMYXVuY2hEaWFsb2dTZXJ2aWNlLFxuICAgIHNhdmVkQ2FydEZhY2FkZTogU2F2ZWRDYXJ0RmFjYWRlLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvdW5pZmllZC1zaWduYXR1cmVzXG4gICAgYXNtQ29tcG9uZW50U2VydmljZTogQXNtQ29tcG9uZW50U2VydmljZSxcbiAgICByb3V0aW5nOiBSb3V0aW5nU2VydmljZSxcbiAgICBmZWF0dXJlQ29uZmlnOiBGZWF0dXJlQ29uZmlnU2VydmljZVxuICApO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgc2luY2UgNy4wXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBnbG9iYWxNZXNzYWdlU2VydmljZTogR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gICAgYWN0aXZlQ2FydEZhY2FkZTogQWN0aXZlQ2FydEZhY2FkZSxcbiAgICBtdWx0aUNhcnRGYWNhZGU6IE11bHRpQ2FydEZhY2FkZSxcbiAgICBhc21CaW5kQ2FydEZhY2FkZTogQXNtQmluZENhcnRGYWNhZGUsXG4gICAgbGF1bmNoRGlhbG9nU2VydmljZTogTGF1bmNoRGlhbG9nU2VydmljZSxcbiAgICBzYXZlZENhcnRGYWNhZGU6IFNhdmVkQ2FydEZhY2FkZVxuICApO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZ2xvYmFsTWVzc2FnZVNlcnZpY2U6IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhY3RpdmVDYXJ0RmFjYWRlOiBBY3RpdmVDYXJ0RmFjYWRlLFxuICAgIHByb3RlY3RlZCBtdWx0aUNhcnRGYWNhZGU6IE11bHRpQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgYXNtQmluZENhcnRGYWNhZGU6IEFzbUJpbmRDYXJ0RmFjYWRlLFxuICAgIHByb3RlY3RlZCBsYXVuY2hEaWFsb2dTZXJ2aWNlOiBMYXVuY2hEaWFsb2dTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBzYXZlZENhcnRGYWNhZGU6IFNhdmVkQ2FydEZhY2FkZSxcbiAgICBAT3B0aW9uYWwoKSBwcm90ZWN0ZWQgYXNtQ29tcG9uZW50U2VydmljZT86IEFzbUNvbXBvbmVudFNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJvdGVjdGVkIHJvdXRpbmc/OiBSb3V0aW5nU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcm90ZWN0ZWQgZmVhdHVyZUNvbmZpZz86IEZlYXR1cmVDb25maWdTZXJ2aWNlXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmliZUZvckRlZXBsaW5rQ2FydCgpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5hY3RpdmVDYXJ0RmFjYWRlLmdldEFjdGl2ZUNhcnRJZCgpLnN1YnNjcmliZSgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgdGhpcy5hY3RpdmVDYXJ0SWQgPSByZXNwb25zZSA/PyAnJztcbiAgICAgICAgdGhpcy5jYXJ0SWQuc2V0VmFsdWUodGhpcy5kZWVwTGlua0NhcnRJZCB8fCB0aGlzLmFjdGl2ZUNhcnRJZCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICByZXNldElucHV0KCkge1xuICAgIGlmICghdGhpcy5jYXJ0SWQudmFsdWUpIHtcbiAgICAgIHRoaXMuY2FydElkLnNldFZhbHVlKHRoaXMuYWN0aXZlQ2FydElkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQmluZCB0aGUgaW5wdXQgY2FydCBudW1iZXIgdG8gdGhlIGN1c3RvbWVyXG4gICAqL1xuICBiaW5kQ2FydFRvQ3VzdG9tZXIoKSB7XG4gICAgY29uc3QgYW5vbnltb3VzQ2FydElkID0gdGhpcy5jYXJ0SWQudmFsdWU7XG5cbiAgICBjb25zdCBzdWJzY3JpcHRpb24gPSBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMubG9hZGluZyQuYXNPYnNlcnZhYmxlKCksXG4gICAgICB0aGlzLnZhbGlkJCxcbiAgICBdKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2UoMSksXG4gICAgICAgIGZpbHRlcigoW2xvYWRpbmcsIHZhbGlkXSkgPT4gIWxvYWRpbmcgJiYgdmFsaWQpLFxuICAgICAgICB0YXAoKCkgPT4gdGhpcy5sb2FkaW5nJC5uZXh0KHRydWUpKSxcbiAgICAgICAgY29uY2F0TWFwKCgpID0+XG4gICAgICAgICAgdGhpcy5hY3RpdmVDYXJ0RmFjYWRlLmdldEFjdGl2ZSgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKGNhcnQpID0+IGNhcnQuZGVsaXZlcnlJdGVtc1F1YW50aXR5ID8/IDApLFxuICAgICAgICAgICAgdGFrZSgxKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgY29uY2F0TWFwKChjYXJ0SXRlbUNvdW50KSA9PlxuICAgICAgICAgIGlpZihcbiAgICAgICAgICAgICgpID0+IEJvb2xlYW4odGhpcy5hY3RpdmVDYXJ0SWQgJiYgY2FydEl0ZW1Db3VudCksXG4gICAgICAgICAgICB0aGlzLm9wZW5EaWFsb2codGhpcy5hY3RpdmVDYXJ0SWQsIGFub255bW91c0NhcnRJZCBhcyBzdHJpbmcpLFxuICAgICAgICAgICAgdGhpcy5zaW1wbGVCaW5kQ2FydChhbm9ueW1vdXNDYXJ0SWQgYXMgc3RyaW5nKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgZmluYWxpemUoKCkgPT4gdGhpcy5sb2FkaW5nJC5uZXh0KGZhbHNlKSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICBuZXh0OiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICAgICAgICB7IGtleTogJ2FzbS5iaW5kQ2FydC5zdWNjZXNzJyB9LFxuICAgICAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfQ09ORklSTUFUSU9OXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IChlcnJvcjogSHR0cEVycm9yTW9kZWwpID0+IHtcbiAgICAgICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgICAgICAgIGVycm9yLmRldGFpbHM/LlswXS5tZXNzYWdlID8/ICcnLFxuICAgICAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoc3Vic2NyaXB0aW9uKTtcbiAgfVxuXG4gIG9uU2F2ZUluYWN0aXZlQ2FydCgpIHtcbiAgICB0aGlzLmFzbUNvbXBvbmVudFNlcnZpY2U/LnNldFNob3dEZWVwbGlua0NhcnRJbmZvQWxlcnQoZmFsc2UpO1xuICAgIGNvbnN0IGN1c3RvbWVySWQgPVxuICAgICAgdGhpcy5hc21Db21wb25lbnRTZXJ2aWNlPy5nZXRTZWFyY2hQYXJhbWV0ZXIoJ2N1c3RvbWVySWQnKTtcbiAgICB0aGlzLm11bHRpQ2FydEZhY2FkZS5sb2FkQ2FydCh7XG4gICAgICBjYXJ0SWQ6IHRoaXMuZGVlcExpbmtDYXJ0SWQsXG4gICAgICB1c2VySWQ6IGN1c3RvbWVySWQgYXMgc3RyaW5nLFxuICAgIH0pO1xuXG4gICAgdGhpcy5tdWx0aUNhcnRGYWNhZGVcbiAgICAgIC5nZXRDYXJ0RW50aXR5KHRoaXMuZGVlcExpbmtDYXJ0SWQpXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKChzdGF0ZSkgPT4gc3RhdGUubG9hZGluZyA9PT0gZmFsc2UgJiYgc3RhdGUuc3VjY2VzcyA9PT0gdHJ1ZSksXG4gICAgICAgIHRha2UoMSksXG4gICAgICAgIG1hcCgoc3RhdGUpID0+IHN0YXRlLnZhbHVlIGFzIENhcnQpLFxuICAgICAgICBmaWx0ZXIoKGNhcnQpID0+ICEhY2FydClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKGNhcnQpID0+IHtcbiAgICAgICAgdGhpcy5vcGVuQVNNU2F2ZUNhcnREaWFsb2coY2FydCk7XG4gICAgICB9KTtcblxuICAgIHRoaXMuYWZ0ZXJDbG9zZUFTTVNhdmVDYXJ0RGlhbG9nKCk7XG4gIH1cblxuICBjbGVhclRleHQoKSB7XG4gICAgdGhpcy5jYXJ0SWQuc2V0VmFsdWUoJycpO1xuICAgIHRoaXMucmVzZXREZWVwbGlua0NhcnQoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZXNldERlZXBsaW5rQ2FydCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5mZWF0dXJlQ29uZmlnPy5pc0xldmVsKCc2LjInKSkge1xuICAgICAgdGhpcy5kZWVwTGlua0NhcnRJZCA9ICcnO1xuICAgICAgdGhpcy5kaXNwbGF5QmluZENhcnRCdG4kLm5leHQodHJ1ZSk7XG4gICAgICB0aGlzLmRpc3BsYXlTYXZlQ2FydEJ0biQubmV4dChmYWxzZSk7XG4gICAgICB0aGlzLmFzbUNvbXBvbmVudFNlcnZpY2U/LnNldFNob3dEZWVwbGlua0NhcnRJbmZvQWxlcnQoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogQmluZHMgY2FydCBvbiBzdWJzY3JpcHRpb24gYW5kIHJlbG9hZHMgY2FydFxuICAgKi9cbiAgcHJvdGVjdGVkIHNpbXBsZUJpbmRDYXJ0KGFub255bW91c0NhcnRJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTx1bmtub3duPiB7XG4gICAgcmV0dXJuIGRlZmVyKCgpID0+IHRoaXMuYXNtQmluZENhcnRGYWNhZGUuYmluZENhcnQoYW5vbnltb3VzQ2FydElkKSkucGlwZShcbiAgICAgIHRhcCgoKSA9PiB0aGlzLm11bHRpQ2FydEZhY2FkZS5yZWxvYWRDYXJ0KE9DQ19DQVJUX0lEX0NVUlJFTlQpKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgZGlhbG9nIGFuZCBwYXNzZXMgbm9uLWNhbmNlbCByZXN1bHQgdG8gc2VsZWN0IGFjdGlvblxuICAgKi9cbiAgcHJvdGVjdGVkIG9wZW5EaWFsb2coYWN0aXZlQ2FydElkOiBzdHJpbmcsIGFub255bW91c0NhcnRJZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGRlZmVyKCgpID0+IHtcbiAgICAgIHRoaXMubGF1bmNoRGlhbG9nU2VydmljZS5vcGVuRGlhbG9nQW5kU3Vic2NyaWJlKFxuICAgICAgICBMQVVOQ0hfQ0FMTEVSLkFTTV9CSU5EX0NBUlQsXG4gICAgICAgIHRoaXMuYmluZFRvQ2FydEVsZW1SZWZcbiAgICAgICk7XG4gICAgICByZXR1cm4gdGhpcy5sYXVuY2hEaWFsb2dTZXJ2aWNlLmRpYWxvZ0Nsb3NlLnBpcGUoXG4gICAgICAgIGZpbHRlcigocmVzdWx0KSA9PiBCb29sZWFuKHJlc3VsdCkpLFxuICAgICAgICB0YWtlKDEpXG4gICAgICApIGFzIE9ic2VydmFibGU8QklORF9DQVJUX0RJQUxPR19BQ1RJT04+O1xuICAgIH0pLnBpcGUoXG4gICAgICBmaWx0ZXIoKGRpYWxvZ1Jlc3VsdCkgPT4gQm9vbGVhbihkaWFsb2dSZXN1bHQpKSxcbiAgICAgIGNvbmNhdE1hcCgoZGlhbG9nUmVzdWx0KSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdEJpbmRBY3Rpb24oXG4gICAgICAgICAgYWN0aXZlQ2FydElkLFxuICAgICAgICAgIGFub255bW91c0NhcnRJZCxcbiAgICAgICAgICBkaWFsb2dSZXN1bHRcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZWxlY3RCaW5kQWN0aW9uKFxuICAgIGFjdGl2ZUNhcnRJZDogc3RyaW5nLFxuICAgIGFub255bW91c0NhcnRJZDogc3RyaW5nLFxuICAgIGFjdGlvbjogQklORF9DQVJUX0RJQUxPR19BQ1RJT05cbiAgKTogT2JzZXJ2YWJsZTx1bmtub3duPiB7XG4gICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgIGNhc2UgQklORF9DQVJUX0RJQUxPR19BQ1RJT04uUkVQTEFDRTpcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZUNhcnQoYWN0aXZlQ2FydElkLCBhbm9ueW1vdXNDYXJ0SWQpO1xuXG4gICAgICBjYXNlIEJJTkRfQ0FSVF9ESUFMT0dfQUNUSU9OLkNBTkNFTDpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBFTVBUWTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVwbGFjZUNhcnQoXG4gICAgcHJldmlvdXNBY3RpdmVDYXJ0SWQ6IHN0cmluZyxcbiAgICBhbm9ueW1vdXNDYXJ0SWQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5zaW1wbGVCaW5kQ2FydChhbm9ueW1vdXNDYXJ0SWQpLnBpcGUoXG4gICAgICB0YXAoKCkgPT4ge1xuICAgICAgICB0aGlzLnNhdmVkQ2FydEZhY2FkZS5zYXZlQ2FydCh7XG4gICAgICAgICAgY2FydElkOiBwcmV2aW91c0FjdGl2ZUNhcnRJZCxcbiAgICAgICAgICBzYXZlQ2FydE5hbWU6IHByZXZpb3VzQWN0aXZlQ2FydElkLFxuICAgICAgICAgIC8vIFRPRE8oIzEyNjYwKTogUmVtb3ZlIGRlZmF1bHQgdmFsdWUgb25jZSBiYWNrZW5kIGlzIHVwZGF0ZWRcbiAgICAgICAgICBzYXZlQ2FydERlc2NyaXB0aW9uOiAnLScsXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLy8gVE9ETyhDWFNQQS0zMDkwKTogUmVtb3ZlIG9wdGlvbmFsIHNlcnZpY2UgZmxhZ3MgaW4gNy4wXG4gIHByb3RlY3RlZCBzdWJzY3JpYmVGb3JEZWVwbGlua0NhcnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZmVhdHVyZUNvbmZpZz8uaXNMZXZlbCgnNi4yJykpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgICAgdGhpcy5hc21Db21wb25lbnRTZXJ2aWNlXG4gICAgICAgICAgPy5pc0VtdWxhdGVkQnlEZWVwTGluaygpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgICAgIChlbXVsYXRlZCkgPT5cbiAgICAgICAgICAgICAgICBlbXVsYXRlZCAmJlxuICAgICAgICAgICAgICAgICEhdGhpcy5hc21Db21wb25lbnRTZXJ2aWNlPy5nZXRTZWFyY2hQYXJhbWV0ZXIoJ2NhcnRJZCcpXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgLy8gVE9ETyhDWFNQQS0zMDkwKTogUmVtb3ZlIGZlYXR1cmUgZmxhZyBpbiA3LjAuXG4gICAgICAgICAgICBpZiAodGhpcy5mZWF0dXJlQ29uZmlnPy5pc0xldmVsKCc2LjMnKSkge1xuICAgICAgICAgICAgICBjb25zdCBjYXJ0VHlwZSA9XG4gICAgICAgICAgICAgICAgdGhpcy5hc21Db21wb25lbnRTZXJ2aWNlPy5nZXRTZWFyY2hQYXJhbWV0ZXIoJ2NhcnRUeXBlJyk7XG4gICAgICAgICAgICAgIGlmIChjYXJ0VHlwZSA9PT0gJ2luYWN0aXZlJyB8fCBjYXJ0VHlwZSA9PT0gJ2FjdGl2ZScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlCaW5kQ2FydEJ0biQubmV4dChmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5U2F2ZUNhcnRCdG4kLm5leHQoY2FydFR5cGUgPT09ICdpbmFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVlcExpbmtDYXJ0SWQgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5hc21Db21wb25lbnRTZXJ2aWNlPy5nZXRTZWFyY2hQYXJhbWV0ZXIoXG4gICAgICAgICAgICAgICAgICAgICdjYXJ0SWQnXG4gICAgICAgICAgICAgICAgICApIGFzIHN0cmluZztcbiAgICAgICAgICAgICAgICB0aGlzLmNhcnRJZC5zZXRWYWx1ZSh0aGlzLmRlZXBMaW5rQ2FydElkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFzbUNvbXBvbmVudFNlcnZpY2U/LnNldFNob3dEZWVwbGlua0NhcnRJbmZvQWxlcnQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5hc21Db21wb25lbnRTZXJ2aWNlPy5oYW5kbGVEZWVwTGlua05hdmlnYXRpb24oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRPRE8oQ1hTUEEtMzA5MCk6IFJlbW92ZSB0aGlzIGltcGxlbWVudGF0aW9uIGluIDcuMFxuICAgICAgICAgICAgaWYgKHRoaXMuaXNEZWVwTGlua0luYWN0aXZlQ2FydCgpKSB7XG4gICAgICAgICAgICAgIHRoaXMuZGlzcGxheUJpbmRDYXJ0QnRuJC5uZXh0KGZhbHNlKTtcbiAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5U2F2ZUNhcnRCdG4kLm5leHQodHJ1ZSk7XG4gICAgICAgICAgICAgIHRoaXMub25EZWVwbGlua0NhcnQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0RlZXBMaW5rQWN0aXZlQ2FydCgpKSB7XG4gICAgICAgICAgICAgIHRoaXMub25EZWVwbGlua0NhcnQoKTtcbiAgICAgICAgICAgICAgdGhpcy5nb1RvQWN0aXZlQ2FydERldGFpbCgpO1xuICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlCaW5kQ2FydEJ0biQubmV4dChmYWxzZSk7XG4gICAgICAgICAgICAgIHRoaXMuZGlzcGxheVNhdmVDYXJ0QnRuJC5uZXh0KGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgaW4gNi4zOiBXaWxsIGJlIHJlbW92ZWQgaW4gQ1hTUEEtMzA5MC5cbiAgICovXG4gIHByb3RlY3RlZCBvbkRlZXBsaW5rQ2FydCgpOiB2b2lkIHtcbiAgICB0aGlzLmRlZXBMaW5rQ2FydElkID0gdGhpcy5hc21Db21wb25lbnRTZXJ2aWNlPy5nZXRTZWFyY2hQYXJhbWV0ZXIoXG4gICAgICAnY2FydElkJ1xuICAgICkgYXMgc3RyaW5nO1xuICAgIHRoaXMuY2FydElkLnNldFZhbHVlKHRoaXMuZGVlcExpbmtDYXJ0SWQpO1xuICAgIHRoaXMuYXNtQ29tcG9uZW50U2VydmljZT8uc2V0U2hvd0RlZXBsaW5rQ2FydEluZm9BbGVydCh0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBpbiA2LjM6IFdpbGwgYmUgcmVtb3ZlZCBpbiBDWFNQQS0zMDkwLlxuICAgKi9cbiAgcHJvdGVjdGVkIGlzRGVlcExpbmtJbmFjdGl2ZUNhcnQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgY2FydFR5cGUgPSB0aGlzLmFzbUNvbXBvbmVudFNlcnZpY2U/LmdldFNlYXJjaFBhcmFtZXRlcignY2FydFR5cGUnKTtcbiAgICByZXR1cm4gY2FydFR5cGUgPT09ICdpbmFjdGl2ZSc7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgaW4gNi4zOiBXaWxsIGJlIHJlbW92ZWQgaW4gQ1hTUEEtMzA5MC5cbiAgICovXG4gIHByb3RlY3RlZCBpc0RlZXBMaW5rQWN0aXZlQ2FydCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBjYXJ0VHlwZSA9IHRoaXMuYXNtQ29tcG9uZW50U2VydmljZT8uZ2V0U2VhcmNoUGFyYW1ldGVyKCdjYXJ0VHlwZScpO1xuICAgIHJldHVybiBjYXJ0VHlwZSA9PT0gJ2FjdGl2ZSc7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3BlbkFTTVNhdmVDYXJ0RGlhbG9nKGluYWN0aXZlQ2FydDogQ2FydCk6IHZvaWQge1xuICAgIHRoaXMubGF1bmNoRGlhbG9nU2VydmljZS5vcGVuRGlhbG9nQW5kU3Vic2NyaWJlKFxuICAgICAgTEFVTkNIX0NBTExFUi5BU01fU0FWRV9DQVJULFxuICAgICAgdGhpcy5zYXZlSW5hY3RpdmVDYXJ0RWxlbVJlZixcbiAgICAgIGluYWN0aXZlQ2FydFxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWZ0ZXJDbG9zZUFTTVNhdmVDYXJ0RGlhbG9nKCk6IHZvaWQge1xuICAgIHRoaXMubGF1bmNoRGlhbG9nU2VydmljZS5kaWFsb2dDbG9zZVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigocmVzdWx0KSA9PiByZXN1bHQgPT09IFNBVkVfQ0FSVF9ESUFMT0dfQUNUSU9OLlNBVkUpLFxuICAgICAgICB0YWtlKDEpLFxuICAgICAgICB0YXAoKCkgPT4gdGhpcy5sb2FkaW5nJC5uZXh0KHRydWUpKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgpO1xuXG4gICAgdGhpcy5zYXZlZENhcnRGYWNhZGVcbiAgICAgIC5nZXRTYXZlQ2FydFByb2Nlc3NTdWNjZXNzKClcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKHN1Y2Nlc3MpID0+IHN1Y2Nlc3MpLFxuICAgICAgICB0YWtlKDEpLFxuICAgICAgICB0YXAoKCkgPT4gdGhpcy5sb2FkaW5nJC5uZXh0KGZhbHNlKSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmdvVG9TYXZlZENhcnREZXRhaWxzKHRoaXMuZGVlcExpbmtDYXJ0SWQpO1xuICAgICAgICB0aGlzLmRpc3BsYXlTYXZlQ2FydEJ0biQubmV4dChmYWxzZSk7XG4gICAgICB9KTtcblxuICAgIHRoaXMuc2F2ZWRDYXJ0RmFjYWRlXG4gICAgICAuZ2V0U2F2ZUNhcnRQcm9jZXNzRXJyb3IoKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoZXJyb3IpID0+IGVycm9yKSxcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgdGFwKCgpID0+IHRoaXMubG9hZGluZyQubmV4dChmYWxzZSkpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ29Ub1NhdmVkQ2FydERldGFpbHMoY2FydElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnJvdXRpbmc/LmdvKHtcbiAgICAgIGN4Um91dGU6ICdzYXZlZENhcnRzRGV0YWlscycsXG4gICAgICBwYXJhbXM6IHsgc2F2ZWRDYXJ0SWQ6IGNhcnRJZCB9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIGluIDYuMzogV2lsbCBiZSByZW1vdmVkIGluIENYU1BBLTMwOTAuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ29Ub0FjdGl2ZUNhcnREZXRhaWwoKTogdm9pZCB7XG4gICAgdGhpcy5yb3V0aW5nPy5nbyh7IGN4Um91dGU6ICdjYXJ0JyB9KTtcbiAgfVxufVxuIiwiPGZvcm0+XG4gIDxsYWJlbCBmb3I9XCJjYXJ0TnVtYmVyXCI+e3sgJ2FzbS5iaW5kQ2FydC5jYXJ0TnVtYmVyJyB8IGN4VHJhbnNsYXRlIH19IDwvbGFiZWw+XG4gIDxkaXZcbiAgICByb2xlPVwic2VhcmNoXCJcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIidhc20uYmluZENhcnQuYXNzaWduQ2FydElkJyB8IGN4VHJhbnNsYXRlXCJcbiAgICBjbGFzcz1cImN4LWFzbS1hc3NpZ25DYXJ0XCJcbiAgICBbY2xhc3MuYWN0aXZlXT1cInZhbGlkJCB8IGFzeW5jXCJcbiAgICAoY2xpY2spPVwiY2FydElkRWxlbWVudC5mb2N1cygpXCJcbiAgPlxuICAgIDxpbnB1dFxuICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICAgICNjYXJ0SWRFbGVtZW50XG4gICAgICBmb3JtY29udHJvbG5hbWU9XCJjYXJ0TnVtYmVyXCJcbiAgICAgIFtmb3JtQ29udHJvbF09XCJjYXJ0SWRcIlxuICAgICAgKGtleWRvd24uZW50ZXIpPVwiYmluZENhcnRUb0N1c3RvbWVyKClcIlxuICAgICAgKGJsdXIpPVwicmVzZXRJbnB1dCgpXCJcbiAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiJ2FzbS5iaW5kQ2FydC5lbnRlckNhcnRJZCcgfCBjeFRyYW5zbGF0ZVwiXG4gICAgLz5cbiAgICA8YnV0dG9uXG4gICAgICBjbGFzcz1cImN4LWFzbS1yZXNldFwiXG4gICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIidhc20uYmluZENhcnQucmVzZXRDYXJ0SWQnIHwgY3hUcmFuc2xhdGVcIlxuICAgICAgW2NsYXNzLnZpc2libGVdPVwiY2FydElkLnZhbHVlPy5sZW5ndGggPiAwXCJcbiAgICAgIChjbGljayk9XCJjbGVhclRleHQoKVwiXG4gICAgPlxuICAgICAgPGN4LWljb24gY2xhc3M9XCJjeC1pY29uIGZhcyBmYS10aW1lcy1jaXJjbGVcIj48L2N4LWljb24+XG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuICA8YnV0dG9uXG4gICAgI2JpbmRUb0NhcnRcbiAgICAqbmdJZj1cImRpc3BsYXlCaW5kQ2FydEJ0biQgfCBhc3luY1wiXG4gICAgY2xhc3M9XCJjeC1hc20tYmluZENhcnRUb0N1c3RvbWVyXCJcbiAgICBbZGlzYWJsZWRdPVwiISh2YWxpZCQgfCBhc3luYylcIlxuICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgIFtjbGFzcy5jeC1hc20tYWN0aXZlXT1cInZhbGlkJCB8IGFzeW5jXCJcbiAgICBbY2xhc3MuY3gtYmluZC1sb2FkaW5nXT1cImxvYWRpbmckIHwgYXN5bmNcIlxuICAgIChjbGljayk9XCJiaW5kQ2FydFRvQ3VzdG9tZXIoKVwiXG4gID5cbiAgICA8c3BhbiBbYXR0ci5hcmlhLWhpZGRlbl09XCJsb2FkaW5nJCB8IGFzeW5jXCI+XG4gICAgICB7eyAnYXNtLmJpbmRDYXJ0LmJpbmRDYXJ0VG9DdXN0b21lcicgfCBjeFRyYW5zbGF0ZSB9fVxuICAgIDwvc3Bhbj5cbiAgICA8Y3gtZG90LXNwaW5uZXJcbiAgICAgIFthdHRyLmFyaWEtaGlkZGVuXT1cIiEobG9hZGluZyQgfCBhc3luYylcIlxuICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCInY29tbW9uLmxvYWRpbmcnIHwgY3hUcmFuc2xhdGVcIlxuICAgID48L2N4LWRvdC1zcGlubmVyPlxuICA8L2J1dHRvbj5cblxuICA8bmctY29udGFpbmVyICpjeEZlYXR1cmVMZXZlbD1cIic2LjInXCI+XG4gICAgPGJ1dHRvblxuICAgICAgaWQ9XCJhc20tc2F2ZS1pbmFjdGl2ZS1jYXJ0LWJ0blwiXG4gICAgICAjc2F2ZUluYWN0aXZlQ2FydFxuICAgICAgKm5nSWY9XCJkaXNwbGF5U2F2ZUNhcnRCdG4kIHwgYXN5bmNcIlxuICAgICAgY2xhc3M9XCJjeC1hc20tYmluZENhcnRUb0N1c3RvbWVyIGN4LWFzbS1hY3RpdmVcIlxuICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICBbY2xhc3MuY3gtYmluZC1sb2FkaW5nXT1cImxvYWRpbmckIHwgYXN5bmNcIlxuICAgICAgKGNsaWNrKT1cIm9uU2F2ZUluYWN0aXZlQ2FydCgpXCJcbiAgICA+XG4gICAgICA8c3BhbiBbYXR0ci5hcmlhLWhpZGRlbl09XCJsb2FkaW5nJCB8IGFzeW5jXCI+XG4gICAgICAgIHt7ICdhc20uc2F2ZUNhcnQuc2F2ZUNhcnRCdG4nIHwgY3hUcmFuc2xhdGUgfX1cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxjeC1kb3Qtc3Bpbm5lclxuICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCIhKGxvYWRpbmckIHwgYXN5bmMpXCJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCInY29tbW9uLmxvYWRpbmcnIHwgY3hUcmFuc2xhdGVcIlxuICAgICAgPjwvY3gtZG90LXNwaW5uZXI+XG4gICAgPC9idXR0b24+XG4gIDwvbmctY29udGFpbmVyPlxuPC9mb3JtPlxuIl19