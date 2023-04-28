/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
        withLatestFrom(this.userConsentService.getConsents()), //to fetch from state instead of api
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
    allSiteConsents: ConsentTemplate[]
  ): Observable<ConsentTemplate[]> {
    var uid: string | undefined = this.getUserID();
    return this.cdcJsService.getUserConsentPreferences(uid).pipe(
      switchMap((userPreference) => {
        let updatedConsents: ConsentTemplate[] = [];
        let preferences = userPreference.preferences; //each part of the ID will be a new object
        preferences = this.flatten(preferences); //key will be a string with dot separated IDs
        allSiteConsents.forEach((consent) => {
          if (
            consent.id &&
            consent.id in preferences &&
            consent.currentConsent
          ) {
            if (preferences[consent.id].isConsentGranted)
              consent.currentConsent.consentGivenDate =
                preferences[consent.id]?.lastConsentModified;
            else
              consent.currentConsent.consentWithdrawnDate =
                preferences[consent.id]?.lastConsentModified;
          }
          updatedConsents.push(consent);
        });
        return of(updatedConsents);
      })
    );
  }

  private flatten(input: any, reference?: any, output?: any) {
    output = output || {};
    for (var key in input) {
      if (Object.hasOwn(input, key)) {
        var value = input[key];
        key = reference ? reference + '.' + key : key;
        if (
          typeof value === 'object' &&
          value !== null &&
          !('isConsentGranted' in value)
        ) {
          this.flatten(value, key, output);
        } else {
          output[key] = value;
        }
      }
    }
    return output;
  }
}
