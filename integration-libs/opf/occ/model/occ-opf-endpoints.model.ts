/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint to get active payment configurations
     */
    getActiveConfigurations?: string | OccEndpoint;
    /**
     * Endpoint to initiate payment session or call the PSP to initiate.
     */
    initiatePayment?: string | OccEndpoint;
    /**
     * Endpoint to verify a response from PSP for Full Page Redirect
     * and iFrame integration patterns.
     */
    verifyPayment?: string | OccEndpoint;
  }
}
