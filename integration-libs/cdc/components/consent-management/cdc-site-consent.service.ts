import { Injectable } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  ConsentTemplate,
  ConverterService,
  LanguageService,
  UserConsentService,
} from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { Observable, of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { CDC_USER_PREFERENCE_SERIALIZER } from './converters/cdc-site-consent.converters';

@Injectable({
  providedIn: 'root',
})
export class CdcSiteConsentService {
  constructor(
    protected languageService: LanguageService,
    protected userProfileFacade: UserProfileFacade,
    protected cdcJsService: CdcJsService,
    protected converter: ConverterService,
    protected userConsentService: UserConsentService
  ) {}

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

    var currentLanguage = this.getActiveLanguage();

    const serializedPreference: any = this.converter.convert(
      consent,
      CDC_USER_PREFERENCE_SERIALIZER
    );

    return this.cdcJsService
      .setUserConsentPreferences(userId, currentLanguage, serializedPreference)
      .pipe(
        withLatestFrom(this.userConsentService.getConsents()),
        map(([updateResponse, allConsents]) => {
          let updatedConsent: ConsentTemplate = {};
          if (isConsentGranted) {
            for (let template of allConsents) {
              if (template?.id === consentCode) {
                updatedConsent = JSON.parse(JSON.stringify(template)); //copy
                if (updatedConsent.currentConsent) {
                  updatedConsent.currentConsent.consentGivenDate =
                    updateResponse.time;
                  updatedConsent.currentConsent.consentWithdrawnDate =
                    undefined;
                }
              }
            }
          }
          return updatedConsent;
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
    var currentLanguage: string = '';
    this.languageService
      .getActive()
      .subscribe((language) => (currentLanguage = language))
      .unsubscribe();
    return currentLanguage;
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
          let preference = userPreference.preferences; //each part of the ID will be a new object
          let consentIDs: string[] = [];
          if (consent.id) consentIDs = consent.id.split('.');
          for (let consentID of consentIDs) {
            if (Object.hasOwn(preference, consentID)) {
              preference = preference[consentID];
              length++;
            } else break;
          }
          if (consent.currentConsent && length === consentIDs.length) {
            consent.currentConsent.code = consent?.id; //in CDC there is no alpha numeric code, so filling in ID for code
            /** currentConsent.consentGivenDate ,currentConsent.consentWithdrawnDate will be set only if
             * user preference contains that preference
             */
            if (preference.isConsentGranted)
              consent.currentConsent.consentGivenDate =
                preference?.lastConsentModified;
            else
              consent.currentConsent.consentWithdrawnDate =
                preference?.lastConsentModified;
          }

          updatedConsents.push(consent);
        });
        return of(updatedConsents);
      })
    );
  }
}
