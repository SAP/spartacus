/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PickupLocationEffect } from './pickup-location.effect';
import { StockEffect } from './stock.effect';

export const effects: any[] = [StockEffect, PickupLocationEffect];

export * from './stock.effect';
export * from './pickup-location.effect';
