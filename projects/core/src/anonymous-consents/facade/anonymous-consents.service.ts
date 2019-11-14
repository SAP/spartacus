import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  AnonymousConsent,
  ANONYMOUS_CONSENT_STATUS,
  ConsentTemplate,
} from '../../model/index';
import { AnonymousConsentsActions } from '../store/actions/index';
import { StateWithAnonymousConsents } from '../store/anonymous-consents-state';
import { AnonymousConsentsSelectors } from '../store/selectors/index';

@Injectable({ providedIn: 'root' })
export class AnonymousConsentsService {
  constructor(protected store: Store<StateWithAnonymousConsents>) {}

  /**
   * Retrieves the anonymous consent templates.
   */
  loadTemplates(): void {
    this.store.dispatch(
      new AnonymousConsentsActions.LoadAnonymousConsentTemplates()
    );
  }

  /**
   * Returns all the anonymous consent templates.
   */
  getTemplates(): Observable<ConsentTemplate[]> {
    return this.store.pipe(
      select(AnonymousConsentsSelectors.getAnonymousConsentTemplatesValue)
    );
  }

  /**
   * Returns the anonymous consent templates with the given template code.
   * @param templateCode a template code by which to filter anonymous consent templates.
   */
  getTemplate(templateCode: string): Observable<ConsentTemplate> {
    return this.store.pipe(
      select(
        AnonymousConsentsSelectors.getAnonymousConsentTemplate(templateCode)
      )
    );
  }

  /**
   * Returns an indicator for the loading status for the anonymous consent templates.
   */
  getLoadTemplatesLoading(): Observable<boolean> {
    return this.store.pipe(
      select(AnonymousConsentsSelectors.getAnonymousConsentTemplatesLoading)
    );
  }

