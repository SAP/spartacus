/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';

/**
 * Used to envelope data observable together with specified scope
 */
export interface ScopedData<T> {
  scope?: string;
  data$?: Observable<T>;
}
