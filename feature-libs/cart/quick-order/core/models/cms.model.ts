/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CmsComponent } from '@commerce-storefront-toolset/core';

export interface CmsQuickOrderComponent extends CmsComponent {
  quickOrderListLimit?: number;
}
