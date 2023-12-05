import * as i0 from '@angular/core';
import { Injectable, Component, Optional, NgModule } from '@angular/core';
import * as i6 from '@angular/forms';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CheckoutSupportedDeliveryModesQueryReloadEvent } from '@spartacus/checkout/base/root';
import * as i1 from '@spartacus/core';
import { facadeFactory, GlobalMessageType, CxDatePipe, I18nModule, provideDefaultConfigFactory } from '@spartacus/core';
import * as i4 from '@spartacus/storefront';
import { DatePickerModule, CardModule, provideOutlet, OutletPosition } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as i5 from '@angular/common';
import { CommonModule } from '@angular/common';
import { CartOutlets } from '@spartacus/cart/base/root';
import '@spartacus/order/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const REQUESTED_DELIVERY_DATE_FEATURE = 'requestedDeliveryDate';
const REQUESTED_DELIVERY_DATE_CORE_FEATURE = 'requestedDeliveryDateCore';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function requestedDeliveryDateFacadeFactory() {
    return facadeFactory({
        facade: RequestedDeliveryDateFacade,
        feature: REQUESTED_DELIVERY_DATE_FEATURE,
        methods: ['setRequestedDeliveryDate'],
    });
}
class RequestedDeliveryDateFacade {
}
RequestedDeliveryDateFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RequestedDeliveryDateFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateFacade, providedIn: 'root', useFactory: requestedDeliveryDateFacadeFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: requestedDeliveryDateFacadeFactory,
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class DateValidationService {
    /**
     * Validates if the string is containing a date string.
     * @param value Date string in the format 'dd-mm-yyy'
     * @returns true if valid, false if invalid
     */
    isDateStringValid(value) {
        return (value != null &&
            value !== undefined &&
            value.length > 0 &&
            !isNaN(this.getDateFromDateString(value).getDate() //convert 'dd-mm-yyyy' into 'mm/dd/yyyy'
            ));
    }
    /**
     * Returns a Date object from a date string in the format 'dd-mm-yyy'
     * @param value Date string in the format 'dd-mm-yyy'
     */
    getDateFromDateString(value) {
        return new Date(value.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3'));
    }
    /**
     * Checks if the source date is greater than or equal to the target
     * @param source Date string in the format 'dd-mm-yyy'
     * @param target Date string in the format 'dd-mm-yyy'
     * @returns true if `source` date is greater than or equal to `target` date
     */
    isDateGreaterOrEqual(source, target) {
        if (source.length === 0 || target.length === 0) {
            return false;
        }
        const d1 = this.getDateFromDateString(source);
        const d2 = this.getDateFromDateString(target);
        return d1 < d2 ? false : true;
    }
}
DateValidationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DateValidationService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DateValidationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DateValidationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DateValidationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

class DeliveryModeDatePickerComponent {
    constructor(datePipe, requestedDelDateFacade, dateValidationService, eventService, translation, globalMessageService, deliveryOutlet) {
        this.datePipe = datePipe;
        this.requestedDelDateFacade = requestedDelDateFacade;
        this.dateValidationService = dateValidationService;
        this.eventService = eventService;
        this.translation = translation;
        this.globalMessageService = globalMessageService;
        this.deliveryOutlet = deliveryOutlet;
        this.cartEntry = {};
        this.subscription = new Subscription();
        this.form = new FormGroup({
            requestDeliveryDate: new FormControl(),
        });
        this.isDatePickerReadOnly = true;
    }
    ngOnInit() {
        if (this.deliveryOutlet?.context$) {
            this.subscription.add(this.deliveryOutlet.context$.subscribe((context) => {
                this.cartEntry = context?.item;
                this.isDatePickerReadOnly = context?.readonly || false;
            }));
        }
        if (this.isEarliestRetrievalDatePresent()) {
            this.earliestRetrievalAt = this.cartEntry.earliestRetrievalAt;
        }
        if (this.isRequestedDeliveryDatePresent()) {
            this.requestedRetrievalAt = this.cartEntry.requestedRetrievalAt;
        }
        else {
            //set the value of requestedRetrievalAt as earliestRetrievalAt and update occ.
            this.requestedRetrievalAt = this.earliestRetrievalAt;
            this.form.patchValue({
                requestDeliveryDate: this.requestedRetrievalAt,
            });
            this.setRequestedDeliveryDate();
        }
        this.form.patchValue({
            requestDeliveryDate: this.requestedRetrievalAt,
        });
    }
    isEarliestRetrievalDatePresent() {
        return this.dateValidationService.isDateStringValid(this.cartEntry?.earliestRetrievalAt);
    }
    isRequestedDeliveryDatePresent() {
        return this.dateValidationService.isDateStringValid(this.cartEntry?.requestedRetrievalAt);
    }
    getRequestedDeliveryDateCardContent(isoDate) {
        return this.translation
            .translate('requestedDeliveryDate.readOnlyTextLabel')
            .pipe(filter(() => Boolean(isoDate)), map((textTitle) => {
            return {
                text: [textTitle, isoDate],
            };
        }));
    }
    setRequestedDeliveryDate() {
        const userId = this.cartEntry?.user?.uid || '';
        const cartId = this.cartEntry?.code || '';
        const requestedDate = this.form?.get('requestDeliveryDate')?.value || '';
        if (userId.length === 0 ||
            cartId.length === 0 ||
            requestedDate.length === 0 ||
            !this.dateValidationService.isDateStringValid(requestedDate) ||
            !this.dateValidationService.isDateGreaterOrEqual(requestedDate, this.earliestRetrievalAt || '')) {
            return;
        }
        this.subscription.add(this.requestedDelDateFacade
            .setRequestedDeliveryDate(userId, cartId, requestedDate)
            .subscribe({
            next: () => {
                this.eventService.dispatch({}, CheckoutSupportedDeliveryModesQueryReloadEvent);
                this.globalMessageService.add({ key: 'requestedDeliveryDate.successMessage' }, GlobalMessageType.MSG_TYPE_INFO);
            },
            error: (error) => {
                if (error && this.getErrors(error)?.length) {
                    this.globalMessageService.add({ key: 'requestedDeliveryDate.errorMessage' }, GlobalMessageType.MSG_TYPE_ERROR);
                }
            },
        }));
    }
    getErrors(response) {
        return (response.error?.errors).filter((error) => error?.type === 'UnknownResourceError');
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
DeliveryModeDatePickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DeliveryModeDatePickerComponent, deps: [{ token: i1.CxDatePipe }, { token: RequestedDeliveryDateFacade }, { token: DateValidationService }, { token: i1.EventService }, { token: i1.TranslationService }, { token: i1.GlobalMessageService }, { token: i4.OutletContextData, optional: true }], target: i0.ɵɵFactoryTarget.Component });
DeliveryModeDatePickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: DeliveryModeDatePickerComponent, selector: "cx-request-delivery-date", providers: [CxDatePipe], ngImport: i0, template: "<ng-container *ngIf=\"isEarliestRetrievalDatePresent()\">\n  <ng-container *ngIf=\"isDatePickerReadOnly; else datePickerEnabled\">\n    <cx-card\n      [content]=\"\n        getRequestedDeliveryDateCardContent(requestedRetrievalAt | cxDate)\n          | async\n      \"\n    ></cx-card>\n  </ng-container>\n  <ng-template #datePickerEnabled>\n    <div class=\"form-check\">\n      <form [formGroup]=\"form\">\n        <label class=\"row\">\n          <div class=\"pl-4 col-8\">\n            {{ 'requestedDeliveryDate.datePickerLabel' | cxTranslate }}\n          </div>\n          <div class=\"col-4\">\n            <cx-date-picker\n              [control]=\"$any(form.get('requestDeliveryDate'))\"\n              [min]=\"earliestRetrievalAt\"\n              [required]=\"true\"\n              (update)=\"setRequestedDeliveryDate()\"\n            >\n            </cx-date-picker>\n          </div>\n        </label>\n      </form>\n    </div>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.DatePickerComponent, selector: "cx-date-picker", inputs: ["control", "min", "max", "required"], outputs: ["update"] }, { kind: "directive", type: i6.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i6.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i6.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "component", type: i4.CardComponent, selector: "cx-card", inputs: ["border", "editMode", "isDefault", "content", "fitToContainer", "truncateText", "charactersLimit", "index"], outputs: ["deleteCard", "setDefaultCard", "sendCard", "editCard", "cancelCard"] }, { kind: "pipe", type: i5.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i1.CxDatePipe, name: "cxDate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DeliveryModeDatePickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-request-delivery-date', providers: [CxDatePipe], template: "<ng-container *ngIf=\"isEarliestRetrievalDatePresent()\">\n  <ng-container *ngIf=\"isDatePickerReadOnly; else datePickerEnabled\">\n    <cx-card\n      [content]=\"\n        getRequestedDeliveryDateCardContent(requestedRetrievalAt | cxDate)\n          | async\n      \"\n    ></cx-card>\n  </ng-container>\n  <ng-template #datePickerEnabled>\n    <div class=\"form-check\">\n      <form [formGroup]=\"form\">\n        <label class=\"row\">\n          <div class=\"pl-4 col-8\">\n            {{ 'requestedDeliveryDate.datePickerLabel' | cxTranslate }}\n          </div>\n          <div class=\"col-4\">\n            <cx-date-picker\n              [control]=\"$any(form.get('requestDeliveryDate'))\"\n              [min]=\"earliestRetrievalAt\"\n              [required]=\"true\"\n              (update)=\"setRequestedDeliveryDate()\"\n            >\n            </cx-date-picker>\n          </div>\n        </label>\n      </form>\n    </div>\n  </ng-template>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CxDatePipe }, { type: RequestedDeliveryDateFacade }, { type: DateValidationService }, { type: i1.EventService }, { type: i1.TranslationService }, { type: i1.GlobalMessageService }, { type: i4.OutletContextData, decorators: [{
                    type: Optional
                }] }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderOverviewDeliveryDateComponent {
    constructor(dateValidationService, translation, orderOutlet) {
        this.dateValidationService = dateValidationService;
        this.translation = translation;
        this.orderOutlet = orderOutlet;
        this.subscription = new Subscription();
    }
    ngOnInit() {
        if (this.orderOutlet?.context$) {
            this.subscription.add(this.orderOutlet.context$.subscribe((context) => (this.order = context?.item)));
        }
    }
    isRequestedDeliveryDatePresent() {
        return this.dateValidationService.isDateStringValid(this.order?.requestedRetrievalAt);
    }
    getRequestedDeliveryDateCardContent(isoDate) {
        return this.translation
            .translate('requestedDeliveryDate.readOnlyTextLabel')
            .pipe(filter(() => Boolean(isoDate)), map((textTitle) => {
            return {
                title: textTitle,
                text: [isoDate],
            };
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
OrderOverviewDeliveryDateComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderOverviewDeliveryDateComponent, deps: [{ token: DateValidationService }, { token: i1.TranslationService }, { token: i4.OutletContextData, optional: true }], target: i0.ɵɵFactoryTarget.Component });
OrderOverviewDeliveryDateComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: OrderOverviewDeliveryDateComponent, selector: "cx-order-overview-delivery-date", ngImport: i0, template: "<ng-container *ngIf=\"order && isRequestedDeliveryDatePresent()\">\n  <cx-card\n    [content]=\"\n      getRequestedDeliveryDateCardContent(order?.requestedRetrievalAt | cxDate)\n        | async\n    \"\n  ></cx-card>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.CardComponent, selector: "cx-card", inputs: ["border", "editMode", "isDefault", "content", "fitToContainer", "truncateText", "charactersLimit", "index"], outputs: ["deleteCard", "setDefaultCard", "sendCard", "editCard", "cancelCard"] }, { kind: "pipe", type: i5.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.CxDatePipe, name: "cxDate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderOverviewDeliveryDateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-overview-delivery-date', template: "<ng-container *ngIf=\"order && isRequestedDeliveryDatePresent()\">\n  <cx-card\n    [content]=\"\n      getRequestedDeliveryDateCardContent(order?.requestedRetrievalAt | cxDate)\n        | async\n    \"\n  ></cx-card>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: DateValidationService }, { type: i1.TranslationService }, { type: i4.OutletContextData, decorators: [{
                    type: Optional
                }] }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class RequestedDeliveryDateComponentsModule {
}
RequestedDeliveryDateComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RequestedDeliveryDateComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateComponentsModule, declarations: [DeliveryModeDatePickerComponent,
        OrderOverviewDeliveryDateComponent], imports: [CommonModule,
        DatePickerModule,
        I18nModule,
        ReactiveFormsModule,
        CardModule], exports: [DeliveryModeDatePickerComponent,
        OrderOverviewDeliveryDateComponent] });
RequestedDeliveryDateComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateComponentsModule, imports: [CommonModule,
        DatePickerModule,
        I18nModule,
        ReactiveFormsModule,
        CardModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        DatePickerModule,
                        I18nModule,
                        ReactiveFormsModule,
                        CardModule,
                    ],
                    declarations: [
                        DeliveryModeDatePickerComponent,
                        OrderOverviewDeliveryDateComponent,
                    ],
                    exports: [
                        DeliveryModeDatePickerComponent,
                        OrderOverviewDeliveryDateComponent,
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
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function defaultRequestedDeliveryDateComponentsConfig() {
    const config = {
        featureModules: {
            [REQUESTED_DELIVERY_DATE_FEATURE]: {
                cmsComponents: [
                    'DeliveryModeDatePickerComponent',
                    'OrderOverviewDeliveryDateComponent',
                ],
            },
            // by default core is bundled together with components
            [REQUESTED_DELIVERY_DATE_CORE_FEATURE]: REQUESTED_DELIVERY_DATE_FEATURE,
        },
    };
    return config;
}
class RequestedDeliveryDateRootModule {
}
RequestedDeliveryDateRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RequestedDeliveryDateRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateRootModule });
RequestedDeliveryDateRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateRootModule, providers: [
        provideOutlet({
            id: CartOutlets.DELIVERY_MODE,
            position: OutletPosition.AFTER,
            component: DeliveryModeDatePickerComponent,
        }),
        provideOutlet({
            id: CartOutlets.ORDER_OVERVIEW,
            position: OutletPosition.AFTER,
            component: OrderOverviewDeliveryDateComponent,
        }),
        provideDefaultConfigFactory(defaultRequestedDeliveryDateComponentsConfig),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideOutlet({
                            id: CartOutlets.DELIVERY_MODE,
                            position: OutletPosition.AFTER,
                            component: DeliveryModeDatePickerComponent,
                        }),
                        provideOutlet({
                            id: CartOutlets.ORDER_OVERVIEW,
                            position: OutletPosition.AFTER,
                            component: OrderOverviewDeliveryDateComponent,
                        }),
                        provideDefaultConfigFactory(defaultRequestedDeliveryDateComponentsConfig),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DeliveryModeDatePickerComponent, OrderOverviewDeliveryDateComponent, REQUESTED_DELIVERY_DATE_CORE_FEATURE, REQUESTED_DELIVERY_DATE_FEATURE, RequestedDeliveryDateComponentsModule, RequestedDeliveryDateFacade, RequestedDeliveryDateRootModule, defaultRequestedDeliveryDateComponentsConfig, requestedDeliveryDateFacadeFactory };
//# sourceMappingURL=spartacus-requested-delivery-date-root.mjs.map
