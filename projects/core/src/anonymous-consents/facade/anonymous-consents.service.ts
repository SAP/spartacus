import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  AnonymousConsent,
  ANONYMOUS_CONSENT_STATUS,
  ConsentTemplate,
} from '../../model/index';
import { AnonymousConsentsActions } from '../store/actions/index';
import { StateWithAnonymousConsents } from '../store/anonymous-consents-state';
import { AnonymousConsentsSelectors } from '../store/selectors/index';

// TODO:#3899 - shorten method names and drop the anonoymous from all of them.

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
  getAnonymousConsentTemplate(
    templateCode: string
  ): Observable<ConsentTemplate> {
    return this.store.pipe(
      select(
        AnonymousConsentsSelectors.getAnonymousConsentTemplate(templateCode)
      )
    );
  }

  /**
   * Returns an indicator for the loading status for the anonymous consent templates.
   */
  getLoadAnonymousConsentTemplatesLoading(): Observable<boolean> {
    return this.store.pipe(
      select(AnonymousConsentsSelectors.getAnonymousConsentTemplatesLoading)
    );
  }

  /**
   * Returns an indicator for the success status for the anonymous consent templates.
   */
  getLoadAnonymousConsentTemplatesSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(AnonymousConsentsSelectors.getAnonymousConsentTemplatesSuccess)
    );
  }

  /**
   * Returns an indicator for the error status for the anonymous consent templates.
   */
  getLoadAnonymousConsentTemplatesError(): Observable<boolean> {
    return this.store.pipe(
      select(AnonymousConsentsSelectors.getAnonymousConsentTemplatesError)
    );
  }

  /**
   * Resets the loading, success and error indicators for the anonymous consent templates.
   */
  resetLoadAnonymousConsentTemplatesState(): void {
    this.store.dispatch(
      new AnonymousConsentsActions.ResetLoadAnonymousConsentTemplates()
    );
  }

  /**
   * Returns all the anonymous consents.
   */
  getAnonymousConsents(): Observable<AnonymousConsent[]> {
    return this.store.pipe(
      select(AnonymousConsentsSelectors.getAnonymousConsents)
    );
  }

  /**
   * Puts the provided anonymous consents into the store.
   */
  setAnonymousConsents(consents: AnonymousConsent[]): void {
    return this.store.dispatch(
      new AnonymousConsentsActions.SetAnonymousConsents(consents)
    );
  }

  /**
   * Returns the anonymous consent with the given template code.
   * @param templateCode a template code by which to filter anonymous consent templates.
   */
  getAnonymousConsent(templateCode: string): Observable<AnonymousConsent> {
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
  giveAnonymousConsent(templateCode: string): void {
    this.store.dispatch(
      new AnonymousConsentsActions.GiveAnonymousConsent(templateCode)
    );
  }

  /**
   * Sets all the anonymous consents' state to given.
   */
  giveAllAnonymousConsents(): Observable<ConsentTemplate[]> {
    return this.getTemplates().pipe(
      tap(templates =>
        templates.forEach(template => this.giveAnonymousConsent(template.id))
      )
    );
  }

  /**
   * Returns `true` if the provided `consent` is given.
   * @param consent a consent to test
   */
  isConsentGiven(consent: AnonymousConsent): boolean {
    return (
      consent.consentState === ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_GIVEN
    );
  }

  /**
   * Withdraw a consent for the given `templateCode`
   * @param templateCode for which to withdraw the consent
   */
  withdrawAnonymousConsent(templateCode: string): void {
    this.store.dispatch(
      new AnonymousConsentsActions.WithdrawAnonymousConsent(templateCode)
    );
  }

  /**
   * Sets all the anonymous consents' state to withdrawn.
   */
  withdrawAllAnonymousConsents(): Observable<ConsentTemplate[]> {
    return this.getTemplates().pipe(
      tap(templates =>
        templates.forEach(template =>
          this.withdrawAnonymousConsent(template.id)
        )
      )
    );
  }

  /**
   * Returns `true` if the provided `consent` is withdrawn.
   * @param consent a consent to test
   */
  isConsentWithdrawn(consent: AnonymousConsent): boolean {
    return (
      consent.consentState ===
      ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_WITHDRAWN
    );
  }

  /**
   * Toggles the visibility of the anonymous consents banner.
   * @param visible the banner is visible if `true`, otherwise it's hidden
   */
  toggleAnonymousConsentsBannerVisibility(visible: boolean): void {
    this.store.dispatch(
      new AnonymousConsentsActions.ToggleAnonymousConsentsBannerVisibility(
        visible
      )
    );
    if (!visible) {
      this.toggleTemplatesUpdated(false);
    }
  }

  /**
   * Returns `true` if the banner is visible, `false` otherwise
   */
  isAnonymousConsentsBannerVisible(): Observable<boolean> {
    return this.store.pipe(
      select(AnonymousConsentsSelectors.getAnonymousConsentsBannerVisibility)
    );
  }

  /**
   * Returns `true` if the consent templates were updated on the back-end.
   */
  getTemplatesUpdated(): Observable<boolean> {
    return this.store.pipe(
      select(AnonymousConsentsSelectors.getAnonymousConsentTemplatesUpdate)
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
}
