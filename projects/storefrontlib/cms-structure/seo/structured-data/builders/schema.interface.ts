/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';

export interface SchemaBuilder {
  build(): Observable<{}>;
}

export interface JsonLdBuilder<T> {
  build(data: T): Observable<{}>;
}
