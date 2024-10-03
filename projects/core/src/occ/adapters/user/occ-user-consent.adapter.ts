/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoggerService } from '../../../logger';
import { ConsentTemplate } from '../../../model/consent.model';
import { CONSENT_TEMPLATE_NORMALIZER } from '../../../user/connectors/consent/converters';
import { UserConsentAdapter } from '../../../user/connectors/consent/user-consent.adapter';
import { ConverterService } from '../../../util/converter.service';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

@Injectable()
export class OccUserConsentAdapter implements UserConsentAdapter {
  protected logger = inject(LoggerService);

  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  loadConsents(userId: string): Observable<ConsentTemplate[]> {
    const url = this.occEndpoints.buildUrl('consentTemplates', {
      urlParams: { userId },
    });
    const headers = new HttpHeaders({ 'Cache-Control': 'no-cache' });
    return this.http.get<Occ.ConsentTemplateList>(url, { headers }).pipe(
      catchError((error: any) => {
        throw normalizeHttpError(error, this.logger);
      }),
      map((consentList) => consentList.consentTemplates ?? []),
      this.converter.pipeableMany(CONSENT_TEMPLATE_NORMALIZER)
    );
  }

  giveConsent(
    userId: string,
    consentTemplateId: string,
    consentTemplateVersion: number
  ): Observable<ConsentTemplate> {
    const url = this.occEndpoints.buildUrl('consents', {
      urlParams: { userId },
    });
    const httpParams = new HttpParams()
      .set('consentTemplateId', consentTemplateId)
      .set('consentTemplateVersion', consentTemplateVersion.toString());
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache',
    });
    return this.http
      .post<Occ.ConsentTemplate>(url, httpParams, { headers })
      .pipe(
        catchError((error: any) => {
          throw normalizeHttpError(error, this.logger);
        }),
        this.converter.pipeable(CONSENT_TEMPLATE_NORMALIZER)
      );
  }

  withdrawConsent(userId: string, consentCode: string): Observable<{}> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
    });
    const url = this.occEndpoints.buildUrl('consentDetail', {
      urlParams: { userId, consentId: consentCode },
    });

    return this.http.delete(url, { headers });
  }
}
