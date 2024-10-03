/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CmsComponent } from '@spartacus/core';

export interface CmsQuickOrderComponent extends CmsComponent {
  quickOrderListLimit?: number;
}
