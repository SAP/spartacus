import * as i0 from '@angular/core';
import { Component, ViewChild, Directive, HostListener, NgModule, inject, Input, ChangeDetectionStrategy } from '@angular/core';
import * as i3 from '@angular/forms';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import * as i2$1 from '@spartacus/core';
import { I18nModule, provideDefaultConfig, AuthGuard, GlobalMessageService, TranslationService, HttpErrorModel, GlobalMessageType, UrlModule } from '@spartacus/core';
import * as i2 from '@spartacus/storefront';
import { ICON_TYPE, FormUtils, IconModule, KeyboardFocusModule, FormErrorsModule, FileUploadModule, SpinnerModule, DIALOG_TYPE, CardModule, ListNavigationModule, MessagingComponent, ChatMessagingModule } from '@spartacus/storefront';
import { Subscription, BehaviorSubject, of, combineLatest } from 'rxjs';
import { map, take, catchError, first, tap, filter } from 'rxjs/operators';
import * as i1 from '@spartacus/customer-ticketing/root';
import { MAX_INPUT_CHARACTERS, MAX_INPUT_CHARACTERS_FOR_SUBJECT, MAX_SIZE_FOR_ATTACHMENT, MAX_ENTRIES_FOR_ATTACHMENT, DATE_FORMAT, GetTicketQueryReloadEvent, CustomerTicketingFacade } from '@spartacus/customer-ticketing/root';
import * as i1$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i6 from '@angular/router';
import { RouterModule } from '@angular/router';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerTicketingCloseComponent {
    constructor(customerTicketingFacade, launchDialogService, vcr) {
        this.customerTicketingFacade = customerTicketingFacade;
        this.launchDialogService = launchDialogService;
        this.vcr = vcr;
        this.subscription = new Subscription();
        this.enableCloseButton$ = this.customerTicketingFacade
            .getTicket()
            .pipe(map((ticket) => {
            var _a, _b, _c;
            return (((_a = ticket === null || ticket === void 0 ? void 0 : ticket.status) === null || _a === void 0 ? void 0 : _a.id) === "OPEN" /* STATUS.OPEN */ ||
                ((_b = ticket === null || ticket === void 0 ? void 0 : ticket.status) === null || _b === void 0 ? void 0 : _b.id) === "INPROCESS" /* STATUS.INPROCESS */) &&
                ((_c = ticket.availableStatusTransitions) === null || _c === void 0 ? void 0 : _c.some((status) => status.id.toUpperCase() === "CLOSED" /* STATUS.CLOSED */));
        }));
    }
    openDialog() {
        const dialog = this.launchDialogService.openDialog("CUSTOMER_TICKETING_CLOSE" /* LAUNCH_CALLER.CUSTOMER_TICKETING_CLOSE */, this.element, this.vcr);
        if (dialog) {
            this.subscription.add(dialog.pipe(take(1)).subscribe());
        }
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
}
CustomerTicketingCloseComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCloseComponent, deps: [{ token: i1.CustomerTicketingFacade }, { token: i2.LaunchDialogService }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
CustomerTicketingCloseComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CustomerTicketingCloseComponent, selector: "cx-customer-ticketing-close", viewQueries: [{ propertyName: "element", first: true, predicate: ["element"], descendants: true }], ngImport: i0, template: "<div class=\"col-xs-12 col-md-5 col-lg-4\" *ngIf=\"enableCloseButton$ | async\">\n  <button #element class=\"btn btn-block btn-secondary\" (click)=\"openDialog()\">\n    {{ 'customerTicketingDetails.closeRequest' | cxTranslate }}\n  </button>\n</div>\n", dependencies: [{ kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i1$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCloseComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-ticketing-close', template: "<div class=\"col-xs-12 col-md-5 col-lg-4\" *ngIf=\"enableCloseButton$ | async\">\n  <button #element class=\"btn btn-block btn-secondary\" (click)=\"openDialog()\">\n    {{ 'customerTicketingDetails.closeRequest' | cxTranslate }}\n  </button>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CustomerTicketingFacade }, { type: i2.LaunchDialogService }, { type: i0.ViewContainerRef }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['element']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerTicketingDialogComponent {
    get messagesCharacterLeft() {
        var _a, _b;
        return (this.inputCharactersLimit - (((_b = (_a = this.form.get('message')) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.length) || 0));
    }
    get subjectCharacterLeft() {
        var _a, _b;
        return (this.inputCharactersForSubject -
            (((_b = (_a = this.form.get('subject')) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.length) || 0));
    }
    get allowedTypes() {
        var _a, _b;
        return (_b = (_a = this.customerTicketingConfig.customerTicketing) === null || _a === void 0 ? void 0 : _a.attachmentRestrictions) === null || _b === void 0 ? void 0 : _b.allowedTypes;
    }
    get getInputCharactersLimit() {
        var _a, _b;
        return ((_b = (_a = this.customerTicketingConfig.customerTicketing) === null || _a === void 0 ? void 0 : _a.inputCharactersLimit) !== null && _b !== void 0 ? _b : MAX_INPUT_CHARACTERS);
    }
    get getInputCharactersForSubject() {
        var _a, _b;
        return ((_b = (_a = this.customerTicketingConfig.customerTicketing) === null || _a === void 0 ? void 0 : _a.inputCharactersLimitForSubject) !== null && _b !== void 0 ? _b : MAX_INPUT_CHARACTERS_FOR_SUBJECT);
    }
    get maxSize() {
        var _a, _b, _c;
        return ((_c = (_b = (_a = this.customerTicketingConfig.customerTicketing) === null || _a === void 0 ? void 0 : _a.attachmentRestrictions) === null || _b === void 0 ? void 0 : _b.maxSize) !== null && _c !== void 0 ? _c : MAX_SIZE_FOR_ATTACHMENT);
    }
    handleClick(event) {
        if (event.target.tagName === this.el.nativeElement.tagName) {
            this.close('Click outside of the window');
        }
    }
    constructor(launchDialogService, el, customerTicketingConfig, filesFormValidators, customerTicketingFacade, routingService) {
        this.launchDialogService = launchDialogService;
        this.el = el;
        this.customerTicketingConfig = customerTicketingConfig;
        this.filesFormValidators = filesFormValidators;
        this.customerTicketingFacade = customerTicketingFacade;
        this.routingService = routingService;
        this.iconTypes = ICON_TYPE;
        this.inputCharactersLimit = this.getInputCharactersLimit;
        this.inputCharactersForSubject = this.getInputCharactersForSubject;
        this.isDataLoading$ = new BehaviorSubject(false);
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: 'button',
            focusOnEscape: true,
        };
    }
    buildForm() {
        const form = new FormGroup({});
        form.setControl('message', new FormControl('', [
            Validators.required,
            Validators.maxLength(this.inputCharactersLimit),
        ]));
        form.setControl('file', new FormControl('', [
            this.filesFormValidators.maxSize(this.maxSize),
            this.filesFormValidators.maxEntries(MAX_ENTRIES_FOR_ATTACHMENT),
            this.filesFormValidators.allowedTypes(this.allowedTypes),
        ]));
        this.form = form;
    }
    close(reason) {
        this.launchDialogService.closeDialog(reason);
    }
}
CustomerTicketingDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingDialogComponent, deps: [{ token: i2.LaunchDialogService }, { token: i0.ElementRef }, { token: i1.CustomerTicketingConfig }, { token: i2.FilesFormValidators }, { token: i1.CustomerTicketingFacade }, { token: i2$1.RoutingService }], target: i0.ɵɵFactoryTarget.Directive });
CustomerTicketingDialogComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: CustomerTicketingDialogComponent, host: { listeners: { "click": "handleClick($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingDialogComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i2.LaunchDialogService }, { type: i0.ElementRef }, { type: i1.CustomerTicketingConfig }, { type: i2.FilesFormValidators }, { type: i1.CustomerTicketingFacade }, { type: i2$1.RoutingService }]; }, propDecorators: { handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerTicketingCloseDialogComponent extends CustomerTicketingDialogComponent {
    ngOnInit() {
        this.buildForm();
    }
    closeRequest() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            FormUtils.deepUpdateValueAndValidity(this.form);
        }
        else {
            this.isDataLoading$.next(true);
            this.subscription = this.customerTicketingFacade
                .createTicketEvent(this.prepareTicketEvent())
                .subscribe({
                complete: () => {
                    this.onComplete();
                },
                error: () => {
                    this.onError();
                },
            });
        }
    }
    prepareTicketEvent() {
        var _a, _b;
        return {
            message: (_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.get('message')) === null || _b === void 0 ? void 0 : _b.value,
            toStatus: {
                id: "CLOSED" /* STATUS.CLOSED */,
                name: "Closed" /* STATUS_NAME.CLOSED */,
            },
        };
    }
    onComplete() {
        this.isDataLoading$.next(false);
        this.close('Ticket closed successfully');
        this.routingService.go({ cxRoute: 'supportTickets' });
    }
    onError() {
        this.close('Something went wrong while closing the ticket');
        this.isDataLoading$.next(false);
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
CustomerTicketingCloseDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCloseDialogComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
CustomerTicketingCloseDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CustomerTicketingCloseDialogComponent, selector: "cx-customer-ticketing-close-dialog", usesInheritance: true, ngImport: i0, template: "<div\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close('Escape clicked')\"\n  class=\"cx-customer-ticket-form-dialog\"\n>\n  <form [formGroup]=\"form\" class=\"cx-customer-ticket-form-container\">\n    <div class=\"modal-header cx-customer-ticket-form-header\">\n      <div class=\"cx-customer-ticket-form-title modal-title\">\n        {{ 'customerTicketingDetails.closeRequest' | cxTranslate }}\n      </div>\n      <button\n        (click)=\"close('Close Request Dialog')\"\n        [attr.aria-label]=\"'common.close' | cxTranslate\"\n        class=\"cx-customer-ticket-form-close close\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n\n    <div class=\"cx-customer-ticket-form-body\">\n      <div class=\"cx-customer-ticket-form-row\">\n        <label>\n          <span class=\"cx-customer-ticket-label label-content\">\n            {{ 'customerTicketing.message' | cxTranslate }}\n          </span>\n          <textarea\n            [maxLength]=\"inputCharactersLimit\"\n            class=\"form-control\"\n            formControlName=\"message\"\n            rows=\"5\"\n          ></textarea>\n\n          <cx-form-errors [control]=\"form.get('message')\"></cx-form-errors>\n\n          <p class=\"cx-customer-ticket-input-hint\">\n            {{\n              'customerTicketing.charactersLeft'\n                | cxTranslate: { count: messagesCharacterLeft }\n            }}\n          </p>\n        </label>\n      </div>\n\n      <div class=\"cx-customer-ticket-form-footer\">\n        <button\n          (click)=\"close('Close Request Dialog')\"\n          class=\"btn btn-secondary\"\n        >\n          {{ 'customerTicketing.cancel' | cxTranslate }}\n        </button>\n        <button (click)=\"closeRequest()\" class=\"btn btn-primary\">\n          {{ 'customerTicketing.submit' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n    <cx-spinner *ngIf=\"isDataLoading$ | async\" class=\"overlay\"></cx-spinner>\n  </form>\n</div>\n", dependencies: [{ kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i2.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i2.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "component", type: i2.SpinnerComponent, selector: "cx-spinner" }, { kind: "pipe", type: i1$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCloseDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-ticketing-close-dialog', template: "<div\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close('Escape clicked')\"\n  class=\"cx-customer-ticket-form-dialog\"\n>\n  <form [formGroup]=\"form\" class=\"cx-customer-ticket-form-container\">\n    <div class=\"modal-header cx-customer-ticket-form-header\">\n      <div class=\"cx-customer-ticket-form-title modal-title\">\n        {{ 'customerTicketingDetails.closeRequest' | cxTranslate }}\n      </div>\n      <button\n        (click)=\"close('Close Request Dialog')\"\n        [attr.aria-label]=\"'common.close' | cxTranslate\"\n        class=\"cx-customer-ticket-form-close close\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n\n    <div class=\"cx-customer-ticket-form-body\">\n      <div class=\"cx-customer-ticket-form-row\">\n        <label>\n          <span class=\"cx-customer-ticket-label label-content\">\n            {{ 'customerTicketing.message' | cxTranslate }}\n          </span>\n          <textarea\n            [maxLength]=\"inputCharactersLimit\"\n            class=\"form-control\"\n            formControlName=\"message\"\n            rows=\"5\"\n          ></textarea>\n\n          <cx-form-errors [control]=\"form.get('message')\"></cx-form-errors>\n\n          <p class=\"cx-customer-ticket-input-hint\">\n            {{\n              'customerTicketing.charactersLeft'\n                | cxTranslate: { count: messagesCharacterLeft }\n            }}\n          </p>\n        </label>\n      </div>\n\n      <div class=\"cx-customer-ticket-form-footer\">\n        <button\n          (click)=\"close('Close Request Dialog')\"\n          class=\"btn btn-secondary\"\n        >\n          {{ 'customerTicketing.cancel' | cxTranslate }}\n        </button>\n        <button (click)=\"closeRequest()\" class=\"btn btn-primary\">\n          {{ 'customerTicketing.submit' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n    <cx-spinner *ngIf=\"isDataLoading$ | async\" class=\"overlay\"></cx-spinner>\n  </form>\n</div>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerTicketingCloseModule {
}
CustomerTicketingCloseModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCloseModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CustomerTicketingCloseModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCloseModule, declarations: [CustomerTicketingCloseComponent,
        CustomerTicketingCloseDialogComponent], imports: [CommonModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        FormErrorsModule,
        FileUploadModule,
        SpinnerModule], exports: [CustomerTicketingCloseComponent,
        CustomerTicketingCloseDialogComponent] });
CustomerTicketingCloseModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCloseModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                SupportTicketCloseComponent: {
                    component: CustomerTicketingCloseComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        FormErrorsModule,
        FileUploadModule,
        SpinnerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCloseModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        IconModule,
                        KeyboardFocusModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                        FileUploadModule,
                        SpinnerModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                SupportTicketCloseComponent: {
                                    component: CustomerTicketingCloseComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [
                        CustomerTicketingCloseComponent,
                        CustomerTicketingCloseDialogComponent,
                    ],
                    exports: [
                        CustomerTicketingCloseComponent,
                        CustomerTicketingCloseDialogComponent,
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
class CustomerTicketingCreateDialogComponent extends CustomerTicketingDialogComponent {
    constructor() {
        super(...arguments);
        this.ticketCategories$ = this.customerTicketingFacade.getTicketCategories();
        this.ticketAssociatedObjects$ = this.customerTicketingFacade.getTicketAssociatedObjects().pipe(catchError((error) => {
            this.handleError(error);
            return of([]);
        }));
        this.globalMessage = inject(GlobalMessageService);
        this.translationService = inject(TranslationService);
    }
    getCreateTicketPayload(form) {
        var _a, _b, _c, _d;
        return {
            message: (_a = form === null || form === void 0 ? void 0 : form.get('message')) === null || _a === void 0 ? void 0 : _a.value,
            subject: (_b = form === null || form === void 0 ? void 0 : form.get('subject')) === null || _b === void 0 ? void 0 : _b.value,
            associatedTo: ((_c = form === null || form === void 0 ? void 0 : form.get('associatedTo')) === null || _c === void 0 ? void 0 : _c.value) || undefined,
            ticketCategory: (_d = form === null || form === void 0 ? void 0 : form.get('ticketCategory')) === null || _d === void 0 ? void 0 : _d.value,
        };
    }
    ngOnInit() {
        this.buildForm();
    }
    buildForm() {
        const form = new FormGroup({});
        form.setControl('subject', new FormControl('', [
            Validators.required,
            Validators.maxLength(this.inputCharactersForSubject),
        ]));
        form.setControl('ticketCategory', new FormControl('', [Validators.required]));
        form.setControl('associatedTo', new FormControl(''));
        form.setControl('message', new FormControl('', [
            Validators.required,
            Validators.maxLength(this.inputCharactersLimit),
        ]));
        form.setControl('file', new FormControl('', [
            this.filesFormValidators.maxSize(this.maxSize),
            this.filesFormValidators.maxEntries(MAX_ENTRIES_FOR_ATTACHMENT),
            this.filesFormValidators.allowedTypes(this.allowedTypes),
        ]));
        this.form = form;
    }
    createTicketRequest() {
        var _a, _b;
        this.attachment = (_b = (_a = this.form.get('file')) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b[0];
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            FormUtils.deepUpdateValueAndValidity(this.form);
        }
        else {
            this.subscription = this.customerTicketingFacade
                .createTicket(this.getCreateTicketPayload(this.form))
                .subscribe({
                next: (response) => {
                    var _a, _b;
                    if (response.id &&
                        this.attachment &&
                        ((_a = response.ticketEvents) === null || _a === void 0 ? void 0 : _a[0].code)) {
                        this.customerTicketingFacade.uploadAttachment(this.attachment, (_b = response.ticketEvents) === null || _b === void 0 ? void 0 : _b[0].code, response.id);
                    }
                },
                complete: () => {
                    this.onComplete();
                },
                error: (error) => {
                    this.handleError(error);
                },
            });
        }
    }
    handleError(error) {
        var _a;
        if (error instanceof HttpErrorModel) {
            ((_a = error.details) !== null && _a !== void 0 ? _a : []).forEach((err) => {
                if (err.message) {
                    this.globalMessage.add({ raw: err.message }, GlobalMessageType.MSG_TYPE_ERROR);
                }
            });
        }
        else {
            this.translationService
                .translate('httpHandlers.unknownError')
                .pipe(first())
                .subscribe((text) => {
                this.globalMessage.add({ raw: text }, GlobalMessageType.MSG_TYPE_ERROR);
            });
        }
        this.onError();
    }
    onComplete() {
        this.close('Ticket created successfully');
    }
    onError() {
        this.close('Something went wrong');
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
CustomerTicketingCreateDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCreateDialogComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
CustomerTicketingCreateDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CustomerTicketingCreateDialogComponent, selector: "cx-customer-ticketing-create-dialog", inputs: { selectedCategory: "selectedCategory", selectedAssociatedObject: "selectedAssociatedObject" }, usesInheritance: true, ngImport: i0, template: "<div\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close('Escape clicked')\"\n  class=\"cx-customer-ticket-form-dialog\"\n>\n  <form [formGroup]=\"form\" class=\"cx-customer-ticket-form-container\">\n    <div class=\"modal-header cx-customer-ticket-form-header\">\n      <div class=\"cx-customer-ticket-form-title modal-title\">\n        {{ 'createCustomerTicket.addNewRequest' | cxTranslate }}\n      </div>\n      <button\n        (click)=\"close('Close Create Request Dialog')\"\n        [attr.aria-label]=\"'common.close' | cxTranslate\"\n        class=\"cx-customer-ticket-form-close close\"\n        type=\"button\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n\n    <div class=\"cx-customer-ticket-form-body\">\n      <div class=\"cx-customer-ticket-form-row\">\n        <label>\n          <span class=\"cx-customer-ticket-label label-content\">\n            {{ 'createCustomerTicket.subject' | cxTranslate }}\n          </span>\n          <textarea\n            [maxLength]=\"inputCharactersForSubject\"\n            class=\"form-control\"\n            formControlName=\"subject\"\n            rows=\"1\"\n          ></textarea>\n\n          <cx-form-errors [control]=\"form.get('subject')\"></cx-form-errors>\n          <p class=\"cx-customer-ticket-input-hint\">\n            {{\n              'customerTicketing.charactersLeft'\n                | cxTranslate: { count: subjectCharacterLeft }\n            }}\n          </p>\n        </label>\n\n        <label *ngIf=\"ticketCategories$ | async as ticketCategories\">\n          <span class=\"cx-customer-ticket-label label-content\">\n            {{ 'createCustomerTicket.category' | cxTranslate }}\n          </span>\n          <select class=\"form-control\" formControlName=\"ticketCategory\">\n            <option value=\"\" disabled selected>\n              {{ 'createCustomerTicket.selectCategory' | cxTranslate }}\n            </option>\n            <option\n              *ngFor=\"let category of ticketCategories\"\n              [ngValue]=\"category\"\n              [selected]=\"category.id === selectedCategory?.id\"\n            >\n              {{ category.name }}\n            </option>\n          </select>\n\n          <cx-form-errors\n            [control]=\"form.get('ticketCategory')\"\n          ></cx-form-errors>\n        </label>\n\n        <ng-container\n          *ngIf=\"ticketAssociatedObjects$ | async as ticketAssociatedObjects\"\n        >\n          <label *ngIf=\"ticketAssociatedObjects.length > 0\">\n            <span class=\"cx-customer-ticket-label label-content\">\n              {{ 'createCustomerTicket.associateTo' | cxTranslate }}\n            </span>\n            <select class=\"form-control\" formControlName=\"associatedTo\">\n              <option value=\"\" disabled selected>\n                {{\n                  'createCustomerTicket.optionallySelectAssociatedObject'\n                    | cxTranslate\n                }}\n              </option>\n              <option\n                *ngFor=\"let associatedObject of ticketAssociatedObjects\"\n                [ngValue]=\"associatedObject\"\n                [selected]=\"\n                  associatedObject.code === selectedAssociatedObject?.code\n                \"\n              >\n                {{ associatedObject.type }}\n                {{ associatedObject.code }}\n              </option>\n            </select>\n          </label>\n        </ng-container>\n\n        <label>\n          <span class=\"cx-customer-ticket-label label-content\">\n            {{ 'customerTicketing.message' | cxTranslate }}\n          </span>\n          <textarea\n            [maxLength]=\"inputCharactersLimit\"\n            class=\"form-control\"\n            formControlName=\"message\"\n            rows=\"5\"\n          ></textarea>\n\n          <cx-form-errors [control]=\"form.get('message')\"></cx-form-errors>\n\n          <p class=\"cx-customer-ticket-input-hint\">\n            {{\n              'customerTicketing.charactersLeft'\n                | cxTranslate: { count: messagesCharacterLeft }\n            }}\n          </p>\n        </label>\n\n        <div>\n          <cx-file-upload\n            [formControl]=\"$any(form.get('file'))\"\n            [accept]=\"allowedTypes\"\n          >\n            <ng-template>\n              <cx-icon [type]=\"iconTypes.UPLOAD\"></cx-icon>\n              <span class=\"cx-message-footer-text\">{{\n                'customerTicketing.uploadFile' | cxTranslate\n              }}</span>\n            </ng-template>\n          </cx-file-upload>\n\n          <p class=\"cx-customer-ticket-file-upload-hint\">\n            {{\n              'customerTicketing.fileSizeLimit'\n                | cxTranslate: { count: maxSize }\n            }}\n          </p>\n          <p class=\"cx-customer-ticket-file-upload-hint\">\n            {{ 'customerTicketing.maximumAttachment' | cxTranslate }}\n          </p>\n\n          <cx-form-errors\n            [control]=\"form.get('file')\"\n            prefix=\"formErrors.file\"\n          ></cx-form-errors>\n        </div>\n      </div>\n\n      <div class=\"cx-customer-ticket-form-footer\">\n        <button\n          (click)=\"close('Close Create Request Dialog')\"\n          class=\"btn btn-secondary\"\n          type=\"button\"\n        >\n          {{ 'customerTicketing.cancel' | cxTranslate }}\n        </button>\n        <button\n          (click)=\"createTicketRequest()\"\n          class=\"btn btn-primary\"\n          type=\"button\"\n        >\n          {{ 'customerTicketing.submit' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n  </form>\n</div>\n", dependencies: [{ kind: "directive", type: i1$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i2.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i3.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i2.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "component", type: i2.FileUploadComponent, selector: "cx-file-upload", inputs: ["accept", "multiple"], outputs: ["update"] }, { kind: "pipe", type: i1$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCreateDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-ticketing-create-dialog', template: "<div\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close('Escape clicked')\"\n  class=\"cx-customer-ticket-form-dialog\"\n>\n  <form [formGroup]=\"form\" class=\"cx-customer-ticket-form-container\">\n    <div class=\"modal-header cx-customer-ticket-form-header\">\n      <div class=\"cx-customer-ticket-form-title modal-title\">\n        {{ 'createCustomerTicket.addNewRequest' | cxTranslate }}\n      </div>\n      <button\n        (click)=\"close('Close Create Request Dialog')\"\n        [attr.aria-label]=\"'common.close' | cxTranslate\"\n        class=\"cx-customer-ticket-form-close close\"\n        type=\"button\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n\n    <div class=\"cx-customer-ticket-form-body\">\n      <div class=\"cx-customer-ticket-form-row\">\n        <label>\n          <span class=\"cx-customer-ticket-label label-content\">\n            {{ 'createCustomerTicket.subject' | cxTranslate }}\n          </span>\n          <textarea\n            [maxLength]=\"inputCharactersForSubject\"\n            class=\"form-control\"\n            formControlName=\"subject\"\n            rows=\"1\"\n          ></textarea>\n\n          <cx-form-errors [control]=\"form.get('subject')\"></cx-form-errors>\n          <p class=\"cx-customer-ticket-input-hint\">\n            {{\n              'customerTicketing.charactersLeft'\n                | cxTranslate: { count: subjectCharacterLeft }\n            }}\n          </p>\n        </label>\n\n        <label *ngIf=\"ticketCategories$ | async as ticketCategories\">\n          <span class=\"cx-customer-ticket-label label-content\">\n            {{ 'createCustomerTicket.category' | cxTranslate }}\n          </span>\n          <select class=\"form-control\" formControlName=\"ticketCategory\">\n            <option value=\"\" disabled selected>\n              {{ 'createCustomerTicket.selectCategory' | cxTranslate }}\n            </option>\n            <option\n              *ngFor=\"let category of ticketCategories\"\n              [ngValue]=\"category\"\n              [selected]=\"category.id === selectedCategory?.id\"\n            >\n              {{ category.name }}\n            </option>\n          </select>\n\n          <cx-form-errors\n            [control]=\"form.get('ticketCategory')\"\n          ></cx-form-errors>\n        </label>\n\n        <ng-container\n          *ngIf=\"ticketAssociatedObjects$ | async as ticketAssociatedObjects\"\n        >\n          <label *ngIf=\"ticketAssociatedObjects.length > 0\">\n            <span class=\"cx-customer-ticket-label label-content\">\n              {{ 'createCustomerTicket.associateTo' | cxTranslate }}\n            </span>\n            <select class=\"form-control\" formControlName=\"associatedTo\">\n              <option value=\"\" disabled selected>\n                {{\n                  'createCustomerTicket.optionallySelectAssociatedObject'\n                    | cxTranslate\n                }}\n              </option>\n              <option\n                *ngFor=\"let associatedObject of ticketAssociatedObjects\"\n                [ngValue]=\"associatedObject\"\n                [selected]=\"\n                  associatedObject.code === selectedAssociatedObject?.code\n                \"\n              >\n                {{ associatedObject.type }}\n                {{ associatedObject.code }}\n              </option>\n            </select>\n          </label>\n        </ng-container>\n\n        <label>\n          <span class=\"cx-customer-ticket-label label-content\">\n            {{ 'customerTicketing.message' | cxTranslate }}\n          </span>\n          <textarea\n            [maxLength]=\"inputCharactersLimit\"\n            class=\"form-control\"\n            formControlName=\"message\"\n            rows=\"5\"\n          ></textarea>\n\n          <cx-form-errors [control]=\"form.get('message')\"></cx-form-errors>\n\n          <p class=\"cx-customer-ticket-input-hint\">\n            {{\n              'customerTicketing.charactersLeft'\n                | cxTranslate: { count: messagesCharacterLeft }\n            }}\n          </p>\n        </label>\n\n        <div>\n          <cx-file-upload\n            [formControl]=\"$any(form.get('file'))\"\n            [accept]=\"allowedTypes\"\n          >\n            <ng-template>\n              <cx-icon [type]=\"iconTypes.UPLOAD\"></cx-icon>\n              <span class=\"cx-message-footer-text\">{{\n                'customerTicketing.uploadFile' | cxTranslate\n              }}</span>\n            </ng-template>\n          </cx-file-upload>\n\n          <p class=\"cx-customer-ticket-file-upload-hint\">\n            {{\n              'customerTicketing.fileSizeLimit'\n                | cxTranslate: { count: maxSize }\n            }}\n          </p>\n          <p class=\"cx-customer-ticket-file-upload-hint\">\n            {{ 'customerTicketing.maximumAttachment' | cxTranslate }}\n          </p>\n\n          <cx-form-errors\n            [control]=\"form.get('file')\"\n            prefix=\"formErrors.file\"\n          ></cx-form-errors>\n        </div>\n      </div>\n\n      <div class=\"cx-customer-ticket-form-footer\">\n        <button\n          (click)=\"close('Close Create Request Dialog')\"\n          class=\"btn btn-secondary\"\n          type=\"button\"\n        >\n          {{ 'customerTicketing.cancel' | cxTranslate }}\n        </button>\n        <button\n          (click)=\"createTicketRequest()\"\n          class=\"btn btn-primary\"\n          type=\"button\"\n        >\n          {{ 'customerTicketing.submit' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n  </form>\n</div>\n" }]
        }], propDecorators: { selectedCategory: [{
                type: Input
            }], selectedAssociatedObject: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerTicketingCreateComponent {
    constructor(launchDialogService, vcr) {
        this.launchDialogService = launchDialogService;
        this.vcr = vcr;
        this.subscription = new Subscription();
    }
    openCreateNewTicketDialog() {
        const dialog = this.launchDialogService.openDialog("CUSTOMER_TICKETING_CREATE" /* LAUNCH_CALLER.CUSTOMER_TICKETING_CREATE */, this.element, this.vcr);
        if (dialog) {
            this.subscription.add(dialog.pipe(take(1)).subscribe());
        }
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
}
CustomerTicketingCreateComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCreateComponent, deps: [{ token: i2.LaunchDialogService }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
CustomerTicketingCreateComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CustomerTicketingCreateComponent, selector: "cx-customer-ticketing-create", viewQueries: [{ propertyName: "element", first: true, predicate: ["element"], descendants: true }], ngImport: i0, template: "<button\n  #element\n  class=\"btn btn-primary cx-customer-ticketing-create\"\n  (click)=\"openCreateNewTicketDialog()\"\n>\n  {{ 'createCustomerTicket.addRequest' | cxTranslate }}\n</button>\n", dependencies: [{ kind: "pipe", type: i2$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCreateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-ticketing-create', template: "<button\n  #element\n  class=\"btn btn-primary cx-customer-ticketing-create\"\n  (click)=\"openCreateNewTicketDialog()\"\n>\n  {{ 'createCustomerTicket.addRequest' | cxTranslate }}\n</button>\n" }]
        }], ctorParameters: function () { return [{ type: i2.LaunchDialogService }, { type: i0.ViewContainerRef }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['element']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerTicketingCreateModule {
}
CustomerTicketingCreateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCreateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CustomerTicketingCreateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCreateModule, declarations: [CustomerTicketingCreateComponent,
        CustomerTicketingCreateDialogComponent], imports: [CommonModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        FormErrorsModule,
        FileUploadModule], exports: [CustomerTicketingCreateComponent,
        CustomerTicketingCreateDialogComponent] });
CustomerTicketingCreateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCreateModule, imports: [CommonModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        FormErrorsModule,
        FileUploadModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCreateModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        IconModule,
                        KeyboardFocusModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                        FileUploadModule,
                    ],
                    declarations: [
                        CustomerTicketingCreateComponent,
                        CustomerTicketingCreateDialogComponent,
                    ],
                    exports: [
                        CustomerTicketingCreateComponent,
                        CustomerTicketingCreateDialogComponent,
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
class CustomerTicketingReopenDialogComponent extends CustomerTicketingDialogComponent {
    ngOnInit() {
        this.buildForm();
    }
    reopenRequest() {
        var _a, _b, _c;
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            FormUtils.deepUpdateValueAndValidity(this.form);
        }
        else {
            const mustWaitForAttachment = (_c = ((_b = (_a = this.form.get('file')) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.length) > 0) !== null && _c !== void 0 ? _c : false;
            this.isDataLoading$.next(true);
            this.subscription = this.customerTicketingFacade
                .createTicketEvent(this.prepareTicketEvent(), mustWaitForAttachment)
                .subscribe({
                next: (createdEvent) => {
                    var _a, _b, _c, _d;
                    if (((_b = (_a = this.form.get('file')) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.length) && createdEvent.code) {
                        this.customerTicketingFacade.uploadAttachment((_d = (_c = this.form.get('file')) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.item(0), createdEvent.code);
                    }
                },
                complete: () => {
                    this.onComplete();
                },
                error: () => {
                    this.onError();
                },
            });
        }
    }
    onComplete() {
        this.isDataLoading$.next(false);
        this.close('Ticket reopened successfully');
    }
    onError() {
        this.isDataLoading$.next(false);
        this.close('Something went wrong while reopening ticket');
    }
    prepareTicketEvent() {
        var _a, _b;
        return {
            message: (_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.get('message')) === null || _b === void 0 ? void 0 : _b.value,
            toStatus: {
                id: "INPROCESS" /* STATUS.INPROCESS */,
                name: "INPROCESS" /* STATUS_NAME.INPROCESS */,
            },
        };
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
CustomerTicketingReopenDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingReopenDialogComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
CustomerTicketingReopenDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CustomerTicketingReopenDialogComponent, selector: "cx-customer-ticketing-reopen-dialog", usesInheritance: true, ngImport: i0, template: "<div\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close('Escape clicked')\"\n  class=\"cx-customer-ticket-form-dialog\"\n>\n  <form [formGroup]=\"form\" class=\"cx-customer-ticket-form-container\">\n    <div class=\"modal-header cx-customer-ticket-form-header\">\n      <div class=\"cx-customer-ticket-form-title modal-title\">\n        {{ 'customerTicketingDetails.reopenRequest' | cxTranslate }}\n      </div>\n      <button\n        (click)=\"close('Close Reopen Request Dialog')\"\n        [attr.aria-label]=\"'common.close' | cxTranslate\"\n        class=\"cx-customer-ticket-form-close close\"\n        type=\"button\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n\n    <div class=\"cx-customer-ticket-form-body\">\n      <div class=\"cx-customer-ticket-form-row\">\n        <label>\n          <span class=\"cx-customer-ticket-label label-content\">\n            {{ 'customerTicketing.message' | cxTranslate }}\n          </span>\n          <textarea\n            [maxLength]=\"inputCharactersLimit\"\n            class=\"form-control\"\n            formControlName=\"message\"\n            rows=\"5\"\n          ></textarea>\n\n          <cx-form-errors [control]=\"form.get('message')\"></cx-form-errors>\n\n          <p class=\"cx-customer-ticket-input-hint\">\n            {{\n              'customerTicketing.charactersLeft'\n                | cxTranslate: { count: messagesCharacterLeft }\n            }}\n          </p>\n        </label>\n      </div>\n\n      <div>\n        <cx-file-upload\n          [formControl]=\"$any(form.get('file'))\"\n          [accept]=\"allowedTypes\"\n        >\n          <ng-template>\n            <cx-icon [type]=\"iconTypes.UPLOAD\"></cx-icon>\n            <span class=\"cx-message-footer-text\">{{\n              'customerTicketing.uploadFile' | cxTranslate\n            }}</span>\n          </ng-template>\n        </cx-file-upload>\n\n        <p class=\"cx-customer-ticket-file-upload-hint\">\n          {{\n            'customerTicketing.fileSizeLimit' | cxTranslate: { count: maxSize }\n          }}\n        </p>\n        <p class=\"cx-customer-ticket-file-upload-hint\">\n          {{ 'customerTicketing.maximumAttachment' | cxTranslate }}\n        </p>\n\n        <cx-form-errors\n          [control]=\"form.get('file')\"\n          prefix=\"formErrors.file\"\n        ></cx-form-errors>\n      </div>\n\n      <div class=\"cx-customer-ticket-form-footer\">\n        <button\n          (click)=\"close('Close Reopen Request Dialog')\"\n          class=\"btn btn-secondary\"\n          type=\"button\"\n        >\n          {{ 'customerTicketing.cancel' | cxTranslate }}\n        </button>\n        <button (click)=\"reopenRequest()\" class=\"btn btn-primary\" type=\"button\">\n          {{ 'customerTicketing.submit' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n    <cx-spinner *ngIf=\"isDataLoading$ | async\" class=\"overlay\"></cx-spinner>\n  </form>\n</div>\n", dependencies: [{ kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i2.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i2.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "component", type: i2.FileUploadComponent, selector: "cx-file-upload", inputs: ["accept", "multiple"], outputs: ["update"] }, { kind: "component", type: i2.SpinnerComponent, selector: "cx-spinner" }, { kind: "pipe", type: i1$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingReopenDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-ticketing-reopen-dialog', template: "<div\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close('Escape clicked')\"\n  class=\"cx-customer-ticket-form-dialog\"\n>\n  <form [formGroup]=\"form\" class=\"cx-customer-ticket-form-container\">\n    <div class=\"modal-header cx-customer-ticket-form-header\">\n      <div class=\"cx-customer-ticket-form-title modal-title\">\n        {{ 'customerTicketingDetails.reopenRequest' | cxTranslate }}\n      </div>\n      <button\n        (click)=\"close('Close Reopen Request Dialog')\"\n        [attr.aria-label]=\"'common.close' | cxTranslate\"\n        class=\"cx-customer-ticket-form-close close\"\n        type=\"button\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n\n    <div class=\"cx-customer-ticket-form-body\">\n      <div class=\"cx-customer-ticket-form-row\">\n        <label>\n          <span class=\"cx-customer-ticket-label label-content\">\n            {{ 'customerTicketing.message' | cxTranslate }}\n          </span>\n          <textarea\n            [maxLength]=\"inputCharactersLimit\"\n            class=\"form-control\"\n            formControlName=\"message\"\n            rows=\"5\"\n          ></textarea>\n\n          <cx-form-errors [control]=\"form.get('message')\"></cx-form-errors>\n\n          <p class=\"cx-customer-ticket-input-hint\">\n            {{\n              'customerTicketing.charactersLeft'\n                | cxTranslate: { count: messagesCharacterLeft }\n            }}\n          </p>\n        </label>\n      </div>\n\n      <div>\n        <cx-file-upload\n          [formControl]=\"$any(form.get('file'))\"\n          [accept]=\"allowedTypes\"\n        >\n          <ng-template>\n            <cx-icon [type]=\"iconTypes.UPLOAD\"></cx-icon>\n            <span class=\"cx-message-footer-text\">{{\n              'customerTicketing.uploadFile' | cxTranslate\n            }}</span>\n          </ng-template>\n        </cx-file-upload>\n\n        <p class=\"cx-customer-ticket-file-upload-hint\">\n          {{\n            'customerTicketing.fileSizeLimit' | cxTranslate: { count: maxSize }\n          }}\n        </p>\n        <p class=\"cx-customer-ticket-file-upload-hint\">\n          {{ 'customerTicketing.maximumAttachment' | cxTranslate }}\n        </p>\n\n        <cx-form-errors\n          [control]=\"form.get('file')\"\n          prefix=\"formErrors.file\"\n        ></cx-form-errors>\n      </div>\n\n      <div class=\"cx-customer-ticket-form-footer\">\n        <button\n          (click)=\"close('Close Reopen Request Dialog')\"\n          class=\"btn btn-secondary\"\n          type=\"button\"\n        >\n          {{ 'customerTicketing.cancel' | cxTranslate }}\n        </button>\n        <button (click)=\"reopenRequest()\" class=\"btn btn-primary\" type=\"button\">\n          {{ 'customerTicketing.submit' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n    <cx-spinner *ngIf=\"isDataLoading$ | async\" class=\"overlay\"></cx-spinner>\n  </form>\n</div>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultCustomerTicketingFormLayoutConfig = {
    launch: {
        CUSTOMER_TICKETING_REOPEN: {
            inline: true,
            component: CustomerTicketingReopenDialogComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
        CUSTOMER_TICKETING_CLOSE: {
            inline: true,
            component: CustomerTicketingCloseDialogComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
        CUSTOMER_TICKETING_CREATE: {
            inline: true,
            component: CustomerTicketingCreateDialogComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

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
class CustomerTicketingListComponent {
    constructor(customerTicketingFacade, routingService, translationService, customerTicketingConfig) {
        var _a;
        this.customerTicketingFacade = customerTicketingFacade;
        this.routingService = routingService;
        this.translationService = translationService;
        this.customerTicketingConfig = customerTicketingConfig;
        this.PAGE_SIZE = ((_a = this.customerTicketingConfig.customerTicketing) === null || _a === void 0 ? void 0 : _a.listViewPageSize) || 5;
        this.iconTypes = ICON_TYPE;
        this.tickets$ = this.customerTicketingFacade
            .getTickets(this.PAGE_SIZE)
            .pipe(tap((tickets) => { var _a; return (this.sortType = ((_a = tickets === null || tickets === void 0 ? void 0 : tickets.pagination) === null || _a === void 0 ? void 0 : _a.sort) || ''); }));
        this.getStatusClass = (status) => {
            switch (status) {
                case "OPEN" /* STATUS.OPEN */:
                case "INPROCESS" /* STATUS.INPROCESS */:
                    return "cx-text-green" /* TEXT_COLOR_CLASS.GREEN */;
                case "CLOSED" /* STATUS.CLOSED */:
                    return "cx-text-grey" /* TEXT_COLOR_CLASS.GREY */;
                default:
                    return '';
            }
        };
    }
    goToTicketDetail(ticketId) {
        this.routingService.go({
            cxRoute: 'supportTicketDetails',
            params: { ticketCode: ticketId },
        });
    }
    getSortLabels() {
        return combineLatest([
            this.translationService.translate('customerTicketing.ticketId'),
            this.translationService.translate('customerTicketing.changedOn'),
        ]).pipe(map(([textByTicketId, textByDate]) => {
            return {
                byTicketId: textByTicketId,
                byDate: textByDate,
            };
        }));
    }
    changeSortCode(sortCode) {
        this.sortType = sortCode;
        this.pageChange(0);
    }
    pageChange(page) {
        const ticketListParams = this.createTicketListEvent(this.sortType, page);
        this.fetchTicketList(ticketListParams);
    }
    createTicketListEvent(sortCode, currentPage) {
        return {
            currentPage: currentPage,
            sortCode: sortCode,
        };
    }
    fetchTicketList(ticketListParams) {
        this.tickets$ = this.customerTicketingFacade.getTickets(this.PAGE_SIZE, ticketListParams.currentPage, ticketListParams.sortCode);
    }
}
CustomerTicketingListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingListComponent, deps: [{ token: i1.CustomerTicketingFacade }, { token: i2$1.RoutingService }, { token: i2$1.TranslationService }, { token: i1.CustomerTicketingConfig }], target: i0.ɵɵFactoryTarget.Component });
CustomerTicketingListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CustomerTicketingListComponent, selector: "cx-customer-ticketing-list", ngImport: i0, template: "<ng-container *ngIf=\"tickets$ | async as ticketList; else spinner\">\n  <span class=\"cx-ticketing-list-title\">\n    <h2 class=\"cx-ticketing-list-title-text\">\n      {{ 'customerTicketingList.requestTitle' | cxTranslate }}\n      ({{ ticketList.pagination?.totalResults || 0 }})\n    </h2>\n  </span>\n  <ng-container *ngIf=\"ticketList.tickets.length > 0; else noCustomerTickets\">\n    <div class=\"cx-ticketing-list-sort top\">\n      <label class=\"cx-ticketing-list-form-group form-group\">\n        <span>\n          {{ 'customerTicketingList.sortSubtitle' | cxTranslate }}\n        </span>\n        <cx-sorting\n          [sortOptions]=\"ticketList.sorts\"\n          [sortLabels]=\"getSortLabels() | async\"\n          (sortListEvent)=\"changeSortCode($event)\"\n          [selectedOption]=\"ticketList.pagination?.sort\"\n          placeholder=\"{{ 'customerTicketingList.sortSubtitle' | cxTranslate }}\"\n          [ariaLabel]=\"'customerTicketingList.sortOrders' | cxTranslate\"\n          ariaControls=\"ticketing-list-table\"\n        ></cx-sorting>\n      </label>\n      <cx-customer-ticketing-create></cx-customer-ticketing-create>\n    </div>\n    <table\n      id=\"ticketing-list-table\"\n      class=\"table cx-ticketing-list-table\"\n      aria-hidden=\"true\"\n    >\n      <thead class=\"cx-ticketing-list-thead-mobile\">\n        <tr>\n          <th scope=\"col\">{{ 'customerTicketing.ticketId' | cxTranslate }}</th>\n          <th scope=\"col\">\n            {{ 'customerTicketingList.subject' | cxTranslate }}\n          </th>\n          <th scope=\"col\">\n            {{ 'customerTicketingList.ticketCategory' | cxTranslate }}\n          </th>\n          <th scope=\"col\">{{ 'customerTicketing.createdOn' | cxTranslate }}</th>\n          <th scope=\"col\">{{ 'customerTicketing.changedOn' | cxTranslate }}</th>\n          <th scope=\"col\">{{ 'customerTicketing.status' | cxTranslate }}</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr\n          *ngFor=\"let ticket of ticketList.tickets\"\n          (click)=\"goToTicketDetail(ticket.id)\"\n        >\n          <td class=\"cx-ticketing-list-data cx-ticketing-list-id\">\n            <div class=\"cx-ticketing-list-label\">\n              {{ 'customerTicketingList.mobile.ticketIdFull' | cxTranslate }}\n            </div>\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'supportTicketDetails',\n                  params: { ticketCode: ticket.id }\n                } | cxUrl\n              \"\n              class=\"cx-ticketing-list-value\"\n            >\n              {{ ticket.id }}\n            </a>\n          </td>\n          <td class=\"cx-ticketing-list-data\">\n            <div class=\"cx-ticketing-list-label\">\n              {{ 'customerTicketingList.subject' | cxTranslate }}\n            </div>\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'supportTicketDetails',\n                  params: { ticketCode: ticket.id }\n                } | cxUrl\n              \"\n              class=\"cx-ticketing-list-value\"\n            >\n              {{ ticket.subject }}\n            </a>\n          </td>\n          <td class=\"cx-ticketing-list-data\">\n            <div class=\"cx-ticketing-list-label\">\n              {{ 'customerTicketingList.ticketCategory' | cxTranslate }}\n            </div>\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'supportTicketDetails',\n                  params: { ticketCode: ticket.id }\n                } | cxUrl\n              \"\n              class=\"cx-ticketing-list-value\"\n            >\n              {{ ticket.ticketCategory?.name }}\n            </a>\n          </td>\n          <td class=\"cx-ticketing-list-data\">\n            <div class=\"cx-ticketing-list-label\">\n              {{ 'customerTicketing.createdOn' | cxTranslate }}\n            </div>\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'supportTicketDetails',\n                  params: { ticketCode: ticket.id }\n                } | cxUrl\n              \"\n              class=\"cx-ticketing-list-value\"\n            >\n              {{ ticket.createdAt | cxDate }}\n            </a>\n          </td>\n          <td class=\"cx-ticketing-list-data\">\n            <div class=\"cx-ticketing-list-label\">\n              {{ 'customerTicketing.changedOn' | cxTranslate }}\n            </div>\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'supportTicketDetails',\n                  params: { ticketCode: ticket.id }\n                } | cxUrl\n              \"\n              class=\"cx-ticketing-list-value\"\n            >\n              {{ ticket.modifiedAt | cxDate }}\n            </a>\n          </td>\n          <td class=\"cx-ticketing-list-data\">\n            <div class=\"cx-ticketing-list-label\">\n              {{ 'customerTicketing.status' | cxTranslate }}\n            </div>\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'supportTicketDetails',\n                  params: { ticketCode: ticket.id }\n                } | cxUrl\n              \"\n              class=\"cx-ticketing-list-value\"\n              [ngClass]=\"getStatusClass(ticket.status.id)\"\n            >\n              {{ ticket.status?.name }}\n            </a>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n    <div class=\"cx-ticketing-list-sort bottom\">\n      <div\n        *ngIf=\"ticketList.pagination?.totalPages > 1\"\n        class=\"cx-ticketing-list-pagination\"\n      >\n        <cx-pagination\n          [pagination]=\"ticketList.pagination\"\n          (viewPageEvent)=\"pageChange($event)\"\n        ></cx-pagination>\n      </div>\n    </div>\n  </ng-container>\n  <ng-template #noCustomerTickets>\n    <cx-customer-ticketing-create></cx-customer-ticketing-create>\n    <ng-container>\n      <div class=\"text-center\">\n        <h3>{{ 'customerTicketingList.noTickets' | cxTranslate }}</h3>\n      </div>\n    </ng-container>\n  </ng-template>\n</ng-container>\n\n<ng-template #spinner>\n  <cx-spinner></cx-spinner>\n</ng-template>\n", dependencies: [{ kind: "component", type: CustomerTicketingCreateComponent, selector: "cx-customer-ticketing-create" }, { kind: "directive", type: i1$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.SortingComponent, selector: "cx-sorting", inputs: ["sortOptions", "ariaControls", "ariaLabel", "selectedOption", "placeholder", "sortLabels"], outputs: ["sortListEvent"] }, { kind: "component", type: i2.PaginationComponent, selector: "cx-pagination", inputs: ["pageRoute", "queryParam", "defaultPage", "pagination"], outputs: ["viewPageEvent"] }, { kind: "directive", type: i6.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i2.SpinnerComponent, selector: "cx-spinner" }, { kind: "pipe", type: i1$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2$1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2$1.CxDatePipe, name: "cxDate" }, { kind: "pipe", type: i2$1.UrlPipe, name: "cxUrl" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-ticketing-list', template: "<ng-container *ngIf=\"tickets$ | async as ticketList; else spinner\">\n  <span class=\"cx-ticketing-list-title\">\n    <h2 class=\"cx-ticketing-list-title-text\">\n      {{ 'customerTicketingList.requestTitle' | cxTranslate }}\n      ({{ ticketList.pagination?.totalResults || 0 }})\n    </h2>\n  </span>\n  <ng-container *ngIf=\"ticketList.tickets.length > 0; else noCustomerTickets\">\n    <div class=\"cx-ticketing-list-sort top\">\n      <label class=\"cx-ticketing-list-form-group form-group\">\n        <span>\n          {{ 'customerTicketingList.sortSubtitle' | cxTranslate }}\n        </span>\n        <cx-sorting\n          [sortOptions]=\"ticketList.sorts\"\n          [sortLabels]=\"getSortLabels() | async\"\n          (sortListEvent)=\"changeSortCode($event)\"\n          [selectedOption]=\"ticketList.pagination?.sort\"\n          placeholder=\"{{ 'customerTicketingList.sortSubtitle' | cxTranslate }}\"\n          [ariaLabel]=\"'customerTicketingList.sortOrders' | cxTranslate\"\n          ariaControls=\"ticketing-list-table\"\n        ></cx-sorting>\n      </label>\n      <cx-customer-ticketing-create></cx-customer-ticketing-create>\n    </div>\n    <table\n      id=\"ticketing-list-table\"\n      class=\"table cx-ticketing-list-table\"\n      aria-hidden=\"true\"\n    >\n      <thead class=\"cx-ticketing-list-thead-mobile\">\n        <tr>\n          <th scope=\"col\">{{ 'customerTicketing.ticketId' | cxTranslate }}</th>\n          <th scope=\"col\">\n            {{ 'customerTicketingList.subject' | cxTranslate }}\n          </th>\n          <th scope=\"col\">\n            {{ 'customerTicketingList.ticketCategory' | cxTranslate }}\n          </th>\n          <th scope=\"col\">{{ 'customerTicketing.createdOn' | cxTranslate }}</th>\n          <th scope=\"col\">{{ 'customerTicketing.changedOn' | cxTranslate }}</th>\n          <th scope=\"col\">{{ 'customerTicketing.status' | cxTranslate }}</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr\n          *ngFor=\"let ticket of ticketList.tickets\"\n          (click)=\"goToTicketDetail(ticket.id)\"\n        >\n          <td class=\"cx-ticketing-list-data cx-ticketing-list-id\">\n            <div class=\"cx-ticketing-list-label\">\n              {{ 'customerTicketingList.mobile.ticketIdFull' | cxTranslate }}\n            </div>\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'supportTicketDetails',\n                  params: { ticketCode: ticket.id }\n                } | cxUrl\n              \"\n              class=\"cx-ticketing-list-value\"\n            >\n              {{ ticket.id }}\n            </a>\n          </td>\n          <td class=\"cx-ticketing-list-data\">\n            <div class=\"cx-ticketing-list-label\">\n              {{ 'customerTicketingList.subject' | cxTranslate }}\n            </div>\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'supportTicketDetails',\n                  params: { ticketCode: ticket.id }\n                } | cxUrl\n              \"\n              class=\"cx-ticketing-list-value\"\n            >\n              {{ ticket.subject }}\n            </a>\n          </td>\n          <td class=\"cx-ticketing-list-data\">\n            <div class=\"cx-ticketing-list-label\">\n              {{ 'customerTicketingList.ticketCategory' | cxTranslate }}\n            </div>\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'supportTicketDetails',\n                  params: { ticketCode: ticket.id }\n                } | cxUrl\n              \"\n              class=\"cx-ticketing-list-value\"\n            >\n              {{ ticket.ticketCategory?.name }}\n            </a>\n          </td>\n          <td class=\"cx-ticketing-list-data\">\n            <div class=\"cx-ticketing-list-label\">\n              {{ 'customerTicketing.createdOn' | cxTranslate }}\n            </div>\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'supportTicketDetails',\n                  params: { ticketCode: ticket.id }\n                } | cxUrl\n              \"\n              class=\"cx-ticketing-list-value\"\n            >\n              {{ ticket.createdAt | cxDate }}\n            </a>\n          </td>\n          <td class=\"cx-ticketing-list-data\">\n            <div class=\"cx-ticketing-list-label\">\n              {{ 'customerTicketing.changedOn' | cxTranslate }}\n            </div>\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'supportTicketDetails',\n                  params: { ticketCode: ticket.id }\n                } | cxUrl\n              \"\n              class=\"cx-ticketing-list-value\"\n            >\n              {{ ticket.modifiedAt | cxDate }}\n            </a>\n          </td>\n          <td class=\"cx-ticketing-list-data\">\n            <div class=\"cx-ticketing-list-label\">\n              {{ 'customerTicketing.status' | cxTranslate }}\n            </div>\n            <a\n              [routerLink]=\"\n                {\n                  cxRoute: 'supportTicketDetails',\n                  params: { ticketCode: ticket.id }\n                } | cxUrl\n              \"\n              class=\"cx-ticketing-list-value\"\n              [ngClass]=\"getStatusClass(ticket.status.id)\"\n            >\n              {{ ticket.status?.name }}\n            </a>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n    <div class=\"cx-ticketing-list-sort bottom\">\n      <div\n        *ngIf=\"ticketList.pagination?.totalPages > 1\"\n        class=\"cx-ticketing-list-pagination\"\n      >\n        <cx-pagination\n          [pagination]=\"ticketList.pagination\"\n          (viewPageEvent)=\"pageChange($event)\"\n        ></cx-pagination>\n      </div>\n    </div>\n  </ng-container>\n  <ng-template #noCustomerTickets>\n    <cx-customer-ticketing-create></cx-customer-ticketing-create>\n    <ng-container>\n      <div class=\"text-center\">\n        <h3>{{ 'customerTicketingList.noTickets' | cxTranslate }}</h3>\n      </div>\n    </ng-container>\n  </ng-template>\n</ng-container>\n\n<ng-template #spinner>\n  <cx-spinner></cx-spinner>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CustomerTicketingFacade }, { type: i2$1.RoutingService }, { type: i2$1.TranslationService }, { type: i1.CustomerTicketingConfig }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerTicketingListModule {
}
CustomerTicketingListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CustomerTicketingListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingListModule, declarations: [CustomerTicketingListComponent], imports: [CustomerTicketingCreateModule,
        CommonModule,
        I18nModule,
        UrlModule,
        CardModule,
        IconModule,
        ListNavigationModule,
        RouterModule,
        SpinnerModule], exports: [CustomerTicketingListComponent] });
CustomerTicketingListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingListModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                SupportTicketHistoryComponent: {
                    component: CustomerTicketingListComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CustomerTicketingCreateModule,
        CommonModule,
        I18nModule,
        UrlModule,
        CardModule,
        IconModule,
        ListNavigationModule,
        RouterModule,
        SpinnerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CustomerTicketingCreateModule,
                        CommonModule,
                        I18nModule,
                        UrlModule,
                        CardModule,
                        IconModule,
                        ListNavigationModule,
                        RouterModule,
                        SpinnerModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                SupportTicketHistoryComponent: {
                                    component: CustomerTicketingListComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CustomerTicketingListComponent],
                    exports: [CustomerTicketingListComponent],
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
class CustomerTicketingDetailsComponent {
    constructor(translation, customerTicketingFacade, routingService, eventService) {
        this.translation = translation;
        this.customerTicketingFacade = customerTicketingFacade;
        this.routingService = routingService;
        this.eventService = eventService;
        this.dateFormat = DATE_FORMAT;
        this.subscription = new Subscription();
        this.ticketDetails$ = this.customerTicketingFacade.getTicket();
        this.reloadOnRedirection();
    }
    prepareCardContent(entity, titleTranslation, id) {
        return this.translation.translate(titleTranslation).pipe(filter(() => Boolean(entity)), map((textTitle) => ({
            title: textTitle,
            text: [entity || ''],
            customClass: this.getStatusClass(id === null || id === void 0 ? void 0 : id.toUpperCase()),
        })));
    }
    getStatusClass(id) {
        if (id === "OPEN" /* STATUS.OPEN */ || id === "INPROCESS" /* STATUS.INPROCESS */) {
            return "cx-text-green" /* TEXT_COLOR_CLASS.GREEN */;
        }
        else if (id === "CLOSED" /* STATUS.CLOSED */) {
            return "cx-text-grey" /* TEXT_COLOR_CLASS.GREY */;
        }
        return '';
    }
    reloadOnRedirection() {
        this.subscription = combineLatest([
            this.ticketDetails$,
            this.routingService.getParams().pipe(map((params) => params.ticketCode)),
        ])
            .pipe(take(1), tap(([ticket, ticketCode]) => {
            if (ticket && ticketCode !== (ticket === null || ticket === void 0 ? void 0 : ticket.id)) {
                this.eventService.dispatch({}, GetTicketQueryReloadEvent);
            }
        }))
            .subscribe();
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
}
CustomerTicketingDetailsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingDetailsComponent, deps: [{ token: i2$1.TranslationService }, { token: i1.CustomerTicketingFacade }, { token: i2$1.RoutingService }, { token: i2$1.EventService }], target: i0.ɵɵFactoryTarget.Component });
CustomerTicketingDetailsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CustomerTicketingDetailsComponent, selector: "cx-customer-ticketing-details", ngImport: i0, template: "<ng-container *ngIf=\"ticketDetails$ | async as ticket; else spinner\">\n  <div class=\"cx-ticket-details\">\n    <div class=\"container\">\n      <div class=\"cx-details-card\">\n        <cx-card\n          [content]=\"\n            prepareCardContent(ticket.id, 'customerTicketing.ticketId') | async\n          \"\n        ></cx-card>\n      </div>\n\n      <div class=\"cx-details-card\">\n        <cx-card\n          [content]=\"\n            prepareCardContent(\n              (ticket.createdAt | cxDate: dateFormat) ?? dateFormat,\n              'customerTicketing.createdOn'\n            ) | async\n          \"\n        ></cx-card>\n      </div>\n\n      <div class=\"cx-details-card\">\n        <cx-card\n          [content]=\"\n            prepareCardContent(\n              (ticket.modifiedAt | cxDate: dateFormat) ?? dateFormat,\n              'customerTicketing.changedOn'\n            ) | async\n          \"\n        ></cx-card>\n      </div>\n\n      <div class=\"cx-details-card\">\n        <cx-card\n          [content]=\"\n            prepareCardContent(\n              ticket.status ? ticket.status.name : undefined,\n              'customerTicketing.status',\n              ticket.status ? ticket.status.id : undefined\n            ) | async\n          \"\n        ></cx-card>\n      </div>\n    </div>\n  </div>\n</ng-container>\n<ng-template #spinner>\n  <cx-spinner></cx-spinner>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.CardComponent, selector: "cx-card", inputs: ["border", "editMode", "isDefault", "content", "fitToContainer", "truncateText", "charactersLimit", "index"], outputs: ["deleteCard", "setDefaultCard", "sendCard", "editCard", "cancelCard"] }, { kind: "component", type: i2.SpinnerComponent, selector: "cx-spinner" }, { kind: "pipe", type: i1$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2$1.CxDatePipe, name: "cxDate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingDetailsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-ticketing-details', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"ticketDetails$ | async as ticket; else spinner\">\n  <div class=\"cx-ticket-details\">\n    <div class=\"container\">\n      <div class=\"cx-details-card\">\n        <cx-card\n          [content]=\"\n            prepareCardContent(ticket.id, 'customerTicketing.ticketId') | async\n          \"\n        ></cx-card>\n      </div>\n\n      <div class=\"cx-details-card\">\n        <cx-card\n          [content]=\"\n            prepareCardContent(\n              (ticket.createdAt | cxDate: dateFormat) ?? dateFormat,\n              'customerTicketing.createdOn'\n            ) | async\n          \"\n        ></cx-card>\n      </div>\n\n      <div class=\"cx-details-card\">\n        <cx-card\n          [content]=\"\n            prepareCardContent(\n              (ticket.modifiedAt | cxDate: dateFormat) ?? dateFormat,\n              'customerTicketing.changedOn'\n            ) | async\n          \"\n        ></cx-card>\n      </div>\n\n      <div class=\"cx-details-card\">\n        <cx-card\n          [content]=\"\n            prepareCardContent(\n              ticket.status ? ticket.status.name : undefined,\n              'customerTicketing.status',\n              ticket.status ? ticket.status.id : undefined\n            ) | async\n          \"\n        ></cx-card>\n      </div>\n    </div>\n  </div>\n</ng-container>\n<ng-template #spinner>\n  <cx-spinner></cx-spinner>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i2$1.TranslationService }, { type: i1.CustomerTicketingFacade }, { type: i2$1.RoutingService }, { type: i2$1.EventService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerTicketingDetailsModule {
}
CustomerTicketingDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CustomerTicketingDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingDetailsModule, declarations: [CustomerTicketingDetailsComponent], imports: [CommonModule, I18nModule, UrlModule, CardModule, SpinnerModule], exports: [CustomerTicketingDetailsComponent] });
CustomerTicketingDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingDetailsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                SupportTicketDetailsComponent: {
                    component: CustomerTicketingDetailsComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule, I18nModule, UrlModule, CardModule, SpinnerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, UrlModule, CardModule, SpinnerModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                SupportTicketDetailsComponent: {
                                    component: CustomerTicketingDetailsComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CustomerTicketingDetailsComponent],
                    exports: [CustomerTicketingDetailsComponent],
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
class CustomerTicketingReopenComponent {
    constructor(customerTicketingFacade, launchDialogService, vcr) {
        this.customerTicketingFacade = customerTicketingFacade;
        this.launchDialogService = launchDialogService;
        this.vcr = vcr;
        this.subscription = new Subscription();
        this.enableReopenButton$ = this.customerTicketingFacade
            .getTicket()
            .pipe(map((ticket) => {
            var _a, _b;
            return ((_a = ticket === null || ticket === void 0 ? void 0 : ticket.status) === null || _a === void 0 ? void 0 : _a.id) === "CLOSED" /* STATUS.CLOSED */ &&
                ((_b = ticket.availableStatusTransitions) === null || _b === void 0 ? void 0 : _b.some((status) => status.id.toUpperCase() === "INPROCESS" /* STATUS.INPROCESS */ ||
                    status.id.toUpperCase() === "OPEN" /* STATUS.OPEN */));
        }));
    }
    openDialog() {
        const dialog = this.launchDialogService.openDialog("CUSTOMER_TICKETING_REOPEN" /* LAUNCH_CALLER.CUSTOMER_TICKETING_REOPEN */, this.element, this.vcr);
        if (dialog) {
            this.subscription.add(dialog.pipe(take(1)).subscribe());
        }
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
}
CustomerTicketingReopenComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingReopenComponent, deps: [{ token: i1.CustomerTicketingFacade }, { token: i2.LaunchDialogService }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
CustomerTicketingReopenComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CustomerTicketingReopenComponent, selector: "cx-customer-ticketing-reopen", viewQueries: [{ propertyName: "element", first: true, predicate: ["element"], descendants: true }], ngImport: i0, template: "<div class=\"col-xs-12 col-md-5 col-lg-4\" *ngIf=\"enableReopenButton$ | async\">\n  <button #element class=\"btn btn-block btn-secondary\" (click)=\"openDialog()\">\n    {{ 'customerTicketingDetails.reopenRequest' | cxTranslate }}\n  </button>\n</div>\n", dependencies: [{ kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i1$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingReopenComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-ticketing-reopen', template: "<div class=\"col-xs-12 col-md-5 col-lg-4\" *ngIf=\"enableReopenButton$ | async\">\n  <button #element class=\"btn btn-block btn-secondary\" (click)=\"openDialog()\">\n    {{ 'customerTicketingDetails.reopenRequest' | cxTranslate }}\n  </button>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CustomerTicketingFacade }, { type: i2.LaunchDialogService }, { type: i0.ViewContainerRef }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['element']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerTicketingReopenModule {
}
CustomerTicketingReopenModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingReopenModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CustomerTicketingReopenModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingReopenModule, declarations: [CustomerTicketingReopenComponent,
        CustomerTicketingReopenDialogComponent], imports: [CommonModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        FormErrorsModule,
        FileUploadModule,
        SpinnerModule], exports: [CustomerTicketingReopenComponent,
        CustomerTicketingReopenDialogComponent] });
CustomerTicketingReopenModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingReopenModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                SupportTicketReopenComponent: {
                    component: CustomerTicketingReopenComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        FormErrorsModule,
        FileUploadModule,
        SpinnerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingReopenModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        IconModule,
                        KeyboardFocusModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                        FileUploadModule,
                        SpinnerModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                SupportTicketReopenComponent: {
                                    component: CustomerTicketingReopenComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [
                        CustomerTicketingReopenComponent,
                        CustomerTicketingReopenDialogComponent,
                    ],
                    exports: [
                        CustomerTicketingReopenComponent,
                        CustomerTicketingReopenDialogComponent,
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
class CustomerTicketingMessagesComponent {
    constructor(customerTicketingConfig, customerTicketingFacade, eventService) {
        this.customerTicketingConfig = customerTicketingConfig;
        this.customerTicketingFacade = customerTicketingFacade;
        this.eventService = eventService;
        this.ticketDetails$ = this.customerTicketingFacade.getTicket();
        this.subscription = new Subscription();
        this.messageEvents$ = this.prepareMessageEvents();
        this.messagingConfigs = this.prepareMessagingConfigs();
    }
    onSend(event) {
        var _a, _b;
        const mustWaitForAttachment = (_b = (event.files instanceof FileList && ((_a = event.files) === null || _a === void 0 ? void 0 : _a.length) > 0)) !== null && _b !== void 0 ? _b : false;
        this.subscription.add(this.customerTicketingFacade
            .createTicketEvent(this.prepareTicketEvent(event.message), mustWaitForAttachment)
            .subscribe((createdEvent) => {
            var _a, _b;
            if (event.files && ((_a = event.files) === null || _a === void 0 ? void 0 : _a.length) && createdEvent.code) {
                this.customerTicketingFacade.uploadAttachment(event.files.item(0), createdEvent.code);
            }
            (_b = this.messagingComponent) === null || _b === void 0 ? void 0 : _b.resetForm();
        }));
    }
    downloadAttachment(event) {
        this.subscription.add(this.customerTicketingFacade
            .downloadAttachment(event.messageCode, event.attachmentId)
            .subscribe((data) => {
            var _a;
            const downloadURL = window.URL.createObjectURL(data);
            const link = document.createElement('a');
            link.href = downloadURL;
            link.download = (_a = event.fileName) !== null && _a !== void 0 ? _a : '';
            link.click();
        }));
    }
    prepareMessageEvents() {
        return this.ticketDetails$.pipe(map((ticket) => {
            var _a, _b;
            return (_b = (_a = ticket === null || ticket === void 0 ? void 0 : ticket.ticketEvents) === null || _a === void 0 ? void 0 : _a.map((event) => {
                var _a, _b;
                return (Object.assign(Object.assign({}, event), { text: (_a = event.message) !== null && _a !== void 0 ? _a : '', rightAlign: event.addedByAgent || false, attachments: (_b = event.ticketEventAttachments) !== null && _b !== void 0 ? _b : [] }));
            })) !== null && _b !== void 0 ? _b : [];
        }));
    }
    prepareMessagingConfigs() {
        var _a, _b;
        return {
            attachmentRestrictions: (_a = this.customerTicketingConfig.customerTicketing) === null || _a === void 0 ? void 0 : _a.attachmentRestrictions,
            charactersLimit: (_b = this.customerTicketingConfig.customerTicketing) === null || _b === void 0 ? void 0 : _b.inputCharactersLimit,
            enableFileUploadOption: true,
            displayAddMessageSection: this.ticketDetails$.pipe(map((ticket) => { var _a; return ((_a = ticket === null || ticket === void 0 ? void 0 : ticket.status) === null || _a === void 0 ? void 0 : _a.id) !== "CLOSED"; } /* STATUS.CLOSED */)),
        };
    }
    prepareTicketEvent(messageText) {
        return {
            message: messageText,
        };
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
}
CustomerTicketingMessagesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingMessagesComponent, deps: [{ token: i1.CustomerTicketingConfig }, { token: i1.CustomerTicketingFacade }, { token: i2$1.EventService }], target: i0.ɵɵFactoryTarget.Component });
CustomerTicketingMessagesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CustomerTicketingMessagesComponent, selector: "cx-customer-ticketing-messages", viewQueries: [{ propertyName: "messagingComponent", first: true, predicate: MessagingComponent, descendants: true }], ngImport: i0, template: "<cx-messaging\n  [messageEvents$]=\"messageEvents$\"\n  [messagingConfigs]=\"messagingConfigs\"\n  (send)=\"onSend($event)\"\n  (downloadAttachment)=\"downloadAttachment($event)\"\n></cx-messaging>\n", dependencies: [{ kind: "component", type: i2.MessagingComponent, selector: "cx-messaging", inputs: ["messageEvents$", "scrollToInput", "messagingConfigs"], outputs: ["send", "downloadAttachment"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingMessagesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-ticketing-messages', template: "<cx-messaging\n  [messageEvents$]=\"messageEvents$\"\n  [messagingConfigs]=\"messagingConfigs\"\n  (send)=\"onSend($event)\"\n  (downloadAttachment)=\"downloadAttachment($event)\"\n></cx-messaging>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CustomerTicketingConfig }, { type: i1.CustomerTicketingFacade }, { type: i2$1.EventService }]; }, propDecorators: { messagingComponent: [{
                type: ViewChild,
                args: [MessagingComponent]
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerTicketingMessagesModule {
}
CustomerTicketingMessagesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingMessagesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CustomerTicketingMessagesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingMessagesModule, declarations: [CustomerTicketingMessagesComponent], imports: [CommonModule,
        I18nModule,
        UrlModule,
        ChatMessagingModule,
        ReactiveFormsModule,
        FormsModule], exports: [CustomerTicketingMessagesComponent] });
CustomerTicketingMessagesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingMessagesModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                SupportTicketUpdateComponent: {
                    component: CustomerTicketingMessagesComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        I18nModule,
        UrlModule,
        ChatMessagingModule,
        ReactiveFormsModule,
        FormsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingMessagesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        UrlModule,
                        ChatMessagingModule,
                        ReactiveFormsModule,
                        FormsModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                SupportTicketUpdateComponent: {
                                    component: CustomerTicketingMessagesComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CustomerTicketingMessagesComponent],
                    exports: [CustomerTicketingMessagesComponent],
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
class MyAccountV2CustomerTicketingComponent {
    constructor() {
        this.PAGE_SIZE = 1;
        this.customerTicketingFacade = inject(CustomerTicketingFacade);
        this.tickets$ = this.customerTicketingFacade.getTickets(this.PAGE_SIZE);
    }
}
MyAccountV2CustomerTicketingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2CustomerTicketingComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MyAccountV2CustomerTicketingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: MyAccountV2CustomerTicketingComponent, selector: "cx-my-account-v2-customer-ticketing", ngImport: i0, template: "<ng-container>\n  <div class=\"cx-my-account-customer-ticket-header\">\n    <!-- HEADER -->\n    <div\n      class=\"cx-my-account-customer-ticket-heading\"\n      [attr.aria-label]=\"'myAccountV2CustomerTicketing.heading' | cxTranslate\"\n    >\n      {{ 'myAccountV2CustomerTicketing.heading' | cxTranslate }}\n    </div>\n\n    <!-- SHOW MORE -->\n    <div class=\"cx-my-account-customer-ticket-show-more\">\n      <a\n        id=\"show-more-requests\"\n        [attr.aria-label]=\"\n          'myAccountV2CustomerTicketing.showMore' | cxTranslate\n        \"\n        class=\"btn-link cx-action-link\"\n        [routerLink]=\"\n          {\n            cxRoute: 'supportTickets'\n          } | cxUrl\n        \"\n      >\n        {{ 'myAccountV2CustomerTicketing.showMore' | cxTranslate }}\n      </a>\n    </div>\n  </div>\n  <ng-container *ngIf=\"tickets$ | async as ticketList; else spinner\">\n    <ng-container *ngIf=\"ticketList.tickets.length > 0; else noCustomerTickets\">\n      <div class=\"cx-my-account-customer-ticket-body\">\n        <ng-container *ngFor=\"let ticket of ticketList.tickets\">\n          <div class=\"cx-my-account-customer-ticket-details\">\n            <span\n              class=\"cx-my-account-customer-ticket-subject\"\n              [attr.aria-label]=\"\n                'myAccountV2CustomerTicketing.subjectLabel' | cxTranslate\n              \"\n            >\n              {{ ticket.subject }}\n            </span>\n            <span class=\"cx-my-account-customer-ticket-details-light\">\n              | {{ ticket.ticketCategory?.name }}\n            </span>\n            <span\n              class=\"cx-my-account-customer-ticket-details-light\"\n              [attr.aria-label]=\"\n                'myAccountV2CustomerTicketing.idLabel' | cxTranslate\n              \"\n            >\n              |\n              {{\n                'myAccountV2CustomerTicketing.ticketId'\n                  | cxTranslate: { value: ticket.id }\n              }}\n            </span>\n          </div>\n          <div class=\"cx-my-account-customer-ticket-details-light\">\n            {{\n              'myAccountV2CustomerTicketing.changedOn'\n                | cxTranslate\n                  : { value: ticket.modifiedAt | cxDate: 'd, MMMM, yyyy' }\n            }}\n          </div>\n        </ng-container>\n      </div>\n    </ng-container>\n  </ng-container>\n</ng-container>\n\n<ng-template #noCustomerTickets>\n  <div\n    class=\"cx-my-account-no-ticket\"\n    [attr.aria-label]=\"'customerTicketingList.noTickets' | cxTranslate\"\n  >\n    {{ 'customerTicketingList.noTickets' | cxTranslate }}\n  </div>\n</ng-template>\n\n<ng-template #spinner>\n  <cx-spinner></cx-spinner>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i1$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.SpinnerComponent, selector: "cx-spinner" }, { kind: "directive", type: i6.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i1$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2$1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2$1.CxDatePipe, name: "cxDate" }, { kind: "pipe", type: i2$1.UrlPipe, name: "cxUrl" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2CustomerTicketingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-my-account-v2-customer-ticketing', template: "<ng-container>\n  <div class=\"cx-my-account-customer-ticket-header\">\n    <!-- HEADER -->\n    <div\n      class=\"cx-my-account-customer-ticket-heading\"\n      [attr.aria-label]=\"'myAccountV2CustomerTicketing.heading' | cxTranslate\"\n    >\n      {{ 'myAccountV2CustomerTicketing.heading' | cxTranslate }}\n    </div>\n\n    <!-- SHOW MORE -->\n    <div class=\"cx-my-account-customer-ticket-show-more\">\n      <a\n        id=\"show-more-requests\"\n        [attr.aria-label]=\"\n          'myAccountV2CustomerTicketing.showMore' | cxTranslate\n        \"\n        class=\"btn-link cx-action-link\"\n        [routerLink]=\"\n          {\n            cxRoute: 'supportTickets'\n          } | cxUrl\n        \"\n      >\n        {{ 'myAccountV2CustomerTicketing.showMore' | cxTranslate }}\n      </a>\n    </div>\n  </div>\n  <ng-container *ngIf=\"tickets$ | async as ticketList; else spinner\">\n    <ng-container *ngIf=\"ticketList.tickets.length > 0; else noCustomerTickets\">\n      <div class=\"cx-my-account-customer-ticket-body\">\n        <ng-container *ngFor=\"let ticket of ticketList.tickets\">\n          <div class=\"cx-my-account-customer-ticket-details\">\n            <span\n              class=\"cx-my-account-customer-ticket-subject\"\n              [attr.aria-label]=\"\n                'myAccountV2CustomerTicketing.subjectLabel' | cxTranslate\n              \"\n            >\n              {{ ticket.subject }}\n            </span>\n            <span class=\"cx-my-account-customer-ticket-details-light\">\n              | {{ ticket.ticketCategory?.name }}\n            </span>\n            <span\n              class=\"cx-my-account-customer-ticket-details-light\"\n              [attr.aria-label]=\"\n                'myAccountV2CustomerTicketing.idLabel' | cxTranslate\n              \"\n            >\n              |\n              {{\n                'myAccountV2CustomerTicketing.ticketId'\n                  | cxTranslate: { value: ticket.id }\n              }}\n            </span>\n          </div>\n          <div class=\"cx-my-account-customer-ticket-details-light\">\n            {{\n              'myAccountV2CustomerTicketing.changedOn'\n                | cxTranslate\n                  : { value: ticket.modifiedAt | cxDate: 'd, MMMM, yyyy' }\n            }}\n          </div>\n        </ng-container>\n      </div>\n    </ng-container>\n  </ng-container>\n</ng-container>\n\n<ng-template #noCustomerTickets>\n  <div\n    class=\"cx-my-account-no-ticket\"\n    [attr.aria-label]=\"'customerTicketingList.noTickets' | cxTranslate\"\n  >\n    {{ 'customerTicketingList.noTickets' | cxTranslate }}\n  </div>\n</ng-template>\n\n<ng-template #spinner>\n  <cx-spinner></cx-spinner>\n</ng-template>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MyAccountV2CustomerTicketingModule {
}
MyAccountV2CustomerTicketingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2CustomerTicketingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MyAccountV2CustomerTicketingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2CustomerTicketingModule, declarations: [MyAccountV2CustomerTicketingComponent], imports: [CommonModule, I18nModule, UrlModule, SpinnerModule, RouterModule], exports: [MyAccountV2CustomerTicketingComponent] });
MyAccountV2CustomerTicketingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2CustomerTicketingModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                MyAccountViewRequestsComponent: {
                    component: MyAccountV2CustomerTicketingComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule, I18nModule, UrlModule, SpinnerModule, RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2CustomerTicketingModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MyAccountV2CustomerTicketingComponent],
                    exports: [MyAccountV2CustomerTicketingComponent],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                MyAccountViewRequestsComponent: {
                                    component: MyAccountV2CustomerTicketingComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    imports: [CommonModule, I18nModule, UrlModule, SpinnerModule, RouterModule],
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
class CustomerTicketingComponentsModule {
}
CustomerTicketingComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CustomerTicketingComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingComponentsModule, imports: [ReactiveFormsModule,
        FormErrorsModule,
        CustomerTicketingDetailsModule,
        CustomerTicketingCloseModule,
        CustomerTicketingReopenModule,
        CustomerTicketingListModule,
        CustomerTicketingMessagesModule,
        CustomerTicketingCreateModule,
        MyAccountV2CustomerTicketingModule] });
CustomerTicketingComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingComponentsModule, providers: [provideDefaultConfig(defaultCustomerTicketingFormLayoutConfig)], imports: [ReactiveFormsModule,
        FormErrorsModule,
        CustomerTicketingDetailsModule,
        CustomerTicketingCloseModule,
        CustomerTicketingReopenModule,
        CustomerTicketingListModule,
        CustomerTicketingMessagesModule,
        CustomerTicketingCreateModule,
        MyAccountV2CustomerTicketingModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ReactiveFormsModule,
                        FormErrorsModule,
                        CustomerTicketingDetailsModule,
                        CustomerTicketingCloseModule,
                        CustomerTicketingReopenModule,
                        CustomerTicketingListModule,
                        CustomerTicketingMessagesModule,
                        CustomerTicketingCreateModule,
                        MyAccountV2CustomerTicketingModule,
                    ],
                    providers: [provideDefaultConfig(defaultCustomerTicketingFormLayoutConfig)],
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

/**
 * Generated bundle index. Do not edit.
 */

export { CustomerTicketingCloseComponent, CustomerTicketingCloseDialogComponent, CustomerTicketingCloseModule, CustomerTicketingComponentsModule, CustomerTicketingCreateComponent, CustomerTicketingCreateDialogComponent, CustomerTicketingCreateModule, CustomerTicketingDetailsComponent, CustomerTicketingDetailsModule, CustomerTicketingDialogComponent, CustomerTicketingListComponent, CustomerTicketingListModule, CustomerTicketingMessagesComponent, CustomerTicketingMessagesModule, CustomerTicketingReopenComponent, CustomerTicketingReopenDialogComponent, CustomerTicketingReopenModule, MyAccountV2CustomerTicketingComponent, MyAccountV2CustomerTicketingModule, defaultCustomerTicketingFormLayoutConfig };
//# sourceMappingURL=spartacus-customer-ticketing-components.mjs.map
