/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { OccEndpoint as CoreOccEndpoint } from '@spartacus/core';

export interface S4ServiceOccEndpoints {
  /**
   * Cancel service order
   *
   * @member {string} [cancelServiceOrder]
   */

  cancelServiceOrder?: string | CoreOccEndpoint;

  /**
   * Reschedule service order
   *
   * @member {string} [rescheduleService]
   */

  rescheduleService?: string | CoreOccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends S4ServiceOccEndpoints {
    cancelServiceOrder?: string | CoreOccEndpoint;
    rescheduleService?: string | CoreOccEndpoint;
  }
}
