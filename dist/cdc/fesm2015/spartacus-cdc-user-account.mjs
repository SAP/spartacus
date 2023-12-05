import * as i0 from '@angular/core';
import { Injectable, Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import * as i1 from '@spartacus/core';
import { GlobalMessageType, I18nModule, provideDefaultConfig, UrlModule, AuthService, GlobalMessageService, WindowRef } from '@spartacus/core';
import { LoginFormComponentService, LoginFormComponent } from '@spartacus/user/account/components';
import { Subscription, of } from 'rxjs';
import * as i1$1 from '@spartacus/cdc/root';
import { CdcReConsentEvent, CdcJsService } from '@spartacus/cdc/root';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import * as i1$2 from '@spartacus/storefront';
import { ICON_TYPE, DIALOG_TYPE, SpinnerModule, IconModule, KeyboardFocusModule, ConsentManagementModule, FormErrorsModule } from '@spartacus/storefront';
import { map, take } from 'rxjs/operators';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcLoginFormComponentService extends LoginFormComponentService {
    constructor(auth, globalMessageService, winRef, cdcJsService) {
        super(auth, globalMessageService, winRef);
        this.auth = auth;
        this.globalMessageService = globalMessageService;
        this.winRef = winRef;
        this.cdcJsService = cdcJsService;
        this.subscription = new Subscription();
    }
    login() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        this.subscription.add(this.cdcJsService.didLoad().subscribe((cdcLoaded) => {
            if (cdcLoaded) {
                // Logging in using CDC Gigya SDK
                this.cdcJsService
                    .loginUserWithoutScreenSet(this.form.value.userId.toLowerCase(), this.form.value.password)
                    .subscribe({
                    next: () => this.busy$.next(false),
                    error: () => this.busy$.next(false),
                });
            }
            else {
                // CDC Gigya SDK not loaded, show error to the user
                this.globalMessageService.add({
                    key: 'errorHandlers.scriptFailedToLoad',
                }, GlobalMessageType.MSG_TYPE_ERROR);
                this.busy$.next(false);
            }
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CdcLoginFormComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcLoginFormComponentService, deps: [{ token: i1.AuthService }, { token: i1.GlobalMessageService }, { token: i1.WindowRef }, { token: i1$1.CdcJsService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcLoginFormComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcLoginFormComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcLoginFormComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i1.GlobalMessageService }, { type: i1.WindowRef }, { type: i1$1.CdcJsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcReconsentComponentService {
    constructor(cdcUserConsentService, cdcJsService, globalMessageService, launchDialogService) {
        this.cdcUserConsentService = cdcUserConsentService;
        this.cdcJsService = cdcJsService;
        this.globalMessageService = globalMessageService;
        this.launchDialogService = launchDialogService;
        this.subscription = new Subscription();
    }
    /**
     * saves the consent given from reconsent pop-up and triggers a re-login
     * @param consentId - array of consent IDs
     * @param userParams - data from login session
     */
    saveConsentAndLogin(consentId, userParams) {
        this.subscription.add(this.cdcJsService.didLoad().subscribe((cdcLoaded) => {
            if (cdcLoaded) {
                this.cdcUserConsentService
                    .updateCdcConsent(true, consentId, userParams === null || userParams === void 0 ? void 0 : userParams.user, userParams === null || userParams === void 0 ? void 0 : userParams.regToken)
                    .subscribe({
                    next: (result) => {
                        if ((result === null || result === void 0 ? void 0 : result.errorCode) === 0) {
                            //do a automatic re-login
                            this.cdcJsService
                                .loginUserWithoutScreenSet(userParams.user, userParams.password)
                                .subscribe(() => {
                                this.launchDialogService.closeDialog('relogin triggered');
                            });
                        }
                    },
                    error: (error) => {
                        this.handleReconsentUpdateError('Reconsent Error', error === null || error === void 0 ? void 0 : error.message);
                    },
                });
            }
            else {
                // CDC Gigya SDK not loaded, show error to the user
                this.globalMessageService.add({
                    key: 'errorHandlers.scriptFailedToLoad',
                }, GlobalMessageType.MSG_TYPE_ERROR);
            }
        }));
    }
    /**
     * Displays error message after closing reconsent dialog
     */
    handleReconsentUpdateError(reason, errorMessage) {
        this.launchDialogService.closeDialog(reason);
        if (errorMessage) {
            this.globalMessageService.add({
                key: 'httpHandlers.badRequestPleaseLoginAgain',
                params: {
                    errorMessage: errorMessage,
                },
            }, GlobalMessageType.MSG_TYPE_ERROR);
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CdcReconsentComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcReconsentComponentService, deps: [{ token: i1$1.CdcUserConsentService }, { token: i1$1.CdcJsService }, { token: i1.GlobalMessageService }, { token: i1$2.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcReconsentComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcReconsentComponentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcReconsentComponentService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$1.CdcUserConsentService }, { type: i1$1.CdcJsService }, { type: i1.GlobalMessageService }, { type: i1$2.LaunchDialogService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcReconsentComponent {
    constructor(launchDialogService, anonymousConsentsService, cdcReconsentService) {
        this.launchDialogService = launchDialogService;
        this.anonymousConsentsService = anonymousConsentsService;
        this.cdcReconsentService = cdcReconsentService;
        this.subscription = new Subscription();
        this.form = new UntypedFormGroup({});
        this.iconTypes = ICON_TYPE;
        this.loaded$ = of(false);
        this.reconsentEvent = {};
        this.selectedConsents = [];
        this.disableSubmitButton = true;
        this.totalConsents = 0;
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: 'button',
            focusOnEscape: true,
        };
    }
    ngOnInit() {
        this.subscription.add(this.launchDialogService.data$.subscribe((data) => {
            this.reconsentEvent['user'] = data.user;
            this.reconsentEvent['password'] = data.password;
            this.reconsentEvent['regToken'] = data.regToken;
            this.reconsentEvent['errorMessage'] = data.errorMessage;
            this.loadConsents(data.consentIds);
        }));
    }
    loadConsents(reconsentIds) {
        this.templateList$ = this.anonymousConsentsService.getTemplates(true).pipe(map((templateList) => {
            const output = [];
            templateList.forEach((template) => {
                if (template.id && reconsentIds.includes(template.id)) {
                    output.push(template);
                }
            });
            this.totalConsents = output.length;
            return output;
        }));
        this.loaded$ = of(true);
    }
    onConsentChange(event) {
        var _a, _b;
        if (event.given === false && ((_a = event.template) === null || _a === void 0 ? void 0 : _a.id)) {
            const index = this.selectedConsents.indexOf(event.template.id);
            if (index !== -1) {
                this.selectedConsents.splice(index, 1);
            }
        }
        else if (event.given === true && ((_b = event.template) === null || _b === void 0 ? void 0 : _b.id)) {
            this.selectedConsents.push(event.template.id);
        }
        if (this.totalConsents === this.selectedConsents.length) {
            this.disableSubmitButton = false;
        }
        else {
            this.disableSubmitButton = true;
        }
    }
    dismissDialog(reason, message) {
        if (reason === 'Proceed To Login') {
            this.loaded$ = of(false);
            this.cdcReconsentService.saveConsentAndLogin(this.selectedConsents, this.reconsentEvent);
        }
        else {
            this.cdcReconsentService.handleReconsentUpdateError(reason, message);
        }
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
}
CdcReconsentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcReconsentComponent, deps: [{ token: i1$2.LaunchDialogService }, { token: i1.AnonymousConsentsService }, { token: CdcReconsentComponentService }], target: i0.ɵɵFactoryTarget.Component });
CdcReconsentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CdcReconsentComponent, selector: "cx-anonymous-consent-dialog", ngImport: i0, template: "<div\n  class=\"cx-anonymous-consent-dialog\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"dismissDialog('Escape pressed', reconsentEvent.errorMessage)\"\n>\n  <div class=\"cx-dialog-content\">\n    <!-- Modal Header -->\n    <ng-container *ngIf=\"loaded$ | async; else loading\">\n      <div class=\"cx-dialog-header\">\n        <h3>\n          {{ 'reconsent.dialog.title' | cxTranslate }}\n        </h3>\n        <button\n          type=\"button\"\n          class=\"close\"\n          [attr.aria-label]=\"'common.close' | cxTranslate\"\n          (click)=\"dismissDialog('Cross click', reconsentEvent.errorMessage)\"\n        >\n          <span aria-hidden=\"true\">\n            <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n          </span>\n        </button>\n      </div>\n      <div class=\"cx-dialog-description\">\n        {{ 'reconsent.dialog.description' | cxTranslate }}\n        <div\n          class=\"cx-dialog-separator col-sm-12 d-xs-block d-sm-block d-md-none\"\n        ></div>\n      </div>\n      <div class=\"cx-dialog-buttons\"></div>\n      <!-- Modal Body -->\n      <div class=\"cx-dialog-body\" *ngIf=\"templateList$ | async as templateList\">\n        <div\n          class=\"cx-dialog-row col-sm-12 col-md-6\"\n          *ngFor=\"let consentTemplate of templateList\"\n        >\n          <cx-consent-management-form\n            [consentTemplate]=\"consentTemplate\"\n            (consentChanged)=\"onConsentChange($event)\"\n          ></cx-consent-management-form>\n        </div>\n      </div>\n      <!-- Actions -->\n      <div class=\"cx-dialog-buttons\">\n        <a\n          [class.disabled]=\"disableSubmitButton\"\n          (click)=\"\n            dismissDialog('Proceed To Login', reconsentEvent.errorMessage)\n          \"\n          class=\"btn btn-primary\"\n          autofocus\n          >{{ 'common.submit' | cxTranslate }}</a\n        >\n      </div>\n    </ng-container>\n  </div>\n\n  <ng-template #loading>\n    <cx-spinner></cx-spinner>\n  </ng-template>\n</div>\n", dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1$2.SpinnerComponent, selector: "cx-spinner" }, { kind: "component", type: i1$2.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i1$2.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "component", type: i1$2.ConsentManagementFormComponent, selector: "cx-consent-management-form", inputs: ["consentTemplate", "requiredConsents", "consent"], outputs: ["consentChanged"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcReconsentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-anonymous-consent-dialog', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"cx-anonymous-consent-dialog\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"dismissDialog('Escape pressed', reconsentEvent.errorMessage)\"\n>\n  <div class=\"cx-dialog-content\">\n    <!-- Modal Header -->\n    <ng-container *ngIf=\"loaded$ | async; else loading\">\n      <div class=\"cx-dialog-header\">\n        <h3>\n          {{ 'reconsent.dialog.title' | cxTranslate }}\n        </h3>\n        <button\n          type=\"button\"\n          class=\"close\"\n          [attr.aria-label]=\"'common.close' | cxTranslate\"\n          (click)=\"dismissDialog('Cross click', reconsentEvent.errorMessage)\"\n        >\n          <span aria-hidden=\"true\">\n            <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n          </span>\n        </button>\n      </div>\n      <div class=\"cx-dialog-description\">\n        {{ 'reconsent.dialog.description' | cxTranslate }}\n        <div\n          class=\"cx-dialog-separator col-sm-12 d-xs-block d-sm-block d-md-none\"\n        ></div>\n      </div>\n      <div class=\"cx-dialog-buttons\"></div>\n      <!-- Modal Body -->\n      <div class=\"cx-dialog-body\" *ngIf=\"templateList$ | async as templateList\">\n        <div\n          class=\"cx-dialog-row col-sm-12 col-md-6\"\n          *ngFor=\"let consentTemplate of templateList\"\n        >\n          <cx-consent-management-form\n            [consentTemplate]=\"consentTemplate\"\n            (consentChanged)=\"onConsentChange($event)\"\n          ></cx-consent-management-form>\n        </div>\n      </div>\n      <!-- Actions -->\n      <div class=\"cx-dialog-buttons\">\n        <a\n          [class.disabled]=\"disableSubmitButton\"\n          (click)=\"\n            dismissDialog('Proceed To Login', reconsentEvent.errorMessage)\n          \"\n          class=\"btn btn-primary\"\n          autofocus\n          >{{ 'common.submit' | cxTranslate }}</a\n        >\n      </div>\n    </ng-container>\n  </div>\n\n  <ng-template #loading>\n    <cx-spinner></cx-spinner>\n  </ng-template>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1$2.LaunchDialogService }, { type: i1.AnonymousConsentsService }, { type: CdcReconsentComponentService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultCdcReconsentLayoutConfig = {
    launch: {
        CDC_RECONSENT: {
            inlineRoot: true,
            component: CdcReconsentComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcReconsentDialogEventListener {
    constructor(eventService, launchDialogService) {
        this.eventService = eventService;
        this.launchDialogService = launchDialogService;
        this.subscription = new Subscription();
        this.onReconsent();
    }
    onReconsent() {
        this.subscription.add(this.eventService.get(CdcReConsentEvent).subscribe((event) => {
            this.openDialog(event);
        }));
    }
    openDialog(event) {
        const reconsentData = {
            user: event.user,
            password: event.password,
            consentIds: event.consentIds,
            errorMessage: event.errorMessage,
            regToken: event.regToken,
        };
        const dialog = this.launchDialogService.openDialog("CDC_RECONSENT" /* LAUNCH_CALLER.CDC_RECONSENT */, undefined, undefined, reconsentData);
        if (dialog) {
            dialog.pipe(take(1)).subscribe();
        }
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
}
CdcReconsentDialogEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcReconsentDialogEventListener, deps: [{ token: i1.EventService }, { token: i1$2.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcReconsentDialogEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcReconsentDialogEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcReconsentDialogEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }, { type: i1$2.LaunchDialogService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcReconsentModule {
    constructor(_cdcReconsentDialogEventListener) {
        // Intentional empty constructor
    }
}
CdcReconsentModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcReconsentModule, deps: [{ token: CdcReconsentDialogEventListener }], target: i0.ɵɵFactoryTarget.NgModule });
CdcReconsentModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CdcReconsentModule, declarations: [CdcReconsentComponent], imports: [CommonModule,
        SpinnerModule,
        IconModule,
        I18nModule,
        KeyboardFocusModule,
        ConsentManagementModule], exports: [CdcReconsentComponent] });
CdcReconsentModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcReconsentModule, providers: [provideDefaultConfig(defaultCdcReconsentLayoutConfig)], imports: [CommonModule,
        SpinnerModule,
        IconModule,
        I18nModule,
        KeyboardFocusModule,
        ConsentManagementModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcReconsentModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [provideDefaultConfig(defaultCdcReconsentLayoutConfig)],
                    declarations: [CdcReconsentComponent],
                    exports: [CdcReconsentComponent],
                    imports: [
                        CommonModule,
                        SpinnerModule,
                        IconModule,
                        I18nModule,
                        KeyboardFocusModule,
                        ConsentManagementModule,
                    ],
                }]
        }], ctorParameters: function () { return [{ type: CdcReconsentDialogEventListener }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CDCLoginFormModule {
}
CDCLoginFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCLoginFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CDCLoginFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CDCLoginFormModule, imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        FormErrorsModule,
        SpinnerModule,
        CdcReconsentModule] });
CDCLoginFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCLoginFormModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ReturningCustomerLoginComponent: {
                    component: LoginFormComponent,
                    providers: [
                        {
                            provide: LoginFormComponentService,
                            useClass: CdcLoginFormComponentService,
                            deps: [
                                AuthService,
                                GlobalMessageService,
                                WindowRef,
                                CdcJsService,
                            ],
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        FormErrorsModule,
        SpinnerModule,
        CdcReconsentModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCLoginFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        FormErrorsModule,
                        SpinnerModule,
                        CdcReconsentModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ReturningCustomerLoginComponent: {
                                    component: LoginFormComponent,
                                    providers: [
                                        {
                                            provide: LoginFormComponentService,
                                            useClass: CdcLoginFormComponentService,
                                            deps: [
                                                AuthService,
                                                GlobalMessageService,
                                                WindowRef,
                                                CdcJsService,
                                            ],
                                        },
                                    ],
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CDCUserAccountModule {
}
CDCUserAccountModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUserAccountModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CDCUserAccountModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CDCUserAccountModule, imports: [CDCLoginFormModule] });
CDCUserAccountModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUserAccountModule, imports: [CDCLoginFormModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUserAccountModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CDCLoginFormModule],
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

export { CDCLoginFormModule, CDCUserAccountModule, CdcLoginFormComponentService, CdcReconsentComponent, CdcReconsentComponentService, CdcReconsentDialogEventListener, CdcReconsentModule, defaultCdcReconsentLayoutConfig };
//# sourceMappingURL=spartacus-cdc-user-account.mjs.map
