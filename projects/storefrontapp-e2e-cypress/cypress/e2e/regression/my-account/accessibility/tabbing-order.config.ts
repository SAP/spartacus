/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  TabbingOrderTypes,
  TabbingOrderConfig,
} from '../../../../helpers/accessibility/tabbing-order.model';

export const tabbingOrderConfig: TabbingOrderConfig = {
  myAccountEmailV2Display: [
    {
      value: 'Edit',
      type: TabbingOrderTypes.BUTTON,
    },
  ],
  myAccountEmailV2Edit: [
    {
      type: TabbingOrderTypes.BUTTON,
    },
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'Cancel',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'Save',
      type: TabbingOrderTypes.BUTTON,
    },
  ],
  myAccountProfileV2Display: [
    {
      value: 'Edit',
      type: TabbingOrderTypes.BUTTON,
    },
  ],
  myAccountProfileV2Edit: [
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      type: TabbingOrderTypes.GENERIC_INPUT,
    },
    {
      value: 'Cancel',
      type: TabbingOrderTypes.BUTTON,
    },
    {
      value: 'Save',
      type: TabbingOrderTypes.BUTTON,
    },
  ],
};