  /**
   * Returns an indicator for the success status for the anonymous consent templates.
   */
  getLoadTemplatesSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(AnonymousConsentsSelectors.getAnonymousConsentTemplatesSuccess)
    );
  }

  /**
   * Returns an indicator for the error status for the anonymous consent templates.
   */
  getLoadTemplatesError(): Observable<boolean> {
    return this.store.pipe(
      select(AnonymousConsentsSelectors.getAnonymousConsentTemplatesError)
    );
  }

  /**
   * Resets the loading, success and error indicators for the anonymous consent templates.
   */
  resetLoadTemplatesState(): void {
    this.store.dispatch(
      new AnonymousConsentsActions.ResetLoadAnonymousConsentTemplates()
    );
  }

  /**
   * Returns all the anonymous consents.
   */
  getConsents(): Observable<AnonymousConsent[]> {
    return this.store.pipe(
      select(AnonymousConsentsSelectors.getAnonymousConsents)
    );
  }

  /**
   * Puts the provided anonymous consents into the store.
   */
  setConsents(consents: AnonymousConsent[]): void {
    return this.store.dispatch(
      new AnonymousConsentsActions.SetAnonymousConsents(consents)
    );
  }

  /**
   * Returns the anonymous consent with the given template code.
   * @param templateCode a template code by which to filter anonymous consent templates.
   */
  getConsent(templateCode: string): Observable<AnonymousConsent> {
    return this.store.pipe(
      select(
        AnonymousConsentsSelectors.getAnonymousConsentByTemplateCode(
          templateCode
        )
      )
    );
  }

  /**
   * Give a consent for the given `templateCode`
   * @param templateCode for which to give the consent
   */
  giveConsent(templateCode: string): void {
    this.store.dispatch(
      new AnonymousConsentsActions.GiveAnonymousConsent(templateCode)
    );
  }

  /**
   * Sets all the anonymous consents' state to given.
   */
  giveAllConsents(): Observable<ConsentTemplate[]> {
    return this.getTemplates().pipe(
      tap(templates =>
        templates.forEach(template => this.giveConsent(template.id))
      )
    );
  }

  /**
   * Returns `true` if the provided `consent` is given.
   * @param consent a consent to test
   */
  isConsentGiven(consent: AnonymousConsent): boolean {
    return consent.consentState === ANONYMOUS_CONSENT_STATUS.GIVEN;
  }

  /**
   * Withdraw a consent for the given `templateCode`
   * @param templateCode for which to withdraw the consent
   */
  withdrawConsent(templateCode: string): void {
    this.store.dispatch(
      new AnonymousConsentsActions.WithdrawAnonymousConsent(templateCode)
    );
  }

  /**
   * Sets all the anonymous consents' state to withdrawn.
   */
  withdrawAllConsents(): Observable<ConsentTemplate[]> {
    return this.getTemplates().pipe(
      tap(templates =>
        templates.forEach(template => this.withdrawConsent(template.id))
      )
    );
  }

  /**
   * Returns `true` if the provided `consent` is withdrawn.
   * @param consent a consent to test
   */
  isConsentWithdrawn(consent: AnonymousConsent): boolean {
    return consent.consentState === ANONYMOUS_CONSENT_STATUS.WITHDRAWN;
  }

  /**
   * Toggles the dismissed state of the anonymous consents banner.
   * @param dismissed the banner will be dismissed if `true` is passed, otherwise it will be visible.
   */
  toggleBannerDismissed(dismissed: boolean): void {
    this.store.dispatch(
      new AnonymousConsentsActions.ToggleAnonymousConsentsBannerDissmissed(
        dismissed
      )
    );
    if (dismissed) {
      this.toggleTemplatesUpdated(false);
    }
  }

  /**
   * Returns `true` if the banner was dismissed, `false` otherwise.
   */
  isBannerDismissed(): Observable<boolean> {
    return this.store.pipe(
      select(AnonymousConsentsSelectors.getAnonymousConsentsBannerDismissed)
    );
  }

  /**
   * Returns `true` if the consent templates were updated on the back-end.
   * If the templates are not present in the store, it triggers the load.
   */
  getTemplatesUpdated(): Observable<boolean> {
    return this.getTemplates().pipe(
      tap(templates => {
        if (!Boolean(templates)) {
          this.loadTemplates();
        }
      }),
      switchMap(_ =>
        this.store.pipe(
          select(AnonymousConsentsSelectors.getAnonymousConsentTemplatesUpdate)
        )
      )
    );
  }

  /**
   * Toggles the `updated` slice of the state
   * @param updated
   */
  toggleTemplatesUpdated(updated: boolean): void {
    this.store.dispatch(
      new AnonymousConsentsActions.ToggleAnonymousConsentTemplatesUpdated(
        updated
      )
    );
  }

  /**
   * Returns `true` if either the banner is not dismissed or if the templates were updated on the back-end.
   * Otherwise, it returns `false`.
   */
  isBannerVisible(): Observable<boolean> {
    return combineLatest([
      this.isBannerDismissed(),
      this.getTemplatesUpdated(),
    ]).pipe(map(([dismissed, updated]) => !dismissed || updated));
  }

  /**
   * Returns `true` if there's a missmatch in template versions between the provided `currentTemplates` and `newTemplates`
   * @param currentTemplates current templates to check
   * @param newTemplates new templates to check
   */
  detectUpdatedTemplates(
    currentTemplates: ConsentTemplate[],
    newTemplates: ConsentTemplate[]
  ): boolean {
    if (newTemplates.length !== currentTemplates.length) {
      return true;
    }

    for (let i = 0; i < newTemplates.length; i++) {
      const newTemplate = newTemplates[i];
      const currentTemplate = currentTemplates[i];
      if (newTemplate.version !== currentTemplate.version) {
        return true;
      }
    }

    return false;
  }

  /**
   * Serializes using `JSON.stringify()` and encodes using `encodeURIComponent()` methods
   * @param consents to serialize and encode
   */
  serializeAndEncode(consents: AnonymousConsent[]): string {
    if (!consents) {
      return '';
    }
    const serialized = JSON.stringify(consents);
    const encoded = encodeURIComponent(serialized);
    return encoded;
  }

  /**
   * Decodes using `decodeURIComponent()` and deserializes using `JSON.parse()`
   * @param rawConsents to decode an deserialize
   */
  decodeAndDeserialize(rawConsents: string): AnonymousConsent[] {
    const decoded = decodeURIComponent(rawConsents);
    const unserialized = JSON.parse(decoded) as AnonymousConsent[];
    return unserialized;
  }

  /**
   *
   * Compares the given `newConsents` and `previousConsents` and returns `true` if there are differences (the `newConsents` are updates).
   * Otherwise it returns `false`.
   *
   * @param newConsents new consents to compare
   * @param previousConsents old consents to compare
   */
  consentsUpdated(
    newConsents: AnonymousConsent[],
    previousConsents: AnonymousConsent[]
  ): boolean {
    const newRawConsents = this.serializeAndEncode(newConsents);
    const previousRawConsents = this.serializeAndEncode(previousConsents);
    return newRawConsents !== previousRawConsents;
  }
}
