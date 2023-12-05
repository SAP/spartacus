import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, Optional, ViewChild, NgModule, ChangeDetectionStrategy, Injectable, HostListener } from '@angular/core';
import * as i1 from '@spartacus/cart/base/root';
import { CartType, CartOutlets } from '@spartacus/cart/base/root';
import * as i2$2 from '@spartacus/pickup-in-store/root';
import { cartWithIdAndUserId, getProperty } from '@spartacus/pickup-in-store/root';
import { Subscription, EMPTY, iif, of, combineLatest } from 'rxjs';
import { map, filter, take, tap, startWith, withLatestFrom, switchMap, concatMap, mergeMap } from 'rxjs/operators';
import * as i1$1 from '@spartacus/storefront';
import { ICON_TYPE, IconModule, provideOutlet, OutletPosition, SpinnerModule, CardModule, MediaModule, DIALOG_TYPE, KeyboardFocusModule, OutletModule } from '@spartacus/storefront';
import * as i2$1 from '@spartacus/core';
import { I18nModule, ConfigModule, UrlModule, provideDefaultConfig } from '@spartacus/core';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from '@angular/forms';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import * as i3$1 from '@spartacus/storefinder/root';
import { StoreFinderOutlets } from '@spartacus/storefinder/root';
import { storeHasStock } from '@spartacus/pickup-in-store/core';
import * as i3$2 from '@spartacus/order/root';
import { OrderOutlets } from '@spartacus/order/root';
import * as i4 from '@angular/router';
import { RouterModule } from '@angular/router';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The presentational component of a pair of radio buttons for pickup options for a product.
 */
