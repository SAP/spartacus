import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { AnonymousConsentsService } from '../../anonymous-consents/index';
import { AnonymousConsent, Consent } from '../../model/index';
import { UserConsentService } from './user-consent.service';

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
   * Checks if the `templateCode`'s template has a given consent.
   * The method returns `false` if the consent doesn't exist or if it's withdrawn. Otherwise, `true` is returned.
   *
   * @param templateCode of a template which's consent should be checked
   */
  isConsentGiven(templateCode: string): Observable<boolean> {
    return this.getConsent(templateCode).pipe(
      map(consent => {
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
   * Checks if the `templateCode`'s template has a withdrawn consent.
   * The method returns `true` if the consent doesn't exist or if it's withdrawn. Otherwise, `false` is returned.
   *
   * @param templateCode of a template which's consent should be checked
   */
  isConsentWithdrawn(templateCode: string): Observable<boolean> {
    return this.getConsent(templateCode).pipe(
      map(consent => {
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
   * Returns `true` if the provided consent is of type `AnonymousConsent`. Otherwise, `false` is returned.
   */
  isAnonymousConsentType(
    consent: AnonymousConsent | Consent
  ): consent is AnonymousConsent {
    return (consent as AnonymousConsent).templateCode !== undefined;
  }

  /**
   * Returns `true` if the provided consent is of type `Consent`. Otherwise, `false` is returned.
   */
  isConsentType(consent: AnonymousConsent | Consent): consent is Consent {
    return (consent as Consent).code !== undefined;
  }
}
