import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConsentTemplate } from '../../../../../../../../projects/core/src/model/consent.model';
import { CONSENT_TEMPLATE_NORMALIZER } from '../../../../../../../../projects/core/src/user/connectors/consent/converters';
import { UserConsentAdapter } from '../../../../../../../../projects/core/src/user/connectors/consent/user-consent.adapter';
import { ConverterService } from '../../../../../../../../projects/core/src/util/converter.service';
import { Occ } from '../../../../../../../../projects/core/src/occ/occ-models/occ.models';
import { OccEndpointsService } from '../../../../../../../../projects/core/src/occ/services/occ-endpoints.service';

@Injectable()
export class OccUserConsentAdapter implements UserConsentAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  loadConsents(userId: string): Observable<ConsentTemplate[]> {
    const url = this.occEndpoints.getUrl('consentTemplates', { userId });
    const headers = new HttpHeaders({ 'Cache-Control': 'no-cache' });
    return this.http
      .get<Occ.ConsentTemplateList>(url, { headers })
      .pipe(
        catchError((error: any) => throwError(error)),
        map((consentList) => consentList.consentTemplates),
        this.converter.pipeableMany(CONSENT_TEMPLATE_NORMALIZER)
      );
  }

  giveConsent(
    userId: string,
    consentTemplateId: string,
    consentTemplateVersion: number
  ): Observable<ConsentTemplate> {
    const url = this.occEndpoints.getUrl('consents', { userId });
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
        catchError((error) => throwError(error)),
        this.converter.pipeable(CONSENT_TEMPLATE_NORMALIZER)
      );
  }

  withdrawConsent(userId: string, consentCode: string): Observable<{}> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
    });
    const url = this.occEndpoints.getUrl('consentDetail', {
      userId,
      consentId: consentCode,
    });

    return this.http.delete(url, { headers });
  }
}
