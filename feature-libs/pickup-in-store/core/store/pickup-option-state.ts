/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const PICKUP_OPTION_FEATURE = 'pickup-option';

export interface StateWithPickupOption {
  [PICKUP_OPTION_FEATURE]: PickupOptionState;
}
export interface PickupOptionState {
  pickupOption: Record<number, string>;
  pageContext: string;
}
