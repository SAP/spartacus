/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NotificationPreference {
  channel?: string;
  value?: string;
  enabled?: boolean;
  visible?: boolean;
}

export interface NotificationPreferenceList {
  preferences?: NotificationPreference[];
}
