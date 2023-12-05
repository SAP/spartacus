import { HttpClient } from '@angular/common/http';
import { ConsentTemplate, ConverterService, OccEndpointsService, OccUserConsentAdapter } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CdcConsentsLocalStorageService } from './services/cdc-consents-local-storage.service';
import { CdcUserConsentService } from './services/cdc-user-consent.service';
import * as i0 from "@angular/core";
export declare class CdcUserConsentAdapter extends OccUserConsentAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    protected cdcUserConsentService: CdcUserConsentService;
    protected cdcConsentsStorage: CdcConsentsLocalStorageService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService, cdcUserConsentService: CdcUserConsentService, cdcConsentsStorage: CdcConsentsLocalStorageService);
    loadConsents(userId: string): Observable<ConsentTemplate[]>;
    giveConsent(userId: string, consentTemplateId: string, consentTemplateVersion: number): Observable<ConsentTemplate>;
    withdrawConsent(userId: string, consentCode: string, consentId?: string): Observable<{}>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdcUserConsentAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdcUserConsentAdapter>;
}
