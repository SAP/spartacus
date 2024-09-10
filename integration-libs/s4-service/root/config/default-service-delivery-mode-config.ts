/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PriceType } from '@spartacus/core';
import { S4ServiceDeliveryModeConfig } from '../model/augmented-types.model';

export const defaultServiceDeliveryModeConfig: S4ServiceDeliveryModeConfig = {
  s4ServiceDeliveryMode: {
    code: 'service-delivery',
    deliveryCost: {
      currencyIso: 'USD',
      formattedValue: 'USD0.00',
      priceType: PriceType.BUY,
      value: 0.0,
    },
    description: 'Not applicable',
    name: 'No Delivery Charges for Service',
  },
};
