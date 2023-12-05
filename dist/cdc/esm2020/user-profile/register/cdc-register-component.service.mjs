/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { FormControl, UntypedFormBuilder, Validators, } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CdcConsentManagementComponentService, CdcJsService, CdcLoadUserTokenFailEvent, CDC_USER_PREFERENCE_SERIALIZER, } from '@spartacus/cdc/root';
import { AnonymousConsentsService, AuthService, CommandService, ConverterService, EventService, GlobalMessageService, GlobalMessageType, } from '@spartacus/core';
import { RegisterComponentService } from '@spartacus/user/profile/components';
import { UserProfileFacade, UserRegisterFacade, } from '@spartacus/user/profile/root';
import { merge, throwError } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/user/profile/root";
import * as i2 from "@spartacus/core";
import * as i3 from "@ngrx/store";
import * as i4 from "@spartacus/cdc/root";
import * as i5 from "@angular/forms";
export class CDCRegisterComponentService extends RegisterComponentService {
    constructor(userRegisterFacade, command, store, cdcJSService, globalMessageService, authService, eventService, userProfileFacade, cdcConsentManagementService, converter, fb, anonymousConsentsService) {
        super(userRegisterFacade, globalMessageService, fb);
        this.userRegisterFacade = userRegisterFacade;
        this.command = command;
        this.store = store;
        this.cdcJSService = cdcJSService;
        this.globalMessageService = globalMessageService;
        this.authService = authService;
        this.eventService = eventService;
        this.userProfileFacade = userProfileFacade;
        this.cdcConsentManagementService = cdcConsentManagementService;
        this.converter = converter;
        this.fb = fb;
        this.anonymousConsentsService = anonymousConsentsService;
        this.registerCommand = this.command.create(({ user }) => 
        // Registering user through CDC Gigya SDK
        this.cdcJSService.registerUserWithoutScreenSet(user));
        this.loadUserTokenFailed$ = this.eventService
            .get(CdcLoadUserTokenFailEvent)
            .pipe(map((event) => !!event), tap((failed) => {
            if (failed) {
                throw new Error(`User token failed to load.`);
            }
        }));
        this.isLoggedIn$ = this.authService
            .isUserLoggedIn()
            .pipe(filter((loggedIn) => loggedIn));
    }
    /**
     * Register a new user using CDC SDK.
     *
     * @param user as UserSignUp
     */
    register(user) {
        if (!user.firstName || !user.lastName || !user.uid || !user.password) {
            return throwError(`The provided user is not valid: ${user}`);
        }
        /** fill the user preferences */
        user.preferences = this.generatePreferencesObject();
        return this.cdcJSService.didLoad().pipe(tap((cdcLoaded) => {
            if (!cdcLoaded) {
                this.globalMessageService.add({
                    key: 'errorHandlers.scriptFailedToLoad',
                }, GlobalMessageType.MSG_TYPE_ERROR);
                throw new Error(`CDC script didn't load.`);
            }
        }), switchMap(() => 
        // Logging in using CDC Gigya SDK, update the registerCommand
        this.registerCommand.execute({ user })), switchMap(() => merge(this.loadUserTokenFailed$, this.isLoggedIn$).pipe(map(() => {
            //update user title code
            this.userProfileFacade.update(user);
        }))), switchMap(() => {
            return this.userProfileFacade
                .get()
                .pipe(filter((userObj) => Boolean(userObj)));
        }));
    }
    /**
     * Return preferences object that needs to be updated during register process
     * @returns preference object
     */
    generatePreferencesObject() {
        let preferences = null;
        const consentIDs = this.cdcConsentManagementService.getCdcConsentIDs(); //fetch all active consents
        for (const id of consentIDs) {
            const consent = {};
            consent.id = id;
            consent.currentConsent = {};
            consent.currentConsent.consentGivenDate = new Date();
            const serializedPreference = this.converter.convert(consent, CDC_USER_PREFERENCE_SERIALIZER);
            preferences = Object.assign(preferences ?? {}, serializedPreference);
        }
        return preferences;
    }
    // @override
    postRegisterMessage() {
        // don't show the message
    }
    /**
     * fetch consents that exist in commerce and is active in cdc
     * @returns array of consent templates
     */
    fetchCdcConsentsForRegistration() {
        const consentList = [];
        const cdcActiveConsents = this.cdcConsentManagementService.getCdcConsentIDs();
        this.anonymousConsentsService.getTemplates().subscribe((templates) => {
            if (templates && templates.length > 0) {
                for (const template of templates) {
                    if (template.id && cdcActiveConsents.includes(template.id)) {
                        consentList.push(template);
                    }
                }
            }
        });
        return consentList;
    }
    /**
     * generates a form array with form control for each consent
     * @returns a form array
     */
    generateAdditionalConsentsFormControl() {
        const consentArray = this.fb.array([]);
        const templates = this.fetchCdcConsentsForRegistration();
        for (const _template of templates) {
            consentArray.push(new FormControl(false, [Validators.requiredTrue]));
        }
        return consentArray;
    }
    /**
     * creates an array of active cdc consents and makes them mandatory to be provided during registration
     * @returns consent templates in the necessary format for the component
     */
    getAdditionalConsents() {
        const templates = this.fetchCdcConsentsForRegistration();
        const returnConsents = [];
        for (const template of templates) {
            const returnConsent = {};
            returnConsent['template'] = template;
            returnConsent['required'] = true; //these consents are always mandatory
            returnConsents.push(returnConsent);
        }
        return returnConsents;
    }
}
CDCRegisterComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCRegisterComponentService, deps: [{ token: i1.UserRegisterFacade }, { token: i2.CommandService }, { token: i3.Store }, { token: i4.CdcJsService }, { token: i2.GlobalMessageService }, { token: i2.AuthService }, { token: i2.EventService }, { token: i1.UserProfileFacade }, { token: i4.CdcConsentManagementComponentService }, { token: i2.ConverterService }, { token: i5.UntypedFormBuilder }, { token: i2.AnonymousConsentsService }], target: i0.ɵɵFactoryTarget.Injectable });
CDCRegisterComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCRegisterComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCRegisterComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserRegisterFacade }, { type: i2.CommandService }, { type: i3.Store }, { type: i4.CdcJsService }, { type: i2.GlobalMessageService }, { type: i2.AuthService }, { type: i2.EventService }, { type: i1.UserProfileFacade }, { type: i4.CdcConsentManagementComponentService }, { type: i2.ConverterService }, { type: i5.UntypedFormBuilder }, { type: i2.AnonymousConsentsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLXJlZ2lzdGVyLWNvbXBvbmVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZGMvdXNlci1wcm9maWxlL3JlZ2lzdGVyL2NkYy1yZWdpc3Rlci1jb21wb25lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQ0wsV0FBVyxFQUVYLGtCQUFrQixFQUNsQixVQUFVLEdBQ1gsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3BDLE9BQU8sRUFDTCxvQ0FBb0MsRUFDcEMsWUFBWSxFQUNaLHlCQUF5QixFQUN6Qiw4QkFBOEIsR0FDL0IsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQ0wsd0JBQXdCLEVBQ3hCLFdBQVcsRUFFWCxjQUFjLEVBRWQsZ0JBQWdCLEVBQ2hCLFlBQVksRUFDWixvQkFBb0IsRUFDcEIsaUJBQWlCLEdBQ2xCLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDOUUsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixrQkFBa0IsR0FFbkIsTUFBTSw4QkFBOEIsQ0FBQztBQUN0QyxPQUFPLEVBQWMsS0FBSyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7QUFHN0QsTUFBTSxPQUFPLDJCQUE0QixTQUFRLHdCQUF3QjtJQXlCdkUsWUFDWSxrQkFBc0MsRUFDdEMsT0FBdUIsRUFDdkIsS0FBWSxFQUNaLFlBQTBCLEVBQzFCLG9CQUEwQyxFQUMxQyxX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QyxHQUFHLFFBQVEsQ0FBQztZQUNyQyxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMscUNBQXFDO1lBQ3ZFLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDcEM7UUFDRCxPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDOzt3SEFwS1UsMkJBQTJCOzRIQUEzQiwyQkFBMkI7MkZBQTNCLDJCQUEyQjtrQkFEdkMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEZvcm1Db250cm9sLFxuICBVbnR5cGVkRm9ybUFycmF5LFxuICBVbnR5cGVkRm9ybUJ1aWxkZXIsXG4gIFZhbGlkYXRvcnMsXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHtcbiAgQ2RjQ29uc2VudE1hbmFnZW1lbnRDb21wb25lbnRTZXJ2aWNlLFxuICBDZGNKc1NlcnZpY2UsXG4gIENkY0xvYWRVc2VyVG9rZW5GYWlsRXZlbnQsXG4gIENEQ19VU0VSX1BSRUZFUkVOQ0VfU0VSSUFMSVpFUixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jZGMvcm9vdCc7XG5pbXBvcnQge1xuICBBbm9ueW1vdXNDb25zZW50c1NlcnZpY2UsXG4gIEF1dGhTZXJ2aWNlLFxuICBDb21tYW5kLFxuICBDb21tYW5kU2VydmljZSxcbiAgQ29uc2VudFRlbXBsYXRlLFxuICBDb252ZXJ0ZXJTZXJ2aWNlLFxuICBFdmVudFNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvYWNjb3VudC9yb290JztcbmltcG9ydCB7IFJlZ2lzdGVyQ29tcG9uZW50U2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9wcm9maWxlL2NvbXBvbmVudHMnO1xuaW1wb3J0IHtcbiAgVXNlclByb2ZpbGVGYWNhZGUsXG4gIFVzZXJSZWdpc3RlckZhY2FkZSxcbiAgVXNlclNpZ25VcCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy91c2VyL3Byb2ZpbGUvcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBtZXJnZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ0RDUmVnaXN0ZXJDb21wb25lbnRTZXJ2aWNlIGV4dGVuZHMgUmVnaXN0ZXJDb21wb25lbnRTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIHJlZ2lzdGVyQ29tbWFuZDogQ29tbWFuZDx7IHVzZXI6IFVzZXJTaWduVXAgfSwgVXNlcj4gPVxuICAgIHRoaXMuY29tbWFuZC5jcmVhdGUoXG4gICAgICAoeyB1c2VyIH0pID0+XG4gICAgICAgIC8vIFJlZ2lzdGVyaW5nIHVzZXIgdGhyb3VnaCBDREMgR2lneWEgU0RLXG4gICAgICAgIHRoaXMuY2RjSlNTZXJ2aWNlLnJlZ2lzdGVyVXNlcldpdGhvdXRTY3JlZW5TZXQoXG4gICAgICAgICAgdXNlclxuICAgICAgICApIGFzIHVua25vd24gYXMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICk7XG5cbiAgcHJvdGVjdGVkIGxvYWRVc2VyVG9rZW5GYWlsZWQkOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy5ldmVudFNlcnZpY2VcbiAgICAuZ2V0KENkY0xvYWRVc2VyVG9rZW5GYWlsRXZlbnQpXG4gICAgLnBpcGUoXG4gICAgICBtYXAoKGV2ZW50KSA9PiAhIWV2ZW50KSxcbiAgICAgIHRhcCgoZmFpbGVkKSA9PiB7XG4gICAgICAgIGlmIChmYWlsZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVzZXIgdG9rZW4gZmFpbGVkIHRvIGxvYWQuYCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICBwcm90ZWN0ZWQgaXNMb2dnZWRJbiQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzLmF1dGhTZXJ2aWNlXG4gICAgLmlzVXNlckxvZ2dlZEluKClcbiAgICAucGlwZShmaWx0ZXIoKGxvZ2dlZEluKSA9PiBsb2dnZWRJbikpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB1c2VyUmVnaXN0ZXJGYWNhZGU6IFVzZXJSZWdpc3RlckZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgY29tbWFuZDogQ29tbWFuZFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHN0b3JlOiBTdG9yZSxcbiAgICBwcm90ZWN0ZWQgY2RjSlNTZXJ2aWNlOiBDZGNKc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdXNlclByb2ZpbGVGYWNhZGU6IFVzZXJQcm9maWxlRmFjYWRlLFxuICAgIHByb3RlY3RlZCBjZGNDb25zZW50TWFuYWdlbWVudFNlcnZpY2U6IENkY0NvbnNlbnRNYW5hZ2VtZW50Q29tcG9uZW50U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29udmVydGVyOiBDb252ZXJ0ZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBmYjogVW50eXBlZEZvcm1CdWlsZGVyLFxuICAgIHByb3RlY3RlZCBhbm9ueW1vdXNDb25zZW50c1NlcnZpY2U6IEFub255bW91c0NvbnNlbnRzU2VydmljZVxuICApIHtcbiAgICBzdXBlcih1c2VyUmVnaXN0ZXJGYWNhZGUsIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlLCBmYik7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYSBuZXcgdXNlciB1c2luZyBDREMgU0RLLlxuICAgKlxuICAgKiBAcGFyYW0gdXNlciBhcyBVc2VyU2lnblVwXG4gICAqL1xuICByZWdpc3Rlcih1c2VyOiBVc2VyU2lnblVwKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgaWYgKCF1c2VyLmZpcnN0TmFtZSB8fCAhdXNlci5sYXN0TmFtZSB8fCAhdXNlci51aWQgfHwgIXVzZXIucGFzc3dvcmQpIHtcbiAgICAgIHJldHVybiB0aHJvd0Vycm9yKGBUaGUgcHJvdmlkZWQgdXNlciBpcyBub3QgdmFsaWQ6ICR7dXNlcn1gKTtcbiAgICB9XG4gICAgLyoqIGZpbGwgdGhlIHVzZXIgcHJlZmVyZW5jZXMgKi9cbiAgICB1c2VyLnByZWZlcmVuY2VzID0gdGhpcy5nZW5lcmF0ZVByZWZlcmVuY2VzT2JqZWN0KCk7XG4gICAgcmV0dXJuIHRoaXMuY2RjSlNTZXJ2aWNlLmRpZExvYWQoKS5waXBlKFxuICAgICAgdGFwKChjZGNMb2FkZWQpID0+IHtcbiAgICAgICAgaWYgKCFjZGNMb2FkZWQpIHtcbiAgICAgICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAga2V5OiAnZXJyb3JIYW5kbGVycy5zY3JpcHRGYWlsZWRUb0xvYWQnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0VSUk9SXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENEQyBzY3JpcHQgZGlkbid0IGxvYWQuYCk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgc3dpdGNoTWFwKCgpID0+XG4gICAgICAgIC8vIExvZ2dpbmcgaW4gdXNpbmcgQ0RDIEdpZ3lhIFNESywgdXBkYXRlIHRoZSByZWdpc3RlckNvbW1hbmRcbiAgICAgICAgdGhpcy5yZWdpc3RlckNvbW1hbmQuZXhlY3V0ZSh7IHVzZXIgfSlcbiAgICAgICksXG4gICAgICBzd2l0Y2hNYXAoKCkgPT5cbiAgICAgICAgbWVyZ2UodGhpcy5sb2FkVXNlclRva2VuRmFpbGVkJCwgdGhpcy5pc0xvZ2dlZEluJCkucGlwZShcbiAgICAgICAgICBtYXAoKCkgPT4ge1xuICAgICAgICAgICAgLy91cGRhdGUgdXNlciB0aXRsZSBjb2RlXG4gICAgICAgICAgICB0aGlzLnVzZXJQcm9maWxlRmFjYWRlLnVwZGF0ZSh1c2VyKTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICApLFxuICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlclByb2ZpbGVGYWNhZGVcbiAgICAgICAgICAuZ2V0KClcbiAgICAgICAgICAucGlwZShmaWx0ZXIoKHVzZXJPYmopOiB1c2VyT2JqIGlzIFVzZXIgPT4gQm9vbGVhbih1c2VyT2JqKSkpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBwcmVmZXJlbmNlcyBvYmplY3QgdGhhdCBuZWVkcyB0byBiZSB1cGRhdGVkIGR1cmluZyByZWdpc3RlciBwcm9jZXNzXG4gICAqIEByZXR1cm5zIHByZWZlcmVuY2Ugb2JqZWN0XG4gICAqL1xuICBnZW5lcmF0ZVByZWZlcmVuY2VzT2JqZWN0KCk6IGFueSB7XG4gICAgbGV0IHByZWZlcmVuY2VzID0gbnVsbDtcbiAgICBjb25zdCBjb25zZW50SURzID0gdGhpcy5jZGNDb25zZW50TWFuYWdlbWVudFNlcnZpY2UuZ2V0Q2RjQ29uc2VudElEcygpOyAvL2ZldGNoIGFsbCBhY3RpdmUgY29uc2VudHNcbiAgICBmb3IgKGNvbnN0IGlkIG9mIGNvbnNlbnRJRHMpIHtcbiAgICAgIGNvbnN0IGNvbnNlbnQ6IENvbnNlbnRUZW1wbGF0ZSA9IHt9O1xuICAgICAgY29uc2VudC5pZCA9IGlkO1xuICAgICAgY29uc2VudC5jdXJyZW50Q29uc2VudCA9IHt9O1xuICAgICAgY29uc2VudC5jdXJyZW50Q29uc2VudC5jb25zZW50R2l2ZW5EYXRlID0gbmV3IERhdGUoKTtcbiAgICAgIGNvbnN0IHNlcmlhbGl6ZWRQcmVmZXJlbmNlOiBhbnkgPSB0aGlzLmNvbnZlcnRlci5jb252ZXJ0KFxuICAgICAgICBjb25zZW50LFxuICAgICAgICBDRENfVVNFUl9QUkVGRVJFTkNFX1NFUklBTElaRVJcbiAgICAgICk7XG4gICAgICBwcmVmZXJlbmNlcyA9IE9iamVjdC5hc3NpZ24ocHJlZmVyZW5jZXMgPz8ge30sIHNlcmlhbGl6ZWRQcmVmZXJlbmNlKTtcbiAgICB9XG4gICAgcmV0dXJuIHByZWZlcmVuY2VzO1xuICB9XG5cbiAgLy8gQG92ZXJyaWRlXG4gIHBvc3RSZWdpc3Rlck1lc3NhZ2UoKTogdm9pZCB7XG4gICAgLy8gZG9uJ3Qgc2hvdyB0aGUgbWVzc2FnZVxuICB9XG5cbiAgLyoqXG4gICAqIGZldGNoIGNvbnNlbnRzIHRoYXQgZXhpc3QgaW4gY29tbWVyY2UgYW5kIGlzIGFjdGl2ZSBpbiBjZGNcbiAgICogQHJldHVybnMgYXJyYXkgb2YgY29uc2VudCB0ZW1wbGF0ZXNcbiAgICovXG4gIGZldGNoQ2RjQ29uc2VudHNGb3JSZWdpc3RyYXRpb24oKTogQ29uc2VudFRlbXBsYXRlW10ge1xuICAgIGNvbnN0IGNvbnNlbnRMaXN0OiBDb25zZW50VGVtcGxhdGVbXSA9IFtdO1xuICAgIGNvbnN0IGNkY0FjdGl2ZUNvbnNlbnRzOiBzdHJpbmdbXSA9XG4gICAgICB0aGlzLmNkY0NvbnNlbnRNYW5hZ2VtZW50U2VydmljZS5nZXRDZGNDb25zZW50SURzKCk7XG4gICAgdGhpcy5hbm9ueW1vdXNDb25zZW50c1NlcnZpY2UuZ2V0VGVtcGxhdGVzKCkuc3Vic2NyaWJlKCh0ZW1wbGF0ZXMpID0+IHtcbiAgICAgIGlmICh0ZW1wbGF0ZXMgJiYgdGVtcGxhdGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yIChjb25zdCB0ZW1wbGF0ZSBvZiB0ZW1wbGF0ZXMpIHtcbiAgICAgICAgICBpZiAodGVtcGxhdGUuaWQgJiYgY2RjQWN0aXZlQ29uc2VudHMuaW5jbHVkZXModGVtcGxhdGUuaWQpKSB7XG4gICAgICAgICAgICBjb25zZW50TGlzdC5wdXNoKHRlbXBsYXRlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY29uc2VudExpc3Q7XG4gIH1cblxuICAvKipcbiAgICogZ2VuZXJhdGVzIGEgZm9ybSBhcnJheSB3aXRoIGZvcm0gY29udHJvbCBmb3IgZWFjaCBjb25zZW50XG4gICAqIEByZXR1cm5zIGEgZm9ybSBhcnJheVxuICAgKi9cbiAgZ2VuZXJhdGVBZGRpdGlvbmFsQ29uc2VudHNGb3JtQ29udHJvbCgpOiBVbnR5cGVkRm9ybUFycmF5IHtcbiAgICBjb25zdCBjb25zZW50QXJyYXkgPSB0aGlzLmZiLmFycmF5KFtdKTtcbiAgICBjb25zdCB0ZW1wbGF0ZXM6IENvbnNlbnRUZW1wbGF0ZVtdID0gdGhpcy5mZXRjaENkY0NvbnNlbnRzRm9yUmVnaXN0cmF0aW9uKCk7XG4gICAgZm9yIChjb25zdCBfdGVtcGxhdGUgb2YgdGVtcGxhdGVzKSB7XG4gICAgICBjb25zZW50QXJyYXkucHVzaChuZXcgRm9ybUNvbnRyb2woZmFsc2UsIFtWYWxpZGF0b3JzLnJlcXVpcmVkVHJ1ZV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnNlbnRBcnJheTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjcmVhdGVzIGFuIGFycmF5IG9mIGFjdGl2ZSBjZGMgY29uc2VudHMgYW5kIG1ha2VzIHRoZW0gbWFuZGF0b3J5IHRvIGJlIHByb3ZpZGVkIGR1cmluZyByZWdpc3RyYXRpb25cbiAgICogQHJldHVybnMgY29uc2VudCB0ZW1wbGF0ZXMgaW4gdGhlIG5lY2Vzc2FyeSBmb3JtYXQgZm9yIHRoZSBjb21wb25lbnRcbiAgICovXG4gIGdldEFkZGl0aW9uYWxDb25zZW50cygpOiB7XG4gICAgdGVtcGxhdGU6IENvbnNlbnRUZW1wbGF0ZTtcbiAgICByZXF1aXJlZDogYm9vbGVhbjtcbiAgfVtdIHtcbiAgICBjb25zdCB0ZW1wbGF0ZXM6IENvbnNlbnRUZW1wbGF0ZVtdID0gdGhpcy5mZXRjaENkY0NvbnNlbnRzRm9yUmVnaXN0cmF0aW9uKCk7XG4gICAgY29uc3QgcmV0dXJuQ29uc2VudHM6IHtcbiAgICAgIHRlbXBsYXRlOiBDb25zZW50VGVtcGxhdGU7XG4gICAgICByZXF1aXJlZDogYm9vbGVhbjtcbiAgICB9W10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IHRlbXBsYXRlIG9mIHRlbXBsYXRlcykge1xuICAgICAgY29uc3QgcmV0dXJuQ29uc2VudDogYW55ID0ge307XG4gICAgICByZXR1cm5Db25zZW50Wyd0ZW1wbGF0ZSddID0gdGVtcGxhdGU7XG4gICAgICByZXR1cm5Db25zZW50WydyZXF1aXJlZCddID0gdHJ1ZTsgLy90aGVzZSBjb25zZW50cyBhcmUgYWx3YXlzIG1hbmRhdG9yeVxuICAgICAgcmV0dXJuQ29uc2VudHMucHVzaChyZXR1cm5Db25zZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybkNvbnNlbnRzO1xuICB9XG59XG4iXX0=