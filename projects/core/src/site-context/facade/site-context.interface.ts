/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';

export interface SiteContext<T> {
  getAll(): Observable<T[]>;
  getActive(): Observable<string>;
  setActive(isocode: string): void;
}
