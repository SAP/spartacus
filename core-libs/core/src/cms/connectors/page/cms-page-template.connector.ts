/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, Optional } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CustomPageTemplate } from '../../model/page.model';
import { CmsPageTemplateAdapter } from './cms-page-template.adapter';

@Injectable({
  providedIn: 'root',
})
export class CmsPageTemplateConnector {
  constructor(@Optional() protected adapter: CmsPageTemplateAdapter) {}

  get(templateId: string): Observable<CustomPageTemplate | null> {
    if (!this.adapter) {
      return of(null);
    }
    return this.adapter.load(templateId);
  }
}
