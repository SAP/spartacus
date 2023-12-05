import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnonymousConsentTemplatesAdapter } from '../../../anonymous-consents/connectors/anonymous-consent-templates.adapter';
import { AnonymousConsent, ConsentTemplate } from '../../../model/consent.model';
import { ConverterService } from '../../../util/converter.service';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import * as i0 from "@angular/core";
export declare class OccAnonymousConsentTemplatesAdapter implements AnonymousConsentTemplatesAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    loadAnonymousConsentTemplates(): Observable<ConsentTemplate[]>;
    loadAnonymousConsents(): Observable<AnonymousConsent[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccAnonymousConsentTemplatesAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccAnonymousConsentTemplatesAdapter>;
}
