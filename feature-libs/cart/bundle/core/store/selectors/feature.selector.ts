/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { BundlesState, BUNDLE_FEATURE, StateWithBundle } from '../bundle-state';

export const getBundleState: MemoizedSelector<StateWithBundle, BundlesState> =
  createFeatureSelector<BundlesState>(BUNDLE_FEATURE);
