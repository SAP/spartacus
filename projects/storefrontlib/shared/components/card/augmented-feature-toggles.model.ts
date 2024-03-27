/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/core';

declare module '@spartacus/core' {
  interface FeatureToggles {
    /**
     * Enables truncating a paragraph text in the `CardComponent` of the `@spartacus/storefront`
     * (like truncating a label in the `CartComponent`).
     */
    storeFrontLibCardParagraphTruncated?: boolean;
  }
}
