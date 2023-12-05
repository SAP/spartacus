import * as i2$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, HostListener, ViewChild, NgModule, Injectable } from '@angular/core';
import * as i5 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i2 from '@spartacus/core';
import { GlobalMessageType, UrlModule, I18nModule, provideDefaultConfig, AuthGuard, OAuthFlow, NotAuthGuard, RoutingService, AuthConfigService, GlobalMessageService, HttpErrorModel, AuthService, AuthRedirectService } from '@spartacus/core';
import * as i4 from '@spartacus/storefront';
import { ICON_TYPE, DIALOG_TYPE, IconModule, SpinnerModule, KeyboardFocusModule, CustomFormValidators, FormErrorsModule, sortTitles, NgSelectA11yModule, PasswordVisibilityToggleModule } from '@spartacus/storefront';
import { BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { first, take, tap, map, filter, switchMap } from 'rxjs/operators';
import * as i1 from '@spartacus/user/profile/root';
import { UserPasswordFacade, UserRegisterFacade, UserEmailFacade, UserProfileFacade } from '@spartacus/user/profile/root';
import * as i3 from '@angular/forms';
import { UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule, UntypedFormBuilder, FormsModule } from '@angular/forms';
import * as i6 from '@ng-select/ng-select';
import { NgSelectModule } from '@ng-select/ng-select';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CloseAccountModalComponent {
    handleClick(event) {
        if (event.target.tagName === this.el.nativeElement.tagName) {
            this.dismissModal('Cross click');
        }
    }
    constructor(authService, globalMessageService, routingService, translationService, userProfile, launchDialogService, el) {
        this.authService = authService;
        this.globalMessageService = globalMessageService;
        this.routingService = routingService;
        this.translationService = translationService;
        this.userProfile = userProfile;
        this.launchDialogService = launchDialogService;
        this.el = el;
        this.iconTypes = ICON_TYPE;
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: 'button',
            focusOnEscape: true,
        };
        this.loading$ = new BehaviorSubject(false);
    }
    get isLoading$() {
        return this.loading$.asObservable();
    }
    ngOnInit() {
        this.isLoggedIn$ = this.authService.isUserLoggedIn();
    }
    onSuccess() {
        this.dismissModal('Success');
        this.translationService
            .translate('closeAccount.accountClosedSuccessfully')
            .pipe(first())
            .subscribe((text) => {
            this.globalMessageService.add(text, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        });
        this.authService.coreLogout().then(() => {
            this.routingService.go({ cxRoute: 'home' });
        });
    }
    onError() {
        this.dismissModal('Error');
        this.translationService
            .translate('closeAccount.accountClosedFailure')
            .pipe(first())
            .subscribe((text) => {
            this.globalMessageService.add(text, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    dismissModal(reason) {
        this.launchDialogService.closeDialog(reason);
    }
    closeAccount() {
        this.loading$.next(true);
        this.userProfile.close().subscribe({
            next: () => {
                this.onSuccess();
                this.loading$.next(false);
            },
            error: () => {
                this.onError();
                this.loading$.next(false);
            },
        });
    }
}
CloseAccountModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CloseAccountModalComponent, deps: [{ token: i2.AuthService }, { token: i2.GlobalMessageService }, { token: i2.RoutingService }, { token: i2.TranslationService }, { token: i1.UserProfileFacade }, { token: i4.LaunchDialogService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
CloseAccountModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CloseAccountModalComponent, selector: "cx-close-account-modal", host: { listeners: { "click": "handleClick($event)" } }, ngImport: i0, template: "<ng-container *ngIf=\"isLoggedIn$ | async\">\n  <div\n    class=\"cx-close-account-modal\"\n    [cxFocus]=\"focusConfig\"\n    (esc)=\"dismissModal('Escape click')\"\n  >\n    <div class=\"cx-close-account-modal-container\">\n      <div class=\"cx-close-account-modal-header cx-modal-header\">\n        <h3 class=\"cx-close-account-modal-title\">\n          {{ 'closeAccount.confirmAccountClosure' | cxTranslate }}\n        </h3>\n        <button\n          type=\"button\"\n          class=\"close\"\n          [attr.aria-label]=\"'common.close' | cxTranslate\"\n          (click)=\"dismissModal('Cross click')\"\n        >\n          <span aria-hidden=\"true\">\n            <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n          </span>\n        </button>\n      </div>\n\n      <div *ngIf=\"isLoading$ | async; else loaded\">\n        <div class=\"cx-spinner\">\n          <cx-spinner> </cx-spinner>\n        </div>\n      </div>\n\n      <ng-template #loaded>\n        <div class=\"cx-close-account-modal-body modal-body\">\n          <p class=\"cx-confirmation\">\n            {{ 'closeAccount.confirmAccountClosureMessage' | cxTranslate }}\n          </p>\n        </div>\n        <div class=\"cx-close-account-modal-footer cx-modal-footer\">\n          <button class=\"btn btn-primary\" (click)=\"closeAccount()\">\n            {{ 'closeAccount.closeMyAccount' | cxTranslate }}\n          </button>\n          <button\n            (click)=\"dismissModal('Cancel')\"\n            class=\"btn btn-block btn-secondary\"\n          >\n            {{ 'common.cancel' | cxTranslate }}\n          </button>\n        </div>\n      </ng-template>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i4.SpinnerComponent, selector: "cx-spinner" }, { kind: "directive", type: i4.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CloseAccountModalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-close-account-modal', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"isLoggedIn$ | async\">\n  <div\n    class=\"cx-close-account-modal\"\n    [cxFocus]=\"focusConfig\"\n    (esc)=\"dismissModal('Escape click')\"\n  >\n    <div class=\"cx-close-account-modal-container\">\n      <div class=\"cx-close-account-modal-header cx-modal-header\">\n        <h3 class=\"cx-close-account-modal-title\">\n          {{ 'closeAccount.confirmAccountClosure' | cxTranslate }}\n        </h3>\n        <button\n          type=\"button\"\n          class=\"close\"\n          [attr.aria-label]=\"'common.close' | cxTranslate\"\n          (click)=\"dismissModal('Cross click')\"\n        >\n          <span aria-hidden=\"true\">\n            <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n          </span>\n        </button>\n      </div>\n\n      <div *ngIf=\"isLoading$ | async; else loaded\">\n        <div class=\"cx-spinner\">\n          <cx-spinner> </cx-spinner>\n        </div>\n      </div>\n\n      <ng-template #loaded>\n        <div class=\"cx-close-account-modal-body modal-body\">\n          <p class=\"cx-confirmation\">\n            {{ 'closeAccount.confirmAccountClosureMessage' | cxTranslate }}\n          </p>\n        </div>\n        <div class=\"cx-close-account-modal-footer cx-modal-footer\">\n          <button class=\"btn btn-primary\" (click)=\"closeAccount()\">\n            {{ 'closeAccount.closeMyAccount' | cxTranslate }}\n          </button>\n          <button\n            (click)=\"dismissModal('Cancel')\"\n            class=\"btn btn-block btn-secondary\"\n          >\n            {{ 'common.cancel' | cxTranslate }}\n          </button>\n        </div>\n      </ng-template>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i2.AuthService }, { type: i2.GlobalMessageService }, { type: i2.RoutingService }, { type: i2.TranslationService }, { type: i1.UserProfileFacade }, { type: i4.LaunchDialogService }, { type: i0.ElementRef }]; }, propDecorators: { handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultCloseDialogModalLayoutConfig = {
    launch: {
        CLOSE_ACCOUNT: {
            inline: true,
            component: CloseAccountModalComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CloseAccountComponent {
    constructor(launchDialogService, vcr) {
        this.launchDialogService = launchDialogService;
        this.vcr = vcr;
    }
    openModal() {
        const dialog = this.launchDialogService.openDialog("CLOSE_ACCOUNT" /* LAUNCH_CALLER.CLOSE_ACCOUNT */, this.element, this.vcr);
        dialog?.pipe(take(1)).subscribe();
    }
}
CloseAccountComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CloseAccountComponent, deps: [{ token: i4.LaunchDialogService }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
CloseAccountComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CloseAccountComponent, selector: "cx-close-account", viewQueries: [{ propertyName: "element", first: true, predicate: ["element"], descendants: true }], ngImport: i0, template: "<div class=\"col-lg-8 col-md-9\">\n  <div class=\"row cx-btn-group\">\n    <div class=\"col-sm-6\">\n      <a\n        [routerLink]=\"{ cxRoute: 'home' } | cxUrl\"\n        class=\"btn btn-block btn-secondary\"\n        >{{ 'common.cancel' | cxTranslate }}</a\n      >\n    </div>\n    <div class=\"col-sm-6\">\n      <button #element class=\"btn btn-block btn-primary\" (click)=\"openModal()\">\n        {{ 'closeAccount.closeMyAccount' | cxTranslate }}\n      </button>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i5.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CloseAccountComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-close-account', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"col-lg-8 col-md-9\">\n  <div class=\"row cx-btn-group\">\n    <div class=\"col-sm-6\">\n      <a\n        [routerLink]=\"{ cxRoute: 'home' } | cxUrl\"\n        class=\"btn btn-block btn-secondary\"\n        >{{ 'common.cancel' | cxTranslate }}</a\n      >\n    </div>\n    <div class=\"col-sm-6\">\n      <button #element class=\"btn btn-block btn-primary\" (click)=\"openModal()\">\n        {{ 'closeAccount.closeMyAccount' | cxTranslate }}\n      </button>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i4.LaunchDialogService }, { type: i0.ViewContainerRef }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['element']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CloseAccountModule {
}
CloseAccountModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CloseAccountModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CloseAccountModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CloseAccountModule, declarations: [CloseAccountComponent, CloseAccountModalComponent], imports: [CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        IconModule,
        SpinnerModule,
        KeyboardFocusModule] });
CloseAccountModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CloseAccountModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CloseAccountComponent: {
                    component: CloseAccountComponent,
                    guards: [AuthGuard],
                },
            },
        }),
        provideDefaultConfig(defaultCloseDialogModalLayoutConfig),
    ], imports: [CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        IconModule,
        SpinnerModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CloseAccountModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        IconModule,
                        SpinnerModule,
                        KeyboardFocusModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CloseAccountComponent: {
                                    component: CloseAccountComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                        provideDefaultConfig(defaultCloseDialogModalLayoutConfig),
                    ],
                    declarations: [CloseAccountComponent, CloseAccountModalComponent],
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
class ForgotPasswordComponentService {
    constructor(userPasswordService, routingService, authConfigService, globalMessage) {
        this.userPasswordService = userPasswordService;
        this.routingService = routingService;
        this.authConfigService = authConfigService;
        this.globalMessage = globalMessage;
        this.busy$ = new BehaviorSubject(false);
        this.isUpdating$ = this.busy$.pipe(tap((state) => (state === true ? this.form.disable() : this.form.enable())));
        this.form = new UntypedFormGroup({
            userEmail: new UntypedFormControl('', [
                Validators.required,
                CustomFormValidators.emailValidator,
            ]),
        });
    }
    /**
     * Sends an email to the user to reset the password.
     *
     * When the `ResourceOwnerPasswordFlow` is used, the user is routed
     * to the login page.
     */
    requestEmail() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        this.userPasswordService
            .requestForgotPasswordEmail(this.form.value.userEmail)
            .subscribe({
            next: () => this.onSuccess(),
            error: (error) => this.onError(error),
        });
    }
    onSuccess() {
        this.globalMessage.add({ key: 'forgottenPassword.passwordResetEmailSent' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        this.busy$.next(false);
        this.form.reset();
        this.redirect();
    }
    onError(_error) {
        this.busy$.next(false);
    }
    /**
     * Redirects the user back to the login page.
     *
     * This only happens in case of the `ResourceOwnerPasswordFlow` OAuth flow.
     */
    redirect() {
        if (this.authConfigService.getOAuthFlow() ===
            OAuthFlow.ResourceOwnerPasswordFlow) {
            this.routingService.go({ cxRoute: 'login' });
        }
    }
}
ForgotPasswordComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ForgotPasswordComponentService, deps: [{ token: i1.UserPasswordFacade }, { token: i2.RoutingService }, { token: i2.AuthConfigService }, { token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
ForgotPasswordComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ForgotPasswordComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ForgotPasswordComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserPasswordFacade }, { type: i2.RoutingService }, { type: i2.AuthConfigService }, { type: i2.GlobalMessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ForgotPasswordComponent {
    constructor(service) {
        this.service = service;
        this.form = this.service.form;
        this.isUpdating$ = this.service.isUpdating$;
    }
    onSubmit() {
        this.service.requestEmail();
    }
}
ForgotPasswordComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ForgotPasswordComponent, deps: [{ token: ForgotPasswordComponentService }], target: i0.ɵɵFactoryTarget.Component });
ForgotPasswordComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ForgotPasswordComponent, selector: "cx-forgot-password", ngImport: i0, template: "<cx-spinner class=\"overlay\" *ngIf=\"isUpdating$ | async\"> </cx-spinner>\n\n<form (ngSubmit)=\"onSubmit()\" [formGroup]=\"form\">\n  <label>\n    <span class=\"label-content\">{{\n      'forgottenPassword.emailAddress.label' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      type=\"email\"\n      class=\"form-control\"\n      placeholder=\"{{\n        'forgottenPassword.emailAddress.placeholder' | cxTranslate\n      }}\"\n      formControlName=\"userEmail\"\n    />\n    <cx-form-errors [control]=\"form.get('userEmail')\"></cx-form-errors>\n  </label>\n\n  <a\n    class=\"btn btn-block btn-secondary\"\n    [routerLink]=\"{ cxRoute: 'login' } | cxUrl\"\n    >{{ 'common.cancel' | cxTranslate }}</a\n  >\n  <button class=\"btn btn-block btn-primary\" [disabled]=\"form.disabled\">\n    {{ 'common.submit' | cxTranslate }}\n  </button>\n</form>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i5.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i4.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "component", type: i4.SpinnerComponent, selector: "cx-spinner" }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ForgotPasswordComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-forgot-password', changeDetection: ChangeDetectionStrategy.OnPush, template: "<cx-spinner class=\"overlay\" *ngIf=\"isUpdating$ | async\"> </cx-spinner>\n\n<form (ngSubmit)=\"onSubmit()\" [formGroup]=\"form\">\n  <label>\n    <span class=\"label-content\">{{\n      'forgottenPassword.emailAddress.label' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      type=\"email\"\n      class=\"form-control\"\n      placeholder=\"{{\n        'forgottenPassword.emailAddress.placeholder' | cxTranslate\n      }}\"\n      formControlName=\"userEmail\"\n    />\n    <cx-form-errors [control]=\"form.get('userEmail')\"></cx-form-errors>\n  </label>\n\n  <a\n    class=\"btn btn-block btn-secondary\"\n    [routerLink]=\"{ cxRoute: 'login' } | cxUrl\"\n    >{{ 'common.cancel' | cxTranslate }}</a\n  >\n  <button class=\"btn btn-block btn-primary\" [disabled]=\"form.disabled\">\n    {{ 'common.submit' | cxTranslate }}\n  </button>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: ForgotPasswordComponentService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ForgotPasswordModule {
}
ForgotPasswordModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ForgotPasswordModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ForgotPasswordModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ForgotPasswordModule, declarations: [ForgotPasswordComponent], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        FormErrorsModule,
        SpinnerModule] });
ForgotPasswordModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ForgotPasswordModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ForgotPasswordComponent: {
                    component: ForgotPasswordComponent,
                    guards: [NotAuthGuard],
                    providers: [
                        {
                            provide: ForgotPasswordComponentService,
                            useClass: ForgotPasswordComponentService,
                            deps: [
                                UserPasswordFacade,
                                RoutingService,
                                AuthConfigService,
                                GlobalMessageService,
                            ],
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        FormErrorsModule,
        SpinnerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ForgotPasswordModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        FormErrorsModule,
                        SpinnerModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ForgotPasswordComponent: {
                                    component: ForgotPasswordComponent,
                                    guards: [NotAuthGuard],
                                    providers: [
                                        {
                                            provide: ForgotPasswordComponentService,
                                            useClass: ForgotPasswordComponentService,
                                            deps: [
                                                UserPasswordFacade,
                                                RoutingService,
                                                AuthConfigService,
                                                GlobalMessageService,
                                            ],
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [ForgotPasswordComponent],
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
class RegisterComponentService {
    constructor(userRegisterFacade, globalMessageService, fb) {
        this.userRegisterFacade = userRegisterFacade;
        this.globalMessageService = globalMessageService;
        this.fb = fb;
    }
    /**
     * Register a new user.
     *
     * @param user as UserSignUp
     */
    register(user) {
        return this.userRegisterFacade.register(user);
    }
    /**
     * Returns titles that can be used for the user profiles.
     */
    getTitles() {
        return this.userRegisterFacade.getTitles();
    }
    /**
     * Show the message after successful registration.
     */
    postRegisterMessage() {
        this.globalMessageService.add({ key: 'register.postRegisterMessage' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
    }
    /**
     * Get if any additional consents needs to be provided during registration
     * In core feature, no additional consents are necessary during registration.
     * In integration scenarios, eg: cdc, this method will be overridden to return
     * necessary cdc consents
     */
    getAdditionalConsents() {
        return [];
    }
    /**
     * Generate form control if any additional consents that needs to be provided during registration
     * In core feature, no additional consents are necessary during registration.
     * In integration scenarios, eg: cdc, this method will be overridden to return
     * form controls for necessary cdc consents
     */
    generateAdditionalConsentsFormControl() {
        return this.fb?.array([]) ?? undefined;
    }
}
RegisterComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RegisterComponentService, deps: [{ token: i1.UserRegisterFacade }, { token: i2.GlobalMessageService }, { token: i3.UntypedFormBuilder }], target: i0.ɵɵFactoryTarget.Injectable });
RegisterComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RegisterComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RegisterComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserRegisterFacade }, { type: i2.GlobalMessageService }, { type: i3.UntypedFormBuilder }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class RegisterComponent {
    get additionalConsents() {
        return this.registerForm?.get('additionalConsents');
    }
    updateAdditionalConsents(event, index) {
        const { checked } = event.target;
        this.registerForm.value.additionalConsents[index] = checked;
    }
    constructor(globalMessageService, fb, router, anonymousConsentsService, anonymousConsentsConfig, authConfigService, registerComponentService) {
        this.globalMessageService = globalMessageService;
        this.fb = fb;
        this.router = router;
        this.anonymousConsentsService = anonymousConsentsService;
        this.anonymousConsentsConfig = anonymousConsentsConfig;
        this.authConfigService = authConfigService;
        this.registerComponentService = registerComponentService;
        this.isLoading$ = new BehaviorSubject(false);
        this.subscription = new Subscription();
        this.registerForm = this.fb.group({
            titleCode: [null],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, CustomFormValidators.emailValidator]],
            password: [
                '',
                [Validators.required, CustomFormValidators.passwordValidator],
            ],
            passwordconf: ['', Validators.required],
            newsletter: new UntypedFormControl({
                value: false,
                disabled: this.isConsentRequired(),
            }),
            additionalConsents: this.registerComponentService.generateAdditionalConsentsFormControl?.() ??
                this.fb.array([]),
            termsandconditions: [false, Validators.requiredTrue],
        }, {
            validators: CustomFormValidators.passwordsMustMatch('password', 'passwordconf'),
        });
    }
    ngOnInit() {
        this.titles$ = this.registerComponentService.getTitles().pipe(map((titles) => {
            return titles.sort(sortTitles);
        }));
        // TODO: Workaround: allow server for decide is titleCode mandatory (if yes, provide personalized message)
        this.subscription.add(this.globalMessageService
            .get()
            .pipe(filter((messages) => !!Object.keys(messages).length))
            .subscribe((globalMessageEntities) => {
            const messages = globalMessageEntities &&
                globalMessageEntities[GlobalMessageType.MSG_TYPE_ERROR];
            if (messages &&
                messages.some((message) => message.raw === 'This field is required.')) {
                this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
                this.globalMessageService.add({ key: 'register.titleRequired' }, GlobalMessageType.MSG_TYPE_ERROR);
            }
        }));
        const registerConsent = this.anonymousConsentsConfig?.anonymousConsents?.registerConsent ?? '';
        this.anonymousConsent$ = combineLatest([
            this.anonymousConsentsService.getConsent(registerConsent),
            this.anonymousConsentsService.getTemplate(registerConsent),
        ]).pipe(map(([consent, template]) => {
            return {
                consent,
                template: template?.description ? template.description : '',
            };
        }));
        this.additionalRegistrationConsents =
            this.registerComponentService?.getAdditionalConsents() || [];
        this.subscription.add(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.registerForm.get('newsletter').valueChanges.subscribe(() => {
            this.toggleAnonymousConsent();
        }));
    }
    submitForm() {
        if (this.registerForm.valid) {
            this.registerUser();
        }
        else {
            this.registerForm.markAllAsTouched();
        }
    }
    registerUser() {
        this.isLoading$.next(true);
        this.registerComponentService
            .register(this.collectDataFromRegisterForm(this.registerForm.value))
            .subscribe({
            next: () => this.onRegisterUserSuccess(),
            complete: () => this.isLoading$.next(false),
            error: () => this.isLoading$.next(false),
        });
    }
    titleSelected(title) {
        this.registerForm['controls'].titleCode.setValue(title.code);
    }
    collectDataFromRegisterForm(formData) {
        const { firstName, lastName, email, password, titleCode } = formData;
        return {
            firstName,
            lastName,
            uid: email.toLowerCase(),
            password,
            titleCode,
        };
    }
    isConsentGiven(consent) {
        return this.anonymousConsentsService.isConsentGiven(consent);
    }
    isConsentRequired() {
        const requiredConsents = this.anonymousConsentsConfig?.anonymousConsents?.requiredConsents;
        const registerConsent = this.anonymousConsentsConfig?.anonymousConsents?.registerConsent;
        if (requiredConsents && registerConsent) {
            return requiredConsents.includes(registerConsent);
        }
        return false;
    }
    onRegisterUserSuccess() {
        if (this.authConfigService.getOAuthFlow() ===
            OAuthFlow.ResourceOwnerPasswordFlow) {
            this.router.go('login');
        }
        this.registerComponentService.postRegisterMessage();
    }
    toggleAnonymousConsent() {
        const registerConsent = this.anonymousConsentsConfig?.anonymousConsents?.registerConsent;
        if (registerConsent) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            if (Boolean(this.registerForm.get('newsletter').value)) {
                this.anonymousConsentsService.giveConsent(registerConsent);
            }
            else {
                this.anonymousConsentsService.withdrawConsent(registerConsent);
            }
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
RegisterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RegisterComponent, deps: [{ token: i2.GlobalMessageService }, { token: i3.UntypedFormBuilder }, { token: i2.RoutingService }, { token: i2.AnonymousConsentsService }, { token: i2.AnonymousConsentsConfig }, { token: i2.AuthConfigService }, { token: RegisterComponentService }], target: i0.ɵɵFactoryTarget.Component });
RegisterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: RegisterComponent, selector: "cx-register", ngImport: i0, template: "<section\n  class=\"cx-page-section container\"\n  *ngIf=\"!(isLoading$ | async); else loading\"\n>\n  <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n  <div class=\"row justify-content-center\">\n    <div class=\"col-md-6\">\n      <div class=\"cx-section\">\n        <form (ngSubmit)=\"submitForm()\" [formGroup]=\"registerForm\">\n          <div class=\"form-group\">\n            <label>\n              <span class=\"label-content\">{{\n                'register.title' | cxTranslate\n              }}</span>\n              <ng-select\n                [clearable]=\"false\"\n                [items]=\"titles$ | async\"\n                [placeholder]=\"'register.selectTitle' | cxTranslate\"\n                [searchable]=\"false\"\n                bindLabel=\"name\"\n                bindValue=\"code\"\n                formControlName=\"titleCode\"\n                id=\"title-select\"\n                [cxNgSelectA11y]=\"{\n                  ariaLabel: 'register.title' | cxTranslate\n                }\"\n              >\n              </ng-select>\n            </label>\n          </div>\n\n          <div class=\"form-group\">\n            <label>\n              <span class=\"label-content\">{{\n                'register.firstName.label' | cxTranslate\n              }}</span>\n              <input\n                required=\"true\"\n                class=\"form-control\"\n                type=\"text\"\n                name=\"firstname\"\n                placeholder=\"{{\n                  'register.firstName.placeholder' | cxTranslate\n                }}\"\n                formControlName=\"firstName\"\n              />\n              <cx-form-errors\n                [control]=\"registerForm.get('firstName')\"\n              ></cx-form-errors>\n            </label>\n          </div>\n\n          <div class=\"form-group\">\n            <label>\n              <span class=\"label-content\">{{\n                'register.lastName.label' | cxTranslate\n              }}</span>\n              <input\n                required=\"true\"\n                class=\"form-control\"\n                type=\"text\"\n                name=\"lastname\"\n                placeholder=\"{{\n                  'register.lastName.placeholder' | cxTranslate\n                }}\"\n                formControlName=\"lastName\"\n              />\n              <cx-form-errors\n                [control]=\"registerForm.get('lastName')\"\n              ></cx-form-errors>\n            </label>\n          </div>\n\n          <div class=\"form-group\">\n            <label>\n              <span class=\"label-content\">{{\n                'register.emailAddress.label' | cxTranslate\n              }}</span>\n              <input\n                required=\"true\"\n                class=\"form-control\"\n                type=\"email\"\n                name=\"email\"\n                placeholder=\"{{\n                  'register.emailAddress.placeholder' | cxTranslate\n                }}\"\n                formControlName=\"email\"\n              />\n              <cx-form-errors\n                [control]=\"registerForm.get('email')\"\n              ></cx-form-errors>\n            </label>\n          </div>\n\n          <div class=\"form-group\">\n            <label>\n              <span class=\"label-content\">{{\n                'register.password.label' | cxTranslate\n              }}</span>\n              <input\n                required=\"true\"\n                class=\"form-control\"\n                type=\"password\"\n                name=\"password\"\n                placeholder=\"{{\n                  'register.password.placeholder' | cxTranslate\n                }}\"\n                formControlName=\"password\"\n                [attr.aria-label]=\"\n                  'register.password.placeholder' | cxTranslate\n                \"\n                cxPasswordVisibilitySwitch\n              />\n              <cx-form-errors\n                [control]=\"registerForm.get('password')\"\n              ></cx-form-errors>\n            </label>\n          </div>\n\n          <div class=\"form-group\">\n            <label>\n              <span class=\"label-content\">{{\n                'register.confirmPassword.label' | cxTranslate\n              }}</span>\n              <input\n                required=\"true\"\n                class=\"form-control\"\n                type=\"password\"\n                name=\"confirmpassword\"\n                placeholder=\"{{\n                  'register.confirmPassword.placeholder' | cxTranslate\n                }}\"\n                formControlName=\"passwordconf\"\n                [attr.aria-label]=\"\n                  'register.confirmPassword.placeholder' | cxTranslate\n                \"\n                cxPasswordVisibilitySwitch\n              />\n              <cx-form-errors\n                [control]=\"registerForm.get('passwordconf')\"\n              ></cx-form-errors>\n            </label>\n          </div>\n\n          <div class=\"form-group\">\n            <div class=\"form-check\">\n              <label *ngIf=\"anonymousConsent$ | async as anonymousConsent\">\n                <input\n                  type=\"checkbox\"\n                  name=\"newsletter\"\n                  class=\"form-check-input\"\n                  formControlName=\"newsletter\"\n                  [checked]=\"isConsentGiven(anonymousConsent.consent)\"\n                />\n                <span class=\"form-check-label\">\n                  {{ anonymousConsent.template }}\n                </span>\n              </label>\n            </div>\n          </div>\n\n          <div\n            formArrayName=\"additionalConsents\"\n            class=\"form-group\"\n            *ngIf=\"additionalRegistrationConsents as consents\"\n          >\n            <div\n              class=\"form-check\"\n              *ngFor=\"let control of additionalConsents.controls; let i = index\"\n            >\n              <div *ngIf=\"consents[i]?.template?.id as id\">\n                <label>\n                  <input\n                    type=\"checkbox\"\n                    [required]=\"consents[i].required\"\n                    [name]=\"id\"\n                    (change)=\"updateAdditionalConsents($any($event), i)\"\n                    [formControlName]=\"i\"\n                  />\n                  <span class=\"form-check-label\">\n                    {{ consents[i].template.description }}\n                  </span>\n                  <cx-form-errors [control]=\"control\"></cx-form-errors>\n                </label>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"form-group\">\n            <div class=\"form-check\">\n              <label>\n                <input\n                  required=\"true\"\n                  type=\"checkbox\"\n                  name=\"termsandconditions\"\n                  formControlName=\"termsandconditions\"\n                />\n                <span class=\"form-check-label\">\n                  {{ 'register.confirmThatRead' | cxTranslate }}\n                  <a\n                    [routerLink]=\"{ cxRoute: 'termsAndConditions' } | cxUrl\"\n                    target=\"_blank\"\n                    rel=\"noopener noreferrer\"\n                  >\n                    {{ 'register.termsAndConditions' | cxTranslate }}\n                  </a>\n                </span>\n                <cx-form-errors\n                  [control]=\"registerForm.get('termsandconditions')\"\n                ></cx-form-errors>\n              </label>\n            </div>\n          </div>\n          <button type=\"submit\" class=\"btn btn-block btn-primary\">\n            {{ 'register.register' | cxTranslate }}\n          </button>\n          <a\n            class=\"cx-login-link btn-link\"\n            [routerLink]=\"{ cxRoute: 'login' } | cxUrl\"\n            >{{ 'register.signIn' | cxTranslate }}</a\n          >\n        </form>\n      </div>\n    </div>\n  </div>\n</section>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\"><cx-spinner></cx-spinner></div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i3.CheckboxRequiredValidator, selector: "input[type=checkbox][required][formControlName],input[type=checkbox][required][formControl],input[type=checkbox][required][ngModel]" }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i3.FormArrayName, selector: "[formArrayName]", inputs: ["formArrayName"] }, { kind: "directive", type: i5.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i4.SpinnerComponent, selector: "cx-spinner" }, { kind: "component", type: i4.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "component", type: i6.NgSelectComponent, selector: "ng-select", inputs: ["bindLabel", "bindValue", "markFirst", "placeholder", "notFoundText", "typeToSearchText", "addTagText", "loadingText", "clearAllText", "appearance", "dropdownPosition", "appendTo", "loading", "closeOnSelect", "hideSelected", "selectOnTab", "openOnEnter", "maxSelectedItems", "groupBy", "groupValue", "bufferAmount", "virtualScroll", "selectableGroup", "selectableGroupAsModel", "searchFn", "trackByFn", "clearOnBackspace", "labelForId", "inputAttrs", "tabIndex", "readonly", "searchWhileComposing", "minTermLength", "editableSearchTerm", "keyDownFn", "typeahead", "multiple", "addTag", "searchable", "clearable", "isOpen", "items", "compareWith", "clearSearchOnAdd"], outputs: ["blur", "focus", "change", "open", "close", "search", "clear", "add", "remove", "scroll", "scrollToEnd"] }, { kind: "directive", type: i4.NgSelectA11yDirective, selector: "[cxNgSelectA11y]", inputs: ["cxNgSelectA11y"] }, { kind: "directive", type: i4.PasswordVisibilityToggleDirective, selector: "[cxPasswordVisibilitySwitch][type=\"password\"]" }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RegisterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-register', template: "<section\n  class=\"cx-page-section container\"\n  *ngIf=\"!(isLoading$ | async); else loading\"\n>\n  <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n  <div class=\"row justify-content-center\">\n    <div class=\"col-md-6\">\n      <div class=\"cx-section\">\n        <form (ngSubmit)=\"submitForm()\" [formGroup]=\"registerForm\">\n          <div class=\"form-group\">\n            <label>\n              <span class=\"label-content\">{{\n                'register.title' | cxTranslate\n              }}</span>\n              <ng-select\n                [clearable]=\"false\"\n                [items]=\"titles$ | async\"\n                [placeholder]=\"'register.selectTitle' | cxTranslate\"\n                [searchable]=\"false\"\n                bindLabel=\"name\"\n                bindValue=\"code\"\n                formControlName=\"titleCode\"\n                id=\"title-select\"\n                [cxNgSelectA11y]=\"{\n                  ariaLabel: 'register.title' | cxTranslate\n                }\"\n              >\n              </ng-select>\n            </label>\n          </div>\n\n          <div class=\"form-group\">\n            <label>\n              <span class=\"label-content\">{{\n                'register.firstName.label' | cxTranslate\n              }}</span>\n              <input\n                required=\"true\"\n                class=\"form-control\"\n                type=\"text\"\n                name=\"firstname\"\n                placeholder=\"{{\n                  'register.firstName.placeholder' | cxTranslate\n                }}\"\n                formControlName=\"firstName\"\n              />\n              <cx-form-errors\n                [control]=\"registerForm.get('firstName')\"\n              ></cx-form-errors>\n            </label>\n          </div>\n\n          <div class=\"form-group\">\n            <label>\n              <span class=\"label-content\">{{\n                'register.lastName.label' | cxTranslate\n              }}</span>\n              <input\n                required=\"true\"\n                class=\"form-control\"\n                type=\"text\"\n                name=\"lastname\"\n                placeholder=\"{{\n                  'register.lastName.placeholder' | cxTranslate\n                }}\"\n                formControlName=\"lastName\"\n              />\n              <cx-form-errors\n                [control]=\"registerForm.get('lastName')\"\n              ></cx-form-errors>\n            </label>\n          </div>\n\n          <div class=\"form-group\">\n            <label>\n              <span class=\"label-content\">{{\n                'register.emailAddress.label' | cxTranslate\n              }}</span>\n              <input\n                required=\"true\"\n                class=\"form-control\"\n                type=\"email\"\n                name=\"email\"\n                placeholder=\"{{\n                  'register.emailAddress.placeholder' | cxTranslate\n                }}\"\n                formControlName=\"email\"\n              />\n              <cx-form-errors\n                [control]=\"registerForm.get('email')\"\n              ></cx-form-errors>\n            </label>\n          </div>\n\n          <div class=\"form-group\">\n            <label>\n              <span class=\"label-content\">{{\n                'register.password.label' | cxTranslate\n              }}</span>\n              <input\n                required=\"true\"\n                class=\"form-control\"\n                type=\"password\"\n                name=\"password\"\n                placeholder=\"{{\n                  'register.password.placeholder' | cxTranslate\n                }}\"\n                formControlName=\"password\"\n                [attr.aria-label]=\"\n                  'register.password.placeholder' | cxTranslate\n                \"\n                cxPasswordVisibilitySwitch\n              />\n              <cx-form-errors\n                [control]=\"registerForm.get('password')\"\n              ></cx-form-errors>\n            </label>\n          </div>\n\n          <div class=\"form-group\">\n            <label>\n              <span class=\"label-content\">{{\n                'register.confirmPassword.label' | cxTranslate\n              }}</span>\n              <input\n                required=\"true\"\n                class=\"form-control\"\n                type=\"password\"\n                name=\"confirmpassword\"\n                placeholder=\"{{\n                  'register.confirmPassword.placeholder' | cxTranslate\n                }}\"\n                formControlName=\"passwordconf\"\n                [attr.aria-label]=\"\n                  'register.confirmPassword.placeholder' | cxTranslate\n                \"\n                cxPasswordVisibilitySwitch\n              />\n              <cx-form-errors\n                [control]=\"registerForm.get('passwordconf')\"\n              ></cx-form-errors>\n            </label>\n          </div>\n\n          <div class=\"form-group\">\n            <div class=\"form-check\">\n              <label *ngIf=\"anonymousConsent$ | async as anonymousConsent\">\n                <input\n                  type=\"checkbox\"\n                  name=\"newsletter\"\n                  class=\"form-check-input\"\n                  formControlName=\"newsletter\"\n                  [checked]=\"isConsentGiven(anonymousConsent.consent)\"\n                />\n                <span class=\"form-check-label\">\n                  {{ anonymousConsent.template }}\n                </span>\n              </label>\n            </div>\n          </div>\n\n          <div\n            formArrayName=\"additionalConsents\"\n            class=\"form-group\"\n            *ngIf=\"additionalRegistrationConsents as consents\"\n          >\n            <div\n              class=\"form-check\"\n              *ngFor=\"let control of additionalConsents.controls; let i = index\"\n            >\n              <div *ngIf=\"consents[i]?.template?.id as id\">\n                <label>\n                  <input\n                    type=\"checkbox\"\n                    [required]=\"consents[i].required\"\n                    [name]=\"id\"\n                    (change)=\"updateAdditionalConsents($any($event), i)\"\n                    [formControlName]=\"i\"\n                  />\n                  <span class=\"form-check-label\">\n                    {{ consents[i].template.description }}\n                  </span>\n                  <cx-form-errors [control]=\"control\"></cx-form-errors>\n                </label>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"form-group\">\n            <div class=\"form-check\">\n              <label>\n                <input\n                  required=\"true\"\n                  type=\"checkbox\"\n                  name=\"termsandconditions\"\n                  formControlName=\"termsandconditions\"\n                />\n                <span class=\"form-check-label\">\n                  {{ 'register.confirmThatRead' | cxTranslate }}\n                  <a\n                    [routerLink]=\"{ cxRoute: 'termsAndConditions' } | cxUrl\"\n                    target=\"_blank\"\n                    rel=\"noopener noreferrer\"\n                  >\n                    {{ 'register.termsAndConditions' | cxTranslate }}\n                  </a>\n                </span>\n                <cx-form-errors\n                  [control]=\"registerForm.get('termsandconditions')\"\n                ></cx-form-errors>\n              </label>\n            </div>\n          </div>\n          <button type=\"submit\" class=\"btn btn-block btn-primary\">\n            {{ 'register.register' | cxTranslate }}\n          </button>\n          <a\n            class=\"cx-login-link btn-link\"\n            [routerLink]=\"{ cxRoute: 'login' } | cxUrl\"\n            >{{ 'register.signIn' | cxTranslate }}</a\n          >\n        </form>\n      </div>\n    </div>\n  </div>\n</section>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\"><cx-spinner></cx-spinner></div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i2.GlobalMessageService }, { type: i3.UntypedFormBuilder }, { type: i2.RoutingService }, { type: i2.AnonymousConsentsService }, { type: i2.AnonymousConsentsConfig }, { type: i2.AuthConfigService }, { type: RegisterComponentService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class RegisterComponentModule {
}
RegisterComponentModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RegisterComponentModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RegisterComponentModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: RegisterComponentModule, declarations: [RegisterComponent], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        SpinnerModule,
        FormErrorsModule,
        NgSelectModule,
        NgSelectA11yModule,
        PasswordVisibilityToggleModule] });
RegisterComponentModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RegisterComponentModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                RegisterCustomerComponent: {
                    component: RegisterComponent,
                    guards: [NotAuthGuard],
                    providers: [
                        {
                            provide: RegisterComponentService,
                            useClass: RegisterComponentService,
                            deps: [
                                UserRegisterFacade,
                                GlobalMessageService,
                                UntypedFormBuilder,
                            ],
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        SpinnerModule,
        FormErrorsModule,
        NgSelectModule,
        NgSelectA11yModule,
        PasswordVisibilityToggleModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RegisterComponentModule, decorators: [{
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
                        PasswordVisibilityToggleModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                RegisterCustomerComponent: {
                                    component: RegisterComponent,
                                    guards: [NotAuthGuard],
                                    providers: [
                                        {
                                            provide: RegisterComponentService,
                                            useClass: RegisterComponentService,
                                            deps: [
                                                UserRegisterFacade,
                                                GlobalMessageService,
                                                UntypedFormBuilder,
                                            ],
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [RegisterComponent],
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
class ResetPasswordComponentService {
    constructor(userPasswordService, routingService, globalMessage) {
        this.userPasswordService = userPasswordService;
        this.routingService = routingService;
        this.globalMessage = globalMessage;
        this.busy$ = new BehaviorSubject(false);
        this.isUpdating$ = this.busy$.pipe(tap((state) => (state === true ? this.form.disable() : this.form.enable())));
        this.resetToken$ = this.routingService
            .getRouterState()
            .pipe(map((routerState) => routerState.state.queryParams['token']));
        this.form = new UntypedFormGroup({
            password: new UntypedFormControl('', [
                Validators.required,
                CustomFormValidators.passwordValidator,
            ]),
            passwordConfirm: new UntypedFormControl('', Validators.required),
        }, {
            validators: CustomFormValidators.passwordsMustMatch('password', 'passwordConfirm'),
        });
    }
    /**
     * Resets the password by the given token.
     *
     * The token has been provided during the request password flow.
     * The token is not validated on the client.
     */
    resetPassword(token) {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        const password = this.form.get('password').value;
        this.userPasswordService.reset(token, password).subscribe({
            next: () => this.onSuccess(),
            error: (error) => this.onError(error),
        });
    }
    onSuccess() {
        this.globalMessage.add({ key: 'forgottenPassword.passwordResetSuccess' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        this.busy$.next(false);
        this.form.reset();
        this.redirect();
    }
    onError(error) {
        this.busy$.next(false);
        if (error instanceof HttpErrorModel) {
            (error.details ?? []).forEach((err) => {
                if (err.message) {
                    this.globalMessage.add({ raw: err.message }, GlobalMessageType.MSG_TYPE_ERROR);
                }
            });
        }
    }
    /**
     * Redirects the user to the login page.
     */
    redirect() {
        this.routingService.go({ cxRoute: 'login' });
    }
}
ResetPasswordComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ResetPasswordComponentService, deps: [{ token: i1.UserPasswordFacade }, { token: i2.RoutingService }, { token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
ResetPasswordComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ResetPasswordComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ResetPasswordComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserPasswordFacade }, { type: i2.RoutingService }, { type: i2.GlobalMessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ResetPasswordComponent {
    constructor(service) {
        this.service = service;
        this.form = this.service.form;
        this.isUpdating$ = this.service.isUpdating$;
        this.token$ = this.service.resetToken$;
    }
    onSubmit(token) {
        this.service.resetPassword(token);
    }
}
ResetPasswordComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ResetPasswordComponent, deps: [{ token: ResetPasswordComponentService }], target: i0.ɵɵFactoryTarget.Component });
ResetPasswordComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ResetPasswordComponent, selector: "cx-reset-password", host: { classAttribute: "user-form" }, ngImport: i0, template: "<cx-spinner class=\"overlay\" *ngIf=\"isUpdating$ | async\"> </cx-spinner>\n\n<form\n  *ngIf=\"token$ | async as token\"\n  (ngSubmit)=\"onSubmit(token)\"\n  [formGroup]=\"form\"\n>\n  <label>\n    <span class=\"label-content\">{{\n      'register.newPassword' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      class=\"form-control\"\n      type=\"password\"\n      placeholder=\"{{ 'register.password.placeholder' | cxTranslate }}\"\n      formControlName=\"password\"\n      [attr.aria-label]=\"'register.password.placeholder' | cxTranslate\"\n      cxPasswordVisibilitySwitch\n    />\n    <cx-form-errors [control]=\"form.get('password')\"></cx-form-errors>\n  </label>\n\n  <label>\n    <span class=\"label-content\">{{\n      'register.passwordMinRequirements' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      class=\"form-control\"\n      type=\"password\"\n      placeholder=\"{{ 'register.confirmPassword.placeholder' | cxTranslate }}\"\n      formControlName=\"passwordConfirm\"\n      [attr.aria-label]=\"'register.confirmPassword.placeholder' | cxTranslate\"\n      cxPasswordVisibilitySwitch\n    />\n    <cx-form-errors [control]=\"form.get('passwordConfirm')\"></cx-form-errors>\n  </label>\n\n  <button class=\"btn btn-block btn-primary\" [disabled]=\"form.disabled\">\n    {{ 'register.resetPassword' | cxTranslate }}\n  </button>\n</form>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i4.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "component", type: i4.SpinnerComponent, selector: "cx-spinner" }, { kind: "directive", type: i4.PasswordVisibilityToggleDirective, selector: "[cxPasswordVisibilitySwitch][type=\"password\"]" }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ResetPasswordComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-reset-password', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'user-form' }, template: "<cx-spinner class=\"overlay\" *ngIf=\"isUpdating$ | async\"> </cx-spinner>\n\n<form\n  *ngIf=\"token$ | async as token\"\n  (ngSubmit)=\"onSubmit(token)\"\n  [formGroup]=\"form\"\n>\n  <label>\n    <span class=\"label-content\">{{\n      'register.newPassword' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      class=\"form-control\"\n      type=\"password\"\n      placeholder=\"{{ 'register.password.placeholder' | cxTranslate }}\"\n      formControlName=\"password\"\n      [attr.aria-label]=\"'register.password.placeholder' | cxTranslate\"\n      cxPasswordVisibilitySwitch\n    />\n    <cx-form-errors [control]=\"form.get('password')\"></cx-form-errors>\n  </label>\n\n  <label>\n    <span class=\"label-content\">{{\n      'register.passwordMinRequirements' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      class=\"form-control\"\n      type=\"password\"\n      placeholder=\"{{ 'register.confirmPassword.placeholder' | cxTranslate }}\"\n      formControlName=\"passwordConfirm\"\n      [attr.aria-label]=\"'register.confirmPassword.placeholder' | cxTranslate\"\n      cxPasswordVisibilitySwitch\n    />\n    <cx-form-errors [control]=\"form.get('passwordConfirm')\"></cx-form-errors>\n  </label>\n\n  <button class=\"btn btn-block btn-primary\" [disabled]=\"form.disabled\">\n    {{ 'register.resetPassword' | cxTranslate }}\n  </button>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: ResetPasswordComponentService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ResetPasswordModule {
}
ResetPasswordModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ResetPasswordModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ResetPasswordModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ResetPasswordModule, declarations: [ResetPasswordComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        I18nModule,
        FormErrorsModule,
        SpinnerModule,
        PasswordVisibilityToggleModule] });
ResetPasswordModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ResetPasswordModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ResetPasswordComponent: {
                    component: ResetPasswordComponent,
                    guards: [NotAuthGuard],
                    providers: [
                        {
                            provide: ResetPasswordComponentService,
                            useClass: ResetPasswordComponentService,
                            deps: [UserPasswordFacade, RoutingService, GlobalMessageService],
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        I18nModule,
        FormErrorsModule,
        SpinnerModule,
        PasswordVisibilityToggleModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ResetPasswordModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RouterModule,
                        I18nModule,
                        FormErrorsModule,
                        SpinnerModule,
                        PasswordVisibilityToggleModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ResetPasswordComponent: {
                                    component: ResetPasswordComponent,
                                    guards: [NotAuthGuard],
                                    providers: [
                                        {
                                            provide: ResetPasswordComponentService,
                                            useClass: ResetPasswordComponentService,
                                            deps: [UserPasswordFacade, RoutingService, GlobalMessageService],
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [ResetPasswordComponent],
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
class UpdateEmailComponentService {
    constructor(userEmail, routingService, globalMessageService, authService, authRedirectService) {
        this.userEmail = userEmail;
        this.routingService = routingService;
        this.globalMessageService = globalMessageService;
        this.authService = authService;
        this.authRedirectService = authRedirectService;
        this.busy$ = new BehaviorSubject(false);
        this.isUpdating$ = this.busy$.pipe(tap((state) => (state === true ? this.form.disable() : this.form.enable())));
        this.form = new UntypedFormGroup({
            email: new UntypedFormControl('', [
                Validators.required,
                CustomFormValidators.emailValidator,
            ]),
            confirmEmail: new UntypedFormControl('', [Validators.required]),
            password: new UntypedFormControl('', [Validators.required]),
        }, {
            validators: CustomFormValidators.emailsMustMatch('email', 'confirmEmail'),
        });
    }
    save() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        const newEmail = this.form.get('confirmEmail')?.value;
        const password = this.form.get('password')?.value;
        this.userEmail.update(password, newEmail).subscribe({
            next: () => this.onSuccess(newEmail),
            error: (error) => this.onError(error),
        });
    }
    /**
     * Handles successful updating of the user email.
     */
    onSuccess(newUid) {
        this.globalMessageService.add({
            key: 'updateEmailForm.emailUpdateSuccess',
            params: { newUid },
        }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        this.busy$.next(false);
        this.form.reset();
        // sets the redirect url after login
        this.authRedirectService.setRedirectUrl(this.routingService.getUrl({ cxRoute: 'home' }));
        // TODO(#9638): Use logout route when it will support passing redirect url
        this.authService.coreLogout().then(() => {
            this.routingService.go({ cxRoute: 'login' }, {
                state: {
                    newUid,
                },
            });
        });
    }
    onError(_error) {
        this.busy$.next(false);
    }
}
UpdateEmailComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateEmailComponentService, deps: [{ token: i1.UserEmailFacade }, { token: i2.RoutingService }, { token: i2.GlobalMessageService }, { token: i2.AuthService }, { token: i2.AuthRedirectService }], target: i0.ɵɵFactoryTarget.Injectable });
UpdateEmailComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateEmailComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateEmailComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserEmailFacade }, { type: i2.RoutingService }, { type: i2.GlobalMessageService }, { type: i2.AuthService }, { type: i2.AuthRedirectService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UpdateEmailComponent {
    constructor(service) {
        this.service = service;
        this.form = this.service.form;
        this.isUpdating$ = this.service.isUpdating$;
    }
    onSubmit() {
        this.service.save();
    }
}
UpdateEmailComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateEmailComponent, deps: [{ token: UpdateEmailComponentService }], target: i0.ɵɵFactoryTarget.Component });
UpdateEmailComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UpdateEmailComponent, selector: "cx-update-email", host: { classAttribute: "user-form" }, ngImport: i0, template: "<cx-spinner class=\"overlay\" *ngIf=\"isUpdating$ | async\"> </cx-spinner>\n\n<form (ngSubmit)=\"onSubmit()\" [formGroup]=\"form\">\n  <label>\n    <span class=\"label-content\">{{\n      'updateEmailForm.newEmailAddress.label' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      type=\"email\"\n      name=\"email\"\n      formControlName=\"email\"\n      placeholder=\"{{\n        'updateEmailForm.newEmailAddress.placeholder' | cxTranslate\n      }}\"\n      class=\"form-control\"\n    />\n    <cx-form-errors [control]=\"form.get('email')\"></cx-form-errors>\n  </label>\n\n  <label>\n    <span class=\"label-content\">{{\n      'updateEmailForm.confirmNewEmailAddress.label' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      type=\"email\"\n      name=\"confirmEmail\"\n      formControlName=\"confirmEmail\"\n      placeholder=\"{{\n        'updateEmailForm.confirmNewEmailAddress.placeholder' | cxTranslate\n      }}\"\n      class=\"form-control\"\n    />\n    <cx-form-errors [control]=\"form.get('confirmEmail')\"></cx-form-errors>\n  </label>\n\n  <label>\n    <span class=\"label-content\">{{\n      'updateEmailForm.password.label' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      type=\"password\"\n      name=\"password\"\n      formControlName=\"password\"\n      placeholder=\"{{ 'updateEmailForm.password.placeholder' | cxTranslate }}\"\n      class=\"form-control\"\n      autocomplete=\"new-password\"\n      [attr.aria-label]=\"'updateEmailForm.password.placeholder' | cxTranslate\"\n      cxPasswordVisibilitySwitch\n    />\n    <cx-form-errors [control]=\"form.get('password')\"></cx-form-errors>\n  </label>\n\n  <a\n    class=\"btn btn-block btn-secondary\"\n    [routerLink]=\"{ cxRoute: 'home' } | cxUrl\"\n  >\n    {{ 'common.cancel' | cxTranslate }}\n  </a>\n\n  <button class=\"btn btn-block btn-primary\" [disabled]=\"form.disabled\">\n    {{ 'common.save' | cxTranslate }}\n  </button>\n</form>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i4.SpinnerComponent, selector: "cx-spinner" }, { kind: "directive", type: i5.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i4.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "directive", type: i4.PasswordVisibilityToggleDirective, selector: "[cxPasswordVisibilitySwitch][type=\"password\"]" }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateEmailComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-update-email', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'user-form' }, template: "<cx-spinner class=\"overlay\" *ngIf=\"isUpdating$ | async\"> </cx-spinner>\n\n<form (ngSubmit)=\"onSubmit()\" [formGroup]=\"form\">\n  <label>\n    <span class=\"label-content\">{{\n      'updateEmailForm.newEmailAddress.label' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      type=\"email\"\n      name=\"email\"\n      formControlName=\"email\"\n      placeholder=\"{{\n        'updateEmailForm.newEmailAddress.placeholder' | cxTranslate\n      }}\"\n      class=\"form-control\"\n    />\n    <cx-form-errors [control]=\"form.get('email')\"></cx-form-errors>\n  </label>\n\n  <label>\n    <span class=\"label-content\">{{\n      'updateEmailForm.confirmNewEmailAddress.label' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      type=\"email\"\n      name=\"confirmEmail\"\n      formControlName=\"confirmEmail\"\n      placeholder=\"{{\n        'updateEmailForm.confirmNewEmailAddress.placeholder' | cxTranslate\n      }}\"\n      class=\"form-control\"\n    />\n    <cx-form-errors [control]=\"form.get('confirmEmail')\"></cx-form-errors>\n  </label>\n\n  <label>\n    <span class=\"label-content\">{{\n      'updateEmailForm.password.label' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      type=\"password\"\n      name=\"password\"\n      formControlName=\"password\"\n      placeholder=\"{{ 'updateEmailForm.password.placeholder' | cxTranslate }}\"\n      class=\"form-control\"\n      autocomplete=\"new-password\"\n      [attr.aria-label]=\"'updateEmailForm.password.placeholder' | cxTranslate\"\n      cxPasswordVisibilitySwitch\n    />\n    <cx-form-errors [control]=\"form.get('password')\"></cx-form-errors>\n  </label>\n\n  <a\n    class=\"btn btn-block btn-secondary\"\n    [routerLink]=\"{ cxRoute: 'home' } | cxUrl\"\n  >\n    {{ 'common.cancel' | cxTranslate }}\n  </a>\n\n  <button class=\"btn btn-block btn-primary\" [disabled]=\"form.disabled\">\n    {{ 'common.save' | cxTranslate }}\n  </button>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: UpdateEmailComponentService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UpdateEmailModule {
}
UpdateEmailModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateEmailModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UpdateEmailModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UpdateEmailModule, declarations: [UpdateEmailComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        UrlModule,
        RouterModule,
        I18nModule,
        FormErrorsModule,
        PasswordVisibilityToggleModule] });
UpdateEmailModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateEmailModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                UpdateEmailComponent: {
                    component: UpdateEmailComponent,
                    guards: [AuthGuard],
                    providers: [
                        {
                            provide: UpdateEmailComponentService,
                            useClass: UpdateEmailComponentService,
                            deps: [
                                UserEmailFacade,
                                RoutingService,
                                GlobalMessageService,
                                AuthService,
                                AuthRedirectService,
                            ],
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        UrlModule,
        RouterModule,
        I18nModule,
        FormErrorsModule,
        PasswordVisibilityToggleModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateEmailModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        SpinnerModule,
                        UrlModule,
                        RouterModule,
                        I18nModule,
                        FormErrorsModule,
                        PasswordVisibilityToggleModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                UpdateEmailComponent: {
                                    component: UpdateEmailComponent,
                                    guards: [AuthGuard],
                                    providers: [
                                        {
                                            provide: UpdateEmailComponentService,
                                            useClass: UpdateEmailComponentService,
                                            deps: [
                                                UserEmailFacade,
                                                RoutingService,
                                                GlobalMessageService,
                                                AuthService,
                                                AuthRedirectService,
                                            ],
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [UpdateEmailComponent],
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
class UpdatePasswordComponentService {
    constructor(userPasswordService, routingService, globalMessageService, authRedirectService, authService) {
        this.userPasswordService = userPasswordService;
        this.routingService = routingService;
        this.globalMessageService = globalMessageService;
        this.authRedirectService = authRedirectService;
        this.authService = authService;
        this.busy$ = new BehaviorSubject(false);
        this.isUpdating$ = this.busy$.pipe(tap((state) => (state === true ? this.form.disable() : this.form.enable())));
        this.form = new UntypedFormGroup({
            oldPassword: new UntypedFormControl('', Validators.required),
            newPassword: new UntypedFormControl('', [
                Validators.required,
                CustomFormValidators.passwordValidator,
            ]),
            newPasswordConfirm: new UntypedFormControl('', Validators.required),
        }, {
            validators: CustomFormValidators.passwordsMustMatch('newPassword', 'newPasswordConfirm'),
        });
    }
    /**
     * Updates the password for the user.
     */
    updatePassword() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        const oldPassword = this.form.get('oldPassword')?.value;
        const newPassword = this.form.get('newPassword')?.value;
        this.userPasswordService.update(oldPassword, newPassword).subscribe({
            next: () => this.onSuccess(),
            error: (error) => this.onError(error),
        });
    }
    onSuccess() {
        this.globalMessageService.add({ key: 'updatePasswordForm.passwordUpdateSuccess' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        this.busy$.next(false);
        this.form.reset();
        // sets the redirect url after login
        this.authRedirectService?.setRedirectUrl(this.routingService.getUrl({ cxRoute: 'home' }));
        // TODO(#9638): Use logout route when it will support passing redirect url
        this.authService?.coreLogout().then(() => {
            this.routingService.go({ cxRoute: 'login' });
        });
    }
    onError(_error) {
        if (_error instanceof HttpErrorModel &&
            _error.details?.[0].type === 'AccessDeniedError') {
            this.globalMessageService.add({ key: 'updatePasswordForm.accessDeniedError' }, GlobalMessageType.MSG_TYPE_ERROR);
        }
        this.busy$.next(false);
        this.form.reset();
    }
}
UpdatePasswordComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdatePasswordComponentService, deps: [{ token: i1.UserPasswordFacade }, { token: i2.RoutingService }, { token: i2.GlobalMessageService }, { token: i2.AuthRedirectService }, { token: i2.AuthService }], target: i0.ɵɵFactoryTarget.Injectable });
UpdatePasswordComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdatePasswordComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdatePasswordComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserPasswordFacade }, { type: i2.RoutingService }, { type: i2.GlobalMessageService }, { type: i2.AuthRedirectService }, { type: i2.AuthService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UpdatePasswordComponent {
    constructor(service) {
        this.service = service;
        this.form = this.service.form;
        this.isUpdating$ = this.service.isUpdating$;
    }
    onSubmit() {
        this.service.updatePassword();
    }
}
UpdatePasswordComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdatePasswordComponent, deps: [{ token: UpdatePasswordComponentService }], target: i0.ɵɵFactoryTarget.Component });
UpdatePasswordComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UpdatePasswordComponent, selector: "cx-update-password", host: { classAttribute: "user-form" }, ngImport: i0, template: "<cx-spinner class=\"overlay\" *ngIf=\"isUpdating$ | async\"> </cx-spinner>\n\n<form (ngSubmit)=\"onSubmit()\" [formGroup]=\"form\">\n  <label>\n    <span class=\"label-content\">{{\n      'updatePasswordForm.oldPassword.label' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      class=\"form-control\"\n      type=\"password\"\n      name=\"oldPassword\"\n      placeholder=\"{{\n        'updatePasswordForm.oldPassword.placeholder' | cxTranslate\n      }}\"\n      formControlName=\"oldPassword\"\n      [attr.aria-label]=\"\n        'updatePasswordForm.oldPassword.placeholder' | cxTranslate\n      \"\n      cxPasswordVisibilitySwitch\n    />\n    <cx-form-errors [control]=\"form.get('oldPassword')\"></cx-form-errors>\n  </label>\n\n  <label>\n    <span class=\"label-content\">{{\n      'updatePasswordForm.newPassword.label' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      class=\"form-control\"\n      type=\"password\"\n      name=\"newPassword\"\n      placeholder=\"{{\n        'updatePasswordForm.newPassword.placeholder' | cxTranslate\n      }}\"\n      formControlName=\"newPassword\"\n      [attr.aria-label]=\"\n        'updatePasswordForm.newPassword.placeholder' | cxTranslate\n      \"\n      cxPasswordVisibilitySwitch\n    />\n    <cx-form-errors [control]=\"form.get('newPassword')\"></cx-form-errors>\n  </label>\n\n  <label>\n    <span class=\"label-content\">{{\n      'updatePasswordForm.confirmPassword.label' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      class=\"form-control\"\n      type=\"password\"\n      name=\"newPasswordConfirm\"\n      placeholder=\"{{\n        'updatePasswordForm.confirmPassword.placeholder' | cxTranslate\n      }}\"\n      formControlName=\"newPasswordConfirm\"\n      [attr.aria-label]=\"\n        'updatePasswordForm.confirmPassword.placeholder' | cxTranslate\n      \"\n      cxPasswordVisibilitySwitch\n    />\n    <cx-form-errors [control]=\"form.get('newPasswordConfirm')\"></cx-form-errors>\n  </label>\n\n  <a\n    class=\"btn btn-block btn-secondary\"\n    [routerLink]=\"{ cxRoute: 'home' } | cxUrl\"\n  >\n    {{ 'common.cancel' | cxTranslate }}\n  </a>\n\n  <button class=\"btn btn-block btn-primary\" [disabled]=\"form.disabled\">\n    {{ 'common.save' | cxTranslate }}\n  </button>\n</form>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i4.SpinnerComponent, selector: "cx-spinner" }, { kind: "component", type: i4.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "directive", type: i5.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i4.PasswordVisibilityToggleDirective, selector: "[cxPasswordVisibilitySwitch][type=\"password\"]" }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdatePasswordComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-update-password', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'user-form' }, template: "<cx-spinner class=\"overlay\" *ngIf=\"isUpdating$ | async\"> </cx-spinner>\n\n<form (ngSubmit)=\"onSubmit()\" [formGroup]=\"form\">\n  <label>\n    <span class=\"label-content\">{{\n      'updatePasswordForm.oldPassword.label' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      class=\"form-control\"\n      type=\"password\"\n      name=\"oldPassword\"\n      placeholder=\"{{\n        'updatePasswordForm.oldPassword.placeholder' | cxTranslate\n      }}\"\n      formControlName=\"oldPassword\"\n      [attr.aria-label]=\"\n        'updatePasswordForm.oldPassword.placeholder' | cxTranslate\n      \"\n      cxPasswordVisibilitySwitch\n    />\n    <cx-form-errors [control]=\"form.get('oldPassword')\"></cx-form-errors>\n  </label>\n\n  <label>\n    <span class=\"label-content\">{{\n      'updatePasswordForm.newPassword.label' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      class=\"form-control\"\n      type=\"password\"\n      name=\"newPassword\"\n      placeholder=\"{{\n        'updatePasswordForm.newPassword.placeholder' | cxTranslate\n      }}\"\n      formControlName=\"newPassword\"\n      [attr.aria-label]=\"\n        'updatePasswordForm.newPassword.placeholder' | cxTranslate\n      \"\n      cxPasswordVisibilitySwitch\n    />\n    <cx-form-errors [control]=\"form.get('newPassword')\"></cx-form-errors>\n  </label>\n\n  <label>\n    <span class=\"label-content\">{{\n      'updatePasswordForm.confirmPassword.label' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      class=\"form-control\"\n      type=\"password\"\n      name=\"newPasswordConfirm\"\n      placeholder=\"{{\n        'updatePasswordForm.confirmPassword.placeholder' | cxTranslate\n      }}\"\n      formControlName=\"newPasswordConfirm\"\n      [attr.aria-label]=\"\n        'updatePasswordForm.confirmPassword.placeholder' | cxTranslate\n      \"\n      cxPasswordVisibilitySwitch\n    />\n    <cx-form-errors [control]=\"form.get('newPasswordConfirm')\"></cx-form-errors>\n  </label>\n\n  <a\n    class=\"btn btn-block btn-secondary\"\n    [routerLink]=\"{ cxRoute: 'home' } | cxUrl\"\n  >\n    {{ 'common.cancel' | cxTranslate }}\n  </a>\n\n  <button class=\"btn btn-block btn-primary\" [disabled]=\"form.disabled\">\n    {{ 'common.save' | cxTranslate }}\n  </button>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: UpdatePasswordComponentService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UpdatePasswordModule {
}
UpdatePasswordModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdatePasswordModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UpdatePasswordModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UpdatePasswordModule, declarations: [UpdatePasswordComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        I18nModule,
        FormErrorsModule,
        UrlModule,
        RouterModule,
        PasswordVisibilityToggleModule] });
UpdatePasswordModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdatePasswordModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                UpdatePasswordComponent: {
                    component: UpdatePasswordComponent,
                    guards: [AuthGuard],
                    providers: [
                        {
                            provide: UpdatePasswordComponentService,
                            useClass: UpdatePasswordComponentService,
                            deps: [
                                UserPasswordFacade,
                                RoutingService,
                                GlobalMessageService,
                                AuthRedirectService,
                                AuthService,
                            ],
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        I18nModule,
        FormErrorsModule,
        UrlModule,
        RouterModule,
        PasswordVisibilityToggleModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdatePasswordModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        SpinnerModule,
                        I18nModule,
                        FormErrorsModule,
                        UrlModule,
                        RouterModule,
                        PasswordVisibilityToggleModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                UpdatePasswordComponent: {
                                    component: UpdatePasswordComponent,
                                    guards: [AuthGuard],
                                    providers: [
                                        {
                                            provide: UpdatePasswordComponentService,
                                            useClass: UpdatePasswordComponentService,
                                            deps: [
                                                UserPasswordFacade,
                                                RoutingService,
                                                GlobalMessageService,
                                                AuthRedirectService,
                                                AuthService,
                                            ],
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [UpdatePasswordComponent],
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
class UpdateProfileComponentService {
    constructor(userProfile, globalMessageService) {
        this.userProfile = userProfile;
        this.globalMessageService = globalMessageService;
        this.user$ = this.userProfile
            .get()
            .pipe(filter((user) => Boolean(user)));
        this.busy$ = new BehaviorSubject(false);
        this.isUpdating$ = this.user$.pipe(tap((user) => this.form.patchValue(user)), switchMap((_user) => this.busy$), tap((state) => (state === true ? this.form.disable() : this.form.enable())));
        this.titles$ = this.userProfile.getTitles();
        this.form = new UntypedFormGroup({
            customerId: new UntypedFormControl(''),
            titleCode: new UntypedFormControl(''),
            firstName: new UntypedFormControl('', Validators.required),
            lastName: new UntypedFormControl('', Validators.required),
        });
    }
    /**
     * Updates the user's details and handles the UI.
     */
    updateProfile() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        this.userProfile.update(this.form.value).subscribe({
            next: () => this.onSuccess(),
            error: (error) => this.onError(error),
        });
    }
    onSuccess() {
        this.globalMessageService.add({
            key: 'updateProfileForm.profileUpdateSuccess',
        }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        this.busy$.next(false);
        this.form.reset();
    }
    onError(_error) {
        this.busy$.next(false);
    }
}
UpdateProfileComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateProfileComponentService, deps: [{ token: i1.UserProfileFacade }, { token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
UpdateProfileComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateProfileComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateProfileComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserProfileFacade }, { type: i2.GlobalMessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UpdateProfileComponent {
    constructor(service) {
        this.service = service;
        this.form = this.service.form;
        this.isUpdating$ = this.service.isUpdating$;
        this.titles$ = this.service.titles$;
    }
    onSubmit() {
        this.service.updateProfile();
    }
}
UpdateProfileComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateProfileComponent, deps: [{ token: UpdateProfileComponentService }], target: i0.ɵɵFactoryTarget.Component });
UpdateProfileComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UpdateProfileComponent, selector: "cx-update-profile", host: { classAttribute: "user-form" }, ngImport: i0, template: "<cx-spinner class=\"overlay\" *ngIf=\"isUpdating$ | async\"> </cx-spinner>\n\n<form (ngSubmit)=\"onSubmit()\" [formGroup]=\"form\">\n  <label>\n    <span class=\"label-content\">{{\n      'updateProfileForm.title' | cxTranslate\n    }}</span>\n    <ng-select\n      [clearable]=\"false\"\n      [searchable]=\"false\"\n      formControlName=\"titleCode\"\n      id=\"title-select\"\n      [cxNgSelectA11y]=\"{\n        ariaLabel: 'updateProfileForm.title' | cxTranslate\n      }\"\n    >\n      <ng-option *ngFor=\"let title of titles$ | async\" [value]=\"title.code\">{{\n        title.name\n      }}</ng-option>\n    </ng-select>\n  </label>\n  <label>\n    <span class=\"label-content\">{{\n      'updateProfileForm.firstName.label' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      type=\"text\"\n      class=\"form-control\"\n      name=\"firstName\"\n      placeholder=\"{{\n        'updateProfileForm.firstName.placeholder' | cxTranslate\n      }}\"\n      formControlName=\"firstName\"\n    />\n    <cx-form-errors [control]=\"form.get('firstName')\"></cx-form-errors>\n  </label>\n\n  <label>\n    <span class=\"label-content\">{{\n      'updateProfileForm.lastName.label' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      type=\"text\"\n      class=\"form-control\"\n      name=\"lastName\"\n      placeholder=\"{{ 'updateProfileForm.lastName.placeholder' | cxTranslate }}\"\n      formControlName=\"lastName\"\n    />\n    <cx-form-errors [control]=\"form.get('lastName')\"></cx-form-errors>\n  </label>\n\n  <label>\n    <span class=\"label-content\">{{\n      'updateProfileForm.customerId' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      type=\"text\"\n      class=\"form-control\"\n      name=\"customerId\"\n      formControlName=\"customerId\"\n      readonly\n    />\n    <cx-form-errors [control]=\"form.get('lastName')\"></cx-form-errors>\n  </label>\n\n  <a\n    class=\"btn btn-block btn-secondary\"\n    [routerLink]=\"{ cxRoute: 'home' } | cxUrl\"\n  >\n    {{ 'common.cancel' | cxTranslate }}\n  </a>\n\n  <button class=\"btn btn-block btn-primary\" [disabled]=\"form.disabled\">\n    {{ 'common.save' | cxTranslate }}\n  </button>\n</form>\n", dependencies: [{ kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i4.SpinnerComponent, selector: "cx-spinner" }, { kind: "component", type: i4.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "directive", type: i5.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i6.NgSelectComponent, selector: "ng-select", inputs: ["bindLabel", "bindValue", "markFirst", "placeholder", "notFoundText", "typeToSearchText", "addTagText", "loadingText", "clearAllText", "appearance", "dropdownPosition", "appendTo", "loading", "closeOnSelect", "hideSelected", "selectOnTab", "openOnEnter", "maxSelectedItems", "groupBy", "groupValue", "bufferAmount", "virtualScroll", "selectableGroup", "selectableGroupAsModel", "searchFn", "trackByFn", "clearOnBackspace", "labelForId", "inputAttrs", "tabIndex", "readonly", "searchWhileComposing", "minTermLength", "editableSearchTerm", "keyDownFn", "typeahead", "multiple", "addTag", "searchable", "clearable", "isOpen", "items", "compareWith", "clearSearchOnAdd"], outputs: ["blur", "focus", "change", "open", "close", "search", "clear", "add", "remove", "scroll", "scrollToEnd"] }, { kind: "component", type: i6.NgOptionComponent, selector: "ng-option", inputs: ["value", "disabled"] }, { kind: "directive", type: i4.NgSelectA11yDirective, selector: "[cxNgSelectA11y]", inputs: ["cxNgSelectA11y"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateProfileComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-update-profile', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'user-form' }, template: "<cx-spinner class=\"overlay\" *ngIf=\"isUpdating$ | async\"> </cx-spinner>\n\n<form (ngSubmit)=\"onSubmit()\" [formGroup]=\"form\">\n  <label>\n    <span class=\"label-content\">{{\n      'updateProfileForm.title' | cxTranslate\n    }}</span>\n    <ng-select\n      [clearable]=\"false\"\n      [searchable]=\"false\"\n      formControlName=\"titleCode\"\n      id=\"title-select\"\n      [cxNgSelectA11y]=\"{\n        ariaLabel: 'updateProfileForm.title' | cxTranslate\n      }\"\n    >\n      <ng-option *ngFor=\"let title of titles$ | async\" [value]=\"title.code\">{{\n        title.name\n      }}</ng-option>\n    </ng-select>\n  </label>\n  <label>\n    <span class=\"label-content\">{{\n      'updateProfileForm.firstName.label' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      type=\"text\"\n      class=\"form-control\"\n      name=\"firstName\"\n      placeholder=\"{{\n        'updateProfileForm.firstName.placeholder' | cxTranslate\n      }}\"\n      formControlName=\"firstName\"\n    />\n    <cx-form-errors [control]=\"form.get('firstName')\"></cx-form-errors>\n  </label>\n\n  <label>\n    <span class=\"label-content\">{{\n      'updateProfileForm.lastName.label' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      type=\"text\"\n      class=\"form-control\"\n      name=\"lastName\"\n      placeholder=\"{{ 'updateProfileForm.lastName.placeholder' | cxTranslate }}\"\n      formControlName=\"lastName\"\n    />\n    <cx-form-errors [control]=\"form.get('lastName')\"></cx-form-errors>\n  </label>\n\n  <label>\n    <span class=\"label-content\">{{\n      'updateProfileForm.customerId' | cxTranslate\n    }}</span>\n    <input\n      required=\"true\"\n      type=\"text\"\n      class=\"form-control\"\n      name=\"customerId\"\n      formControlName=\"customerId\"\n      readonly\n    />\n    <cx-form-errors [control]=\"form.get('lastName')\"></cx-form-errors>\n  </label>\n\n  <a\n    class=\"btn btn-block btn-secondary\"\n    [routerLink]=\"{ cxRoute: 'home' } | cxUrl\"\n  >\n    {{ 'common.cancel' | cxTranslate }}\n  </a>\n\n  <button class=\"btn btn-block btn-primary\" [disabled]=\"form.disabled\">\n    {{ 'common.save' | cxTranslate }}\n  </button>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: UpdateProfileComponentService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UpdateProfileModule {
}
UpdateProfileModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateProfileModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UpdateProfileModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UpdateProfileModule, declarations: [UpdateProfileComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        I18nModule,
        FormErrorsModule,
        RouterModule,
        UrlModule,
        NgSelectModule,
        NgSelectA11yModule] });
UpdateProfileModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateProfileModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                UpdateProfileComponent: {
                    component: UpdateProfileComponent,
                    guards: [AuthGuard],
                    providers: [
                        {
                            provide: UpdateProfileComponentService,
                            useClass: UpdateProfileComponentService,
                            deps: [UserProfileFacade, GlobalMessageService],
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        I18nModule,
        FormErrorsModule,
        RouterModule,
        UrlModule,
        NgSelectModule,
        NgSelectA11yModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateProfileModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        SpinnerModule,
                        I18nModule,
                        FormErrorsModule,
                        RouterModule,
                        UrlModule,
                        NgSelectModule,
                        NgSelectA11yModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                UpdateProfileComponent: {
                                    component: UpdateProfileComponent,
                                    guards: [AuthGuard],
                                    providers: [
                                        {
                                            provide: UpdateProfileComponentService,
                                            useClass: UpdateProfileComponentService,
                                            deps: [UserProfileFacade, GlobalMessageService],
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [UpdateProfileComponent],
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
class UserProfileComponentsModule {
}
UserProfileComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserProfileComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserProfileComponentsModule, imports: [RegisterComponentModule,
        UpdateProfileModule,
        UpdateEmailModule,
        UpdatePasswordModule,
        ForgotPasswordModule,
        ResetPasswordModule,
        CloseAccountModule] });
UserProfileComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileComponentsModule, imports: [RegisterComponentModule,
        UpdateProfileModule,
        UpdateEmailModule,
        UpdatePasswordModule,
        ForgotPasswordModule,
        ResetPasswordModule,
        CloseAccountModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RegisterComponentModule,
                        UpdateProfileModule,
                        UpdateEmailModule,
                        UpdatePasswordModule,
                        ForgotPasswordModule,
                        ResetPasswordModule,
                        CloseAccountModule,
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

export { CloseAccountComponent, CloseAccountModalComponent, CloseAccountModule, ForgotPasswordComponent, ForgotPasswordComponentService, ForgotPasswordModule, RegisterComponent, RegisterComponentModule, RegisterComponentService, ResetPasswordComponent, ResetPasswordComponentService, ResetPasswordModule, UpdateEmailComponent, UpdateEmailComponentService, UpdateEmailModule, UpdatePasswordComponent, UpdatePasswordComponentService, UpdatePasswordModule, UpdateProfileComponent, UpdateProfileComponentService, UpdateProfileModule, UserProfileComponentsModule };
//# sourceMappingURL=spartacus-user-profile-components.mjs.map
