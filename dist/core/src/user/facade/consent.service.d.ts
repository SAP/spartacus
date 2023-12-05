import { Observable } from 'rxjs';
import { AnonymousConsentsService } from '../../anonymous-consents/index';
import { AnonymousConsent, Consent } from '../../model/index';
import { UserConsentService } from './user-consent.service';
import * as i0 from "@angular/core";
/**
 * Unified facade for both anonymous and registered user consents.
 */
export declare class ConsentService {
    protected anonymousConsentsService: AnonymousConsentsService;
    protected userConsentService: UserConsentService;
    constructor(anonymousConsentsService: AnonymousConsentsService, userConsentService: UserConsentService);
    /**
     * Returns either anonymous consent or registered consent as they are emitted.
     * @param templateCode for which to return either anonymous or registered consent.
     */
    getConsent(templateCode: string): Observable<AnonymousConsent | Consent | undefined>;
    /**
     * Checks if the `templateId`'s template has a given consent.
     * The method returns `false` if the consent doesn't exist or if it's withdrawn. Otherwise, `true` is returned.
     *
     * @param templateId of a template which's consent should be checked
     */
    checkConsentGivenByTemplateId(templateId: string): Observable<boolean>;
    /**
     * Checks if the `templateId`'s template has a withdrawn consent.
     * The method returns `true` if the consent doesn't exist or if it's withdrawn. Otherwise, `false` is returned.
     *
     * @param templateId of a template which's consent should be checked
     */
    checkConsentWithdrawnByTemplateId(templateId: string): Observable<boolean>;
    /**
     *
     * Checks the provided `consent`'s type and delegates to an appropriate method - `anonymousConsentsService.isConsentGiven(consent)` or `this.userConsentService.isConsentGiven`
     *
     * @param consent a consent to check
     */
    isConsentGiven(consent: AnonymousConsent | Consent): boolean;
    /**
     *
     * Checks the provided `consent`'s type and delegates to an appropriate method - `anonymousConsentsService.isConsentWithdrawn(consent)` or `this.userConsentService.isConsentWithdrawn`
     *
     * @param consent a consent to check
     */
    isConsentWithdrawn(consent: AnonymousConsent | Consent): boolean;
    /**
     * Returns `true` if the provided consent is of type `AnonymousConsent`. Otherwise, `false` is returned.
     */
    isAnonymousConsentType(consent: AnonymousConsent | Consent): consent is AnonymousConsent;
    /**
     * Returns `true` if the provided consent is of type `Consent`. Otherwise, `false` is returned.
     */
    isConsentType(consent: AnonymousConsent | Consent): consent is Consent;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConsentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConsentService>;
}
