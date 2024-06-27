/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceDetails {
  scheduledAt?: string; //combination of above two fields
}

export interface ServiceOrderConfig {
  leadDays?: number;
  serviceScheduleTimes?: string[];
}
