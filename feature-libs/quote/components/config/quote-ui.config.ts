/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import {
  QuoteActionType,
  QuoteRoleType,
  QuoteState,
} from '@spartacus/quote/root';

export interface QuoteUIConfigFragment {
  maxCharsForComments?: number;
  truncateCardTileContentAfterNumChars?: number;
  confirmActionDialogMapping?: ConfirmActionDialogMappingConfig;
  maximumDecimalsForPercentageDiscount?: number;
  updateDebounceTime?: {
    expiryDate?: number;
  };
}

export type ConfirmActionDialogConfig = {
  i18nKeyPrefix: string;
  showWarningNote: boolean;
  showExpirationDate: boolean;
  showSuccessMessage: boolean;
  showOnlyWhenCartIsNotEmpty: boolean;
};

/**
 * When a quote action is triggered and a valid configuration for this action is given,
 * a confirmation dialog will be shown instead. The dialog is customized by the given configuration.
 *
 * Note: If you provide a state/action as well as a role/action mapping that both match,
 * then always the more specific state/action mapping will be used.
 */
export type ConfirmActionDialogMappingConfig = {
  [stateKey in QuoteState | QuoteRoleType]?: {
    [actionKey in QuoteActionType]?: ConfirmActionDialogConfig;
  };
};

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class QuoteUIConfig {
  quote?: QuoteUIConfigFragment;
}

declare module '@spartacus/core' {
  interface Config extends QuoteUIConfig {}
}
