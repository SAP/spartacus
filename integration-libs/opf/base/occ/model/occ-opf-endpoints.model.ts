/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint to verify a response from PSP for Full Page Redirect
     * and iFrame integration patterns.
     */
    verifyPayment?: string | OccEndpoint;
    /**
     * Endpoint to submit payment for Hosted Fields pattern.
     */
    submitPayment?: string | OccEndpoint;
    /**
     * Endpoint to submit-complete payment for Hosted Fields pattern.
     */
    submitCompletePayment?: string | OccEndpoint;
    /**
     * Endpoint to fetch dynamic script for Hosted Fields pattern and PageRedirection sub-pattern.
     */
    afterRedirectScripts?: string | OccEndpoint;
    /**
     * Endpoint to get active payment configurations
     */
    getActiveConfigurations?: string | OccEndpoint;
    /**
     * Endpoint to get CTA (Call To Action) Scripts used in QuickBuy functionality
     */
    getCtaScripts?: string | OccEndpoint;
  }
}
