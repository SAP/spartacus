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
  /**
   * {@link MessageEventBoundItem} this message is currently bound to.
   */
  item?: MessageEventBoundItem;
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
  /**
   * List of possible {@link MessageEventBoundItem} this message can be bound to. When given, the {@link MessagingComponent} will render a
   * drop down list box to select an item.
   */
  itemList$?: Observable<Array<MessageEventBoundItem>>;
  /**
   * The id of the {@link MessageEventBoundItem} that should be pre-selected on the UI when adding a new message.
   */
  defaultItemId?: string;
  sendBtnIsNotPrimary?: boolean;
}

export interface AttachmentRestrictions {
  maxSize?: number;
  maxEntries?: number;
  allowedTypes?: Array<string>;
}

/**
 * A message can be bound to an item.
 * For example consider the {@link MessagingComponent} to be embedded in a component representing a document, such as
 * Cart, Order or Quote. A message added in context of a document, can either apply to the whole document (header message)
 * or to a specific line item (item message). In the later case one can provide the name of the line item,
 * typically the product name, as well as an id, typically the entry number. So the {@link MessagingComponent} can render a link
 * in front of the message with the given name as link text.
 * When clicking the link an itemClicked event will be emitted, with the item data as payload. The encapsulating component
 * could for example trigger a navigation to the corresponding line item using the event data.
 */
export interface MessageEventBoundItem {
  id: string;
  name: string;
}
