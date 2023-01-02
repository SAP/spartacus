/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Currency, B2BUnit, CostCenter } from '@spartacus/core';

export interface Budget {
  active?: boolean;
  budget?: number;
  code?: string;
  currency?: Currency;
  endDate?: string;
  startDate?: string;
  name?: string;
  orgUnit?: B2BUnit;
  costCenters?: CostCenter[];
  selected?: boolean;
}
