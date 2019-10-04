import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { AnonymousConsent, ConsentTemplate } from '../../model/index';
import { AnonymousConsentsActions } from '../store/actions/index';
import { StateWithAnonymousConsents } from '../store/anonymous-consents-state';
import { AnonymousConsentsSelectors } from '../store/selectors/index';

// TODO:#3899 - shorten method names and drop the anonoymous from all of them.

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
    return this.getAnonymousConsentTemplates().pipe(
      tap(templates =>
        templates.forEach(template => this.giveAnonymousConsent(template.id))
      )
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
    return this.getAnonymousConsentTemplates().pipe(
      tap(templates =>
        templates.forEach(template =>
          this.withdrawAnonymousConsent(template.id)
        )
      )
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
  }

  /**
   * Returns `true` if the banner is visible, `false` otherwise
   */
  isAnonymousConsentsBannerVisible(): Observable<boolean> {
    return this.store.pipe(
      select(AnonymousConsentsSelectors.getAnonymousConsentsBannerVisibility)
    );
  }

  // TODO:#3899 - re-write the API doc. delete the commented-out code.
  /**
   * If the user is anonymous, the method pulls new anonymous consent templates from the API and
   * checks their versions against the currently stored anonymous consent templates.
   * If there are differences, the new anonymous consent templates are stored in the store, and `true` is returned.
   * In case there are no new versions, `false` is returned.
   */
  checkAnonymousConsentTemplateUpdates(
    currentTemplates: ConsentTemplate[]
  ): Observable<boolean> {
    return this.getLoadAnonymousConsentTemplatesLoading().pipe(
      tap(_ => this.loadAnonymousConsentTemplates()),
      filter(loading => loading),
      withLatestFrom(this.getAnonymousConsentTemplates()),
      map(([_loading, newTemplates]) => {
        if (newTemplates.length !== currentTemplates.length) {
          return false;
        }

        for (let i = 0; i < newTemplates.length; i++) {
          const newTemplate = newTemplates[i];
          const currentTemplate = currentTemplates[i];
          if (newTemplate.version !== currentTemplate.version) {
            return true;
          }
        }

        return false;
      })
    );

    //// ######## 2
    /*
    this.loadAnonymousConsentTemplates();
    return this.getAnonymousConsentTemplates().pipe(
      skipUntil(this.getLoadAnonymousConsentTemplatesSuccess()),
      map(newTemplates => {
        if (newTemplates.length !== currentTemplates.length) {
          return false;
        }

        for (let i = 0; i < newTemplates.length; i++) {
          const newTemplate = newTemplates[i];
          const currentTemplate = currentTemplates[i];
          if (newTemplate.version !== currentTemplate.version) {
            return true;
          }
        }

        return false;
      })
    );
*/

    //// ######## 1
    // return this.getAnonymousConsentTemplates().pipe(
    //   map(currentTemplates => {
    //     if (newTemplates.length !== currentTemplates.length) {
    //       return newTemplates;
    //     }

    //     if (DELETE_ME) {
    //       // const updatedTemplates: ConsentTemplate[] = [];
    //       // for (let i = 0; i < newTemplates.length; i++) {
    //       //   const newTemplate = newTemplates[i];
    //       //   const currentTemplate = currentTemplates[i];
    //       //   if (newTemplate.version !== currentTemplate.version) {
    //       //     updatedTemplates.push(newTemplate);
    //       //   }
    //       // }
    //       // return newTemplates;
    //     }

    //     return currentTemplates.map((currentTemplate, i) => {
    //       const newTemplate = newTemplates[i];
    //       if (currentTemplate.version !== newTemplate.version) {
    //         return newTemplate;
    //       } else {
    //         return currentTemplate;
    //       }
    //     });
    //   })
    // );
  }
}
