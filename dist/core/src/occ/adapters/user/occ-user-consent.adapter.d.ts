import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConsentTemplate } from '../../../model/consent.model';
import { UserConsentAdapter } from '../../../user/connectors/consent/user-consent.adapter';
import { ConverterService } from '../../../util/converter.service';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import * as i0 from "@angular/core";
export declare class OccUserConsentAdapter implements UserConsentAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    loadConsents(userId: string): Observable<ConsentTemplate[]>;
    giveConsent(userId: string, consentTemplateId: string, consentTemplateVersion: number): Observable<ConsentTemplate>;
    withdrawConsent(userId: string, consentCode: string): Observable<{}>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccUserConsentAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccUserConsentAdapter>;
}
