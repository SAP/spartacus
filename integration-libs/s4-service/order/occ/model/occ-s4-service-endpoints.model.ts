/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

export interface S4ServiceOccEndpoints {
  /**
   * Cancel service order
   *
   * @member {string} [cancelServiceOrder]
   */

  cancelServiceOrder?: string | OccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends S4ServiceOccEndpoints {
    cancelServiceOrder?: string | OccEndpoint;
  }
}
