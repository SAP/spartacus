import { Injectable } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  AnonymousConsent,
  AnonymousConsentTemplatesAdapter,
  ConsentTemplate,
  ConverterService,
  UserConsentAdapter,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CDC_SITE_CONSENT_NORMALIZER } from './cdc-site-consent.converters';
import { CdcSiteConsentService } from './cdc-site-consent.service';

@Injectable({ providedIn: 'root' })
export class CDCSiteConsentAdapter implements UserConsentAdapter, AnonymousConsentTemplatesAdapter {
  constructor(
    protected cdcSiteConsentService: CdcSiteConsentService,
    protected cdcJsService: CdcJsService,
    protected converter: ConverterService
  ) {}
  loadAnonymousConsentTemplates(): Observable<ConsentTemplate[]> {
    var consents: ConsentTemplate[] = [];
    return of(consents);
  }
  loadAnonymousConsents(): Observable<AnonymousConsent[]> {
    var consents: AnonymousConsent[] = [];
    return of(consents);
  }
  loadConsents(): Observable<ConsentTemplate[]> {
    return this.cdcJsService
      .getSiteConsentDetails()
      .pipe(this.converter.pipeable(CDC_SITE_CONSENT_NORMALIZER))
      .pipe(
        switchMap((consents: ConsentTemplate[]) => {
          return this.cdcSiteConsentService.maintainUserConsentPreferences(
            consents
          );
        })
      );
  }
  giveConsent(userId: string, consentTemplateId: string): Observable<ConsentTemplate> {
    return this.cdcSiteConsentService.updateConsent(userId, true, consentTemplateId);
  }

  withdrawConsent(userId: string, consentCode: string): Observable<{}> {
    return this.cdcSiteConsentService.updateConsent(userId, false, consentCode);
  }
}
