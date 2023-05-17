/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpfUi } from '@spartacus/opf/checkout/root';

export const OPF_FEATURE = 'opf';

export interface StateWithOpf {
  [OPF_FEATURE]: OpfState;
}

export interface OpfState {
  opfUi: OpfUi;
}
