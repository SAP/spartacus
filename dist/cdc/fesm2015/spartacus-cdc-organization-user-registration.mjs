import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import * as i2 from '@spartacus/cdc/root';
import { CdcLoadUserTokenFailEvent } from '@spartacus/cdc/root';
import * as i1 from '@spartacus/core';
import { GlobalMessageType, UrlModule, I18nModule } from '@spartacus/core';
import { UserRegistrationFormService } from '@spartacus/organization/user-registration/components';
import { throwError } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import * as i3 from '@spartacus/user/profile/root';
import * as i4 from '@spartacus/organization/user-registration/root';
import * as i5 from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpinnerModule, FormErrorsModule, NgSelectA11yModule } from '@spartacus/storefront';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CDCB2BRegisterComponentService extends UserRegistrationFormService {
    constructor(command, cdcJSService, authService, eventService, userRegisterFacade, userAddressService, organizationUserRegistrationFacade, translationService, globalMessageService, authConfigService, routingService, formBuilder) {
        super(userRegisterFacade, userAddressService, organizationUserRegistrationFacade, translationService, globalMessageService, authConfigService, routingService, formBuilder);
        this.command = command;
        this.cdcJSService = cdcJSService;
        this.authService = authService;
        this.eventService = eventService;
        this.userRegisterFacade = userRegisterFacade;
        this.userAddressService = userAddressService;
        this.organizationUserRegistrationFacade = organizationUserRegistrationFacade;
        this.translationService = translationService;
        this.globalMessageService = globalMessageService;
        this.authConfigService = authConfigService;
        this.routingService = routingService;
        this.formBuilder = formBuilder;
        this.registerCommand = this.command.create(({ orgInfo }) => 
        // Registering user through CDC Gigya SDK
        this.cdcJSService.registerOrganisationWithoutScreenSet(orgInfo));
        this.loadUserTokenFailed$ = this.eventService
            .get(CdcLoadUserTokenFailEvent)
            .pipe(map((event) => !!event), tap((failed) => {
            if (failed) {
                throw new Error(`User token failed to load.`);
            }
        }));
    }
    /**
     * Register a new user using CDC SDK.
     *
     * @param form as FormGroup
     */
    registerUser(form) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        if (!((_a = form.get('firstName')) === null || _a === void 0 ? void 0 : _a.value) ||
            !((_b = form.get('lastName')) === null || _b === void 0 ? void 0 : _b.value) ||
            !((_c = form.get('email')) === null || _c === void 0 ? void 0 : _c.value) ||
            !((_d = form.get('companyName')) === null || _d === void 0 ? void 0 : _d.value)) {
            return throwError(`The provided user is not valid: ${form.value}`);
        }
        const orgInfo = {
            firstName: (_e = form.get('firstName')) === null || _e === void 0 ? void 0 : _e.value,
            lastName: (_f = form.get('lastName')) === null || _f === void 0 ? void 0 : _f.value,
            email: (_g = form.get('email')) === null || _g === void 0 ? void 0 : _g.value,
            companyName: (_h = form.get('companyName')) === null || _h === void 0 ? void 0 : _h.value,
            addressLine1: (_j = form.get('line1')) === null || _j === void 0 ? void 0 : _j.value,
            addressLine2: (_k = form.get('line2')) === null || _k === void 0 ? void 0 : _k.value,
            postalCode: (_l = form.get('postalCode')) === null || _l === void 0 ? void 0 : _l.value,
            town: (_m = form.get('town')) === null || _m === void 0 ? void 0 : _m.value,
            region: (_p = (_o = form.get('region')) === null || _o === void 0 ? void 0 : _o.get('isocode')) === null || _p === void 0 ? void 0 : _p.value,
            country: (_r = (_q = form.get('country')) === null || _q === void 0 ? void 0 : _q.get('isocode')) === null || _r === void 0 ? void 0 : _r.value,
            phoneNumber: (_s = form.get('phoneNumber')) === null || _s === void 0 ? void 0 : _s.value,
            message: (_t = form.get('message')) === null || _t === void 0 ? void 0 : _t.value,
        };
        return this.cdcJSService.didLoad().pipe(tap((cdcLoaded) => {
            if (!cdcLoaded) {
                this.globalMessageService.add({
                    key: 'errorHandlers.scriptFailedToLoad',
                }, GlobalMessageType.MSG_TYPE_ERROR);
                throw new Error(`CDC script didn't load.`);
            }
        }), switchMap(() => 
        // Logging in using CDC Gigya SDK, update the registerCommand
        this.registerCommand.execute({ orgInfo })), tap(() => {
            this.displayGlobalMessage();
            this.redirectToLogin();
            form.reset();
        }));
    }
    // @override
    postRegisterMessage() {
        // don't show the message
    }
}
CDCB2BRegisterComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCB2BRegisterComponentService, deps: [{ token: i1.CommandService }, { token: i2.CdcJsService }, { token: i1.AuthService }, { token: i1.EventService }, { token: i3.UserRegisterFacade }, { token: i1.UserAddressService }, { token: i4.UserRegistrationFacade }, { token: i1.TranslationService }, { token: i1.GlobalMessageService }, { token: i1.AuthConfigService }, { token: i1.RoutingService }, { token: i5.FormBuilder }], target: i0.ɵɵFactoryTarget.Injectable });
CDCB2BRegisterComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCB2BRegisterComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCB2BRegisterComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CommandService }, { type: i2.CdcJsService }, { type: i1.AuthService }, { type: i1.EventService }, { type: i3.UserRegisterFacade }, { type: i1.UserAddressService }, { type: i4.UserRegistrationFacade }, { type: i1.TranslationService }, { type: i1.GlobalMessageService }, { type: i1.AuthConfigService }, { type: i1.RoutingService }, { type: i5.FormBuilder }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CDCB2BRegisterModule {
}
CDCB2BRegisterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCB2BRegisterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CDCB2BRegisterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CDCB2BRegisterModule, imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        SpinnerModule,
        FormErrorsModule,
        NgSelectModule,
        NgSelectA11yModule] });
CDCB2BRegisterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCB2BRegisterModule, providers: [
        {
            provide: UserRegistrationFormService,
            useClass: CDCB2BRegisterComponentService,
        },
    ], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        SpinnerModule,
        FormErrorsModule,
        NgSelectModule,
        NgSelectA11yModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCB2BRegisterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        SpinnerModule,
                        FormErrorsModule,
                        NgSelectModule,
                        NgSelectA11yModule,
                    ],
                    providers: [
                        {
                            provide: UserRegistrationFormService,
                            useClass: CDCB2BRegisterComponentService,
                        },
                    ],
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

export { CDCB2BRegisterComponentService, CDCB2BRegisterModule };
//# sourceMappingURL=spartacus-cdc-organization-user-registration.mjs.map
