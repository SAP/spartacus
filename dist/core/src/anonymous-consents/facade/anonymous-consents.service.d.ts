import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/user-auth/facade/auth.service';
import { AnonymousConsent, ConsentTemplate } from '../../model/index';
import { StateWithAnonymousConsents } from '../store/anonymous-consents-state';
import * as i0 from "@angular/core";
export declare class AnonymousConsentsService {
    protected store: Store<StateWithAnonymousConsents>;
    protected authService: AuthService;
    constructor(store: Store<StateWithAnonymousConsents>, authService: AuthService);
    /**
     * Retrieves the anonymous consent templates.
     */
    loadTemplates(): void;
    /**
     * Conditionally triggers the load of the anonymous consent templates if:
     *   - `loadIfMissing` parameter is set to `true`
     *   - the `templates` in the store are `undefined`
     *
     * Otherwise it just returns the value from the store.
     *
     * @param loadIfMissing setting to `true` will trigger the load of the templates if the currently stored templates are `undefined`
     */
    getTemplates(loadIfMissing?: boolean): Observable<ConsentTemplate[]>;
    /**
     * Returns the anonymous consent templates with the given template code.
     * @param templateCode a template code by which to filter anonymous consent templates.
     */
    getTemplate(templateCode: string): Observable<ConsentTemplate | undefined>;
    /**
     * Returns an indicator for the loading status for the anonymous consent templates.
     */
    getLoadTemplatesLoading(): Observable<boolean>;
    /**
     * Returns an indicator for the success status for the anonymous consent templates.
     */
    getLoadTemplatesSuccess(): Observable<boolean>;
    /**
     * Returns an indicator for the error status for the anonymous consent templates.
     */
    getLoadTemplatesError(): Observable<boolean>;
    /**
     * Resets the loading, success and error indicators for the anonymous consent templates.
     */
    resetLoadTemplatesState(): void;
    /**
     * Returns all the anonymous consents.
     */
    getConsents(): Observable<AnonymousConsent[]>;
    /**
     * Puts the provided anonymous consents into the store.
     */
    setConsents(consents: AnonymousConsent[]): void;
    /**
     * Returns the anonymous consent for the given template ID.
     *
     * As a side-effect, the method will call `getTemplates(true)` to load the templates if those are not present.
     *
     * @param templateId a template ID by which to filter anonymous consent templates.
     */
    getConsent(templateId: string): Observable<AnonymousConsent | undefined>;
    /**
     * Give a consent for the given `templateCode`
     * @param templateCode for which to give the consent
     */
    giveConsent(templateCode: string): void;
    /**
     * Sets all the anonymous consents' state to given.
     */
    giveAllConsents(): Observable<ConsentTemplate[]>;
    /**
     * Returns `true` if the provided `consent` is given.
     * @param consent a consent to test
     */
    isConsentGiven(consent: AnonymousConsent | undefined): boolean;
    /**
     * Withdraw a consent for the given `templateCode`
     * @param templateCode for which to withdraw the consent
     */
    withdrawConsent(templateCode: string): void;
    /**
     * Sets all the anonymous consents' state to withdrawn.
     */
    withdrawAllConsents(): Observable<ConsentTemplate[]>;
    /**
     * Returns `true` if the provided `consent` is withdrawn.
     * @param consent a consent to test
     */
    isConsentWithdrawn(consent: AnonymousConsent): boolean;
    /**
     * Toggles the dismissed state of the anonymous consents banner.
     * @param dismissed the banner will be dismissed if `true` is passed, otherwise it will be visible.
     */
    toggleBannerDismissed(dismissed: boolean): void;
    /**
     * Returns `true` if the banner was dismissed, `false` otherwise.
     */
    isBannerDismissed(): Observable<boolean>;
    /**
     * Returns `true` if the consent templates were updated on the back-end.
     * If the templates are not present in the store, it triggers the load.
     */
    getTemplatesUpdated(): Observable<boolean>;
    /**
     * Toggles the `updated` slice of the state
     * @param updated
     */
    toggleTemplatesUpdated(updated: boolean): void;
    /**
     * Returns `true` if either the banner is not dismissed or if the templates were updated on the back-end.
     * Otherwise, it returns `false`.
     */
    isBannerVisible(): Observable<boolean>;
    /**
     * Dispatches an action to trigger the check
     * whether the anonymous consent version have been updated
     */
    private checkConsentVersions;
    /**
     * Returns `true` if there's a mismatch in template versions between the provided `currentTemplates` and `newTemplates`
     * @param currentTemplates current templates to check
     * @param newTemplates new templates to check
     */
    detectUpdatedTemplates(currentTemplates: ConsentTemplate[], newTemplates: ConsentTemplate[]): boolean;
    /**
     * Serializes using `JSON.stringify()` and encodes using `encodeURIComponent()` methods
     * @param consents to serialize and encode
     */
    serializeAndEncode(consents: AnonymousConsent[]): string;
    /**
     * Decodes using `decodeURIComponent()` and deserializes using `JSON.parse()`
     * @param rawConsents to decode an deserialize
     */
    decodeAndDeserialize(rawConsents: string): AnonymousConsent[];
    /**
     *
     * Compares the given `newConsents` and `previousConsents` and returns `true` if there are differences (the `newConsents` are updates).
     * Otherwise it returns `false`.
     *
     * @param newConsents new consents to compare
     * @param previousConsents old consents to compare
     */
    consentsUpdated(newConsents: AnonymousConsent[], previousConsents: AnonymousConsent[]): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<AnonymousConsentsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AnonymousConsentsService>;
}
