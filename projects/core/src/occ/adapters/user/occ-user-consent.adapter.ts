import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { ConverterService } from '../../../util/converter.service';
import { UserConsentAdapter } from '../../../user/connectors/consent/user-consent.adapter';
import { ConsentTemplate } from '../../../model/consent.model';
import { Occ } from '../../occ-models/occ.models';
import { CONSENT_TEMPLATE_NORMALIZER } from '../../../user/connectors/consent/converters';

const USER_ENDPOINT = 'users/';
const CONSENTS_TEMPLATES_ENDPOINT = '/consenttemplates';
const CONSENTS_ENDPOINT = '/consents';

@Injectable()
export class OccUserConsentAdapter implements UserConsentAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  private getUserEndpoint(userId?: string): string {
    const endpoint = userId ? `${USER_ENDPOINT}${userId}` : USER_ENDPOINT;
    return this.occEndpoints.getEndpoint(endpoint);
  }

  loadConsents(userId: string): Observable<ConsentTemplate[]> {
    const url = this.getUserEndpoint(userId) + CONSENTS_TEMPLATES_ENDPOINT;
    const headers = new HttpHeaders({ 'Cache-Control': 'no-cache' });
    return this.http.get<Occ.ConsentTemplateList>(url, { headers }).pipe(
      catchError((error: any) => throwError(error)),
      map(consentList => consentList.consentTemplates),
      this.converter.pipeableMany(CONSENT_TEMPLATE_NORMALIZER)
    );
  }

  giveConsent(
    userId: string,
    consentTemplateId: string,
    consentTemplateVersion: number
  ): Observable<ConsentTemplate> {
    const url = this.getUserEndpoint() + userId + CONSENTS_ENDPOINT;
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
        catchError(error => throwError(error)),
        this.converter.pipeable(CONSENT_TEMPLATE_NORMALIZER)
      );
  }

  withdrawConsent(userId: string, consentCode: string): Observable<{}> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
    });
    const url =
      this.getUserEndpoint() + userId + CONSENTS_ENDPOINT + '/' + consentCode;
    return this.http.delete(url, { headers });
  }
}
