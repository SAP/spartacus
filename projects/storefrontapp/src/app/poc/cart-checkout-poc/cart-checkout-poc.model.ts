/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export type CartCheckoutPocStepStatus = 'pending' | 'running' | 'success' | 'error';

export interface CartCheckoutPocStep {
  id: string;
  label: string;
  status: CartCheckoutPocStepStatus;
  message?: string;
}

export interface CartCheckoutPocResult {
  activeCartId: string;
  targetCartId: string;
  activeCartUnchanged: boolean;
  steps: CartCheckoutPocStep[];
}
