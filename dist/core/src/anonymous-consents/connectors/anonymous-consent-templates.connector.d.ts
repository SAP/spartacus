import { Observable } from 'rxjs';
import { AnonymousConsent, ConsentTemplate } from '../../model/consent.model';
import { AnonymousConsentTemplatesAdapter } from './anonymous-consent-templates.adapter';
import * as i0 from "@angular/core";
export declare class AnonymousConsentTemplatesConnector {
    protected adapter: AnonymousConsentTemplatesAdapter;
    constructor(adapter: AnonymousConsentTemplatesAdapter);
    loadAnonymousConsentTemplates(): Observable<ConsentTemplate[]>;
    loadAnonymousConsents(): Observable<AnonymousConsent[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AnonymousConsentTemplatesConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AnonymousConsentTemplatesConnector>;
}
