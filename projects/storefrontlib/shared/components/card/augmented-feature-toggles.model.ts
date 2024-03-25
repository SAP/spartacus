/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/core';

declare module '@spartacus/core' {
  interface FeatureToggles {
    /**
     * Indicates that the for the card components, the card paragraph is truncated (like the label)
     */
    storeFrontLibCardParagraphTruncated?: boolean;
  }
}