class PickupOptionsComponent {
    constructor() {
        // /** Disable Radio Buttons */
        this.disableControls = false;
        /** Emitted when the selected option is changed. */
        this.pickupOptionChange = new EventEmitter();
        /** Emitted when a new store should be selected. */
        this.pickupLocationChange = new EventEmitter();
        this.pickupId = `pickup-id:${Math.random().toString(16)}`;
        this.deliveryId = `delivery-id:${Math.random().toString(16)}`;
        this.pickupOptionsForm = new FormGroup({
            pickupOption: new FormControl(null),
        });
    }
    ngOnChanges() {
        if (this.disableControls) {
            this.pickupOptionsForm.get('pickupOption')?.disable();
        }
        this.pickupOptionsForm.markAllAsTouched();
        this.pickupOptionsForm.get('pickupOption')?.setValue(this.selectedOption);
    }
    /** Emit a new selected option. */
    onPickupOptionChange(option) {
        this.pickupOptionChange.emit(option);
    }
    /** Emit to indicate a new store should be selected. */
    onPickupLocationChange() {
        this.pickupLocationChange.emit();
        // Return false to stop `onPickupOptionChange` being called after this
        return false;
    }
}
PickupOptionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
PickupOptionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: PickupOptionsComponent, selector: "cx-pickup-options", inputs: { selectedOption: "selectedOption", displayPickupLocation: "displayPickupLocation", disableControls: "disableControls" }, outputs: { pickupOptionChange: "pickupOptionChange", pickupLocationChange: "pickupLocationChange" }, usesOnChanges: true, ngImport: i0, template: "<form [formGroup]=\"pickupOptionsForm\">\n  <div class=\"form-check\">\n    <input\n      type=\"radio\"\n      role=\"radio\"\n      [attr.id]=\"deliveryId\"\n      data-pickup=\"delivery\"\n      value=\"delivery\"\n      (click)=\"onPickupOptionChange('delivery')\"\n      formControlName=\"pickupOption\"\n      [attr.aria-label]=\"'pickupOptions.delivery' | cxTranslate\"\n      [attr.aria-checked]=\"pickupOptionsForm.value.pickupOption === 'delivery'\"\n    />\n    <label [attr.for]=\"deliveryId\">\n      {{ 'pickupOptions.delivery' | cxTranslate }}\n    </label>\n  </div>\n  <div class=\"form-check\">\n    <input\n      type=\"radio\"\n      role=\"radio\"\n      [attr.id]=\"pickupId\"\n      data-pickup=\"pickup\"\n      value=\"pickup\"\n      (click)=\"onPickupOptionChange('pickup')\"\n      formControlName=\"pickupOption\"\n      [attr.aria-label]=\"'pickupOptions.pickup' | cxTranslate\"\n      [attr.aria-checked]=\"pickupOptionsForm.value.pickupOption === 'pickup'\"\n    />\n    <label [attr.for]=\"pickupId\">\n      <p>\n        {{ 'pickupOptions.pickup' | cxTranslate\n        }}<ng-container *ngIf=\"displayPickupLocation\"\n          >:\n          <strong [attr.data-pickup-location]=\"displayPickupLocation\">{{\n            displayPickupLocation\n          }}</strong>\n        </ng-container>\n        |\n        <a\n          role=\"button\"\n          [attr.data-store-location-link]=\"\n            displayPickupLocation ? 'change' : 'select'\n          \"\n          class=\"cx-action-link\"\n          (click)=\"onPickupLocationChange()\"\n          tabindex=\"0\"\n          >{{\n            (displayPickupLocation\n              ? 'pickupOptions.changeStore'\n              : 'pickupOptions.selectStore'\n            ) | cxTranslate\n          }}</a\n        >\n      </p>\n    </label>\n  </div>\n</form>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.RadioControlValueAccessor, selector: "input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]", inputs: ["name", "formControlName", "value"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "pipe", type: i2$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-pickup-options', template: "<form [formGroup]=\"pickupOptionsForm\">\n  <div class=\"form-check\">\n    <input\n      type=\"radio\"\n      role=\"radio\"\n      [attr.id]=\"deliveryId\"\n      data-pickup=\"delivery\"\n      value=\"delivery\"\n      (click)=\"onPickupOptionChange('delivery')\"\n      formControlName=\"pickupOption\"\n      [attr.aria-label]=\"'pickupOptions.delivery' | cxTranslate\"\n      [attr.aria-checked]=\"pickupOptionsForm.value.pickupOption === 'delivery'\"\n    />\n    <label [attr.for]=\"deliveryId\">\n      {{ 'pickupOptions.delivery' | cxTranslate }}\n    </label>\n  </div>\n  <div class=\"form-check\">\n    <input\n      type=\"radio\"\n      role=\"radio\"\n      [attr.id]=\"pickupId\"\n      data-pickup=\"pickup\"\n      value=\"pickup\"\n      (click)=\"onPickupOptionChange('pickup')\"\n      formControlName=\"pickupOption\"\n      [attr.aria-label]=\"'pickupOptions.pickup' | cxTranslate\"\n      [attr.aria-checked]=\"pickupOptionsForm.value.pickupOption === 'pickup'\"\n    />\n    <label [attr.for]=\"pickupId\">\n      <p>\n        {{ 'pickupOptions.pickup' | cxTranslate\n        }}<ng-container *ngIf=\"displayPickupLocation\"\n          >:\n          <strong [attr.data-pickup-location]=\"displayPickupLocation\">{{\n            displayPickupLocation\n          }}</strong>\n        </ng-container>\n        |\n        <a\n          role=\"button\"\n          [attr.data-store-location-link]=\"\n            displayPickupLocation ? 'change' : 'select'\n          \"\n          class=\"cx-action-link\"\n          (click)=\"onPickupLocationChange()\"\n          tabindex=\"0\"\n          >{{\n            (displayPickupLocation\n              ? 'pickupOptions.changeStore'\n              : 'pickupOptions.selectStore'\n            ) | cxTranslate\n          }}</a\n        >\n      </p>\n    </label>\n  </div>\n</form>\n" }]
        }], propDecorators: { selectedOption: [{
                type: Input
            }], displayPickupLocation: [{
                type: Input
            }], disableControls: [{
                type: Input
            }], pickupOptionChange: [{
                type: Output
            }], pickupLocationChange: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/** Custom type guard to ensure we have an order entry with all the required fields */
function orderEntryWithRequiredFields(orderEntry) {
    return (!!orderEntry &&
        orderEntry.entryNumber !== undefined &&
        orderEntry.quantity !== undefined &&
        orderEntry.product !== undefined &&
        orderEntry.product.code !== undefined &&
        orderEntry.product.availableForPickup !== undefined);
}
/**
 * A container component of the pair of the pickup options radio buttons for cart entry.
 */
class CartPickupOptionsContainerComponent {
    constructor(activeCartFacade, launchDialogService, pickupLocationsSearchService, pickupOptionFacade, preferredStoreFacade, vcr, cmsService, intendedPickupLocationService, outlet) {
        this.activeCartFacade = activeCartFacade;
        this.launchDialogService = launchDialogService;
        this.pickupLocationsSearchService = pickupLocationsSearchService;
        this.pickupOptionFacade = pickupOptionFacade;
        this.preferredStoreFacade = preferredStoreFacade;
        this.vcr = vcr;
        this.cmsService = cmsService;
        this.intendedPickupLocationService = intendedPickupLocationService;
        this.outlet = outlet;
        this.subscription = new Subscription();
        this.displayNameIsSet = false;
        this.CartType = CartType;
        // Intentional empty constructor
    }
    ngOnInit() {
        const outletContext = this.outlet?.context$?.pipe(map((context) => {
            this.cartType = context.cartType;
            return context.item;
        }), filter(orderEntryWithRequiredFields)) ?? EMPTY;
        this.cmsService
            .getCurrentPage()
            .pipe(filter(Boolean), take(1), tap((cmsPage) => {
            this.page = cmsPage.pageId;
            this.pickupOptionFacade.setPageContext(cmsPage.pageId ?? '');
        }))
            .subscribe();
        this.availableForPickup$ = outletContext.pipe(map((orderEntry) => !!orderEntry.product.availableForPickup), startWith(false));
        this.pickupOption$ = outletContext.pipe(withLatestFrom(this.activeCartFacade.getActive().pipe(filter(cartWithIdAndUserId))), tap(([orderEntry, cart]) => {
            this.entryNumber = orderEntry.entryNumber;
            this.quantity = orderEntry.quantity;
            this.productCode = orderEntry.product.code;
            this.cartId = cart.user.uid === 'anonymous' ? cart.guid : cart.code;
            this.userId = cart.user.uid;
        }), switchMap(([orderEntry]) => {
            const pickupOption = orderEntry.deliveryPointOfService
                ? 'pickup'
                : 'delivery';
            this.pickupOptionFacade.setPickupOption(this.entryNumber, pickupOption);
            return this.pickupOptionFacade.getPickupOption(this.entryNumber);
        }));
        this.disableControls$ = this.activeCartFacade.getEntries().pipe(map((entries) => entries.map((entry) => entry.product?.code)), switchMap((productCodes) => outletContext.pipe(map((orderEntry) => orderEntry?.product.code), map((orderEntry) => productCodes.filter((productCode) => productCode === orderEntry)
            .length > 1))));
        this.storeDetails$ = outletContext.pipe(map((orderEntry) => ({
            storeName: orderEntry.deliveryPointOfService?.name,
            productCode: orderEntry.product.code,
        })), switchMap(({ storeName, productCode }) => iif(() => !!storeName, of(storeName).pipe(tap((_storeName) => {
            return this.pickupLocationsSearchService.loadStoreDetails(_storeName);
        }), concatMap((_storeName) => this.pickupLocationsSearchService.getStoreDetails(_storeName)), filter((storeDetails) => !!storeDetails), tap((storeDetails) => {
            this.intendedPickupLocationService.setIntendedLocation(productCode, {
                ...storeDetails,
                pickupOption: 'pickup',
            });
        })), this.intendedPickupLocationService
            .getIntendedLocation(productCode)
            .pipe(map((intendedLocation) => ({
            intendedLocation,
            givenProductCode: productCode,
        })), switchMap(({ intendedLocation, givenProductCode }) => iif(() => !!intendedLocation && !!intendedLocation.displayName, of({
            displayName: getProperty(intendedLocation, 'displayName'),
            name: getProperty(intendedLocation, 'name'),
        }), this.preferredStoreFacade
            .getPreferredStoreWithProductInStock(productCode)
            .pipe(map(({ name }) => name), tap((_storeName) => this.pickupLocationsSearchService.loadStoreDetails(_storeName)), concatMap((_storeName) => this.pickupLocationsSearchService.getStoreDetails(_storeName)), filter((storeDetails) => !!storeDetails), tap((storeDetails) => {
            this.intendedPickupLocationService.setIntendedLocation(givenProductCode, {
                ...storeDetails,
                pickupOption: 'delivery',
            });
        }))))))), map(({ displayName, name }) => ({ displayName, name })), tap((_) => (this.displayNameIsSet = true)));
    }
    onPickupOptionChange(pickupOption) {
        this.pickupOptionFacade.setPickupOption(this.entryNumber, pickupOption);
        if (pickupOption === 'delivery') {
            this.activeCartFacade.updateEntry(this.entryNumber, this.quantity, undefined, true);
            return;
        }
        [pickupOption]
            .filter((option) => option === 'pickup')
            .forEach(() => {
            this.subscription.add(this.storeDetails$
                .pipe(filter(({ name }) => !!name), tap(({ name }) => this.activeCartFacade.updateEntry(this.entryNumber, this.quantity, name, true)))
                .subscribe());
        });
        if (!this.displayNameIsSet) {
            this.openDialog();
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    openDialog() {
        const dialog = this.launchDialogService.openDialog("PICKUP_IN_STORE" /* LAUNCH_CALLER.PICKUP_IN_STORE */, this.element, this.vcr, {
            productCode: this.productCode,
            entryNumber: this.entryNumber,
            quantity: this.quantity,
        });
        if (dialog) {
            dialog.pipe(take(1)).subscribe();
        }
    }
}
CartPickupOptionsContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPickupOptionsContainerComponent, deps: [{ token: i1.ActiveCartFacade }, { token: i1$1.LaunchDialogService }, { token: i2$2.PickupLocationsSearchFacade }, { token: i2$2.PickupOptionFacade }, { token: i2$2.PreferredStoreFacade }, { token: i0.ViewContainerRef }, { token: i2$1.CmsService }, { token: i2$2.IntendedPickupLocationFacade }, { token: i1$1.OutletContextData, optional: true }], target: i0.ɵɵFactoryTarget.Component });
CartPickupOptionsContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CartPickupOptionsContainerComponent, selector: "cx-cart-pickup-options-container", viewQueries: [{ propertyName: "element", first: true, predicate: ["open"], descendants: true }], ngImport: i0, template: "<ng-container\n  *ngIf=\"\n    (availableForPickup$ | async) &&\n    !(outlet?.context$ | async)?.orderCode &&\n    !(this.cartType === CartType.SELECTIVE)\n  \"\n>\n  <cx-pickup-options\n    [disableControls]=\"disableControls$ | async\"\n    [displayPickupLocation]=\"(storeDetails$ | async)?.displayName\"\n    [selectedOption]=\"pickupOption$ | async\"\n    (pickupOptionChange)=\"onPickupOptionChange($event)\"\n    (pickupLocationChange)=\"openDialog()\"\n  ></cx-pickup-options>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: PickupOptionsComponent, selector: "cx-pickup-options", inputs: ["selectedOption", "displayPickupLocation", "disableControls"], outputs: ["pickupOptionChange", "pickupLocationChange"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPickupOptionsContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-cart-pickup-options-container', template: "<ng-container\n  *ngIf=\"\n    (availableForPickup$ | async) &&\n    !(outlet?.context$ | async)?.orderCode &&\n    !(this.cartType === CartType.SELECTIVE)\n  \"\n>\n  <cx-pickup-options\n    [disableControls]=\"disableControls$ | async\"\n    [displayPickupLocation]=\"(storeDetails$ | async)?.displayName\"\n    [selectedOption]=\"pickupOption$ | async\"\n    (pickupOptionChange)=\"onPickupOptionChange($event)\"\n    (pickupLocationChange)=\"openDialog()\"\n  ></cx-pickup-options>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i1$1.LaunchDialogService }, { type: i2$2.PickupLocationsSearchFacade }, { type: i2$2.PickupOptionFacade }, { type: i2$2.PreferredStoreFacade }, { type: i0.ViewContainerRef }, { type: i2$1.CmsService }, { type: i2$2.IntendedPickupLocationFacade }, { type: i1$1.OutletContextData, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['open']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A presentational component for a store's opening hours
 */
class StoreScheduleComponent {
    constructor() {
        /** The details of the store */
        this.storeDetails = {};
        this.openingTimes = [];
    }
    ngOnChanges() {
        this.openingTimes =
            this.storeDetails?.openingHours?.weekDayOpeningList?.map(({ weekDay, closed, openingTime, closingTime }) => {
                return {
                    openingHours: `${openingTime?.formattedHour ?? ''} - ${closingTime?.formattedHour ?? ''}`,
                    weekDay: weekDay ?? '',
                    closed,
                };
            }) ?? [];
    }
}
StoreScheduleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreScheduleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
StoreScheduleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StoreScheduleComponent, selector: "cx-store-schedule", inputs: { storeDetails: "storeDetails" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"cx-store-schedule-container\">\n  <div class=\"cx-store-schedule-title\">\n    {{ 'storeSchedule.storeHours' | cxTranslate }}\n  </div>\n  <div\n    class=\"cx-store-schedule-opening-times\"\n    *ngFor=\"let openingTime of openingTimes\"\n  >\n    <div class=\"cx-store-schedule-day-of-week\">{{ openingTime.weekDay }}</div>\n    <div *ngIf=\"!openingTime.closed; else closed\">\n      {{ openingTime.openingHours }}\n    </div>\n    <ng-template #closed>{{\n      'storeSchedule.closed' | cxTranslate\n    }}</ng-template>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreScheduleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-store-schedule', template: "<div class=\"cx-store-schedule-container\">\n  <div class=\"cx-store-schedule-title\">\n    {{ 'storeSchedule.storeHours' | cxTranslate }}\n  </div>\n  <div\n    class=\"cx-store-schedule-opening-times\"\n    *ngFor=\"let openingTime of openingTimes\"\n  >\n    <div class=\"cx-store-schedule-day-of-week\">{{ openingTime.weekDay }}</div>\n    <div *ngIf=\"!openingTime.closed; else closed\">\n      {{ openingTime.openingHours }}\n    </div>\n    <ng-template #closed>{{\n      'storeSchedule.closed' | cxTranslate\n    }}</ng-template>\n  </div>\n</div>\n" }]
        }], propDecorators: { storeDetails: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The address of a point of service.
 */
class StoreAddressComponent {
    constructor() {
        /** The details of the store */
        this.storeDetails = {};
    }
}
StoreAddressComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreAddressComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
StoreAddressComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StoreAddressComponent, selector: "cx-store-address", inputs: { storeDetails: "storeDetails" }, ngImport: i0, template: "<div class=\"cx-store-address\">\n  <div *ngIf=\"storeDetails?.displayName\" class=\"cx-store-name\">\n    {{ storeDetails?.displayName }}\n  </div>\n  <div class=\"cx-store-full-address\">\n    <div *ngIf=\"storeDetails?.address?.line1\">\n      {{ storeDetails.address?.line1 }}\n    </div>\n    <div *ngIf=\"storeDetails?.address?.line2\">\n      {{ storeDetails.address?.line2 }}\n    </div>\n    <div *ngIf=\"storeDetails?.address?.town\">\n      {{ storeDetails.address?.town }}\n    </div>\n    <div *ngIf=\"storeDetails?.address?.region\">\n      {{ storeDetails.address?.region }}\n    </div>\n    <div *ngIf=\"storeDetails?.address?.district\">\n      {{ storeDetails.address?.district }}\n    </div>\n    <div *ngIf=\"storeDetails?.address?.phone\">\n      {{ storeDetails.address?.phone }}\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreAddressComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-store-address', template: "<div class=\"cx-store-address\">\n  <div *ngIf=\"storeDetails?.displayName\" class=\"cx-store-name\">\n    {{ storeDetails?.displayName }}\n  </div>\n  <div class=\"cx-store-full-address\">\n    <div *ngIf=\"storeDetails?.address?.line1\">\n      {{ storeDetails.address?.line1 }}\n    </div>\n    <div *ngIf=\"storeDetails?.address?.line2\">\n      {{ storeDetails.address?.line2 }}\n    </div>\n    <div *ngIf=\"storeDetails?.address?.town\">\n      {{ storeDetails.address?.town }}\n    </div>\n    <div *ngIf=\"storeDetails?.address?.region\">\n      {{ storeDetails.address?.region }}\n    </div>\n    <div *ngIf=\"storeDetails?.address?.district\">\n      {{ storeDetails.address?.district }}\n    </div>\n    <div *ngIf=\"storeDetails?.address?.phone\">\n      {{ storeDetails.address?.phone }}\n    </div>\n  </div>\n</div>\n" }]
        }], propDecorators: { storeDetails: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PickupInfoComponent {
}
PickupInfoComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInfoComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
PickupInfoComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: PickupInfoComponent, selector: "cx-pickup-info", inputs: { storeDetails: "storeDetails" }, ngImport: i0, template: "<div class=\"info-container\">\n  <div class=\"info-header\">\n    <div>{{ 'pickupInfo.inStorePickup' | cxTranslate }}</div>\n    <div>{{ 'pickupInfo.pickupBy' | cxTranslate }}</div>\n  </div>\n  <div class=\"info-location\">\n    <div>{{ 'pickupInfo.pickupFrom' | cxTranslate }}</div>\n    <cx-store-address [storeDetails]=\"storeDetails\"></cx-store-address>\n  </div>\n  <div class=\"store-hours\">\n    <cx-store-schedule [storeDetails]=\"storeDetails\"></cx-store-schedule>\n  </div>\n</div>\n", dependencies: [{ kind: "component", type: StoreScheduleComponent, selector: "cx-store-schedule", inputs: ["storeDetails"] }, { kind: "component", type: StoreAddressComponent, selector: "cx-store-address", inputs: ["storeDetails"] }, { kind: "pipe", type: i2$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInfoComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-pickup-info', template: "<div class=\"info-container\">\n  <div class=\"info-header\">\n    <div>{{ 'pickupInfo.inStorePickup' | cxTranslate }}</div>\n    <div>{{ 'pickupInfo.pickupBy' | cxTranslate }}</div>\n  </div>\n  <div class=\"info-location\">\n    <div>{{ 'pickupInfo.pickupFrom' | cxTranslate }}</div>\n    <cx-store-address [storeDetails]=\"storeDetails\"></cx-store-address>\n  </div>\n  <div class=\"store-hours\">\n    <cx-store-schedule [storeDetails]=\"storeDetails\"></cx-store-schedule>\n  </div>\n</div>\n" }]
        }], propDecorators: { storeDetails: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SetPreferredStoreComponent {
    constructor(preferredStoreFacade, outlet) {
        this.preferredStoreFacade = preferredStoreFacade;
        this.outlet = outlet;
        this.ICON_TYPE = ICON_TYPE;
        this.storeSelected$ = this.preferredStoreFacade.getPreferredStore$();
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.subscription.add(this.outlet?.context$.subscribe((pointOfServiceNames) => (this.pointOfServiceName = pointOfServiceNames)));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    setAsPreferred() {
        this.preferredStoreFacade.setPreferredStore(this.pointOfServiceName);
        return false;
    }
}
SetPreferredStoreComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SetPreferredStoreComponent, deps: [{ token: i2$2.PreferredStoreFacade }, { token: i1$1.OutletContextData, optional: true }], target: i0.ɵɵFactoryTarget.Component });
SetPreferredStoreComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: SetPreferredStoreComponent, selector: "cx-set-preferred-store", inputs: { pointOfServiceName: "pointOfServiceName" }, ngImport: i0, template: "<div\n  [attr.data-preferred-store]=\"pointOfServiceName.name\"\n  [attr.data-store-is-selected]=\"\n    pointOfServiceName.name === (storeSelected$ | async)?.name\n  \"\n  class=\"setpreferredstore-container\"\n  (click)=\"setAsPreferred()\"\n>\n  <div\n    [ngClass]=\"{\n      'icon-selected':\n        pointOfServiceName.name === (storeSelected$ | async)?.name,\n      'icon-not-selected':\n        pointOfServiceName.name !== (storeSelected$ | async)?.name\n    }\"\n  >\n    <cx-icon [type]=\"ICON_TYPE.HEART\"></cx-icon>\n  </div>\n  <button\n    data-text=\"setPreferredStore.myStore\"\n    [attr.data-preferred-store]=\"pointOfServiceName.name\"\n    class=\"set-preferred-heading\"\n  >\n    {{\n      pointOfServiceName.name === (storeSelected$ | async)?.name\n        ? ('setPreferredStore.myStore' | cxTranslate)\n        : ('setPreferredStore.makeThisMyStore' | cxTranslate)\n    }}\n  </button>\n</div>\n", dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: i1$1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i2$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SetPreferredStoreComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-set-preferred-store', template: "<div\n  [attr.data-preferred-store]=\"pointOfServiceName.name\"\n  [attr.data-store-is-selected]=\"\n    pointOfServiceName.name === (storeSelected$ | async)?.name\n  \"\n  class=\"setpreferredstore-container\"\n  (click)=\"setAsPreferred()\"\n>\n  <div\n    [ngClass]=\"{\n      'icon-selected':\n        pointOfServiceName.name === (storeSelected$ | async)?.name,\n      'icon-not-selected':\n        pointOfServiceName.name !== (storeSelected$ | async)?.name\n    }\"\n  >\n    <cx-icon [type]=\"ICON_TYPE.HEART\"></cx-icon>\n  </div>\n  <button\n    data-text=\"setPreferredStore.myStore\"\n    [attr.data-preferred-store]=\"pointOfServiceName.name\"\n    class=\"set-preferred-heading\"\n  >\n    {{\n      pointOfServiceName.name === (storeSelected$ | async)?.name\n        ? ('setPreferredStore.myStore' | cxTranslate)\n        : ('setPreferredStore.makeThisMyStore' | cxTranslate)\n    }}\n  </button>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i2$2.PreferredStoreFacade }, { type: i1$1.OutletContextData, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { pointOfServiceName: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SetPreferredStoreModule {
}
SetPreferredStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SetPreferredStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SetPreferredStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SetPreferredStoreModule, declarations: [SetPreferredStoreComponent], imports: [CommonModule, IconModule, I18nModule], exports: [SetPreferredStoreComponent] });
SetPreferredStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SetPreferredStoreModule, providers: [
        provideOutlet({
            id: StoreFinderOutlets.PREFERRED_STORE,
            position: OutletPosition.REPLACE,
            component: SetPreferredStoreComponent,
        }),
    ], imports: [CommonModule, IconModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SetPreferredStoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, IconModule, I18nModule],
                    exports: [SetPreferredStoreComponent],
                    declarations: [SetPreferredStoreComponent],
                    providers: [
                        provideOutlet({
                            id: StoreFinderOutlets.PREFERRED_STORE,
                            position: OutletPosition.REPLACE,
                            component: SetPreferredStoreComponent,
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A store in the store list including address, opening times, stock level, and
 * distance from the search location.
 */
class StoreComponent {
    constructor() {
        /** The details of the store to be displayed */
        this.storeDetails = {};
        /** An event emitter triggered when this store is selected for pickup */
        this.storeSelected = new EventEmitter();
        this.openHoursOpen = false;
        this.ICON_TYPE = ICON_TYPE;
    }
    ngOnInit() {
        this.isInStock = storeHasStock(this.storeDetails);
    }
    /**
     * Select the current store for pickup.
     */
    selectStore() {
        this.storeSelected.emit(this.storeDetails);
        // return false to prevent this button adding to cart
        return false;
    }
    /**
     * Toggle whether the store's opening hours are visible.
     */
    toggleOpenHours() {
        this.openHoursOpen = !this.openHoursOpen;
        return false;
    }
}
StoreComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
StoreComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StoreComponent, selector: "cx-store", inputs: { storeDetails: "storeDetails" }, outputs: { storeSelected: "storeSelected" }, ngImport: i0, template: "<div class=\"cx-store\">\n  <div class=\"cx-store-address\">\n    <div class=\"cx-store-full-address\">\n      <cx-store-address [storeDetails]=\"storeDetails\"></cx-store-address>\n\n      <div>\n        <div>\n          <button\n            (click)=\"toggleOpenHours()\"\n            class=\"cx-store-opening-hours-toggle\"\n          >\n            {{ 'store.viewHours' | cxTranslate }}\n            <span class=\"cx-store-opening-hours-icon\"\n              ><cx-icon\n                [type]=\"\n                  openHoursOpen ? ICON_TYPE.CARET_UP : ICON_TYPE.CARET_DOWN\n                \"\n              ></cx-icon\n            ></span>\n          </button>\n        </div>\n        <cx-store-schedule *ngIf=\"openHoursOpen\" [storeDetails]=\"storeDetails\">\n        </cx-store-schedule>\n        <cx-set-preferred-store\n          [pointOfServiceName]=\"{\n            name: storeDetails?.name,\n            displayName: storeDetails?.displayName\n          }\"\n        ></cx-set-preferred-store>\n      </div>\n    </div>\n  </div>\n  <div>\n    <div class=\"cx-store-distance\">{{ storeDetails?.formattedDistance }}</div>\n    <div>\n      <cx-icon\n        class=\"cx-store-stock-icon\"\n        *ngIf=\"isInStock\"\n        [type]=\"ICON_TYPE.CHECK\"\n      ></cx-icon>\n      <span\n        class=\"cx-stock-level\"\n        [ngClass]=\"{\n          'cx-store-in-stock': isInStock,\n          'cx-store-out-of-stock': !isInStock\n        }\"\n      >\n        {{\n          'store.stockLevel'\n            | cxTranslate\n              : {\n                  context: isInStock ? 'inStock' : 'outOfStock',\n                  count: storeDetails?.stockInfo?.stockLevel\n                }\n        }}</span\n      >\n    </div>\n  </div>\n</div>\n<div class=\"cx-store-pick-up-from-here\">\n  <button\n    (click)=\"selectStore()\"\n    class=\"btn btn-secondary btn-block\"\n    [disabled]=\"!isInStock\"\n    [attr.data-pickup-in-store-button]=\"storeDetails.name\"\n  >\n    {{ 'store.pickupFromHere' | cxTranslate }}\n  </button>\n</div>\n", dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1$1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: SetPreferredStoreComponent, selector: "cx-set-preferred-store", inputs: ["pointOfServiceName"] }, { kind: "component", type: StoreScheduleComponent, selector: "cx-store-schedule", inputs: ["storeDetails"] }, { kind: "component", type: StoreAddressComponent, selector: "cx-store-address", inputs: ["storeDetails"] }, { kind: "pipe", type: i2$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-store', template: "<div class=\"cx-store\">\n  <div class=\"cx-store-address\">\n    <div class=\"cx-store-full-address\">\n      <cx-store-address [storeDetails]=\"storeDetails\"></cx-store-address>\n\n      <div>\n        <div>\n          <button\n            (click)=\"toggleOpenHours()\"\n            class=\"cx-store-opening-hours-toggle\"\n          >\n            {{ 'store.viewHours' | cxTranslate }}\n            <span class=\"cx-store-opening-hours-icon\"\n              ><cx-icon\n                [type]=\"\n                  openHoursOpen ? ICON_TYPE.CARET_UP : ICON_TYPE.CARET_DOWN\n                \"\n              ></cx-icon\n            ></span>\n          </button>\n        </div>\n        <cx-store-schedule *ngIf=\"openHoursOpen\" [storeDetails]=\"storeDetails\">\n        </cx-store-schedule>\n        <cx-set-preferred-store\n          [pointOfServiceName]=\"{\n            name: storeDetails?.name,\n            displayName: storeDetails?.displayName\n          }\"\n        ></cx-set-preferred-store>\n      </div>\n    </div>\n  </div>\n  <div>\n    <div class=\"cx-store-distance\">{{ storeDetails?.formattedDistance }}</div>\n    <div>\n      <cx-icon\n        class=\"cx-store-stock-icon\"\n        *ngIf=\"isInStock\"\n        [type]=\"ICON_TYPE.CHECK\"\n      ></cx-icon>\n      <span\n        class=\"cx-stock-level\"\n        [ngClass]=\"{\n          'cx-store-in-stock': isInStock,\n          'cx-store-out-of-stock': !isInStock\n        }\"\n      >\n        {{\n          'store.stockLevel'\n            | cxTranslate\n              : {\n                  context: isInStock ? 'inStock' : 'outOfStock',\n                  count: storeDetails?.stockInfo?.stockLevel\n                }\n        }}</span\n      >\n    </div>\n  </div>\n</div>\n<div class=\"cx-store-pick-up-from-here\">\n  <button\n    (click)=\"selectStore()\"\n    class=\"btn btn-secondary btn-block\"\n    [disabled]=\"!isInStock\"\n    [attr.data-pickup-in-store-button]=\"storeDetails.name\"\n  >\n    {{ 'store.pickupFromHere' | cxTranslate }}\n  </button>\n</div>\n" }]
        }], propDecorators: { storeDetails: [{
                type: Input
            }], storeSelected: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StoreModule {
}
StoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: StoreModule, declarations: [StoreComponent, StoreScheduleComponent, StoreAddressComponent], imports: [CommonModule,
        I18nModule,
        IconModule,
        SpinnerModule,
        SetPreferredStoreModule], exports: [StoreComponent, StoreScheduleComponent, StoreAddressComponent] });
StoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreModule, imports: [CommonModule,
        I18nModule,
        IconModule,
        SpinnerModule,
        SetPreferredStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        IconModule,
                        SpinnerModule,
                        SetPreferredStoreModule,
                    ],
                    exports: [StoreComponent, StoreScheduleComponent, StoreAddressComponent],
                    declarations: [StoreComponent, StoreScheduleComponent, StoreAddressComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PickupInfoModule {
}
PickupInfoModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInfoModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PickupInfoModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PickupInfoModule, declarations: [PickupInfoComponent], imports: [CommonModule, I18nModule, StoreModule], exports: [PickupInfoComponent] });
PickupInfoModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInfoModule, imports: [CommonModule, I18nModule, StoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInfoModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, StoreModule],
                    declarations: [PickupInfoComponent],
                    exports: [PickupInfoComponent],
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
class PickupOptionsModule {
}
PickupOptionsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PickupOptionsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionsModule, declarations: [PickupOptionsComponent], imports: [CommonModule, I18nModule, ReactiveFormsModule], exports: [PickupOptionsComponent] });
PickupOptionsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionsModule, imports: [CommonModule, I18nModule, ReactiveFormsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, ReactiveFormsModule],
                    declarations: [PickupOptionsComponent],
                    exports: [PickupOptionsComponent],
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
class CartPickupOptionsContainerModule {
}
CartPickupOptionsContainerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPickupOptionsContainerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartPickupOptionsContainerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartPickupOptionsContainerModule, declarations: [CartPickupOptionsContainerComponent], imports: [CommonModule, PickupOptionsModule], exports: [CartPickupOptionsContainerComponent] });
CartPickupOptionsContainerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPickupOptionsContainerModule, providers: [
        provideOutlet({
            id: CartOutlets.ITEM_DELIVERY_DETAILS,
            position: OutletPosition.REPLACE,
            component: CartPickupOptionsContainerComponent,
        }),
    ], imports: [CommonModule, PickupOptionsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPickupOptionsContainerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PickupOptionsModule],
                    exports: [CartPickupOptionsContainerComponent],
                    declarations: [CartPickupOptionsContainerComponent],
                    providers: [
                        provideOutlet({
                            id: CartOutlets.ITEM_DELIVERY_DETAILS,
                            position: OutletPosition.REPLACE,
                            component: CartPickupOptionsContainerComponent,
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
class MyPreferredStoreComponent {
    constructor(preferredStoreFacade, pickupLocationsSearchService, routingService, storeFinderService, cmsService) {
        this.preferredStoreFacade = preferredStoreFacade;
        this.pickupLocationsSearchService = pickupLocationsSearchService;
        this.routingService = routingService;
        this.storeFinderService = storeFinderService;
        this.cmsService = cmsService;
        this.content = {
            header: 'My Store',
            actions: [
                { event: 'send', name: 'Get Directions' },
                { event: 'edit', name: 'Change Store' },
            ],
        };
        this.openHoursOpen = false;
        this.ICON_TYPE = ICON_TYPE;
        this.isStoreFinder = false;
        this.preferredStore$ = this.preferredStoreFacade.getPreferredStore$().pipe(filter((preferredStore) => preferredStore !== null), map((preferredStore) => preferredStore), filter((preferredStore) => !!preferredStore.name), map((preferredStore) => preferredStore.name), tap((preferredStoreName) => this.pickupLocationsSearchService.loadStoreDetails(preferredStoreName)), switchMap((preferredStoreName) => this.pickupLocationsSearchService.getStoreDetails(preferredStoreName)), tap((store) => {
            this.pointOfService = store;
        }));
    }
    ngOnInit() {
        this.cmsService
            .getCurrentPage()
            .pipe(filter(Boolean), take(1), tap((cmsPage) => (this.isStoreFinder = cmsPage.pageId === 'storefinderPage')), filter(() => this.isStoreFinder), tap(() => {
            this.content = {
                header: '',
                actions: [{ event: 'send', name: 'Get Directions' }],
            };
        }))
            .subscribe();
    }
    /**
     * Toggle whether the store's opening hours are visible.
     */
    toggleOpenHours() {
        this.openHoursOpen = !this.openHoursOpen;
        return false;
    }
    changeStore() {
        this.routingService.go(['/store-finder']);
    }
    getDirectionsToStore() {
        const linkToDirections = this.storeFinderService.getDirections(this.pointOfService);
        window.open(linkToDirections, '_blank', 'noopener,noreferrer');
    }
}
MyPreferredStoreComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyPreferredStoreComponent, deps: [{ token: i2$2.PreferredStoreFacade }, { token: i2$2.PickupLocationsSearchFacade }, { token: i2$1.RoutingService }, { token: i3$1.StoreFinderFacade }, { token: i2$1.CmsService }], target: i0.ɵɵFactoryTarget.Component });
MyPreferredStoreComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: MyPreferredStoreComponent, selector: "cx-my-preferred-store", ngImport: i0, template: "<div [ngClass]=\"{ container: isStoreFinder }\">\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <h2\n        class=\"cx-my-preferred-store-heading\"\n        [attr.data-test-id]=\"'preferredStoreHeading'\"\n      >\n        {{\n          isStoreFinder\n            ? ('storeFinderPickupInStore.heading' | cxTranslate)\n            : ('addressBookPickupInStore.heading' | cxTranslate)\n        }}\n      </h2>\n    </div>\n  </div>\n  <div class=\"row\" [attr.data-test-id]=\"'preferredStoreAddressBook'\">\n    <div\n      [ngClass]=\"{\n        'col-md-6': !isStoreFinder,\n        'col-md-4': isStoreFinder,\n        'cx-address-card': true\n      }\"\n    >\n      <cx-card\n        [border]=\"!isStoreFinder\"\n        [fitToContainer]=\"true\"\n        [content]=\"content\"\n        (sendCard)=\"getDirectionsToStore()\"\n        (editCard)=\"changeStore()\"\n      >\n        <div label_container_bottom>\n          <div class=\"info-location\">\n            <cx-store-address\n              [storeDetails]=\"preferredStore$ | async\"\n            ></cx-store-address>\n          </div>\n          <div *ngIf=\"!isStoreFinder\">\n            <button\n              (click)=\"toggleOpenHours()\"\n              class=\"cx-store-opening-hours-toggle\"\n            >\n              {{ 'store.viewHours' | cxTranslate }}\n              <span class=\"cx-store-opening-hours-icon\"\n                ><cx-icon\n                  [type]=\"\n                    openHoursOpen ? ICON_TYPE.CARET_UP : ICON_TYPE.CARET_DOWN\n                  \"\n                ></cx-icon\n              ></span>\n            </button>\n          </div>\n          <div class=\"store-hours\" *ngIf=\"!isStoreFinder\">\n            <cx-store-schedule\n              *ngIf=\"openHoursOpen\"\n              [storeDetails]=\"preferredStore$ | async\"\n            ></cx-store-schedule>\n          </div>\n        </div>\n      </cx-card>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "component", type: i1$1.CardComponent, selector: "cx-card", inputs: ["border", "editMode", "isDefault", "content", "fitToContainer", "truncateText", "charactersLimit", "index"], outputs: ["deleteCard", "setDefaultCard", "sendCard", "editCard", "cancelCard"] }, { kind: "component", type: StoreScheduleComponent, selector: "cx-store-schedule", inputs: ["storeDetails"] }, { kind: "component", type: StoreAddressComponent, selector: "cx-store-address", inputs: ["storeDetails"] }, { kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1$1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i2$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyPreferredStoreComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-my-preferred-store', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [ngClass]=\"{ container: isStoreFinder }\">\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <h2\n        class=\"cx-my-preferred-store-heading\"\n        [attr.data-test-id]=\"'preferredStoreHeading'\"\n      >\n        {{\n          isStoreFinder\n            ? ('storeFinderPickupInStore.heading' | cxTranslate)\n            : ('addressBookPickupInStore.heading' | cxTranslate)\n        }}\n      </h2>\n    </div>\n  </div>\n  <div class=\"row\" [attr.data-test-id]=\"'preferredStoreAddressBook'\">\n    <div\n      [ngClass]=\"{\n        'col-md-6': !isStoreFinder,\n        'col-md-4': isStoreFinder,\n        'cx-address-card': true\n      }\"\n    >\n      <cx-card\n        [border]=\"!isStoreFinder\"\n        [fitToContainer]=\"true\"\n        [content]=\"content\"\n        (sendCard)=\"getDirectionsToStore()\"\n        (editCard)=\"changeStore()\"\n      >\n        <div label_container_bottom>\n          <div class=\"info-location\">\n            <cx-store-address\n              [storeDetails]=\"preferredStore$ | async\"\n            ></cx-store-address>\n          </div>\n          <div *ngIf=\"!isStoreFinder\">\n            <button\n              (click)=\"toggleOpenHours()\"\n              class=\"cx-store-opening-hours-toggle\"\n            >\n              {{ 'store.viewHours' | cxTranslate }}\n              <span class=\"cx-store-opening-hours-icon\"\n                ><cx-icon\n                  [type]=\"\n                    openHoursOpen ? ICON_TYPE.CARET_UP : ICON_TYPE.CARET_DOWN\n                  \"\n                ></cx-icon\n              ></span>\n            </button>\n          </div>\n          <div class=\"store-hours\" *ngIf=\"!isStoreFinder\">\n            <cx-store-schedule\n              *ngIf=\"openHoursOpen\"\n              [storeDetails]=\"preferredStore$ | async\"\n            ></cx-store-schedule>\n          </div>\n        </div>\n      </cx-card>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i2$2.PreferredStoreFacade }, { type: i2$2.PickupLocationsSearchFacade }, { type: i2$1.RoutingService }, { type: i3$1.StoreFinderFacade }, { type: i2$1.CmsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MyPreferredStoreModule {
}
MyPreferredStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyPreferredStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MyPreferredStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: MyPreferredStoreModule, declarations: [MyPreferredStoreComponent], imports: [CardModule,
        StoreModule,
        CommonModule,
        I18nModule,
        IconModule, i2$1.ConfigModule], exports: [MyPreferredStoreComponent] });
MyPreferredStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyPreferredStoreModule, imports: [CardModule,
        StoreModule,
        CommonModule,
        I18nModule,
        IconModule,
        ConfigModule.withConfig({
            cmsComponents: {
                MyPreferredStoreComponent: {
                    component: MyPreferredStoreComponent,
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyPreferredStoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CardModule,
                        StoreModule,
                        CommonModule,
                        I18nModule,
                        IconModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                MyPreferredStoreComponent: {
                                    component: MyPreferredStoreComponent,
                                },
                            },
                        }),
                    ],
                    exports: [MyPreferredStoreComponent],
                    declarations: [MyPreferredStoreComponent],
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
/** Custom type guard to ensure we have a product a defined code */
function isProductWithCode(product) {
    return !!product?.code;
}
/**
 * A container component of the pair of the pickup options radio buttons for cart entry.
 */
class PdpPickupOptionsContainerComponent {
    constructor(currentProductService, intendedPickupLocationService, launchDialogService, pickupOptionFacade, preferredStoreFacade, pickupLocationsSearchService, vcr) {
        this.currentProductService = currentProductService;
        this.intendedPickupLocationService = intendedPickupLocationService;
        this.launchDialogService = launchDialogService;
        this.pickupOptionFacade = pickupOptionFacade;
        this.preferredStoreFacade = preferredStoreFacade;
        this.pickupLocationsSearchService = pickupLocationsSearchService;
        this.vcr = vcr;
        this.subscription = new Subscription();
        this.availableForPickup = false;
        this.displayNameIsSet = false;
        // Intentional empty constructor
    }
    ngOnInit() {
        this.pickupOptionFacade.setPageContext('PDP');
        const productCode$ = this.currentProductService.getProduct().pipe(filter(isProductWithCode), map((product) => {
            this.productCode = product.code;
            this.availableForPickup = !!product.availableForPickup;
            return this.productCode;
        }), tap((productCode) => (this.pickupOption$ =
            this.intendedPickupLocationService.getPickupOption(productCode))));
        this.displayPickupLocation$ = this.currentProductService.getProduct().pipe(filter(isProductWithCode), map((product) => product.code), switchMap((productCode) => this.intendedPickupLocationService
            .getIntendedLocation(productCode)
            .pipe(map((intendedLocation) => ({ intendedLocation, productCode })))), switchMap(({ intendedLocation, productCode }) => iif(() => !!intendedLocation && !!intendedLocation.displayName, of(getProperty(intendedLocation, 'displayName')), this.preferredStoreFacade
            .getPreferredStoreWithProductInStock(productCode)
            .pipe(map(({ name }) => name), tap((storeName) => this.pickupLocationsSearchService.loadStoreDetails(storeName)), concatMap((storeName) => this.pickupLocationsSearchService.getStoreDetails(storeName)), filter((storeDetails) => !!storeDetails), tap((storeDetails) => {
            this.intendedPickupLocationService.setIntendedLocation(productCode, {
                ...storeDetails,
                pickupOption: 'delivery',
            });
        })))), tap(() => (this.displayNameIsSet = true)));
        this.intendedPickupLocation$ = this.currentProductService.getProduct().pipe(filter(isProductWithCode), map((product) => product.code), switchMap((productCode) => this.intendedPickupLocationService.getIntendedLocation(productCode)));
        this.subscription.add(combineLatest([
            productCode$,
            this.launchDialogService.dialogClose.pipe(filter((reason) => reason !== undefined), startWith(undefined)),
        ])
            .pipe(switchMap(([productCode]) => this.intendedPickupLocationService.getIntendedLocation(productCode)))
            .subscribe());
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    openDialog() {
        const dialog = this.launchDialogService.openDialog("PICKUP_IN_STORE" /* LAUNCH_CALLER.PICKUP_IN_STORE */, this.element, this.vcr, { productCode: this.productCode });
        if (dialog) {
            dialog.pipe(take(1)).subscribe();
        }
    }
    onPickupOptionChange(option) {
        this.intendedPickupLocationService.setPickupOption(this.productCode, option);
        if (option === 'delivery') {
            return;
        }
        if (!this.displayNameIsSet) {
            this.openDialog();
        }
    }
}
PdpPickupOptionsContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PdpPickupOptionsContainerComponent, deps: [{ token: i1$1.CurrentProductService }, { token: i2$2.IntendedPickupLocationFacade }, { token: i1$1.LaunchDialogService }, { token: i2$2.PickupOptionFacade }, { token: i2$2.PreferredStoreFacade }, { token: i2$2.PickupLocationsSearchFacade }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
PdpPickupOptionsContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: PdpPickupOptionsContainerComponent, selector: "cx-cart-pickup-options-container", viewQueries: [{ propertyName: "element", first: true, predicate: ["open"], descendants: true }], ngImport: i0, template: "<ng-container *ngIf=\"availableForPickup\">\n  <cx-pickup-options\n    [selectedOption]=\"pickupOption$ | async\"\n    [displayPickupLocation]=\"displayPickupLocation$ | async\"\n    (pickupOptionChange)=\"onPickupOptionChange($event)\"\n    (pickupLocationChange)=\"openDialog()\"\n  ></cx-pickup-options>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: PickupOptionsComponent, selector: "cx-pickup-options", inputs: ["selectedOption", "displayPickupLocation", "disableControls"], outputs: ["pickupOptionChange", "pickupLocationChange"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PdpPickupOptionsContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-cart-pickup-options-container', template: "<ng-container *ngIf=\"availableForPickup\">\n  <cx-pickup-options\n    [selectedOption]=\"pickupOption$ | async\"\n    [displayPickupLocation]=\"displayPickupLocation$ | async\"\n    (pickupOptionChange)=\"onPickupOptionChange($event)\"\n    (pickupLocationChange)=\"openDialog()\"\n  ></cx-pickup-options>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.CurrentProductService }, { type: i2$2.IntendedPickupLocationFacade }, { type: i1$1.LaunchDialogService }, { type: i2$2.PickupOptionFacade }, { type: i2$2.PreferredStoreFacade }, { type: i2$2.PickupLocationsSearchFacade }, { type: i0.ViewContainerRef }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['open']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PdpPickupOptionsContainerModule {
}
PdpPickupOptionsContainerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PdpPickupOptionsContainerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PdpPickupOptionsContainerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PdpPickupOptionsContainerModule, declarations: [PdpPickupOptionsContainerComponent], imports: [CommonModule, PickupOptionsModule], exports: [PdpPickupOptionsContainerComponent] });
PdpPickupOptionsContainerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PdpPickupOptionsContainerModule, providers: [
        provideOutlet({
            id: CartOutlets.ADD_TO_CART_PICKUP_OPTION,
            position: OutletPosition.REPLACE,
            component: PdpPickupOptionsContainerComponent,
        }),
    ], imports: [CommonModule, PickupOptionsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PdpPickupOptionsContainerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PickupOptionsModule],
                    exports: [PdpPickupOptionsContainerComponent],
                    declarations: [PdpPickupOptionsContainerComponent],
                    providers: [
                        provideOutlet({
                            id: CartOutlets.ADD_TO_CART_PICKUP_OPTION,
                            position: OutletPosition.REPLACE,
                            component: PdpPickupOptionsContainerComponent,
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
/**
 * A container component of the pickup address for order consignment.
 */
class PickupInStoreOrderConsignmentContainerComponent {
    constructor(outlet) {
        this.outlet = outlet;
    }
    ngOnInit() {
        this.pointOfService$ = this.outlet?.context$?.pipe(map((context) => context.item?.deliveryPointOfService), filter((pointOfService) => !!pointOfService));
    }
}
PickupInStoreOrderConsignmentContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreOrderConsignmentContainerComponent, deps: [{ token: i1$1.OutletContextData, optional: true }], target: i0.ɵɵFactoryTarget.Component });
PickupInStoreOrderConsignmentContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: PickupInStoreOrderConsignmentContainerComponent, selector: "cx-pickup-in-store-order-consignment", inputs: { pointOfService$: "pointOfService$" }, ngImport: i0, template: "<div\n  *ngIf=\"pointOfService$ | async as pointOfService\"\n  class=\"cx-list-header col-12\"\n>\n  <div class=\"cx-consignment-details\">\n    <div class=\"cx-deliveryPointOfService-address\">\n      <div class=\"cx-deliveryPointOfService-heading\">\n        {{ 'deliveryPointOfServiceDetails.pickUpInStoreAddress' | cxTranslate }}\n      </div>\n      <div class=\"cx-deliveryPointOfService-storeName\">\n        {{ pointOfService?.displayName }}\n      </div>\n      <div *ngIf=\"pointOfService?.address?.line1\">\n        {{ pointOfService?.address?.line1 }}\n      </div>\n      <div *ngIf=\"pointOfService?.address?.line2\">\n        {{ pointOfService?.address?.line2 }}\n      </div>\n      <div *ngIf=\"pointOfService?.address?.town\">\n        <span>\n          {{ pointOfService?.address?.town }}\n        </span>\n        <span> {{ pointOfService?.address?.postalCode }}</span>\n      </div>\n      <div *ngIf=\"pointOfService?.address?.phone\">\n        {{ pointOfService?.address?.phone }}\n      </div>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i2$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreOrderConsignmentContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-pickup-in-store-order-consignment', template: "<div\n  *ngIf=\"pointOfService$ | async as pointOfService\"\n  class=\"cx-list-header col-12\"\n>\n  <div class=\"cx-consignment-details\">\n    <div class=\"cx-deliveryPointOfService-address\">\n      <div class=\"cx-deliveryPointOfService-heading\">\n        {{ 'deliveryPointOfServiceDetails.pickUpInStoreAddress' | cxTranslate }}\n      </div>\n      <div class=\"cx-deliveryPointOfService-storeName\">\n        {{ pointOfService?.displayName }}\n      </div>\n      <div *ngIf=\"pointOfService?.address?.line1\">\n        {{ pointOfService?.address?.line1 }}\n      </div>\n      <div *ngIf=\"pointOfService?.address?.line2\">\n        {{ pointOfService?.address?.line2 }}\n      </div>\n      <div *ngIf=\"pointOfService?.address?.town\">\n        <span>\n          {{ pointOfService?.address?.town }}\n        </span>\n        <span> {{ pointOfService?.address?.postalCode }}</span>\n      </div>\n      <div *ngIf=\"pointOfService?.address?.phone\">\n        {{ pointOfService?.address?.phone }}\n      </div>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.OutletContextData, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { pointOfService$: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderConsignmentContainerModule {
}
OrderConsignmentContainerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConsignmentContainerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderConsignmentContainerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderConsignmentContainerModule, declarations: [PickupInStoreOrderConsignmentContainerComponent], imports: [CommonModule, I18nModule], exports: [PickupInStoreOrderConsignmentContainerComponent] });
OrderConsignmentContainerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConsignmentContainerModule, providers: [
        provideOutlet({
            id: OrderOutlets.ORDER_CONSIGNMENT,
            position: OutletPosition.AFTER,
            component: PickupInStoreOrderConsignmentContainerComponent,
        }),
    ], imports: [CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConsignmentContainerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule],
                    exports: [PickupInStoreOrderConsignmentContainerComponent],
                    declarations: [PickupInStoreOrderConsignmentContainerComponent],
                    providers: [
                        provideOutlet({
                            id: OrderOutlets.ORDER_CONSIGNMENT,
                            position: OutletPosition.AFTER,
                            component: PickupInStoreOrderConsignmentContainerComponent,
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
class PickupInfoContainerComponent {
    constructor(activeCartService, storeDetails) {
        this.activeCartService = activeCartService;
        this.storeDetails = storeDetails;
    }
    ngOnInit() {
        this.activeCartService
            .getActive()
            .pipe(map((cart) => cart.entries), filter((entries) => !!entries), map((entries) => entries
            .map((entry) => entry.deliveryPointOfService?.name)
            .filter((name) => !!name)), tap((storeNames) => storeNames.forEach((storeName) => this.storeDetails.loadStoreDetails(storeName))), mergeMap((storeNames) => combineLatest(storeNames.map((storeName) => this.storeDetails
            .getStoreDetails(storeName)
            .pipe(filter((details) => !!details))))), map((pointOfService) => pointOfService.map(({ address, displayName, openingHours }) => ({
            address,
            displayName,
            openingHours,
        }))), tap((storesDetailsData) => (this.storesDetailsData = storesDetailsData)), take(1))
            .subscribe();
    }
}
PickupInfoContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInfoContainerComponent, deps: [{ token: i1.ActiveCartFacade }, { token: i2$2.PickupLocationsSearchFacade }], target: i0.ɵɵFactoryTarget.Component });
PickupInfoContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: PickupInfoContainerComponent, selector: "cx-pickup-info-container", ngImport: i0, template: "<cx-pickup-info\n  *ngFor=\"let storeDetailsData of storesDetailsData\"\n  [storeDetails]=\"storeDetailsData\"\n></cx-pickup-info>\n", dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: PickupInfoComponent, selector: "cx-pickup-info", inputs: ["storeDetails"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInfoContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-pickup-info-container', template: "<cx-pickup-info\n  *ngFor=\"let storeDetailsData of storesDetailsData\"\n  [storeDetails]=\"storeDetailsData\"\n></cx-pickup-info>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2$2.PickupLocationsSearchFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PickupInfoContainerModule {
}
PickupInfoContainerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInfoContainerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PickupInfoContainerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PickupInfoContainerModule, declarations: [PickupInfoContainerComponent], imports: [CommonModule, PickupInfoModule], exports: [PickupInfoContainerComponent] });
PickupInfoContainerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInfoContainerModule, providers: [
        provideOutlet({
            id: CartOutlets.PICKUP_INFO,
            position: OutletPosition.REPLACE,
            component: PickupInfoContainerComponent,
        }),
    ], imports: [CommonModule, PickupInfoModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInfoContainerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PickupInfoModule],
                    exports: [PickupInfoContainerComponent],
                    declarations: [PickupInfoContainerComponent],
                    providers: [
                        provideOutlet({
                            id: CartOutlets.PICKUP_INFO,
                            position: OutletPosition.REPLACE,
                            component: PickupInfoContainerComponent,
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
/**
 * A service to get the Delivery Points Of Service for items to be picked up in store for the active cart
 */
class DeliveryPointsService {
    constructor(activeCartFacade, pickupLocationsSearchFacade, orderFacade) {
        this.activeCartFacade = activeCartFacade;
        this.pickupLocationsSearchFacade = pickupLocationsSearchFacade;
        this.orderFacade = orderFacade;
    }
    /*
     * deliveryPointsOfService$ comprises arrays within an array.
     * It has an array of stores, and then for each store, an array of products to be collected from that store.
     * We need to get data from two different services. One of the services has the product data, ie the products to be picked up from in store.
     * This data only has the store name, no other information about the store eg address etc.
     * We then use another service to get data about the store. This service has two methods that must be called.
     * loadStoreDetails is called to make the api call. The data returned from this call populates an area of the ngrx store.
     * Then getStoreDetails is used to get store detail data from the relevant slice of state in the ngrx store.
     * So the below:
     * - gets active cart
     * - gets items in the cart
     * - gets those items that are to be picked up from a store
     * - get the data about each store
     *
     * Some of the below involves turning array data into lookup object data simply because this is easier to deal with
     */
    getDeliveryPointsOfServiceFromCart() {
        return this.activeCartFacade.getPickupEntries().pipe(filter((entries) => !!entries && !!entries.length), switchMap((entries) => this.getDeliveryPointsOfService(entries)));
    }
    getDeliveryPointsOfServiceFromOrder() {
        return this.orderFacade.getPickupEntries().pipe(filter((entries) => !!entries && !!entries.length), switchMap((entries) => this.getDeliveryPointsOfService(entries)));
    }
    getDeliveryPointsOfService(entries) {
        return of(entries).pipe(map((items) => items.filter((entry) => !!entry.deliveryPointOfService)), switchMap((elements) => iif(() => !!elements.length, of(elements).pipe(map((_elements) => {
            const COPY = [..._elements];
            COPY.sort((a, b) => a.deliveryPointOfService?.name?.localeCompare(getProperty(b.deliveryPointOfService, 'name') || '') || 0);
            return COPY;
        }), map((sortedArray) => sortedArray.reduce((accumulator, value) => {
            const DELIVERY_POINT_OF_SERVICE = value
                .deliveryPointOfService?.name;
            const existingValue = accumulator[DELIVERY_POINT_OF_SERVICE]
                ? accumulator[DELIVERY_POINT_OF_SERVICE]
                : [];
            return {
                ...accumulator,
                [DELIVERY_POINT_OF_SERVICE]: [...existingValue, value],
            };
        }, {})), map((deliveryPointOfServiceMap) => Object.keys(deliveryPointOfServiceMap).map((key) => ({
            name: key,
            value: deliveryPointOfServiceMap[key],
        }))), tap((deliveryPointOfServiceMap) => deliveryPointOfServiceMap
            .map((deliveryPointOfService) => deliveryPointOfService.name)
            .forEach((name) => this.pickupLocationsSearchFacade.loadStoreDetails(name))), mergeMap((deliveryPointOfServiceMap) => combineLatest(deliveryPointOfServiceMap
            .map((deliveryPointOfService) => deliveryPointOfService.name)
            .map((name) => this.pickupLocationsSearchFacade.getStoreDetails(name))).pipe(map((storeDetails) => {
            const STORE_DETAILS_MAP = storeDetails
                .filter((_storeDetails) => !!_storeDetails)
                .reduce((accumulator, value) => ({
                ...accumulator,
                [value.name]: value,
            }), {});
            return deliveryPointOfServiceMap.map((store) => ({
                ...store,
                storeDetails: STORE_DETAILS_MAP[store.name],
            }));
        })))), of([]))));
    }
}
DeliveryPointsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DeliveryPointsService, deps: [{ token: i1.ActiveCartFacade }, { token: i2$2.PickupLocationsSearchFacade }, { token: i3$2.OrderFacade }], target: i0.ɵɵFactoryTarget.Injectable });
DeliveryPointsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DeliveryPointsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DeliveryPointsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2$2.PickupLocationsSearchFacade }, { type: i3$2.OrderFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PickUpItemsDetailsComponent {
    constructor(component, deliveryPointsService) {
        this.component = component;
        this.deliveryPointsService = deliveryPointsService;
        this.ICON_TYPE = ICON_TYPE;
    }
    ngOnInit() {
        this.component.data$
            .pipe(tap((data) => {
            this.showEdit = data.showEdit;
            this.context = data.context;
            this.itemsDetails =
                data.context === 'order'
                    ? this.deliveryPointsService.getDeliveryPointsOfServiceFromOrder()
                    : this.deliveryPointsService.getDeliveryPointsOfServiceFromCart();
        }), take(1))
            .subscribe();
    }
}
PickUpItemsDetailsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickUpItemsDetailsComponent, deps: [{ token: i1$1.CmsComponentData }, { token: DeliveryPointsService }], target: i0.ɵɵFactoryTarget.Component });
PickUpItemsDetailsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: PickUpItemsDetailsComponent, selector: "cx-pick-up-in-store-items-details", inputs: { showEdit: "showEdit", itemsDetails: "itemsDetails" }, ngImport: i0, template: "<div [ngClass]=\"{ container: context === 'order' }\">\n  <ng-container *ngIf=\"itemsDetails | async as deliveryPointsOfService\">\n    <p\n      *ngIf=\"deliveryPointsOfService.length\"\n      class=\"cx-pickup-items-details-heading d-lg-block d-xl-block\"\n    >\n      {{ 'checkoutPickupInStore.heading' | cxTranslate }}\n    </p>\n    <div\n      *ngFor=\"\n        let deliveryPointOfService of deliveryPointsOfService;\n        let index = index\n      \"\n    >\n      <div class=\"cx-pickup-items-details\">\n        <div>\n          <div class=\"cx-pickup-items-details-store-address\">\n            <p class=\"cx-pickup-items-details-store-heading\">\n              {{ 'checkoutPickupInStore.storeItemHeading' | cxTranslate }}\n              {{ index + 1 }}\n            </p>\n            <cx-store-address\n              [storeDetails]=\"deliveryPointOfService?.storeDetails\"\n            ></cx-store-address>\n          </div>\n          <div class=\"cx-pickup-items-details-store-schedule\">\n            <cx-store-schedule\n              [storeDetails]=\"deliveryPointOfService?.storeDetails\"\n            ></cx-store-schedule>\n          </div>\n          <div *ngIf=\"showEdit\" class=\"cx-pickup-items-details-edit-icon\">\n            <a [routerLink]=\"{ cxRoute: 'cart' } | cxUrl\"\n              ><cx-icon [type]=\"ICON_TYPE.PENCIL\"></cx-icon\n            ></a>\n          </div>\n        </div>\n      </div>\n      <div\n        [ngClass]=\"'d-none d-md-flex'\"\n        class=\"row cx-delivery-pointof-service-item-header\"\n      >\n        <div class=\"col-md-7 cx-image-container-header\">\n          {{ 'cartItems.item' | cxTranslate }}\n        </div>\n        <div class=\"cx-price-header col-md-2\">\n          {{ 'cartItems.itemPrice' | cxTranslate }}\n        </div>\n        <div class=\"cx-quantity-header col-md-1\">\n          {{ 'cartItems.quantity' | cxTranslate }}\n        </div>\n        <div class=\"cx-total-header col-md-2\">\n          {{ 'cartItems.total' | cxTranslate }}\n        </div>\n      </div>\n      <div\n        class=\"cx-delivery-pointof-service-item\"\n        *ngFor=\"let item of deliveryPointOfService.value\"\n      >\n        <div [ngClass]=\"'row'\">\n          <!-- Item Image -->\n          <div class=\"col-2 cx-image-container col-offset-1\">\n            <a tabindex=\"0\">\n              <cx-media\n                [container]=\"item.product?.images?.PRIMARY\"\n                format=\"cartIcon\"\n              ></cx-media>\n            </a>\n          </div>\n          <!-- Item Information -->\n          <div class=\"cx-info col-9\">\n            <div class=\"cx-info-container row\">\n              <!-- Item Description -->\n              <div [ngClass]=\"'col-md-7 col-lg-7 col-xl-7'\">\n                <div *ngIf=\"item.product?.name\" class=\"cx-name\">\n                  <p class=\"cx-name-value\">{{ item.product?.name }}</p>\n                </div>\n                <div *ngIf=\"item.product?.code\" class=\"cx-code\">\n                  {{ 'ID' }} {{ item.product?.code }}\n                </div>\n\n                <!-- Variants -->\n                <ng-container *ngIf=\"item.product?.baseOptions?.length\">\n                  <div\n                    *ngFor=\"\n                      let variant of item.product?.baseOptions[0]?.selected\n                        ?.variantOptionQualifiers\n                    \"\n                    class=\"cx-property\"\n                  >\n                    <div class=\"cx-label\" *ngIf=\"variant.name && variant.value\">\n                      {{ variant.name }}: {{ variant.value }}\n                    </div>\n                  </div>\n                </ng-container>\n              </div>\n              <!-- Item Price -->\n              <div\n                *ngIf=\"item.basePrice\"\n                class=\"cx-price\"\n                [ngClass]=\"'col-lg-2 col-md-2 col-sm-12 col-xs-12'\"\n              >\n                <div *ngIf=\"item.basePrice\" class=\"cx-value\">\n                  <span\n                    class=\"cx-label\"\n                    [ngClass]=\"'d-md-none d-lg-none d-xl-none'\"\n                  >\n                    {{ 'cartItems.itemPrice' | cxTranslate }}\n                  </span>\n                  {{ item.basePrice?.formattedValue }}\n                </div>\n              </div>\n              <!-- Item Quantity -->\n              <div\n                class=\"cx-quantity\"\n                [ngClass]=\"'col-lg-2 col-md-2 col-sm-12 col-xs-12'\"\n              >\n                <div class=\"cx-value\">\n                  <span\n                    class=\"cx-label\"\n                    [ngClass]=\"'d-md-none d-lg-none d-xl-none'\"\n                    placement=\"left\"\n                    title=\"{{ 'cartItems.quantityTitle' | cxTranslate }}\"\n                  >\n                    {{ 'cartItems.quantity' | cxTranslate }}\n                  </span>\n                  {{ item.quantity }}\n                </div>\n              </div>\n              <!-- Total -->\n              <div\n                *ngIf=\"item.totalPrice\"\n                class=\"cx-total\"\n                [ngClass]=\"' col-md-1 col-xl-1 col-sm-12 col-xs-12'\"\n              >\n                <div class=\"cx-value\">\n                  <span\n                    class=\"cx-label\"\n                    [ngClass]=\"' d-md-none d-lg-none d-xl-none'\"\n                  >\n                    {{ 'cartItems.total' | cxTranslate }}\n                  </span>\n                  {{ item.totalPrice.formattedValue }}\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </ng-container>\n</div>\n", dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i1$1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: StoreScheduleComponent, selector: "cx-store-schedule", inputs: ["storeDetails"] }, { kind: "component", type: StoreAddressComponent, selector: "cx-store-address", inputs: ["storeDetails"] }, { kind: "component", type: i1$1.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i2$1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2$1.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickUpItemsDetailsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-pick-up-in-store-items-details', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [ngClass]=\"{ container: context === 'order' }\">\n  <ng-container *ngIf=\"itemsDetails | async as deliveryPointsOfService\">\n    <p\n      *ngIf=\"deliveryPointsOfService.length\"\n      class=\"cx-pickup-items-details-heading d-lg-block d-xl-block\"\n    >\n      {{ 'checkoutPickupInStore.heading' | cxTranslate }}\n    </p>\n    <div\n      *ngFor=\"\n        let deliveryPointOfService of deliveryPointsOfService;\n        let index = index\n      \"\n    >\n      <div class=\"cx-pickup-items-details\">\n        <div>\n          <div class=\"cx-pickup-items-details-store-address\">\n            <p class=\"cx-pickup-items-details-store-heading\">\n              {{ 'checkoutPickupInStore.storeItemHeading' | cxTranslate }}\n              {{ index + 1 }}\n            </p>\n            <cx-store-address\n              [storeDetails]=\"deliveryPointOfService?.storeDetails\"\n            ></cx-store-address>\n          </div>\n          <div class=\"cx-pickup-items-details-store-schedule\">\n            <cx-store-schedule\n              [storeDetails]=\"deliveryPointOfService?.storeDetails\"\n            ></cx-store-schedule>\n          </div>\n          <div *ngIf=\"showEdit\" class=\"cx-pickup-items-details-edit-icon\">\n            <a [routerLink]=\"{ cxRoute: 'cart' } | cxUrl\"\n              ><cx-icon [type]=\"ICON_TYPE.PENCIL\"></cx-icon\n            ></a>\n          </div>\n        </div>\n      </div>\n      <div\n        [ngClass]=\"'d-none d-md-flex'\"\n        class=\"row cx-delivery-pointof-service-item-header\"\n      >\n        <div class=\"col-md-7 cx-image-container-header\">\n          {{ 'cartItems.item' | cxTranslate }}\n        </div>\n        <div class=\"cx-price-header col-md-2\">\n          {{ 'cartItems.itemPrice' | cxTranslate }}\n        </div>\n        <div class=\"cx-quantity-header col-md-1\">\n          {{ 'cartItems.quantity' | cxTranslate }}\n        </div>\n        <div class=\"cx-total-header col-md-2\">\n          {{ 'cartItems.total' | cxTranslate }}\n        </div>\n      </div>\n      <div\n        class=\"cx-delivery-pointof-service-item\"\n        *ngFor=\"let item of deliveryPointOfService.value\"\n      >\n        <div [ngClass]=\"'row'\">\n          <!-- Item Image -->\n          <div class=\"col-2 cx-image-container col-offset-1\">\n            <a tabindex=\"0\">\n              <cx-media\n                [container]=\"item.product?.images?.PRIMARY\"\n                format=\"cartIcon\"\n              ></cx-media>\n            </a>\n          </div>\n          <!-- Item Information -->\n          <div class=\"cx-info col-9\">\n            <div class=\"cx-info-container row\">\n              <!-- Item Description -->\n              <div [ngClass]=\"'col-md-7 col-lg-7 col-xl-7'\">\n                <div *ngIf=\"item.product?.name\" class=\"cx-name\">\n                  <p class=\"cx-name-value\">{{ item.product?.name }}</p>\n                </div>\n                <div *ngIf=\"item.product?.code\" class=\"cx-code\">\n                  {{ 'ID' }} {{ item.product?.code }}\n                </div>\n\n                <!-- Variants -->\n                <ng-container *ngIf=\"item.product?.baseOptions?.length\">\n                  <div\n                    *ngFor=\"\n                      let variant of item.product?.baseOptions[0]?.selected\n                        ?.variantOptionQualifiers\n                    \"\n                    class=\"cx-property\"\n                  >\n                    <div class=\"cx-label\" *ngIf=\"variant.name && variant.value\">\n                      {{ variant.name }}: {{ variant.value }}\n                    </div>\n                  </div>\n                </ng-container>\n              </div>\n              <!-- Item Price -->\n              <div\n                *ngIf=\"item.basePrice\"\n                class=\"cx-price\"\n                [ngClass]=\"'col-lg-2 col-md-2 col-sm-12 col-xs-12'\"\n              >\n                <div *ngIf=\"item.basePrice\" class=\"cx-value\">\n                  <span\n                    class=\"cx-label\"\n                    [ngClass]=\"'d-md-none d-lg-none d-xl-none'\"\n                  >\n                    {{ 'cartItems.itemPrice' | cxTranslate }}\n                  </span>\n                  {{ item.basePrice?.formattedValue }}\n                </div>\n              </div>\n              <!-- Item Quantity -->\n              <div\n                class=\"cx-quantity\"\n                [ngClass]=\"'col-lg-2 col-md-2 col-sm-12 col-xs-12'\"\n              >\n                <div class=\"cx-value\">\n                  <span\n                    class=\"cx-label\"\n                    [ngClass]=\"'d-md-none d-lg-none d-xl-none'\"\n                    placement=\"left\"\n                    title=\"{{ 'cartItems.quantityTitle' | cxTranslate }}\"\n                  >\n                    {{ 'cartItems.quantity' | cxTranslate }}\n                  </span>\n                  {{ item.quantity }}\n                </div>\n              </div>\n              <!-- Total -->\n              <div\n                *ngIf=\"item.totalPrice\"\n                class=\"cx-total\"\n                [ngClass]=\"' col-md-1 col-xl-1 col-sm-12 col-xs-12'\"\n              >\n                <div class=\"cx-value\">\n                  <span\n                    class=\"cx-label\"\n                    [ngClass]=\"' d-md-none d-lg-none d-xl-none'\"\n                  >\n                    {{ 'cartItems.total' | cxTranslate }}\n                  </span>\n                  {{ item.totalPrice.formattedValue }}\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </ng-container>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.CmsComponentData }, { type: DeliveryPointsService }]; }, propDecorators: { showEdit: [{
                type: Input
            }], itemsDetails: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PickUpItemsDetailsModule {
}
PickUpItemsDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickUpItemsDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PickUpItemsDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PickUpItemsDetailsModule, declarations: [PickUpItemsDetailsComponent], imports: [CommonModule,
        I18nModule,
        RouterModule,
        UrlModule,
        IconModule,
        StoreModule,
        CardModule,
        MediaModule, i2$1.ConfigModule], exports: [PickUpItemsDetailsComponent] });
PickUpItemsDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickUpItemsDetailsModule, imports: [CommonModule,
        I18nModule,
        RouterModule,
        UrlModule,
        IconModule,
        StoreModule,
        CardModule,
        MediaModule,
        ConfigModule.withConfig({
            cmsComponents: {
                OrderConfirmationPickUpComponent: {
                    component: PickUpItemsDetailsComponent,
                    data: {
                        showEdit: false,
                        context: 'order',
                    },
                },
                CheckoutReviewPickup: {
                    component: PickUpItemsDetailsComponent,
                    data: {
                        showEdit: true,
                        context: 'review',
                    },
                },
                PickupInStoreDeliveryModeComponent: {
                    component: PickUpItemsDetailsComponent,
                    data: {
                        showEdit: false,
                        context: 'deliveryMode',
                    },
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickUpItemsDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        RouterModule,
                        UrlModule,
                        IconModule,
                        StoreModule,
                        CardModule,
                        MediaModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                OrderConfirmationPickUpComponent: {
                                    component: PickUpItemsDetailsComponent,
                                    data: {
                                        showEdit: false,
                                        context: 'order',
                                    },
                                },
                                CheckoutReviewPickup: {
                                    component: PickUpItemsDetailsComponent,
                                    data: {
                                        showEdit: true,
                                        context: 'review',
                                    },
                                },
                                PickupInStoreDeliveryModeComponent: {
                                    component: PickUpItemsDetailsComponent,
                                    data: {
                                        showEdit: false,
                                        context: 'deliveryMode',
                                    },
                                },
                            },
                        }),
                    ],
                    declarations: [PickUpItemsDetailsComponent],
                    exports: [PickUpItemsDetailsComponent],
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
 * The list of stores with their stock level and distance from a searched location.
 * Used in the PickupOptionDialog component for selecting a pickup location.
 */
class StoreListComponent {
    constructor(intendedPickupLocationService, pickupLocationsSearchService) {
        this.intendedPickupLocationService = intendedPickupLocationService;
        this.pickupLocationsSearchService = pickupLocationsSearchService;
        /** Event emitter triggered when a store is selected for pickup */
        this.storeSelected = new EventEmitter();
        // Intentional empty constructor
    }
    ngOnInit() {
        this.stores$ = this.pickupLocationsSearchService.getSearchResults(this.productCode);
        this.hasSearchStarted$ = this.pickupLocationsSearchService.hasSearchStarted(this.productCode);
        this.isSearchRunning$ = this.pickupLocationsSearchService.isSearchRunning();
    }
    /**
     * Select the store to pickup from. This also sets the user's preferred store
     * the selected point of service.
     *
     * @param store Store to pickup from
     */
    onSelectStore(store) {
        const { stockInfo: _, ...pointOfService } = store;
        this.intendedPickupLocationService.setIntendedLocation(this.productCode, {
            ...pointOfService,
            pickupOption: 'pickup',
        });
        this.storeSelected.emit();
    }
}
StoreListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreListComponent, deps: [{ token: i2$2.IntendedPickupLocationFacade }, { token: i2$2.PickupLocationsSearchFacade }], target: i0.ɵɵFactoryTarget.Component });
StoreListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StoreListComponent, selector: "cx-store-list", inputs: { productCode: "productCode" }, outputs: { storeSelected: "storeSelected" }, ngImport: i0, template: "<div\n  *ngIf=\"\n    !(isSearchRunning$ | async) && (stores$ | async) as stores;\n    else loading\n  \"\n>\n  <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n\n  <div\n    class=\"container\"\n    *ngIf=\"(hasSearchStarted$ | async) && stores.length === 0\"\n  >\n    <div class=\"row\">\n      <span class=\"cx-no-stores\" role=\"alert\">\n        {{ 'storeList.noStoresMessage' | cxTranslate }}\n      </span>\n    </div>\n  </div>\n\n  <div *ngIf=\"stores.length\">\n    <cx-store\n      *ngFor=\"let store of stores\"\n      [storeDetails]=\"store\"\n      (storeSelected)=\"onSelectStore($event)\"\n    ></cx-store>\n  </div>\n</div>\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1$1.SpinnerComponent, selector: "cx-spinner" }, { kind: "component", type: StoreComponent, selector: "cx-store", inputs: ["storeDetails"], outputs: ["storeSelected"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i2$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-store-list', template: "<div\n  *ngIf=\"\n    !(isSearchRunning$ | async) && (stores$ | async) as stores;\n    else loading\n  \"\n>\n  <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n\n  <div\n    class=\"container\"\n    *ngIf=\"(hasSearchStarted$ | async) && stores.length === 0\"\n  >\n    <div class=\"row\">\n      <span class=\"cx-no-stores\" role=\"alert\">\n        {{ 'storeList.noStoresMessage' | cxTranslate }}\n      </span>\n    </div>\n  </div>\n\n  <div *ngIf=\"stores.length\">\n    <cx-store\n      *ngFor=\"let store of stores\"\n      [storeDetails]=\"store\"\n      (storeSelected)=\"onSelectStore($event)\"\n    ></cx-store>\n  </div>\n</div>\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i2$2.IntendedPickupLocationFacade }, { type: i2$2.PickupLocationsSearchFacade }]; }, propDecorators: { productCode: [{
                type: Input
            }], storeSelected: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A service to wrap the browser's current position API.
 */
