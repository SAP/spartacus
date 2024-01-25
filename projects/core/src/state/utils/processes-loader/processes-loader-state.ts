/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { LoaderState } from '../loader/loader-state';

export interface ProcessesLoaderState<T> extends LoaderState<T> {
  processesCount?: number;
}
