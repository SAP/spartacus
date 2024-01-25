/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PersonalizationAction {
  action_name: string;
  action_type: string;
  customization_name?: string;
  customization_code?: string;
  variation_name?: string;
  variation_code?: string;
}

export interface PersonalizationContext {
  actions: PersonalizationAction[];
  segments: string[];
}
