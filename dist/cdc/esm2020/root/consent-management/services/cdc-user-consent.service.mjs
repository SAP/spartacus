/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ConverterService, LanguageService, } from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { throwError } from 'rxjs';
import { CdcConsentsLocalStorageService } from './cdc-consents-local-storage.service';
import { CDC_USER_PREFERENCE_SERIALIZER } from '../converters/converter';
import { tap } from 'rxjs/operators';
import { CdcJsService } from '../../service';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/user/profile/root";
import * as i3 from "../../service";
import * as i4 from "./cdc-consents-local-storage.service";
export class CdcUserConsentService {
    constructor(languageService, userProfileFacade, cdcJsService, converter, cdcConsentsStorage) {
        this.languageService = languageService;
        this.userProfileFacade = userProfileFacade;
        this.cdcJsService = cdcJsService;
        this.converter = converter;
        this.cdcConsentsStorage = cdcConsentsStorage;
    }
    /**
     *
     * @param isConsentGranted - set true - if consent is given; false - if consent is withdrawn
     * @param consentCodes - array of cdc consent ids
     * @param user - If user is not passed, the logged in user id will be fetched and used. If passed, it will be considered.
     * @param regToken - token
     * @returns - returns Observable with error code and status
     */
    updateCdcConsent(isConsentGranted, consentCodes, user, regToken) {
        let consent;
        let serializedPreference = {};
        for (const consentCode of consentCodes) {
            consent = {};
            consent.id = consentCode;
            consent.currentConsent = {};
            if (isConsentGranted) {
                consent.currentConsent.consentGivenDate = new Date();
            }
            else {
                consent.currentConsent.consentWithdrawnDate = new Date();
            }
            const preference = this.converter.convert(consent, CDC_USER_PREFERENCE_SERIALIZER);
            serializedPreference = Object.assign(serializedPreference, preference);
        }
        let userId = '';
        if (user === undefined) {
            userId = this.getUserID() ?? '';
        }
        else if (user !== undefined) {
            userId = user;
        }
        const currentLanguage = this.getActiveLanguage();
        return this.cdcJsService
            .setUserConsentPreferences(userId, currentLanguage, serializedPreference, regToken)
            .pipe(tap({
            error: (error) => {
                throwError(error);
            },
        }));
    }
    /**
     * Returns logged in User ID
     * @returns user id
     */
    getUserID() {
        let uid;
        this.userProfileFacade.get().subscribe((user) => {
            uid = user?.uid;
        });
        return uid;
    }
    /**
     * Returns current language of the current site
     * @returns language iso code
     */
    getActiveLanguage() {
        let currentLanguage = '';
        this.languageService
            .getActive()
            .subscribe((language) => (currentLanguage = language))
            .unsubscribe();
        return currentLanguage;
    }
}
CdcUserConsentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserConsentService, deps: [{ token: i1.LanguageService }, { token: i2.UserProfileFacade }, { token: i3.CdcJsService }, { token: i1.ConverterService }, { token: i4.CdcConsentsLocalStorageService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcUserConsentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserConsentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserConsentService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.LanguageService }, { type: i2.UserProfileFacade }, { type: i3.CdcJsService }, { type: i1.ConverterService }, { type: i4.CdcConsentsLocalStorageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLXVzZXItY29uc2VudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZGMvcm9vdC9jb25zZW50LW1hbmFnZW1lbnQvc2VydmljZXMvY2RjLXVzZXItY29uc2VudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFFTCxnQkFBZ0IsRUFDaEIsZUFBZSxHQUNoQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdEYsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7OztBQUc3QyxNQUFNLE9BQU8scUJBQXFCO0lBQ2hDLFlBQ1ksZUFBZ0MsRUFDaEMsaUJBQW9DLEVBQ3BDLFlBQTBCLEVBQzFCLFNBQTJCLEVBQzNCLGtCQUFrRDtRQUpsRCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUMzQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQWdDO0lBQzNELENBQUM7SUFFSjs7Ozs7OztPQU9HO0lBQ0gsZ0JBQWdCLENBQ2QsZ0JBQXlCLEVBQ3pCLFlBQXNCLEVBQ3RCLElBQWEsRUFDYixRQUFpQjtRQUVqQixJQUFJLE9BQXdCLENBQUM7UUFDN0IsSUFBSSxvQkFBb0IsR0FBUSxFQUFFLENBQUM7UUFDbkMsS0FBSyxNQUFNLFdBQVcsSUFBSSxZQUFZLEVBQUU7WUFDdEMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNiLE9BQU8sQ0FBQyxFQUFFLEdBQUcsV0FBVyxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1lBQzVCLElBQUksZ0JBQWdCLEVBQUU7Z0JBQ3BCLE9BQU8sQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQzthQUN0RDtpQkFBTTtnQkFDTCxPQUFPLENBQUMsY0FBYyxDQUFDLG9CQUFvQixHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7YUFDMUQ7WUFDRCxNQUFNLFVBQVUsR0FBUSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FDNUMsT0FBTyxFQUNQLDhCQUE4QixDQUMvQixDQUFDO1lBQ0Ysb0JBQW9CLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUN4RTtRQUNELElBQUksTUFBTSxHQUFXLEVBQUUsQ0FBQztRQUN4QixJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDdEIsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7U0FDakM7YUFBTSxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDN0IsTUFBTSxHQUFHLElBQUksQ0FBQztTQUNmO1FBRUQsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFakQsT0FBTyxJQUFJLENBQUMsWUFBWTthQUNyQix5QkFBeUIsQ0FDeEIsTUFBTSxFQUNOLGVBQWUsRUFDZixvQkFBb0IsRUFDcEIsUUFBUSxDQUNUO2FBQ0EsSUFBSSxDQUNILEdBQUcsQ0FBQztZQUNGLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNmLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQixDQUFDO1NBQ0YsQ0FBQyxDQUNILENBQUM7SUFDTixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsU0FBUztRQUNQLElBQUksR0FBdUIsQ0FBQztRQUM1QixJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDOUMsR0FBRyxHQUFHLElBQUksRUFBRSxHQUFHLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRDs7O09BR0c7SUFDSCxpQkFBaUI7UUFDZixJQUFJLGVBQWUsR0FBVyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLGVBQWU7YUFDakIsU0FBUyxFQUFFO2FBQ1gsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUMsQ0FBQzthQUNyRCxXQUFXLEVBQUUsQ0FBQztRQUNqQixPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDOztrSEF4RlUscUJBQXFCO3NIQUFyQixxQkFBcUIsY0FEUixNQUFNOzJGQUNuQixxQkFBcUI7a0JBRGpDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29uc2VudFRlbXBsYXRlLFxuICBDb252ZXJ0ZXJTZXJ2aWNlLFxuICBMYW5ndWFnZVNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBVc2VyUHJvZmlsZUZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9wcm9maWxlL3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ2RjQ29uc2VudHNMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9jZGMtY29uc2VudHMtbG9jYWwtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IENEQ19VU0VSX1BSRUZFUkVOQ0VfU0VSSUFMSVpFUiB9IGZyb20gJy4uL2NvbnZlcnRlcnMvY29udmVydGVyJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENkY0pzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIENkY1VzZXJDb25zZW50U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdXNlclByb2ZpbGVGYWNhZGU6IFVzZXJQcm9maWxlRmFjYWRlLFxuICAgIHByb3RlY3RlZCBjZGNKc1NlcnZpY2U6IENkY0pzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29udmVydGVyOiBDb252ZXJ0ZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjZGNDb25zZW50c1N0b3JhZ2U6IENkY0NvbnNlbnRzTG9jYWxTdG9yYWdlU2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBpc0NvbnNlbnRHcmFudGVkIC0gc2V0IHRydWUgLSBpZiBjb25zZW50IGlzIGdpdmVuOyBmYWxzZSAtIGlmIGNvbnNlbnQgaXMgd2l0aGRyYXduXG4gICAqIEBwYXJhbSBjb25zZW50Q29kZXMgLSBhcnJheSBvZiBjZGMgY29uc2VudCBpZHNcbiAgICogQHBhcmFtIHVzZXIgLSBJZiB1c2VyIGlzIG5vdCBwYXNzZWQsIHRoZSBsb2dnZWQgaW4gdXNlciBpZCB3aWxsIGJlIGZldGNoZWQgYW5kIHVzZWQuIElmIHBhc3NlZCwgaXQgd2lsbCBiZSBjb25zaWRlcmVkLlxuICAgKiBAcGFyYW0gcmVnVG9rZW4gLSB0b2tlblxuICAgKiBAcmV0dXJucyAtIHJldHVybnMgT2JzZXJ2YWJsZSB3aXRoIGVycm9yIGNvZGUgYW5kIHN0YXR1c1xuICAgKi9cbiAgdXBkYXRlQ2RjQ29uc2VudChcbiAgICBpc0NvbnNlbnRHcmFudGVkOiBib29sZWFuLFxuICAgIGNvbnNlbnRDb2Rlczogc3RyaW5nW10sXG4gICAgdXNlcj86IHN0cmluZyxcbiAgICByZWdUb2tlbj86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPHsgZXJyb3JDb2RlOiBudW1iZXI7IGVycm9yTWVzc2FnZTogc3RyaW5nIH0+IHtcbiAgICBsZXQgY29uc2VudDogQ29uc2VudFRlbXBsYXRlO1xuICAgIGxldCBzZXJpYWxpemVkUHJlZmVyZW5jZTogYW55ID0ge307XG4gICAgZm9yIChjb25zdCBjb25zZW50Q29kZSBvZiBjb25zZW50Q29kZXMpIHtcbiAgICAgIGNvbnNlbnQgPSB7fTtcbiAgICAgIGNvbnNlbnQuaWQgPSBjb25zZW50Q29kZTtcbiAgICAgIGNvbnNlbnQuY3VycmVudENvbnNlbnQgPSB7fTtcbiAgICAgIGlmIChpc0NvbnNlbnRHcmFudGVkKSB7XG4gICAgICAgIGNvbnNlbnQuY3VycmVudENvbnNlbnQuY29uc2VudEdpdmVuRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zZW50LmN1cnJlbnRDb25zZW50LmNvbnNlbnRXaXRoZHJhd25EYXRlID0gbmV3IERhdGUoKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHByZWZlcmVuY2U6IGFueSA9IHRoaXMuY29udmVydGVyLmNvbnZlcnQoXG4gICAgICAgIGNvbnNlbnQsXG4gICAgICAgIENEQ19VU0VSX1BSRUZFUkVOQ0VfU0VSSUFMSVpFUlxuICAgICAgKTtcbiAgICAgIHNlcmlhbGl6ZWRQcmVmZXJlbmNlID0gT2JqZWN0LmFzc2lnbihzZXJpYWxpemVkUHJlZmVyZW5jZSwgcHJlZmVyZW5jZSk7XG4gICAgfVxuICAgIGxldCB1c2VySWQ6IHN0cmluZyA9ICcnO1xuICAgIGlmICh1c2VyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHVzZXJJZCA9IHRoaXMuZ2V0VXNlcklEKCkgPz8gJyc7XG4gICAgfSBlbHNlIGlmICh1c2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHVzZXJJZCA9IHVzZXI7XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudExhbmd1YWdlID0gdGhpcy5nZXRBY3RpdmVMYW5ndWFnZSgpO1xuXG4gICAgcmV0dXJuIHRoaXMuY2RjSnNTZXJ2aWNlXG4gICAgICAuc2V0VXNlckNvbnNlbnRQcmVmZXJlbmNlcyhcbiAgICAgICAgdXNlcklkLFxuICAgICAgICBjdXJyZW50TGFuZ3VhZ2UsXG4gICAgICAgIHNlcmlhbGl6ZWRQcmVmZXJlbmNlLFxuICAgICAgICByZWdUb2tlblxuICAgICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcCh7XG4gICAgICAgICAgZXJyb3I6IChlcnJvcikgPT4ge1xuICAgICAgICAgICAgdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBsb2dnZWQgaW4gVXNlciBJRFxuICAgKiBAcmV0dXJucyB1c2VyIGlkXG4gICAqL1xuICBnZXRVc2VySUQoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBsZXQgdWlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgdGhpcy51c2VyUHJvZmlsZUZhY2FkZS5nZXQoKS5zdWJzY3JpYmUoKHVzZXIpID0+IHtcbiAgICAgIHVpZCA9IHVzZXI/LnVpZDtcbiAgICB9KTtcbiAgICByZXR1cm4gdWlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgY3VycmVudCBsYW5ndWFnZSBvZiB0aGUgY3VycmVudCBzaXRlXG4gICAqIEByZXR1cm5zIGxhbmd1YWdlIGlzbyBjb2RlXG4gICAqL1xuICBnZXRBY3RpdmVMYW5ndWFnZSgpOiBzdHJpbmcge1xuICAgIGxldCBjdXJyZW50TGFuZ3VhZ2U6IHN0cmluZyA9ICcnO1xuICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlXG4gICAgICAuZ2V0QWN0aXZlKClcbiAgICAgIC5zdWJzY3JpYmUoKGxhbmd1YWdlKSA9PiAoY3VycmVudExhbmd1YWdlID0gbGFuZ3VhZ2UpKVxuICAgICAgLnVuc3Vic2NyaWJlKCk7XG4gICAgcmV0dXJuIGN1cnJlbnRMYW5ndWFnZTtcbiAgfVxufVxuIl19