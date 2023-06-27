/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SmartEditConfig } from './smart-edit-config';

export const defaultSmartEditConfig: SmartEditConfig = {
  smartEdit: {
    storefrontPreviewRoute: 'cx-preview',
    // allowOrigin: '40.76.109.9:9002',
    allowOrigin:
      'api.cg79x9wuu9-eccommerc1-p5-public.model-t.myhybris.cloud:433',
    // allowOrigin:
    //   'https://api.cg79x9wuu9-eccommerc1-p5-public.model-t.myhybris.cloud',
  },
};
