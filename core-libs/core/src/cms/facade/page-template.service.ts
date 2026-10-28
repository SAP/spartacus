/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';
import { CmsPageTemplateConnector } from '../connectors/page/cms-page-template.connector';
import { CustomPageTemplate, CustomSection } from '../model/page.model';

@Injectable({ providedIn: 'root' })
export class PageTemplateService {
  private readonly cache = new Map<string, Observable<CustomPageTemplate>>();

  constructor(protected connector: CmsPageTemplateConnector) {}

  getPageTemplate(templateId: string): Observable<CustomPageTemplate | null> {
    templateId = 'eyJpdGVtSWQiOiJQYWdlVGVtcGxhdGUtMDAwMDAwMDAiLCJjYXRhbG9nSWQiOiJlbGVjdHJvbmljcy1zcGFDb250ZW50Q2F0YWxvZyIsImNhdGFsb2dWZXJzaW9uIjoiU3RhZ2VkIn0=';
    if (!this.cache.has(templateId)) {
      this.cache.set(
        templateId,
        this.connector.get(templateId).pipe(shareReplay(1))
      );
    }
    return this.cache.get(templateId)!;
  }

  getPageTemplateSections(templateId: string): Observable<CustomSection[]> {
    return this.getPageTemplate(templateId).pipe(
      map((template) => template?.sections ?? [])
    );
  }

  getShellTemplate(templateId: string): Observable<string> {
    return this.getPageTemplate(templateId).pipe(
      map((template) => template?.shellTemplate ?? '')
    );
  }
}
