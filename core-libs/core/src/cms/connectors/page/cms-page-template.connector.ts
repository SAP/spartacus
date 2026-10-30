/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomPageTemplate } from '../../model/page.model';
import { CmsPageTemplateAdapter } from './cms-page-template.adapter';

@Injectable({
  providedIn: 'root',
})
export class CmsPageTemplateConnector {
  constructor(protected adapter: CmsPageTemplateAdapter) {}

  get(templateId: string): Observable<CustomPageTemplate> {
    return this.adapter.load(templateId);
  }
}
