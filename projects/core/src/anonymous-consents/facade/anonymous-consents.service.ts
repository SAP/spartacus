import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AnonymousConsent, ConsentTemplate } from '../../model/index';
import { AnonymousConsentsActions } from '../store/actions/index';
import { StateWithAnonymousConsents } from '../store/anonymous-consents-state';
import { AnonymousConsentsSelectors } from '../store/selectors/index';

@Injectable({ providedIn: 'root' })
export class AnonymousConsentsService {
  constructor(protected store: Store<StateWithAnonymousConsents>) {}

  /**
   * Retrieves only the anonymous consent templates.
   */
  loadAnonymousConsentTemplates(): void {
    this.store.dispatch(
      new AnonymousConsentsActions.LoadAnonymousConsentTemplates()
    );
  }

  /**
   * Returns all the anonymous consent templates.
   */
  getAnonymousConsentTemplates(): Observable<ConsentTemplate[]> {
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
   * Withdraw a consent for the given `templateCode`
   * @param templateCode for which to withdraw the consent
   */
  withdrawAnonymousConsent(templateCode: string): void {
    this.store.dispatch(
      new AnonymousConsentsActions.WithdrawAnonymousConsent(templateCode)
    );
  }
}
