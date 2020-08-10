import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AnonymousConsentTemplatesAdapter } from '../../../../../../../../projects/core/src/anonymous-consents/connectors/anonymous-consent-templates.adapter';
import { ANONYMOUS_CONSENT_NORMALIZER } from '../../../../../../../../projects/core/src/anonymous-consents/connectors/converters';
import {
  AnonymousConsent,
  ANONYMOUS_CONSENTS_HEADER,
  ConsentTemplate,
} from '../../../../../../../../projects/core/src/model/consent.model';
import { CONSENT_TEMPLATE_NORMALIZER } from '../../../../../../../../projects/core/src/user/connectors/consent/converters';
import { ConverterService } from '../../../../../../../../projects/core/src/util/converter.service';
import { Occ } from '../../../../../../../../projects/core/src/occ/occ-models/occ.models';
import { OccEndpointsService } from '../../../../../../../../projects/core/src/occ/services/occ-endpoints.service';

@Injectable()
export class OccAnonymousConsentTemplatesAdapter
  implements AnonymousConsentTemplatesAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  loadAnonymousConsentTemplates(): Observable<ConsentTemplate[]> {
    const url = this.occEndpoints.getUrl('anonymousConsentTemplates');
    return this.http.get<Occ.ConsentTemplateList>(url).pipe(
      catchError((error) => throwError(error)),
      map((consentList) => consentList.consentTemplates),
      this.converter.pipeableMany(CONSENT_TEMPLATE_NORMALIZER)
    );
  }

  loadAnonymousConsents(): Observable<AnonymousConsent[]> {
    // using the endpoint that doesn't set caching headers
    const url = this.occEndpoints.getUrl('anonymousConsentTemplates');
    return this.http
      .head<Occ.ConsentTemplateList>(url, { observe: 'response' })
      .pipe(
        catchError((error) => throwError(error)),
        map((response) => response.headers.get(ANONYMOUS_CONSENTS_HEADER)),
        this.converter.pipeable(ANONYMOUS_CONSENT_NORMALIZER)
      );
  }
}
