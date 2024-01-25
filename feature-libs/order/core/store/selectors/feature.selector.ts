/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { OrderState, ORDER_FEATURE, StateWithOrder } from '../order-state';

export const getOrderState: MemoizedSelector<StateWithOrder, OrderState> =
  createFeatureSelector<OrderState>(ORDER_FEATURE);
