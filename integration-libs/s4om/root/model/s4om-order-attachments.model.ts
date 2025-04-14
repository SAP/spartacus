/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface S4omOrderAttachments {
  attachments?: S4omOrderAttachment[];
}

export interface S4omOrderAttachment {
  attachmentId?: string;
  fileName?: string;
}
