/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  ConsentTemplate,
  ConverterService,
  LanguageService,
} from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { Observable, throwError } from 'rxjs';
import { CdcConsentsLocalStorageService } from './cdc-consents-local-storage.service';
import { CDC_USER_PREFERENCE_SERIALIZER } from '../converters/converter';
import { tap } from 'rxjs/operators';
import { CdcJsService } from '../../service';

@Injectable({ providedIn: 'root' })
export class CdcUserConsentService {
  constructor(
    protected languageService: LanguageService,
    protected userProfileFacade: UserProfileFacade,
    protected cdcJsService: CdcJsService,
    protected converter: ConverterService,
    protected cdcConsentsStorage: CdcConsentsLocalStorageService
  ) {}

  /**
   *
   * @param isConsentGranted - set true - if consent is given; false - if consent is withdrawn
   * @param consentCode - cdc consent id
   * @param user - If user is not passed, the logged in user id will be fetched and used. If passed, it will be considered.
   * @param regToken - token
   * @returns - returns Observable with error code and status
   */
  updateCdcConsent(
    isConsentGranted: boolean,
    consentCode: string,
    user?: string,
    regToken?: string
  ): Observable<{ errorCode: number; errorMessage: string }> {
    var consent: ConsentTemplate = {};
    consent.id = consentCode;
    consent.currentConsent = {};
    if (isConsentGranted) consent.currentConsent.consentGivenDate = new Date();
    else consent.currentConsent.consentWithdrawnDate = new Date();

    var userId: string = '';
    if (user === undefined) userId = this.getUserID() ?? '';
    else if (user !== undefined) userId = user;

    var currentLanguage = this.getActiveLanguage();

    const serializedPreference: any = this.converter.convert(
      consent,
      CDC_USER_PREFERENCE_SERIALIZER
    );
    return this.cdcJsService
      .setUserConsentPreferences(
        userId,
        currentLanguage,
        serializedPreference,
        regToken
      )
      .pipe(
        tap({
          error: (error) => {
            throwError(error);
          },
        })
      );
  }

  /**
   * Returns logged in User ID
   * @returns user id
   */
  getUserID(): string | undefined {
    var uid: string | undefined;
    this.userProfileFacade.get().subscribe((user) => {
      uid = user?.uid;
    });
    return uid;
  }

  /**
   * Returns current language of the current site
   * @returns language iso code
   */
  getActiveLanguage(): string {
    var currentLanguage: string = '';
    this.languageService
      .getActive()
      .subscribe((language) => (currentLanguage = language))
      .unsubscribe();
    return currentLanguage;
  }
}
