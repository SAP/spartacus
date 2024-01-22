/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  StateWithStoreFinder,
  STORE_FINDER_FEATURE,
  StoresState,
} from '../store-finder-state';

export const getStoreFinderState: MemoizedSelector<
  StateWithStoreFinder,
  StoresState
> = createFeatureSelector<StoresState>(STORE_FINDER_FEATURE);
