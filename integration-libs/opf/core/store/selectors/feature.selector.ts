/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { OPF_FEATURE, OpfState, StateWithOpf } from '../opf-state';

export const getOpfState: MemoizedSelector<StateWithOpf, OpfState> =
  createFeatureSelector<OpfState>(OPF_FEATURE);
