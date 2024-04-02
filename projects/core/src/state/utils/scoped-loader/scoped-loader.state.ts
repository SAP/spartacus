/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { LoaderState } from '../loader/loader-state';
import { EntityState } from '../entity/entity-state';

export interface ScopedLoaderState<T> {
  [scope: string]: LoaderState<T>;
}

export type EntityScopedLoaderState<T> = EntityState<ScopedLoaderState<T>>;
