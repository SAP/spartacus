import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { AnonymousConsentsService } from '../../anonymous-consents/index';
import { AnonymousConsent, Consent } from '../../model/index';
import { UserConsentService } from './user-consent.service';

/**
 * Unified facade for both anonymous and registered user consents.
 */
@Injectable({ providedIn: 'root' })
export class ConsentService {
  constructor(
    protected anonymousConsentsService: AnonymousConsentsService,
    protected userConsentService: UserConsentService
  ) {}

  /**
   * Returns either anonymous consent or registered consent as they are emmited.
   * @param templateCode for which to return either anonymous or registered consent.
   */
  getConsent(templateCode: string): Observable<AnonymousConsent | Consent> {
    return merge(
      this.userConsentService.getConsent(templateCode),
      this.anonymousConsentsService.getConsent(templateCode)
    );
  }

  /**
   * Checks if the `templateId`'s template has a given consent.
   * The method returns `false` if the consent doesn't exist or if it's withdrawn. Otherwise, `true` is returned.
   *
   * @param templateId of a template which's consent should be checked
   */
  checkConsentGivenByTemplateId(templateId: string): Observable<boolean> {
    return this.getConsent(templateId).pipe(
      map((consent) => {
        if (!consent) {
          return false;
        }

        return this.isAnonymousConsentType(consent)
          ? this.anonymousConsentsService.isConsentGiven(consent)
          : this.userConsentService.isConsentGiven(consent);
      }),
      distinctUntilChanged()
    );
  }

  /**
   * Checks if the `templateId`'s template has a withdrawn consent.
   * The method returns `true` if the consent doesn't exist or if it's withdrawn. Otherwise, `false` is returned.
   *
   * @param templateId of a template which's consent should be checked
   */
  checkConsentWithdrawnByTemplateId(templateId: string): Observable<boolean> {
    return this.getConsent(templateId).pipe(
      map((consent) => {
        if (!consent) {
          return true;
        }

        return this.isAnonymousConsentType(consent)
          ? this.anonymousConsentsService.isConsentWithdrawn(consent)
          : this.userConsentService.isConsentWithdrawn(consent);
      }),
      distinctUntilChanged()
    );
  }

  /**
   *
   * Checks the provided `consent`'s type and delegates to an appropriate method - `anonymousConsentsService.isConsentGiven(consent)` or `this.userConsentService.isConsentGiven`
   *
   * @param consent a consent to check
   */
  isConsentGiven(consent: AnonymousConsent | Consent): boolean {
    return this.isAnonymousConsentType(consent)
      ? this.anonymousConsentsService.isConsentGiven(consent)
      : this.userConsentService.isConsentGiven(consent);
  }

  /**
   *
   * Checks the provided `consent`'s type and delegates to an appropriate method - `anonymousConsentsService.isConsentWithdrawn(consent)` or `this.userConsentService.isConsentWithdrawn`
   *
   * @param consent a consent to check
   */
  isConsentWithdrawn(consent: AnonymousConsent | Consent): boolean {
    return this.isAnonymousConsentType(consent)
      ? this.anonymousConsentsService.isConsentWithdrawn(consent)
      : this.userConsentService.isConsentWithdrawn(consent);
  }

  /**
   * Returns `true` if the provided consent is of type `AnonymousConsent`. Otherwise, `false` is returned.
   */
  isAnonymousConsentType(
    consent: AnonymousConsent | Consent
  ): consent is AnonymousConsent {
    if (!consent) {
      return false;
    }

    return (consent as AnonymousConsent).templateCode !== undefined;
  }

  /**
   * Returns `true` if the provided consent is of type `Consent`. Otherwise, `false` is returned.
   */
  isConsentType(consent: AnonymousConsent | Consent): consent is Consent {
    if (!consent) {
      return false;
    }

    return (consent as Consent).code !== undefined;
  }
}
