/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

export interface OccOpfGiftCardEndpoints {
  /**
   * Endpoint for applying gift card and getting balance
   */
  applyGiftCard?: string | OccEndpoint;
  /**
   * Endpoint for removing a gift card
   */
  removeGiftCard?: string | OccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends OccOpfGiftCardEndpoints {}
}
