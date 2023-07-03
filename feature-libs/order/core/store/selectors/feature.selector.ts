/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { OrderState, ORDER_FEATURE, StateWithOrder } from '../order-state';

export const getOrderState: MemoizedSelector<StateWithOrder, OrderState> =
  createFeatureSelector<OrderState>(ORDER_FEATURE);
