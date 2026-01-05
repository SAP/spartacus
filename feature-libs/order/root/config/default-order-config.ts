/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OrderConfig } from '.';

export const defaultOrderConfig: OrderConfig = {
  orderAttachments: {
    previewMimeTypes: [
      'text/plain',
      'application/json',
      'application/xml',
      'application/xhtml+xml',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/bmp',
      'image/svg+xml',
      'image/webp',
      'image/x-icon',
      'image/tiff',
      'application/pdf',
    ],
  },
  showOrderQuoteLink: false,
};
