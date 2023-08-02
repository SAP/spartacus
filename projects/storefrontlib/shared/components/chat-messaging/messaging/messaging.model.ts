/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
  item?: Item;
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
  itemList$?: Observable<Array<Item>>;
  defaultItemId?: string;
}

export interface AttachmentRestrictions {
  maxSize?: number;
  maxEntries?: number;
  allowedTypes?: Array<string>;
}

export interface Item {
  id: string;
  name: string;
}
