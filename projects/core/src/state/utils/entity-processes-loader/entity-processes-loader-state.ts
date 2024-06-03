/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { EntityState } from '../entity/entity-state';
import { ProcessesLoaderState } from '../processes-loader/processes-loader-state';

export type EntityProcessesLoaderState<T> = EntityState<
  ProcessesLoaderState<T>
>;
