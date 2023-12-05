import * as i0 from '@angular/core';
import { Injectable, Component, ChangeDetectionStrategy, HostBinding, NgModule } from '@angular/core';
import * as i3 from '@angular/forms';
import { UntypedFormGroup, UntypedFormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i1 from '@spartacus/core';
import { GlobalMessageType, UrlModule, I18nModule, provideDefaultConfig, NotAuthGuard, AuthService, GlobalMessageService, WindowRef, AuthGuard } from '@spartacus/core';
import * as i5 from '@spartacus/storefront';
import { CustomFormValidators, FormErrorsModule, SpinnerModule, PasswordVisibilityToggleModule, PageSlotModule } from '@spartacus/storefront';
import { BehaviorSubject, from, of } from 'rxjs';
import { tap, withLatestFrom, switchMap } from 'rxjs/operators';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1$1 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i2$1 from '@spartacus/user/account/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class LoginFormComponentService {
    constructor(auth, globalMessage, winRef) {
        this.auth = auth;
        this.globalMessage = globalMessage;
        this.winRef = winRef;
        this.busy$ = new BehaviorSubject(false);
        this.isUpdating$ = this.busy$.pipe(tap((state) => {
            var _a, _b, _c;
            const userId = (_c = (_b = (_a = this.winRef.nativeWindow) === null || _a === void 0 ? void 0 : _a.history) === null || _b === void 0 ? void 0 : _b.state) === null || _c === void 0 ? void 0 : _c['newUid'];
            if (userId) {
                this.form.patchValue({ userId });
            }
            state === true ? this.form.disable() : this.form.enable();
        }));
        this.form = new UntypedFormGroup({
            userId: new UntypedFormControl('', [
                Validators.required,
                CustomFormValidators.emailValidator,
            ]),
            password: new UntypedFormControl('', Validators.required),
        });
    }
    login() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        from(this.auth.loginWithCredentials(
        // TODO: consider dropping toLowerCase as this should not be part of the UI,
        // as it's too opinionated and doesn't work with other AUTH services
        this.form.value.userId.toLowerCase(), this.form.value.password))
            .pipe(withLatestFrom(this.auth.isUserLoggedIn()), tap(([_, isLoggedIn]) => this.onSuccess(isLoggedIn)))
            .subscribe();
    }
    onSuccess(isLoggedIn) {
        if (isLoggedIn) {
            // We want to remove error messages on successful login (primary the bad
            // username/password combination)
            this.globalMessage.remove(GlobalMessageType.MSG_TYPE_ERROR);
            this.form.reset();
        }
        this.busy$.next(false);
    }
}
LoginFormComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginFormComponentService, deps: [{ token: i1.AuthService }, { token: i1.GlobalMessageService }, { token: i1.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
LoginFormComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginFormComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginFormComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i1.GlobalMessageService }, { type: i1.WindowRef }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class LoginFormComponent {
    constructor(service) {
        this.service = service;
        this.form = this.service.form;
        this.isUpdating$ = this.service.isUpdating$;
        this.style = true;
    }
    onSubmit() {
        this.service.login();
    }
}
LoginFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginFormComponent, deps: [{ token: LoginFormComponentService }], target: i0.ɵɵFactoryTarget.Component });
LoginFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: LoginFormComponent, selector: "cx-login-form", host: { properties: { "class.user-form": "this.style" } }, ngImport: i0, template: "<cx-spinner class=\"overlay\" *ngIf=\"isUpdating$ | async\"></cx-spinner>\n\n<form (ngSubmit)=\"onSubmit()\" [formGroup]=\"form\">\n  <label>\n    <span class=\"label-content\">{{\n      'loginForm.emailAddress.label' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      type=\"email\"\n      class=\"form-control\"\n      formControlName=\"userId\"\n      placeholder=\"{{ 'loginForm.emailAddress.placeholder' | cxTranslate }}\"\n    />\n    <cx-form-errors [control]=\"form.get('userId')\"></cx-form-errors>\n  </label>\n\n  <label>\n    <span class=\"label-content\">{{\n      'loginForm.password.label' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      type=\"password\"\n      class=\"form-control\"\n      placeholder=\"{{ 'loginForm.password.placeholder' | cxTranslate }}\"\n      formControlName=\"password\"\n      [attr.aria-label]=\"'loginForm.password.placeholder' | cxTranslate\"\n      cxPasswordVisibilitySwitch\n    />\n    <cx-form-errors [control]=\"form.get('password')\"></cx-form-errors>\n  </label>\n\n  <a [routerLink]=\"{ cxRoute: 'forgotPassword' } | cxUrl\" class=\"btn-link\">\n    {{ 'loginForm.forgotPassword' | cxTranslate }}\n  </a>\n\n  <button\n    type=\"submit\"\n    class=\"btn btn-block btn-primary\"\n    [disabled]=\"form.disabled\"\n  >\n    {{ 'loginForm.signIn' | cxTranslate }}\n  </button>\n</form>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i1$1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i5.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "component", type: i5.SpinnerComponent, selector: "cx-spinner" }, { kind: "directive", type: i5.PasswordVisibilityToggleDirective, selector: "[cxPasswordVisibilitySwitch][type=\"password\"]" }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-login-form', changeDetection: ChangeDetectionStrategy.OnPush, template: "<cx-spinner class=\"overlay\" *ngIf=\"isUpdating$ | async\"></cx-spinner>\n\n<form (ngSubmit)=\"onSubmit()\" [formGroup]=\"form\">\n  <label>\n    <span class=\"label-content\">{{\n      'loginForm.emailAddress.label' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      type=\"email\"\n      class=\"form-control\"\n      formControlName=\"userId\"\n      placeholder=\"{{ 'loginForm.emailAddress.placeholder' | cxTranslate }}\"\n    />\n    <cx-form-errors [control]=\"form.get('userId')\"></cx-form-errors>\n  </label>\n\n  <label>\n    <span class=\"label-content\">{{\n      'loginForm.password.label' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      type=\"password\"\n      class=\"form-control\"\n      placeholder=\"{{ 'loginForm.password.placeholder' | cxTranslate }}\"\n      formControlName=\"password\"\n      [attr.aria-label]=\"'loginForm.password.placeholder' | cxTranslate\"\n      cxPasswordVisibilitySwitch\n    />\n    <cx-form-errors [control]=\"form.get('password')\"></cx-form-errors>\n  </label>\n\n  <a [routerLink]=\"{ cxRoute: 'forgotPassword' } | cxUrl\" class=\"btn-link\">\n    {{ 'loginForm.forgotPassword' | cxTranslate }}\n  </a>\n\n  <button\n    type=\"submit\"\n    class=\"btn btn-block btn-primary\"\n    [disabled]=\"form.disabled\"\n  >\n    {{ 'loginForm.signIn' | cxTranslate }}\n  </button>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: LoginFormComponentService }]; }, propDecorators: { style: [{
                type: HostBinding,
                args: ['class.user-form']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class LoginFormModule {
}
LoginFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
LoginFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: LoginFormModule, declarations: [LoginFormComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        FormErrorsModule,
        SpinnerModule,
        PasswordVisibilityToggleModule] });
LoginFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginFormModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ReturningCustomerLoginComponent: {
                    component: LoginFormComponent,
                    guards: [NotAuthGuard],
                    providers: [
                        {
                            provide: LoginFormComponentService,
                            useClass: LoginFormComponentService,
                            deps: [AuthService, GlobalMessageService, WindowRef],
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
        PasswordVisibilityToggleModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginFormModule, decorators: [{
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
                        PasswordVisibilityToggleModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ReturningCustomerLoginComponent: {
                                    component: LoginFormComponent,
                                    guards: [NotAuthGuard],
                                    providers: [
                                        {
                                            provide: LoginFormComponentService,
                                            useClass: LoginFormComponentService,
                                            deps: [AuthService, GlobalMessageService, WindowRef],
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [LoginFormComponent],
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
class LoginRegisterComponent {
    constructor(activatedRoute) {
        this.activatedRoute = activatedRoute;
        this.loginAsGuest = false;
    }
    ngOnInit() {
        this.loginAsGuest = this.activatedRoute.snapshot.queryParams['forced'];
    }
}
LoginRegisterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginRegisterComponent, deps: [{ token: i1$1.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
LoginRegisterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: LoginRegisterComponent, selector: "cx-login-register", ngImport: i0, template: "<div class=\"register\">\n  <p class=\"cx-section-title\">\n    {{ 'loginForm.dontHaveAccount' | cxTranslate }}\n  </p>\n\n  <ng-container *ngIf=\"!loginAsGuest\">\n    <a\n      [routerLink]=\"{ cxRoute: 'register' } | cxUrl\"\n      class=\"btn btn-block btn-secondary btn-register\"\n      >{{ 'loginForm.register' | cxTranslate }}</a\n    >\n  </ng-container>\n\n  <ng-container *ngIf=\"loginAsGuest\">\n    <a\n      [routerLink]=\"{ cxRoute: 'checkoutLogin' } | cxUrl\"\n      class=\"btn btn-block btn-secondary btn-guest\"\n      >{{ 'loginForm.guestCheckout' | cxTranslate }}</a\n    >\n  </ng-container>\n</div>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i1.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginRegisterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-login-register', template: "<div class=\"register\">\n  <p class=\"cx-section-title\">\n    {{ 'loginForm.dontHaveAccount' | cxTranslate }}\n  </p>\n\n  <ng-container *ngIf=\"!loginAsGuest\">\n    <a\n      [routerLink]=\"{ cxRoute: 'register' } | cxUrl\"\n      class=\"btn btn-block btn-secondary btn-register\"\n      >{{ 'loginForm.register' | cxTranslate }}</a\n    >\n  </ng-container>\n\n  <ng-container *ngIf=\"loginAsGuest\">\n    <a\n      [routerLink]=\"{ cxRoute: 'checkoutLogin' } | cxUrl\"\n      class=\"btn btn-block btn-secondary btn-guest\"\n      >{{ 'loginForm.guestCheckout' | cxTranslate }}</a\n    >\n  </ng-container>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.ActivatedRoute }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class LoginRegisterModule {
}
LoginRegisterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginRegisterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
LoginRegisterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: LoginRegisterModule, declarations: [LoginRegisterComponent], imports: [CommonModule, RouterModule, UrlModule, PageSlotModule, I18nModule] });
LoginRegisterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginRegisterModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ReturningCustomerRegisterComponent: {
                    component: LoginRegisterComponent,
                    guards: [NotAuthGuard],
                },
            },
        }),
    ], imports: [CommonModule, RouterModule, UrlModule, PageSlotModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginRegisterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, UrlModule, PageSlotModule, I18nModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ReturningCustomerRegisterComponent: {
                                    component: LoginRegisterComponent,
                                    guards: [NotAuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [LoginRegisterComponent],
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
class LoginComponent {
    constructor(auth, userAccount) {
        this.auth = auth;
        this.userAccount = userAccount;
    }
    ngOnInit() {
        this.user$ = this.auth.isUserLoggedIn().pipe(switchMap((isUserLoggedIn) => {
            if (isUserLoggedIn) {
                return this.userAccount.get();
            }
            else {
                return of(undefined);
            }
        }));
    }
}
LoginComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginComponent, deps: [{ token: i1.AuthService }, { token: i2$1.UserAccountFacade }], target: i0.ɵɵFactoryTarget.Component });
LoginComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: LoginComponent, selector: "cx-login", ngImport: i0, template: "<ng-container *ngIf=\"user$ | async as user; else login\">\n  <div class=\"cx-login-greet\">\n    {{ 'miniLogin.userGreeting' | cxTranslate: { name: user.name } }}\n  </div>\n  <cx-page-slot id=\"account-nav\" position=\"HeaderLinks\"></cx-page-slot>\n</ng-container>\n\n<ng-template #login>\n  <a role=\"link\" [routerLink]=\"{ cxRoute: 'login' } | cxUrl\">{{\n    'miniLogin.signInRegister' | cxTranslate\n  }}</a>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i5.PageSlotComponent, selector: "cx-page-slot,[cx-page-slot]", inputs: ["position", "class", "isPageFold", "hasComponents"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-login', template: "<ng-container *ngIf=\"user$ | async as user; else login\">\n  <div class=\"cx-login-greet\">\n    {{ 'miniLogin.userGreeting' | cxTranslate: { name: user.name } }}\n  </div>\n  <cx-page-slot id=\"account-nav\" position=\"HeaderLinks\"></cx-page-slot>\n</ng-container>\n\n<ng-template #login>\n  <a role=\"link\" [routerLink]=\"{ cxRoute: 'login' } | cxUrl\">{{\n    'miniLogin.signInRegister' | cxTranslate\n  }}</a>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i2$1.UserAccountFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class LoginModule {
}
LoginModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
LoginModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: LoginModule, declarations: [LoginComponent], imports: [CommonModule, RouterModule, UrlModule, PageSlotModule, I18nModule] });
LoginModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                LoginComponent: {
                    component: LoginComponent,
                },
            },
        }),
    ], imports: [CommonModule, RouterModule, UrlModule, PageSlotModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, UrlModule, PageSlotModule, I18nModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                LoginComponent: {
                                    component: LoginComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [LoginComponent],
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
class MyAccountV2UserComponent extends LoginComponent {
}
MyAccountV2UserComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2UserComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
MyAccountV2UserComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: MyAccountV2UserComponent, selector: "cx-my-account-v2-user", usesInheritance: true, ngImport: i0, template: "<div class=\"cx-my-account-v2-user\">\n  <ng-container *ngIf=\"user$ | async as user\">\n    <div class=\"cx-name\">{{ user.title }}{{ user.name }}</div>\n    <a\n      class=\"cx-sign-out\"\n      [routerLink]=\"\n        {\n          cxRoute: 'logout'\n        } | cxUrl\n      \"\n      >{{ 'myAccountV2User.signOut' | cxTranslate }}\n    </a>\n  </ng-container>\n</div>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2UserComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-my-account-v2-user', template: "<div class=\"cx-my-account-v2-user\">\n  <ng-container *ngIf=\"user$ | async as user\">\n    <div class=\"cx-name\">{{ user.title }}{{ user.name }}</div>\n    <a\n      class=\"cx-sign-out\"\n      [routerLink]=\"\n        {\n          cxRoute: 'logout'\n        } | cxUrl\n      \"\n      >{{ 'myAccountV2User.signOut' | cxTranslate }}\n    </a>\n  </ng-container>\n</div>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MyAccountV2UserModule {
}
MyAccountV2UserModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2UserModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MyAccountV2UserModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2UserModule, declarations: [MyAccountV2UserComponent], imports: [CommonModule, RouterModule, UrlModule, I18nModule], exports: [MyAccountV2UserComponent] });
MyAccountV2UserModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2UserModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                MyAccountViewUserComponent: {
                    component: MyAccountV2UserComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule, RouterModule, UrlModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2UserModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                MyAccountViewUserComponent: {
                                    component: MyAccountV2UserComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [MyAccountV2UserComponent],
                    exports: [MyAccountV2UserComponent],
                    imports: [CommonModule, RouterModule, UrlModule, I18nModule],
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
class UserAccountComponentsModule {
}
UserAccountComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserAccountComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserAccountComponentsModule, imports: [LoginModule,
        LoginFormModule,
        LoginRegisterModule,
        MyAccountV2UserModule] });
UserAccountComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountComponentsModule, imports: [LoginModule,
        LoginFormModule,
        LoginRegisterModule,
        MyAccountV2UserModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        LoginModule,
                        LoginFormModule,
                        LoginRegisterModule,
                        MyAccountV2UserModule,
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

export { LoginComponent, LoginFormComponent, LoginFormComponentService, LoginFormModule, LoginModule, LoginRegisterComponent, LoginRegisterModule, MyAccountV2UserComponent, MyAccountV2UserModule, UserAccountComponentsModule };
//# sourceMappingURL=spartacus-user-account-components.mjs.map
