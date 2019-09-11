import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AnonymousConsentTemplatesAdapter } from '../../../anonymous-consents/connectors/anonymous-consent-templates.adapter';
import { ConsentTemplate } from '../../../model/consent.model';
import { CONSENT_TEMPLATE_NORMALIZER } from '../../../user/connectors/consent/converters';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

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
      catchError(error => throwError(error)),
      map(consentList => consentList.consentTemplates),
      this.converter.pipeableMany(CONSENT_TEMPLATE_NORMALIZER)
    );
  }
}
