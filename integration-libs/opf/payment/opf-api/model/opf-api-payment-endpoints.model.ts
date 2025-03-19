/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpfApiEndpoint } from '@spartacus/opf/base/root';

declare module '@spartacus/opf/base/root' {
  interface OpfApiEndpoints {
    /**
     * Endpoint to verify a response from PSP for Full Page Redirect
     * and iFrame integration patterns.
     */
    verifyPayment?: string | OpfApiEndpoint;
    /**
     * Endpoint to submit payment for Hosted Fields pattern.
     */
    submitPayment?: string | OpfApiEndpoint;
    /**
     * Endpoint to submit-complete payment for Hosted Fields pattern.
     */
    submitCompletePayment?: string | OpfApiEndpoint;
    /**
     * Endpoint to fetch dynamic script for Hosted Fields pattern and PageRedirection sub-pattern.
     */
    getAfterRedirectScripts?: string | OpfApiEndpoint;
    /**
     * Endpoint to initiate payment provider.
     */
    initiatePayment?: string | OpfApiEndpoint;
  }
}
