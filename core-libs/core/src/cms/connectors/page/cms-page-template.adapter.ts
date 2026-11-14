/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';
import { CustomPageTemplate } from '../../model/page.model';

export abstract class CmsPageTemplateAdapter {
  abstract load(templateId: string): Observable<CustomPageTemplate>;
}
