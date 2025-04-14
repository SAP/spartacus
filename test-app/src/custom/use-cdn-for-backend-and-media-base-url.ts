/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { provideConfig } from '@spartacus/core';

export const useCdnForBackendAndMediaBaseUrl: Provider = provideConfig({
  backend: {
    occ: {
      // use CDN over the OCC API.
      baseUrl: 'https://sparta-api.platis.dev',
    },
    media: {
      // When media.baseUrl is not set, it will fallback to backend.baseUrl
      // See Spartacus source code https://github.com/SAP/spartacus/blob/2a5fea10110f97d238e6eff5fb4d979e4fe8478c/projects/storefrontlib/shared/components/media/media.service.ts#L402-L405
    },
  },
});
