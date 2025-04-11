/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OrderAttachments {
  attachments?: OrderAttachment[];
}

export interface OrderAttachment {
  attachmentId?: string;
  fileName?: string;
}
