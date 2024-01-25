/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnonymousConsentsConfig } from './anonymous-consents-config';

export const defaultAnonymousConsentsConfig: AnonymousConsentsConfig = {
  anonymousConsents: {
    registerConsent: 'MARKETING_NEWSLETTER',
    showLegalDescriptionInDialog: true,
    requiredConsents: [],
    consentManagementPage: {
      showAnonymousConsents: true,
      hideConsents: [],
    },
  },
};
