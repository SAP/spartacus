/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Translatable } from '../../i18n/translatable';

export enum GlobalMessageType {
  MSG_TYPE_CONFIRMATION = '[GlobalMessage] Confirmation',
  MSG_TYPE_ERROR = '[GlobalMessage] Error',
  MSG_TYPE_INFO = '[GlobalMessage] Information',
  MSG_TYPE_WARNING = '[GlobalMessage] Warning',
  MSG_TYPE_ASSISTIVE = '[GlobalMessage] Assistive',
}

export interface GlobalMessage {
  text: Translatable;
  type: GlobalMessageType;
  timeout?: number;
}