class CurrentLocationService {
    constructor(windowRef) {
        this.windowRef = windowRef;
        // Intentional empty constructor
    }
    /**
     * Obtains the user's current position for the browser and calls the provided callback with it.
     *
     * @param successCallback - A callback to be called with the current location.
     * @param errorCallback - A callback to be called with the error.
     * @param options - Options for the current position API.
     */
    getCurrentLocation(successCallback, errorCallback, options) {
        this.windowRef.nativeWindow?.navigator?.geolocation?.getCurrentPosition(successCallback, errorCallback, options);
    }
}
CurrentLocationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentLocationService, deps: [{ token: i2$1.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
CurrentLocationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentLocationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentLocationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2$1.WindowRef }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The search box and find my location button for finding points of
 * service to pickup from. Also with controls for toggling the display of
 * locations without stock.
 */
class StoreSearchComponent {
    constructor(currentLocationService) {
        this.currentLocationService = currentLocationService;
        /** Whether the hide out of stock checkbox appears checked */
        this.hideOutOfStock = false;
        /** Whether out of stock locations should be hidden in the search list */
        this.eventHideOutOfStock = new EventEmitter();
        /** The search parameters used to find pickup stores */
        this.findStores = new EventEmitter();
        /** Whether the loading spinner should be displayed */
        this.showSpinner = new EventEmitter();
        // Intentional empty constructor
    }
    /** Initiate a free text location search */
    onFindStores(location) {
        this.findStores.emit({ location });
        return false;
    }
    /** Toggle whether locations without stock should be displayed */
    onHideOutOfStock() {
        this.eventHideOutOfStock.emit(!this.hideOutOfStock);
    }
    /** Initiate a latitude and longitude search using the current browser location */
    useMyLocation() {
        this.showSpinner.emit(true);
        this.currentLocationService.getCurrentLocation(({ coords: { latitude, longitude } }) => {
            this.findStores.emit({ latitude, longitude });
            this.showSpinner.emit(false);
        });
    }
}
StoreSearchComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreSearchComponent, deps: [{ token: CurrentLocationService }], target: i0.ɵɵFactoryTarget.Component });
StoreSearchComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StoreSearchComponent, selector: "cx-store-search", inputs: { hideOutOfStock: "hideOutOfStock" }, outputs: { eventHideOutOfStock: "eventHideOutOfStock", findStores: "findStores", showSpinner: "showSpinner" }, ngImport: i0, template: "<div class=\"cx-find-a-store-container\">\n  <div class=\"cx-find-a-store-label\">\n    <label for=\"txtFindAStore\">\n      {{ 'storeSearch.findAStore' | cxTranslate }}\n    </label>\n  </div>\n  <div class=\"cx-find-a-store-input\">\n    <input\n      [placeholder]=\"'storeSearch.searchPlaceholder' | cxTranslate\"\n      class=\"form-control\"\n      type=\"text\"\n      id=\"txtFindAStore\"\n      #txtFindAStore\n    />\n  </div>\n  <div class=\"cx-find-a-store-button\">\n    <button\n      (click)=\"onFindStores(txtFindAStore.value)\"\n      class=\"btn btn-primary btn-block\"\n      id=\"btnFindStores\"\n    >\n      {{ 'storeSearch.findStores' | cxTranslate }}\n    </button>\n  </div>\n  <div class=\"cx-find-a-store-link-container\">\n    <a\n      class=\"cx-find-a-store-link\"\n      id=\"lnkUseMyLocation\"\n      (click)=\"useMyLocation()\"\n      tabindex=\"0\"\n      role=\"button\"\n    >\n      {{ 'storeSearch.useMyLocation' | cxTranslate }}\n    </a>\n  </div>\n  <div class=\"cx-find-a-store-hide-out-of-stock\">\n    <div class=\"cx-find-a-store-checkbox-group form-check\">\n      <label\n        class=\"cx-hide-out-of-stock-label form-check-label\"\n        for=\"chkHideOutOfStock\"\n      >\n        {{ 'storeSearch.hideOutOfStockOptions' | cxTranslate }}\n      </label>\n      <input\n        (click)=\"onHideOutOfStock()\"\n        [checked]=\"hideOutOfStock\"\n        class=\"form-check-input\"\n        id=\"chkHideOutOfStock\"\n        type=\"checkbox\"\n      />\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "pipe", type: i2$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreSearchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-store-search', template: "<div class=\"cx-find-a-store-container\">\n  <div class=\"cx-find-a-store-label\">\n    <label for=\"txtFindAStore\">\n      {{ 'storeSearch.findAStore' | cxTranslate }}\n    </label>\n  </div>\n  <div class=\"cx-find-a-store-input\">\n    <input\n      [placeholder]=\"'storeSearch.searchPlaceholder' | cxTranslate\"\n      class=\"form-control\"\n      type=\"text\"\n      id=\"txtFindAStore\"\n      #txtFindAStore\n    />\n  </div>\n  <div class=\"cx-find-a-store-button\">\n    <button\n      (click)=\"onFindStores(txtFindAStore.value)\"\n      class=\"btn btn-primary btn-block\"\n      id=\"btnFindStores\"\n    >\n      {{ 'storeSearch.findStores' | cxTranslate }}\n    </button>\n  </div>\n  <div class=\"cx-find-a-store-link-container\">\n    <a\n      class=\"cx-find-a-store-link\"\n      id=\"lnkUseMyLocation\"\n      (click)=\"useMyLocation()\"\n      tabindex=\"0\"\n      role=\"button\"\n    >\n      {{ 'storeSearch.useMyLocation' | cxTranslate }}\n    </a>\n  </div>\n  <div class=\"cx-find-a-store-hide-out-of-stock\">\n    <div class=\"cx-find-a-store-checkbox-group form-check\">\n      <label\n        class=\"cx-hide-out-of-stock-label form-check-label\"\n        for=\"chkHideOutOfStock\"\n      >\n        {{ 'storeSearch.hideOutOfStockOptions' | cxTranslate }}\n      </label>\n      <input\n        (click)=\"onHideOutOfStock()\"\n        [checked]=\"hideOutOfStock\"\n        class=\"form-check-input\"\n        id=\"chkHideOutOfStock\"\n        type=\"checkbox\"\n      />\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: CurrentLocationService }]; }, propDecorators: { hideOutOfStock: [{
                type: Input
            }], eventHideOutOfStock: [{
                type: Output
            }], findStores: [{
                type: Output
            }], showSpinner: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The dialog box to select the pickup location for a product.
 */
