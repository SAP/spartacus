/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpfApiEndpoint } from '@spartacus/opf/base/root';

declare module '@spartacus/opf/base/root' {
  interface OpfApiEndpoints {
    /**
     * Endpoint to get CTA (Call To Action) Scripts
     */
    getCtaScripts?: string | OpfApiEndpoint;
  }
}
