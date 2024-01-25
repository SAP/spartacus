/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConsentTemplate,
  ConverterService,
  OccEndpointsService,
  OccUserConsentAdapter,
} from '@spartacus/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { CdcConsentsLocalStorageService } from './services/cdc-consents-local-storage.service';
import { CdcUserConsentService } from './services/cdc-user-consent.service';

@Injectable({ providedIn: 'root' })
export class CdcUserConsentAdapter extends OccUserConsentAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService,
    protected cdcUserConsentService: CdcUserConsentService,
    protected cdcConsentsStorage: CdcConsentsLocalStorageService
  ) {
    super(http, occEndpoints, converter);
  }

  loadConsents(userId: string): Observable<ConsentTemplate[]> {
    return super.loadConsents(userId);
  }
  giveConsent(
    userId: string,
    consentTemplateId: string,
    consentTemplateVersion: number
  ): Observable<ConsentTemplate> {
    if (!this.cdcConsentsStorage.checkIfConsentExists(consentTemplateId)) {
      return super.giveConsent(
        userId,
        consentTemplateId,
        consentTemplateVersion
      );
    } else {
      return this.cdcUserConsentService
        .updateCdcConsent(true, [consentTemplateId])
        .pipe(
          catchError((error: any) => throwError(error)),
          switchMap((result) => {
            if (result?.errorCode === 0) {
              return super.giveConsent(
                userId,
                consentTemplateId,
                consentTemplateVersion
              );
            }
            return EMPTY;
          })
        );
    }
  }

  withdrawConsent(
    userId: string,
    consentCode: string,
    consentId?: string
  ): Observable<{}> {
    if (!this.cdcConsentsStorage.checkIfConsentExists(consentId ?? '')) {
      return super.withdrawConsent(userId, consentCode);
    } else {
      return this.cdcUserConsentService
        .updateCdcConsent(false, consentId ? [consentId] : [])
        .pipe(
          catchError((error: any) => throwError(error)),
          switchMap((result) => {
            if (result?.errorCode === 0) {
              return super.withdrawConsent(userId, consentCode);
            }
            return EMPTY;
          })
        );
    }
  }
}
