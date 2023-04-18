import { Injectable } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  ConsentTemplate,
  ConverterService,
  LanguageService,
} from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
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
export class CdcSiteConsentService {
  constructor(
    protected languageService: LanguageService,
    protected userProfileFacade: UserProfileFacade,
    protected cdcJsService: CdcJsService,
    protected converter: ConverterService
  ) {}

  getSiteConsentDetails(): Observable<ConsentTemplate[]> {
    return this.cdcJsService.getCdcConsent().pipe(
      //this.converter.pipeable(CDC_CONSENT_DETAILS_NORMALIZER)
      switchMap((siteConsent: CdcSiteConsentTemplate) => {
        return this.convertConsentEntries(siteConsent.siteConsentDetails).pipe(
          switchMap((consents: ConsentTemplate[]) => {
            return this.maintainUserConsentPreferences(consents);
          })
        );
      })
    );
  }

  updateConsent(
    isConsentGranted: boolean,
    consentCode: string
  ): Observable<ConsentTemplate> {
    var uid: string | undefined = this.getUserID();
    var siteLanguage = this.getActiveLanguage();
    return this.cdcJsService.getUserConsentPreferences(uid).pipe(
      switchMap((userPreference) => {
        let preference = userPreference.preferences;
        let consentIDs = consentCode?.split('.');
        consentIDs?.forEach((consentID: string) => {
          preference = preference[consentID];
        });
        preference.isConsentGranted = isConsentGranted;
        if (uid)
          this.cdcJsService
            .setUserConsentPreferences(
              userPreference.UID,
              siteLanguage,
              userPreference.preferences
            ).subscribe((response) => {
                  console.log('withdrawn', response);
                });
            // .pipe(
            //   tap((response) => {
            //     console.log('withdrawn', response);
            //   })
            // );
        if (isConsentGranted === false) return of({});
        else {
          return this.getSiteConsentDetails().pipe(
            switchMap((templates) => {
              templates?.forEach((template: ConsentTemplate) => {
                if (template?.id === consentCode) return of(template);
              });
              return of({});
            })
          );
        }
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

  getActiveLanguage(): string {
    var siteLanguage: string = '';
    this.languageService
      .getActive()
      .subscribe((language) => (siteLanguage = language))
      .unsubscribe();
    return siteLanguage;
  }

  maintainUserConsentPreferences(
    consents: ConsentTemplate[]
  ): Observable<ConsentTemplate[]> {
    var uid: string | undefined = this.getUserID();
    var updatedConsents: ConsentTemplate[] = [];
    //->old code
    return this.cdcJsService.getUserConsentPreferences(uid).pipe(
      switchMap((userPreference) => {
        console.log('get account info:', userPreference);
        consents.forEach((consent) => {
          let preference = userPreference.preferences;
          let consentIDs = consent?.id?.split('.');
          consentIDs?.forEach((consentID: string) => {
            preference = preference[consentID];
          });
          if (consent.currentConsent) {
            consent.currentConsent.code = consent?.id; //in CDC there is no code, so filling in ID for code
          }
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
    var siteLanguage = this.getActiveLanguage();
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
