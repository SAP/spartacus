/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export type ServiceDateTime = string;

export interface ServiceDetails {
  scheduledAt?: ServiceDateTime; //name in request
}

export interface ServiceOrderConfig {
  leadDays?: number;
  serviceScheduleTimes?: string[];
}

export interface CancellationDetails {
  cancelReason?: string; //name in request
  cancellationRequestEntryInputs: CancellationRequestEntryInputs[];
}
export interface CancellationRequestEntryInputs {
  orderEntryNumber?: number;
  quantity?: string[];
}
export type serviceCancellable = boolean;
