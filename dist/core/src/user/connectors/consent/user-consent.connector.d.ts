import { Observable } from 'rxjs';
import { UserConsentAdapter } from './user-consent.adapter';
import { ConsentTemplate } from '../../../model/consent.model';
import * as i0 from "@angular/core";
export declare class UserConsentConnector {
    protected adapter: UserConsentAdapter;
    constructor(adapter: UserConsentAdapter);
    loadConsents(userId: string): Observable<ConsentTemplate[]>;
    giveConsent(userId: string, consentTemplateId: string, consentTemplateVersion: number): Observable<ConsentTemplate>;
    withdrawConsent(userId: string, consentCode: string, consentId?: string): Observable<{}>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserConsentConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserConsentConnector>;
}
