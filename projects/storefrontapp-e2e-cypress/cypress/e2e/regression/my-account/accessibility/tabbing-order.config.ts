/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  TabbingOrderTypes,
  TabbingOrderConfig,
} from '../../../../helpers/accessibility/tabbing-order.model';

export const tabbingOrderConfig: TabbingOrderConfig = {
  myAccountV2EmailDisplay: [
    {
      value: 'Edit',
      type: TabbingOrderTypes.BUTTON,
    },
  ],
  myAccountV2EmailEdit: [
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
  myAccountV2ProfileDisplay: [
    {
      value: 'Edit',
      type: TabbingOrderTypes.BUTTON,
    },
  ],
  myAccountV2ProfileEdit: [
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
