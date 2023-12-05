import * as i0 from '@angular/core';
import { Injectable, Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import * as i4 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i2$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3$1 from '@angular/forms';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import * as i6 from '@ng-select/ng-select';
import { NgSelectModule } from '@ng-select/ng-select';
import * as i2 from '@spartacus/core';
import { GlobalMessageType, OAuthFlow, UrlModule, I18nModule, ConfigModule, NotAuthGuard } from '@spartacus/core';
import * as i5 from '@spartacus/storefront';
import { CustomFormValidators, SpinnerModule, FormErrorsModule, NgSelectA11yModule } from '@spartacus/storefront';
import { of, BehaviorSubject, Subscription } from 'rxjs';
import { tap, filter, switchMap, take } from 'rxjs/operators';
import * as i1 from '@spartacus/user/profile/root';
import * as i3 from '@spartacus/organization/user-registration/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserRegistrationFormService {
    /*
     * Initializes form structure for registration.
     */
    buildForm() {
        return this.formBuilder.group({
            titleCode: [null],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            companyName: ['', Validators.required],
            email: ['', [Validators.required, CustomFormValidators.emailValidator]],
            country: this.formBuilder.group({
                isocode: [null],
            }),
            line1: [''],
            line2: [''],
            town: [''],
            region: this.formBuilder.group({
                isocode: [null],
            }),
            postalCode: [''],
            phoneNumber: [''],
            message: [''],
        });
    }
    /*
     * Gets form structure for registration.
     */
    get form() {
        return this._form;
    }
    /*
     * Gets form control for country isocode.
     */
    get countryControl() {
        return this.form.get('country.isocode');
    }
    /*
     *  Gets form control for region isocode.
     */
    get regionControl() {
        return this.form.get('region.isocode');
    }
    constructor(userRegisterFacade, userAddressService, organizationUserRegistrationFacade, translationService, globalMessageService, authConfigService, routingService, formBuilder) {
        this.userRegisterFacade = userRegisterFacade;
        this.userAddressService = userAddressService;
        this.organizationUserRegistrationFacade = organizationUserRegistrationFacade;
        this.translationService = translationService;
        this.globalMessageService = globalMessageService;
        this.authConfigService = authConfigService;
        this.routingService = routingService;
        this.formBuilder = formBuilder;
        this._form = this.buildForm();
    }
    /**
     * Gets all title codes.
     */
    getTitles() {
        return this.userRegisterFacade.getTitles();
    }
    /**
     * Gets all countries list.
     */
    getCountries() {
        return this.userAddressService.getDeliveryCountries().pipe(tap((countries) => {
            if (Object.keys(countries).length === 0) {
                this.userAddressService.loadDeliveryCountries();
            }
        }));
    }
    /**
     * Gets all regions list for specific selected country.
     */
    getRegions() {
        const regions = [];
        return (this.countryControl?.valueChanges.pipe(filter((countryIsoCode) => !!countryIsoCode), switchMap((countryIsoCode) => {
            this.regionControl?.reset();
            return this.userAddressService.getRegions(countryIsoCode);
        })) ?? of(regions));
    }
    /**
     * Takes form values and builds custom message content.
     */
    buildMessageContent(form) {
        return this.translationService.translate('userRegistrationForm.messageToApproverTemplate', {
            phoneNumber: form.get('phoneNumber')?.value,
            addressLine: form.get('line1')?.value,
            secondAddressLine: form.get('line2')?.value,
            city: form.get('city')?.value,
            state: form.get('region')?.get('isocode')?.value,
            postalCode: form.get('postalCode')?.value,
            country: form.get('country')?.get('isocode')?.value,
            companyName: form.get('companyName')?.value,
            message: form.get('message')?.value,
        });
    }
    /**
     * Displays confirmation global message.
     */
    displayGlobalMessage() {
        return this.globalMessageService.add({ key: 'userRegistrationForm.successFormSubmitMessage' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
    }
    /**
     * Redirects the user back to the login page.
     *
     * This only happens in case of the `ResourceOwnerPasswordFlow` OAuth flow.
     */
    redirectToLogin() {
        if (this.authConfigService.getOAuthFlow() ===
            OAuthFlow.ResourceOwnerPasswordFlow) {
            this.routingService.go({ cxRoute: 'login' });
        }
    }
    /**
     * Registers new organization user.
     */
    registerUser(form) {
        return this.buildMessageContent(form).pipe(take(1), switchMap((message) => this.organizationUserRegistrationFacade.registerUser({
            titleCode: form.get('titleCode')?.value,
            firstName: form.get('firstName')?.value,
            lastName: form.get('lastName')?.value,
            email: form.get('email')?.value,
            message: message,
        })), tap(() => {
            this.displayGlobalMessage();
            this.redirectToLogin();
            form.reset();
        }));
    }
}
UserRegistrationFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationFormService, deps: [{ token: i1.UserRegisterFacade }, { token: i2.UserAddressService }, { token: i3.UserRegistrationFacade }, { token: i2.TranslationService }, { token: i2.GlobalMessageService }, { token: i2.AuthConfigService }, { token: i2.RoutingService }, { token: i3$1.FormBuilder }], target: i0.ɵɵFactoryTarget.Injectable });
UserRegistrationFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationFormService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.UserRegisterFacade }, { type: i2.UserAddressService }, { type: i3.UserRegistrationFacade }, { type: i2.TranslationService }, { type: i2.GlobalMessageService }, { type: i2.AuthConfigService }, { type: i2.RoutingService }, { type: i3$1.FormBuilder }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserRegistrationFormComponent {
    constructor(userRegistrationFormService) {
        this.userRegistrationFormService = userRegistrationFormService;
        this.titles$ = this.userRegistrationFormService.getTitles();
        this.countries$ = this.userRegistrationFormService.getCountries();
        this.regions$ = this.userRegistrationFormService.getRegions();
        this.registerForm = this.userRegistrationFormService.form;
        this.isLoading$ = new BehaviorSubject(false);
        this.subscriptions = new Subscription();
    }
    submit() {
        if (this.registerForm.valid) {
            this.isLoading$.next(true);
            this.subscriptions.add(this.userRegistrationFormService
                .registerUser(this.registerForm)
                .subscribe({
                complete: () => this.isLoading$.next(false),
                error: () => this.isLoading$.next(false),
            }));
        }
        else {
            this.registerForm.markAllAsTouched();
        }
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
UserRegistrationFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationFormComponent, deps: [{ token: UserRegistrationFormService }], target: i0.ɵɵFactoryTarget.Component });
UserRegistrationFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UserRegistrationFormComponent, selector: "cx-user-registration-form", ngImport: i0, template: "<section *ngIf=\"!(isLoading$ | async); else loading\">\n  <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n\n  <form [formGroup]=\"registerForm\" (ngSubmit)=\"submit()\">\n    <label>\n      <span class=\"label-content\">{{\n        'userRegistrationForm.fields.titleCode.label' | cxTranslate\n      }}</span>\n      <ng-select\n        id=\"title-code-select\"\n        formControlName=\"titleCode\"\n        [searchable]=\"false\"\n        [clearable]=\"false\"\n        [items]=\"titles$ | async\"\n        bindLabel=\"name\"\n        bindValue=\"code\"\n        placeholder=\"{{\n          'userRegistrationForm.fields.titleCode.placeholder' | cxTranslate\n        }}\"\n        [cxNgSelectA11y]=\"{\n          ariaLabel: 'userRegistrationForm.fields.titleCode.label' | cxTranslate\n        }\"\n      >\n      </ng-select>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'userRegistrationForm.fields.firstName.label' | cxTranslate\n      }}</span>\n      <input\n        required=\"true\"\n        class=\"form-control\"\n        type=\"text\"\n        name=\"firstname\"\n        placeholder=\"{{\n          'userRegistrationForm.fields.firstName.placeholder' | cxTranslate\n        }}\"\n        formControlName=\"firstName\"\n      />\n      <cx-form-errors\n        [control]=\"registerForm.get('firstName')\"\n      ></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'userRegistrationForm.fields.lastName.label' | cxTranslate\n      }}</span>\n      <input\n        required=\"true\"\n        class=\"form-control\"\n        type=\"text\"\n        name=\"lastname\"\n        placeholder=\"{{\n          'userRegistrationForm.fields.lastName.placeholder' | cxTranslate\n        }}\"\n        formControlName=\"lastName\"\n      />\n      <cx-form-errors [control]=\"registerForm.get('lastName')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'userRegistrationForm.fields.companyName.label' | cxTranslate\n      }}</span>\n      <input\n        required=\"true\"\n        class=\"form-control\"\n        type=\"text\"\n        name=\"companyName\"\n        placeholder=\"{{\n          'userRegistrationForm.fields.companyName.placeholder' | cxTranslate\n        }}\"\n        formControlName=\"companyName\"\n      />\n      <cx-form-errors\n        [control]=\"registerForm.get('companyName')\"\n      ></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'userRegistrationForm.fields.email.label' | cxTranslate\n      }}</span>\n      <input\n        required=\"true\"\n        class=\"form-control\"\n        type=\"email\"\n        name=\"email\"\n        placeholder=\"{{\n          'userRegistrationForm.fields.email.placeholder' | cxTranslate\n        }}\"\n        formControlName=\"email\"\n      />\n      <cx-form-errors [control]=\"registerForm.get('email')\"></cx-form-errors>\n    </label>\n\n    <ng-container\n      *ngIf=\"countries$ | async as countries\"\n      formGroupName=\"country\"\n    >\n      <label *ngIf=\"countries.length !== 0\">\n        <span class=\"label-content\">{{\n          'userRegistrationForm.fields.country.label' | cxTranslate\n        }}</span>\n        <ng-select\n          class=\"country-select\"\n          id=\"country-select\"\n          formControlName=\"isocode\"\n          [searchable]=\"true\"\n          [clearable]=\"false\"\n          [items]=\"countries\"\n          bindLabel=\"name\"\n          bindValue=\"isocode\"\n          placeholder=\"{{\n            'userRegistrationForm.fields.country.placeholder' | cxTranslate\n          }}\"\n          [cxNgSelectA11y]=\"{\n            ariaLabel: 'userRegistrationForm.fields.country.label' | cxTranslate\n          }\"\n        >\n        </ng-select>\n        <cx-form-errors\n          [control]=\"registerForm.get('country.isocode')\"\n        ></cx-form-errors>\n      </label>\n    </ng-container>\n\n    <label>\n      <span class=\"label-content\">{{\n        'userRegistrationForm.fields.addressLine.label' | cxTranslate\n      }}</span>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        placeholder=\"{{\n          'userRegistrationForm.fields.addressLine.placeholder' | cxTranslate\n        }}\"\n        formControlName=\"line1\"\n      />\n      <cx-form-errors [control]=\"registerForm.get('line1')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content\">{{\n        'userRegistrationForm.fields.secondAddressLine.label' | cxTranslate\n      }}</span>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        placeholder=\"{{\n          'userRegistrationForm.fields.secondAddressLine.placeholder'\n            | cxTranslate\n        }}\"\n        formControlName=\"line2\"\n      />\n      <cx-form-errors [control]=\"registerForm.get('line2')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content\">{{\n        'userRegistrationForm.fields.city.label' | cxTranslate\n      }}</span>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        placeholder=\"{{\n          'userRegistrationForm.fields.city.label' | cxTranslate\n        }}\"\n        formControlName=\"town\"\n      />\n      <cx-form-errors [control]=\"registerForm.get('town')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content\">{{\n        'userRegistrationForm.fields.postalCode.label' | cxTranslate\n      }}</span>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        placeholder=\"{{\n          'userRegistrationForm.fields.postalCode.placeholder' | cxTranslate\n        }}\"\n        formControlName=\"postalCode\"\n      />\n      <cx-form-errors\n        [control]=\"registerForm.get('postalCode')\"\n      ></cx-form-errors>\n    </label>\n\n    <ng-container *ngIf=\"regions$ | async as regions\" formGroupName=\"region\">\n      <label *ngIf=\"regions.length !== 0\">\n        <span class=\"label-content\">{{\n          'userRegistrationForm.fields.state.label' | cxTranslate\n        }}</span>\n        <ng-select\n          class=\"region-select\"\n          formControlName=\"isocode\"\n          [searchable]=\"true\"\n          [clearable]=\"false\"\n          [items]=\"regions\"\n          bindLabel=\"name\"\n          bindValue=\"isocode\"\n          placeholder=\"{{\n            'userRegistrationForm.fields.state.placeholder' | cxTranslate\n          }}\"\n          id=\"region-select\"\n          [cxNgSelectA11y]=\"{\n            ariaLabel: 'userRegistrationForm.fields.state.label' | cxTranslate\n          }\"\n        >\n        </ng-select>\n        <cx-form-errors\n          [control]=\"registerForm.get('region.isocode')\"\n        ></cx-form-errors>\n      </label>\n    </ng-container>\n\n    <label>\n      <span class=\"label-content\">{{\n        'userRegistrationForm.fields.phoneNumber.label' | cxTranslate\n      }}</span>\n      <input\n        type=\"tel\"\n        class=\"form-control\"\n        placeholder=\"{{\n          'userRegistrationForm.fields.phoneNumber.placeholder' | cxTranslate\n        }}\"\n        formControlName=\"phoneNumber\"\n      />\n      <cx-form-errors\n        [control]=\"registerForm.get('phoneNumber')\"\n      ></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content\">{{\n        'userRegistrationForm.fields.message.label' | cxTranslate\n      }}</span>\n      <textarea\n        class=\"form-control\"\n        formControlName=\"message\"\n        placeholder=\"{{\n          'userRegistrationForm.fields.message.placeholder' | cxTranslate\n        }}\"\n        rows=\"5\"\n      ></textarea>\n      <cx-form-errors [control]=\"registerForm.get('message')\"></cx-form-errors>\n    </label>\n\n    <button type=\"submit\" class=\"btn btn-block btn-primary\">\n      {{ 'userRegistrationForm.formSubmitButtonLabel' | cxTranslate }}\n    </button>\n    <a\n      class=\"cx-login-link btn-link\"\n      [routerLink]=\"{ cxRoute: 'login' } | cxUrl\"\n      >{{ 'userRegistrationForm.goToLoginButtonLabel' | cxTranslate }}</a\n    >\n  </form>\n</section>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\"><cx-spinner></cx-spinner></div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3$1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i3$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i3$1.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i5.SpinnerComponent, selector: "cx-spinner" }, { kind: "component", type: i5.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "component", type: i6.NgSelectComponent, selector: "ng-select", inputs: ["bindLabel", "bindValue", "markFirst", "placeholder", "notFoundText", "typeToSearchText", "addTagText", "loadingText", "clearAllText", "appearance", "dropdownPosition", "appendTo", "loading", "closeOnSelect", "hideSelected", "selectOnTab", "openOnEnter", "maxSelectedItems", "groupBy", "groupValue", "bufferAmount", "virtualScroll", "selectableGroup", "selectableGroupAsModel", "searchFn", "trackByFn", "clearOnBackspace", "labelForId", "inputAttrs", "tabIndex", "readonly", "searchWhileComposing", "minTermLength", "editableSearchTerm", "keyDownFn", "typeahead", "multiple", "addTag", "searchable", "clearable", "isOpen", "items", "compareWith", "clearSearchOnAdd"], outputs: ["blur", "focus", "change", "open", "close", "search", "clear", "add", "remove", "scroll", "scrollToEnd"] }, { kind: "directive", type: i5.NgSelectA11yDirective, selector: "[cxNgSelectA11y]", inputs: ["cxNgSelectA11y"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-user-registration-form', changeDetection: ChangeDetectionStrategy.OnPush, template: "<section *ngIf=\"!(isLoading$ | async); else loading\">\n  <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n\n  <form [formGroup]=\"registerForm\" (ngSubmit)=\"submit()\">\n    <label>\n      <span class=\"label-content\">{{\n        'userRegistrationForm.fields.titleCode.label' | cxTranslate\n      }}</span>\n      <ng-select\n        id=\"title-code-select\"\n        formControlName=\"titleCode\"\n        [searchable]=\"false\"\n        [clearable]=\"false\"\n        [items]=\"titles$ | async\"\n        bindLabel=\"name\"\n        bindValue=\"code\"\n        placeholder=\"{{\n          'userRegistrationForm.fields.titleCode.placeholder' | cxTranslate\n        }}\"\n        [cxNgSelectA11y]=\"{\n          ariaLabel: 'userRegistrationForm.fields.titleCode.label' | cxTranslate\n        }\"\n      >\n      </ng-select>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'userRegistrationForm.fields.firstName.label' | cxTranslate\n      }}</span>\n      <input\n        required=\"true\"\n        class=\"form-control\"\n        type=\"text\"\n        name=\"firstname\"\n        placeholder=\"{{\n          'userRegistrationForm.fields.firstName.placeholder' | cxTranslate\n        }}\"\n        formControlName=\"firstName\"\n      />\n      <cx-form-errors\n        [control]=\"registerForm.get('firstName')\"\n      ></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'userRegistrationForm.fields.lastName.label' | cxTranslate\n      }}</span>\n      <input\n        required=\"true\"\n        class=\"form-control\"\n        type=\"text\"\n        name=\"lastname\"\n        placeholder=\"{{\n          'userRegistrationForm.fields.lastName.placeholder' | cxTranslate\n        }}\"\n        formControlName=\"lastName\"\n      />\n      <cx-form-errors [control]=\"registerForm.get('lastName')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'userRegistrationForm.fields.companyName.label' | cxTranslate\n      }}</span>\n      <input\n        required=\"true\"\n        class=\"form-control\"\n        type=\"text\"\n        name=\"companyName\"\n        placeholder=\"{{\n          'userRegistrationForm.fields.companyName.placeholder' | cxTranslate\n        }}\"\n        formControlName=\"companyName\"\n      />\n      <cx-form-errors\n        [control]=\"registerForm.get('companyName')\"\n      ></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'userRegistrationForm.fields.email.label' | cxTranslate\n      }}</span>\n      <input\n        required=\"true\"\n        class=\"form-control\"\n        type=\"email\"\n        name=\"email\"\n        placeholder=\"{{\n          'userRegistrationForm.fields.email.placeholder' | cxTranslate\n        }}\"\n        formControlName=\"email\"\n      />\n      <cx-form-errors [control]=\"registerForm.get('email')\"></cx-form-errors>\n    </label>\n\n    <ng-container\n      *ngIf=\"countries$ | async as countries\"\n      formGroupName=\"country\"\n    >\n      <label *ngIf=\"countries.length !== 0\">\n        <span class=\"label-content\">{{\n          'userRegistrationForm.fields.country.label' | cxTranslate\n        }}</span>\n        <ng-select\n          class=\"country-select\"\n          id=\"country-select\"\n          formControlName=\"isocode\"\n          [searchable]=\"true\"\n          [clearable]=\"false\"\n          [items]=\"countries\"\n          bindLabel=\"name\"\n          bindValue=\"isocode\"\n          placeholder=\"{{\n            'userRegistrationForm.fields.country.placeholder' | cxTranslate\n          }}\"\n          [cxNgSelectA11y]=\"{\n            ariaLabel: 'userRegistrationForm.fields.country.label' | cxTranslate\n          }\"\n        >\n        </ng-select>\n        <cx-form-errors\n          [control]=\"registerForm.get('country.isocode')\"\n        ></cx-form-errors>\n      </label>\n    </ng-container>\n\n    <label>\n      <span class=\"label-content\">{{\n        'userRegistrationForm.fields.addressLine.label' | cxTranslate\n      }}</span>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        placeholder=\"{{\n          'userRegistrationForm.fields.addressLine.placeholder' | cxTranslate\n        }}\"\n        formControlName=\"line1\"\n      />\n      <cx-form-errors [control]=\"registerForm.get('line1')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content\">{{\n        'userRegistrationForm.fields.secondAddressLine.label' | cxTranslate\n      }}</span>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        placeholder=\"{{\n          'userRegistrationForm.fields.secondAddressLine.placeholder'\n            | cxTranslate\n        }}\"\n        formControlName=\"line2\"\n      />\n      <cx-form-errors [control]=\"registerForm.get('line2')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content\">{{\n        'userRegistrationForm.fields.city.label' | cxTranslate\n      }}</span>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        placeholder=\"{{\n          'userRegistrationForm.fields.city.label' | cxTranslate\n        }}\"\n        formControlName=\"town\"\n      />\n      <cx-form-errors [control]=\"registerForm.get('town')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content\">{{\n        'userRegistrationForm.fields.postalCode.label' | cxTranslate\n      }}</span>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        placeholder=\"{{\n          'userRegistrationForm.fields.postalCode.placeholder' | cxTranslate\n        }}\"\n        formControlName=\"postalCode\"\n      />\n      <cx-form-errors\n        [control]=\"registerForm.get('postalCode')\"\n      ></cx-form-errors>\n    </label>\n\n    <ng-container *ngIf=\"regions$ | async as regions\" formGroupName=\"region\">\n      <label *ngIf=\"regions.length !== 0\">\n        <span class=\"label-content\">{{\n          'userRegistrationForm.fields.state.label' | cxTranslate\n        }}</span>\n        <ng-select\n          class=\"region-select\"\n          formControlName=\"isocode\"\n          [searchable]=\"true\"\n          [clearable]=\"false\"\n          [items]=\"regions\"\n          bindLabel=\"name\"\n          bindValue=\"isocode\"\n          placeholder=\"{{\n            'userRegistrationForm.fields.state.placeholder' | cxTranslate\n          }}\"\n          id=\"region-select\"\n          [cxNgSelectA11y]=\"{\n            ariaLabel: 'userRegistrationForm.fields.state.label' | cxTranslate\n          }\"\n        >\n        </ng-select>\n        <cx-form-errors\n          [control]=\"registerForm.get('region.isocode')\"\n        ></cx-form-errors>\n      </label>\n    </ng-container>\n\n    <label>\n      <span class=\"label-content\">{{\n        'userRegistrationForm.fields.phoneNumber.label' | cxTranslate\n      }}</span>\n      <input\n        type=\"tel\"\n        class=\"form-control\"\n        placeholder=\"{{\n          'userRegistrationForm.fields.phoneNumber.placeholder' | cxTranslate\n        }}\"\n        formControlName=\"phoneNumber\"\n      />\n      <cx-form-errors\n        [control]=\"registerForm.get('phoneNumber')\"\n      ></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content\">{{\n        'userRegistrationForm.fields.message.label' | cxTranslate\n      }}</span>\n      <textarea\n        class=\"form-control\"\n        formControlName=\"message\"\n        placeholder=\"{{\n          'userRegistrationForm.fields.message.placeholder' | cxTranslate\n        }}\"\n        rows=\"5\"\n      ></textarea>\n      <cx-form-errors [control]=\"registerForm.get('message')\"></cx-form-errors>\n    </label>\n\n    <button type=\"submit\" class=\"btn btn-block btn-primary\">\n      {{ 'userRegistrationForm.formSubmitButtonLabel' | cxTranslate }}\n    </button>\n    <a\n      class=\"cx-login-link btn-link\"\n      [routerLink]=\"{ cxRoute: 'login' } | cxUrl\"\n      >{{ 'userRegistrationForm.goToLoginButtonLabel' | cxTranslate }}</a\n    >\n  </form>\n</section>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\"><cx-spinner></cx-spinner></div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: UserRegistrationFormService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserRegistrationFormModule {
}
UserRegistrationFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserRegistrationFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationFormModule, declarations: [UserRegistrationFormComponent], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        SpinnerModule,
        FormErrorsModule,
        NgSelectModule,
        NgSelectA11yModule, i2.ConfigModule], exports: [UserRegistrationFormComponent] });
UserRegistrationFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationFormModule, providers: [UserRegistrationFormService], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        SpinnerModule,
        FormErrorsModule,
        NgSelectModule,
        NgSelectA11yModule,
        ConfigModule.withConfig({
            cmsComponents: {
                OrganizationUserRegistrationComponent: {
                    component: UserRegistrationFormComponent,
                    guards: [NotAuthGuard],
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationFormModule, decorators: [{
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
                        ConfigModule.withConfig({
                            cmsComponents: {
                                OrganizationUserRegistrationComponent: {
                                    component: UserRegistrationFormComponent,
                                    guards: [NotAuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [UserRegistrationFormComponent],
                    exports: [UserRegistrationFormComponent],
                    providers: [UserRegistrationFormService],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserRegistrationComponentsModule {
}
UserRegistrationComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserRegistrationComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationComponentsModule, imports: [RouterModule, UserRegistrationFormModule] });
UserRegistrationComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationComponentsModule, imports: [RouterModule, UserRegistrationFormModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RouterModule, UserRegistrationFormModule],
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

export { UserRegistrationComponentsModule, UserRegistrationFormComponent, UserRegistrationFormModule, UserRegistrationFormService };
//# sourceMappingURL=spartacus-organization-user-registration-components.mjs.map
