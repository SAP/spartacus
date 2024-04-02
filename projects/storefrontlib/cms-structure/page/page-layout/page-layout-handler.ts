/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { BREAKPOINT } from '../../../layout/config/layout-config';

export const PAGE_LAYOUT_HANDLER = new InjectionToken<PageLayoutHandler>(
  'PageLayoutHandler'
);

export interface PageLayoutHandler {
  handle(
    slots: Observable<string[]>,
    pageTemplate?: string,
    section?: string,
    breakpoint?: BREAKPOINT
  ): Observable<string[]>;
}
