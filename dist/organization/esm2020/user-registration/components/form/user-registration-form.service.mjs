/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Validators, } from '@angular/forms';
import { GlobalMessageType, OAuthFlow, } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { of } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/user/profile/root";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/organization/user-registration/root";
import * as i4 from "@angular/forms";
export class UserRegistrationFormService {
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
UserRegistrationFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationFormService, deps: [{ token: i1.UserRegisterFacade }, { token: i2.UserAddressService }, { token: i3.UserRegistrationFacade }, { token: i2.TranslationService }, { token: i2.GlobalMessageService }, { token: i2.AuthConfigService }, { token: i2.RoutingService }, { token: i4.FormBuilder }], target: i0.ɵɵFactoryTarget.Injectable });
UserRegistrationFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationFormService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.UserRegisterFacade }, { type: i2.UserAddressService }, { type: i3.UserRegistrationFacade }, { type: i2.TranslationService }, { type: i2.GlobalMessageService }, { type: i2.AuthConfigService }, { type: i2.RoutingService }, { type: i4.FormBuilder }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1yZWdpc3RyYXRpb24tZm9ybS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi91c2VyLXJlZ2lzdHJhdGlvbi9jb21wb25lbnRzL2Zvcm0vdXNlci1yZWdpc3RyYXRpb24tZm9ybS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFJTCxVQUFVLEdBQ1gsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBSUwsaUJBQWlCLEVBQ2pCLFNBQVMsR0FLVixNQUFNLGlCQUFpQixDQUFDO0FBS3pCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTdELE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUFLOUQsTUFBTSxPQUFPLDJCQUEyQjtJQUd0Qzs7T0FFRztJQUNPLFNBQVM7UUFDakIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUM1QixTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDakIsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDcEMsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDbkMsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDdEMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUN2RSxPQUFP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QUUsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUM5QztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILFlBQVksQ0FBQyxJQUFlO1FBQzFCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDeEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLFNBQVMsQ0FBQyxDQUFDLE9BQWUsRUFBRSxFQUFFLENBQzVCLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxZQUFZLENBQUM7WUFDbkQsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSztZQUN2QyxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLO1lBQ3ZDLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEtBQUs7WUFDckMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSztZQUMvQixPQUFPLEVBQUUsT0FBTztTQUNqQixDQUFDLENBQ0gsRUFDRCxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ1AsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDOzt3SEFqS1UsMkJBQTJCOzRIQUEzQiwyQkFBMkIsY0FGMUIsTUFBTTsyRkFFUCwyQkFBMkI7a0JBSHZDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQWJzdHJhY3RDb250cm9sLFxuICBGb3JtQnVpbGRlcixcbiAgRm9ybUdyb3VwLFxuICBWYWxpZGF0b3JzLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBBdXRoQ29uZmlnU2VydmljZSxcbiAgQ291bnRyeSxcbiAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VUeXBlLFxuICBPQXV0aEZsb3csXG4gIFJlZ2lvbixcbiAgUm91dGluZ1NlcnZpY2UsXG4gIFRyYW5zbGF0aW9uU2VydmljZSxcbiAgVXNlckFkZHJlc3NTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgT3JnYW5pemF0aW9uVXNlclJlZ2lzdHJhdGlvbixcbiAgVXNlclJlZ2lzdHJhdGlvbkZhY2FkZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vdXNlci1yZWdpc3RyYXRpb24vcm9vdCc7XG5pbXBvcnQgeyBDdXN0b21Gb3JtVmFsaWRhdG9ycyB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBUaXRsZSwgVXNlclJlZ2lzdGVyRmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy91c2VyL3Byb2ZpbGUvcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBzd2l0Y2hNYXAsIHRha2UsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJSZWdpc3RyYXRpb25Gb3JtU2VydmljZSB7XG4gIHByaXZhdGUgX2Zvcm06IEZvcm1Hcm91cCA9IHRoaXMuYnVpbGRGb3JtKCk7XG5cbiAgLypcbiAgICogSW5pdGlhbGl6ZXMgZm9ybSBzdHJ1Y3R1cmUgZm9yIHJlZ2lzdHJhdGlvbi5cbiAgICovXG4gIHByb3RlY3RlZCBidWlsZEZvcm0oKTogRm9ybUdyb3VwIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICB0aXRsZUNvZGU6IFtudWxsXSxcbiAgICAgIGZpcnN0TmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIGxhc3ROYW1lOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgY29tcGFueU5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICBlbWFpbDogWycnLCBbVmFsaWRhdG9ycy5yZXF1aXJlZCwgQ3VzdG9tRm9ybVZhbGlkYXRvcnMuZW1haWxWYWxpZGF0b3JdXSxcbiAgICAgIGNvdW50cnk6IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICBpc29jb2RlOiBbbnVsbF0sXG4gICAgICB9KSxcbiAgICAgIGxpbmUxOiBbJyddLFxuICAgICAgbGluZTI6IFsnJ10sXG4gICAgICB0b3duOiBbJyddLFxuICAgICAgcmVnaW9uOiB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgICAgaXNvY29kZTogW251bGxdLFxuICAgICAgfSksXG4gICAgICBwb3N0YWxDb2RlOiBbJyddLFxuICAgICAgcGhvbmVOdW1iZXI6IFsnJ10sXG4gICAgICBtZXNzYWdlOiBbJyddLFxuICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogR2V0cyBmb3JtIHN0cnVjdHVyZSBmb3IgcmVnaXN0cmF0aW9uLlxuICAgKi9cbiAgcHVibGljIGdldCBmb3JtKCk6IEZvcm1Hcm91cCB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvcm07XG4gIH1cblxuICAvKlxuICAgKiBHZXRzIGZvcm0gY29udHJvbCBmb3IgY291bnRyeSBpc29jb2RlLlxuICAgKi9cbiAgcHVibGljIGdldCBjb3VudHJ5Q29udHJvbCgpOiBBYnN0cmFjdENvbnRyb2wgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtLmdldCgnY291bnRyeS5pc29jb2RlJyk7XG4gIH1cblxuICAvKlxuICAgKiAgR2V0cyBmb3JtIGNvbnRyb2wgZm9yIHJlZ2lvbiBpc29jb2RlLlxuICAgKi9cbiAgcHVibGljIGdldCByZWdpb25Db250cm9sKCk6IEFic3RyYWN0Q29udHJvbCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmZvcm0uZ2V0KCdyZWdpb24uaXNvY29kZScpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHVzZXJSZWdpc3RlckZhY2FkZTogVXNlclJlZ2lzdGVyRmFjYWRlLFxuICAgIHByb3RlY3RlZCB1c2VyQWRkcmVzc1NlcnZpY2U6IFVzZXJBZGRyZXNzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgb3JnYW5pemF0aW9uVXNlclJlZ2lzdHJhdGlvbkZhY2FkZTogVXNlclJlZ2lzdHJhdGlvbkZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRpb25TZXJ2aWNlOiBUcmFuc2xhdGlvblNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXV0aENvbmZpZ1NlcnZpY2U6IEF1dGhDb25maWdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlclxuICApIHt9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRpdGxlIGNvZGVzLlxuICAgKi9cbiAgZ2V0VGl0bGVzKCk6IE9ic2VydmFibGU8VGl0bGVbXT4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJSZWdpc3RlckZhY2FkZS5nZXRUaXRsZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCBjb3VudHJpZXMgbGlzdC5cbiAgICovXG4gIGdldENvdW50cmllcygpOiBPYnNlcnZhYmxlPENvdW50cnlbXT4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJBZGRyZXNzU2VydmljZS5nZXREZWxpdmVyeUNvdW50cmllcygpLnBpcGUoXG4gICAgICB0YXAoKGNvdW50cmllczogQ291bnRyeVtdKSA9PiB7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhjb3VudHJpZXMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMudXNlckFkZHJlc3NTZXJ2aWNlLmxvYWREZWxpdmVyeUNvdW50cmllcygpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgcmVnaW9ucyBsaXN0IGZvciBzcGVjaWZpYyBzZWxlY3RlZCBjb3VudHJ5LlxuICAgKi9cbiAgZ2V0UmVnaW9ucygpOiBPYnNlcnZhYmxlPFJlZ2lvbltdPiB7XG4gICAgY29uc3QgcmVnaW9uczogUmVnaW9uW10gPSBbXTtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5jb3VudHJ5Q29udHJvbD8udmFsdWVDaGFuZ2VzLnBpcGUoXG4gICAgICAgIGZpbHRlcigoY291bnRyeUlzb0NvZGUpID0+ICEhY291bnRyeUlzb0NvZGUpLFxuICAgICAgICBzd2l0Y2hNYXAoKGNvdW50cnlJc29Db2RlKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZWdpb25Db250cm9sPy5yZXNldCgpO1xuICAgICAgICAgIHJldHVybiB0aGlzLnVzZXJBZGRyZXNzU2VydmljZS5nZXRSZWdpb25zKGNvdW50cnlJc29Db2RlKTtcbiAgICAgICAgfSlcbiAgICAgICkgPz8gb2YocmVnaW9ucylcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRha2VzIGZvcm0gdmFsdWVzIGFuZCBidWlsZHMgY3VzdG9tIG1lc3NhZ2UgY29udGVudC5cbiAgICovXG4gIHByb3RlY3RlZCBidWlsZE1lc3NhZ2VDb250ZW50KGZvcm06IEZvcm1Hcm91cCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRpb25TZXJ2aWNlLnRyYW5zbGF0ZShcbiAgICAgICd1c2VyUmVnaXN0cmF0aW9uRm9ybS5tZXNzYWdlVG9BcHByb3ZlclRlbXBsYXRlJyxcbiAgICAgIHtcbiAgICAgICAgcGhvbmVOdW1iZXI6IGZvcm0uZ2V0KCdwaG9uZU51bWJlcicpPy52YWx1ZSxcbiAgICAgICAgYWRkcmVzc0xpbmU6IGZvcm0uZ2V0KCdsaW5lMScpPy52YWx1ZSxcbiAgICAgICAgc2Vjb25kQWRkcmVzc0xpbmU6IGZvcm0uZ2V0KCdsaW5lMicpPy52YWx1ZSxcbiAgICAgICAgY2l0eTogZm9ybS5nZXQoJ2NpdHknKT8udmFsdWUsXG4gICAgICAgIHN0YXRlOiBmb3JtLmdldCgncmVnaW9uJyk/LmdldCgnaXNvY29kZScpPy52YWx1ZSxcbiAgICAgICAgcG9zdGFsQ29kZTogZm9ybS5nZXQoJ3Bvc3RhbENvZGUnKT8udmFsdWUsXG4gICAgICAgIGNvdW50cnk6IGZvcm0uZ2V0KCdjb3VudHJ5Jyk/LmdldCgnaXNvY29kZScpPy52YWx1ZSxcbiAgICAgICAgY29tcGFueU5hbWU6IGZvcm0uZ2V0KCdjb21wYW55TmFtZScpPy52YWx1ZSxcbiAgICAgICAgbWVzc2FnZTogZm9ybS5nZXQoJ21lc3NhZ2UnKT8udmFsdWUsXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwbGF5cyBjb25maXJtYXRpb24gZ2xvYmFsIG1lc3NhZ2UuXG4gICAqL1xuICBwcm90ZWN0ZWQgZGlzcGxheUdsb2JhbE1lc3NhZ2UoKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgeyBrZXk6ICd1c2VyUmVnaXN0cmF0aW9uRm9ybS5zdWNjZXNzRm9ybVN1Ym1pdE1lc3NhZ2UnIH0sXG4gICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9DT05GSVJNQVRJT05cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZGlyZWN0cyB0aGUgdXNlciBiYWNrIHRvIHRoZSBsb2dpbiBwYWdlLlxuICAgKlxuICAgKiBUaGlzIG9ubHkgaGFwcGVucyBpbiBjYXNlIG9mIHRoZSBgUmVzb3VyY2VPd25lclBhc3N3b3JkRmxvd2AgT0F1dGggZmxvdy5cbiAgICovXG4gIHByb3RlY3RlZCByZWRpcmVjdFRvTG9naW4oKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5hdXRoQ29uZmlnU2VydmljZS5nZXRPQXV0aEZsb3coKSA9PT1cbiAgICAgIE9BdXRoRmxvdy5SZXNvdXJjZU93bmVyUGFzc3dvcmRGbG93XG4gICAgKSB7XG4gICAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdvKHsgY3hSb3V0ZTogJ2xvZ2luJyB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIG5ldyBvcmdhbml6YXRpb24gdXNlci5cbiAgICovXG4gIHJlZ2lzdGVyVXNlcihmb3JtOiBGb3JtR3JvdXApOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvblVzZXJSZWdpc3RyYXRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5idWlsZE1lc3NhZ2VDb250ZW50KGZvcm0pLnBpcGUoXG4gICAgICB0YWtlKDEpLFxuICAgICAgc3dpdGNoTWFwKChtZXNzYWdlOiBzdHJpbmcpID0+XG4gICAgICAgIHRoaXMub3JnYW5pemF0aW9uVXNlclJlZ2lzdHJhdGlvbkZhY2FkZS5yZWdpc3RlclVzZXIoe1xuICAgICAgICAgIHRpdGxlQ29kZTogZm9ybS5nZXQoJ3RpdGxlQ29kZScpPy52YWx1ZSxcbiAgICAgICAgICBmaXJzdE5hbWU6IGZvcm0uZ2V0KCdmaXJzdE5hbWUnKT8udmFsdWUsXG4gICAgICAgICAgbGFzdE5hbWU6IGZvcm0uZ2V0KCdsYXN0TmFtZScpPy52YWx1ZSxcbiAgICAgICAgICBlbWFpbDogZm9ybS5nZXQoJ2VtYWlsJyk/LnZhbHVlLFxuICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgdGhpcy5kaXNwbGF5R2xvYmFsTWVzc2FnZSgpO1xuICAgICAgICB0aGlzLnJlZGlyZWN0VG9Mb2dpbigpO1xuICAgICAgICBmb3JtLnJlc2V0KCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==