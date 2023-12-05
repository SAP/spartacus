/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CdcJsService, CdcLoadUserTokenFailEvent } from '@spartacus/cdc/root';
import { AuthConfigService, AuthService, CommandService, EventService, GlobalMessageService, GlobalMessageType, RoutingService, TranslationService, UserAddressService, } from '@spartacus/core';
import { UserRegistrationFormService } from '@spartacus/organization/user-registration/components';
import { UserRegistrationFacade, } from '@spartacus/organization/user-registration/root';
import { UserRegisterFacade } from '@spartacus/user/profile/root';
import { throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/cdc/root";
import * as i3 from "@spartacus/user/profile/root";
import * as i4 from "@spartacus/organization/user-registration/root";
import * as i5 from "@angular/forms";
export class CDCB2BRegisterComponentService extends UserRegistrationFormService {
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
        if (!form.get('firstName')?.value ||
            !form.get('lastName')?.value ||
            !form.get('email')?.value ||
            !form.get('companyName')?.value) {
            return throwError(`The provided user is not valid: ${form.value}`);
        }
        const orgInfo = {
            firstName: form.get('firstName')?.value,
            lastName: form.get('lastName')?.value,
            email: form.get('email')?.value,
            companyName: form.get('companyName')?.value,
            addressLine1: form.get('line1')?.value,
            addressLine2: form.get('line2')?.value,
            postalCode: form.get('postalCode')?.value,
            town: form.get('town')?.value,
            region: form.get('region')?.get('isocode')?.value,
            country: form.get('country')?.get('isocode')?.value,
            phoneNumber: form.get('phoneNumber')?.value,
            message: form.get('message')?.value,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLWIyYi1yZWdpc3Rlci1jb21wb25lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RjL29yZ2FuaXphdGlvbi91c2VyLXJlZ2lzdHJhdGlvbi9jZGMtYjJiLXJlZ2lzdGVyLWNvbXBvbmVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLHlCQUF5QixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUUsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixXQUFXLEVBRVgsY0FBYyxFQUNkLFlBQVksRUFDWixvQkFBb0IsRUFDcEIsaUJBQWlCLEVBQ2pCLGNBQWMsRUFDZCxrQkFBa0IsRUFDbEIsa0JBQWtCLEdBQ25CLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDbkcsT0FBTyxFQUNMLHNCQUFzQixHQUV2QixNQUFNLGdEQUFnRCxDQUFDO0FBQ3hELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7QUFHckQsTUFBTSxPQUFPLDhCQUErQixTQUFRLDJCQUEyQjtJQXVCN0UsWUFDWSxPQUF1QixFQUN2QixZQUEwQixFQUMxQixXQUF3QixFQUN4QixZQUEwQixFQUMxQixrQkFBc0MsRUFDdEMsa0JBQXNDLEVBQ3RDLGtDQUEwRCxFQUMxRCxrQkFBc0MsRUFDdEMs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IFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENkY0pzU2VydmljZSwgQ2RjTG9hZFVzZXJUb2tlbkZhaWxFdmVudCB9IGZyb20gJ0BzcGFydGFjdXMvY2RjL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQXV0aENvbmZpZ1NlcnZpY2UsXG4gIEF1dGhTZXJ2aWNlLFxuICBDb21tYW5kLFxuICBDb21tYW5kU2VydmljZSxcbiAgRXZlbnRTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgR2xvYmFsTWVzc2FnZVR5cGUsXG4gIFJvdXRpbmdTZXJ2aWNlLFxuICBUcmFuc2xhdGlvblNlcnZpY2UsXG4gIFVzZXJBZGRyZXNzU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFVzZXJSZWdpc3RyYXRpb25Gb3JtU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL3VzZXItcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMnO1xuaW1wb3J0IHtcbiAgVXNlclJlZ2lzdHJhdGlvbkZhY2FkZSxcbiAgT3JnYW5pemF0aW9uVXNlclJlZ2lzdHJhdGlvbkZvcm0sXG59IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL3VzZXItcmVnaXN0cmF0aW9uL3Jvb3QnO1xuaW1wb3J0IHsgVXNlclJlZ2lzdGVyRmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy91c2VyL3Byb2ZpbGUvcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ0RDQjJCUmVnaXN0ZXJDb21wb25lbnRTZXJ2aWNlIGV4dGVuZHMgVXNlclJlZ2lzdHJhdGlvbkZvcm1TZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIHJlZ2lzdGVyQ29tbWFuZDogQ29tbWFuZDxcbiAgICB7IG9yZ0luZm86IE9yZ2FuaXphdGlvblVzZXJSZWdpc3RyYXRpb25Gb3JtIH0sXG4gICAgT3JnYW5pemF0aW9uVXNlclJlZ2lzdHJhdGlvbkZvcm1cbiAgPiA9IHRoaXMuY29tbWFuZC5jcmVhdGUoXG4gICAgKHsgb3JnSW5mbyB9KSA9PlxuICAgICAgLy8gUmVnaXN0ZXJpbmcgdXNlciB0aHJvdWdoIENEQyBHaWd5YSBTREtcbiAgICAgIHRoaXMuY2RjSlNTZXJ2aWNlLnJlZ2lzdGVyT3JnYW5pc2F0aW9uV2l0aG91dFNjcmVlblNldChcbiAgICAgICAgb3JnSW5mb1xuICAgICAgKSBhcyB1bmtub3duIGFzIE9ic2VydmFibGU8T3JnYW5pemF0aW9uVXNlclJlZ2lzdHJhdGlvbkZvcm0+XG4gICk7XG5cbiAgcHJvdGVjdGVkIGxvYWRVc2VyVG9rZW5GYWlsZWQkOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy5ldmVudFNlcnZpY2VcbiAgICAuZ2V0KENkY0xvYWRVc2VyVG9rZW5GYWlsRXZlbnQpXG4gICAgLnBpcGUoXG4gICAgICBtYXAoKGV2ZW50KSA9PiAhIWV2ZW50KSxcbiAgICAgIHRhcCgoZmFpbGVkKSA9PiB7XG4gICAgICAgIGlmIChmYWlsZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVzZXIgdG9rZW4gZmFpbGVkIHRvIGxvYWQuYCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29tbWFuZDogQ29tbWFuZFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNkY0pTU2VydmljZTogQ2RjSnNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGV2ZW50U2VydmljZTogRXZlbnRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB1c2VyUmVnaXN0ZXJGYWNhZGU6IFVzZXJSZWdpc3RlckZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgdXNlckFkZHJlc3NTZXJ2aWNlOiBVc2VyQWRkcmVzc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIG9yZ2FuaXphdGlvblVzZXJSZWdpc3RyYXRpb25GYWNhZGU6IFVzZXJSZWdpc3RyYXRpb25GYWNhZGUsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0aW9uU2VydmljZTogVHJhbnNsYXRpb25TZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBnbG9iYWxNZXNzYWdlU2VydmljZTogR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGF1dGhDb25maWdTZXJ2aWNlOiBBdXRoQ29uZmlnU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXJcbiAgKSB7XG4gICAgc3VwZXIoXG4gICAgICB1c2VyUmVnaXN0ZXJGYWNhZGUsXG4gICAgICB1c2VyQWRkcmVzc1NlcnZpY2UsXG4gICAgICBvcmdhbml6YXRpb25Vc2VyUmVnaXN0cmF0aW9uRmFjYWRlLFxuICAgICAgdHJhbnNsYXRpb25TZXJ2aWNlLFxuICAgICAgZ2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gICAgICBhdXRoQ29uZmlnU2VydmljZSxcbiAgICAgIHJvdXRpbmdTZXJ2aWNlLFxuICAgICAgZm9ybUJ1aWxkZXJcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGEgbmV3IHVzZXIgdXNpbmcgQ0RDIFNESy5cbiAgICpcbiAgICogQHBhcmFtIGZvcm0gYXMgRm9ybUdyb3VwXG4gICAqL1xuICByZWdpc3RlclVzZXIoZm9ybTogRm9ybUdyb3VwKTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb25Vc2VyUmVnaXN0cmF0aW9uRm9ybT4ge1xuICAgIGlmIChcbiAgICAgICFmb3JtLmdldCgnZmlyc3ROYW1lJyk/LnZhbHVlIHx8XG4gICAgICAhZm9ybS5nZXQoJ2xhc3ROYW1lJyk/LnZhbHVlIHx8XG4gICAgICAhZm9ybS5nZXQoJ2VtYWlsJyk/LnZhbHVlIHx8XG4gICAgICAhZm9ybS5nZXQoJ2NvbXBhbnlOYW1lJyk/LnZhbHVlXG4gICAgKSB7XG4gICAgICByZXR1cm4gdGhyb3dFcnJvcihgVGhlIHByb3ZpZGVkIHVzZXIgaXMgbm90IHZhbGlkOiAke2Zvcm0udmFsdWV9YCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3JnSW5mbzogT3JnYW5pemF0aW9uVXNlclJlZ2lzdHJhdGlvbkZvcm0gPSB7XG4gICAgICBmaXJzdE5hbWU6IGZvcm0uZ2V0KCdmaXJzdE5hbWUnKT8udmFsdWUsXG4gICAgICBsYXN0TmFtZTogZm9ybS5nZXQoJ2xhc3ROYW1lJyk/LnZhbHVlLFxuICAgICAgZW1haWw6IGZvcm0uZ2V0KCdlbWFpbCcpPy52YWx1ZSxcbiAgICAgIGNvbXBhbnlOYW1lOiBmb3JtLmdldCgnY29tcGFueU5hbWUnKT8udmFsdWUsXG4gICAgICBhZGRyZXNzTGluZTE6IGZvcm0uZ2V0KCdsaW5lMScpPy52YWx1ZSxcbiAgICAgIGFkZHJlc3NMaW5lMjogZm9ybS5nZXQoJ2xpbmUyJyk/LnZhbHVlLFxuICAgICAgcG9zdGFsQ29kZTogZm9ybS5nZXQoJ3Bvc3RhbENvZGUnKT8udmFsdWUsXG4gICAgICB0b3duOiBmb3JtLmdldCgndG93bicpPy52YWx1ZSxcbiAgICAgIHJlZ2lvbjogZm9ybS5nZXQoJ3JlZ2lvbicpPy5nZXQoJ2lzb2NvZGUnKT8udmFsdWUsXG4gICAgICBjb3VudHJ5OiBmb3JtLmdldCgnY291bnRyeScpPy5nZXQoJ2lzb2NvZGUnKT8udmFsdWUsXG4gICAgICBwaG9uZU51bWJlcjogZm9ybS5nZXQoJ3Bob25lTnVtYmVyJyk/LnZhbHVlLFxuICAgICAgbWVzc2FnZTogZm9ybS5nZXQoJ21lc3NhZ2UnKT8udmFsdWUsXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5jZGNKU1NlcnZpY2UuZGlkTG9hZCgpLnBpcGUoXG4gICAgICB0YXAoKGNkY0xvYWRlZCkgPT4ge1xuICAgICAgICBpZiAoIWNkY0xvYWRlZCkge1xuICAgICAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBrZXk6ICdlcnJvckhhbmRsZXJzLnNjcmlwdEZhaWxlZFRvTG9hZCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICAgICApO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ0RDIHNjcmlwdCBkaWRuJ3QgbG9hZC5gKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBzd2l0Y2hNYXAoKCkgPT5cbiAgICAgICAgLy8gTG9nZ2luZyBpbiB1c2luZyBDREMgR2lneWEgU0RLLCB1cGRhdGUgdGhlIHJlZ2lzdGVyQ29tbWFuZFxuICAgICAgICB0aGlzLnJlZ2lzdGVyQ29tbWFuZC5leGVjdXRlKHsgb3JnSW5mbyB9KVxuICAgICAgKSxcbiAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZGlzcGxheUdsb2JhbE1lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5yZWRpcmVjdFRvTG9naW4oKTtcbiAgICAgICAgZm9ybS5yZXNldCgpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLy8gQG92ZXJyaWRlXG4gIHBvc3RSZWdpc3Rlck1lc3NhZ2UoKTogdm9pZCB7XG4gICAgLy8gZG9uJ3Qgc2hvdyB0aGUgbWVzc2FnZVxuICB9XG59XG4iXX0=