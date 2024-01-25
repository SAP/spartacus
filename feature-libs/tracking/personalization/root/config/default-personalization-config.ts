/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PersonalizationConfig } from './personalization-config';

export const defaultPersonalizationConfig: PersonalizationConfig = {
  personalization: {
    enabled: false,
    httpHeaderName: {
      id: 'Occ-Personalization-Id',
      timestamp: 'Occ-Personalization-Time',
    },
    context: {
      slotPosition: 'PlaceholderContentSlot',
      componentId: 'PersonalizationScriptComponent',
    },
  },
};
