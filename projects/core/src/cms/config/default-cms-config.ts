/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CmsConfig } from './cms-config';

export const defaultCmsModuleConfig: CmsConfig = {
  backend: {
    occ: {
      endpoints: {
        component: 'cms/components/${id}',
        components: 'cms/components',
        pages: 'cms/pages',
        page: 'cms/pages/${id}',
      },
    },
  },
  cmsComponents: {},
  componentsLoading: {
    pageSize: 50,
  },
};
