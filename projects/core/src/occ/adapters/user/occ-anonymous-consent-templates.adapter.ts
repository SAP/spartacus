/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AnonymousConsentTemplatesAdapter } from '../../../anonymous-consents/connectors/anonymous-consent-templates.adapter';
import { ANONYMOUS_CONSENT_NORMALIZER } from '../../../anonymous-consents/connectors/converters';
import { LoggerService } from '../../../logger';
import {
  ANONYMOUS_CONSENTS_HEADER,
  AnonymousConsent,
  ConsentTemplate,
} from '../../../model/consent.model';
import { CONSENT_TEMPLATE_NORMALIZER } from '../../../user/connectors/consent/converters';
import { ConverterService } from '../../../util/converter.service';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

@Injectable()
export class OccAnonymousConsentTemplatesAdapter
  implements AnonymousConsentTemplatesAdapter
{
  protected logger = inject(LoggerService);

  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  loadAnonymousConsentTemplates(): Observable<ConsentTemplate[]> {
    const url = this.occEndpoints.buildUrl('anonymousConsentTemplates');
    return this.http.get<Occ.ConsentTemplateList>(url).pipe(
      catchError((error: any) => {
        throw normalizeHttpError(error, this.logger);
      }),
      map((consentList) => consentList.consentTemplates ?? []),
      this.converter.pipeableMany(CONSENT_TEMPLATE_NORMALIZER)
    );
  }

  loadAnonymousConsents(): Observable<AnonymousConsent[]> {
    // using the endpoint that doesn't set caching headers
    const url = this.occEndpoints.buildUrl('anonymousConsentTemplates');
    return this.http
      .head<Occ.ConsentTemplateList>(url, { observe: 'response' })
      .pipe(
        catchError((error: any) => {
          throw normalizeHttpError(error, this.logger);
        }),
        map(
          (response) => response.headers.get(ANONYMOUS_CONSENTS_HEADER) ?? ''
        ),
        this.converter.pipeable(ANONYMOUS_CONSENT_NORMALIZER)
      );
  }
}
