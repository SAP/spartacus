import { ConsentTemplate } from '@spartacus/core';
import { ConsentManagementComponentService } from '@spartacus/storefront';
import { CdcConsentsLocalStorageService } from './cdc-consents-local-storage.service';
import * as i0 from "@angular/core";
export declare class CdcConsentManagementComponentService extends ConsentManagementComponentService {
    protected store: CdcConsentsLocalStorageService;
    constructor(store: CdcConsentsLocalStorageService);
    getRequiredConsents(templateList: ConsentTemplate[]): string[];
    /**
     * Returns cdc consents from store
     * @param mandatoryConsents - if passed true, only mandatory consents will be returned.
     * if passed false, all active consents (irrespective of whether they are mandatory or not)
     * @returns array of consents
     */
    getCdcConsentIDs(mandatoryConsents?: boolean): string[];
    static ɵfac: i0.ɵɵFactoryDeclaration<CdcConsentManagementComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdcConsentManagementComponentService>;
}
