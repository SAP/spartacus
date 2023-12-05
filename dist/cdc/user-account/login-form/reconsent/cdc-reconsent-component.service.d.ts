import { OnDestroy } from '@angular/core';
import { GlobalMessageService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { LaunchDialogService } from '@spartacus/storefront';
import { CdcJsService, CdcUserConsentService } from '@spartacus/cdc/root';
import * as i0 from "@angular/core";
export declare class CdcReconsentComponentService implements OnDestroy {
    protected cdcUserConsentService: CdcUserConsentService;
    protected cdcJsService: CdcJsService;
    protected globalMessageService: GlobalMessageService;
    protected launchDialogService: LaunchDialogService;
    constructor(cdcUserConsentService: CdcUserConsentService, cdcJsService: CdcJsService, globalMessageService: GlobalMessageService, launchDialogService: LaunchDialogService);
    protected subscription: Subscription;
    /**
     * saves the consent given from reconsent pop-up and triggers a re-login
     * @param consentId - array of consent IDs
     * @param userParams - data from login session
     */
    saveConsentAndLogin(consentId: string[], userParams: any): void;
    /**
     * Displays error message after closing reconsent dialog
     */
    handleReconsentUpdateError(reason?: string, errorMessage?: string): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdcReconsentComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdcReconsentComponentService>;
}
