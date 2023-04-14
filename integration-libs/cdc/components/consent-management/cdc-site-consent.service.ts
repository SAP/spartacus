import { Injectable } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  ConsentTemplate,
  ConverterService,
  LanguageService,
} from '@spartacus/core';
import { UserProfileService } from '@spartacus/user/profile/core';
//import { UserProfileFacade } from '@spartacus/user/profile/root';
import {
  CdcSiteConsentTemplate,
  siteConsentDetailTemplate,
} from 'integration-libs/cdc/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
//import { CDC_CONSENT_DETAILS_NORMALIZER } from './cdc-site-consent.converters';

@Injectable({
  providedIn: 'root',
})
export class cdcUserConsentService {
  constructor(
    protected languageService: LanguageService,
    protected userProfileFacade: UserProfileService,
    protected cdcJsService: CdcJsService,
    protected converter: ConverterService
  ) {}

  getSiteConsentDetails(): Observable<ConsentTemplate[]> {
    return this.cdcJsService.getCdcConsent().pipe(
      //this.converter.pipeable(CDC_CONSENT_DETAILS_NORMALIZER)
      switchMap((siteConsent: CdcSiteConsentTemplate) => {
        return this.convertConsentEntries(siteConsent.siteConsentDetails).pipe(
          switchMap((consents: ConsentTemplate[]) => {
            return this.setUserConsentPreferences(consents);
          })
        );
      })
    );
  }

  getUserID(): string | undefined {
    var uid: string | undefined;
    this.userProfileFacade.get().subscribe((user) => {
      uid = user?.uid;
    });
    return uid;
  }

  setUserConsentPreferences(
    consents: ConsentTemplate[]
  ): Observable<ConsentTemplate[]> {
    var uid: string | undefined = this.getUserID();
    console.log('user ID is:', uid);
    var include: string = 'preferences';
    var updatedConsents: ConsentTemplate[] = [];
    //->old code
    return this.cdcJsService.getUserConsentPreferences(uid, include).pipe(
      switchMap((userPreference) => {
        consents.forEach((consent) => {
          let preference = userPreference.preferences;
          let consentIDs = consent?.id?.split('.');
          consentIDs?.forEach((consentID: string) => {
            preference = preference[consentID];
          });
          if (preference.isConsentGranted) {
            if (consent.currentConsent) {
              consent.currentConsent.consentGivenDate =
                preference?.lastConsentModified;
            }
          } else {
            if (consent.currentConsent) {
              consent.currentConsent.consentWithdrawnDate =
                preference?.lastConsentModified;
            }
          }
          updatedConsents.push(consent);
        });
        return of(updatedConsents);
      })
    );
    //<-old code
  }

  protected convertConsentEntries(
    site: siteConsentDetailTemplate[]
  ): Observable<ConsentTemplate[]> {
    var consents: ConsentTemplate[] = [];
    var siteLanguage: string = '';
    this.languageService
      .getActive()
      .subscribe((language) => (siteLanguage = language))
      .unsubscribe();

    for (var key in site) {
      if (Object.hasOwn(site, key)) {
        if (site[key].isActive === true) {
          var legalStatements = site[key].legalStatements;
          for (var lang in legalStatements) {
            if (Object.hasOwn(legalStatements, lang)) {
              if (lang === siteLanguage) {
                consents.push({
                  id: key,
                  description: legalStatements[lang]?.purpose,
                  version: legalStatements[lang].currentDocVersion,
                  currentConsent: {
                    code: '',
                    consentGivenDate: undefined,
                    consentWithdrawnDate: undefined,
                  },
                });
              }
            }
          }
        }
      }
    }
    return of(consents);
  }
}
