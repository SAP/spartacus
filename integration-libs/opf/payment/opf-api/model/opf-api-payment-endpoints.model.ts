/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { OpfApiEndpoint as BaseOpfApiEndpoint } from '@spartacus/opf/base/root';

declare module '@spartacus/opf/base/root' {
  interface OpfApiEndpoints {
    /**
     * Endpoint to verify a response from PSP for Full Page Redirect
     * and iFrame integration patterns.
     */
    verifyPayment?: string | BaseOpfApiEndpoint;
    /**
     * Endpoint to submit payment for Hosted Fields pattern.
     */
    submitPayment?: string | BaseOpfApiEndpoint;
    /**
     * Endpoint to submit-complete payment for Hosted Fields pattern.
     */
    submitCompletePayment?: string | BaseOpfApiEndpoint;
    /**
     * Endpoint to fetch dynamic script for Hosted Fields pattern and PageRedirection sub-pattern.
     */
    getAfterRedirectScripts?: string | BaseOpfApiEndpoint;
    /**
     * Endpoint to initiate payment provider.
     */
    initiatePayment?: string | BaseOpfApiEndpoint;
    /**
     * Endpoint to update an existing payment transaction/session.
     */
    updatePaymentTransaction?: string | BaseOpfApiEndpoint;
  }
}
