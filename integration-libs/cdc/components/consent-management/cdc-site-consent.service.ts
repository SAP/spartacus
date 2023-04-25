import { Injectable } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  ConsentTemplate,
  ConverterService,
  LanguageService,
} from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  CDC_SITE_CONSENT_NORMALIZER,
  CDC_USER_PREFERENCE_SERIALIZER,
} from './converters/cdc-site-consent.converters';

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
    return this.cdcJsService
      .getSiteConsentDetails()
      .pipe(this.converter.pipeable(CDC_SITE_CONSENT_NORMALIZER))
      .pipe(
        switchMap((consents: ConsentTemplate[]) => {
          return this.maintainUserConsentPreferences(consents);
        })
      );
  }

  updateConsent(
    userId: string,
    isConsentGranted: boolean,
    consentCode: string
  ): Observable<ConsentTemplate> {
    var consent: ConsentTemplate = {};
    consent.id = consentCode;
    consent.currentConsent = {};

    /**if consent is of type terms or privacy - withdrawing them should not be allowed */
    if (
      (consentCode.startsWith('terms') || consentCode.startsWith('privacy')) &&
      isConsentGranted === false
    )
      return of({});

    if (isConsentGranted && consent.currentConsent)
      consent.currentConsent.consentGivenDate = new Date();
    else if (consent.currentConsent)
      consent.currentConsent.consentWithdrawnDate = new Date();

    var uid: string | undefined = this.getUserID();
    if (uid) userId = uid;

    var siteLanguage = this.getActiveLanguage();

    const serializedPreference: any = this.converter.convert(
      consent,
      CDC_USER_PREFERENCE_SERIALIZER
    );

    this.cdcJsService
      .setUserConsentPreferences(userId, siteLanguage, serializedPreference)
      .subscribe((error) => {
        return throwError(error);
      });
    // .pipe(
    //   catchError((error: any) => {
    //     return throwError(error);   //should check why this error is not getting caught
    //   })
    // );

    if (isConsentGranted) {
      return this.getSiteConsentDetails().pipe(
        //check if this call is necessary or we can use some other call to get it.
        switchMap((templates) => {
          var updatedConsent: ConsentTemplate = {};
          templates?.forEach((template: ConsentTemplate) => {
            if (template?.id === consentCode) updatedConsent = template;
          });
          return of(updatedConsent);
        })
      );
    }
    return of({});
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
    return this.cdcJsService.getUserConsentPreferences(uid).pipe(
      switchMap((userPreference) => {
        consents.forEach((consent) => {
          let length = 0;
          let preference = userPreference.preferences;
          let consentIDs: string[] = [];
          if (consent.id) consentIDs = consent.id.split('.');
          for (let consentID of consentIDs) {
            if (Object.hasOwn(preference, consentID)) {
              preference = preference[consentID];
              length++;
            } else break;
          }
          if (consent.currentConsent) {
            consent.currentConsent.code = consent?.id; //in CDC there is no code, so filling in ID for code
          }
          /** currentConsent.consentGivenDate ,currentConsent.consentWithdrawnDate will be set only if
           * user preference contains that preference
           */
          if (preference.isConsentGranted && length === consentIDs.length) {
            if (consent.currentConsent) {
              consent.currentConsent.consentGivenDate =
                preference?.lastConsentModified;
            }
          } else if (
            !preference.isConsentGranted &&
            length === consentIDs.length
          ) {
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
  }
}
