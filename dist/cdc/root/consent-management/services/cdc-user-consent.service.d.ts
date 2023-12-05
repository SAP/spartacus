import { ConverterService, LanguageService } from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import { CdcConsentsLocalStorageService } from './cdc-consents-local-storage.service';
import { CdcJsService } from '../../service';
import * as i0 from "@angular/core";
export declare class CdcUserConsentService {
    protected languageService: LanguageService;
    protected userProfileFacade: UserProfileFacade;
    protected cdcJsService: CdcJsService;
    protected converter: ConverterService;
    protected cdcConsentsStorage: CdcConsentsLocalStorageService;
    constructor(languageService: LanguageService, userProfileFacade: UserProfileFacade, cdcJsService: CdcJsService, converter: ConverterService, cdcConsentsStorage: CdcConsentsLocalStorageService);
    /**
     *
     * @param isConsentGranted - set true - if consent is given; false - if consent is withdrawn
     * @param consentCodes - array of cdc consent ids
     * @param user - If user is not passed, the logged in user id will be fetched and used. If passed, it will be considered.
     * @param regToken - token
     * @returns - returns Observable with error code and status
     */
    updateCdcConsent(isConsentGranted: boolean, consentCodes: string[], user?: string, regToken?: string): Observable<{
        errorCode: number;
        errorMessage: string;
    }>;
    /**
     * Returns logged in User ID
     * @returns user id
     */
    getUserID(): string | undefined;
    /**
     * Returns current language of the current site
     * @returns language iso code
     */
    getActiveLanguage(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdcUserConsentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdcUserConsentService>;
}
