/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { UserIdService } from '../../../auth';
import { CmsPageTemplateAdapter } from '../../../cms/connectors/page/cms-page-template.adapter';
import { CustomPageTemplate } from '../../../cms/model/page.model';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

@Injectable({
  providedIn: 'root',
})
export class OccCmsPageTemplateAdapter implements CmsPageTemplateAdapter {
  protected readonly userIdService = inject(UserIdService);
  protected headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService
  ) {}

  load(templateId: string): Observable<CustomPageTemplate> {
    return this.userIdService.getUserId().pipe(
      switchMap((userId: string) =>
        this.http.get<CustomPageTemplate>(
          this.occEndpoints.buildUrl('pageTemplate', {
            urlParams: { userId, pageTemplateId: templateId },
          }),
          { headers: this.headers }
        )
      ),
      take(1)
    );
  }
}
