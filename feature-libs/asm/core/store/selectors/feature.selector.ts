/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { AsmState, ASM_FEATURE, StateWithAsm } from '../asm-state';

export const getAsmState: MemoizedSelector<StateWithAsm, AsmState> =
  createFeatureSelector<AsmState>(ASM_FEATURE);
