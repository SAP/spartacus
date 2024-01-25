/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';

export interface MessageEvent {
  author?: string;
  rightAlign?: boolean;
  createdAt?: string;
  text?: string;
  attachments?: Array<Attachment>;
  code?: string;
}

export interface Attachment {
  filename?: string;
  id?: string;
}

export interface MessagingConfigs {
  attachmentRestrictions?: AttachmentRestrictions;
  charactersLimit?: number;
  newMessagePlaceHolder?: string;
  enableFileUploadOption?: boolean;
  dateFormat?: string;
  displayAddMessageSection?: Observable<boolean>;
}

export interface AttachmentRestrictions {
  maxSize?: number;
  maxEntries?: number;
  allowedTypes?: Array<string>;
}
