import { Subscription } from 'rxjs';
import { StatePersistenceService } from '@spartacus/core';
import { OnDestroy } from '@angular/core';
import { CdcLocalStorageTemplate, CdcSiteConsentTemplate } from '../model/index';
import * as i0 from "@angular/core";
export declare class CdcConsentsLocalStorageService implements OnDestroy {
    protected statePersistenceService: StatePersistenceService;
    constructor(statePersistenceService: StatePersistenceService);
    protected subscription: Subscription;
    /**
     * saves active cdc consents to storage
     * @param siteConsent - cdc site consent details
     */
    persistCdcConsentsToStorage(siteConsent: CdcSiteConsentTemplate): void;
    /**
     * Returns cdc consents from storage
     * @returns cdc consents
     */
    readCdcConsentsFromStorage(): CdcLocalStorageTemplate[];
    /**
     * Returns true if input consent is present in storage, else returns false
     * @param consentId - cdc consent id
     * @returns - returns true/false
     */
    checkIfConsentExists(consentId: string): boolean;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdcConsentsLocalStorageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdcConsentsLocalStorageService>;
}
