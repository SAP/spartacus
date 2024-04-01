/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { BUNDLE_FEATURE, BundlesState, StateWithBundle } from '../bundle-state';

export const getBundleState: MemoizedSelector<StateWithBundle, BundlesState> =
  createFeatureSelector<BundlesState>(BUNDLE_FEATURE);
