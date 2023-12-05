import * as i0 from '@angular/core';
import { Injectable, Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { CheckoutPlaceOrderComponent, CheckoutAuthGuard, CartNotEmptyGuard } from '@spartacus/checkout/base/components';
import * as i1 from '@spartacus/order/root';
import { DaysOfWeek, recurrencePeriod, ORDER_TYPE } from '@spartacus/order/root';
import { Subscription, BehaviorSubject, merge } from 'rxjs';
import * as i2 from '@spartacus/core';
import { LogoutEvent, LoginEvent, UrlModule, I18nModule, provideDefaultConfig } from '@spartacus/core';
import * as i3 from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import * as i4 from '@spartacus/storefront';
import { AtMessageModule, ICON_TYPE, IconModule } from '@spartacus/storefront';
import { MergeCartSuccessEvent } from '@spartacus/cart/base/root';
import { SaveCartSuccessEvent, RestoreSavedCartSuccessEvent } from '@spartacus/cart/saved-cart/root';
import { CheckoutDeliveryAddressSetEvent, CheckoutDeliveryAddressClearedEvent, CheckoutDeliveryModeSetEvent, CheckoutDeliveryModeClearedEvent, CheckoutPaymentDetailsCreatedEvent, CheckoutPaymentDetailsSetEvent } from '@spartacus/checkout/base/root';
import * as i6 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i2$1 from '@angular/common';
import { CommonModule } from '@angular/common';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutReplenishmentFormService {
    constructor(eventService) {
        this.eventService = eventService;
        this.subscriptions = new Subscription();
        /**
         * Default form data
         */
        this.defaultFormData = {
            daysOfWeek: [DaysOfWeek.MONDAY],
            nthDayOfMonth: '1',
            numberOfDays: '14',
            numberOfWeeks: '1',
            recurrencePeriod: recurrencePeriod.DAILY,
            replenishmentStartDate: new Date().toISOString().split('T')[0],
        };
        this.scheduleReplenishmentFormData$ = new BehaviorSubject(this.defaultFormData);
        this.orderType$ = new BehaviorSubject(ORDER_TYPE.PLACE_ORDER);
        this.registerOrderTypeEventListers();
    }
    registerOrderTypeEventListers() {
        this.subscriptions.add(merge(this.eventService.get(CheckoutDeliveryAddressSetEvent), this.eventService.get(CheckoutDeliveryAddressClearedEvent), this.eventService.get(CheckoutDeliveryModeSetEvent), this.eventService.get(CheckoutDeliveryModeClearedEvent), this.eventService.get(CheckoutPaymentDetailsCreatedEvent), this.eventService.get(CheckoutPaymentDetailsSetEvent), this.eventService.get(LogoutEvent), this.eventService.get(LoginEvent), this.eventService.get(SaveCartSuccessEvent), this.eventService.get(RestoreSavedCartSuccessEvent), this.eventService.get(MergeCartSuccessEvent)).subscribe(() => {
            this.orderType$.next(ORDER_TYPE.PLACE_ORDER);
        }));
    }
    /**
     * Get replenishment form data
     */
    getScheduleReplenishmentFormData() {
        return this.scheduleReplenishmentFormData$;
    }
    /**
     * Set replenishment form data
     * @param formData : an object containing the data for scheduling a replenishment order
     */
    setScheduleReplenishmentFormData(formData) {
        this
            .scheduleReplenishmentFormData$.next(formData);
    }
    /**
     * Clears the existing replenishment form data to include the default replenishment form data
     */
    resetScheduleReplenishmentFormData() {
        this
            .scheduleReplenishmentFormData$.next(this.defaultFormData);
    }
    /**
     * Get current checkout order type
     */
    getOrderType() {
        return this.orderType$;
    }
    /**
     * Set checkout order type
     * @param orderType : an enum of types of order we are placing
     */
    setOrderType(orderType) {
        this.orderType$.next(orderType);
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
CheckoutReplenishmentFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutReplenishmentFormService, deps: [{ token: i2.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutReplenishmentFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutReplenishmentFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutReplenishmentFormService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.EventService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutScheduledReplenishmentPlaceOrderComponent extends CheckoutPlaceOrderComponent {
    constructor(orderFacade, routingService, fb, launchDialogService, vcr, checkoutReplenishmentFormService, scheduledReplenishmentOrderFacade) {
        super(orderFacade, routingService, fb, launchDialogService, vcr);
        this.orderFacade = orderFacade;
        this.routingService = routingService;
        this.fb = fb;
        this.launchDialogService = launchDialogService;
        this.vcr = vcr;
        this.checkoutReplenishmentFormService = checkoutReplenishmentFormService;
        this.scheduledReplenishmentOrderFacade = scheduledReplenishmentOrderFacade;
        this.subscriptions = new Subscription();
        this.daysOfWeekNotChecked$ = new BehaviorSubject(false);
    }
    submitForm() {
        if (this.checkoutSubmitForm.valid && !!this.currentOrderType) {
            this.placedOrder = this.launchDialogService.launch("PLACE_ORDER_SPINNER" /* LAUNCH_CALLER.PLACE_ORDER_SPINNER */, this.vcr);
            merge(this.currentOrderType === ORDER_TYPE.PLACE_ORDER
                ? this.orderFacade.placeOrder(this.checkoutSubmitForm.valid)
                : this.scheduledReplenishmentOrderFacade.scheduleReplenishmentOrder(this.scheduleReplenishmentFormData, this.checkoutSubmitForm.valid)).subscribe({
                error: () => {
                    if (this.placedOrder) {
                        this.placedOrder
                            .subscribe((component) => {
                            this.launchDialogService.clear("PLACE_ORDER_SPINNER" /* LAUNCH_CALLER.PLACE_ORDER_SPINNER */);
                            if (component) {
                                component.destroy();
                            }
                        })
                            .unsubscribe();
                    }
                },
                next: () => {
                    this.onSuccess();
                },
            });
        }
        else {
            this.checkoutSubmitForm.markAllAsTouched();
        }
    }
    ngOnInit() {
        this.subscriptions.add(this.checkoutReplenishmentFormService
            .getOrderType()
            .subscribe((orderType) => (this.currentOrderType = orderType)));
        this.subscriptions.add(this.checkoutReplenishmentFormService
            .getScheduleReplenishmentFormData()
            .subscribe((data) => {
            var _a;
            this.scheduleReplenishmentFormData = data;
            this.daysOfWeekNotChecked$.next(((_a = data.daysOfWeek) === null || _a === void 0 ? void 0 : _a.length) === 0 &&
                data.recurrencePeriod === recurrencePeriod.WEEKLY);
        }));
    }
    onSuccess() {
        switch (this.currentOrderType) {
            case ORDER_TYPE.PLACE_ORDER: {
                super.onSuccess();
                break;
            }
            case ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER: {
                this.routingService.go({ cxRoute: 'replenishmentConfirmation' });
                break;
            }
        }
        this.checkoutReplenishmentFormService.resetScheduleReplenishmentFormData();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        super.ngOnDestroy();
    }
}
CheckoutScheduledReplenishmentPlaceOrderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentPlaceOrderComponent, deps: [{ token: i1.OrderFacade }, { token: i2.RoutingService }, { token: i3.UntypedFormBuilder }, { token: i4.LaunchDialogService }, { token: i0.ViewContainerRef }, { token: CheckoutReplenishmentFormService }, { token: i1.ScheduledReplenishmentOrderFacade }], target: i0.ɵɵFactoryTarget.Component });
CheckoutScheduledReplenishmentPlaceOrderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CheckoutScheduledReplenishmentPlaceOrderComponent, selector: "cx-place-order", usesInheritance: true, ngImport: i0, template: "<form class=\"cx-place-order-form form-check\" [formGroup]=\"checkoutSubmitForm\">\n  <div class=\"form-group\">\n    <label>\n      <input\n        formControlName=\"termsAndConditions\"\n        class=\"scaled-input form-check-input\"\n        type=\"checkbox\"\n      />\n      <span class=\"form-check-label\">\n        {{ 'checkoutReview.confirmThatRead' | cxTranslate }}\n        <a\n          [routerLink]=\"{ cxRoute: 'termsAndConditions' } | cxUrl\"\n          class=\"cx-tc-link\"\n          target=\"_blank\"\n          rel=\"noopener noreferrer\"\n        >\n          {{ 'checkoutReview.termsAndConditions' | cxTranslate }}\n        </a>\n      </span>\n    </label>\n  </div>\n\n  <button\n    (click)=\"submitForm()\"\n    class=\"btn btn-primary btn-block\"\n    [disabled]=\"termsAndConditionInvalid || (daysOfWeekNotChecked$ | async)\"\n    [cxAtMessage]=\"'checkoutReview.orderInProcess' | cxTranslate\"\n  >\n    {{ 'checkoutReview.placeOrder' | cxTranslate }}\n  </button>\n</form>\n", dependencies: [{ kind: "directive", type: i4.AtMessageDirective, selector: "[cxAtMessage]", inputs: ["cxAtMessage"] }, { kind: "directive", type: i6.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentPlaceOrderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-place-order', changeDetection: ChangeDetectionStrategy.OnPush, template: "<form class=\"cx-place-order-form form-check\" [formGroup]=\"checkoutSubmitForm\">\n  <div class=\"form-group\">\n    <label>\n      <input\n        formControlName=\"termsAndConditions\"\n        class=\"scaled-input form-check-input\"\n        type=\"checkbox\"\n      />\n      <span class=\"form-check-label\">\n        {{ 'checkoutReview.confirmThatRead' | cxTranslate }}\n        <a\n          [routerLink]=\"{ cxRoute: 'termsAndConditions' } | cxUrl\"\n          class=\"cx-tc-link\"\n          target=\"_blank\"\n          rel=\"noopener noreferrer\"\n        >\n          {{ 'checkoutReview.termsAndConditions' | cxTranslate }}\n        </a>\n      </span>\n    </label>\n  </div>\n\n  <button\n    (click)=\"submitForm()\"\n    class=\"btn btn-primary btn-block\"\n    [disabled]=\"termsAndConditionInvalid || (daysOfWeekNotChecked$ | async)\"\n    [cxAtMessage]=\"'checkoutReview.orderInProcess' | cxTranslate\"\n  >\n    {{ 'checkoutReview.placeOrder' | cxTranslate }}\n  </button>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: i1.OrderFacade }, { type: i2.RoutingService }, { type: i3.UntypedFormBuilder }, { type: i4.LaunchDialogService }, { type: i0.ViewContainerRef }, { type: CheckoutReplenishmentFormService }, { type: i1.ScheduledReplenishmentOrderFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutScheduledReplenishmentPlaceOrderModule {
}
CheckoutScheduledReplenishmentPlaceOrderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentPlaceOrderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutScheduledReplenishmentPlaceOrderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentPlaceOrderModule, declarations: [CheckoutScheduledReplenishmentPlaceOrderComponent], imports: [AtMessageModule,
        CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule], exports: [CheckoutScheduledReplenishmentPlaceOrderComponent] });
CheckoutScheduledReplenishmentPlaceOrderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentPlaceOrderModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutPlaceOrder: {
                    component: CheckoutScheduledReplenishmentPlaceOrderComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                },
            },
        }),
    ], imports: [AtMessageModule,
        CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentPlaceOrderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AtMessageModule,
                        CommonModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        ReactiveFormsModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutPlaceOrder: {
                                    component: CheckoutScheduledReplenishmentPlaceOrderComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutScheduledReplenishmentPlaceOrderComponent],
                    exports: [CheckoutScheduledReplenishmentPlaceOrderComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutScheduleReplenishmentOrderComponent {
    constructor(checkoutReplenishmentFormService) {
        this.checkoutReplenishmentFormService = checkoutReplenishmentFormService;
        this.subscription = new Subscription();
        this.iconTypes = ICON_TYPE;
        this.orderTypes = ORDER_TYPE;
        this.daysOfWeek = Object.values(DaysOfWeek);
        this.recurrencePeriodType = Object.values(recurrencePeriod);
        this.selectedOrderType$ = this.checkoutReplenishmentFormService.getOrderType();
        this.isMonthly = false;
        this.isWeekly = false;
        this.currentDaysOfWeek = [];
    }
    ngOnInit() {
        this.subscription.add(this.checkoutReplenishmentFormService
            .getScheduleReplenishmentFormData()
            .subscribe((data) => {
            this.scheduleReplenishmentFormData = data;
        }));
        this.initConfig();
    }
    changeOrderType(orderType) {
        this.checkoutReplenishmentFormService.setOrderType(orderType);
    }
    changeNumberOfDays(nDays) {
        this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData(Object.assign(Object.assign({}, this.scheduleReplenishmentFormData), { numberOfDays: nDays }));
    }
    changeNumberOfWeeks(nWeeks) {
        this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData(Object.assign(Object.assign({}, this.scheduleReplenishmentFormData), { numberOfWeeks: nWeeks }));
    }
    changeRecurrencePeriodType(type) {
        this.isWeekly = type === recurrencePeriod.WEEKLY;
        this.isMonthly = type === recurrencePeriod.MONTHLY;
        this.numberOfDays = this.isMonthly
            ? this.createNumberStringArray(31)
            : this.createNumberStringArray(30);
        this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData(Object.assign(Object.assign({}, this.scheduleReplenishmentFormData), { recurrencePeriod: type }));
    }
    changeDayOfTheMonth(dayOfMonth) {
        this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData(Object.assign(Object.assign({}, this.scheduleReplenishmentFormData), { nthDayOfMonth: dayOfMonth }));
    }
    changeReplenishmentStartDate(date) {
        if (Boolean(date)) {
            this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData(Object.assign(Object.assign({}, this.scheduleReplenishmentFormData), { replenishmentStartDate: date }));
        }
    }
    changeRepeatDays(day, isChecked) {
        if (isChecked) {
            this.currentDaysOfWeek = [...this.currentDaysOfWeek];
            this.currentDaysOfWeek.push(day);
            this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData(Object.assign(Object.assign({}, this.scheduleReplenishmentFormData), { daysOfWeek: this.currentDaysOfWeek }));
        }
        else {
            const foundDay = this.currentDaysOfWeek.find((data) => day === data);
            if (!foundDay) {
                return;
            }
            const index = this.currentDaysOfWeek.indexOf(foundDay);
            this.currentDaysOfWeek.splice(index, 1);
            this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData(Object.assign(Object.assign({}, this.scheduleReplenishmentFormData), { daysOfWeek: this.currentDaysOfWeek }));
        }
    }
    hasDaysOfWeekChecked(day) {
        return this.currentDaysOfWeek.includes(day);
    }
    initConfig() {
        var _a;
        this.isMonthly =
            this.scheduleReplenishmentFormData.recurrencePeriod ===
                recurrencePeriod.MONTHLY;
        this.isWeekly =
            this.scheduleReplenishmentFormData.recurrencePeriod ===
                recurrencePeriod.WEEKLY;
        this.currentDaysOfWeek = [
            ...((_a = this.scheduleReplenishmentFormData.daysOfWeek) !== null && _a !== void 0 ? _a : []),
        ];
        this.numberOfDays = this.isMonthly
            ? this.createNumberStringArray(31)
            : this.createNumberStringArray(30);
        this.numberOfWeeks = this.createNumberStringArray(12);
        this.currentDate =
            this.scheduleReplenishmentFormData.replenishmentStartDate;
    }
    createNumberStringArray(n) {
        return Array(n)
            .fill(0)
            .map((_, y) => (y + 1).toString());
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CheckoutScheduleReplenishmentOrderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduleReplenishmentOrderComponent, deps: [{ token: CheckoutReplenishmentFormService }], target: i0.ɵɵFactoryTarget.Component });
CheckoutScheduleReplenishmentOrderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CheckoutScheduleReplenishmentOrderComponent, selector: "cx-schedule-replenishment-order", ngImport: i0, template: "<div class=\"cx-order-type-card\">\n  <div class=\"cx-label-container\">\n    <h5 class=\"cx-order-replenishment-header\">\n      {{ 'checkoutScheduledReplenishment.autoReplenishOrder' | cxTranslate }}\n    </h5>\n    <cx-icon [type]=\"iconTypes.CLOCK\"></cx-icon>\n  </div>\n  <div\n    class=\"cx-order-type-container form-check\"\n    *ngFor=\"let type of orderTypes | keyvalue\"\n  >\n    <input\n      id=\"orderType-{{ type.value }}\"\n      class=\"scaled-input form-check-input\"\n      role=\"radio\"\n      type=\"radio\"\n      formControlName=\"orderType\"\n      aria-checked=\"true\"\n      (change)=\"changeOrderType(type.value)\"\n      [value]=\"type.value\"\n      [checked]=\"type.value === (selectedOrderType$ | async)\"\n    />\n    <label\n      class=\"order-type-label form-check-label form-radio-label\"\n      for=\"orderType-{{ type.value }}\"\n    >\n      <div class=\"order-type\">\n        {{\n          'checkoutScheduledReplenishment.orderType_' + type?.value\n            | cxTranslate\n        }}\n      </div>\n    </label>\n  </div>\n  <ng-container\n    *ngIf=\"\n      scheduleReplenishmentFormData &&\n      (selectedOrderType$ | async) === orderTypes.SCHEDULE_REPLENISHMENT_ORDER\n    \"\n  >\n    <div class=\"cx-replenishment-form-data-container\">\n      <div *ngIf=\"!isMonthly\" class=\"cx-days\">\n        <span class=\"form-data-label\">{{\n          'checkoutScheduledReplenishment.every' | cxTranslate\n        }}</span>\n        <ng-container *ngIf=\"isWeekly; else isDaily\">\n          <select\n            class=\"form-control\"\n            (change)=\"changeNumberOfWeeks($event.target.value)\"\n          >\n            <option\n              *ngFor=\"let nWeeks of numberOfWeeks\"\n              [value]=\"nWeeks\"\n              [selected]=\"\n                nWeeks === scheduleReplenishmentFormData.numberOfWeeks\n              \"\n            >\n              {{ nWeeks }}\n            </option>\n          </select>\n        </ng-container>\n        <ng-template #isDaily>\n          <select\n            class=\"form-control\"\n            (change)=\"changeNumberOfDays($event.target.value)\"\n          >\n            <option\n              *ngFor=\"let nDays of numberOfDays\"\n              [value]=\"nDays\"\n              [selected]=\"nDays === scheduleReplenishmentFormData.numberOfDays\"\n            >\n              {{ nDays }}\n            </option>\n          </select>\n        </ng-template>\n      </div>\n      <div class=\"cx-month\">\n        <span *ngIf=\"isMonthly\" class=\"form-data-label\">{{\n          'checkoutScheduledReplenishment.every' | cxTranslate\n        }}</span>\n        <select\n          class=\"form-control\"\n          (change)=\"changeRecurrencePeriodType($event.target.value)\"\n        >\n          <option\n            *ngFor=\"let type of recurrencePeriodType\"\n            [value]=\"type\"\n            [selected]=\"type === scheduleReplenishmentFormData.recurrencePeriod\"\n          >\n            {{\n              'checkoutScheduledReplenishment.recurrencePeriodType_' + type\n                | cxTranslate\n            }}\n          </option>\n        </select>\n      </div>\n      <div *ngIf=\"isMonthly\" class=\"cx-dayMonth\">\n        <span class=\"form-data-label\">{{\n          'checkoutScheduledReplenishment.dayOfMonth' | cxTranslate\n        }}</span>\n        <div class=\"cx-day-of-month\">\n          <select\n            class=\"form-control\"\n            (change)=\"changeDayOfTheMonth($event.target.value)\"\n          >\n            <option\n              *ngFor=\"let nDays of numberOfDays\"\n              [value]=\"nDays\"\n              [selected]=\"nDays === scheduleReplenishmentFormData.nthDayOfMonth\"\n            >\n              {{ nDays }}\n            </option>\n          </select>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"cx-replenishment-form-data-container\">\n      <span class=\"form-data-label\">{{\n        'checkoutScheduledReplenishment.startOn' | cxTranslate\n      }}</span>\n      <div class=\"cx-replenishment-date\">\n        <input\n          type=\"date\"\n          placeholder=\"yyyy-mm-dd\"\n          [value]=\"currentDate\"\n          (change)=\"changeReplenishmentStartDate($event.target.value)\"\n        />\n      </div>\n    </div>\n\n    <div\n      *ngIf=\"isWeekly\"\n      class=\"cx-replenishment-form-data-container cx-repeat-days-container\"\n    >\n      <span class=\"cx-repeat-days form-data-label\">{{\n        'checkoutScheduledReplenishment.repeatOnDays' | cxTranslate\n      }}</span>\n      <div *ngFor=\"let day of daysOfWeek\" class=\"form-check\">\n        <label for=\"day-{{ day }}\" class=\"cx-week-day\">{{\n          day | titlecase\n        }}</label\n        ><input\n          id=\"day-{{ day }}\"\n          type=\"checkbox\"\n          class=\"form-check-input\"\n          [checked]=\"hasDaysOfWeekChecked(day)\"\n          (change)=\"changeRepeatDays(day, $event.target.checked)\"\n        />\n      </div>\n    </div>\n  </ng-container>\n</div>\n", dependencies: [{ kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2$1.TitleCasePipe, name: "titlecase" }, { kind: "pipe", type: i2$1.KeyValuePipe, name: "keyvalue" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduleReplenishmentOrderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-schedule-replenishment-order', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-order-type-card\">\n  <div class=\"cx-label-container\">\n    <h5 class=\"cx-order-replenishment-header\">\n      {{ 'checkoutScheduledReplenishment.autoReplenishOrder' | cxTranslate }}\n    </h5>\n    <cx-icon [type]=\"iconTypes.CLOCK\"></cx-icon>\n  </div>\n  <div\n    class=\"cx-order-type-container form-check\"\n    *ngFor=\"let type of orderTypes | keyvalue\"\n  >\n    <input\n      id=\"orderType-{{ type.value }}\"\n      class=\"scaled-input form-check-input\"\n      role=\"radio\"\n      type=\"radio\"\n      formControlName=\"orderType\"\n      aria-checked=\"true\"\n      (change)=\"changeOrderType(type.value)\"\n      [value]=\"type.value\"\n      [checked]=\"type.value === (selectedOrderType$ | async)\"\n    />\n    <label\n      class=\"order-type-label form-check-label form-radio-label\"\n      for=\"orderType-{{ type.value }}\"\n    >\n      <div class=\"order-type\">\n        {{\n          'checkoutScheduledReplenishment.orderType_' + type?.value\n            | cxTranslate\n        }}\n      </div>\n    </label>\n  </div>\n  <ng-container\n    *ngIf=\"\n      scheduleReplenishmentFormData &&\n      (selectedOrderType$ | async) === orderTypes.SCHEDULE_REPLENISHMENT_ORDER\n    \"\n  >\n    <div class=\"cx-replenishment-form-data-container\">\n      <div *ngIf=\"!isMonthly\" class=\"cx-days\">\n        <span class=\"form-data-label\">{{\n          'checkoutScheduledReplenishment.every' | cxTranslate\n        }}</span>\n        <ng-container *ngIf=\"isWeekly; else isDaily\">\n          <select\n            class=\"form-control\"\n            (change)=\"changeNumberOfWeeks($event.target.value)\"\n          >\n            <option\n              *ngFor=\"let nWeeks of numberOfWeeks\"\n              [value]=\"nWeeks\"\n              [selected]=\"\n                nWeeks === scheduleReplenishmentFormData.numberOfWeeks\n              \"\n            >\n              {{ nWeeks }}\n            </option>\n          </select>\n        </ng-container>\n        <ng-template #isDaily>\n          <select\n            class=\"form-control\"\n            (change)=\"changeNumberOfDays($event.target.value)\"\n          >\n            <option\n              *ngFor=\"let nDays of numberOfDays\"\n              [value]=\"nDays\"\n              [selected]=\"nDays === scheduleReplenishmentFormData.numberOfDays\"\n            >\n              {{ nDays }}\n            </option>\n          </select>\n        </ng-template>\n      </div>\n      <div class=\"cx-month\">\n        <span *ngIf=\"isMonthly\" class=\"form-data-label\">{{\n          'checkoutScheduledReplenishment.every' | cxTranslate\n        }}</span>\n        <select\n          class=\"form-control\"\n          (change)=\"changeRecurrencePeriodType($event.target.value)\"\n        >\n          <option\n            *ngFor=\"let type of recurrencePeriodType\"\n            [value]=\"type\"\n            [selected]=\"type === scheduleReplenishmentFormData.recurrencePeriod\"\n          >\n            {{\n              'checkoutScheduledReplenishment.recurrencePeriodType_' + type\n                | cxTranslate\n            }}\n          </option>\n        </select>\n      </div>\n      <div *ngIf=\"isMonthly\" class=\"cx-dayMonth\">\n        <span class=\"form-data-label\">{{\n          'checkoutScheduledReplenishment.dayOfMonth' | cxTranslate\n        }}</span>\n        <div class=\"cx-day-of-month\">\n          <select\n            class=\"form-control\"\n            (change)=\"changeDayOfTheMonth($event.target.value)\"\n          >\n            <option\n              *ngFor=\"let nDays of numberOfDays\"\n              [value]=\"nDays\"\n              [selected]=\"nDays === scheduleReplenishmentFormData.nthDayOfMonth\"\n            >\n              {{ nDays }}\n            </option>\n          </select>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"cx-replenishment-form-data-container\">\n      <span class=\"form-data-label\">{{\n        'checkoutScheduledReplenishment.startOn' | cxTranslate\n      }}</span>\n      <div class=\"cx-replenishment-date\">\n        <input\n          type=\"date\"\n          placeholder=\"yyyy-mm-dd\"\n          [value]=\"currentDate\"\n          (change)=\"changeReplenishmentStartDate($event.target.value)\"\n        />\n      </div>\n    </div>\n\n    <div\n      *ngIf=\"isWeekly\"\n      class=\"cx-replenishment-form-data-container cx-repeat-days-container\"\n    >\n      <span class=\"cx-repeat-days form-data-label\">{{\n        'checkoutScheduledReplenishment.repeatOnDays' | cxTranslate\n      }}</span>\n      <div *ngFor=\"let day of daysOfWeek\" class=\"form-check\">\n        <label for=\"day-{{ day }}\" class=\"cx-week-day\">{{\n          day | titlecase\n        }}</label\n        ><input\n          id=\"day-{{ day }}\"\n          type=\"checkbox\"\n          class=\"form-check-input\"\n          [checked]=\"hasDaysOfWeekChecked(day)\"\n          (change)=\"changeRepeatDays(day, $event.target.checked)\"\n        />\n      </div>\n    </div>\n  </ng-container>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: CheckoutReplenishmentFormService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutScheduleReplenishmentOrderModule {
}
CheckoutScheduleReplenishmentOrderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduleReplenishmentOrderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutScheduleReplenishmentOrderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduleReplenishmentOrderModule, declarations: [CheckoutScheduleReplenishmentOrderComponent], imports: [CommonModule, RouterModule, I18nModule, IconModule], exports: [CheckoutScheduleReplenishmentOrderComponent] });
CheckoutScheduleReplenishmentOrderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduleReplenishmentOrderModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutScheduleReplenishmentOrder: {
                    component: CheckoutScheduleReplenishmentOrderComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                },
            },
        }),
    ], imports: [CommonModule, RouterModule, I18nModule, IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduleReplenishmentOrderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, I18nModule, IconModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutScheduleReplenishmentOrder: {
                                    component: CheckoutScheduleReplenishmentOrderComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutScheduleReplenishmentOrderComponent],
                    exports: [CheckoutScheduleReplenishmentOrderComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutScheduledReplenishmentComponentsModule {
}
CheckoutScheduledReplenishmentComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutScheduledReplenishmentComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentComponentsModule, imports: [CommonModule,
        CheckoutScheduleReplenishmentOrderModule,
        CheckoutScheduledReplenishmentPlaceOrderModule] });
CheckoutScheduledReplenishmentComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentComponentsModule, imports: [CommonModule,
        CheckoutScheduleReplenishmentOrderModule,
        CheckoutScheduledReplenishmentPlaceOrderModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CheckoutScheduleReplenishmentOrderModule,
                        CheckoutScheduledReplenishmentPlaceOrderModule,
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

export { CheckoutReplenishmentFormService, CheckoutScheduleReplenishmentOrderComponent, CheckoutScheduleReplenishmentOrderModule, CheckoutScheduledReplenishmentComponentsModule, CheckoutScheduledReplenishmentPlaceOrderComponent, CheckoutScheduledReplenishmentPlaceOrderModule };
//# sourceMappingURL=spartacus-checkout-scheduled-replenishment-components.mjs.map
