/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpfApiEndpoint } from '@spartacus/opf/base/opf-api';

declare module '@spartacus/opf/base/opf-api' {
  interface OpfApiEndpoints {
    /**
     * Endpoint to get CTA (Call To Action) Scripts
     */
    getCtaScripts?: string | OpfApiEndpoint;
  }
}
