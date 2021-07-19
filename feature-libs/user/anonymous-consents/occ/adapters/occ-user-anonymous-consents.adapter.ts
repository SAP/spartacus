import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  normalizeHttpError,
  Occ,
  OccEndpointsService,
} from '@spartacus/core';
import {
  ANONYMOUS_CONSENT_NORMALIZER,
  CONSENT_TEMPLATE_NORMALIZER,
  UserAnonymousConsentTemplatesAdapter,
} from '@spartacus/user/anonymous-consents/core';
import {
  AnonymousConsent,
  ANONYMOUS_CONSENTS_HEADER,
  ConsentTemplate,
} from '@spartacus/user/anonymous-consents/root';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class OccUserAnonymousConsentsAdapter
  implements UserAnonymousConsentTemplatesAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  loadAnonymousConsentTemplates(): Observable<ConsentTemplate[]> {
    const url = this.occEndpoints.buildUrl('anonymousConsentTemplates');
    return this.http.get<Occ.ConsentTemplateList>(url).pipe(
      catchError((error) => throwError(normalizeHttpError(error))),
      map((consentList) => consentList.consentTemplates ?? []),
      this.converter.pipeableMany(CONSENT_TEMPLATE_NORMALIZER)
    );
  }

  loadAnonymousConsents(): Observable<AnonymousConsent[]> {
    // using the endpoint which doesn't set caching headers
    const url = this.occEndpoints.buildUrl('anonymousConsentTemplates');
    return this.http
      .head<Occ.ConsentTemplate[]>(url, { observe: 'response' })
      .pipe(
        catchError((error) => throwError(error)),
        map(
          (response) => response.headers.get(ANONYMOUS_CONSENTS_HEADER) ?? ''
        ),
        this.converter.pipeable(ANONYMOUS_CONSENT_NORMALIZER)
      );
  }
}
