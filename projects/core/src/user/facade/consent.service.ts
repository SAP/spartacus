import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { AnonymousConsentsService } from '../../anonymous-consents/index';
import { AnonymousConsent, Consent } from '../../model/index';
import { UserConsentService } from './user-consent.service';

// TODO:#5361 - write comments and test
@Injectable({ providedIn: 'root' })
export class ConsentService {
  constructor(
    protected anonymousConsentsService: AnonymousConsentsService,
    protected userConsentService: UserConsentService
  ) {}

  getConsent(templateCode: string): Observable<AnonymousConsent | Consent> {
    return merge(
      this.userConsentService.getConsent(templateCode),
      this.anonymousConsentsService.getConsent(templateCode)
    );
  }

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

  isAnonymousConsentType(
    consent: AnonymousConsent | Consent
  ): consent is AnonymousConsent {
    return (consent as AnonymousConsent).templateCode !== undefined;
  }

  isConsentType(consent: AnonymousConsent | Consent): consent is Consent {
    return (consent as Consent).code !== undefined;
  }
}
