/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { MemoizedSelector, createFeatureSelector } from '@ngrx/store';

import { EntityLoaderState } from '../../../state/utils/entity-loader/entity-loader-state';
import { PROCESS_FEATURE, StateWithProcess } from '../process-state';

export function getProcessState<T>(): MemoizedSelector<
  StateWithProcess<T>,
  EntityLoaderState<T>
> {
  return createFeatureSelector<EntityLoaderState<T>>(PROCESS_FEATURE);
}