class PickupOptionDialogComponent {
    constructor(activeCartFacade, elementRef, intendedPickupLocationService, launchDialogService, pickupLocationsSearchService, pickupOptionFacade) {
        this.activeCartFacade = activeCartFacade;
        this.elementRef = elementRef;
        this.intendedPickupLocationService = intendedPickupLocationService;
        this.launchDialogService = launchDialogService;
        this.pickupLocationsSearchService = pickupLocationsSearchService;
        this.pickupOptionFacade = pickupOptionFacade;
        this.subscription = new Subscription();
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: 'input',
            focusOnEscape: true,
        };
        this.ICON_TYPE = ICON_TYPE;
        /** The reason given closing the dialog window without selecting a location */
        this.CLOSE_WITHOUT_SELECTION = 'CLOSE_WITHOUT_SELECTION';
        /** The reason given closing the dialog window after selecting a location */
        this.LOCATION_SELECTED = 'LOCATION_SELECTED';
        // Intentional empty constructor
    }
    handleClick(event) {
        if (event.target.tagName === this.elementRef.nativeElement.tagName) {
            this.close(this.CLOSE_WITHOUT_SELECTION);
        }
    }
    ngOnInit() {
        this.subscription.add(this.launchDialogService.data$.subscribe(({ productCode, entryNumber, quantity }) => {
            this.productCode = productCode;
            this.entryNumber = entryNumber;
            this.quantity = quantity;
        }));
        this.getHideOutOfStockState$ =
            this.pickupLocationsSearchService.getHideOutOfStock();
        this.subscription.add(this.pickupOptionFacade
            .getPageContext()
            .subscribe((_data) => (this.isPDP = _data === 'PDP')));
        this.subscription.add(this.activeCartFacade
            .getActive()
            .pipe(filter(cartWithIdAndUserId), tap((cart) => {
            this.cartId = cart.user.uid === 'anonymous' ? cart.guid : cart.code;
            this.userId = cart.user.uid;
        }))
            .subscribe());
    }
    /**
     * Find the pickup points of service nearest to a place based on given search parameters.
     * @param locationSearchParams The latitude and longitude or free text search query to be used
     */
    onFindStores(locationSearchParams) {
        this.pickupLocationsSearchService.startSearch({
            productCode: this.productCode,
            ...locationSearchParams,
        });
    }
    /**
     * Toggle whether locations without store should be shown or hidden.
     */
    onHideOutOfStock() {
        this.pickupLocationsSearchService.toggleHideOutOfStock();
    }
    /**
     * Close the dialog window. This has additional side effects based upon whether
     * we are making a selection on the PDP or in the cart/during checkout.
     *
     * On the PDP:
     *
     * If the dialog is closed without making a selection, then the radio buttons
     * are left on pickup if there already exists an intended pickup location or
     * to delivery if not.
     *
     * Not on the PDP:
     *
     * If the window is closed after making a selection, then the cart is updated
     * to the the new selection.
     *
     * @param reason The reason the dialog window was closed
     */
    close(reason) {
        this.launchDialogService.closeDialog(reason);
        if (reason === this.CLOSE_WITHOUT_SELECTION) {
            this.intendedPickupLocationService
                .getIntendedLocation(this.productCode)
                .pipe(filter((store) => typeof store !== 'undefined'), map((store) => store), filter((store) => !store.name), take(1), tap(() => this.intendedPickupLocationService.setPickupOption(this.productCode, 'delivery')))
                .subscribe();
            this.pickupOptionFacade.setPickupOption(this.entryNumber, 'delivery');
            return;
        }
        this.subscription.add(this.intendedPickupLocationService
            .getIntendedLocation(this.productCode)
            .pipe(filter((store) => !this.isPDP && !!store), tap((store) => this.activeCartFacade.updateEntry(this.entryNumber, this.quantity, store.name, false)))
            .subscribe());
    }
    /**
     * Change if the loading spinner should be displayed or not.
     * @param showSpinner Whether the loading spinner should be displayed
     */
    showSpinner(showSpinner) {
        this.loading = showSpinner;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
PickupOptionDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionDialogComponent, deps: [{ token: i1.ActiveCartFacade }, { token: i0.ElementRef }, { token: i2$2.IntendedPickupLocationFacade }, { token: i1$1.LaunchDialogService }, { token: i2$2.PickupLocationsSearchFacade }, { token: i2$2.PickupOptionFacade }], target: i0.ɵɵFactoryTarget.Component });
PickupOptionDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: PickupOptionDialogComponent, selector: "cx-pickup-option-dialog", host: { listeners: { "click": "handleClick($event)" } }, ngImport: i0, template: "<div\n  class=\"cx-pickup-option-dialog cx-modal-container\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close(CLOSE_WITHOUT_SELECTION)\"\n  role=\"dialog\"\n  aria-modal=\"true\"\n  aria-labelledby=\"cx-pickup-option-dialog-title\"\n>\n  <div class=\"cx-dialog-content\">\n    <!-- Modal Header -->\n    <div class=\"modal-header cx-dialog-header\">\n      <div id=\"cx-pickup-option-dialog-title\" class=\"cx-dialog-title\">\n        {{ 'pickupOptionDialog.modalHeader' | cxTranslate }}\n      </div>\n\n      <button\n        (click)=\"close(CLOSE_WITHOUT_SELECTION)\"\n        class=\"cx-dialog-close close\"\n        [attr.aria-label]=\"'pickupOptionDialog.close' | cxTranslate\"\n        type=\"button\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"ICON_TYPE.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n\n    <!-- Modal Body -->\n    <section class=\"cx-dialog-body modal-body\">\n      <cx-store-search\n        [hideOutOfStock]=\"getHideOutOfStockState$ | async\"\n        (findStores)=\"onFindStores($event)\"\n        (showSpinner)=\"showSpinner($event)\"\n        (eventHideOutOfStock)=\"onHideOutOfStock()\"\n      ></cx-store-search>\n      <cx-store-list\n        [productCode]=\"productCode\"\n        (storeSelected)=\"close(LOCATION_SELECTED)\"\n      ></cx-store-list>\n      <div *ngIf=\"loading\">\n        <div class=\"cx-spinner\">\n          <cx-spinner></cx-spinner>\n        </div>\n      </div>\n    </section>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1$1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i1$1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "component", type: i1$1.SpinnerComponent, selector: "cx-spinner" }, { kind: "component", type: StoreListComponent, selector: "cx-store-list", inputs: ["productCode"], outputs: ["storeSelected"] }, { kind: "component", type: StoreSearchComponent, selector: "cx-store-search", inputs: ["hideOutOfStock"], outputs: ["eventHideOutOfStock", "findStores", "showSpinner"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i2$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-pickup-option-dialog', template: "<div\n  class=\"cx-pickup-option-dialog cx-modal-container\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close(CLOSE_WITHOUT_SELECTION)\"\n  role=\"dialog\"\n  aria-modal=\"true\"\n  aria-labelledby=\"cx-pickup-option-dialog-title\"\n>\n  <div class=\"cx-dialog-content\">\n    <!-- Modal Header -->\n    <div class=\"modal-header cx-dialog-header\">\n      <div id=\"cx-pickup-option-dialog-title\" class=\"cx-dialog-title\">\n        {{ 'pickupOptionDialog.modalHeader' | cxTranslate }}\n      </div>\n\n      <button\n        (click)=\"close(CLOSE_WITHOUT_SELECTION)\"\n        class=\"cx-dialog-close close\"\n        [attr.aria-label]=\"'pickupOptionDialog.close' | cxTranslate\"\n        type=\"button\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"ICON_TYPE.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n\n    <!-- Modal Body -->\n    <section class=\"cx-dialog-body modal-body\">\n      <cx-store-search\n        [hideOutOfStock]=\"getHideOutOfStockState$ | async\"\n        (findStores)=\"onFindStores($event)\"\n        (showSpinner)=\"showSpinner($event)\"\n        (eventHideOutOfStock)=\"onHideOutOfStock()\"\n      ></cx-store-search>\n      <cx-store-list\n        [productCode]=\"productCode\"\n        (storeSelected)=\"close(LOCATION_SELECTED)\"\n      ></cx-store-list>\n      <div *ngIf=\"loading\">\n        <div class=\"cx-spinner\">\n          <cx-spinner></cx-spinner>\n        </div>\n      </div>\n    </section>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i0.ElementRef }, { type: i2$2.IntendedPickupLocationFacade }, { type: i1$1.LaunchDialogService }, { type: i2$2.PickupLocationsSearchFacade }, { type: i2$2.PickupOptionFacade }]; }, propDecorators: { handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultPickupOptionsDialogLayoutConfig = {
    launch: {
        PICKUP_IN_STORE: {
            inlineRoot: true,
            component: PickupOptionDialogComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StoreListModule {
}
StoreListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StoreListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: StoreListModule, declarations: [StoreListComponent], imports: [CommonModule, I18nModule, IconModule, SpinnerModule, StoreModule], exports: [StoreListComponent] });
StoreListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreListModule, imports: [CommonModule, I18nModule, IconModule, SpinnerModule, StoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, IconModule, SpinnerModule, StoreModule],
                    exports: [StoreListComponent],
                    declarations: [StoreListComponent],
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
class StoreSearchModule {
}
StoreSearchModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreSearchModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StoreSearchModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: StoreSearchModule, declarations: [StoreSearchComponent], imports: [CommonModule, I18nModule], exports: [StoreSearchComponent] });
StoreSearchModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreSearchModule, imports: [CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreSearchModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule],
                    exports: [StoreSearchComponent],
                    declarations: [StoreSearchComponent],
                    providers: [],
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
class PickupOptionDialogModule {
}
PickupOptionDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PickupOptionDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionDialogModule, declarations: [PickupOptionDialogComponent], imports: [CommonModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule,
        SpinnerModule,
        StoreListModule,
        StoreSearchModule], exports: [PickupOptionDialogComponent] });
PickupOptionDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionDialogModule, imports: [CommonModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule,
        SpinnerModule,
        StoreListModule,
        StoreSearchModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        IconModule,
                        KeyboardFocusModule,
                        SpinnerModule,
                        StoreListModule,
                        StoreSearchModule,
                    ],
                    entryComponents: [PickupOptionDialogComponent],
                    declarations: [PickupOptionDialogComponent],
                    exports: [PickupOptionDialogComponent],
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
class PickupInStoreComponentsModule {
}
PickupInStoreComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PickupInStoreComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreComponentsModule, imports: [ReactiveFormsModule,
        PickupInfoContainerModule,
        MyPreferredStoreModule,
        PickUpItemsDetailsModule,
        PdpPickupOptionsContainerModule, i1$1.OutletModule, CartPickupOptionsContainerModule,
        OrderConsignmentContainerModule] });
PickupInStoreComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreComponentsModule, providers: [provideDefaultConfig(defaultPickupOptionsDialogLayoutConfig)], imports: [ReactiveFormsModule,
        PickupInfoContainerModule,
        MyPreferredStoreModule,
        PickUpItemsDetailsModule,
        PdpPickupOptionsContainerModule,
        OutletModule.forChild(),
        CartPickupOptionsContainerModule,
        OrderConsignmentContainerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ReactiveFormsModule,
                        PickupInfoContainerModule,
                        MyPreferredStoreModule,
                        PickUpItemsDetailsModule,
                        PdpPickupOptionsContainerModule,
                        OutletModule.forChild(),
                        CartPickupOptionsContainerModule,
                        OrderConsignmentContainerModule,
                    ],
                    providers: [provideDefaultConfig(defaultPickupOptionsDialogLayoutConfig)],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CartPickupOptionsContainerComponent, CartPickupOptionsContainerModule, MyPreferredStoreComponent, MyPreferredStoreModule, OrderConsignmentContainerModule, PdpPickupOptionsContainerComponent, PdpPickupOptionsContainerModule, PickUpItemsDetailsComponent, PickUpItemsDetailsModule, PickupInStoreComponentsModule, PickupInStoreOrderConsignmentContainerComponent, PickupInfoComponent, PickupInfoContainerComponent, PickupInfoContainerModule, PickupInfoModule, PickupOptionDialogComponent, PickupOptionDialogModule, PickupOptionsComponent, PickupOptionsModule, StoreAddressComponent, StoreComponent, StoreListComponent, StoreListModule, StoreModule, StoreScheduleComponent, StoreSearchComponent, StoreSearchModule, defaultPickupOptionsDialogLayoutConfig, orderEntryWithRequiredFields };
//# sourceMappingURL=spartacus-pickup-in-store-components.mjs.map
