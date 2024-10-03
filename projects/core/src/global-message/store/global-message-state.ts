/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Translatable } from '../../i18n/translatable';

export const GLOBAL_MESSAGE_FEATURE = 'global-message';

export interface StateWithGlobalMessage {
  [GLOBAL_MESSAGE_FEATURE]: GlobalMessageState;
}

export interface GlobalMessageState {
  entities: GlobalMessageEntities;
}

export interface GlobalMessageEntities {
  [messageType: string]: Translatable[];
}
