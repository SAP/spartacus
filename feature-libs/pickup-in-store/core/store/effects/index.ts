/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DefaultPointOfServiceEffect } from './default-point-of-service-name.effect';
import { PickupLocationEffect } from './pickup-location.effect';
import { StockEffect } from './stock.effect';

export const effects: any[] = [
  DefaultPointOfServiceEffect,
  StockEffect,
  PickupLocationEffect,
];

export * from './default-point-of-service-name.effect';
export * from './pickup-location.effect';
export * from './stock.effect';
