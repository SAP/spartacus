/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isNotNullable, PageMetaService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export function getPageTitle(
  pageMetaService: PageMetaService,
  title?: string
): Observable<string> {
  if (title !== undefined) {
    return of(title);
  }
  return pageMetaService.getMeta().pipe(
    filter(isNotNullable),
    map((meta) => (meta.heading || meta.title) ?? '')
  );
}
