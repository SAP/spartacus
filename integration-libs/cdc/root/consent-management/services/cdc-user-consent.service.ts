import { Injectable } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
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

@Injectable({ providedIn: 'root' })
export class CdcUserConsentService {
  constructor(
    protected languageService: LanguageService,
    protected userProfileFacade: UserProfileFacade,
    protected cdcJsService: CdcJsService,
    protected converter: ConverterService,
    protected cdcConsentsStorage: CdcConsentsLocalStorageService
  ) {}

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

}
