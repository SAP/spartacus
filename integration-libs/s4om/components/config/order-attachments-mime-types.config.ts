/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';

export interface S4OMOrderAttachmentsPreviewMimeTypesConfig {
  previewMimeTypes: string[];
}

export const DEFAULT_MIME_TYPE_CONFIG: S4OMOrderAttachmentsPreviewMimeTypesConfig = {
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
};

export const S4OM_ORDER_ATTACHMENTS_PREVIEW_MIME_TYPES =
  new InjectionToken<S4OMOrderAttachmentsPreviewMimeTypesConfig>('S4OMOrderAttachmentsPreviewMimeTypesConfig');
