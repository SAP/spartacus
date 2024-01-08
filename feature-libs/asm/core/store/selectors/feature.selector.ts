/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { ASM_FEATURE, AsmState, StateWithAsm } from '../asm-state';

export const getAsmState: MemoizedSelector<StateWithAsm, AsmState> =
  createFeatureSelector<AsmState>(ASM_FEATURE);
