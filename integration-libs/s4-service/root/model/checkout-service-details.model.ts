/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export type ServiceTime = string;

export interface ServiceDetails {
  scheduledAt?: ServiceTime; //name in request
}

export interface ServiceOrderConfig {
  leadDays?: number;
  serviceScheduleTimes?: string[];
}
