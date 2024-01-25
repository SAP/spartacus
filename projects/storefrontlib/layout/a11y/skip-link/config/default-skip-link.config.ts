/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SkipLinkConfig } from './skip-link.config';

export const defaultSkipLinkConfig: SkipLinkConfig = {
  skipLinks: [
    {
      key: 'cx-header',
      i18nKey: 'skipLink.labels.header',
    },
    {
      key: 'cx-main',
      i18nKey: 'skipLink.labels.main',
    },
    { key: 'cx-footer', i18nKey: 'skipLink.labels.footer' },
  ],
};
